var ysAs = document.getElementById('ys').value;
var yc = document.getElementById('yc').value;


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
var fyd = (fyk / ysAs).toFixed(2)
document.getElementById('Fyd').value = fyd
function fncFyk() {
    let buscaFyk = document.getElementById('FYK-ACO');
    fyk = (buscaFyk.options[buscaFyk.selectedIndex].text).substring(3, 5)
    document.getElementById('fyk').value = fyk * 10 + ' Mpa'

    fyd = ((fyk * 10) / ysAs).toFixed(2)
    document.getElementById('Fyd').value = fyd + ' Mpa'
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
    let valArmaduraPele
    if (ALT_PRE >= 60) {
        valArmaduraPele = Math.min((0.001 * ((document.getElementById('vao').value) * (document.getElementById('largura').value))), 5)
        RESULT_ALT_PRE.innerHTML = `Será necessário utilizar armadura de pele. --> Valor da Armadura = ${valArmaduraPele}`
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
var lambida
var alfaC
var dominio
var obsDominio
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

    if (BxDim > 0 && BxDim < 0.259) {
        dominio = 2
        obsDominio = 'Concreto não trabalha com sua capacidade máxima'
    } else if (BxDim > 0.259 && BxDim < 0.628) {
        dominio = 3;
        obsDominio = 'Situação ideal de projeto, pois há aproveitamento pleno dos dois materiais.'
    } else if (BxDim > 0.628 && BxDim < 1) {
        dominio = 4;
        obsDominio = 'Concreto encontra-se na ruptura e o aço com deformação abaixo de Eyd, evitar esse tipo de dimensionamento'
    } else {
        dominio = 0;
        obsDominio = 'X > d'
    }


    let RESULT_Dominio = document.getElementById('resultado-dominio')
    RESULT_Dominio.innerHTML = `DOMÍNIO ${dominio}`
    RESULT_Dominio.style.background = "#e9fc2c"
    RESULT_Dominio.style.color = "black"
    RESULT_Dominio.style.fontWeight = "bold"
    RESULT_Dominio.style.fontFamily = "'Roboto', sans-serif"
    RESULT_Dominio.style.fontSize = "30px"
    RESULT_Dominio.style.borderRadius = "10px"
    RESULT_Dominio.style.width = "1000px"

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
var asAdotado
var alinAdotado
var pMin
function geraDadosAs() {
    if (valorFck <= 50) {
    pMin = (0.035 * (fcd/fyd)).toFixed(3)
    pMin = Math.max(pMin, 0.0015)

        if (msgBx == 'SIMPLES') {
            
            valAsMin = (pMin * bw * ALT_PRE).toFixed(2)
            valAs = ((0.68 * ALT_UTI * bw * BxDim * fcd) / fyd).toFixed(2)

            document.getElementById('As-min').value = valAsMin + ' cm²'
            document.getElementById('As').value = valAs + ' cm²'
            document.getElementById('ALs').value = 0.00
        }
        else {

            valAsMin = (pMin * bw * ALT_PRE).toFixed(2)
            valAlinS = (((MD * 100) - (0.68 * bw * (Math.pow(ALT_UTI, 2)) * BxDim * (fcd / 10) * (1 - (0.4 * BxDim)))) / ((fyk / 10 / ysAs) * (ALT_UTI - (ALT_PRE - ALT_UTI)))).toFixed(2)
            valAs = (((0.68 * bw * ALT_UTI * BxDim * (fcd / 10)) + (valAlinS * (fyk / 10 / ysAs))) / (fyk / 10 / ysAs)).toFixed(2)

            document.getElementById('As-min').value = valAsMin + ' cm²'
            document.getElementById('As').value = valAs + ' cm²'
            document.getElementById('ALs').value = valAlinS + ' cm²'
        }


    }
    else if (valorFck > 50) {
        pMin = (0.035 * (fcd/fyd)).toFixed(5)
        pMin = Math.max(pMin, 0.0015)
        
        console.log(`pMin = ${pMin}; MD = ${MD};bw = ${bw}; ALT_UTI = ${ALT_UTI};BxDim = ${BxDim};fcd = ${fcd};fyk = ${fyk};ysAs = ${ysAs};ALT_PRE = ${ALT_PRE}`)
        if (msgBx == 'SIMPLES') {
            valAsMin = (pMin * bw * ALT_PRE).toFixed(2)
            valAs = ((bw * ALT_UTI * BxDim * fcd * lambida * alfaC) / fyd).toFixed(2)

            document.getElementById('As-min').value = valAsMin + ' cm²'
            document.getElementById('As').value = valAs + ' cm²'
            document.getElementById('ALs').value = 0.00 + ' cm²'
        }
        else {

            valAsMin = (pMin * bw * ALT_PRE).toFixed(2)
            valAlinS = (((MD * 100) - (bw * (Math.pow(ALT_UTI, 2)) * BxDim * (fcd / 10) * lambida * alfaC * (1 - (lambida / 2) * BxDim))) / ((fyk / 10 / ysAs) * (ALT_UTI - (ALT_PRE - ALT_UTI)))).toFixed(2)
            valAs = ((bw * ALT_UTI * BxDim * (fcd / 10) + (valAlinS * (fyk / 10 / ysAs))) / (fyk / 10 / ysAs)).toFixed(2)

            document.getElementById('As-min').value = valAsMin + ' cm²'
            document.getElementById('As').value = valAs + ' cm²'
            document.getElementById('ALs').value = valAlinS + ' cm²'
        }
    }

    if (msgBx == 'SIMPLES') {
        asAdotado = Math.max(valAsMin, valAs)
        alert(`Altura do Pre Dimensionamento: ${ALT_PRE} cm`)
        alert(`As adotado = ${asAdotado} / Cálculo comparativo = ${(0.004 * (bw*ALT_PRE))}`)
        if (asAdotado > (0.004 * (bw*ALT_PRE))) {
            alert('Dimensionamento de viga com Armadura Excessiva. Será necessário trocar a seção escolhida!!!')
            ALT_PRE = prompt(`Defina uma nova altura:`)
            if (ALT_PRE != null){
            document.getElementById('altPre').value = ALT_PRE + ' cm'
            geraDadosAs()                
            }
        }
    } else if (msgBx == 'DUPLA') {
        asAdotado = Math.max(valAsMin, valAs)
        alinAdotado = Math.max(valAlinS, valAsMin)
        alert(`Altura do Pre Dimensionamento: ${ALT_PRE} cm`)
        alert(`As adotado = ${asAdotado} e A's adotado = ${alinAdotado} / Cálculo comparativo = ${(0.004 * (bw*ALT_PRE))}`)
        if ((asAdotado+alinAdotado) > (0.004 * (bw*ALT_PRE))) {
            alert('Dimensionamento de viga com Armadura Excessiva. Será necessário trocar a seção escolhida!!!')
            ALT_PRE = prompt(`Defina uma nova altura:`)
            if (ALT_PRE != null){
                document.getElementById('altPre').value = ALT_PRE + ' cm'
                geraDadosAs()                
                }
        }
    }

    

    let RESULT_As = document.getElementById('resultado-As')
    if (msgBx == 'SIMPLES') {
        RESULT_As.innerHTML = `AS adotado: ${asAdotado} cm²`
        RESULT_As.style.background = "#e9fc2c"
        RESULT_As.style.color = "black"
        RESULT_As.style.fontWeight = "bold"
        RESULT_As.style.fontFamily = "'Roboto', sans-serif"
        RESULT_As.style.fontSize = "30px"
        RESULT_As.style.borderRadius = "10px"
    } else {
        RESULT_As.innerHTML = `AS adotado(As + A's): ${(asAdotado + alinAdotado).toFixed(4)} cm²`
        RESULT_As.style.background = "#e9fc2c"
        RESULT_As.style.color = "black"
        RESULT_As.style.fontWeight = "bold"
        RESULT_As.style.fontFamily = "'Roboto', sans-serif"
        RESULT_As.style.fontSize = "30px"
        RESULT_As.style.borderRadius = "10px"
    }

}

var alfV2
var vrd2
function geraDadosCisalhamento() {
    alfV2 = (1 - (valorFck / 250)).toFixed(2)
    vrd2 = (0.27 * alfV2 * (fcd / 10) * bw * ALT_UTI).toFixed(2)

    document.getElementById('alfV2').value = alfV2
    document.getElementById('vrd2').value = vrd2 + ' kN'
}

var valFctd
var valVc
var valFywk
var valPswMin
var valVswMin
var valVsdMin
function geraDadosVcVsw() {
    valFctd = parseFloat((((0.21 * Math.pow(valorFck, 2 / 3)) / yc) / 10).toFixed(3))
    document.getElementById('fctd').value = valFctd + ' kN/cm²'

    valVc = parseFloat((0.6 * valFctd * bw * ALT_UTI).toFixed(3))
    document.getElementById('Vc').value = valVc + ' kN'

    valFywk = parseFloat(((fyk / 10) / ysAs).toFixed(2))
    document.getElementById('fywk').value = valFywk + ' kN/cm²'

    /*pswmin*/
    var tabPswMin = [
        ca25 = {
            c25: (0.205 / 100).toFixed(5),
            c30: (0.230 / 100).toFixed(5),
            c35: (0.257 / 100).toFixed(5),
            c40: (0.281 / 100).toFixed(5),
            c45: (0.304 / 100).toFixed(5),
            c50: (0.326 / 100).toFixed(5),
            c55: (0.331 / 100).toFixed(5),
            c60: (0.344 / 100).toFixed(5),
            c65: (0.356 / 100).toFixed(5),
            c70: (0.367 / 100).toFixed(5),
            c75: (0.377 / 100).toFixed(5),
            c80: (0.387 / 100).toFixed(5),
            c85: (0.396 / 100).toFixed(5),
            c90: (0.405 / 100).toFixed(5)
        },
        ca50 = {
            c25: (0.103 / 100).toFixed(5),
            c30: (0.116 / 100).toFixed(5),
            c35: (0.128 / 100).toFixed(5),
            c40: (0.140 / 100).toFixed(5),
            c45: (0.152 / 100).toFixed(5),
            c50: (0.163 / 100).toFixed(5),
            c55: (0.166 / 100).toFixed(5),
            c60: (0.172 / 100).toFixed(5),
            c65: (0.178 / 100).toFixed(5),
            c70: (0.183 / 100).toFixed(5),
            c75: (0.189 / 100).toFixed(5),
            c80: (0.194 / 100).toFixed(5),
            c85: (0.198 / 100).toFixed(5),
            c90: (0.203 / 100).toFixed(5)
        },
        ca60 = {
            c25: (0.085 / 100).toFixed(5),
            c30: (0.097 / 100).toFixed(5),
            c35: (0.107 / 100).toFixed(5),
            c40: (0.117 / 100).toFixed(5),
            c45: (0.127 / 100).toFixed(5),
            c50: (0.136 / 100).toFixed(5),
            c55: (0.138 / 100).toFixed(5),
            c60: (0.143 / 100).toFixed(5),
            c65: (0.148 / 100).toFixed(5),
            c70: (0.153 / 100).toFixed(5),
            c75: (0.157 / 100).toFixed(5),
            c80: (0.161 / 100).toFixed(5),
            c85: (0.165 / 100).toFixed(5),
            c90: (0.169 / 100).toFixed(5)
        }
    ]

    /*ARRAY: CA-25 = 0, CA-50 = 1, CA-60 = 2*/
    var buscaFyk2 = document.getElementById('FYK-ACO');
    var fyk2 = (buscaFyk2.options[buscaFyk2.selectedIndex].text)
    var Cfck = 'c' + valorFck
    
    if (fyk2 == 'CA-25') {
        fyk2 = 0
    } else if (fyk2 == 'CA-50') {
        fyk2 = 1
    } else {
        fyk2 = 2
    }

    valPswMin = tabPswMin[fyk2]
    valPswMin = parseFloat(valPswMin[Cfck])
    document.getElementById('psw-Min').value = (valPswMin * 100).toFixed(3) + ' %'

    valVswMin = parseFloat((valPswMin * 0.9 * bw * ALT_UTI * valFywk).toFixed(3))
    document.getElementById('Vsw-Min').value = valVswMin + ' kN'

    valVsdMin = parseFloat((valVswMin + valVc).toFixed(3))
    document.getElementById('Vsd-Min').value = valVsdMin + ' kN'
    
}

var valAsw
var valVsw
var valAswMin
function geraVerificacaoCisalhamento() {
    document.getElementById('Vd-Cis').value = VSD + ' kN'

    document.getElementById('Vrd2-Cis').value = vrd2 + ' kN'

    document.getElementById('VsdMin-Cis').value = valVsdMin + ' kN'

    /*INFORMAÇÕES CISALHAMENTO*/
    let RESULT_Vrd2Cisal = document.getElementById('info-Vrd2-Cis')
    if (VSD < vrd2) {
        RESULT_Vrd2Cisal.innerHTML = 'Vd < Vrd2 portanto as bielas resistem'
        RESULT_Vrd2Cisal.style.background = "#e9fc2c"
        RESULT_Vrd2Cisal.style.color = "black"
        RESULT_Vrd2Cisal.style.fontWeight = "bold"
        RESULT_Vrd2Cisal.style.fontFamily = "'Roboto', sans-serif"
        RESULT_Vrd2Cisal.style.fontSize = "25px"
        RESULT_Vrd2Cisal.style.borderRadius = "10px"
    } else {
        RESULT_Vrd2Cisal.innerHTML = 'Vd > Vrd2 realizar verificação das bielas'
        RESULT_Vrd2Cisal.style.background = "#e9fc2c"
        RESULT_Vrd2Cisal.style.color = "black"
        RESULT_Vrd2Cisal.style.fontWeight = "bold"
        RESULT_Vrd2Cisal.style.fontFamily = "'Roboto', sans-serif"
        RESULT_Vrd2Cisal.style.fontSize = "25px"
        RESULT_Vrd2Cisal.style.borderRadius = "10px"
    }

    let RESULT_VsdMinCisal = document.getElementById('info-VsdMin-Cis')
    if (VSD < valVsdMin) {
        RESULT_VsdMinCisal.innerHTML = `Adotar Vsd;min = ${valVsdMin} kN`
        RESULT_VsdMinCisal.style.background = "#e9fc2c"
        RESULT_VsdMinCisal.style.color = "black"
        RESULT_VsdMinCisal.style.fontWeight = "bold"
        RESULT_VsdMinCisal.style.fontFamily = "'Roboto', sans-serif"
        RESULT_VsdMinCisal.style.fontSize = "25px"
        RESULT_VsdMinCisal.style.borderRadius = "10px"

        valAswMin = parseFloat((valPswMin * bw).toFixed(2))
        document.getElementById('asw').value = (valAswMin * 100) + ' cm²/cm'
    } else {
        RESULT_VsdMinCisal.innerHTML = `Adotar Vd = ${VSD} kN`
        RESULT_VsdMinCisal.style.background = "#e9fc2c"
        RESULT_VsdMinCisal.style.color = "black"
        RESULT_VsdMinCisal.style.fontWeight = "bold"
        RESULT_VsdMinCisal.style.fontFamily = "'Roboto', sans-serif"
        RESULT_VsdMinCisal.style.fontSize = "25px"
        RESULT_VsdMinCisal.style.borderRadius = "10px"

        valVsw = VSD - valVc
        valAsw = (valVsw / (0.9 * ALT_UTI * valFywk)) * 100
        document.getElementById('asw').value = valAsw.toFixed(2) + ' cm²/cm'
    }    

}