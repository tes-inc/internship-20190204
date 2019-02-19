// ぐるなびのURL＋keyid(アクセスキー)
let gnaviUrl = `https://api.gnavi.co.jp/RestSearchAPI/v3/?keyid=e2d1f212bb0ddfdd774c23e22bedf31e`;

$('#search').on('click', function() { // 検索ボタンが押された時
  $('#searchResults').text(''); // 前回の検索結果を消す

  if($('#searchName').val()===''){
    alert('入力されていない項目があります');
    return;
  }
  // let $form = $('form').serialize(); // formに入力された内容「店舗名」「キーワード検索」をシリアライズ
  let searchName = $('#searchName').serialize();
  let keyWord = $('#keyWord').val();

  $.ajax( {
    url: gnaviUrl + '&' + searchName, // JSON形式のデータ
    type: 'GET',
    timeout: 5000,

    success: function(data) { // ajaxの処理が終わったら。dataにその結果が入る。
      $(data.rest).each(function() { // dataのプロパティrestの要素一つ一つに対して繰り返し処理
        let prLong = this.pr.pr_long; // キーワード検索のためprLong文を変数に格納
        if (!prLong.match(keyWord)) { // prLongにkeyWordを含まない場合出力しない
          return;
        }

        // 店舗情報を出力
        $('#searchResults').append(`
          <span id='name'>${this.name}</span>
          <span>${this.category}</span>
          <div>
            <img src='${this.image_url.shop_image1}' alt='image1'>
            <img src='${this.image_url.shop_image2}' alt='image2'>
          </div>
          <p>${this.pr.pr_short}</p>
          <hr>
        `);
      });
    },
    error: function() { // ajaxの処理が失敗したら
      alert('通信エラー');
    }
  });
})



  // {
    // '@attributes': {'api_version': 'v3'},
    // 'total_hit_count': 1170,
    // 'hit_per_page': 10,
    // 'page_offset': 1,
    // 'rest': [
    //        {'@attributes': {'order': 0},
    //         'id': 'gesd000',
    //         'update_date': '2019-02-15T00:39:37+09:00',
    //         'name': '完全個室ダイニング 小松屋 秋葉原総本店',
    //         'name_kana': 'カンゼンコシツダイニングコマツヤ アキハバラソウホンテン',
    //         'latitude': '35.696025',
    //         'longitude': '139.774269',
    //         'category': '完全個室の和食居酒屋',
    //         'url': 'https://r.gnavi.co.jp/pzse8z7w0000/?ak=C3xusQXlt4l7xZVT0lYMR8pNj0Idf5Ktsd%2B8eXzZlZE%3D',
    //         'url_mobile': 'http://mobile.gnavi.co.jp/shop/gesd000/?ak=C3xusQXlt4l7xZVT0lYMR8pNj0Idf5Ktsd%2B8eXzZlZE%3D',
    //         'coupon_url': {
    //             'pc': 'https://r.gnavi.co.jp/pzse8z7w0000/coupon/',
    //             'mobile': 'http://mobile.gnavi.co.jp/shop/gesd000/coupon'
    //         },
    //         'image_url': {
    //             'shop_image1': 'https://uds.gnst.jp/rest/img/pzse8z7w0000/t_0n9r.jpg',
    //             'shop_image2': 'https://uds.gnst.jp/rest/img/pzse8z7w0000/t_0n9s.jpg',
    //             'qrcode': 'https://c-r.gnst.jp/tool/qr/?id=gesd000&q=6'
    //         },
    //         'address': '〒101-0041 東京都千代田区神田須田町2-11-8',
    //         'tel': '050-3469-9918',
    //         'tel_sub': '03-6262-9519',
    //         'fax': '',
    //         'opentime': ' ランチ：11:00～15:00(L.O.14:30)、ディナー：16:00～24:00(L.O.23:30、ドリンクL.O.23:45)',
    //         'holiday': '不定休日あり',
    //         'access': {
    //             'line': 'ＪＲ',
    //             'station': '秋葉原駅',
    //             'station_exit': '',
    //             'walk': '4',
    //             'note': ''
    //         },
    //         'parking_lots': '',
    //         'pr': {
    //             'pr_short': '<秋葉原駅 徒歩3分> 多彩な串や鍋と酒を楽しむ全席個室の居酒屋 20名様部屋で歓送迎会！60名様貸切も可 餃子＆唐揚食べ飲み放題コース3,480円が人気 満腹ランチ580円〜',
    //             'pr_long': '秋葉原駅・岩本町駅近の好立地！\n多彩なコースと大小様々な個室で寛ぎの新年会を！\n◆全コース2時間飲み放題付（＋500円で3時間）\n・お造りに串や餃子、選べる鍋の「宴会コース」<10品>今だけ2,980円！\n・生牡蠣の他、海老・蟹・鮭など具沢山鍋を楽しむ「贅沢海鮮コース」<9品>0,000円\n◆2時間食べ飲み放題コース\n・餃子26種と唐揚げ20種を存分に！「餃子＆唐揚げコース」<11品>3,480円\n・鶏肉好き必見！「焼き鳥&唐揚げコース」<8品>3,480円\n◆逸品和食\n築地直仕入れ「刺身五点盛り」1,280円、国産牛「博多もつ鍋」780円が人気\n◆お酒120種以上\nビール、サワーに、紹興酒やマッコリも\nお通し＋お一人様1品オーダー制「単品2時間飲み放題」1,500円あり\n◆全60席の個室和空間\n4～30名様向けに区切られたお席\n懇親会や歓送迎会には24名様向け半貸切がおすすめ'
    //         },
    //         'code': {
    //             'areacode': 'AREA110',
    //             'areaname': '関東',
    //             'prefcode': 'PREF13',
    //             'prefname': '東京都',
    //             'areacode_s': 'AREAS2200',
    //             'areaname_s': '秋葉原',
    //             'category_code_l': [
    //                 'RSFST09000',
    //                 ''
    //             ],
    //             'category_name_l': [
    //                 '居酒屋',
    //                 ''
    //             ],
    //             'category_code_s': [
    //                 'RSFST09004',
    //                 ''
    //             ],
    //             'category_name_s': [
    //                 '居酒屋',
    //                 ''
    //             ]
    //         },
    //         'budget': 2500,
    //         'party': 3000,
    //         'lunch': 680,
    //         'credit_card': 'VISA,MasterCard,UC,DC,UFJ,ダイナースクラブ,アメリカン・エキスプレス,NICOS,アプラス,セゾン,J-DEBIT,MUFG',
    //         'e_money': 'nanaco,楽天Edy,Suica,PASMO,iD,WAON,Airペイ',
    //         'flags': {
    //             'mobile_site': 1,
    //             'mobile_coupon': 1,
    //             'pc_coupon': 1
    //         }
    //     },
    //   }

  // .done(function(data) { // 通信成功時

  // })
  // .fail(function() { // 通信失敗時

  // });

// function display() { // 保存されたデータを表示する関数
//   $('#searchResults').text(''); // レビューを更新するため前回「display」実行時に表示されたレビューを消す
//   for (const item in json) { // JSON形式のデータを一つずつ取り出して表示
//     $('#searchResults').append(`
//       <span id = 'recordedTitle'>『${json[item]['name']}』</span><br><hr>
//     `);
//   }
// }
      // $.each(data.rest, function() {
      //   $('#searchResults').append(`
      //   <h2>${this.name}</h2>
      //   <img src='${this.image_url.shop_image1}' alt=''>
      //   <img src='${this.image_url.shop_image2}' alt=''>
      //   <hr>
      //   `);
      // });