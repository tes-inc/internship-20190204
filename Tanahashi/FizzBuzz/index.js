$(document).ready(function () {

    $("#fizzbuzz").submit(function (event) {
        var start = parseInt($("#startNum").val());
        var finish = parseInt($("#finishNum").val());

        if (!isNaN(start) && !isNaN(finish)) {
            var i;
            for (i = start; i <= finish; i++) {

                if (i % 3 === 0 && i % 5 === 0) {
                    $("#output").append("<span class='fizzbuzz'>FizzBuzz</span>");
                } else if (i % 3 === 0) {
                    $("#output").append("<span class='fizz'>Fizz</span>");
                } else if (i % 5 === 0) {
                    $("#output").append("<span class='buzz'>Buzz</span>");
                } else {
                    $("#output").append("<span>" + i + "</span>");
                }
            }
            $("#output span").fadeIn(400);
        } else {
            $("#error").append("<p class='error'>※数字を入力してください。</p>");
        }
        return false;
    });
    $('input').on('focus', function () {
        $("#output span").fadeOut(400, function () {
            $("#output").empty();
        });
        $("#error").empty();
    });
}); 