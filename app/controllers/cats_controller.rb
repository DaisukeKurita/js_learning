class CatsController < ApplicationController
  def new
    @cat = Cat.new
  end

  def create
    begin
      @cat = Cat.new(cat_params)
      
      # save! を使うメリット: 強制的に例外を発生させ、エラー処理を統一的に管理できる。
      # 特にトランザクション内で複数の処理を行う場合や、エラーハンドリングを集中させたい場合に適している。
      # 通常の @cat.save は、バリデーションエラーが発生した際に false を返すだけ。
      # @cat.save! はバリデーションエラーが発生した場合に ActiveRecord::RecordInvalid 例外を発生させる。
      @cat.save!  # save! を使うことでバリデーションエラー時に例外を発生させる
    
      redirect_to new_cat_path, notice: "猫の投稿が作成されました！"
      
      # save! で例外が発生した場合、その処理はすぐに中断され、対応する rescue ActiveRecord::RecordInvalid ブロックが実行される。
      # rescue ブロック内で、例外情報を使って適切なエラーメッセージをユーザーに表示したり、ログにエラー内容を記録したりすることができる。
      # ここでの e は、ActiveRecord::RecordInvalid という特定の例外が発生したときに、その例外オブジェクトを受け取る変数。
      # この例外オブジェクトには、エラーメッセージやエラーに関する詳細情報が含まれている。
    rescue ActiveRecord::RecordInvalid => e
      # バリデーションエラーなどが発生した場合
      flash.now[:alert] = "投稿に失敗しました: #{e.message}"
      render :new, status: :unprocessable_entity

      # ここでの e は、どの種類の例外が発生してもその例外オブジェクトを受け取る。
      # このように書くと、StandardError を継承するすべての例外をキャッチする。
      # rescue ActiveRecord::RecordInvalid のように特定の例外を指定しなかった場合は、あらゆる種類の例外をキャッチする。
    rescue => e
      # 予期しないエラーが発生した場合
      flash.now[:alert] = "予期しないエラーが発生しました。管理者にお問い合わせください。"
      # ターミナルに出力される。厳密には Rails のログファイル に書き込まれる。
      logger.error "Unexpected error: #{e.message}"
      render :new, status: :internal_server_error
    end
  end

  private

  def cat_params
    params.require(:cat).permit(:name)
  end
end
