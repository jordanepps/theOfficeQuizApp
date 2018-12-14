let currentQuestion = 0,
	currentScore = { correct: 0, incorrect: 0 };

function startQuiz() {
	//Listen for button click to start quiz

	$('#js-start-section').on('click', '.js-start-button', e => {
		//show score and question number info
		$('#js-question-info').show();
		//Hide start section from view
		$('#js-start-section').hide();
		//increment current question;
		handleCurrentQuestionNumber();
		//load questions to question section
		$('#js-questions').html($(loadQuestion(currentQuestion)));
	});
}

function handleCurrentQuestionNumber() {
	currentQuestion++;
}

function loadQuestion(questionNumber) {
	//get access to question data
	const questionData = STORE[questionNumber - 1];
	let answers = ``;
	$('#js-current-question').html(questionNumber);
	//loop through each question option and save info to proper input tag
	questionData.answers.forEach(answer => {
		//concat strings to answers
		answers += `<input type="radio" name="user-answer" value="${answer}">
					<label for="${answer}">${answer}</label>`;
	});
	//return from with specific question/answer data
	return `<h2 class="js-question">${questionData.question}</h2>
	<form class="js-question-form">
		<fieldset>
		${answers}
		</fieldset>
		<button type="submit">Sumbit</button>
	</form>`;
}

function handleSumbitAnswer() {
	//Add event listener to submit button
	$('#js-questions').on('submit', '.js-question-form', e => {
		e.preventDefault();
		//Get the user answer value and compare to correct value
		const userAnswer = $('input[name="user-answer"]:checked').val();
		const correctAnswer = STORE[currentQuestion - 1].correctAnswer;
		userAnswer === STORE[currentQuestion - 1].correctAnswer
			? handleCorrectAnswer()
			: handleWrongAnswer(correctAnswer);
	});

	//show user if answer is correct or not
}

function handleCorrectAnswer() {
	//Change score value
	handleCorrectScore();
	//Let user know their answer is correct
	//Add button to be able to skip to the next question
	$('#js-questions').html(`<h2>That is correct!</h2>
	<button class="js-next-question">Next</button>`);
	nextQuestion();
}

function handleWrongAnswer(answer) {
	//Change score value
	handleIncorrectScore();
	//Let user know their answer is correct
	//Add button to be able to skip to the next question
	$('#js-questions').html(`<h2>Sorry, the correct answer was ${answer}</h2>
	<button class="js-next-question">Next</button>`);
	nextQuestion();
}

function handleCorrectScore() {
	//Add a point to the correct score
	currentScore.correct++;
	//Save and show value on the DOM
	$('#js-correct-answers').html(currentScore.correct);
}

function handleIncorrectScore() {
	//Add a point to the incorrect score
	currentScore.incorrect++;
	//Save and show value on the DOM
	$('#js-incorrect-answers').html(currentScore.incorrect);
}

function nextQuestion() {
	$('.js-next-question').on('click', e => {
		console.log('next question');
		//Add to current question count
		if (currentQuestion === 10) {
			loadResults();
		} else {
			handleCurrentQuestionNumber();
			// load the next question or the results page if there are no more
			$('#js-questions').html($(loadQuestion(currentQuestion)));
		}
	});
}

function loadResults() {
	console.log('done');
	// $('#js-questions')
	let resultText;
	//Save result text based on how high user scored
	switch (currentScore.correct) {
		case 0:
		case 1:
		case 2:
		case 3:
		case 4:
		case 5:
			resultText = 'Rewatch some episodes and try again';
			break;
		case 6:
		case 7:
		case 8:
		case 9:
			resultText = 'You really know the show! Feel free to try again!';
			break;
		default:
			resultText = 'Wow! a perfect score!';
	}
	//Add result text and try again button to the DOM
	$('#js-questions').html(`<h2>${resultText}</h2>
	<button class="js-retake-quiz">Try Again</button>`);
	//Resets quiz if user clicks try again
	resetQuiz();
}

function resetScores() {
	//reset all values to 0
	currentQuestion = currentScore.correct = currentScore.incorrect = 0;
	//Change scores on the DOM back to 0;
	$('#js-correct-answers').html(currentScore.correct);
	$('#js-incorrect-answers').html(currentScore.incorrect);
}

function resetQuiz() {
	$('.js-retake-quiz').on('click', e => {
		console.log('clicked');
		//reset question and score values;
		resetScores();
		//Add to question number so it starts at 1
		handleCurrentQuestionNumber();
		$('#js-questions').html($(loadQuestion(currentQuestion)));
	});
}

function loadQuizApp() {
	startQuiz();
	handleSumbitAnswer();
}

$(loadQuizApp);
