let num1 = "";
let num2 = "";
let operator = "";
let total = "";

$(function(){

  $("button").on("click",function(e){
    let btn = e.target.innerHTML;
    if(btn <= "9" && btn >= "0"){
      handleNumber(btn);
    }else{
      handleOperator(btn);
    }
    if(btn == "C"){
      displayButton("0");
      calcReset();
    }
  })
})


  function handleNumber(num) {
    if(num1 === ""){
      num1 = num;
    }else{
      num2 = num;
    }
    displayButton(num);
  }

  function handleOperator(oper){
    if(operator === ""){
      operator = oper;
    }else{
      handleTotal();
      operator = oper;
      }
    }

  function handleTotal(){
    switch(operator){
      case "+":
      total = + num1 + + num2;
      displayButton(total);
      calcReset();
      break;

      case "-":
      total = + num1 - + num2;
      displayButton(total);
      calcReset();
      break;

      case "×":
      total = + num1 * + num2;
      displayButton(total);
      calcReset();
      break;

      case "÷":
      total = + num1 / + num2;
      displayButton(total);
      if( + num1/0 ){
        alert("0で割ることは出来ません。");
        displayButton("0");
      }
      calcReset();
      break;
    }
  }

  function displayButton(btn){
    $(".resultInput").text(btn);
  }

  function calcReset(){
    num1 = "";
    num2 = "";
    operator = "";
    total = ""
  }



