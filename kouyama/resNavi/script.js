const gnaviUrl = `https://api.gnavi.co.jp/RestSearchAPI/v3/`; // ぐるなびAPIのURL
const keyid = '9871f865dbe316cd7fb74d42daba6012'; // ぐるなびAPIのkeyid
let data; // URLとして送信するオブジェクト
let $search_name; // 店名検索に入力された文字列
let $free_word; // フリーワード検索に入力された文字列
let $thc; // 検索ヒット数totalhitcount
let page = 1; // 現在のページ数を格納


// 検索ボタンが押された時
$('#search').on('click', function() {
  $('#thc_result').html('<img src="loading.gif">'); // ローディング画像を表示

  data = { keyid : keyid }; // 前回の検索dataを初期化
  $search_name = $('#search_name').val(); // 「店名」検索フォームに入力された文字列
  $free_word = $('#free_word').val(); // 「フリーワード」検索フォームに入力された文字列
  let $range = $('#range').val(); // 検索する範囲を指定する変数

  if (!$search_name && !$free_word && !$range) { // 店名・フリーワード・範囲どれも入力されていない場合
    alert('検索ワードを入力してください');
    return;
  }
  wordInput(); // 入力されたデータをdataに格納

  if ($range != 0) { // 検索範囲が指定されている場合
    // 現在位置を取得
    navigator.geolocation.getCurrentPosition(function(genzaiti) { // 現在地が取得できたら
      data.latitude = genzaiti.coords.latitude; // 現在地の緯度と経度を取得し送信するdataに入れる
      data.longitude = genzaiti.coords.longitude;
      data.range = $range; // 検索範囲をdataに入れる

      ajax();
    });
  } else { // 店名とフリーワードだけの検索
    ajax();
  }
})

// 次の10件を表示
$('#next_page').on('click', function() {
  if (page >= Math.ceil($thc/10)) { // 表示したいページが検索結果のページ数より多くなる時
    return;
  }
  page++; // 次のページへ
  data.offset_page = page; // 検索開始ページをプロパティに追加
  ajax();
})
// 前の10件を表示
$('#return_page').on('click', function() {
  if (page <= 1) {
    return;
  }
  page--;
  data.offset_page = page;
  ajax();
})

// 入力された検索ワードをdataに入れる関数
function wordInput() {
  if ($search_name && $free_word) { // 店名とフリーワード両方入力された場合
    data.name = $search_name; // 送信するデータにプロパティnameを追加
    data.freeword = $free_word; // 送信するデータにプロパティfree_wordを追加
  } else if ($search_name) { // 店名だけ入力された場合
    data.name = $search_name;
  } else { // フリーワードだけ入力された場合
    data.freeword = $free_word;
  }
}

// ajaxの処理
function ajax(){
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
    $('#search_results').text(''); // 前回の検索結果表示を初期化
    $('#page_numbers').text(''); // 前回の検索結果のページナンバーを消す
    $('#page_button').addClass('hide'); // ページ操作ボタンの非表示
    $('#thc_result').text(errorThrown); // エラー内容を表示
  })
}

// 受け取ったデータを表示する関数
function display(data) {
  $thc = data.total_hit_count; // 検索ヒット数を格納

  $('#search_results').text(''); // 前回の検索結果表示を初期化
  $('#page_numbers').text(''); // 前回の検索結果のページナンバーを消す
  $('#page_button').removeClass('hide'); // ページ操作ボタンの表示

  // 検索結果のページナンバーを表示
  for (let i = 1; i <= Math.ceil($thc/10) && i <= 100; i++) {
    $('#page_numbers').append(`
      <span id="page${i}" onClick="clickNumber(${i})" value="${i}">${i}</span>
    `)
    if(i === data.page_offset){ // 現在表示されているページの数字ならば
      $(`#page${i}`).addClass('strong'); // 強調
    }
  }
  $('#again').html(`again<br>ぐるぐる?`);
  $('#thc_result').html(`<p class="thc_result2 animated rotateIn">${$thc}軒Hit!</p>`);

  $(data.rest).each(function() { // dataのプロパティrestの要素一つ一つに対して繰り返し処理
    let img1; // PR画像1
    let img2; // PR画像2
    // 画像がなければ別の画像に差し替え
    this.image_url.shop_image1 ? img1 = this.image_url.shop_image1 : img1 = 'LOK_gohantomisoshiru_TP_V 3.jpeg';
    this.image_url.shop_image2 ? img2 = this.image_url.shop_image2 : img2 = 'LOK_gohantomisoshiru_TP_V 3.jpeg';

    // 検索結果を画面に表示
    // 名前とカテゴリーを表示
    $('#search_results').append(`
      <div class='store'>
        <hr>
        <p class='store_title'>
          <span class='store_name'><a href='${this.url}'>${this.name}</a></span>
          <span class='store_category'>${this.category}</span>
        </p>
        <div>
          <img class='img' src="${img1}" alt="img1" height='240' width='240'>
          <img class='img' src="${img2}" alt="img2" height='240' width='240'>
        </div>
        <div class='store_inf'>
          <p class='store_address'>${this.address}</p>
          <p class='pr_long'>${this.pr.pr_long}</p>
        </div>
      </div>
    `)
  });
}

// ページナンバーをクリックされた時の処理
function clickNumber(num) { // クリックされたボタンの数字を引数で受け取る
  page = num; // ページ数に格納
  data.offset_page = page // 検索開始ページをプロパティに追加
  ajax();
}

// BOTTOMボタンが押された時の処理
$(function(){
  $("#page_bottom").click(function(){
      $('html, body').animate({
        scrollTop: $(document).height()
      },1500);
      return false;
  });
});