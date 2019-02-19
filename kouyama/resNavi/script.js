// ぐるなびのURL＋keyid(アクセスキー)
let gnaviUrl = `https://api.gnavi.co.jp/RestSearchAPI/v3/`;

$('#search').on('click', function() { // 検索ボタンが押された時
  $('#searchResults').text(''); // 前回の検索結果を消す
  let data = { keyid: 'e2d1f212bb0ddfdd774c23e22bedf31e' }; // URLとして送信するデータ
  let $searchName = $('#searchName').val(); // 「店名」検索フォームに入力された文字列
  let $freeWord = $('#freeWord').val(); // 「フリーワード」検索フォームに入力された文字列

  if (!$searchName && !$freeWord) { // 店名とフリーワードどちらも入力されていない場合
    alert('入力されていない項目があります');
    return;
  }

  if ($searchName && $freeWord) { // 店名とフリーワード両方入力された場合
    data.name = $searchName; // 送信するデータにプロパティnameを追加
    data.freeword = $freeWord; // 送信するデータにプロパティfreewordを追加
  }else if($searchName){ // 店名だけ入力された場合
    data.name = $searchName;
  }else{ // フリーワードだけ入力された場合
    data.freeword = $freeWord;
  }

  $.ajax( { // 非同期処理で
    url: gnaviUrl, // リクエスト送信先URL
    data: data, // サーバに送信する値。オブジェクトなのでクエリー文字に変換されてGETリクエストとして付加。
    type: 'GET', // HTTP通信の種類。初期値は'GET'
    dataType: 'json', // サーバから返されるデータの型。省略した場合自動的に判別。
    timeout: 5000, // タイムアウト時間。5000ms経過しても通信が完了しない場合error処理。
  })
  .done(function(data) { // ajaxの処理が成功した時、dataにその結果が入る。
    $(data.rest).each(function() { // dataのプロパティrestの要素一つ一つに対して繰り返し処理
      // 検索結果を画面に表示
      // 名前とカテゴリーを表示
      $('#searchResults').append(`
        <span id='name'>${this.name}</span>
        <span>${this.category}</span><div>
      `)
      if(this.image_url.shop_image1){ // image1がある時表示
        $('#searchResults').append(`
          <img src='${this.image_url.shop_image1}' alt='image1'>
        `)
      }
      if(this.image_url.shop_image2){ // image2がある時表示
        $('#searchResults').append(`
          <img src='${this.image_url.shop_image2}' alt='image1'>
        `)
      }
      // ショートPR文を表示
      $('#searchResults').append(`
        </div>
        <p>${this.pr.pr_short}</p>
        <hr>
      `)
    });
  })
  .fail(function() { // ajaxの処理が失敗したら。タイムアウトしたら。
    alert('通信エラー');
  });
})

$('#nearStore').on('click', function() {
  $('#searchResults').text(''); // 前回の検索結果を消す

  // 現在位置を取得する
  navigator.geolocation.getCurrentPosition(successFunc);
})