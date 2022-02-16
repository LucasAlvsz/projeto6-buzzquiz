let quizzes = [];
const URL = "https://mock-api.driven.com.br/api/v4/buzzquizz/";
const main = document.querySelector("main");
let amountOfLevels = 0;
let amountOfQuestions = 0;
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

// Chama a tela de criação do quizz
function createQuizz() {
    const navHome = document.querySelector("main nav");
    navHome.classList.add("hidden");
    main.innerHTML += `
                        <div class="create-quizz">
                            <h1>Comece pelo começo</h1>
                            <form>
                                <input placeholder="Título do seu quizz"></input>
                                <input placeholder="URL da imagem do seu quizz"></input>
                                <input placeholder="Quantidade de perguntas do quizz"></input>
                                <input placeholder="Quantidade de níveis do quizz"></input>
                            </form>
                            <button onclick="pickUpCreateQuizzForm(), createQuizzQuestions()">Prosseguir para criar perguntas</button>
                        </div>
    `;

}
// Recebe as informações do form incial
function pickUpCreateQuizzForm() {
    form.title = document.querySelector(".create-quizz input:first-child").value;
    form.image = document.querySelector(".create-quizz input:nth-child(2)").value;
    amountOfQuestions = document.querySelector(".create-quizz input:nth-child(3)").value;
    amountOfLevels = document.querySelector(".create-quizz input:nth-child(4)").value;
}

// Chama a tela de criação das perguntas do quizz
function createQuizzQuestions() {
    const createQuizz = document.querySelector("main .create-quizz");
    createQuizz.classList.add("hidden");
    main.innerHTML += `
    <div class="create-quizz-questions">
        <h1>Crie suas perguntas</h1>
        <form>
            <input placeholder="Título do seu quizz"></input>
            <input placeholder="URL da imagem do seu quizz"></input>
            <input placeholder="Quantidade de perguntas do quizz"></input>
            <input placeholder="Quantidade de níveis do quizz"></input>
        </form>
        <button onclick="createQuizzQuestions()">Prosseguir para criar perguntas</button>
    </div>
`;
}


pickUpAllQuizzes();