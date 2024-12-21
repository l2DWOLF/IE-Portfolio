const progressBar = document.querySelector(".progress-bar");
const progressText = document.querySelector(".progress-text");

const progress = (value) => {
    const percentage = (value / time) * 100;
    progressBar.style.width = `${percentage}%`;
    progressText.innerHTML = `${value}`;
}

const startBtn = document.querySelector(".start-btn");
const submitBtn = document.querySelector(".submit-btn");
const nextBtn = document.querySelector(".next-btn");
const restartBtn = document.querySelector(".restart-btn");

const numQuestions = document.querySelector("#num-questions");
const category = document.querySelector("#category");
const difficulty = document.querySelector("#difficulty");
const timePerQuestion = document.querySelector("#qtime");
const quiz = document.querySelector(".quiz-screen");
const endScreen = document.querySelector(".end-screen");
const startScreen = document.querySelector(".settings");
const questionNum = document.querySelector(".number");

let questions = [];
let score = 0;
let currentQuestion = NaN;
let time = 30;
let timer;


const startQuiz = async () => {
    const num = numQuestions.value;
    cat = category.value;
    diff = difficulty.value;
    startBtn.disabled = true;

    //api url; 
    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
    
    await fetch(url).then((res) => res.json())
        .then((data) =>
        {
            questions = data.results;
            setTimeout(() => {
                startScreen.classList.add("hide");
                quiz.classList.remove("hide");
                currentQuestion = 1;
                showQuestion(questions[0]);
            }, 1000);
        })
        .catch((e) => {console.log( e);
        });
};
startBtn.addEventListener('click', startQuiz);


const showQuestion = (question) => {
    const questionText = document.querySelector(".question");
    const answersWrapper = document.querySelector(".answer-wrapper");
    

    time = timePerQuestion.value;
    startTimer(time);

    if (question)
    questionText.innerHTML = question.question;
    else
    {
        questionNum.innerHTML = "This Category or Category difficulty doesn't have the requested amount of questions. \n \n Please Restart and choose a lower questions amount for this Category or Category Difficulty :)";
        
        answersWrapper.appendChild(restartBtn);
        answersWrapper.removeChild(submitBtn);
        return;
    }
    
    const answers = [...question.incorrect_answers, 
                        question.correct_answer,     
                    ]; 

    answers.sort(() => Math.random() - 0.5);
    answersWrapper.innerHTML = "";
    
    answers.forEach((answer) => {
        
        if(answer == question.correct_answer)
        {
            console.log("Inside Creation: " + answer);
            answersWrapper.innerHTML += `
            <div class="answer correctA">
                <p>
                
                <p class="a-text-field">
                <span class="text">${answer}</span>
                <p>

                <span class="checkbox">
                    <span class="icon"></span>
                </span>
                </p>
            </div>
            `;
        }
        else
        {
        answersWrapper.innerHTML += `
            <div class="answer">
                <p>

                <p class="a-text-field">
                <span class="text">${answer}</span>
                <p>

                <span class="checkbox">
                    <span class="icon"></span>
                </span>
                </p>
            </div>
            `;
        }
    });

    questionNum.innerHTML = `
        Question <span class="current">${questions.indexOf(question) + 1}</span>
                <span class="total"/>/ ${questions.length}</span>
    `;

    const answersDiv = document.querySelectorAll(".answer");

    answersDiv.forEach((answer) => {
        answer.addEventListener('click', () => {
            if (!answer.classList.contains("check"))
            {
                answersDiv.forEach((answer) => {
                    answer.classList.remove("selected");
                });

                answer.classList.add("selected");
                submitBtn.disabled = false;
            }
        });
    });
// End Show Questions //      
};


const startTimer = (time) => {
    timer = setInterval(() => {
        if (time >= 0)
        {
            progress(time);
            time--;
        }
        else
        {
            checkAnswer();
        }
    }, 1000);
};

submitBtn.addEventListener('click', () => {
    checkAnswer();
});

const checkAnswer = () => {
    const selectedAnswer = document.querySelector(".answer.selected");
    const correctAnswer = document.querySelector(".correctA");
    clearInterval(timer);
    
    if (selectedAnswer)
    {
        if (selectedAnswer.classList.contains("correctA"))
        {
            score++;
            selectedAnswer.classList.add("correct");
        }
        else
        {
            if(selectedAnswer)
            selectedAnswer.classList.add("wrong");
            correctAnswer.classList.add("correct");
        }
    }
    else
    {
        correctAnswer.classList.add("correct");
        questionNum.innerText += "\n Time Out! No Score Accumulated..";
    }

    const answerDiv = document.querySelectorAll(".answer");
    answerDiv.forEach((answer) => {
        answer.classList.add("checked");
    });

    submitBtn.style.display = "none";
    submitBtn.disabled = true;
    nextBtn.style.display = "block";
};


nextBtn.addEventListener('click', () => {
    nextQuestion();
    submitBtn.style.display = "block";
    nextBtn.style.display = "none";
});

const nextQuestion = () => {
    if(currentQuestion < questions.length)
    {   
        clearInterval(timer);
        currentQuestion++;
        showQuestion(questions[currentQuestion - 1]);
    }
    else
    {
        showScore();
    }
};

const finalScore = document.querySelector(".final-score");
const totalScore = document.querySelector(".total-score");

const showScore = () => {
    endScreen.classList.remove("hide");
    quiz.classList.add("hide");
    finalScore.innerHTML = score;
    totalScore.innerHTML = `/ ${questions.length}`;
};

restartBtn.addEventListener('click', () => {
    window.location.reload();
});