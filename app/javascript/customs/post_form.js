const form = document.getElementById('new-post-form');
// https://qiita.com/soarflat/items/1a9613e023200bbebcb3

// async function 宣言は非同期関数を宣言し、その中で await キーワードを使うことができる。
// async および await キーワードを使用することで、プロミスベースの非同期の動作を、
// プロミスチェーンを明示的に構成する必要なく、よりすっきりとした方法で書くことができる。

form.addEventListener('submit', async (event) => {
  console.log({ event });
  event.preventDefault();

  const title = document.getElementById('title').value;
  console.log( {title} );

  const content = document.getElementById('content').value;
  console.log( {content} );

  // document.querySelector('[name=csrf-token]').content;で、<meta name="csrf-token" content="ランダムに生成されたトークン">を取得
  // クロスサイトリクエストフォージェリ(CSRF)は、ユーザーの意図しないリクエストを送信する攻撃。
  // CSRFトークンを取得して一緒に送信しないと、CSRF攻撃に対する防御策として設けられたセキュリティ機構により、
  // リクエストが拒否されるため、アプリケーションが正常に動作しない。
  const csrfToken = document.querySelector('[name=csrf-token]').content;
  console.log( {csrfToken} );

  // まず try ブロック内のコードが実行され、そこで例外が発生すると、catch ブロック内のコードが実行される。
  // 単純なPromiseの処理や、短いチェーンの場合はthenメソッドが手軽。
  // tryは同期的なエラーハンドリングに通常は使う。
  // 複雑な非同期処理やエラーハンドリングが必要な場合は、async/awaitとtry/catchを使うとコードが読みやすくなる。
  try {
    // await を用いると、プロミスが決定（つまり、履行または拒否）されるまで、その周囲にある async 関数の実行が一時的に停止される。
    // 実行が再開されると、await式の値は履行されたプロミスの値になります。
    // fetchでHTTP リクエストを行い、レスポンスを処理するための JavaScript インターフェイスを提供。
    // fetchでリクエストを行なって、レスポンスも処理をしている。
    const response = await fetch('/posts', {
      method: 'POST',
      headers: {
        // Content-Type: application/json は、サーバーに対してリクエストボディがJSON形式であることを知らせるための重要なHTTPヘッダー
        'Content-Type': 'application/json',
        'X-CSRF-Token': csrfToken
      },
      body: JSON.stringify({ post: { title, content } })
    });
    console.log( {response} );

    // ブラウザは、以下のようなリクエストを https://example.com/posts に対して送信。posts_controllerのcreateアクションに、送信する。
    // POST /posts HTTP/1.1
    // Host: example.com
    // Content-Type: application/json
    // X-CSRF-Token: ABC123DEF456GHI789
    // {
    //   "post": {
    //     "title": "Example Title",
    //     "content": "This is an example content."
    //   }
    // }

    // createアクションから返されてくるレスポンス
    // response: Response {
    //   type: "basic",
    //   url: "https://example.com/posts",
    //   redirected: false,
    //   status: 201,
    //   ok: true,
    //   statusText: "Created",
    //   headers: Headers,
    //   body: ReadableStream,
    //   bodyUsed: true
    // }
    

    // awaitキーワードで、Promiseが解決（成功または失敗）されるまでコードの実行を待つ。
    // response.json()は、レスポンスボディをJSONとしてパースし、JavaScriptオブジェクトとして返す。
    // response.json(): {
    //   message: "Post created successfully",
    //   post: {
    //     id: 1,
    //     title: "Example Title",
    //     content: "This is an example content.",
    //     created_at: "2024-07-28T12:34:56.789Z",
    //     updated_at: "2024-07-28T12:34:56.789Z"
    //   }
    // }
    // json() は Response インターフェイスのメソッドで、 Response のストリームを取得して完全に読み取ります。
    // 本体のテキストを JSON として解釈した結果で解決するプロミスを返します。
    // なお、このメソッドは json() という名前であるにもかかわらず、結果は JSON ではありません。
    // 入力として JSON を取って解釈し、 JavaScript のオブジェクトを生成します。
    // JSON形式のレスポンスボディをJavaScriptオブジェクトに変換、responseのままだと、JavaScriptオブジェクトとしては使えない
    const data = await response.json();
    console.log( {data} );

    if (response.ok) {
      document.getElementById('response-message').innerText = data.message;
      document.getElementById('title').value = '';
      document.getElementById('content').value = '';
    } else {
      document.getElementById('response-message').innerText = data.errors.join(', ');
    }
    // catchが使用される具体的なシナリオ
    // ネットワークエラー、サーバーエラー、データのパースエラー、その他の非同期エラーなど
  } catch (error) {
    console.error({ error });
    document.getElementById('response-message').innerText = 'An error occurred while submitting the form.';
  }
});
