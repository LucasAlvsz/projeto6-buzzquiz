let quizzes = []
// const URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/"
let existsUserQuizzes = false

// Pega os quizzes do servidor
function pickUpAllQuizzes() {
    axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes").then(aleatorio).catch((erro) => console.log(`${erro.response.status} Erro ao pegar os quizzes`));
}
function aleatorio(teste){
    quizzes = teste.data
    pickUpUserQuizzes()
}
function pickUpUserQuizzes() {
    const userQuizzesList = document.querySelector(".user-quizzes-list")
    for (let i = 0; i < quizzes.length; i++) {
        if (localStorage.getItem(quizzes[i].id.toString())) {
            existsUserQuizzes = true
            let userQuizz = JSON.parse(localStorage.getItem(quizzes[i].id))
            userQuizzesList.innerHTML +=
                `<li onclick="showPageQuizz(${quizzes[i].id})"><p class="quizz user-qzz${i}">${userQuizz.title}</p>`
            document.querySelector(`.user-qzz${i}`).style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${userQuizz.image})`
        }
    }
    if (existsUserQuizzes) {
        console.log("entrei");
        const noQuizCreatedClass = document.querySelector(".no-quiz-created")
        noQuizCreatedClass.classList.add("hidden")
        document.querySelector(".user-quizzes span").innerHTML +=
            `
            <div class="title">
                <p>Seus Quizzes</p>
                <ion-icon name="add-circle-sharp"></ion-icon>
            </div>
            `
    }
    showAllQuizzes(quizzes)

}
// Mostra os quizzes na tela inicial
function showAllQuizzes(quizzes) {
    const allQuizzesList = document.querySelector(".all-quizzes-list");
    for (let i = 0; i < quizzes.length; i++) {
        allQuizzesList.innerHTML +=
            `<li onclick="showPageQuizz(quizzes[${i}])"><p class="quizz qzz${i}">${quizzes[i].title}</p>`
        document.querySelector(`.qzz${i}`).style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizzes[i].image})`
    }
}

pickUpAllQuizzes();
