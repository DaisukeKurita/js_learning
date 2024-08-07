# Apiという名前のモジュールを定義。
# このモジュールは、API関連のコントローラやクラスをまとめるために使用される。
# これにより、コードの構造を整理し、APIエンドポイントが含まれることを明示的に示すことができる。
module Api
  # APIのバージョン1を表す。
  # バージョン管理を行うことで、将来的にAPIが変更された場合でも、
  # 既存のクライアントが旧バージョンのAPIを引き続き利用できるようにすることができる。
  module V1
    # このコントローラはAPIのバージョン1の一部として機能し、Api::V1::BooksControllerという完全修飾名で参照される。
    class BooksController < ApplicationController
      def create
        book = Book.new(book_params)
        if book.save
          # render json: book の部分は、bookオブジェクトをJSON形式にシリアライズして、クライアントに返す。
          # 例：book = Book.new(id: 1, title: "Ruby on Rails", content: "A guide to Rails")
          # このように、シリアライズされる。
          # {
          #   "id": 1,
          #   "title": "Ruby on Rails",
          #   "content": "A guide to Rails"
          # }
          render json: book, status: :created
        else
          render json: book.errors, status: :unprocessable_entity
        end
      end

      private

      def book_params
        params.require(:book).permit(:title, :content)
      end
    end
  end
end
