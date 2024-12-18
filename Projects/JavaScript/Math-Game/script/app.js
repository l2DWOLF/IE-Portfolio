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

let questions = [];
let score = 0;
let currentQuestion = NaN;
let time = 30;
let timer;



const startQuiz = () => {
    const num = numQuestions.value;
    cat = category.value;
    diff = difficulty.value;

    //api url; 
    const url = `https://opentdb.com/api.php?amount=${num}&category=${cat}&difficulty=${diff}&type=multiple`;
    
    fetch(url).then((res) => res.json())
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
};
startBtn.addEventListener('click', startQuiz);



const showQuestion = (question) => {
    const questionText = document.querySelector(".question");
    const answersWrapper = document.querySelector(".answer-wrapper");
    const questionNum = document.querySelector(".number");

    questionText.innerHTML = question.question;

    const answers = [...question.incorrect_answers, 
                        question.correct_answer.toString(),     
                    ]; 

    answers.sort(() => Math.random() - 0.5);
    answersWrapper.innerHTML = "";
    
    answers.forEach((answer) => {
        
        answersWrapper.innerHTML += `
            <div class="answer">
                <span class="text">${answer}</span>
                <span class="checkbox">
                    <span class="icon"></span>
                </span>
            </div>
        `;
    });

    questionNum.innerHTML = `
        Question <span class="current">${questions.indexOf(question) + 1}</span>
                <span class="total"/>/${questions.length}</span>
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

    time = timePerQuestion.value;
    startTimer(time);
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

function sanitizeString(str) {
    for (let i = 0; i < str.length; i++) 
    {
        if (str[i] != (/^[A-Za-z]+$/))
        {
            str[i] = "";
        }
    };
    return str.trim();
}

submitBtn.addEventListener('click', () => {
    checkAnswer();
});

const checkAnswer = () => {
    const selectedAnswer = document.querySelector(".answer.selected");
    clearInterval(timer);
    
    if (selectedAnswer)
    {
        let answer = selectedAnswer.innerText.toLowerCase();
        answer = sanitizeString(answer);
        console.log("ANS:: " + answer);
        
        let userAnswer = questions[currentQuestion -1].correct_answer.toLowerCase();
        userAnswer = sanitizeString(userAnswer);
        console.log("userANS:: " + userAnswer);
        

        if (answer == userAnswer)
        {
            score++;
            selectedAnswer.classList.add("correct");
        }
        else
        {
            selectedAnswer.classList.add("wrong");

            const correctAnswer = document.querySelectorAll(".answer").forEach((answer) => {
                if(answer.querySelector(".text").innerHTML === questions[currentQuestion -1].correct_answer)
                {
                    answer.classList.add("correct");
                }
            });
        }
    }

    else
    {
        const correctAnswer = document.querySelectorAll(".answer").forEach((answer) => {
            if(answer.querySelector(".text").innerHTML === questions[currentQuestion - 1].correct_answer)
                {
                    answer.classList.add("correct");
                } 
        });
    }

    const answerDiv = document.querySelectorAll(".answer");
    answerDiv.forEach((answer) => {
        answer.classList.add("checked");
    });

    submitBtn.style.display = "none";
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




