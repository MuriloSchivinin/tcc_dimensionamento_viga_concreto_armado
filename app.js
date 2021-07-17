// VARIÁVEIS IREI GERAR
let COBRIMENTO
let ALT_PRE
let ALT_UTI

function geraDadosIniciais() {

    if (document.getElementById('vao').value < 0 || document.getElementById('largura').value < 0) {

        alert(`Valores de vão e largura não podem ser inferiores a 0. Por favor, corrija!`)
        document.getElementById('vao').value = 0
        document.getElementById('vao').value = 0
        document.location.reload(true)
    }

    // VARIÁVEIS INFORMADAS PELO USUÁRIO

    // ÁREA PARA CÁLCULO DO COBRIMENTO
    let select = document.getElementById('CLASSES');
    let text = select.options[select.selectedIndex].text;
    text = text.split(' ')[0]

    if (text == 'I') {
        COBRIMENTO = 25
    } else if (text == 'II') {
        COBRIMENTO = 30
    } else if (text == 'III') {
        COBRIMENTO = 40
    } else {
        COBRIMENTO = 50
    }

    document.getElementById('cobrimento').value = COBRIMENTO + ' mm'

    //ÁREA DA ALTURA DO PRÉ-DIMENSIONAMENTO
    ALT_PRE = (document.getElementById('vao').value) * 10
    document.getElementById('altPre').value = ALT_PRE + ' cm'

    //ÁREA DA ALTURA DO ÚTIL
    //BUSCANDO ARMADUA TRANSVERSAL
    let DI_TRA = document.getElementById('ARM-TRA')
    let DI_TRA_VALOR = DI_TRA.options[DI_TRA.selectedIndex].text

    DI_TRA_VALOR = parseFloat(DI_TRA_VALOR.split(' ')[0])

    //BUSCANDO ARMADURA LONGITUDINAL
    let DI_LON = document.getElementById('ARM-LON')
    let DI_LON_VALOR = DI_LON.options[DI_LON.selectedIndex].text

    DI_LON_VALOR = parseFloat(DI_LON_VALOR.split(' ')[0])

    ALT_UTI = ALT_PRE - (COBRIMENTO / 10) - (DI_TRA_VALOR / 10) - ((DI_LON_VALOR / 10) / 2)
    ALT_UTI = ALT_UTI.toFixed(2)
    document.getElementById('altUti').value = ALT_UTI + ' cm'
}