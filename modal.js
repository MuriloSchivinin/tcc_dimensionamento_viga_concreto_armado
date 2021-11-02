var modal = document.getElementById("modal");

var span = document.getElementsByClassName("close")[0];

function processa_mensagem(id_mensagem) {
    var texto = '';
    var titulo = '';
    switch (id_mensagem) {
        case 1:
            titulo = 'CLASSE DE RESISTÊNCIA DO CONCRETO (fck)';
            texto = 'Resistência característica à compressão do concreto';
            break;
        case 2:
            titulo = 'CLASSE DE RESISTÊNCIA DO AÇO (fyk)';
            texto = 'Resistência característica ao escoamento do aço.';
            break;
        case 3:
            titulo = 'CLASSE DE AGRESSIVIDADE';
            texto = `<img src="img/classe_agressividade.png" alt="CLASSE DE AGRESSIVIDADE" width=680 height=480>
                     <br>
                     <p style="background-color: white; color: black;">FONTE: (ABNT NBR 6118:2014)</p>`;
            break;
        case 4:
            titulo = 'VÃO EFETIVO (m)';
            texto = '<img src="img/vao_efetivo.png" alt="VAO EFETIVO" width=680 height=480>';
            break;
        case 5:
            titulo = 'LARGURA (CM)';
            texto = `A viga não deve apresentar largura inferior a 12 cm, porém, em casos excepcionais, essa limitação pode ser reduzida até 10 cm, respeitando as condições exigidas pelo item 13.2.2 da ABNT NBR 6118:2014. 
                     Respeitando a arquitetura do projeto, aconselha-se adotar a largura da viga, de modo que a fique embutida nas faces da parede. `;
            break;
        case 6:
            titulo = 'DIÂMETRO ARMADURA TRANSVERSAL (Øt)';
            texto = 'Para efeitos de cálculo, utiliza-se o diâmetro da armadutra transversal como 5 mm apenas para o pré-dimensionamento.';
            break;
        case 7:
            titulo = 'DIÂMETRO ARMADURA LONGITUDINAL (Øl)';
            texto = 'Para efeitos de cálculo, utiliza-se o diâmetro da armadutra longitudinal como 10 mm apenas para o pré-dimensionamento.';
            break;
        case 8:
            titulo = 'COBRIMENTO mm';
            texto = `<img src="img/cobrimento.png" alt="COBRIMENTO" width=680 height=480>
                     <br>
                     <p style="background-color: white; color: black;">FONTE: (ABNT NBR 6118:2014)</p>`;
            break;  
        case 9:
            titulo = 'ALTURA (PRE-DIMENSIONAMENTO) cm';
            texto = `A altura da viga é obtida através de uma estimativa grosseira, fornecida pelas equações abaixo:<br><br>
                     <img src="img/altura_preDimensionamento.png" alt="some text" width=600 height=300>`;
            break;
        case 10:
            titulo = 'ALTURA ÚTIL (d) cm';
            texto = `A relação entre a altura total e a altura útil é dada pela equação abaixo: <br><br>
                     <img src="img/altura_util1.png" alt="ALTURA ÚTIL" width=600 height=300>
                     <img src="img/altura_util2.png" alt="ALTURA ÚTIL" width=550 height=300><br>
                     <p style="background-color: white; color: black;">FONTE: (PINHEIRO; MUZARDO e SANTOS, 2003)</p`;
            break;
        case 99:
            titulo = 'ɣc / ɣs';
            texto = `O item 12.4 da ABNT NBR 6118:2014, define que as resistências dos materiais precisam ser minoradas para efeitos de cálculos através de um coeficiente. No caso do estado-limite último, o coeficiente de ponderação para as combinações normais, especiais ou de construção e excepcionais é dado conforme com a tabela 1.<br><br>
                     <img src="img/ys_yc.png" alt="ALTURA ÚTIL" width=600 height=300>`;
            break; 
        case 98:
            titulo = 'Fcd Mpa';
            texto = 'Resistência de cálculo do concreto.';
            break;
        case 96:
            titulo = 'Fyd Mpa';
            texto = 'Resistência de Cálculo ao Escoamento do Aço.';
            break;
        case 97:
            titulo = 'βx';
            texto = 'O valor de βx corresponde a relação da linha neutra e altura útil da viga.';
            break;
        case 11:
            titulo = 'Mk kN.m';
            texto = 'Momento Fletor característico do concreto.';
            break;
        case 12:
            titulo = 'Md kN.m';
            texto = 'Momento Fletor de cálculo.';
            break;
        case 13:
            titulo = 'Vsk kN.m';
            texto = 'Força Cortante característica do concreto.';
            break;
        case 14:
            titulo = 'Vsd kN.m';
            texto = 'Força Cortante solicitante de cálculo.';
            break;
        case 15:
            titulo = 'As;min';
            texto = 'Armadura longitudinal miníma à ser adotada.';
            break;
        case 16:
            titulo = 'As';
            texto = 'Armadura longitudinal calculada para a região tracionada.';
            break;
        case 17:
            titulo = `A's`;
            texto = 'Armadura longitudinal calculada para a região comprimida. Em casos de armadura dupla, apenas.';
            break;
        case 18:
            titulo = 'αv2';
            texto = '<img src="img/alfaV2.png" alt="ALTURA ÚTIL" width=500 height=50>';
            break;  
        case 19:
            titulo = 'Vrd2 kN';
            texto = 'Força cortante resistente de cálculo, relativa à ruína das bielas comprimidas de concreto';
            break;
        case 20:
            titulo = 'fct';
            texto = 'Resistência do concreto à tração direta.';
            break;     
        case 21:
            titulo = 'Vc';
            texto = 'Cálculo da parcela de força cortante resistida por mecanismos complementares ao modelo em treliça.';
            break;
        case 22:
            titulo = 'fywd kN/cm²';
            texto = 'Resistência de Cálculo ao Escoamento do Aço.';
            break;
        case 23:
            titulo = 'ρsw;mín';
            texto = 'Taxa miníma de armadura transversal.';
            break;
        case 24:
            titulo = 'Vsw,min';
            texto = 'Força cortante resistida pela armadura transversal.';
            break;
        case 25:
            titulo = 'Vsd,min';
            texto = 'Força cortante solicitante de cálculo miníma.';
            break;
        case 26:
            titulo = 'asw adotado';
            texto = 'Armadura transversal adotada.';
            break;
        case 27:
            titulo = `Vsd (kN)`;
            texto = 'Força cortante solicitante de cálculo.';
            break;  
        case 100:
            titulo = `Tabela 1.3a (PINHEIRO)`;
            texto = '<img src="img/tabela_libanio.jpg" alt="TABELA 1.3a" width=850 height=1250>';
            break;     
        case 101:
            titulo = `Tabela 1.4a (PINHEIRO)`;
            texto = '<img src="img/tabela_libanio2.png" alt="TABELA 1.4a" width=850 height=1250>';
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
