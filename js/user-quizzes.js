const myQuizz = {
	title: "Título do quizz",
	image: "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Akali_0.jpg",
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
}

function sendAndSaveUserQuizz(quizzUser) {
	console.log(quizzUser);
	axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzUser)
		.then(response => {
			userQuizz = JSON.stringify(quizzUser)
			localStorage.setItem(response.data.id.toString(), quizzUser)
	})
}



// function saveUserQuizz(id, myQuizz) {
// 	userQuizz = JSON.stringify(myQuizz)
// 	localStorage.setItem(id.toString(), userQuizz)
// }
//localStorage.setItem("nome", "Lucax");
