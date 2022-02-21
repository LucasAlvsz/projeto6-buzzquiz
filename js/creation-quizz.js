let regularExpression = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?|magnet:\?xt=urn:btih:/;
let colorRegularExpression = /^#[0-9A-F]{6}$/i;
let amountOf = {
    levels: 0,
    questions: 0
};
let form = {
    title: null,
    image: null,
    questions: [],
    levels: []
};

function createQuizz() {
    const creationPage = document.querySelector(".quizz-creation-page");
    const navHome = document.querySelector("main nav");
    const quizzPage = document.querySelector(".quizz-page")
    quizzPage.style.display = "none"
    navHome.classList.add("hidden");
    creationPage.innerHTML += `
                            <div class="create-quizz-informations">
                                <h1>Comece pelo começo</h1>
                                <form>
                                    <input placeholder="Título do seu quizz"></input>
                                    <input placeholder="URL da imagem do seu quizz"></input>
                                    <input placeholder="Quantidade de perguntas do quizz"></input>
                                    <input placeholder="Quantidade de níveis do quizz"></input>
                                </form>
                                <button onclick="checkInformation();">Prosseguir para criar perguntas</button>
                            </div>
    `;
}

function checkInformation() {

    form.title = document.querySelector(".create-quizz-informations input:first-child").value;
    form.image = document.querySelector(".create-quizz-informations input:nth-child(2)").value;
    amountOf.questions = document.querySelector(".create-quizz-informations input:nth-child(3)").value;
    amountOf.levels = document.querySelector(".create-quizz-informations input:nth-child(4)").value;

    if (!(form.title.length >= 20 && form.title.length <= 65)) {
        alert("O titulo tem que ter entre 20 e 65 caracteres");
    }
    if (!(regularExpression.test(form.image))) {
        alert("Esta não é uma url valida");
    }
    if (amountOf.questions < 3) {
        alert("A quantidade de perguntas tem de ser ao menos 3");
    }
    if (amountOf.levels < 2) {
        alert("A quantidade de niveis tem de ser ao menos 2");
    }
    if ((regularExpression.test(form.image)) && (form.title.length >= 20 && form.title.length <= 65) && (amountOf.questions >= 3) && (amountOf.levels >= 2)) {
        createQuizzQuestions();
    }
}

function createQuizzQuestions() {
    const createQuizzQuestions = document.querySelector(".create-quizz-informations");
    const creationPage = document.querySelector(".quizz-creation-page");
    createQuizzQuestions.style.display = "none";
    creationPage.innerHTML += `
    <div class="create-quizz-questions">
        <h1>Crie suas perguntas</h1>
        <div></div>
        <button onclick="pickUpQuestions()">Prosseguir para criar níveis</button>
    </div>
`;
    showQuestions();
}

function showQuestions() {
    const formPosition = document.querySelector(".create-quizz-questions div");
    const form = document.querySelector("questions-form");
    for (let i = 0; i < amountOf.questions; i++) {
        formPosition.innerHTML += `
        <form data-identifier="question" class="questions-form question-${i + 1} small-size"> 
            <p class="question-tittle">Pergunta ${i + 1}</p>
            <img data-identifier="expand" onclick="openEditQuestions(this, 'question-${i + 1}')" src="imgs/edit.svg"></img>
            <p>Resposta correta</p>
            <p>Respostas incorretas</p>
            <div>
                <input id="question-title" placeholder="Texto da pergunta"></input>
                <input id="question-color" placeholder="Cor de fundo da pergunta"></input>
            </div>
        </form>`

        for (let j = 0; j < 4; j++) {
            let answerPosition = document.querySelector(`.question-${i + 1}`);
            if (j === 0) {
                answerPosition.innerHTML += `
            <div>
                <input id="question-answer-${j + 1}" placeholder="Resposta Correta"></input>
                <input id="question-url-${j + 1}" placeholder="URL da imagem"></input>
            </div>
            `
            }
            else {
                answerPosition.innerHTML += `
            <div>
                <input id="question-answer-${j + 1}" placeholder="Resposta Incorreta"></input>
                <input id="question-url-${j + 1}" placeholder="URL da imagem"></input>
            </div>
            `
            }
        }
    }
}

function pickUpQuestions() {
    let counterQuestionItens = {
        length: 0,
        color: 0,
        answerAmount: 0,
        isAnswerEmpty: 0,
        isUrl: 0,
        isTrue: 0
    };

    for (let i = 0; i < amountOf.questions; i++) {
        let questionObject = {
            title: '',
            color: '',
            answers: []
        };
        questionObject.title = document.querySelector(`.question-${i + 1} #question-title`).value;
        questionObject.color = document.querySelector(`.question-${i + 1} #question-color`).value;
        for (let j = 0; j < 4; j++) {
            let answerObject = {
                text: '',
                image: '',
                isCorrectAnswer: ''
            };
            answerObject.text = document.querySelector(`.question-${i + 1} #question-answer-${j + 1}`).value;
            answerObject.image = document.querySelector(`.question-${i + 1} #question-url-${j + 1}`).value;
            if (j === 1) {
                answerObject.isCorrectAnswer = true;
            }
            else {
                answerObject.isCorrectAnswer = false;
            }
            if (answerObject.image) {
                questionObject.answers.push(answerObject);
            }
        }
        form.questions.push(questionObject);
    }

    form.questions.forEach((question) => {
        let counter = 0;
        if (question.title.length < 20 && counterQuestionItens.length === 0) {
            alert("O titulo das questões devem ter pelo menos 20 caracteres");
            counterQuestionItens.length++;
            form.questions = [];
        }
        if (!colorRegularExpression.test(question.color) && counterQuestionItens.color === 0) {
            alert("A cor de fundo das questões devem ser passada em formato hexadecimal");
            counterQuestionItens.color++;
            form.questions = [];
        }
        if (question.answers.length < 2 && counterQuestionItens.answerAmount === 0) {
            alert("As questões devem conter ao menos duas respostas");
            counterQuestionItens.answerAmount++;
            form.questions = [];
        }
        question.answers.forEach((answer) => {
            if ((answer.text == "") && counterQuestionItens.isAnswerEmpty === 0) {
                alert("O texto das questões não podem estar vazios");
                counterQuestionItens.isAnswerEmpty++;
                form.questions = [];
            }
            if ((!(regularExpression.test(answer.image)) || answer.image == undefined) && counterQuestionItens.isUrl === 0) {
                alert("A imagem das respostas devem ter uma url valida");
                counterQuestionItens.isUrl++;
                form.questions = [];
            }
            if (answer.isCorrectAnswer === true) {
                counter++;
            }
        });
        if ((counter === 0) && counterQuestionItens.isTrue === 0) {
            alert("As questões devem conter ao menos uma respota correta");
            counterQuestionItens.isTrue++;
            form.questions = [];
        }
    });
    if (form.questions.length !== 0) {
        createQuizzLevels();
    }
}

function createQuizzLevels() {
    const createQuizzLevels = document.querySelector(".create-quizz-questions");
    const creationPage = document.querySelector(".quizz-creation-page");
    createQuizzLevels.style.display = "none";
    creationPage.innerHTML += `
    <div class="create-quizz-levels">
        <h1>Agora, decida os níveis!</h1>
        <div></div>
        <button onclick="pickUpLevels()">Finalizar Quizz</button>
    </div>
   `;
    showLevels();
}

function showLevels() {
    const formPosition = document.querySelector(".create-quizz-levels div");
    for (let i = 0; i < amountOf.levels; i++) {
        formPosition.innerHTML += `
        <form data-identifier="level" class="levels-form level-${i + 1} small-size"> 
            <p>Nível ${i + 1}</p>
            <img data-identifier="expand" onclick="openEditLevel(this, 'level-${i + 1}')" src="imgs/edit.svg"></img>
            <div>
                <input placeholder="Título do nível"></input>
                <input placeholder="% de acerto mínima"></input>
                <input placeholder="URL da imagem do nível"></input>
                <textarea placeholder="Descrição do nível"></textarea>
            </div>  
        </form>`
    }
}

function pickUpLevels() {
    let verfication = {
        length: 0,
        minValue: 0,
        validUrl: 0,
        minCaracter: 0,
        include0: 0
    };
    for (let i = 1; i <= amountOf.levels; i++) {
        let levelObject = {
            title: null,
            image: null,
            text: null,
            minValue: null
        };

        levelObject.title = document.querySelector(`.level-${i} input:first-of-type`).value;
        levelObject.minValue = document.querySelector(`.level-${i} input:nth-of-type(2)`).value;
        levelObject.image = document.querySelector(`.level-${i} input:nth-of-type(3)`).value;
        levelObject.text = document.querySelector(`.level-${i} textarea`).value;

        form.levels.push(levelObject);
    }

    form.levels.forEach((level) => {
        if (level.title.length < 10 && verfication.length === 0) {
            verfication.length++;
            form.levels = [];
            alert("O titulo do nível deve conter pelo menos 10 caracteres");
        }
        if ((level.minValue < 0) || (level.minValue > 100) || (level.minValue === '') && verfication.minValue === 0) {
            verfication.minValue++;
            form.levels = [];
            alert("A porcentagem de acerto minima deve ser um número entre 0 e 100");
        }
        if (!(regularExpression.test(level.image)) && verfication.validUrl === 0) {
            verfication.validUrl++;
            form.levels = [];
            alert("Esta não é uma url valida");
        }
        if (level.text.length < 30 && verfication.minCaracter === 0) {
            verfication.minCaracter++;
            form.levels = [];
            alert("A descrição do nível deve ter pelo menos 30 caracteres");
        }
        if (!level.minValue.includes(0) && verfication.include0 === 0) {
            verfication.include0++;
            form.levels = [];
            alert("Pelo menos um dos níveis deve conter uma % de acerto igual a 0");
        }
    })
    if (form.levels.length !== 0) {
        finalizeQuizzCreation();
    }

}

function openEditQuestions(question, selected) {
    document.querySelector(".create-quizz-questions").scrollIntoView()
    let questionsArray = [];
    const parent = question.parentNode;
    parent.querySelector("p:first-of-type").style.top = "10px";
    parent.classList.remove("small-size");
    parent.querySelector("img").style.visibility = "hidden";

    for (let i = 0; i < amountOf.questions; i++) {
        questionsArray.push(`question-${i + 1}`);
    }

    let index = questionsArray.indexOf(selected);
    questionsArray.splice(index, 1);

    questionsArray.forEach((element) => {
        const elementNode = document.querySelector(`.${element}`);
        elementNode.querySelector("p:first-of-type").style.top = "4px";
        elementNode.classList.add("small-size");
        elementNode.querySelector("img").style.visibility = "visible";
    })

}
function openEditLevel(level, selected) {
    document.querySelector(".create-quizz-levels").scrollIntoView();
    let levelArray = [];
    const parent = level.parentNode;
    parent.querySelector("p:first-of-type").style.top = "10px";
    parent.classList.remove("small-size");
    parent.querySelector("img").style.visibility = "hidden";

    for (let i = 0; i < amountOf.levels; i++) {
        levelArray.push(`level-${i + 1}`);
    }

    let index = levelArray.indexOf(selected);
    levelArray.splice(index, 1);

    levelArray.forEach((element) => {
        const elementNode = document.querySelector(`.${element}`);
        elementNode.querySelector("p:first-of-type").style.top = "4px";
        elementNode.classList.add("small-size");
        elementNode.querySelector("img").style.visibility = "visible";
    })
}

function acessQuizz() {
    document.querySelector(".quizz-page").style.display = "flex";
    document.querySelector(".quizz-creation-page").style.display = "none";
    showPageQuizz(form);
}

function finalizeQuizzCreation() {
    sendAndSaveUserQuizz(form);
    const createQuizzInformation = document.querySelector(".create-quizz-levels");
    const creationPage = document.querySelector(".quizz-creation-page");
    createQuizzInformation.style.display = "none";

    creationPage.innerHTML += `
    <div class="finalize-creation">
        <h1>Seu quizz está pronto!</h1>
        <div onclick="acessQuizz()" class="finalize-quizz"></div>
        <button onclick="acessQuizz()">Acessar Quizz</button>
        <button onclick="backToHomePage()">Voltar pra home</button>
    </div>
    `;
    const finalizeDisplay = document.querySelector(".finalize-quizz");
    finalizeDisplay.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${form.image})`;
    finalizeDisplay.innerHTML += `<p>${form.title}</p>`;

}

