const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
// Axiosで送信するリクエストのデフォルトヘッダーにX-CSRF-Tokenというカスタムヘッダーを設定。
// axios.defaults.headers.commonを使うことで、すべてのリクエストに対してこのヘッダーが自動的に追加される。
axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;

function createBook(bookData) {
// axios.post('/api/v1/books', bookData) は、JavaScriptのライブラリであるAxiosを使用して、
// /api/v1/booksというエンドポイントにHTTP POSTリクエストを送信するコード。
// bookData は、リクエストと一緒に送信されるデータ。これはJavaScriptオブジェクトであり、例えば次のような形をしている
// const bookData = {
//   title: "New Book Title",
//   content: "Content of the new book"
// };
// このbookDataオブジェクトは、サーバーに送られ、BooksController#create アクション内で処理される。
// 具体的には、book_params メソッドを通じてBookモデルの新しいインスタンスが作成され、データベースに保存される。
  axios.post('/api/v1/books', bookData)
  // response はサーバーから返されるレスポンスオブジェクトを指す。
  // このオブジェクトには、サーバーから送られたデータやステータスコードなどが含まれる。
    .then(response => {
      // response.dataの例
      // {
      //   "id": 1,
      //   "title": "New Book Title",
      //   "content": "Content of the new book",
      //   "created_at": "2024-08-08T12:00:00.000Z",
      //   "updated_at": "2024-08-08T12:00:00.000Z"
      // }
      console.log({ response });
      console.log(response.data);
      alert('Book created successfully!');
    })
    .catch(error => {
      // エラー情報や警告を出力するのに使用。特に問題がある場合やエラーが発生した場合に、その旨を強調して表示するために使われる。
      // エラーが発生した場所や原因を特定しやすくするために使われる。
      console.error(error);
      alert('Failed to create book.');
    });
}


const form = document.getElementById('new-book-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const bookData = {
      title: form.querySelector('#book_title').value,
      content: form.querySelector('#book_content').value,
    };
    
    createBook(bookData);
  });
}

// Axiosを使用することの主なメリット

// 1. 簡単なリクエストの作成
// Axiosは、HTTPリクエストをシンプルに作成するための直感的なAPIを提供します。
// GET、POST、PUT、DELETEなどのリクエストを簡単に行うことができます。

// 2. Promiseベースの設計
// AxiosはPromiseをベースにしているため、非同期処理を直感的に書くことができます。
// async/awaitとも互換性があり、複雑な非同期処理を簡潔に表現できます。

// 3. デフォルト設定とカスタマイズ
// Axiosでは、デフォルトの設定を一度定義することで、すべてのリクエストに適用することができます。
// これには、共通のヘッダー、タイムアウト、ベースURLの設定が含まれます。

// 4. リクエストおよびレスポンスのインターセプター
// Axiosは、リクエストやレスポンスを処理する前にインターセプターを使用してカスタムロジックを実行することができます。
// これにより、エラーハンドリングやトークンのリフレッシュなどの処理を一元管理できます。

// 5. ブラウザ互換性
// Axiosは、すべてのモダンブラウザで動作し、クロスブラウザ互換性が高いです。
// 古いブラウザにも対応しており、幅広いユーザー層に対応可能です。

// 6. エラーハンドリングの簡素化
// Axiosは、HTTPステータスコードに基づいたエラーハンドリングを容易にします。
// catchブロックを使用してエラー処理が行いやすく、レスポンスオブジェクトを詳細に確認することができます。

// 7. クエリパラメータの自動処理
// Axiosは、GETリクエストのクエリパラメータを自動的に処理し、オブジェクトを渡すだけでURLエンコードを行ってくれます。

// 8. Node.jsとの互換性
// Axiosはブラウザだけでなく、Node.js環境でも動作します。これにより、サーバーサイドのHTTPリクエストにも使用できます。