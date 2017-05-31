var get_card_class = document.getElementsByClassName('card'); //collect all parent card class divs which will hold our card front and back
var card_class_mixer=[]; //puts the 18 classes into an array
var random_class=[];     //18 classes and randomly returned
var first_card_clicked  = null;
var second_card_clicked=null;
var total_possible_matches = 9;
var match_counter=0;
var attempts=0;
var accuracy=0;
var games_played=0;

document.addEventListener("DOMContentLoaded",ready);
function ready(){
    initializeGame();
}
//Randomly generate the div position, attach click handlers and display stats
function initializeGame() {
    createAddRandomDivs();
    changePortrait();
    var classname = document.getElementsByClassName('back');
    for (var i=0;i<classname.length;i++){
        classname[i].addEventListener('click',handleClick)
    };
    document.getElementById('reset').addEventListener('click',resetGame);
    games_played=1;
}
//Take the node list of classes, push them into a new array randomly and then assign each a child with css prop attached
function createAddRandomDivs(){
    for (var j=0; j<get_card_class.length;j++){
        var temp=get_card_class[j];
        card_class_mixer.push(temp);
    }
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
    cardClick(this);
    displayStats();
}
//grabs value of current stat and places the html inside the corresponding variable, occurs with each click
function displayStats(){
    var element = document.querySelector(".attempts .value");
    element.innerHTML=attempts;
    var accurate = document.querySelector(".accuracy .value");
    accurate.innerHTML=Math.round(accuracy*100)+"%";
    var played = document.querySelector(".games-played .value");
    played.innerHTML=games_played;
};

//Do this for each click
function cardClick(card_back){
    flipCard(card_back);
    if (first_card_clicked===null){
        first_card_clicked = card_back;
    } else{
        second_card_clicked = card_back;
        attempts+=1;
        accuracy =match_counter/attempts;
        var first_card = first_card_clicked.parentNode.childNodes[0].style.backgroundImage;
        var second_card = second_card_clicked.parentNode.childNodes[0].style.backgroundImage;
        if (first_card===second_card){
            match_counter++;
            accuracy = match_counter/attempts;
            //these arent being called
            // $(first_card_clicked).fadeOut();
            // $(second_card_clicked).fadeOut();
            //the arent being called end
            first_card_clicked = null;
            second_card_clicked = null;
            if (match_counter === total_possible_matches){
                alert("Congratulations! You Win!");
            }
        } else {
            var x=document.getElementsByClassName('back');
            for(var i=0;i<x.length;i++){
                x[i].removeEventListener('click',handleClick);
            }
            setTimeout(function(){
                first_card_clicked.classList.remove("flipped");
                second_card_clicked.classList.remove('flipped');
                first_card_clicked=null;
                second_card_clicked=null;
                var y=document.getElementsByClassName('back');
                for(var i=0;i<x.length;i++){
                    y[i].addEventListener('click',handleClick);
                }
            }, 2000);
        }
    }
}
//When clicked, 'flip' the card back over to reveal what's underneath
function flipCard(card_back){
    card_back.classList.add('flipped');
}
//Reset the board
function resetStats(){
    accuracy = 0;
    attempts = 0;
    match_counter = 0;
    games_played++;
    displayStats();
    card_class_mixer=[];
    random_class=[];
    removeOldDivs();
};
//things to happen for each game...reset stats (and board), apply dom elements, attach click
function resetGame(){
    resetStats();
    createAddRandomDivs();
    var z=document.getElementsByClassName('back');
    for(var i=0;i<z.length;i++){
        z[i].addEventListener('click',handleClick);
    }
}
function removeOldDivs() {
    var x = document.getElementsByClassName('front');
    var y = document.getElementsByClassName('back');
    for (var i = 0; i < get_card_class.length; i++) {
        get_card_class[i].removeChild(x[0]);
        get_card_class[i].removeChild(y[0]);
    }
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