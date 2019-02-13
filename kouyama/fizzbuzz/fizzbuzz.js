$("#fizzbuzzbutton").click(function () {
    var fizzbuzzStart = $("#fizzbuzzstart").val(); // fizzbuzz処理開始の値
    var fizzbuzzEnd = $("#fizzbuzzend").val(); // fizzbuzz処理終了の値
    var result = ""; // fizzbuzz処理の結果を格納

    function fizzbuzz(){
        for(i = fizzbuzzStart;i <= fizzbuzzEnd;i++){
            if(i == 0){
                result += i;
            }else if((i % 3) == 0 && (i % 5) == 0){
                result += "fizzbuzz";
            }else if(i % 3 == 0){
                result += "fizz";
            }else if(i % 5 == 0){
                result += "buzz";
            }else{
                result += i;
            }
            if(i < fizzbuzzEnd){
                result += ",";
            }
            // IDがresultのタグの中にfizzbuzzの処理を終えた値を代入
            document.getElementById("result").innerHTML = result;
        }
    }
    // fizzbuzz処理を行う
    fizzbuzz(fizzbuzzStart, fizzbuzzEnd);

})




    
