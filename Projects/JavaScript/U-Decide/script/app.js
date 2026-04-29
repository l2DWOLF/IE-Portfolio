const display = document.querySelector('#display');
const query = document.getElementById("inputCity");
const addBtn = document.querySelector("#addBtn");
const resetBtn = document.querySelector("#resetBtn");
const decideBtn = document.querySelector('#decideBtn');
const x100Btn = document.querySelector('#x100Btn');
const autoBtn = document.querySelector('#autoBtn');
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
        id: options.length-1,
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
let autoVote = false;
function makeDecision(votesNum = 1){
    if(options.length < 1){
        alert("Please enter options");
        return;
    };
    
    const loop = setInterval(() => {
        options.forEach((op) => {
            op.optionContent.style.backgroundColor = "transparent";
        });

        for (let i = 0; i < votesNum; i++) {
            if(options.length < 1) {clearInterval(loop); return;};
            const decision = Math.floor(Math.random() * options.length);
            const selected = options[decision];
            selected.votes++;
            selected.votesContent.innerText = `Votes: ${selected.votes}`;
        }

        if (votesNum >= 1) {
            const lead = {
                id: 0,
                votes: 0
            };
            options.forEach((op, index) => {
                if (op.votes > lead.votes) {
                    lead.id = index;
                    lead.votes = op.votes;
                };
            });
            options[lead.id].optionContent.style.backgroundColor = "rgb(6, 216, 6)";
        };
        if(!autoVote) clearInterval(loop);
    }, 200);
};

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addOption(query.value);
    query.value = "";
});

resetBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const c = confirm("Are you sure you want to reset?");
    if(c){
        options.length = 0;
        display.innerHTML = "";
    };
});

decideBtn.addEventListener('click', (e) => {
    e.preventDefault();
    makeDecision();
});

x100Btn.addEventListener('click', (e) => {
    e.preventDefault();
    makeDecision(100);
});

autoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    if(!autoVote){
        autoVote = true;
        autoBtn.innerText = "Stop";
    } else {
        autoVote = false;
        autoBtn.innerText = "auto";
    };
});