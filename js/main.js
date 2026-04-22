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
// Deco Lines // 
const linesContainer = document.querySelector(".deco-lines");
function generateSquare(totalLines){
    for (let i = 0; i < totalLines; i++) {
        setTimeout(() => {
            const line = document.createElement('div');
            line.className = "deco-line";

            line.style.padding = `${(i * 1)}px`

            line.style.animationDelay = `${(i) * 0.2}s`;
            linesContainer.appendChild(line);
        }, 0);
        
    };
};
generateSquare(5);

// cards parrallax effect//
document.querySelectorAll('.cards-box').forEach(card => {
    const strength = 8; 

    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();

        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -strength;
        const rotateY = ((x - centerX) / centerX) * strength;

        card.style.transform = `
            perspective(1200px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            translateY(-4px)
        `;
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = `
            perspective(1200px)
            rotateX(0deg)
            rotateY(0deg)
            translateY(0px)
        `;
    });
});

// Typing Animation //
const commands = [
    "Full-Stack Developer",
    "Real Estate Veteran",
    "Musician",
    "Team Player",
    "Good Hire :)"
];

const output = document.querySelector(".terminal-text");
const cursor = document.querySelector(".cursor");

let commandIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
    const current = commands[commandIndex];

    if(!isDeleting){
        output.textContent = current.substring(0, charIndex + 1);
        output.appendChild(cursor);
        charIndex++;

        if (charIndex === current.length){
            isDeleting = true;
            setTimeout(typeLoop, 1500);
            return;
        };

        setTimeout(typeLoop, 60 + Math.random() * 40);
    } else {
        output.textContent = current.substring(0, charIndex - 1);
        output.appendChild(cursor);
        charIndex--;

        if(charIndex === 0){
            isDeleting = false;
            commandIndex = (commandIndex + 1) % commands.length;
            setTimeout(typeLoop, 400);
            return;
        };
        setTimeout(typeLoop, 30);
    };
};
typeLoop();

// tech-stack animation // 
const lines = document.querySelectorAll(".tech-line");
const techSection = document.querySelector(".tech-stack");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {

        if(entry.isIntersecting){
            lines.forEach((line, i) => {
                setTimeout(() => {
                    line.classList.add("show");
                }, i * 240); 
            });
            observer.unobserve(techSection);
        };
    });
}, {
    root: null,
    threshold: 0,
    rootMargin: "-20% 0px -20% 0px"
});
observer.observe(techSection);

// Cards Appear Animation // 
const cards = document.querySelectorAll('.cards-box');

const cardsObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                cardsObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.1,
    }
);

cards.forEach((card) => cardsObserver.observe(card));