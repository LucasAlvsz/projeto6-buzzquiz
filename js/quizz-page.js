/* ----- MAGIC NUMBERS -----*/
const TIMEAFTERSELECTINGALTERNATIVE = 1000
/* -------------------------*/
let count = 0
let numberQuestions = 0
let numberCorrectAnswers = 0
let levels = []
let indexLevel = 0
let quizzLog
let antiRepeater = 0
function showPageQuizz(quizz) {
    quizzLog = quizz
    numberQuestions = quizz.questions.length
    levels = quizz.levels
    const classNav = document.querySelector("nav")
    const classQuizzPage = document.querySelector(".quizz-page")
    classNav.classList.add("hidden")
    classQuizzPage.classList.remove("hidden")
    classQuizzPage.scrollIntoView()
    classQuizzPage.querySelector(".title-quizz").innerHTML = quizz.title
    classQuizzPage.querySelector(".title-quizz").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${quizz.image})`
    for (let i = 0; i < quizz.questions.length; i++) {
        quizz.questions[i].answers.sort(() => Math.random() - 0.5)
        classQuizzPage.querySelector(".all-questions").innerHTML +=
            `
            <div class="question q${i}">
            <p class="title-questions" id="${i}">
                ${quizz.questions[i].title}
            </p>
            <div class="all-alternatives c${i}">
            </div>
            </div>
            `
        document.getElementById(`${i}`).style.backgroundColor = `${quizz.questions[i].color}`
        for (let j = 0; j < quizz.questions[i].answers.length; j++) {
            if (quizz.questions[i].answers[j].isCorrectAnswer) {
                classQuizzPage.querySelector(`.c${i}`).innerHTML +=
                    `
                <div class="alternative correct-answer" onclick="selectAlternative(this)">
                    <img src="${quizz.questions[i].answers[j].image}">
                    <p>${quizz.questions[i].answers[j].text}</p>
                </div>
                `
            } else {
                classQuizzPage.querySelector(`.c${i}`).innerHTML +=
                    `
            <div class="alternative wrong-answer" onclick="selectAlternative(this)">
                    <img src="${quizz.questions[i].answers[j].image}">
                    <p>${quizz.questions[i].answers[j].text}</p>
            </div>
            `
            }
        }
    }
}

function selectAlternative(alternative) {
    if (alternative.classList[1] == "correct-answer") numberCorrectAnswers += 1
    const allAlternativesDiv = alternative.parentNode
    allAlternativesDiv.style.pointerEvents = "none"
    const alternativeArray = allAlternativesDiv.querySelectorAll(".alternative")
    alternativeArray.forEach(element => { if (element != alternative) element.style.opacity = "0.3" })
    const wrongAnswerClasses = allAlternativesDiv.querySelectorAll(".wrong-answer p")
    wrongAnswerClasses.forEach(element => element.style.color = "#FF4B4B")
    allAlternativesDiv.querySelector(".correct-answer p").style.color = "#009C22"
    count += 1
    setTimeout(() => {
        if (document.querySelector(`.q${count}`))
            document.querySelector(`.q${count}`).scrollIntoView({block: "center", behavior: "smooth" })
        else
            showEndQuizz()
    }, TIMEAFTERSELECTINGALTERNATIVE);
}

function showEndQuizz() {
    let minValueLog = []
    if (antiRepeater == 0) {
        antiRepeater += 1
        let percentCorrectAnswers = Math.round((numberCorrectAnswers / numberQuestions) * 100)
        for (let i = 0; i < levels.length; i++) {
            if (percentCorrectAnswers >= levels[i].minValue)
                minValueLog.push(levels[i].minValue)
        }
        minValueLog = minValueLog.reduce((a, b) => Math.max(a, b))
        for (let i = 0; i < levels.length; i++) {
            if (levels[i].minValue == minValueLog)
                indexLevel = i; 
        }
        document.querySelector(".all-questions").innerHTML +=
            `
    <div class="result">
        <div class="question">
            <p class="title-questions">
                ${percentCorrectAnswers}% de acerto: ${levels[indexLevel].title}
            </p>
            <span>
            <img src="${levels[indexLevel].image}">
            <b>
                ${levels[indexLevel].text}
            </b>
            </span>
        </div>
        <button onclick="restartQuizz(true)">Reiniciar Quizz</button>
        <button onclick="backToHomePage()">Voltar para home</button>
    </div>
    `
        document.querySelector(".result .question").scrollIntoView({block: "center", behavior: "smooth" })
    }
}

function restartQuizz(value) {
    document.querySelector(".quizz-page").innerHTML =
        `
    <p class="title-quizz"></p>
            <div class="all-questions">
            </div>
    `
    count = 0
    numberQuestions = 0
    numberCorrectAnswers = 0
    levels = []
    indexLevel = 0
    antiRepeater = 0
    if (value)
        showPageQuizz(quizzLog)
}

function backToHomePage() {
    restartQuizz(false)
    document.querySelector(".quizz-page").classList.add("hidden")
    document.querySelector("nav").classList.remove("hidden")
    document.querySelector("nav").scrollIntoView()
}
