var regularExpression = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?|magnet:\?xt=urn:btih:/;
let quizzes = [];
const URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
let amountOf = {
    levels: 0,
    questions: 0
}
let userQuizzes = [];
let form = {
    title: null,
    image: null,
    questions: [],
    levels: []
};

// Pega os quizzes do servidor
function pickUpAllQuizzes() {
    const promisse = axios.get(`${URL}quizzes`);
    promisse.then((response) => {
        response.data.forEach(quizz => {
            quizzes.push(quizz);
        });
        console.log(quizzes);
        showAllQuizzes();
    });
    promisse.catch((erro) => console.log(`${erro.response.status} Erro ao pegar os quizzes`));
}

// Mostra os quizzes na tela inicial
function showAllQuizzes() {
    const allQuizes = document.querySelector(".all-quizzes");
    for (let i = 0; i < quizzes.length; i++) {
        if (i === 0) {
            allQuizes.innerHTML += `<li onclick="showPageQuizz(${quizzes[i]})"><img class="home-quiz-image" src="${quizzes[i].image}" alt="imagem quiz"></li>`;
        }
        else {
            if (quizzes[i].title) /*!== quizzes[i - 1].title)*/{
                allQuizes.innerHTML += `<li onclick="showPageQuizz(${quizzes[i]})"><img class="home-quiz-image" src="${quizzes[i].image}" alt="imagem quiz"></li>`;
            }
        }
    }
    // quizzes.forEach(imgQuizz => {
    //     if(imgQuizz.title)
    //     allQuizes.innerHTML += `<li ><img class="home-quiz-image" src="${imgQuizz.image}" alt="imagem quiz"></li>`;
    // });
}
function teste(aa) {
    console.log(aa);
}

pickUpAllQuizzes();