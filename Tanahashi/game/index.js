$(function(){

  let move = 1;
  let play = true;
  const size =10;

  $("#board tr td").click(function() {
    if ($(this).text()=="" && play) {
      if ((move%2)==1) { $(this).append("⭕️"); 
      } else { $(this).append("✖️"); 
      }
      move++; 
      if (checkForWinner()!=-1 && checkForWinner()!="") { 
      if (checkForWinner()=="⭕️") { 
          alert("Player 1 の勝ちです!"); 
        }else{ 
          alert("Player 2 の勝ちです!"); 
        }
        play = false; 
        }else if(move >= size){
          alert("引き分けです")
        }
      }
    });

  function checkForWinner() {
    let space1 = $("#board tr:nth-child(1) td:nth-child(1)").text();
    let space2 = $("#board tr:nth-child(1) td:nth-child(2)").text();
    let space3 = $("#board tr:nth-child(1) td:nth-child(3)").text();
    let space4 = $("#board tr:nth-child(2) td:nth-child(1)").text();
    let space5 = $("#board tr:nth-child(2) td:nth-child(2)").text();
    let space6 = $("#board tr:nth-child(2) td:nth-child(3)").text();
    let space7 = $("#board tr:nth-child(3) td:nth-child(1)").text();
    let space8 = $("#board tr:nth-child(3) td:nth-child(2)").text();
    let space9 = $("#board tr:nth-child(3) td:nth-child(3)").text();
    //行のチェック
    if((space1==space2) && (space2==space3)) { 
        return space3; 
      }else if ((space4==space5) && (space5==space6)) { 
        return space6;
      }else if ((space7==space8) && (space8==space9)) { 
        return space9; 
      }//カラムのチェック
      else if ((space1==space4) && (space4==space7)) { 
        return space7; 
      }else if ((space2==space5) && (space5==space8)) { 
        return space8; 
      }else if ((space3==space6) && (space6==space9)) { 
        return space9; 
      }
    // 斜めのチェック
    else if ((space1==space5) && (space5==space9)) { 
      return space9; 
    }else if ((space3==space5) && (space5==space7)) { 
      return space7; 
    }
    
    return -1;
    
  }
  $('#reset').click(function(){
    move = 1;
    play = true;
    let space1 = $("#board tr:nth-child(1) td:nth-child(1)").html('');
    let space2 = $("#board tr:nth-child(1) td:nth-child(2)").html('');
    let space3 = $("#board tr:nth-child(1) td:nth-child(3)").html('');
    let space4 = $("#board tr:nth-child(2) td:nth-child(1)").html('');
    let space5 = $("#board tr:nth-child(2) td:nth-child(2)").html('');
    let space6 = $("#board tr:nth-child(2) td:nth-child(3)").html('');
    let space7 = $("#board tr:nth-child(3) td:nth-child(1)").html('');
    let space8 = $("#board tr:nth-child(3) td:nth-child(2)").html('');
    let space9 = $("#board tr:nth-child(3) td:nth-child(3)").html('');
  })

});

