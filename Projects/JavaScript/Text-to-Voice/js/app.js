let speech = new SpeechSynthesisUtterance();
const API_KEY = "06d615ed78msh853be545a80cf30p1759f8jsn72d3e3ff0713"; // Security Issue => Encrypt
const URL = `https://famous-quotes4.p.rapidapi.com/random?category=all&count=1`;

let voices = [];

let textInput = document.querySelector("#text-input");
let voiceSelected = document.querySelector("select");
let speedSlider = document.querySelector(".speed");
let pitchSlider = document.querySelector(".pitch");
let submitBtn = document.querySelector("#submit-btn");
let quoteBtn = document.querySelector("#quote-btn");
let resetBtn = document.querySelector("#reset-btn");
let theAuthor = "";
let theQuote = "";
textInput.value = "Enter Text or Click Generate Quote..";
const synth = window.speechSynthesis;



async function getQuote() {

    await fetch(`${URL}`, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': `${API_KEY}`,
            'X-RapidAPI-Host': 'famous-quotes4.p.rapidapi.com',
        },
    })
        .then(response => response.json())
        .then(data => {
            theAuthor = data[0].author;
            theQuote = data[0].text;
            })
        .catch(err => console.error(err));
}

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    speech.voice = voices[0];

    console.log(voices);
    

    voices.forEach((voice, i) => {
        voiceSelected.options[i] = new Option(voice.name, i);
    });
};

textInput.addEventListener('click', () => {
    if (textInput.value === "Enter Text to Pronounce..")
        textInput.value = "";
    });

speedSlider.addEventListener("change", () => {
    
    speech.rate = speedSlider.value / 100; 
        console.log(speech.rate);
});
pitchSlider.addEventListener("change", () => {
    
    speech.pitch = pitchSlider.value / 100; 
        console.log(speech.pitch);
});



voiceSelected.addEventListener("change", () => {
    speech.voice = voices[voiceSelected.value];
});

submitBtn.addEventListener("click", (e) => {
    e.preventDefault();

    let test = synth.speaking;

    if (test == false)
    {
        speech.text = textInput.value;
        window.speechSynthesis.speak(speech);
    }
    else
    {
        synth.cancel();
    }
});

resetBtn.addEventListener('click', () => {
    textInput.value = "Enter Text to Pronounce..";
    speech.rate = 1;
    speech.pitch = 1;
    speedSlider.value = 100;
    pitchSlider.value = 100;
    synth.cancel();
});


quoteBtn.addEventListener('click', () => {
    getQuote();
    textInput.value = `"..${theQuote}..."`;
    textInput.value += ` \n \nAuthor: "${theAuthor} " `;
    
});




