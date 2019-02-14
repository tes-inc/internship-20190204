let localArray = []; // localStorageから持ってきた値が入っている配列
let defaultArray = []; // 投稿順にオブジェクトが入っている配列：投稿順ソート用

$('#send').click(function() { // 「送信」ボタンが押された時
    if($('#title').val()==='' || $('#rate').val()==='' || $('#name').val()===''){
        alert('入力されていない項目があります');
    }else{
        if(window.confirm('送信してよろしいですか？')){	// 「OK」時の処理開始 ＋ 確認ダイアログの表示
            save(); // formに入力されたデータをlocalStorageに保存する
            localArray = JSON.parse(localStorage.getItem('obj')); // localStorageから文字列を取得してJSON形式へ変換
            display(); // 保存されたデータを表示する関数
        }else{	// 「キャンセル」時の処理開始
            window.alert('キャンセルされました'); // 警告ダイアログを表示
        }
    }
});

// 「オススメ度ソート:投稿順」ボタンが押された時レビューを投稿順に表示する
$("#defaultSort").click(function() {
    localArray = defaultArray.slice();
    display();
});
// 「オススメ度ソート:昇順」ボタンが押された時レビューをオススメ度昇順に表示ascending order
$("#asSort").click(function() {
    localArray.sort(function(a,b){
        return a.rate-b.rate;
    });
    display();
});

// 「オススメ度ソート:降順」ボタンが押された時レビューをオススメ度降順に表示descending order
$('#desSort').click(function(){
    localArray.sort(function(a,b){
        return b.rate-a.rate;
    });
    display();
});

function save(){ // formに入力されたデータをlocalStorageに保存する関数
    let obj = { // オブジェクトにデータを追加
        'title' : $('#title').val(), // title:題名
        'rate'  : $('#rate').val(), // rate:星の数
        'name'  : $('#name').val(), // name:投稿者名
        'review': $('#review').val() // review:感想
    };
    defaultArray.unshift(obj); // 配列の先頭にオブジェクトを追加
    localStorage.setItem('obj',JSON.stringify(defaultArray)); // JSON形式から文字列へ変換してlocalStorageに保存
}

function display(){ // 保存されたデータを表示する関数
    $('#recordedData').text(''); // レビューを更新するため前回「display」実行時に表示されたレビューを消す
    for(var item in localArray){ // JSON形式のデータを一つずつ取り出して表示
        $('#recordedData').append('<span id="recordedTitle">'+'『'+localArray[item]['title']+'』'+'</span><span>'+'　☆'+localArray[item]['rate']+'</span><span>'+'　投稿者名：'+localArray[item]['name']+'</span>'+'<div>'+'オススメ理由：'+localArray[item]['review'] + '</div><br><hr>');
    }
}