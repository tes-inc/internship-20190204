$(function(){

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


  //デフォルトではトップへ戻るボタンを隠す
  $('#page_top').hide();
  $('#kekka').hide();
  $('footer').hide();
  //スクロールをしたとき
  $(window).scroll(function(){
  //ページのトップから850pxすぎた時
    if($(this).scrollTop() > 850){
  //トップへ戻るボタンを表示
    $('#page_top').fadeIn();
    $('#kekka').fadeIn();
    $('footer').fadeIn();
    } else {
      $('#page_top').fadeOut();
      $('#kekka').fadeOut();
      $('footer').fadeOut();
    }
  });

  let page = 1;
  let jqxhr = null;
  let num ;

  function addItem() {
    if (jqxhr) {
      // 通信を中断する
      // ただしfail(), always()は実行される
      jqxhr.abort();
    }

    let param =  $('#shopName').val();
    let param2 = $('#freeWord').val();
    let address = encodeURI('address');
    let name = encodeURI('name');
    num = 1;

    dispLoading("処理中...");

    jqxhr = $.ajax({
      url: 'https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=e2d1f212bb0ddfdd774c23e22bedf31e&name='+param+'&freeword='+param2+'&freeword_condition=2&offset_page='+page,
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
      $('#offsetPage').append('<p id="total">Find:全'+date.total_hit_count+'件-'+page+'page-</p>');
      $('table').empty();
      $.each(dateArray,function(i){
        $('table').append('<tr><td class="animated slideInRight"><p id="title"><a href="'+dateArray[i].url+'" target="blank">◉'+dateArray[i].name+'</p><hr><p class="cp_imghover cp_bw"><img src="'+dateArray[i].image_url.shop_image1+'" alt="No Image!!"></a></p>'+'<p id="place">'+dateArray[i].address+'<br>'+dateArray[i].tel+'</p><p id="pr">'+dateArray[i].pr.pr_short+'</p></td></tr>');
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
    addItem();
    });//Findボタンの処理終了

    //Nearボタン押下時
  $('#btnGpsSearch').on('click',function(){
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

  function addItem2() {
    if (jqxhr) {
      // 通信を中断する
      // ただしfail(), always()は実行される
      jqxhr.abort();
    }

  let param =  $('#shopName').val();
  let param2 = $('#freeWord').val();
  let address = encodeURI('address');
  let name = encodeURI('name');
  num = 2;

  dispLoading("処理中...");

    navigator.geolocation.getCurrentPosition(function(potision){
      let ido = potision.coords.latitude;
      let keido = potision.coords.longitude;

      jqxhr = $.ajax({
        url: 'https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=e2d1f212bb0ddfdd774c23e22bedf31e&name='+param+'&freeword='+param2+'&freeword_condition=2&latitude='+ido+'&longitude='+keido+'&range=5&offset_page='+page,
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
        $('#offsetPage').append('<p id="total">Find(In 3000m):全'+date.total_hit_count+'件-'+page+'page-</p>');
        $('table').empty();
        $.each(dateArray,function(i){
          $('table').append('<tr><td class="animated slideInRight"><p id="title"><a href="'+dateArray[i].url+'" target="blank">◉'+dateArray[i].name+'</p><hr><p class="cp_imghover cp_bw"><img src="'+dateArray[i].image_url.shop_image1+'" alt="No Image!!"></a></p>'+'<p id="place">'+dateArray[i].address+'<br>'+dateArray[i].tel+'</p><p id="pr">'+dateArray[i].pr.pr_short+'</p></td></tr>');
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

