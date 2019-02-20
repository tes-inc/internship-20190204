const gnaviUrl = `https://api.gnavi.co.jp/RestSearchAPI/v3/`; // ぐるなびAPIのURL
const keyid = 'e2d1f212bb0ddfdd774c23e22bedf31e'; // ぐるなびAPIのkeyid
let data; // URLとして送信するオブジェクト
let $searchName; // 店名検索に入力された文字列
let $freeWord; // フリーワード検索に入力された文字列
let page; // 現在のページ数を格納

// pageボタンが押された時の処理
$('#nextPage').on('click', function() {
  ++page;
  data.offset_page = page;
  display(data);
})

 // 検索ボタンが押された時
 $('#search').on('click', function() {
  data = { keyid : keyid }; // 前回の検索dataを初期化

  $searchName = $('#searchName').val(); // 「店名」検索フォームに入力された文字列
  $freeWord = $('#freeWord').val(); // 「フリーワード」検索フォームに入力された文字列

  if (!$searchName && !$freeWord) { // 店名とフリーワードどちらも入力されていない場合
    alert('検索ワードを入力してください');
    return;
  }
  wordInput(); // 入力された文字列をdataに格納

  $.ajax( { // 非同期処理
    url: gnaviUrl, // リクエスト送信先URL
    data: data, // サーバに送信する値。オブジェクトなのでクエリー文字に変換されてGETリクエストとして付加。
    type: 'GET', // HTTP通信の種類。初期値は'GET'
    dataType: 'json', // サーバから返されるデータの型。省略した場合自動的に判別。
    timeout: 10000, // タイムアウト時間。10000ms経過しても通信が完了しない場合error処理。
  })
  .done(function(data) { // ajaxの処理が成功した時、dataにその結果が入る。
    display(data);
  })
  .fail(function(jqXHR, textStatus, errorThrown) { // ajaxの処理失敗時
    $('#searchResults').append(errorThrown); // エラー内容を表示
  })
})

// 「近くの店舗を検索」ボタンが押された時
$('#nearStore').on('click', function() {
  data = { keyid : keyid }; // 前回の検索dataを初期化

  $searchName = $('#searchName').val(); // 「店名」検索フォームに入力された文字列
  $freeWord = $('#freeWord').val(); // 「フリーワード」検索フォームに入力された文字列
  let $range = $('#range').val(); // 検索する範囲を指定する変数

  wordInput(); // 入力されたデータをdataに格納
  // 現在位置を取得する
  navigator.geolocation.getCurrentPosition(function(genzaiti) { // 現在地が取得できたら

    data.latitude = genzaiti.coords.latitude; // 現在地の緯度と経度を取得し送信するdataに入れる
    data.longitude = genzaiti.coords.longitude;
    data.range = $range; // 検索範囲をdataに入れる

    $.ajax( {
      url: gnaviUrl,
      data: data,
      dataType: 'json',
      type: 'GET',
      timeout: 20000,
    })
    .done(function(data) { // ajaxの処理成功時
      display(data); // 検索結果を表示
    })
    .fail(function(jqXHR, textStatus, errorThrown) { // ajaxの処理失敗時
        $('#searchResults').text(''); // 前回の検索結果表示を初期化
        $('#searchResults').append(errorThrown); // エラー内容を表示
    })
  });
})

// 入力された検索ワードをdataに入れる関数
function wordInput() {
  if ($searchName && $freeWord) { // 店名とフリーワード両方入力された場合
    data.name = $searchName; // 送信するデータにプロパティnameを追加
    data.freeword = $freeWord; // 送信するデータにプロパティfreewordを追加
  } else if ($searchName) { // 店名だけ入力された場合
    data.name = $searchName;
  } else { // フリーワードだけ入力された場合
    data.freeword = $freeWord;
  }
}

// 受け取ったデータを表示する関数
function display(data) {
  $('#searchResults').text(''); // 前回の検索結果表示を初期化
  $(data.rest).each(function() { // dataのプロパティrestの要素一つ一つに対して繰り返し処理
    // 検索結果を画面に表示
    // 名前とカテゴリーを表示
    $('#searchResults').append(`
      <span id='name'>${this.name}</span>
      <span>${this.category}</span><div>
    `)
    if　(this.image_url.shop_image1) { // image1がある時表示
      $('#searchResults').append(`
        <img src='${this.image_url.shop_image1}' alt='image1'>
      `)
    }
    if　(this.image_url.shop_image2) { // image2がある時表示
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
}