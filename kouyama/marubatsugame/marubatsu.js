$(document).ready(function(){ // ウィンドウがロードされた時処理
    let turn = "○"; // ○か×どちらのターンか判別
    let winCountM = 0; // ○の勝利数
    let winCountB = 0; // ×の勝利数
    let gameCount = 1; // 何試合目か
    let count = 0; // 手数。引き分けの判断用。

    // 要素の入っていないtdタグに現在のターン(○か×)を代入
    function marubatsu(event){
        if(event.target.innerHTML === ""){
            event.target.innerHTML = turn;
            if(result()){
                if(turn === "○"){
                    winCountM++;
                    $("#winner").text(turn + "の勝ち");
                    $("#kekkaM").text(turn + "：" + String(winCountM) + "勝");
                }else{
                    winCountB++;
                    $("#winner").text(turn + "の勝ち");
                    $("#kekkaB").text(turn + "：" + String(winCountB) + "勝");
                }
                restart(); // もう一度最初からゲームスタート
            }else{ 
                count++; // 何手目かをカウント
                if(count === 9){
                    $("#winner").text("引き分けです");
                    $("#hikiwake").text("引き分け：" + String(gameCount - (winCountM+winCountB)) + "回");
                    restart(); // もう一度最初からゲームスタート
                }else{
                    changeTurn();
                }

            }

        }
    }

    // 勝敗を判定する処理　3つ揃っていたらtrue,そうでなければfalse
    function result(){
        // let tableArray = document.getElementById("marubatsutable").getElementsByTagName("td");
        // 1行目に○か×が揃ったらtrueを返す
        if (tableArray[0].innerHTML != '' && tableArray[0].innerHTML == tableArray[1].innerHTML && tableArray[0].innerHTML == tableArray[2].innerHTML) {
            return true;
        // 2行目
        } else if (tableArray[3].innerHTML != '' && tableArray[3].innerHTML == tableArray[4].innerHTML && tableArray[3].innerHTML == tableArray[5].innerHTML) {
            return true;
        // 3行目
        } else if (tableArray[6].innerHTML != '' && tableArray[6].innerHTML == tableArray[7].innerHTML && tableArray[6].innerHTML == tableArray[8].innerHTML) {
            return true;
        // 1列目
        } else if (tableArray[0].innerHTML != '' && tableArray[0].innerHTML == tableArray[3].innerHTML && tableArray[0].innerHTML == tableArray[6].innerHTML) {
             return true;
        // 2列目
        } else if (tableArray[1].innerHTML != '' && tableArray[1].innerHTML == tableArray[4].innerHTML && tableArray[1].innerHTML == tableArray[7].innerHTML) {
            return true;
        // 3列目
        } else if (tableArray[2].innerHTML != '' && tableArray[2].innerHTML == tableArray[5].innerHTML && tableArray[2].innerHTML == tableArray[8].innerHTML) {
            return true;
        // 左上から右下にかけて斜め
        } else if (tableArray[0].innerHTML != '' && tableArray[0].innerHTML == tableArray[4].innerHTML && tableArray[0].innerHTML == tableArray[8].innerHTML) {
            return true;
        // 右上から左下にかけて斜め
        } else if (tableArray[2].innerHTML != '' && tableArray[2].innerHTML == tableArray[4].innerHTML && tableArray[2].innerHTML == tableArray[6].innerHTML) {
            return true;
        // そろっていなかったらfalse
        } else {
            return false;
        }
    }

    // ゲームが終わったらもう一度最初から開始
    function restart(){
        turn = "○"; // ターンのリセット
        count = 0; // 手数のリセット
        gameCount++; // 試合数をカウント

        $("#turn").html(turn + "のターンです"); // ターン表示のリセット
        $("#gameCount").html(String(gameCount) + "戦目");
        // document.getElementById("gameCount").innerHTML = String(gameCount) + "戦目";
        let tableArray = document.getElementById("marubatsutable").getElementsByTagName("td");
        // クリックされた時tdタグの要素に○か×を挿入するmarubatsuをテーブルの各要素に実装
        for (var i = 0; i < tableArray.length; ++i) {
            tableArray[i].innerHTML = "";
        }
    }

    // ○と×のターンが交互にくるようにする処理
    function changeTurn(){
        if(turn === "○"){
            turn = "×";
        }else{
            turn = "○";
        }
        $("#turn").html(turn + "のターンです");
    }


    // tableArray:○か×を表示するtdタグの要素を格納する配列
    let tableArray = document.getElementById("marubatsutable").getElementsByTagName("td");
    // クリックされた時tdタグの要素に○か×を挿入するmarubatsuをテーブルの各要素に実装
    for (let i = 0; i < tableArray.length; ++i) {
        tableArray[i].addEventListener("click", marubatsu);
    }

    // idがa1のタグがクリックされた時marubatsuを実行

    // let a1 = document.getElementById("a1");
    // a1.addEventListener("click",marubatsu);
    // document.getElementById("a1").addEventListener("click",marubatsu);
    // document.getElementById("a2").addEventListener("click",marubatsu);
    // document.getElementById("a3").addEventListener("click",marubatsu);
    // document.getElementById("a4").addEventListener("click",marubatsu);
    // document.getElementById("a5").addEventListener("click",marubatsu);
    // document.getElementById("a6").addEventListener("click",marubatsu);
    // document.getElementById("a7").addEventListener("click",marubatsu);
    // document.getElementById("a8").addEventListener("click",marubatsu);
    // document.getElementById("a9").addEventListener("click",marubatsu);
});
