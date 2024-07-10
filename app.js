let ListaDeNumerosSorteados = [];
let numeroLimite = 10;

// era assim dai evoluiu     let titulo = document.querySelector('h1');// NOMEIO TITULO E PECO PARA ELE BUSCAAR A INFORMACAO NO SCIPT HTML NO CAMPO H1
//<h1></h1> O 1º H1 EH A TaG
//era assim , evoluiu para funcao    titulo.innerHTML = 'Jogo do número secreto';

//   let paragrafo = document.querySelector('p');// busco a informacao do <p class="texto__paragrafo"></p>
//    paragrafo.innerHTML = 'Escolha um numero entre 1 e 10';

// verificarChute() eh onde o botao esta e vamos criar uma funcao para ele
//<button onclick="verificarChute()" class="container__botao">Chutar</button>

let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//  inicialmente o codigo estava como abaixo, porem por boa pratica e facilidade na manutencao,
//  criamos uma funcao para isso:
//exibirTextoNaTela('h1', 'Jogo do número secreto!');            /// fora da chave chamamos a funcao
//exibirTextoNaTela('p', 'Escolha um número d 0 a 10:');

function exibirTextoNaTela(tag, texto) {  
    //dentro da chave apenas as instrucoes
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2} );
}


function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do número secreto!');            /// fora da chave chamamos a funcao
    exibirTextoNaTela('p', 'Escolha um número de 0 a 10:');
    
}

exibirMensagemInicial();
    
function verificarChute() {
    let chute = document.querySelector('input').value; //  input vm dai => <input type="number" min="1" max="10" class="container__input">
    
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto(${numeroSecreto}) com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        //para abilitar o botao de novo jogo, precisamos verificar no doc html o campo do botao,
        // referente  a ele, no caso deste ID, e vamos informar na proxima linha
        // que queremos que o campo do ID tal faca, no caso remover o atributo
        // no caso deste Disable:
        document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
                if (chute > numeroSecreto) {
                    exibirTextoNaTela('p', `O número secreto é menor que ${chute}`);
                } else {
                    exibirTextoNaTela('p', `O número secreto é maior que ${chute}`);
                }
                tentativas++; // modo hardcore de contador : tentativas
                limparCampo();
        }
}

//    function gerarNumeroAleatorio() {
//      return parseInt(Math.random() *10 + 1);    //para mostrarmos os resultado, adiciono Return
//    
//}
//    era assim e atulizamos abaixo pq criamos a lista de numeros ListaDeNumerosSorteados
//    para que os numeros nao voltassem a sair...
    
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);    //para mostrarmos os resultado, adiciono Return
    let quantidadeDeElementosNaLista = ListaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite )   //  10 pq eu quero nº de 0 a 10 ai em cima ta 
    ListaDeNumerosSorteados = []

    if (ListaDeNumerosSorteados.includes(numeroEscolhido)) {   // o includes verifica se o item () esta na lista
        return gerarNumeroAleatorio();
    } else {
        ListaDeNumerosSorteados.push(numeroEscolhido);
        console.log(ListaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function  limparCampo() {
    chute = document.querySelector('input')  // aqui cordenadas geograficas do lugar que queremos
    chute.value = '';
    
}
// aqui a funcao vai ser chamada quando
function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true)
    
}