$(function(){

  //ローディング画像表示の関数
  function dispLoading(msg){
    // 引数なし（メッセージなし）を許容
    if( msg == undefined ){
      msg = "";
    }
    // 画面表示メッセージ
    let dispMsg = "<div class='loadingMsg'>" + msg + "</div>";
    // ローディング画像が表示されていない場合のみ出力
    if($("#loading").length == 0){
      $("body").append("<div id='loading'>" + dispMsg + "</div>");
    }
  }

  /* ------------------------------
    Loading イメージ削除関数
   ------------------------------ */
  function removeLoading(){
    $("#loading").remove();
  }


  //デフォルトではトップへ戻るボタン、ページ送りボタン、footerを隠す
  $('#page_top').hide();
  $('#next').hide();
  $('#back').hide();
  $('#moreNext').hide();
  $('#moreBack').hide();
  $('footer').hide();
  //スクロールをしたとき
  $(window).scroll(function(){
  //ページのトップから750pxすぎた時
    if($(this).scrollTop() > 750){
  //トップへ戻るボタン、ページ送りボタン、footerを表示
    $('#page_top').fadeIn();
    $('#back').fadeIn();
    $('#next').fadeIn();
    $('footer').fadeIn();
    } else {
      $('#page_top').fadeOut();
      $('#back').fadeOut();
      $('#next').fadeOut();
      $('#moreNext').hide();
      $('#moreBack').hide();
      $('footer').fadeOut();
    }
  });

  //前へボタンにカーソルを合わせた時の処理
  $('#back').hover(function(){
    $('#moreBack').show();
  });

  //次へボタンにカーソルを合わせた時の処理
  $('#next').hover(function(){
    $('#moreNext').show();
  });

  //ページの変数
  let page = 1;
  //ajaxの処理を格納するための変数
  let jqxhr = null;
  //検索か周辺検索かを切り分けるための変数
  let num ;

  //検索ボタン押下時の処理
  function addItem() {
    if (jqxhr) {
      // 通信を中断する
      // ただしfail(), always()は実行される
      jqxhr.abort();
    }

    //店名検索フォームの入力値を格納する為の変数
    let param =  $('#shopName').val();
    //キーワード検索フォームの入力値を格納する為の変数
    let param2 = $('#freeWord').val();
    //住所と店名をUTF-8でURLエンコードし、格納する為の変数
    let address = encodeURI('address');
    let name = encodeURI('name');
    num = 1;

    //Loadhing画像表示
    dispLoading("処理中...");

    //ajaxの処理を格納
    jqxhr = $.ajax({
      url: `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=9871f865dbe316cd7fb74d42daba6012&name=${param}&freeword=${param2}&freeword_condition=2&offset_page=${page}`,
      dataType: 'json',
      date:{
        name: name,
        address: address,
        tel: 'tel',
        image_url: 'shop_image1,shop_image2,qrcode',
        pr: 'pr_short,pr_long',
        shopUrl: 'url',
      },
    }).done(function(date){
      let dateArray = date.rest;
      $('#offsetPage').empty();
      $('#offsetPage').append(`<p id="total">Find:全${date.total_hit_count}件-${page}/${Math.ceil(date.total_hit_count/10)}page-</p>`);
      $('table').empty();
      $.each(dateArray, function (i) {
        // 画像がある場合とない場合で条件分岐
        const img = dateArray[i].image_url.shop_image1
          ? `<img src="${dateArray[i].image_url.shop_image1}" alt="Shop Image">`
          : "<div><p id='noImg'>No Image!!</p><div>";

        $('table').append(`
          <tr>
            <td class="animated slideInRight">
              <p id="title">
                <a href="${dateArray[i].url}" target="blank">◉${dateArray[i].name}</a>
              </p>
              <hr>
              <p class="cp_imghover cp_bw">
                <a href="${dateArray[i].url}" target="blank">${img}</a>
              </p>
              <p id="place">
                ${dateArray[i].address}<br>${dateArray[i].tel}
              </p>
              <p id="pr">
                ${dateArray[i].pr.pr_short}
              </p>
            </td>
          </tr>
        `);
      });
    }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
      alert('Nothing Hit!');
      console.log("XMLHttpRequest : " + XMLHttpRequest.status);
      console.log("textStatus     : " + textStatus);
      console.log("errorThrown    : " + errorThrown.message);
    }).always( function() {
      // Lading 画像を消す
      removeLoading();
    });
  };

  //Findボタン押下時
  $('#btnSearch').on('click',function(){
    page = 1;
    addItem();
    });//Findボタンの処理終了

    //Nearボタン押下時
  $('#btnGpsSearch').on('click',function(){
    page = 1;
    addItem2();
  });//Nearボタンの処理終了

    //次へボタン押下時
    $('#next').on('click',function(){
      if(page <= 100){
        page++;
        if(num == 1){
          addItem();
        }else if(num == 2){
          addItem2();
        }
      };
    });

    //5ページ次へボタン押下時
    $('#moreNext').on('click',function(){
      if(page === 1){
        page = 5;
      }else{
        page += 5;
      }
      if(num == 1){
        addItem();
      }else if(num == 2){
        addItem2();
      }
    });

      //前へボタン押下時
      $('#back').on('click',function(){
        if(page > 0){
          page--;
          if(num == 1){
            addItem();
          }else if(num == 2){
            addItem2();
          }
        };
      });

      //5ページ前へボタン押下時
      $('#moreBack').on('click',function(){
        if(page <= 5){
          page = 1;
        }else{
          page -= 5;
        }
        if(num == 1){
          addItem();
        }else if(num == 2){
          addItem2();
        }
      });

  //周辺検索ボタン押下時の処理
  function addItem2() {
    if (jqxhr) {
      // 通信を中断する
      // ただしfail(), always()は実行される
      jqxhr.abort();
    }

  //店名検索フォームの入力値を格納する為の変数
  let param =  $('#shopName').val();
  //キーワード検索フォームの入力値を格納する為の変数
  let param2 = $('#freeWord').val();
  //住所と店名をUTF-8でURLエンコードし、格納する為の変数
  let address = encodeURI('address');
  let name = encodeURI('name');
  num = 2;

  //Loadhing画像表示
  dispLoading("処理中...");

    //現在値を取得する為の関数
    navigator.geolocation.getCurrentPosition(function(potision){
      //緯度取得
      let ido = potision.coords.latitude;
      //経度取得
      let keido = potision.coords.longitude;

      //ajaxの処理を格納
      jqxhr = $.ajax({
        url: `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=9871f865dbe316cd7fb74d42daba6012&name=${param}&freeword=${param2}&freeword_condition=2&latitude=${ido}&longitude=${keido}&range=5&offset_page=${page}`,
        dataType: 'json',
        date:{
          name: name,
          address: address,
          tel: 'tel',
          image_url: 'shop_image1,shop_image2,qrcode',
          pr: 'pr_short,pr_long',
          shopUrl: 'url',
        },
      }).done(function(date){
        let dateArray = date.rest;
        $('#offsetPage').empty();
        $('#offsetPage').append(`<p id="total">Find:全${date.total_hit_count}件-${page}/${Math.ceil(date.total_hit_count/10)}page-</p>`);
        $('table').empty();
        $.each(dateArray, function (i) {
          // 画像がある場合とない場合で条件分岐
          const img = dateArray[i].image_url.shop_image1
            ? `<img src="${dateArray[i].image_url.shop_image1}" alt="Shop Image">`
            : "<div><p id='noImg'>No Image!!</p><div>";

          $('table').append(`
            <tr>
              <td class="animated slideInRight">
                <p id="title">
                  <a href="${dateArray[i].url}" target="blank">◉${dateArray[i].name}</a>
                </p>
                <hr>
                <p class="cp_imghover cp_bw">
                  <a href="${dateArray[i].url}" target="blank">${img}</a>
                </p>
                <p id="place">
                  ${dateArray[i].address}<br>${dateArray[i].tel}
                </p>
                <p id="pr">
                  ${dateArray[i].pr.pr_short}
                </p>
              </td>
            </tr>
          `);
        });
        }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
          alert('Nothing Hit!');
          console.log("XMLHttpRequest : " + XMLHttpRequest.status);
          console.log("textStatus     : " + textStatus);
          console.log("errorThrown    : " + errorThrown.message);
        }).always( function(data) {
          // 処理終了時
          // Lading 画像を消す
          removeLoading();
        });
    });
  }
});//End

