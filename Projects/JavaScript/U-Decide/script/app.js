const display = document.querySelector('#display');
const query = document.getElementById("inputCity");
const button = document.querySelector("button");
const resetBtn = document.querySelector("#resetBtn");
const decideBtn = document.querySelector('#decideBtn');
const errorMessage = document.getElementById("errorMessage");

const options = [];

function addOption(option){
    if(!option.trim()) return;

    const optionDiv = document.createElement('div');
    const btnsDiv = document.createElement('div');
    const optionEdit = document.createElement('button');
    const optionDelete = document.createElement('button');
    const optionP = document.createElement('p');
    const optionVotes = document.createElement('span');

    optionEdit.innerText = "Edit";
    optionDelete.innerText = "Delete";

    optionDiv.classList = 'option-div';
    btnsDiv.classList = 'btns-div';

    optionP.innerText = `${options.length +1}: ${option}`;
    optionVotes.innerText = `Votes: 0`;
    optionVotes.classList = "vote-count";

    btnsDiv.appendChild(optionEdit);
    btnsDiv.appendChild(optionDelete);

    optionDiv.appendChild(optionP);
    optionDiv.appendChild(optionVotes);
    optionDiv.appendChild(btnsDiv);  

    const optionObj = {
        optionContent: optionP,
        votesContent: optionVotes,
        container: optionDiv,
        votes: 0
    };

    options.push(optionObj);
    display.appendChild(optionDiv);

    optionDelete.addEventListener('click', () => {
        display.removeChild(optionDiv);
        const index = options.indexOf(optionObj);
        options.splice(index, 1);
    });

    optionEdit.addEventListener('click', () => {
        const newOptionVal = prompt("Edit Option: ", optionP.innerText);
        if(newOptionVal !== null && newOptionVal.trim() !== ""){
            optionP.innerText = newOptionVal;
        }
    });
};

function makeDecision(){
    if(options.length > 0){
    options.forEach((op) => {
        op.optionContent.style.backgroundColor = "transparent";
    });

    const decision = Math.floor(Math.random() * options.length);
    const selected = options[decision];

    selected.optionContent.style.backgroundColor = "rgb(6, 216, 6)";

    selected.votes++;
    selected.votesContent.innerText = `Votes: ${selected.votes}`;

    } else {
        alert("Please enter options");
    };
};

button.addEventListener("click", (e) => {
    e.preventDefault();
    addOption(query.value);
    query.value = "";
});

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    options.length = 0;
    display.innerHTML = "";
});

decideBtn.addEventListener('click', (e) => {
    e.preventDefault();
    makeDecision();
});
