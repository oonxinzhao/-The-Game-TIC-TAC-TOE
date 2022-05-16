console.log('tic tac toe');


const gameArea = document.querySelector('.game-area')
const resetBtn = document.querySelector('.reset-btn')
const blocks = document.querySelectorAll('.block')
const winnerMsg = document.querySelector('.winner')
const clickingAudio = document.querySelector('.clicking')
const gameWinningAudio = document.querySelector('.winning')
const disappointedSound = document.querySelector('.disappointed-sound')
const player1ScoreDisplay = document.querySelector('.player1-score')
const player2ScoreDisplay = document.querySelector('.player2-score')
const drawDisplay = document.querySelector('.draw')
let countClick = 0
let player1 = 'O'
let player2 = 'X'
let player1Score = 0
let player2Score = 0
let draw = 0

function playAudio() {
  clickingAudio.play()
}

function playWinningEffect() {
  gameWinningAudio.play()
}

function playDisappointedSound() {
  disappointedSound.play()
}

function handleClick(event) {
  let userSelectedBlock = event.target 
  countClick ++
  userSelectedBlock.classList.toggle('taken')
  if (countClick % 2 === 0) {
    userSelectedBlock.textContent = player2
    userSelectedBlock.classList.add('disabled-button','chg-to-red') 
  } else {
    userSelectedBlock.textContent = player1
    userSelectedBlock.classList.add('disabled-button')
    }
  for (let index = 0;index < blocks.length;index ++) {
    checkWinner()
  }
  assignScore()
}



function checkLine(index1,index2,index3) {
  if (blocks[index1].textContent === blocks[index2].textContent && blocks[index2].textContent === blocks[index3].textContent) {
  return true
  }
  return false 
}

function checkMatch() {
  for (let index = 0; index < 9; index += 3) {
    if(checkLine(index, index + 1, index + 2)) {
     
     
     return blocks[index]
    }
  }
  for (let index = 0; index < 3; index ++) {
    if(checkLine(index, index + 3, index + 6 )) {
    return blocks[index]
    }
  }
  if (checkLine(2,4,6)) {
    return blocks[2]
  }
  if (checkLine(0,4,8)) {
    return blocks[0]
  }
  return ''
}

function checkFullBoard() {
  if (document.querySelectorAll('.taken').length === 9) {
    return true
  }
}

function checkWinner() {
  let winner = checkMatch().textContent
  
  if (winner === 'X') {
    blocks.forEach(function(block) {
      block.classList.add('disabled-button')
    })
    playWinningEffect()
    return winnerMsg.textContent = 'winner is player 2'
  } else if (winner === 'O') {
    
    blocks.forEach(function(block) {
      block.classList.add('disabled-button')
    playWinningEffect()
    })
    return winnerMsg.textContent = 'winner is player 1'
  } else if (checkFullBoard() === true) {
    
    playDisappointedSound()
    return winnerMsg.textContent = 'DRAW'
  }
}

function assignScore() {
  let winner = checkMatch().textContent
  if (winner === 'X') {
    player2Score ++
    return player2ScoreDisplay.textContent = player2Score
  } else if (winner === 'O') {
    player1Score ++
    return player1ScoreDisplay.textContent = player1Score
  } else if (checkFullBoard() === true) {
    draw ++
    return drawDisplay.textContent = draw
  }
}


function resetGame() {
  blocks.forEach(function(block) {
    block.textContent = ''
    winnerMsg.textContent = ''
    countClick = 0
    block.classList.remove('taken')
    block.classList.remove('disabled-button')
    block.classList.remove('chg-to-red')
  })
}


blocks.forEach(function(block) {
  block.addEventListener('click',handleClick)
})
resetBtn.addEventListener('click',resetGame)
blocks.forEach(function(block) {
  block.addEventListener('click',playAudio)
})









