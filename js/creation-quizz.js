// Chama a tela de criação do quizz
function createQuizz() {
    const main = document.querySelector("main");
    const navHome = document.querySelector("main nav");
    navHome.classList.add("hidden");
    main.innerHTML += `
                        <section class="quizz-creation-page">
                            <div class="create-quizz">
                                <h1>Comece pelo começo</h1>
                                <form>
                                    <input placeholder="Título do seu quizz"></input>
                                    <input placeholder="URL da imagem do seu quizz"></input>
                                    <input placeholder="Quantidade de perguntas do quizz"></input>
                                    <input placeholder="Quantidade de níveis do quizz"></input>
                                </form>
                                <button onclick="checkInformation(), createQuizzQuestions();">Prosseguir para criar perguntas</button>
                            </div>
                        </section>
    `;
}
// Verifica as informações do formulario inicial
function checkInformation() {
    form.title = document.querySelector(".create-quizz input:first-child").value;
    form.image = document.querySelector(".create-quizz input:nth-child(2)").value;
    amountOf.questions = document.querySelector(".create-quizz input:nth-child(3)").value;
    amountOf.levels = document.querySelector(".create-quizz input:nth-child(4)").value;

    // let controle = 0;
    // if(!regularExpression.test(form.image)){
    //     console.log("Esta não é uma url valida");
    //     controle ++;
    // }
    // if(!(form.title.length >= 20 && form.title.length <= 65)){
    //     console.log("O titulo tem que ter entre 20 e 60 caracteres");
    //     controle ++;
    // }
    // if(amountOf.questions < 3){
    //     console.log("A quantidade de perguntas tem de ser ao menos 3");
    //     controle ++;
    // }
    // if(amountOf.levels < 2){
    //     console.log("A quantidade de niveis tem de ser ao menos 2");
    //     controle ++;
    // }
    // if(controle === 0){
    //     createQuizzQuestions();
    // }
}

// Chama a tela de criação das perguntas do quizz
function createQuizzQuestions() {
    const createQuizz = document.querySelector(".quizz-creation-page .create-quizz");
    const creationPage = document.querySelector(".quizz-creation-page");
    createQuizz.classList.add("hidden");
    creationPage.innerHTML += `
    <div class="creatie-quizz-questions">
        <h1>Crie suas perguntas</h1>
        <form> 
            <p>Pergunta 1</p>
            <div>
                <input></input>
                <input></input>
            </div>
            <p>Resposta correta</p>
            <div>
                <input></input>
                <input></input>
            </div>
            <p>Respostas incorretas</p>
            <div>
                <input></input>
                <input></input>
            </div>
            <div>
                <input></input>
                <input></input>
            </div>
            <div>
                <input></input>
                <input></input>
            </div>
        </form>
        <button onclick="createQuizzQuestions()">Prosseguir para criar níveis</button>
    </div>
`;
}