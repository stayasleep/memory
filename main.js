let first_card_clicked  = null;
let second_card_clicked=null;
const total_possible_matches = 9;
let match_counter=0;
let attempts=0;
let accuracy=0;
let games_played=0;
let power = 0;

document.addEventListener("DOMContentLoaded",ready);

function ready(){
    initializeGame();
}
//Randomly generate the div position, attach click handlers and start game
function initializeGame() {
    createAddRandomDivs();
    changePortrait();
    Array.from(document.getElementsByClassName("back")).forEach(function(childBack){
        childBack.addEventListener("click",handleClick);
    });
    document.getElementById('reset').addEventListener('click',resetGame);
    document.getElementsByClassName('radar')[0].addEventListener('mouseover',bounceHint); //might be able to combine this and next into one helper func
    document.getElementsByClassName("radar")[0].addEventListener("click", giveHints);
    games_played=1;
}

/**
 * @description - creates a new Array from an Array-like object, in this the DOM node list
 * @return {Array} Returns an array of the card divs in a random order
 * */
function shuffleMyDivs(){
    let cardArray = Array.from(document.getElementsByClassName("card"));
    let cardArrayMutate = cardArray.slice(); //so we can mutate this one

    return cardArray.map(function(val,index){
        let randomNumber = Math.floor(Math.random()*cardArrayMutate.length);
        //now we should slice it out so we dont get a copy for next element in play
        let returnThis = cardArrayMutate[randomNumber];
        cardArrayMutate.splice(randomNumber,1);
        return returnThis;
    });
}
//Take the node list of classes, push them into a new array randomly and then assign each a child with css prop attached
function createAddRandomDivs(){
    let randomCardArray = shuffleMyDivs();

    for(var i=0;i<randomCardArray.length;i++){
        if (i<9){
            var front_div=document.createElement("DIV");
            front_div.className="front";
            front_div.style.backgroundImage = "url('image/card_"+i+".png')";
            var back_div = document.createElement("DIV");
            back_div.className="back";
            back_div.style.backgroundImage = "url('image/card_back.jpg')";
            randomCardArray[i].appendChild(front_div);
            randomCardArray[i].appendChild(back_div);
        } else {
            var z = i - 9;
            var front_div=document.createElement("DIV");
            front_div.className='front';
            front_div.style.backgroundImage="url('image/card_"+z+".png')";
            var back_div = document.createElement("DIV");
            back_div.className="back";
            back_div.style.backgroundImage = "url('image/card_back.jpg')";
            randomCardArray[i].appendChild(front_div);
            randomCardArray[i].appendChild(back_div);
        }
    }
}
//handlers for Back divs
function handleClick(){
    cardClick(event);
    displayStats();
}
//grabs value of current stat and places the html inside the corresponding variable, occurs with each click
function displayStats(){
    let element = document.querySelector(".attempts .value");
    element.innerText=attempts.toString();
    let accurate = document.querySelector(".accuracy .value");
    accurate.innerHTML=Math.round(accuracy*100)+"%";
    let played = document.querySelector(".games-played .value");
    played.innerHTML=games_played.toString();
    let powerLevel  = document.querySelector(".scouterText");
    power === 9000 ? power += 1 : power;
    powerLevel.innerHTML = power.toString();
}


//Do this for each click
/**
 * @name function cardClick
 * @Param {Object} e - takes in the event object of the div that was clicked
 * @description - handles the business logic for clicking cards by traversing the event target node and searching for the sibling element with character image in order to compare matches
 * */
function cardClick(e){
    flipCard(e);

    if (first_card_clicked===null){
        first_card_clicked = e.target;
    } else{
        second_card_clicked = e.target;
        attempts+=1;
        accuracy = match_counter/attempts;
        let first_card = first_card_clicked.parentNode.childNodes[0].style.backgroundImage;
        let second_card = second_card_clicked.parentNode.childNodes[0].style.backgroundImage;
        if (first_card === second_card){
            match_counter++;
            accuracy = match_counter/attempts;
            power += 1000;
            //temp
            first_card_clicked.classList.add("matched");
            second_card_clicked.classList.add("matched");
            //temp
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches){
                gameOutcome("You Win!");
                let winLose = document.getElementById("winOrLose");
                winLose.style.display="block";
                winLose.style.backgroundColor="rgba(0,0,0,0.4)";
            }
        } else {
            Array.from(document.getElementsByClassName("back")).forEach(function(cardBack){
                cardBack.removeEventListener("click",handleClick);
            });
            let resetBtn=document.getElementById("reset");
            resetBtn.disabled = true;
            setTimeout(function(){
                first_card_clicked.classList.remove("animated","rotateOut","flipped");
                second_card_clicked.classList.remove("animated","rotateOut","flipped");

                helperWithAnimation([first_card_clicked,second_card_clicked],"animated","rotateIn");

                first_card_clicked=null;
                second_card_clicked=null;
                resetBtn.disabled = false;
                Array.from(document.getElementsByClassName("back")).forEach(function(cardBack){
                    cardBack.addEventListener("click",handleClick);
                });
            }, 2000);
        }
    }
}

function flipCard(back){
    back.target.removeEventListener(back.type,handleClick);
    back.target.className+=" animated rotateOut";

    back.target.addEventListener("webkitAnimationStart",function(e){
        e.target.removeEventListener(e.type,arguments.callee);
    });
    back.target.addEventListener("webkitAnimationEnd",function(e){
        //we dont want the animateend running every click, so we remove it when first invoked by target type and passing arguments of func
        back.target.removeEventListener(e.type,arguments.callee);
        back.target.classList.add("flipped");
        back.target.addEventListener(back.type,handleClick); //so you dont double click before flipped shows up
    });
}

/**
 * @description reset the game stats, recreate randomzied divs, and attach their clickhandlers thereafter
 * */
function resetGame(){
    resetStats();
    createAddRandomDivs();
    Array.from(document.getElementsByClassName("back")).forEach(function(childBack){
        childBack.addEventListener("click",handleClick);
    });
}
/**
 * @description - what we would call the state of the game that needs to reset each time user plays a new game
 * */
function resetStats(){
    first_card_clicked = null;
    second_card_clicked = null;
    power = 0;
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
    games_played++;
    displayStats();
    removeOldDivs();
}
/**
 *@name removeOldDivs
 * @description remove all children nodes of the parent while the loop remains true [deletes all card Front, then card Back]
 */
function removeOldDivs() {
    Array.from(document.getElementsByClassName("card")).forEach(function(parent){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    });
    Array.from(document.getElementsByClassName("winModal")).forEach(function(parent){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
        parent.remove();
    });
}

function changePortrait(){
    let _div1 = document.createElement('DIV');
    _div1.id = 'alertBox';
    _div1.className="modal fade in";
    _div1.setAttribute("role","dialog");
    // _div1.style.display="none";

    let _div2 = document.createElement("DIV");
    _div2.className="modal-dialog";
    _div1.appendChild(_div2);

    let _div3 = document.createElement("DIV");
    _div3.className = "modal-content checkRes";
    _div2.appendChild(_div3);

    let _div4 = document.createElement("DIV");
    _div4.className ="modal-body";
    let _p=document.createElement("P");
    _p.className="sizeP";
    _p.innerHTML="This game is best played on larger screen resolutions.  Please change your phone's orientation to landscape before playing DBZ Memory Match.";
    _div3.appendChild(_div4.appendChild(_p));

    document.getElementsByTagName("body")[0].appendChild(_div1);
}
/**
 * @name function gameOutcome
 * @param {String} str - accepts a string as an argument for modal body message
 * @description - dynamically create a modal upon game outcome
 * */
function gameOutcome(str){
    let modalFade = document.createElement("div");
    modalFade.className="winModal modal";
    modalFade.id="winOrLose";
    modalFade.setAttribute("tabindex","-1");
    modalFade.style.display="none";

    let modalDialog = document.createElement("div");
    modalDialog.className="modal-dialog";
    modalDialog.setAttribute("role","document");

    let modalContent  = document.createElement("div");
    modalContent.className="modal-content";
    let modalHeader = document.createElement("div");
    modalHeader.className="modal-header";

    let modalTitle =document.createElement("h5");
    modalTitle.className="modal-title";
    modalTitle.innerText="Congrats Z Warrior";

    let button = document.createElement("button");
    button.className="close";
    button.setAttribute("data-dismiss","modal");
    button.setAttribute("aria-label","Close");
    button.addEventListener("click",function(){
        modalFade.classList.remove("show");
        modalFade.style.display="none";
        Array.from(document.getElementsByClassName("winModal")).forEach(function(parent){
            while(parent.firstChild){
                parent.removeChild(parent.firstChild);
            }
            parent.remove();
        });
    });

    let spanClose = document.createElement("span");
    spanClose.setAttribute("aria-hidden","true");
    spanClose.innerHTML="&times;";

    let modalBody = document.createElement("div");
    modalBody.className="modal-body";

    let vid = document.createElement("iframe");
    vid.className = "overNine";
    vid.setAttribute("height","315");
    vid.setAttribute("src","https://www.youtube.com/embed/SiMHTK15Pik?autoplay=1");
    vid.setAttribute("frameborder","1");
    vid.setAttribute("allowfullscreen","true");

    let _p = document.createElement("p");
    _p.className="pModal";
    _p.innerText=str;

    let modalFooter = document.createElement("div");
    modalFooter.className="modal-footer";

    let btnSubmit = document.createElement("button");
    btnSubmit.setAttribute("type","button");
    btnSubmit.className="playAgain btn btn-primary";
    btnSubmit.setAttribute("data-dismiss","modal");
    btnSubmit.innerHTML="Play Again";
    btnSubmit.addEventListener('click',function(){
        modalFade.classList.remove("show");
        modalFade.style.display="none";
        resetGame();
    });

    let btnCancel = document.createElement("button");
    btnCancel.setAttribute("type","button");
    btnCancel.className = "closeModal btn btn-secondary";
    btnCancel.setAttribute("data-dismiss","modal");
    btnCancel.innerText="Close";
    btnCancel.addEventListener("click",function(){
        modalFade.classList.remove("show");
        modalFade.style.display="none";
        Array.from(document.getElementsByClassName("winModal")).forEach(function(parent){
            while(parent.firstChild){
                parent.removeChild(parent.firstChild);
            }
            parent.remove();
        });
    });
    //make this cool using a fragment later on
    modalFooter.appendChild(btnSubmit);
    modalFooter.appendChild(btnCancel);
    modalBody.appendChild(_p);
    modalBody.appendChild(vid);
    button.appendChild(spanClose);
    modalHeader.appendChild(modalTitle);
    modalHeader.appendChild(button);
    modalContent.appendChild(modalHeader);
    modalContent.appendChild(modalBody);
    modalContent.appendChild(modalFooter);
    modalDialog.appendChild(modalContent);
    modalFade.appendChild(modalDialog);

    document.getElementsByTagName('body')[0].appendChild(modalFade);

}
/**
 * @name - function bounceHint
 * @param {Object} e - takes in the event object for the clicked radar
 * @description - targets the radar and attaches an event to remove animated css classes so it can continue bouncing on multiple clicks
 * */
function bounceHint(e){
    e.target.classList.add("animated","bounce");
    e.target.addEventListener("webkitAnimationEnd",function(){
        e.target.classList.remove("animated","bounce");
    });
}
/**
 * @description - give hint based on if there is "no cards clicked" or "one card clicked, find its pair" based
 * off of background image src
 *
 * */
function giveHints(){
    if(!first_card_clicked && !second_card_clicked){
        let avoidAlrdyMatched=Array.from(document.getElementsByClassName("back")).filter(function(owner,index){
            return !owner.classList.contains("matched");
        });
        let lengthIs = avoidAlrdyMatched.length-1; //get the length, use the last one to search for matches eh
        let matchThis = avoidAlrdyMatched[lengthIs].previousSibling.style.backgroundImage;
        avoidAlrdyMatched.some(function(sibling,index){
            if(sibling.previousSibling.style.backgroundImage===matchThis){
                let arr=[avoidAlrdyMatched[lengthIs],avoidAlrdyMatched[index]];
                helperWithAnimation(arr,"animated","tada");
            }
        });
    }else if(first_card_clicked && !second_card_clicked){
        let firstSibClick = first_card_clicked.previousSibling.style.backgroundImage;
        let matchThese=Array.from(document.getElementsByClassName("back")).filter(function(owner, index){
           return owner.previousSibling.style.backgroundImage === firstSibClick && !owner.classList.contains("flipped");
        });
        helperWithAnimation(matchThese,"animated","tada");
    }
}

/**
 * @description - add one time event listeners to an element
 * @param {Array} nodeArray - DOM element(s) to add one-time listener to
 * @param {String} cssClass - class name to to add to element for animation
 * @param {String} cssClass2 - class name to add to element for animation
 **/
function helperWithAnimation(nodeArray,cssClass,cssClass2){
    nodeArray.forEach(function(element,index){
        element.classList.add(cssClass,cssClass2);
        element.addEventListener("webkitAnimationEnd",function(e){
            element.removeEventListener(e.type,arguments.callee);
            element.classList.remove(cssClass,cssClass2);
        })
    });
}

