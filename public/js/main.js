var tempoInicial = $("#tempoDigitacao").text();


$(function(){ //equivale a: $(document).ready(function()
    inicializaFrase();
    inicializaContadores();
    inicializaCronometro();
    inicializaMarcador();
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
            campo.addClass("campo-desativado");
        };
    },1000);
});
}

function inicializaMarcador(){
    var frase = $(".frase").text();
    campo.on("input", function(){
        var digitado = campo.val();
        var comparavel = frase.substr(0, digitado.length);

        if(digitado == comparavel){
            campo.addClass("campo-correto");
            campo.removeClass("campo-errado");
        } else {
            campo.addClass("campo-errado");
            campo.removeClass("campo-correto");
        };
    });
}

function reiniciaJogo() {
    campo.attr("disabled", false);
    campo.val("");
    $("#contPalavras").text("0");
    $("#contCaracteres").text("0");
    $("#tempoDigitacao").text(tempoInicial);
    inicializaCronometro();
    campo.removeClass("campo-desativado"); //ao inves do addClass e removeClass podemos usar a toggleClass
    campo.removeClass("campo-errado");
    campo.removeClass("campo-correto");
}

