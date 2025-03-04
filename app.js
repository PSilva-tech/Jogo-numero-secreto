let listaDeNumerosSorteados = [];
let numeroLimite = 111; 
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1; 

function exibirTextoNaTela(tag, texto) {
 let campo = document.querySelector(tag);
 campo.innerHTML = texto;
 if ('speechSynthesis' in window) {
    let utterance = new SpeechSynthesisUtterance(texto);
    utterance.lang = 'pt-BR'; 
    utterance.rate = 1.2; 
    window.speechSynthesis.speak(utterance); 
} else {
    console.log("Web Speech API não suportada neste navegador.");
}
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1','jogo no numero secreto');
    exibirTextoNaTela('p','escolha um numero de 1 a 10'); 
    
}
exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value 

    if (chute == numeroSecreto) {
        exibirTextoNaTela ('h1', 'Acertou'); 
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `voce acertou o numero secreto com ${tentativas} ${palavraTentativa}`; 
        exibirTextoNaTela ('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled'); 

     } else {
            if (chute > numeroSecreto) {
                exibirTextoNaTela ('p', 'o numero secreto é menor');
                } else {
                    exibirTextoNaTela('p', 'o numero secreto é maior');
                } 
                limparCampo(); 
                tentativas++; 
            }
        
}    

   function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1 );
    let quantidadesDeNumerosNaLista = listaDeNumerosSorteados.length;
     if (quantidadesDeNumerosNaLista == numeroLimite) {
         listaDeNumerosSorteados = []; 
     }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(); 
    } else {
         listaDeNumerosSorteados.push(numeroEscolhido);
         return numeroEscolhido
    }
    
} 

   function limparCampo() {
    chute = document.querySelector('input');
    chute.value = ''; 
   }

   function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1; 
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
   }

