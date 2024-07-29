class PostsController < ApplicationController
  def new
  end

  def create
    @post = Post.new(post_params)
    if @post.save
      render json: { message: 'Post created successfully', post: @post }, status: :created
      # 以下のようなHTTPレスポンスを生成し、post_form.jsに返す
      #  HTTP/1.1 201 Created
      # Content-Type: application/json

      # {
      #   "message": "Post created successfully",
      #   "post": {
      #     "id": 1,
      #     "title": "Example Title",
      #     "content": "This is an example content.",
      #     "created_at": "2024-07-28T12:34:56.789Z",
      #     "updated_at": "2024-07-28T12:34:56.789Z"
      #   }
      # }
    else
      render json: { errors: @post.errors.full_messages }, status: :unprocessable_entity
      # 以下のようなHTTPレスポンスを生成し、post_form.jsに返す
      # HTTP/1.1 422 Unprocessable Entity
      # Content-Type: application/json

      # {
      #   "errors": {
      #     "title": ["can't be blank"],
      #     "content": ["can't be blank"]
      #   }
      # }
    end
  end

  private

  def post_params
    params.require(:post).permit(:title, :content)
  end
end
