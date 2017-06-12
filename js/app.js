var _palavras = [];

function get_palavras() {
    $.getJSON("../palavras.json", function (data) {
        console.log(data.palavras);
        _palavras = data.palavras;
    });
}

function removePalavra(palavra) {
    _palavras = jQuery.grep(_palavras, function (value) {
        return value != palavra;
    });
}

function openDesafio() {
    game.paused = true;
    popularModal();
    $('#modal1').modal({
        backdrop: 'static',
        show: true,
        keyboard: false
    });
}

function resposta() {
    game.paused = false;
    var nome = $('#txtDesafio1').val();
    if (nome == 'acerola') {
        pontos += 1;
        console.log('certo');
    }
    console.log('errado');

    $('#modal1').modal('hide');
}

function popularModal() {
    var desafio = _palavras[Math.floor(Math.random() * _palavras.length)];
    var html = '';
    console.log(desafio);
    $("#desafioResposta").val(desafio.palavra);
    $("#labelImagem").attr('src', '../images/desavio/' + desafio.imagem);
    $.each(desafio.alternativas, function (key, value) {
        html += '<label class="custom-control custom-radio">';
        html += '<input id="radio' + key + '" name="desafio" value="' + value + '" type="radio" class="custom-control-input">';
        html += '<span class="custom-control-indicator"></span>';
        html += '<span class="custom-control-description">' + value + '</span>';
        html += '</label>';
    });
    $("#labelDesafio").html(html);
}


