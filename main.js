let get_card_class = document.getElementsByClassName('card'); //collect all parent card class divs which will hold our card front and back
let card_class_mixer=[]; //puts the 18 classes into an array
let random_class=[];     //18 classes and randomly returned
let first_card_clicked  = null;
let second_card_clicked=null;
const total_possible_matches = 1;
let match_counter=0;
let attempts=0;
let accuracy=0;
let games_played=0;

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
    document.getElementsByClassName('radar')[0].addEventListener('mouseover',bounceHint);
    document.getElementsByClassName("radar")[0].addEventListener("click", giveHints);
    games_played=1;
}
//Take the node list of classes, push them into a new array randomly and then assign each a child with css prop attached
function createAddRandomDivs(){
    for (var j=0; j<get_card_class.length;j++){
        var temp=get_card_class[j];
        card_class_mixer.push(temp);
    }

    //basically all cards go ina  bag, randomly assign a cards to a new array, out of order, and then below the out of order cards get childrenNodes attached
    for (var d=0;d<card_class_mixer.length;){
        var x = Math.floor(Math.random()*card_class_mixer.length);
        random_class.push(card_class_mixer[x]);
        card_class_mixer.splice(x,1);
    }
    for (var i=0;i<random_class.length;i++){ //two loops length/2
        if (i<9){
            var front_div=document.createElement("DIV");
            front_div.className="front";
            front_div.style.backgroundImage = "url('image/card_"+i+".png')";
            var back_div = document.createElement("DIV");
            back_div.className="back";
            back_div.style.backgroundImage = "url('image/card_back.jpg')";
            random_class[i].appendChild(front_div);
            random_class[i].appendChild(back_div);
        } else {
            var z = i - 9;
            var front_div=document.createElement("DIV");
            front_div.className='front';
            front_div.style.backgroundImage="url('image/card_"+z+".png')";
            var back_div = document.createElement("DIV");
            back_div.className="back";
            back_div.style.backgroundImage = "url('image/card_back.jpg')";
            random_class[i].appendChild(front_div);
            random_class[i].appendChild(back_div);
        }
    }
};
//Once you start clicking the board, the display stats should occur automatically
function handleClick(){
    cardClick(event);
    displayStats();
}
//grabs value of current stat and places the html inside the corresponding variable, occurs with each click
function displayStats(){
    var element = document.querySelector(".attempts .value");
    element.innerText=attempts;
    var accurate = document.querySelector(".accuracy .value");
    accurate.innerHTML=Math.round(accuracy*100)+"%";
    var played = document.querySelector(".games-played .value");
    played.innerHTML=games_played;
};


//Do this for each click
function cardClick(e){
    console.log('card',e);
    console.log('is this same as get el by id',e.target);
    flipCard(e);

    if (first_card_clicked===null){
        first_card_clicked = e.target;
    } else{
        second_card_clicked = e.target;
        attempts+=1;
        accuracy =match_counter/attempts;
        var first_card = first_card_clicked.parentNode.childNodes[0].style.backgroundImage;
        var second_card = second_card_clicked.parentNode.childNodes[0].style.backgroundImage;
        if (first_card===second_card){
            match_counter++;
            accuracy = match_counter/attempts;
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches){
                gameOutcome("Congrats Z Warrior, You Win!");
                let winLose = document.getElementById("winOrLose");
                winLose.style.display="block";
                // winLose.className+=" show";
                winLose.style.backgroundColor="rgba(0,0,0,0.4)";
            }
        } else {
            Array.from(document.getElementsByClassName("back")).forEach(function(cardBack){
                cardBack.removeEventListener("click",handleClick);
            });
            let resetBtn=document.getElementById("reset");
            resetBtn.disabled = true;
            setTimeout(function(){
                first_card_clicked.classList.remove("rotateOut","flipped");
                second_card_clicked.classList.remove("rotateOut","flipped");


                first_card_clicked.classList.add("rotateIn");
                second_card_clicked.classList.add("rotateIn");

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
    console.log('flip called',back);
    back.target.className+=" animated rotateOut";
    back.target.addEventListener("webkitAnimationStart",function(e){
        console.log('started event',e);
        // back.target.removeEventListener(back.type,handleClick);
        e.target.removeEventListener(e.type,arguments.callee);
    });
    back.target.addEventListener("webkitAnimationEnd",function(e){
        console.log('event over',e);
        //we dont want the animateend running every click, so we remove it when first invoked by target type and passing arguments of func
        back.target.removeEventListener(e.type,arguments.callee);
        back.target.classList.add("flipped");
        back.target.addEventListener(back.type,handleClick);
    });
}
//Reset the board
function resetStats(){
    first_card_clicked = null;
    second_card_clicked = null;
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
    games_played++;
    displayStats();
    card_class_mixer=[];
    random_class=[];
    removeOldDivs();
}
//things to happen for each game...reset stats (and board), apply dom elements, attach click
function resetGame(){
    resetStats();
    createAddRandomDivs();
    var z=document.getElementsByClassName('back');
    for(var i=0;i<z.length;i++){
        z[i].addEventListener('click',handleClick);
    }
}
/**
 *@name removeOldDivs
 * @description remove all children nodes of the parent while the loop remains true [deletes all card Front, then card Back]
 */
function removeOldDivs() {
    //remove all children from parent
    Array.from(document.getElementsByClassName("card")).forEach(function(parent){
        while(parent.firstChild){
            parent.removeChild(parent.firstChild);
        }
    });
}
// var startTime = Date.now();
// var interval = setInterval(function() {
//     var elapsedTime = Date.now() - startTime;
//     document.getElementById("timer").innerHTML = (elapsedTime / 1000).toFixed(2);
// }, 100);
//
// timeDifference();
function changePortrait(){
    var _div1 = document.createElement('DIV');
    _div1.id = 'alertBox';
    _div1.className="modal fade in";
    _div1.setAttribute("role","dialog");
    // _div1.style.display="none";

    var _div2 = document.createElement("DIV");
    _div2.className="modal-dialog";
    _div1.appendChild(_div2);

    var _div3 = document.createElement("DIV");
    _div3.className = "modal-content checkRes";
    _div2.appendChild(_div3);

    var _div4 = document.createElement("DIV");
    _div4.className ="modal-body";
    var _p=document.createElement("P");
    _p.className="sizeP";
    _p.innerHTML="This game is best played on larger screen resolutions.  Please change your phone's orientation to landscape before playing DBZ Memory Match.";
    _div3.appendChild(_div4.appendChild(_p));

    document.getElementsByTagName("body")[0].appendChild(_div1);
    // document.getElementById("alertBox").
    // document.getElementById("alertBox").setAttribute("rel","modal:open");
}
//Modal for Win or Lose, with a button that resets the game to play again
function gameOutcome(str){
    // var _divA =document.createElement('DIV');
    // _divA.className="winModal";
    // _divA.id="winOrLose";
    // _divA.setAttribute("role","dialog");
    //
    // var _divB=document.createElement("DIV");
    // _divB.className="modal-content";
    // var _divC1 = document.createElement("DIV");
    // _divC1.className="modal-header c";
    // var _h2 = document.createElement("h2");
    // _h2.innerText="DBZ";
    // _divC1.appendChild(_h2);
    // var _divC2 = document.createElement("DIV");
    // _divC2.className="modal-body c";
    // var _p = document.createElement("P");
    // _p.innerText= str;
    // _divC2.appendChild(_p);
    // var _divC3 = document.createElement("DIV");
    // _divC3.className="modal-footer c";
    // var _button = document.createElement("BUTTON");
    // _button.className="btn btn-primary reset";
    // _button.setAttribute("value","Play Again");
    // _divC3.appendChild(_button);
    //
    // _divB.appendChild(_divC1);
    // _divB.appendChild(_divC2);
    // _divB.appendChild(_divC3);
    // _divA.appendChild(_divB);
    // document.getElementsByTagName("body")[0].appendChild(_divA);
    // var cDivs = document.getElementsByClassName("c");
    // var fragment = document.createDocumentFragment();
    // for (var j=0;j<cDivs.length;j++){
    //     fragment.appendChild(cDivs[j]);
    // }
    // _divA.appendChild(_divB.appendChild(fragment));
    // document.getElementsByTagName("body")[0].appendChild(_divA);
    // document.getElementsByTagName("body")[0].appendChild(_divA.appendChild(_divB.appendChild(_divC1).appendChild(_divC2).appendChild(_divC3)));
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
    modalTitle.innerText="Enter Info Below";

    let button = document.createElement("button");
    button.className="close";
    button.setAttribute("data-dismiss","modal");
    button.setAttribute("aria-label","Close");
    button.addEventListener("click",function(){
        modalFade.classList.remove("show");
        modalFade.style.display="none";
    });

    let spanClose = document.createElement("span");
    spanClose.setAttribute("aria-hidden","true");
    spanClose.innerHTML="&times;";

    let modalBody = document.createElement("div");
    modalBody.className="modal-body";

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
    });
    //make this cool using a fragment later on
    modalFooter.appendChild(btnSubmit);
    modalFooter.appendChild(btnCancel);
    modalBody.appendChild(_p);
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
//bouncy time...check for mobile at the end
function bounceHint(e){
    console.log('moused over me',e);
    e.target.classList.add("animated","bounce");
    e.target.addEventListener("webkitAnimationEnd",function(){
        e.target.classList.remove("animated","bounce");
    });
}

function giveHints(){
    console.log('am clicked, here is a clue, git gud');
}