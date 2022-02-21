let myQuizz = {
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
myQuizz = JSON.parse(localStorage.getItem("6106"))

// axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", myQuizz).then(response => {
// 	userQuizz = JSON.stringify(myQuizz)
// 	localStorage.setItem(response.data.id.toString(), userQuizz)
// 	let secretKey = "k" + response.data.id.toString()
// 	localStorage.setItem(secretKey, response.data.key.toString()) 
// })
// let secretKey
function sendAndSaveUserQuizz(quizzUser) {
	axios.post("https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes", quizzUser)
		.then(response => {
			let userQuizzStringfied = JSON.stringify(quizzUser)
			localStorage.setItem(response.data.id.toString(), userQuizzStringfied)
			let secretKey = "k" + response.data.id.toString()
			localStorage.setItem(secretKey, response.data.key.toString()) 
		})
}

function deleteUserQuizz(quizzUserId) {
	axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzUserId.toString()}`,
		{ headers: { "Secret-Key": localStorage.getItem("k" + quizzUserId.toString()) } })
		.then(() => {
			window.location.reload()
			localStorage.removeItem(quizzUserId.toString());
			localStorage.removeItem("k" + quizzUserId.toString())
		})
		.catch(response => console.log(response))
}

function editUserQuizz(quizzUser) {
	const quizz = JSON.parse(localStorage.getItem(quizzUser.toString()));
	console.log(quizz);
	checkInformation(quizz);
}


// function saveUserQuizz(id, myQuizz) {
// 	userQuizz = JSON.stringify(myQuizz)
// 	localStorage.setItem(id.toString(), userQuizz)
// }
//localStorage.setItem("nome", "Lucax");
