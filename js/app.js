var _texto_pontuacao;
var _pontos = 0;
var _palavras = [];

function get_palavras() {
    $.getJSON("../palavras.json", function (data) {
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

function event_resposta() {
    game.paused = false;
    var resposta = {};
    $('#fromDesavio').serializeArray().map(function (x) {
        resposta[x.name] = x.value;
    });
    if (resposta.palavra === resposta.resposta) {
        _pontos += 1;
        swal({
            type: "success",
            title: "Palavra correta!!!",
            text: "",
            timer: 3000,
            showConfirmButton: false
        });
    } else {
        swal({
            type: "error",
            title: "Palavra errada.",
            text: 'Palavra correta é: <span style="color:#10c469; font-weight: bold">' + resposta.palavra + '</span>',
            timer: 4000,
            showConfirmButton: false,
            html: true
        });
    }
    $('#modal1').modal('hide');
}

function popularModal() {
    var desafio = _palavras[Math.floor(Math.random() * _palavras.length)];
    var html = '';
    $("#desafioPalavra").val(desafio.palavra);
    $("#labelImagem").attr('src', '../images/desavio/' + desafio.imagem);
    $.each(desafio.alternativas, function (key, value) {
        html += '<label class="custom-control custom-radio">';
        html += '<input id="radio' + key + '" name="resposta" value="' + value + '" type="radio" class="custom-control-input">';
        html += '<span class="custom-control-indicator"></span>';
        html += '<span class="custom-control-description">' + value + '</span>';
        html += '</label>';
    });
    $("#labelDesafio").html(html);
    removePalavra(desafio);
}


