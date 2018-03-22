var frase = $(".frase").text();
var numPalavras = frase.split(" ").length;

var tamFrase = $("#tamFrase");
tamFrase.text(numPalavras);

var campo = $(".campo-digitacao");
campo.on("input",function(){
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contPalavras").text(qtdPalavras);
    $("#contCaracteres").text(conteudo.length);
});

var tempoRestante = $("#tempoDigitacao").text();

campo.one("focus", function(){
    var cronometroID = setInterval(function(){
        tempoRestante--;
        $("#tempoDigitacao").text(tempoRestante);
        if(tempoRestante < 1) {
            campo.attr("disabled", true);
            clearInterval(cronometroID);
        };
    },1000);
});