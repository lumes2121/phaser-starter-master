var _texto_pontuacao;
var _pontos = 0;
if (sessionStorage.getItem("pontuacao")) {
    _pontos = parseInt(sessionStorage.getItem("pontuacao"));
}

var _palavras = JSON.parse(sessionStorage.getItem("palavras"));

function get_palavras() {
    $.getJSON("../palavras.json", function (data) {
        _palavras = data.palavras;
        sessionStorage.setItem("palavras", JSON.stringify(_palavras));
    });
}

function get_palavras_local() {
    _palavras = JSON.parse(sessionStorage.getItem("palavras"));
}


function removePalavra(palavra) {
    _palavras = jQuery.grep(_palavras, function (value) {
        return value != palavra;
    });
    sessionStorage.setItem("palavras", JSON.stringify(_palavras));
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

function openDesafioFase2() {
    game.paused = true;
    popularModalFase2();
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
    if (resposta.palavra.toLowerCase() === resposta.resposta.toLowerCase()) {
        _pontos += 1;
        sessionStorage.setItem("pontuacao", _pontos);
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
            timer: 5000,
            showConfirmButton: false,
            html: true
        });
    }
    $('#modal1').modal('hide');
}

function popularModal() {
    get_palavras_local();
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

function popularModalFase2() {
    get_palavras_local();
    var desafio = _palavras[Math.floor(Math.random() * _palavras.length)];
    var html = '';
    $("#desafioPalavra").val(desafio.palavra);
    $("#labelImagem").attr('src', '../images/desavio/' + desafio.imagem);
    html += '<div class="form-group">';
    html += '<label for="txtDesafio">Escreva o que você vê na imagem</label>';
    html += '<input type="text" name="resposta" class="form-control" id="txtDesafio">';
    html += '</div>';
    $("#labelDesafio").html(html);
    removePalavra(desafio);
}
