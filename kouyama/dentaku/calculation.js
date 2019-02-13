function calc(ch){ // 押されたボタンの値を引数で受け取り計算をする関数
    let $calSpace = $('#calSpace'); // jQueryオブジェクトを変数に格納

    if(ch === '='){ // ＝が押された時calSpaceの値を式として計算し同じ場所に返す
    let result = eval($calSpace.val()); // 計算結果を変数resultに格納
        if(result === Infinity){ // 計算結果がInfinityの時
            alert('0で割ることはできません'); // アラートで警告
            $calSpace.val(''); // 値を初期化
        }else{ // 計算結果を表示
            $calSpace.val(result);
        }
    }else if(ch === 'C'){ // Cが押された時calSpaceの値を初期化
        $calSpace.val('');
    }else{ // それ以外はどんどん押されたボタンの値を文字列として連結していく
        $calSpace.val($calSpace.val() + ch);
    }
}
// document.getElementById('calSpace').value = eval(document.getElementById('calSpace').value);
// document.getElementById('calSpace').value += ch;

