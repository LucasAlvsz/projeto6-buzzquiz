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
	if (window.confirm("Você realmente deseja excluir seu Quizz?")) {
		axios.delete(`https://mock-api.driven.com.br/api/v4/buzzquizz/quizzes/${quizzUserId.toString()}`,
			{ headers: { "Secret-Key": localStorage.getItem("k" + quizzUserId.toString()) } })
			.then(() => {
				window.location.reload()
				localStorage.removeItem(quizzUserId.toString());
				localStorage.removeItem("k" + quizzUserId.toString())
			})
			.catch(response => console.log(response))
	}
}
