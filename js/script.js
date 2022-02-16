let quizzes = [];
let filteredQuizzes = [];


function pickUpAllQuizzes() {
    const promisse = axios.get("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes");
    promisse.then((response) => {
        response.data.forEach(quizz => {
            quizzes.push(quizz);
        });
        console.log(quizzes);
        showAllQuizzes();
    });
    promisse.catch((erro) => console.log(`${erro.response.status} Erro ao pegar os quizzes`));
}

function showAllQuizzes() {
    const allQuizes = document.querySelector(".all-quizzes");
    for (let i = 0; i < quizzes.length; i++) {
        if (i === 0) {
            allQuizes.innerHTML += `<li><img class="home-quiz-image" src="${quizzes[i].image}" alt="imagem quiz"></li>`;
        }
        else {
            if (quizzes[i].title !== quizzes[i - 1].title) {
                allQuizes.innerHTML += `<li><img class="home-quiz-image" src="${quizzes[i].image}" alt="imagem quiz"></li>`;
            }
        }
    }
    // quizzes.forEach(imgQuizz => {
    //     if(imgQuizz.title)
    //     allQuizes.innerHTML += `<li ><img class="home-quiz-image" src="${imgQuizz.image}" alt="imagem quiz"></li>`;
    // });
}

function createQuizz() {
    const main = document.querySelector("main");
    main.innerHTML = "";
    
}


pickUpAllQuizzes();