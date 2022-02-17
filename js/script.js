var regularExpression = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?|magnet:\?xt=urn:btih:/;
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
        if (i === 0) {
            quizI = quizzes[i]
            console.log(quizI);
            allQuizes.innerHTML += `<li onclick="showPageQuizz(quizzes[${i}])"><img class="home-quiz-image" src="${quizzes[i].image}" alt="imagem quiz"></li>`;
        }
        else {
            if (quizzes[i].title) /*!== quizzes[i - 1].title)*/{
                allQuizes.innerHTML += `<li onclick="showPageQuizz(quizzes[${i}])"><img class="home-quiz-image" src="${quizzes[i].image}" alt="imagem quiz"></li>`;
            }
        }
    }
    // quizzes.forEach(imgQuizz => {
    //     if(imgQuizz.title)
    //     allQuizes.innerHTML += `<li ><img class="home-quiz-image" src="${imgQuizz.image}" alt="imagem quiz"></li>`;
    // });
}

pickUpAllQuizzes();