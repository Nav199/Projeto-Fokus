const html = document.querySelector('html')

//pegando os botões pela query
const focoBt = document.querySelector('.app__card-button--foco')
const curtoBt = document.querySelector('.app__card-button--curto')
const longoBt = document.querySelector('.app__card-button--longo')
const botao = document.querySelectorAll('.app__card-button')
const musicaFoco = document.querySelector('#alternar-musica')
const musica = new Audio('/sons/luna-rise-part-one.mp3')
const comecar = document.querySelector('#start-pause')
const come = document.querySelector('#start-pause span')

const tempo_tela = document.querySelector('#timer')
//musica play e beep
const music_play = new Audio('/sons/play.wav')
const music_beep = new Audio('/sons/beep.mp3')

//temporizador

let tempo = 1500

let intervalo = null
// pegando a imagem pela classe
const banner = document.querySelector('.app__image')
//pegando texto para query
const Text = document.querySelector('.app__title')

// adicionando musica no html
musica.loop = true
musicaFoco.addEventListener('change',()=>{
    if(musica.paused){
        musica.play()
    }else{
        musica.pause()
    }
})

//Evento dos botões pela função addEventListener
focoBt.addEventListener('click', () => {
         tempo = 1500
        alterarContexto('foco')
        focoBt.classList.add('active')
})

curtoBt.addEventListener('click',() => {
    tempo = 300
    alterarContexto('descanso-curto')
    curtoBt.classList.add('active')
})

longoBt.addEventListener('click',() => {
    tempo = 900
    alterarContexto('descanso-longo')
    longoBt.classList.add('active')
})

function alterarContexto(contexto){
    mostrartempo()
    html.setAttribute('data-contexto',contexto)
    banner.setAttribute('src',`imagens/${contexto}.png`)

    botao.forEach(function (contexto) {
        contexto.classList.remove('active')
    })

    switch (contexto) {
        case "foco":
            Text.innerHTML = `                
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
            case "descanso-curto":
                Text.innerHTML = `                
                Que tal da uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
                break;
        case "descanso-longo":
                Text.innerHTML = `                
                Hora de voltar a superfície<br>
                <strong class="app__title-strong">Faça uma pausa longa!</strong>`
                break;
        
        default:
            break;
    }
}

const contagem = () =>{
    if(tempo <=0)
    {
        zerar()
        alert('tempo finalizado')
        music_beep.play()
        return
    }
    tempo -= 1
    mostrartempo()
}

comecar.addEventListener('click',iniciar)

function iniciar () {

        music_play.play()
        if(intervalo)
        {
            zerar()
            return
        }
        come.textContent = "Pausar"
        intervalo = setInterval(contagem,1000)
}
function zerar(){
    clearInterval(intervalo)
    come.textContent = "Começar"
    intervalo == null
}

function mostrartempo() {
    const tempo__ = new Date(tempo *1000)
    const tempo_formatado = tempo__.toLocaleTimeString('pt-br',{minute: '2-digit',second: '2-digit'})
    tempo_tela.innerHTML = `${tempo_formatado }`
}
mostrartempo()