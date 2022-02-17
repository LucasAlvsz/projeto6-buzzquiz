function showPageQuizz(quizz) {
    // console.log(quizz.title);
    const classNav = document.querySelector("nav")
    const classQuizzPage = document.querySelector(".quizz-page")
    classNav.classList.add("hidden")
    classQuizzPage.classList.remove("hidden")
    classQuizzPage.scrollIntoView()
    classQuizzPage.querySelector(".title-quizz").innerHTML = quizz.title
    classQuizzPage.querySelector(".title-quizz").style.background = `linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${quizz.image})`
    for (let i = 0; i < quizz.questions.length; i++) {
        console.log(quizz.questions[i]);
        classQuizzPage.querySelector(".all-questions").innerHTML +=
            `
            <div class="question">
            <p class="title-questions" id="${i}">
                ${quizz.questions[i].title}
            </p>
            <div class="all-alternatives c${i}">
            </div>
            </div>
            `
        document.getElementById(`${i}`).style.backgroundColor = `${quizz.questions[i].color}`
        for (let j = 0; j < quizz.questions[i].answers.length; j++) {
            if(quizz.questions[i].answers[j].isCorrectAnswer){
                classQuizzPage.querySelector(`.c${i}`).innerHTML +=
                `
                <div class="alternative correct-answer" onclick="selectAlternative(this)">
                    <img src="${quizz.questions[i].answers[j].image}">
                    <p>${quizz.questions[i].answers[j].text}</p>
                </div>
                `
            }
            classQuizzPage.querySelector(`.c${i}`).innerHTML +=
            `
            <div class="alternative wrong-answer" onclick="selectAlternative(this)">
                    <img src="${quizz.questions[i].answers[j].image}">
                    <p>${quizz.questions[i].answers[j].text}</p>
            </div>
            `
        }
    }

function selectAlternative(alternative) {
    
}
    
    /*
        id: 1,
        title: "Título do quizz",
        image: "https://http.cat/411.jpg",
        questions: [
            {
                title: "Título da pergunta 1",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 2",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            },
            {
                title: "Título da pergunta 3",
                color: "#123456",
                answers: [
                    {
                        text: "Texto da resposta 1",
                        image: "https://http.cat/411.jpg",
                        isCorrectAnswer: true
                    },
                    {
                        text: "Texto da resposta 2",
                        image: "https://http.cat/412.jpg",
                        isCorrectAnswer: false
                    }
                ]
            }
        ],
        levels: [
            {
                title: "Título do nível 1",
                image: "https://http.cat/411.jpg",
                text: "Descrição do nível 1",
                minValue: 0
            },
            {
                title: "Título do nível 2",
                image: "https://http.cat/412.jpg",
                text: "Descrição do nível 2",
                minValue: 50
            }
]
    */
}