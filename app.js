document.getElementById('fck').value = 25 + ' Mpa'
document.getElementById('Fcd').value = (25 / document.getElementById('yc').value).toFixed(2) + ' Mpa'
var fcd = (25 / document.getElementById('yc').value).toFixed(2)
function fncFck() {
    let buscaFck = document.getElementById('FCK-CONCRETO');
    let fck = (buscaFck.options[buscaFck.selectedIndex].text).substring(1, 3)
    document.getElementById('fck').value = fck + ' Mpa'

    // ATRIBUINDO VALOR À FCD
    fcd = (fck / document.getElementById('yc').value).toFixed(2)
    document.getElementById('Fcd').value = fcd + ' Mpa'
}

document.getElementById('fyk').value = 500 + ' Mpa'
var fyk = document.getElementById('fyk').value = 500
function fncFyk() {
    let buscaFyk = document.getElementById('FYK-ACO');
    fyk = (buscaFyk.options[buscaFyk.selectedIndex].text).substring(3, 5)
    document.getElementById('fyk').value = fyk * 10 + ' Mpa'
}

// VARIÁVEIS IREI GERAR
var COBRIMENTO
var ALT_PRE
var ALT_UTI
function geraDadosIniciais() {

    if (document.getElementById('vao').value < 0) {
        alert(`O vão não pode menor que a 0. Por favor, corrija!`)
        document.getElementById('vao').value = ''
        //document.location.reload(true)
        return
    } else if (document.getElementById('largura').value < 0) {
        alert(`A largura não pode menor que a 0. Por favor, corrija!`)
        document.getElementById('largura').value = ''
        //document.location.reload(true)    
        return
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
    let RESULT_ALT_PRE = document.getElementById('resultado-altura-pre')
    if (ALT_PRE >= 60) {
        RESULT_ALT_PRE.innerHTML = 'Será necessário utilizar armadura de pele.'
        RESULT_ALT_PRE.style.background = "rgb(243, 74, 68)"
        RESULT_ALT_PRE.style.color = "black"
        RESULT_ALT_PRE.style.fontWeight = "bold"
        RESULT_ALT_PRE.style.fontFamily = "'Roboto', sans-serif"
        RESULT_ALT_PRE.style.fontSize = "30px"
        RESULT_ALT_PRE.style.borderRadius = "10px"
    } else {
        RESULT_ALT_PRE.innerHTML = 'Não é necessário utilizar armadura de pele.'
        RESULT_ALT_PRE.style.background = "rgb(106, 243, 64)"
        RESULT_ALT_PRE.style.color = "black"
        RESULT_ALT_PRE.style.fontWeight = "bold"
        RESULT_ALT_PRE.style.fontFamily = "'Roboto', sans-serif"
        RESULT_ALT_PRE.style.fontSize = "30px"
        RESULT_ALT_PRE.style.borderRadius = "10px"
    }

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

var msgBx
var MD
var VSD
var bw
var valorFck
var BxDim
function geraDadosAcoesAtuantes() {
    MD = (document.getElementById('MK').value * 1.4).toFixed(2)
    document.getElementById('MD').value = MD + ' kN.m'

    VSD = (document.getElementById('Vsk').value * 1.4).toFixed(2)
    document.getElementById('Vsd').value = VSD + ' kN.m'

    function calculoBx() {

        valorFck = (fck.value).substring(0, 2)
        bw = document.getElementById('largura').value
        var a
        var b
        var c = (MD * -100)
        var delta
        var x1
        var x2
        var lambida
        var alfaC

        /*CÁLCULO DE Beta x PARA CONCRETOS DE BAIXA RESISTÊNCIA*/
        if (valorFck <= 50) {

            a = (0.68 * bw * Math.pow(ALT_UTI, 2) * (fcd / 10) * - 0.40).toFixed(2)
            b = (0.68 * bw * Math.pow(ALT_UTI, 2) * (fcd / 10)).toFixed(2)
            delta = (Math.pow(b, 2) - (4 * a * c)).toFixed(2)

            /*CONDIÇÕES PARA DIMENSIONAMENTO*/
            if (delta < 0) {
                BxDim = 0.45
                document.getElementById('Bx').value = BxDim
                msgBx = 'DUPLA'
                return
            }

            x1 = ((-b + Math.sqrt(delta)) / (2 * a)).toFixed(3)
            x2 = ((-b - Math.sqrt(delta)) / (2 * a)).toFixed(3)
            x1 = parseFloat(x1)
            x2 = parseFloat(x2)
            /*CASO X1 E X2 FOREM MAIOR QUE 0,45, ARMADURA DUPLA*/
            if (Math.min(x1, x2) > 0.45) {
                BxDim = 0.45
                document.getElementById('Bx').value = BxDim
                msgBx = 'DUPLA'
                return
            }

            /*CASO X1 E X2 ESTIVEREM DENTRO DA CONDIÇÃO, ASSUMIREMOS MAIOR ENTRE ELES*/
            if (x1 <= 0.45 && x2 <= 0.45) {
                BxDim = Math.max(x1, x2)
                document.getElementById('Bx').value = BxDim
                msgBx = 'SIMPLES'
                return
            }
            if (x1 <= 0.45 || x2 <= 0.45) {
                if (x1 <= 0.45) {
                    BxDim = x1
                    msgBx = 'SIMPLES'
                    document.getElementById('Bx').value = BxDim
                    return
                }
                else if (x2 <= 0.45) {
                    BxDim = x2
                    msgBx = 'SIMPLES'
                    document.getElementById('Bx').value = BxDim
                    return
                }
            }
        }
        /*CÁLCULO DE Beta x PARA CONCRETOS DE ALTA RESISTÊNCIA*/
        else {
            lambida = (0.80 - ((valorFck - 50) / 400)).toFixed(3)
            alfaC = (0.85 * (1 - ((valorFck - 50) / 200))).toFixed(3)

            a = ((bw * Math.pow(ALT_UTI, 2) * (fcd / 10) * lambida * alfaC) * - (lambida / 2)).toFixed(2)
            b = (bw * Math.pow(ALT_UTI, 2) * (fcd / 10) * lambida * alfaC).toFixed(2)
            delta = (Math.pow(b, 2) - (4 * a * c)).toFixed(2)

            /*CONDIÇÕES PARA DIMENSIONAMENTO*/
            if (delta < 0) {
                BxDim = 0.35
                document.getElementById('Bx').value = BxDim
                msgBx = 'DUPLA'
                return
            }

            x1 = ((-b + Math.sqrt(delta)) / (2 * a)).toFixed(3)
            x2 = ((-b - Math.sqrt(delta)) / (2 * a)).toFixed(3)
            x1 = parseFloat(x1)
            x2 = parseFloat(x2)
            /*CASO X1 E X2 FOREM MAIOR QUE 0,45, ARMADURA DUPLA*/
            if (Math.min(x1, x2) > 0.35) {
                BxDim = 0.35
                document.getElementById('Bx').value = BxDim
                msgBx = 'DUPLA'
                return
            }

            /*CASO X1 E X2 ESTIVEREM DENTRO DA CONDIÇÃO, ASSUMIREMOS MAIOR ENTRE ELES*/
            if (x1 <= 0.35 && x2 <= 0.35) {
                BxDim = Math.max(x1, x2)
                document.getElementById('Bx').value = BxDim
                msgBx = 'SIMPLES'
                return
            }
            if (x1 <= 0.35 || x2 <= 0.35) {
                if (x1 <= 0.35) {
                    BxDim = x1
                    msgBx = 'SIMPLES'
                    document.getElementById('Bx').value = BxDim
                    return
                }
                else if (x2 <= 0.35) {
                    BxDim = x2
                    msgBx = 'SIMPLES'
                    document.getElementById('Bx').value = BxDim
                    return
                }
            }
        }
    }
    calculoBx()
    let RESULT_Bx = document.getElementById('resultado-Bx')
    if (msgBx == 'SIMPLES') {
        RESULT_Bx.innerHTML = 'DIMENSIONAR ATRAVÉS DE ARMADURA SIMPLES'
        RESULT_Bx.style.background = "#e9fc2c"
        RESULT_Bx.style.color = "black"
        RESULT_Bx.style.fontWeight = "bold"
        RESULT_Bx.style.fontFamily = "'Roboto', sans-serif"
        RESULT_Bx.style.fontSize = "30px"
        RESULT_Bx.style.borderRadius = "10px"
        RESULT_Bx.style.width = "1000px"
    } else {
        RESULT_Bx.innerHTML = 'DIMENSIONAR ATRAVÉS DE ARMADURA DUPLA'
        RESULT_Bx.style.background = "#e9fc2c"
        RESULT_Bx.style.color = "black"
        RESULT_Bx.style.fontWeight = "bold"
        RESULT_Bx.style.fontFamily = "'Roboto', sans-serif"
        RESULT_Bx.style.fontSize = "30px"
        RESULT_Bx.style.borderRadius = "10px"
        RESULT_Bx.style.width = "1000px"
    }
}

var valAs
var valAsMin
var valAlinS
function geraDadosAs() {
    let ysAs = document.getElementById('ys').value;

    if (valorFck <= 50) {
        var pminBaixaResistencia = {
            C25: (0.150 / 100).toFixed(5),
            C30: (0.150 / 100).toFixed(5),
            C35: (0.164 / 100).toFixed(5),
            C40: (0.179 / 100).toFixed(5),
            C45: (0.194 / 100).toFixed(5),
            C50: (0.208 / 100).toFixed(5)
        }

        var buscaFck2 = document.getElementById('FCK-CONCRETO');
        var fck2 = (buscaFck2.options[buscaFck2.selectedIndex].text)
        var pMin = pminBaixaResistencia[fck2]


        if (msgBx == 'SIMPLES') {

            valAsMin = (pMin * bw * ALT_PRE).toFixed(2)
            valAs = ((0.68 * ALT_UTI * bw * BxDim * fcd) / (fyk / ysAs)).toFixed(2)

            document.getElementById('As-min').value = valAsMin + ' cm²'
            document.getElementById('As').value = valAs + ' cm²'
            document.getElementById('ALs').value = 0.00
        }
        else {
            //alert('CALCULAR AS PARA ARMADURA DUPLA --> =[CONCRETO DE BAIXA RESISTÊNCIA]')
            valAsMin = pMin * bw * ALT_PRE
            valAlinS = (((MD * 100) - (0.68 * bw * (Math.pow(ALT_UTI, 2)) * BxDim * (fcd / 10) * (1 - (0.4 * BxDim)))) / ((fyk / 10 / ysAs) * (ALT_UTI - (ALT_PRE - ALT_UTI)))).toFixed(2)
            valAs = (((0.68 * bw * ALT_UTI * BxDim * (fcd / 10)) + (valAlinS * (fyk / 10 / ysAs))) / (fyk / 10 / ysAs)).toFixed(2)

            document.getElementById('As-min').value = valAsMin + ' cm²'
            document.getElementById('As').value = valAs + ' cm²'
            document.getElementById('ALs').value = valAlinS + ' cm²'
        }


    }
    else if (valorFck > 50) {
        if (msgBx == 'SIMPLES') {
            alert('CALCULAR AS PARA ARMADURA SIMPLES --> =[CONCRETO DE ALTA RESISTÊNCIA]')
        }
        else {
            alert('CALCULAR AS PARA ARMADURA DUPLA --> =[CONCRETO DE ALTA RESISTÊNCIA]')
        }
    }

    let RESULT_As = document.getElementById('resultado-As')
    if (msgBx == 'SIMPLES') {
        RESULT_As.innerHTML = `AS adotado: ${Math.max(valAsMin, valAs)} cm²`
        RESULT_As.style.background = "#e9fc2c"
        RESULT_As.style.color = "black"
        RESULT_As.style.fontWeight = "bold"
        RESULT_As.style.fontFamily = "'Roboto', sans-serif"
        RESULT_As.style.fontSize = "30px"
        RESULT_As.style.borderRadius = "10px"
    } else {
        RESULT_As.innerHTML = `AS adotado: ${Math.max(valAsMin, valAs)} cm²; A's adotado: ${Math.max(valAlinS, valAsMin)} cm²`
        RESULT_As.style.background = "#e9fc2c"
        RESULT_As.style.color = "black"
        RESULT_As.style.fontWeight = "bold"
        RESULT_As.style.fontFamily = "'Roboto', sans-serif"
        RESULT_As.style.fontSize = "30px"
        RESULT_As.style.borderRadius = "10px"
    }

}
