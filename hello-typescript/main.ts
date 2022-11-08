var minhaVar = 'minha variavel'

function minhaFuncao(x, y){
    return x + y
}

let num = 2
const Pi = 3.14

var numeros = [1, 2, 3]

numeros.map(function(valor){
    return valor * 2
})

numeros.map( valor => valor * 2) // ES 2015

class Matematica{
    soma(x, y){
        return x + y
    }
}