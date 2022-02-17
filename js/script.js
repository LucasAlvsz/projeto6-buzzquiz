
let quizzes = [];
const URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/";


// Pega os quizzes do servidor
function pickUpAllQuizzes() {
    axios.get(`${URL}quizzes`).then(showAllQuizzes).catch((erro) => console.log(`${erro.response.status} Erro ao pegar os quizzes`));
}

// Mostra os quizzes na tela inicial
function showAllQuizzes(quizzesArray) {
    quizzes = quizzesArray.data
    const allQuizes = document.querySelector(".all-quizzes");
    for (let i = 0; i < quizzes.length; i++) {
        allQuizes.innerHTML += `<li onclick="showPageQuizz(quizzes[${i}])"><p class="quizz qzz${i}">${quizzes[i].title}</p>`;
        document.querySelector(`.qzz${i}`).style.background = `linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.5) 64.58%, #000000 100%), url(${quizzes[i].image})`
    }
}

pickUpAllQuizzes();