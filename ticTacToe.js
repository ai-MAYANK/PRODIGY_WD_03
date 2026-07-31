let box=document.querySelectorAll(".box"); //return complete node-list
let reset=document.querySelector(".reset");
let newGameBtn=document.querySelector("#new-btn");
let msgContainer=document.querySelector(".msg-container");
let msg=document.querySelector("#msg");

let winPattern=[[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let sym="X";
let step=0;
// ---------------- choose symbol div ----------------
let createBox = document.createElement("div");
let createDiv = document.createElement("div");
createBox.classList.add("selectBox");

createDiv.classList.add("select");
createDiv.innerHTML="<h2>Choose Symbol: </h2>";

let option =["Kattas : X","Pittas : O"];

option.forEach((el,idx)=>{
    let creBtn = document.createElement("button");
    if(idx==0) creBtn.classList.add("forX","jsButton");
    else creBtn.classList.add("forO","jsButton");
    creBtn.innerText=el;

    creBtn.onclick=()=>{
        sym=(idx == 0 ? "X": "O");
        createBox.style.display = "none"; //hide selection screen
        document.querySelector(".container").style.display = "flex";//show game
        reset.style.display = "block";
    };
    createDiv.append(creBtn);
    createBox.append(createDiv);
    
})

let titleBox=document.querySelector(".titleBox");
titleBox.after(createBox);

// ---------------- game logic as before ----------------


box.forEach((box)=>{
    box.addEventListener("click",()=>{
        if(sym=="X"){
            box.innerText="X";
            box.classList.add("forX");
            box.classList.remove("forO");
            step++;
            if(step==9) draw();
            checkWinner();
            sym="O";
        }
        else if(sym=="O"){
            box.textContent="O";
            box.classList.add("forO");
            box.classList.remove("forX");
            step++;
            if(step==9) draw();
            checkWinner();
            sym="X";
        }
        box.disabled = true; //To disable box,which already used.
    });
})
function draw(){
    msg.innerText=`Match Draw`;
    msgContainer.classList.remove("hide");
    resetGame();
    disableBox();
}
function disableBox() {
    for (let item of box) {   
        item.disabled = true;
    }
}

function enableBox(){
    for(let item of box){
        item.disabled=false;
    }
}

function showWinner(winner){
    step=0;
    msg.innerText=`Congratulation, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBox();

}
const checkWinner = ()=>{
    for(let pattern of winPattern){
        let pos1val=box[pattern[0]].innerText;
        let pos2val=box[pattern[1]].innerText;
        let pos3val=box[pattern[2]].innerText;
        
        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val==pos2val && pos2val==pos3val){
                showWinner(pos1val);
            }
        }
    }
}

function resetGame(){
    box.forEach((item)=>{
       item.innerText="";
    })
}

reset.addEventListener("click",()=>{
    resetGame();
    enableBox();
    document.querySelector(".container").style.display = "none";
    reset.style.display = "none";
    createBox.style.display = "flex"; // change here (block → flex for centering again)
});

newGameBtn.addEventListener("click",()=>{
    resetGame();
    enableBox();
    msgContainer.classList.add("hide");
    document.querySelector(".container").style.display = "none";
    reset.style.display = "none";
    createBox.style.display = "flex"; // change here (block → flex for centering again)
});


