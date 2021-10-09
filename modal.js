var modal = document.getElementById("modal");

var span = document.getElementsByClassName("close")[0];

function processa_mensagem(id_mensagem) {
    var texto = '';
    var titulo = '';
    switch (id_mensagem) {
        case 1:
            titulo = 'CLASSE DE RESISTÊNCIA DO CONCRETO (fck)';
            texto = '-';
            break;
        case 2:
            titulo = 'CLASSE DE RESISTÊNCIA DO AÇO';
            texto = '-';
            break;
        case 3:
            titulo = 'CLASSE DE AGRESSIVIDADE';
            texto = '-';
            break;
        case 4:
            titulo = 'VÃO EFETIVO (m)';
            texto = '-';
            break;
        case 5:
            titulo = 'LARGURA (CM)';
            texto = '-';
            break;
        case 6:
            titulo = 'DIÂMETRO ARMADURA TRANSVERSAL (Øt)';
            texto = '-';
            break;
        case 7:
            titulo = 'DIÂMETRO ARMADURA LONGITUDINAL (Øl)';
            texto = '-';
            break;
        case 8:
            titulo = 'COBRIMENTO mm';
            texto = '-';
            break;  
        case 9:
            titulo = 'ALTURA (PRE-DIMENSIONAMENTO) cm';
            texto = '-';
            break;
        case 10:
            titulo = 'ALTURA ÚTIL (d) cm';
            texto = '-';
            break;
        case 11:
            titulo = 'Mk kN.m';
            texto = '-';
            break;
        case 12:
            titulo = 'Md kN.m';
            texto = '-';
            break;
        case 13:
            titulo = 'Vsk kN.m';
            texto = '-';
            break;
        case 14:
            titulo = 'Vsd kN.m';
            texto = '-';
            break;
        case 15:
            titulo = 'As;min';
            texto = '-';
            break;
        case 16:
            titulo = 'As';
            texto = '-';
            break;
        case 17:
            titulo = `A's`;
            texto = '-';
            break;
        case 18:
            titulo = 'αv2';
            texto = '-';
            break;  
        case 19:
            titulo = 'Vrd2';
            texto = '-';
            break;
        case 20:
            titulo = 'fct';
            texto = '-';
            break;     
        case 21:
            titulo = 'Vc';
            texto = '-';
            break;
        case 22:
            titulo = 'fywk';
            texto = '-';
            break;
        case 23:
            titulo = 'ρsw;mín';
            texto = '-';
            break;
        case 24:
            titulo = 'Vsw,min';
            texto = '-';
            break;
        case 25:
            titulo = 'Vsd,min';
            texto = '-';
            break;
        case 26:
            titulo = 'asw,min';
            texto = '-';
            break;
        case 27:
            titulo = `Vd (kN)`;
            texto = '-';
            break;
        case 28:
            titulo = 'Vrd2 (kN)';
            texto = '-';
            break;  
        case 29:
            titulo = 'Vrd2 (kN)';
            texto = '-';
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
