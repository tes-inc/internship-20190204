let array = []; // オブジェクトを入れる配列

$('#send').click(function() { // 「送信」ボタンが押された時
    if($('#title').val()==='' || $('#rate').val()==='' || $('#name').val()===''){
        alert('入力されていない項目があります');
    }else{
        if(window.confirm('送信してよろしいですか？')){	// 「OK」時の処理開始 ＋ 確認ダイアログの表示
            save();
            display();
        }else{	// 「キャンセル」時の処理開始
            window.alert('キャンセルされました'); // 警告ダイアログを表示
        }
    }
});

function save(){ // formに入力されたデータを保存する関数
    let obj = { // オブジェクトにデータを追加
        'title' : $('#title').val(), // 「title:題名」
        'rate'  : $('#rate').val(), // 「rate:星の数」
        'name'  : $('#name').val(), // 「name:投稿者名」
        'review': $('#review').val() // 「review:感想」
    };
    array.push(obj); // 配列にオブジェクトを追加
    localStorage.setItem('obj',JSON.stringify(array)); // JSON形式から文字列へ変換してlocalStorageに保存
}

function display(){ // 保存されたデータを表示する関数
    array = JSON.parse(localStorage.getItem('obj')); // localStorageから文字列を取得してJSON形式へ変換
    $("#recorded").text(""); // 前回「display」実行時に表示されたレビューを消す
    array = array.reverse(); // 新しく入力されたレビューを先に出力できるようにarrayを逆順にする
    for(var item in array){ // JSON形式のデータを一つずつ取り出して表示
        $("#recorded").append('<div><h2>'+'『'+array[item]['title']+'<span>'+'』'+'　☆'+array[item]['rate']+'</span>'+'<span>'+'　投稿者名：'+array[item]['name']+'</span>'+'</h2>'+'<div>'+'オススメ理由：'+array[item]['review'] + '</div></div><br><hr>');
    }
}

// function checkForm(){
//     if($('#title').val()==='' || $('#rate').val()==='' || $('#name').val()===''){
//         alert('入力されていない項目があります');
//     }else{

//     }
// }

// function disp(){
// 	if(window.confirm('送信してよろしいですか？')){	// 「OK」時の処理開始 ＋ 確認ダイアログの表示
// 		; // 
// 	}else{	// 「キャンセル」時の処理開始
// 		window.alert('キャンセルされました'); // 警告ダイアログを表示
// 	}
// }
    
    // for(var i=0; i <array.length; i++){
    //     $("#recorded").html("<div>"+"『"+array[i].title+"』" + " ☆：" + array[i].rate + " 投稿者：" + array[i].name + "<div>" + array[i].review + "</div></div>");
    // }

