import {initForm} from './forms/formHandler.js'


document.addEventListener('DOMContentLoaded', () => {

    initForm();
});



const stickyTitle = document.querySelector('.sticky-title');
const allProjectsBtn = document.querySelector('#AP');
const beBtn = document.querySelector('#BE');
const rpBtn = document.querySelector('#RP');
const jsBtn = document.querySelector('#JSP');
const lpBtn = document.querySelector('#LPP');
const pyBtn = document.querySelector('#PYP');

let allCards = document.querySelectorAll('.cards-box');
let backendCards = document.querySelectorAll('.be-card');
let reactCards = document.querySelectorAll('.rp-card');
let jsCards = document.querySelectorAll('.js-card');
let lpCards = document.querySelectorAll('.lp-card');
let pythonCards = document.querySelectorAll('.py-card');

let cardTypes = {
    backend: backendCards,
    react: reactCards,
    js: jsCards,
    landing: lpCards,
    python: pythonCards,
    all: allCards
};

const projectsTop = document.querySelector('.projects-section');

function filterDisplay(type) {
    if (type !== "all") {
        Object.values(cardTypes).forEach((cards) => {
            cards.forEach((card) => {
                card.style.display = "none";
            });
        });
    };

    if (cardTypes[type]) {
        cardTypes[type].forEach((card) => {
            card.style.display = "flex";
        });
    }
    projectsTop.scrollIntoView({ behavior: "smooth" });
};

beBtn.addEventListener('click', () => {
    filterDisplay("backend");
});
rpBtn.addEventListener('click', () => {
    filterDisplay("react");
});
jsBtn.addEventListener('click', () => {
    filterDisplay("js");
});
lpBtn.addEventListener('click', () => {
    filterDisplay("landing");
});
pyBtn.addEventListener('click', () => {
    filterDisplay("python");
});
allProjectsBtn.addEventListener('click', () => {
    filterDisplay("all");
});

// Mobile Scroll Animation // 
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.cards-box');
    const projectsSection = document.querySelector('.projects-section');
    const offset = 300;

    function onScroll() {
        const sectionTop = projectsSection.getBoundingClientRect().top;
        const sectionBottom = projectsSection.getBoundingClientRect().bottom;

        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            const cardBottom = card.getBoundingClientRect().bottom;
            if (cardTop < window.innerHeight - offset && cardBottom > 400) {
                card.classList.add('visible');
            } else {
                card.classList.remove('visible');
            }
        });
    };
    window.addEventListener('scroll', onScroll);
    onScroll();
});
// Projects Counter // 
const proCount = document.createElement('p');
proCount.innerText = `(${allCards.length})`
proCount.style = "color:white; font-size: .7rem; position:absolute; top: 25%; right: 25px;";
stickyTitle.insertBefore(proCount, stickyTitle.children[1]);

const linesContainer = document.querySelector(".deco-lines");
const totalLines = 5;
for(let i = 0; i < totalLines; i++){
    const line = document.createElement('div');
    line.className = "deco-line";

    line.style.padding = `${(i * 1)}px`

    line.style.animationDelay = `${(i) * 0.2}s`;

    linesContainer.appendChild(line);
};