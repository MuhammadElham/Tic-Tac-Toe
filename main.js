var box = document.querySelectorAll(".box");
var resBut = document.querySelector(".resetBut");
var msgWin = document.querySelector(".msg");
var newBut = document.querySelector(".newBut");
var msgContainer = document.querySelector(".msg-container");
var container = document.querySelector(".container");
var boxhide = document.querySelector(".boxhide");
// player X
var turnX = true;
// player O
var turnO = false;
var winPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Reset
function reset() {
  for (var i = 0; i < box.length; i++) {
    box[i].innerText = "";
    box[i].style.pointerEvents = "auto";
    box[i].style.color = ""; // Reset color for 'O'
    box[i].addEventListener("click", clickItem); // Re-enable event listeners
  }
  msgContainer.classList.add("msg-hide");
  container.classList.remove("boxhide");
  turnX = true; // Reset turn to X
}

// input in box
for (var i = 0; i < box.length; i++) {
  var element = box[i];
  element.addEventListener("click", clickItem);
}

function clickItem(e) {
  if (turnX === true) {
    this.innerText = "X";
    turnX = false;
    turnO = true;
  } else {
    this.innerText = "O";
    this.style.color = "#E7B10A";
    turnO = false;
    turnX = true;
  }
  // Disable the box after clicking
  this.removeEventListener("click", clickItem);
  checkWinner();
}

function disBox() {
  for (var i = 0; i < box.length; i++) {
    box[i].removeEventListener("click", clickItem);
    box[i].style.pointerEvents = "none";
  }
}

function showWinner(win) {
  msgWin.innerText = 'Congratulation, Winner is "' + win + '"';
  msgContainer.classList.remove("msg-hide");
  container.classList.add("boxhide");
  disBox();
}

function checkWinner() {
  for (var pattern = 0; pattern < winPattern.length; pattern++) {
    var pos1Value = box[winPattern[pattern][0]].innerText;
    var pos2Value = box[winPattern[pattern][1]].innerText;
    var pos3Value = box[winPattern[pattern][2]].innerText;

    if (pos1Value != "" && pos2Value != "" && pos3Value != "") {
      if (pos1Value == pos2Value && pos2Value == pos3Value) {
        console.log("Winner!", pos1Value);
        showWinner(pos1Value);
        return;
      }
    }
  }
  // Check for a tie if all boxes are filled
  var isTie = true;
  for (var i = 0; i < box.length; i++) {
    if (box[i].innerText === "") {
      isTie = false;
      break;
    }
  }
  if (isTie === true) {
    disBox();
    msgWin.innerText = "It's a Tie!";
    msgContainer.classList.remove("msg-hide");
    container.classList.add("boxhide");
  }
}

newBut.addEventListener("click", reset);
resBut.addEventListener("click", reset);
