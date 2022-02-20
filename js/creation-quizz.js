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

    // if (!(form.title.length >= 20 && form.title.length <= 65)) {
    //     alert("O titulo tem que ter entre 20 e 65 caracteres");
    // }
    // if (!(regularExpression.test(form.image))) {
    //     alert("Esta não é uma url valida");
    // }
    // if (amountOf.questions < 3) {
    //     alert("A quantidade de perguntas tem de ser ao menos 3");
    // }
    // if (amountOf.levels < 2) {
    //     alert("A quantidade de niveis tem de ser ao menos 2");
    // }
    // if ((regularExpression.test(form.image)) && (form.title.length >= 20 && form.title.length <= 65) && (amountOf.questions >= 3) && (amountOf.levels >= 2)) {
    //     createQuizzQuestions();
    // }
    createQuizzQuestions();
}

// Chama a tela de criação das perguntas do quizz
function createQuizzQuestions() {
    const createQuizzQuestions = document.querySelector(".create-quizz-informations");
    const creationPage = document.querySelector(".quizz-creation-page");
    createQuizzQuestions.style.display = "none";
    creationPage.innerHTML += `
    <div class="create-quizz-questions">
        <h1>Crie suas perguntas</h1>
        <div></div>
        <button onclick="pickUpQuestions();">Prosseguir para criar níveis</button>
    </div>
`;
    showQuestions();
}
function showQuestions() {
    const formPosition = document.querySelector(".create-quizz-questions div");
    const form = document.querySelector("questions-form");
    for (let i = 0; i < amountOf.questions; i++) {
        formPosition.innerHTML += `
        <form class="questions-form question-${i + 1} small-size"> 
            <p class="question-tittle">Pergunta ${i + 1}</p>
            <img onclick="openEditQuestions(this, 'question-${i + 1}')" src="imgs/edit.svg"></img>
            <p>Resposta correta</p>
            <p>Respostas incorretas</p>
            <div>
                <input id="question-title" placeholder="Texto da pergunta"></input>
                <input id="question-color" placeholder="Cor de fundo da pergunta"></input>
            </div>
        </form>`

        for (let j = 0; j < 4; j++) {
            let answerPosition = document.querySelector(`.question-${i + 1}`);
            answerPosition.innerHTML += `
            <div>
                <input id="question-answer-${j + 1}" placeholder="Resposta Correta"></input>
                <input id="question-url-${j + 1}" placeholder="URL da imagem"></input>
            </div>
        `
        }
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
        <form class="levels-form level-${i + 1}"> 
            <p>Nível ${i + 1}</p>
            <div>
                <input placeholder="Título do nível"></input>
                <input placeholder="% de acerto mínima"></input>
                <input placeholder="URL da imagem do nível"></input>
                <textarea placeholder="Descrição do nível"></textarea>
            </div>  
        </form>`
    }
}

function finalizeQuizzCreation() {
    const createQuizzInformation = document.querySelector(".create-quizz-levels");
    const creationPage = document.querySelector(".quizz-creation-page");
    createQuizzInformation.style.display = "none";

    creationPage.innerHTML += `
    <div class="finalize-creation">
    <h1>Seu quizz está pronto!</h1>
    <div class="finalize-quizz"></div>
    <button>Acessar Quizz</button>
    <button onclick="backToHomePage()">Voltar pra home</button>
    </div>
    `;
    const finalizeDisplay = document.querySelector(".finalize-quizz");
    finalizeDisplay.style.backgroundImage = `linear-gradient(0deg, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0)), url(${form.image})`;
    finalizeDisplay.innerHTML += `<p>${form.title}</p>`;

}


function pickUpQuestions() {
    for (let i = 0; i < amountOf.questions; i++) {
        let questionObject = {
            title: '',
            color: '',
            answers: []
        };
        questionObject.title = document.querySelector(`.question-${i + 1} #question-title`).value;
        questionObject.color = document.querySelector(`.question-${i + 1} #question-color`).value;
        for (let j = 1; j <= 4; j++) {
            let answerObject = {
                text: '',
                image: '',
                isCorrectAnswer: ''
            };
            answerObject.text = document.querySelector(`.question-${i + 1} #question-answer-${j}`).value;
            answerObject.image = document.querySelector(`.question-${i + 1} #question-url-${j}`).value;
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




    // form.questions.forEach((question) =>{
    //     if (question.title.length < 20) {
    //         alert("O titulo da questão deve ter pelo menos 20 caracteres");
    //         form.questions = [];
    //     }
    //     if (!colorRegularExpression.test(question.color)) {
    //         alert("A cor da pergunta deve ser passada em formato hexadecimal");
    //         form.questions = [];
    //     }

    //     question.answers.forEach((answer) =>{
    //         if (answer.text == "") {
    //             alert("O texto da questão não pode estar vazio");
    //             form.questions = [];
    //         }

    //         if (!(regularExpression.test(answer.image)) || answer.image == undefined) {
    //                 alert("A imagem da resposta deve ter uma url valida");
    //                 form.questions = [];
    //         }
    //         if (answer.length < 2) {
    //                 alert("A questão deve conter ao menos duas respostas");
    //                 form.questions = [];
    //             }
    //         // if (!answer.includes(isCorrectAnswer == true)){
    //         //     alert("A questão deve conter ao menos uma respota correta");
    //         //     form.questions = [];
    //         // }
    //     });
    // })
        

        // for (let f = 0; f < 4; f++) {
        //    

            // 
            // if (!form.questions[k].levels[f].isCorrectAnswer.includes(true)) {
            //     alert("A questão deve conter ao menos uma respota correta");
            //     form.questions = [];
            // }
            // if (form.questions[k].levels[f].length < 2) {
            //     alert("A questão deve conter ao menos duas respostas");
            //     form.questions = [];
            // }
            // if ((form.questions[k].title.length > 20) && (colorRegularExpression.test(form.questions[k].color)) && (form.questions[k].title) && (regularExpression.test(form.questions[k].levels[f].image)) && (form.questions[k].levels[f].isCorrectAnswer.includes(true)) && (form.questions[k].levels[f].length >= 2)) {
            //     createQuizzLevels();
            // }
        // }



    createQuizzLevels()
}

function pickUpLevels() {
    // sendAndSaveUserQuizz(form);
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

    // for (let j = 0; j < amountOf.levels; j++) {
    //     if (form.levels[j].title.length < 10) {
    //         alert("O titulo do nível deve conter pelo menos 10 caracteres");
    //     }
    //     if ((form.levels[j].minValue < 0) || (form.levels[j].minValue > 100) || (form.levels[j].minValue === '')) {
    //         alert("A porcentagem de acerto minima deve ser um número entre 0 e 100");
    //     }
    //     if (!(regularExpression.test(form.levels[j].image))) {
    //         alert("Esta não é uma url valida");
    //     }
    //     if (form.levels[j].text.length < 30) {
    //         alert("A descrição do nível deve ter pelo menos 30 caracteres");
    //     }
    //     if (!form.levels[j].minValue.includes(0)) {
    //         alert("Pelo menos um dos níveis deve conter uma % de acerto igual a 0")
    //     }
    //     if ((form.levels[j].title.length >= 10) && (!(form.levels[j].minValue < 0) || (form.levels[j].minValue > 100) || (form.levels[j].minValue === '')) && (regularExpression.test(form.levels[j].image) && (form.levels[j].text.length >= 30) && (form.levels[j].minValue.includes(0)))) {
    //         finalizeQuizzCreation();
    //     }
    //     form.levels = [];
    // }
    finalizeQuizzCreation();
}

function openEditQuestions(question, selected) {
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

