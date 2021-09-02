let isReady = true;
let playerScore = 0;
let comScore = 0;

const [
    playerScore_span,
    comScore_span,
    vs_div,
    refresh_div,
    playerGreyBox_div,
    comGreyBox_div,
    batu_div,
    kertas_div,
    gunting_div,
    batu2_div,
    kertas2_div,
    gunting2_div,
] = [
    document.getElementById("playerScore"),
    document.getElementById("comScore"),
    document.getElementById("vsAction"),
    document.getElementById("refreshAction"),
    document.querySelector(".greyBox-js.playerGrey"),
    document.querySelector(".greyBox-js.comGrey"),
    document.getElementById("batu"),
    document.getElementById("kertas"),
    document.getElementById("gunting"),
    document.getElementById("batu2"),
    document.getElementById("kertas2"),
    document.getElementById("gunting2"),
]


class GameMain {
    constructor() {}

    game(userChoice) {
        const computerChoice = this.getComputerChoice();
        if (isReady) {
            switch (userChoice + this.computerChoice) {
                case "batugunting":
                case "kertasbatu":
                case "guntingkertas":
                    this.win(userChoice, this.computerChoice);
                    break;
                case "batukertas":
                case "kertasgunting":
                case "guntingbatu":
                    this.lose(userChoice, this.computerChoice);
                    break;
                case "batubatu":
                case "kertaskertas":
                case "guntinggunting":
                    this.draw(userChoice, this.computerChoice);
                    break;
            }
        } else {
            alert("Reload dl coi")
        }
    }

    getComputerChoice() {
        const choices = ["batu", "kertas", "gunting"]
        const randomNumber = Math.floor(Math.random() * 3);
        this.computerChoice = choices[randomNumber]
    }

    win(userChoice, computerChoice) {
        vs_div.innerHTML = "PLAYER 1 WIN".fontsize(38);
        vs_div.classList.add("winlosebackground-js");
        playerScore++;
        playerScore_span.innerHTML = playerScore;
        comScore_span.innerHTML = comScore;
        document.getElementById(userChoice).classList.add("greyBox-js");
        document.getElementById(computerChoice + "2").classList.add("greyBox-js");
        console.log("user choose = " + userChoice);
        console.log("computer choose = " + computerChoice);
        console.log("user win");
    }

    lose(userChoice, computerChoice) {
        vs_div.innerHTML = "COM WIN".fontsize(38);
        vs_div.classList.add("winlosebackground-js");
        comScore++;
        playerScore_span.innerHTML = playerScore;
        comScore_span.innerHTML = comScore;
        document.getElementById(userChoice).classList.add("greyBox-js");
        document.getElementById(computerChoice + "2").classList.add("greyBox-js");
        console.log("user choose = " + userChoice);
        console.log("computer choose = " + computerChoice);
        console.log("computer win");
    }

    draw(userChoice, computerChoice) {
        vs_div.innerHTML = "DRAW".fontsize(38);
        vs_div.classList.add("winlosebackground-js");
        document.getElementById(userChoice).classList.add("greyBox-js");
        document.getElementById(computerChoice + "2").classList.add("greyBox-js");
        console.log("user choose = " + userChoice);
        console.log("computer choose = " + computerChoice);
        console.log("draw");
    }

    reload() {
        batu_div.classList.remove("greyBox-js");
        kertas_div.classList.remove("greyBox-js");
        gunting_div.classList.remove("greyBox-js");
        batu2_div.classList.remove("greyBox-js");
        kertas2_div.classList.remove("greyBox-js");
        gunting2_div.classList.remove("greyBox-js");
    }
}

let mygame = new GameMain()

batu_div.addEventListener('click', function () {
    mygame.game("batu")
    isReady = false
})

kertas_div.addEventListener('click', function () {
    mygame.game("kertas")
    isReady = false
})

gunting_div.addEventListener('click', function () {
    mygame.game("gunting")
    isReady = false
})
refresh_div.addEventListener('click', function () {
    mygame.reload()
    isReady = true
})