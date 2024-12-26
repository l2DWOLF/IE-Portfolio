



const operators = document.querySelector('#operators');
const variablesNum = document.querySelector('#variablesNum');
const limitRange = document.querySelector('#limit-range');
const limitCustom = document.querySelector('#custom-limit');

const gameSettings = document.querySelector('.game-settings');

const questionInfo = document.querySelector('.question-info');
const questionTitle = document.querySelector('.question-title');
const gameStats = document.querySelector('.game-stats');
const resultStats = document.querySelector('.result-stats');

const questionDisplay = document.querySelector('.question');
const formDisplay = document.querySelector('#form-display');
const userInput = document.querySelector('#text-input');
const submitBtn = document.querySelector('#submit-btn');
const nextBtn = document.querySelector('#next-btn');
const startBtn = document.querySelector('#start-btn');
const revealBtn = document.querySelector('#reveal-btn');
const settingsBtn = document.querySelector('#settings-btn');
const resetBtn = document.querySelector('#reset-btn');


let max = 50;
let qnum = 0;
let qsum = 0;
let varsNum = 2;
let operand = "add";

let playerTrues = 0;


function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
};

function getOperand()
{
    if (operators.value == "add")
    {
        operand = operators.value;
    }
    else if (operators.value == "substract")
    {
        operand = operators.value;
    }
    else if (operators.value == "multiply")
    {
        operand = operators.value;
    }
    else if (operators.value == "divide")
    {
        operand = operators.value;
    }
    
}

// Generate Question //
function generateQuestion()
{   qnum++;
    qsum = 0;
    userInput.disabled = false;
    userInput.style.cursor = "pointer";
    userInput.value = "";
    questionDisplay.innerHTML = "";
    
    let variables = [];


    for (let i = 0; i < varsNum; i++)
    {
        variables.push(randomNumber(1, max));
    }

    if (operand == "add") 
    {
        variables.forEach((vari, index) => {
            if (index == 0 || (index == variables.length && index > 1)) { questionDisplay.innerHTML += `${vari}`; }
            else { questionDisplay.innerHTML += ` + ${vari} `; }
        });

        qsum = eval(questionDisplay.innerText);
    }
    else if (operand == "substract") 
    {
        variables.forEach((vari, index) => {
            if (index == 0 || (index == variables.length && index > 1)) { questionDisplay.innerHTML += `${vari}`; }
            else { questionDisplay.innerHTML += ` - ${vari} `; }
        });
        qsum = eval(questionDisplay.innerText);
    }
    else if (operators.value == "multiply") 
    {
        variables.forEach((vari, index) => {
            if (index == 0 || (index == variables.length && index > 1)) { questionDisplay.innerHTML += `${vari}`; }
            else { questionDisplay.innerHTML += ` * ${vari} `; }
        });
        qsum = eval(questionDisplay.innerText);
    }
    else if (operators.value == "divide") 
    {
        variables.forEach((vari, index) => {
            if (index == 0 || (index == variables.length && index > 1)) { questionDisplay.innerHTML += `${vari}`; }
            else { questionDisplay.innerHTML += ` / ${Number(vari)} `; }
        });
        qsum = eval(questionDisplay.innerText);

            qsum = qsum.toFixed(1);

    }

    questionDisplay.innerHTML += ' = ?';
};
// Update Question //
function updateQuestion()
{   
    questionTitle.innerHTML = `Question #${qnum}:`;
    gameStats.innerHTML = `Correct Answers: ${playerTrues}`;
    resultStats.innerHTML = `Status: Waiting for Answer`;
    userInput.value = "";
};
// Check Answer //
function checkAnswer()
{
    if (userInput.value == qsum) 
    {   
        playerTrues++;
        gameStats.innerHTML = `Correct Answers: ${playerTrues}`;
        resultStats.innerText = "Status: Correct Answer!"
        nextBtn.style.display = "block";
        nextBtn.style.border = "1px solid green";
        userInput.style.backgroundColor = "green";
        userInput.style.color = "white";
        submitBtn.style.display = "none";
    }
    else {
        resultStats.innerText = `Status: Wrong Answer..`;
        revealBtn.style.display = "block";
    }
};
// Check Input // 
function checkInput()
{
    if (userInput.value == "") 
    {
        userInput.style.borderColor = "red";
        submitBtn.disabled = true;
        submitBtn.style.cursor = "not-allowed";
        submitBtn.style.backgroundColor = "transparent";
        return false;
    }
    else
    {return true;}
}


// Start Button // 
startBtn.addEventListener('click', (e) => {
    generateQuestion();
    updateQuestion();
    submitBtn.style.display = "block";
    settingsBtn.style.display = "block";
    resetBtn.style.display = "block";
    formDisplay.style.display = "flex";

    startBtn.style.display = "none";
    gameSettings.style.display = "none";
});
// Submit Button // 
submitBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if (checkInput() == true)
    {  
        checkAnswer();
    }
});
// Next Question Button // 
nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (checkInput() == true && userInput.value == qsum) {
        generateQuestion();
        updateQuestion();
        userInput.style.backgroundColor = "snow";
        userInput.style.color = "black";
        submitBtn.style.display = "block";
        revealBtn.style.display = "none";
        nextBtn.style.display = "none";
    }
});
// Reveal Button //
revealBtn.addEventListener('click', () => {
    resultStats.innerText = `Status: The Answer Is ${qsum}.`;
    userInput.value = qsum;
    submitBtn.style.display = "none";
    nextBtn.style.display = "block";
    userInput.disabled = true;
    userInput.style.cursor = "not-allowed";
});
// Settings Button // 
settingsBtn.addEventListener('click', () => {
    if (gameSettings.style.display == "none")
    {
        gameSettings.style.display = "flex";
    }
    else
    {
        gameSettings.style.display = "none";
    }
});
// Reset Button //
resetBtn.addEventListener('click', () => window.location.reload());

// Input Change Event // 
userInput.addEventListener('change', () => {
    submitBtn.disabled = false;
    submitBtn.style.cursor = "pointer";
    userInput.style.borderColor = "orange";
    submitBtn.style.backgroundColor = "#21022f25";
});
// Variables Selection Change // 
variablesNum.addEventListener('change', (e) => {
    varsNum = e.target.value;
});
// Operand Selection Change //
operators.addEventListener('change', (e) => {
    operand = e.target.value;
});
// Number Range Input Change // 
limitCustom.addEventListener('change', (e) => {
    max = e.target.value;
});
