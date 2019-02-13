// $(function(){
//     var message = ['大吉','中吉',吉','凶'];

//         $("#button_1").on("click",function(){
//         var num = Math.floor(Math.random()*message.length);
//         $("#result").text(messeage[num]);
//         })
// });

$(function(){
    var message = ['大吉','中吉','吉','凶'];

    $("#button_1").on("click" , function(){
        //var num  = Math.floor(Math.random() * message.length);
        var num = Math.random();
        if(num < 0.02){
            $("#result").text(message[0]);
        }else if(num < 0.4){
            $("#result").text(message[1]);
        }else if(num < 0.6){
            $("#result").text(message[2]);
        }else{
            $("#result").text(message[3]);
        }
        //$("#result").text(message[num]);
    })
});

