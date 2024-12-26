
const board = document.querySelector('.board');
const movesCounter = document.querySelector('.moves-counter');
let playerMoves = 25; 
let sessionMoves = 25; 
movesCounter.textContent = playerMoves;

const resetBtn = document.querySelector('#reset-btn');

// Cards Objects Array // 
const getData = () => [
    
        { imgSrc: "./media/jimi.jpg", name: "jimi"},
        { imgSrc: "./media/led-zep.jpg", name: "zep"},
        { imgSrc: "./media/ozzy.jpg", name: "ozzy"},
        { imgSrc: "./media/parov.jpg", name: "parov"},
        { imgSrc: "./media/pink-floyd.jpg", name: "pink"},
        { imgSrc: "./media/rory.jpg", name: "rory"},
        { imgSrc: "./media/sabbath.jpg", name: "sabbath"},
        { imgSrc: "./media/thin-lizzy.webp", name: "lizzy"},
];


// Randomize // 
const randomize = () => {
    const cardData = getData();
    const cardData2 = getData();

    deck = cardData.concat(cardData2);

    deck.sort(() => Math.random() - 0.5);
    
    return deck; 
};

// Generate Cards // 
const generateCards = () => {
    const deck = randomize();

    deck.forEach((item) => {
        const card = document.createElement("div");
        const face = document.createElement("img");
        const back = document.createElement("div");

        card.classList = "card";
        face.classList = "face";
        back.classList = "back";
        
        face.src = item.imgSrc;
        card.setAttribute("name", item.name);
        
        card.addEventListener('click', (e) => {
            card.classList.toggle('toggleCard');
            checkCards(e);
        });

        card.appendChild(face);
        card.appendChild(back);
        board.appendChild(card);
    });
};

// Check Card // 
const checkCards = (e) =>{
    const clickedCard = e.target;
    clickedCard.classList.add("flipped");
    
    const deck = document.querySelectorAll('.cards');

    const flippedCards = document.querySelectorAll('.flipped');
    
    clickedCard.style.pointerEvents = "none";

    if(flippedCards.length == 2 && clickedCard != flippedCards)
    {
        board.style.pointerEvents = "none";

        if(flippedCards[0].getAttribute("name") == flippedCards[1].getAttribute("name"))
        {
            console.log("Matched");
            
            flippedCards.forEach(card => {
                console.log(card);
                
                card.classList.remove('flipped');
                card.style.pointerEvents = "none";
                card.firstChild.style.transform = "rotateY(-180deg)";
            });

            setTimeout(() => board.style.pointerEvents = "all", 1000);
        }
        else
        {
            playerMoves--;
            flippedCards.forEach((card) => {
                card.classList.remove('flipped');
                setTimeout(() => card.style.pointerEvents = "all", 1000);
                setTimeout(() => card.classList.remove('toggleCard'), 1000);
            });

            setTimeout(() => board.style.pointerEvents = "all", 1000);

        }
        movesCounter.textContent = playerMoves;
        
        const toggledCards = document.querySelectorAll('.toggleCard')
        if(toggledCards.length === 16)
        {
            restart("Excellent Job, You've beat the game! \n Try to beat the game with 2 moves less than your last run.", true);
        }

        if(playerMoves === 0)
        {
            restart("Try Again!", false);
        }

        
    };
};

generateCards();

const restart = (text, lastGame) => {
    let cardData = randomize();
    let cardData2 = randomize();
    let cardsData = cardData.concat(cardData2);

    let faces = document.querySelectorAll('.face');
    let cards = document.querySelectorAll('.card');
    
    board.style.pointerEvents = "none";


    cards.forEach((item,index) => {
        item.classList.remove('toggleCard');
        item.classList.remove('flippedCards');
        
        setTimeout(() => {
            
            /* faces[index].src = cardsData[index].imgSrc;
            item.setAttribute("name", cardsData[index].name);  */

            while(board.firstChild)
            {
                board.removeChild(board.firstChild);
            }
            generateCards();
            item.style.pointerEvents = "all";
            board.style.pointerEvents = "all";
        }, 1000);
        
    });


    if (lastGame)
    {
        sessionMoves -= 2; 
        playerMoves = sessionMoves; 
    }
    else if (sessionMoves < 6)
    {
        window.alert("Ultimate Trophy Achieved !");
        sessionMoves = 20;
        playerMoves = 20;
    }
    else
    {
        sessionMoves = 25;
        playerMoves = 25;
    }

    
    movesCounter.textContent = playerMoves;
    setTimeout(() => window.alert((text), 100))
}


resetBtn.addEventListener('click', e => {
    restart("New Game Launched");
});