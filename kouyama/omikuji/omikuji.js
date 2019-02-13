$("#omikujibutton").click(function () { //「おみくじを引く」ボタンが押された時
    omikuji();
})
$("#omikujistart").click(function(){ // おみくじ画像が押された時
    omikuji();
})

function omikuji(){
    var results = ["大吉","吉","中吉","小吉","末吉","凶"]; // おみくじの結果を入れた配列
    var n = Math.random();
    if(n < 0.05){ // 大吉5%
        document.getElementById("result").innerHTML = results[0];
        document.getElementById("resultpicture").innerHTML =
        "<img src='omikuji_daikichi.png'  height='400' alt='daikiti' title='おみくじ大吉'></img>"
        
    }
    else if(n < 0.15){ // 吉10%
        document.getElementById("result").innerHTML = results[1];
        document.getElementById("resultpicture").innerHTML =
        "<img src='omikuji_kichi.png'  height='400' alt='kiti' title='おみくじ吉'></img>"
    }
    else if(n < 0.30){ // 中吉15%
        document.getElementById("result").innerHTML = results[2];
        document.getElementById("resultpicture").innerHTML =
        "<img src='omikuji_chuukichi.png'  height='400' alt='tyuukiti' title='おみくじ中吉'></img>"
    }
    else if(n < 0.60){ // 小吉30%
        document.getElementById("result").innerHTML = results[3];
        document.getElementById("resultpicture").innerHTML =
        "<img src='omikuji_syoukichi.png'  height='400' alt='syoukiti' title='おみくじ小吉'></img>"
    }
    else if(n < 0.95){ // 末吉35%
        document.getElementById("result").innerHTML = results[4];
        document.getElementById("resultpicture").innerHTML =
        "<img src='omikuji_suekichi.png'  height='400' alt='suekiti' title='末吉'></img>"
    }
    else{ // 凶5%
        document.getElementById("result").innerHTML = results[5];
        document.getElementById("resultpicture").innerHTML =
        "<img src='omikuji_kyou.png'  height='400' alt='kyou' title='凶'></img>"
    }
}