// $(document).ready(function(){ // ウィンドウがロードされた時処理
    ans = 0;
    num = "0";
    key = "";
    kigou = "";
    
    function calc(btn) { // 押されたボタン(btn)のvalue値を引数で受け取る
        if (!isNaN(btn)) { // btnが数字ならば
            if (!isNaN(key)) { // 一つ前の入力(key)が数字なら(連続して数字が押された時
                if(num == "0"){ // 0だけが先に入っている場合
                    num = "" + btn; // 0を上書き
                }else{
                    num += "" + btn; // 文字列として数字をnumと連結する
                }
            }else{ // 一つ前の入力が数字以外なら
                num = "" + btn; // 文字列として数字をnumに代入する(btnの値だけnumに入った状態)
            }
            // 電卓の表示部分に押されたボタンの数字・演算子を出力
            document.getElementById("calSpace").innerHTML = num;
        } else { // btnが記号ならば
            if (!isNaN(key)) { // 一つ前の入力(key)が数字なら
                if(kigou == "") ans = num;
                else{
                    if(kigou != "="){
                        ans = eval(ans + kigou + num);
                    }
                }
                num = "0";
                document.getElementById("calSpace").innerHTML = ans;
            } 
            kigou = btn; // kigouに押された記号を格納
            document.getElementById("type").innerHTML = kigou; // 画面上に記号を出力
        }
        key = btn;
    }

    function calcPeriod(){ // ピリオドが打たれた時の処理
         // 「.」が含まれているか調べてその位置の値を返す。ない場合「-1」2個以上入らないようにするため。ない場合「.」を追加
        if(num.indexOf(".") < 0) num += ".";
        document.getElementById("calSpace").innerHTML = num;
    }

    function calcEqual(){ // 「=」が押された時
        if(kigou != "="){
            ans = eval(ans + kigou + num); // 値と演算子を文字列として連結しevalで計算

            key = "=";

            num = "0"; // 計算表示を0にする
            kigou = key;
            document.getElementById("calSpace").innerHTML = ans; // 計算結果を表示
            document.getElementById("type").innerHTML = key; // 「=」を表示
        }
    }
    function calcC(){ // 全てリセット
        ans = 0;
        key = "";
        num = "0";
        kigou = "";
        document.getElementById("calSpace").innerHTML = '0'; // 0を表示

    }
    // });