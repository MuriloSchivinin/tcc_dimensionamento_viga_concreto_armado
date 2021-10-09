var modal = document.getElementById("modal");

var span = document.getElementsByClassName("close")[0];

function processa_mensagem(id_mensagem) {
    var texto = '';
    var titulo = '';
    switch (id_mensagem) {
        case 1:
            titulo = 'CLASSE DE RESISTÊNCIA DO CONCRETO (fck)';
            texto = 'Teste descrição nº1';
            break;
        case 2:
            titulo = 'CLASSE DE RESISTÊNCIA DO AÇO';
            texto = 'numero 2 - teste de conteudo';
            break;
        default:
            titulo = '';
            texto = 'Descrição inválida!';
            break;
    }

    var obj_texto = document.getElementById('modal-texto');
    var obj_titulo = document.getElementById('modal-titulo');
    obj_texto.innerHTML = texto;
    obj_titulo.innerHTML = titulo;
    modal.style.display = "block";
}

span.onclick = function () {
    modal.style.display = "none";
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
