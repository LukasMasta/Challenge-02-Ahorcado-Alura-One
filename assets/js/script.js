import validation from "../js/validation.js"

const intialButton=document.querySelector("#initial_button");
const restartGame=document.querySelector("#restart_game");
const exitGame=document.querySelector("#exit_game");
const addWordButton=document.querySelector("#add_word");
const keyboard=document.querySelectorAll("[data-key]");
const addWord=document.querySelector(".add_button");
const newWord=document.querySelector("[data-add]");
const currentDiv=document.querySelector("[data-container]");
const currentDivTwo=document.querySelector("[data-containerTwo]");
const wrongDiv=document.querySelector("[data-wrong]");
const stick=document.querySelector(".hanged");
const visibilityMain=document.querySelector(".initial_pag");
const visibilityGame=document.querySelector(".game");
const visibilityconteinerTwo=document.querySelector("#container");
const visibilityAddWord=document.querySelector(".input");
const visibilityGameButtons=document.querySelector(".game_buttons");
const visibilityKeyboard=document.querySelector(".keywords_container");
const imgBrackgound=document.querySelector("body");
const restLife=document.querySelector(".text_input");
const visibilityResult=document.querySelector(".result");
const resultButton=document.querySelector(".result_game");
const phrase=document.querySelector(".phrase");
const word = ["ELECTROENCEFALOGRAFISTA","CAJA","HELADERA","TEMPANO","MUSICA","EXTRACTO","ILUMINACION","AURICULARES","JAZZ","TRANSPARENTE","ESTADISTICAS","ARCHIVO","ELECTRODOMESTICO","BIOLUMINISCENCIA","OVOVIViPARO","IDIOSINCRASIA","ANARANJADA"];
const url=["'./assets/img/state1.png'","'./assets/img/state2.png'","'./assets/img/state3.png'","'./assets/img/state4.png'","'./assets/img/state5.png'","'./assets/img/state6.png'","'./assets/img/state7.png'","'./assets/img/state8.png'","'./assets/img/state9.png'"]
let newWordKeyboard=[];
let append;
let n;
let r=1;
let flag=0;
let wrongLetters=[];
let verificationCondition;
let count=0;
let gameloss=0;
let winner=0;
let stateAddWord=0;
let option=0;
let stop=0;

keyboard.forEach(key => key.addEventListener("click", () => start(key.textContent)));
keyboard.forEach(key => key.addEventListener("click", () => addForKeyboard(key.textContent)));

intialButton.addEventListener("click", function(){
    startGame();
    stateAddWord=1;
    option=0;
});
restartGame.addEventListener("click", function(){
    restart();
});
exitGame.addEventListener("click", function(){
    exit();
});
addWordButton.addEventListener("click", function(){
    visibilityAddWord.style.visibility="visible";
    visibilityKeyboard.style.visibility="visible";
});
addWord.addEventListener("click", function(){
    add();
});
resultButton.addEventListener("click", function(){
    visibilityResult.style.display="none";
});

document.addEventListener('keydown', (event) => {
    var keyValue = event.key;
    start(keyValue);
  }, false);

function start(keyValue){
    console.log("que esta pasando mijo");
    if(validation (keyValue,option)){
        keyValue=keyValue.toUpperCase();
        console.log(keyValue);
        if(stateAddWord==1){
        verification (keyValue);
        correctWord(keyValue,verificationCondition);
        loss();
        life();
        console.log("ingreso letras");  
        }
    } 
}  
function startGame(){
    visibilityMain.style.display="none";
    visibilityGame.style.display="initial";
    visibilityconteinerTwo.style.display="flex";
    visibilityconteinerTwo.style.visibility="collapse";
    visibilityAddWord.style.visibility="hidden";
    visibilityGameButtons.style.visibility="visible";
    imgBrackgound.style.backgroundImage="none";
    visibilityKeyboard.style.visibility="visible";
    n=radomWords(word);
    words_create(n);
    life();
}
function radomWords (word) {
    return Math.floor(Math.random()*word.length);   
}
function words_create(){ 
    for (const elem in word[n]){
        if (elem <=11){
            let newDiv=document.createElement("div");
            newDiv.setAttribute("data-words", elem );
            newDiv.classList.add("letter");
            currentDiv.appendChild(newDiv);
        }
        else{
            if(flag==0){
                if(word[n].length >= 12){
                    visibilityconteinerTwo.style.visibility="visible";
                }
                flag=1;
            }
            let newDiv=document.createElement("div");
            newDiv.setAttribute("data-words", elem );
            newDiv.classList.add("letter");
            currentDivTwo.appendChild(newDiv); 
        }
    }
}
function correctWord(keyValue,verificationCondition){
    if(stop==0){
        if(verificationCondition==0){
            const allWords=document.querySelectorAll("[data-words]");
            for (const elem in word[n]){
                if(word[n][elem]==keyValue){
                    allWords[elem].textContent=keyValue;
                    count=1;
                    winner++;
                }  
            }
            if(count==0){
                createWrongWord(keyValue);
                gameloss++;
                console.log(gameloss);
            }     
        }
        resultGame();
        count=0;
    }
}

function createWrongWord(key){
    let newDiv=document.createElement("div");
    newDiv.classList.add("wrongLetter");
    newDiv.textContent=key;
    wrongDiv.appendChild(newDiv);   
}

function verification (key){
    console.log(wrongLetters);
    console.log(key);
    let count;
    for (const elem in wrongLetters){
         if(wrongLetters[elem]==key){
            count=1;
            break;
        }
    }
    if(count==1){
        verificationCondition=1;
    }
    else{
        verificationCondition=0;
        wrongLetters.push(key);
    } 
}
function loss(){
    console.log(gameloss);
    if(r <= 8){
        if(gameloss==r){
            
            let img=url[r];
            console.log(img);
            stick.style.backgroundImage=`url(${img})`;
            r++;
        }
    }
    resultGame();
    
}
function life(){
    console.log(gameloss);
    restLife.value=8-gameloss;
}

function restart(){
    empyt();
    n=radomWords(word);
    words_create(n);
    life();
    stateAddWord=1;
    gameloss=0;
    r=0;
    loss();
}
function exit(){
    visibilityMain.style.display="initial";
    visibilityGame.style.display="none";
    visibilityGameButtons.style.visibility="collapse";
    imgBrackgound.style.backgroundImage="url('./assets/img/background.jpg')";
    visibilityKeyboard.style.visibility="collapse";
    empyt(); 
}
function empyt(){
    while (currentDiv.firstChild) {
        currentDiv.removeChild(currentDiv.firstChild);
    }
    if(word[n].length >= 12){
        while (currentDivTwo.firstChild) {
            currentDivTwo.removeChild(currentDivTwo.firstChild);
        }
    }
    while (wrongDiv.firstChild) {
        wrongDiv.removeChild(wrongDiv.firstChild);
    }
    winner=0;
    count=0;
    gameloss=0;
    flag=0;
    wrongLetters=[];
    verificationCondition;
    stateAddWord=0;
    newWord.value="";
    newWordKeyboard=[];
    stop=0;
}

function add(){
    console.log("parte add"+ newWord.value);
    if(newWord.value.length <= 23 && newWord.value.length >= 3){
        option=1;
        if(validation(newWord.value,option)){
            word.push(newWord.value.toUpperCase());
            console.log(word);
            newWord.value="";
            newWordKeyboard=[];
        }
        else{
            alert("Solo se permiten letras, No se aceptan acentos,espacios ni caracteres especiales!");
        }  
    }
    else{
        alert("Debes escribir una palabra dentro de los parametros establecidos");
    } 
}


function addForKeyboard(key){
    console.log("key"+key);
    let unicode='⌫';
    if(key==unicode){
        newWordKeyboard.pop(); 
    }
    else{
      newWordKeyboard.push(key);
    }
    append=newWordKeyboard.join('');
    newWord.value=append;
}
function resultGame(){
    console.log("errrorrr");
    console.log(gameloss);
    console.log(winner);
    if(gameloss==8){
        visibilityResult.style.display="initial";
        visibilityResult.style.backgroundImage="url('./assets/img/lost.png')";
        phrase.textContent="La palabra correcta era : "+word[n];
        stop=1;
    }
    if (winner==word[n].length){
        visibilityResult.style.display="initial";
        visibilityResult.style.backgroundImage="url('./assets/img/win.png')";
        phrase.textContent="Adivinaste correctamente : "+word[n];
        stop=1;
    }
}

