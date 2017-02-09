var campo = $(".campo-digitacao");
var tempoInicial = $("#tempo-digitacao").text();

$(function(){
	atualizaTamanhoFrase();
	inicializaContadores();
	inicializaCronometro();
	inicializaVerificacao();
	$("#botao-reiniciar").click(reiniciaJogo);
	atualizaPlacar();

	$('#usuarios').selectize({
    create: true,
    sortField: 'text'
});

	$('.tooltip').tooltipster();
});

function atualizaTempoInicial(tempo) {
	tempoInicial = tempo;
	$('#tempo-digitacao').text(tempo);
}

function atualizaTamanhoFrase() {

	var frase = $(".frase").text();
	var numPalavras  = frase.split(" ").length;
	var tamanhoFrase = $("#tamanho-frase");
	tamanhoFrase.text(numPalavras);
}

function inicializaContadores() {

	campo.on("input", function() {
		var conteudo = campo.val();

		var qtdPalavras = conteudo.split(/\S+/).length - 1;
		$("#contador-palavras").text(qtdPalavras);

		var qtdCaracteres = conteudo.length;
		$("#contador-caracteres").text(qtdCaracteres);

	});
}

function inicializaCronometro() {

	campo.one("focus", function() {
		var tempoRestante = $("#tempo-digitacao").text();
		$("#botao-reiniciar").attr("disabled",true);
		var cronometroID = setInterval(function() {
			tempoRestante--;
			$("#tempo-digitacao").text(tempoRestante);
			if (tempoRestante < 1) {
				clearInterval(cronometroID);
				finalizaJogo();
				inserePlacar();
			}
		}, 1000);
	});
}

function finalizaJogo() {
	campo.attr("disabled", true);
	$("#botao-reiniciar").attr("disabled", false);
	campo.addClass("campo-desabilitado");
}

$("#botao-reiniciar").click(reiniciaJogo);

function reiniciaJogo(){
	campo.attr("disabled", false);
	campo.val("");
	$("#contador-palavras").text("0");
	$("#contador-caracteres").text("0");

	$("#tempo-digitacao").text(tempoInicial);
	inicializaCronometro();

	campo.removeClass("campo-desabilitado");

	campo.removeClass("borda-verde");
	campo.removeClass("borda-vermelha");
}

function inicializaVerificacao() {

	campo.on("input", function() {

		var frase = $(".frase").text();
		var conteudo = campo.val();

		if(frase.startsWith(conteudo)) {
			campo.addClass("borda-verde");
			campo.removeClass("borda-vermelha")
		} else {
			campo.addClass("borda-vermelha");
			campo.removeClass("borda-verde");
		}
	});
}
