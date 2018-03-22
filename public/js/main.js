var tempoInicial = $("#tempoDigitacao").text();


$(function(){ //equivale a: $(document).ready(function()
    inicializaFrase();
    inicializaContadores();
    inicializaCronometro();
});

function inicializaFrase() {
    var frase = $(".frase").text();
    var numPalavras = frase.split(" ").length;
    var tamFrase = $("#tamFrase");
    tamFrase.text(numPalavras);
}

var campo = $(".campo-digitacao");

function inicializaContadores(){
campo.on("input",function(){
    var conteudo = campo.val();
    var qtdPalavras = conteudo.split(/\S+/).length - 1;
    $("#contPalavras").text(qtdPalavras);
    $("#contCaracteres").text(conteudo.length);
    $("#botaoReiniciar").click(reiniciaJogo);
});
}

function inicializaCronometro() {
campo.one("focus", function(){
    var tempoRestante = $("#tempoDigitacao").text();
    $("#botaoReiniciar").attr("disabled", true);
    var cronometroID = setInterval(function(){
        tempoRestante--;
        $("#tempoDigitacao").text(tempoRestante);
        if(tempoRestante < 1) {
            campo.attr("disabled", true);
            clearInterval(cronometroID);
            $("#botaoReiniciar").attr("disabled", false);
        };
    },1000);
});
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contPalavras").text("0");
    $("#contCaracteres").text("0");
    $("#tempoDigitacao").text(tempoInicial);
    inicializaCronometro();
}

