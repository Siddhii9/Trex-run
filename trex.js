const dino = document.querySelector('.dino');
const grid = document.querySelector('.grid');
const alert= document.querySelector('#alert');
const scoreDisplay=document.querySelector('#score');
const restartButton=document.querySelector('#restart')
let gravity = 0.9;
let isJumping = false;
let isGameOver = false;
let score=0;
let obstacleInterval;



function control(e) {
    if (e.code === "Space") {
        // e.keyCode===32
        if(!isJumping){
            jump()
        }
    } 
}

let position = 0
function jump() {

    isJumping = true
    let count = 0

    let timerId = setInterval(function () {
        //move down
        if (count === 15) {
            clearInterval(timerId)

            let downTimerId = setInterval(function () {
                //checking so that it doesn't go below
                if (count === 8) {
                    clearInterval(downTimerId)
                    isJumping = false
                }

                //decrementing the position
                position -= 5
                count--
                position *= gravity
                dino.style.bottom = position + 'px'

            }, 20)
        }

        //move up
        position += 30
        position *= gravity
        count++;
        dino.style.bottom = position + 'px'
    }, 20)
}

document.addEventListener('keyup', control)

function generateObstacles(){
    if(!isGameOver){
        
    let randomTime=Math.random()*2000+1000; //minimum 2s bw obstacle
    let obstaclePosition=1000
    const obstacle=document.createElement('div')
    obstacle.classList.add('obstacle')
    grid.appendChild(obstacle)
    obstacle.style.left=obstaclePosition+ 'px' 

    let timerId=setInterval(function (){
        if(obstaclePosition>0 && obstaclePosition<100 && position<100){
            clearInterval(timerId)
            alert.innerHTML='Game Over'
            isGameOver=true  
            restartButton.style.display='block'

            //remove all children
            while(grid.firstChild){
                grid.removeChild(grid.lastChild)
            }
            score=0; 
            clearInterval(obstacleInterval)
            obstacleInterval=null;
            // reset score
        }

        obstaclePosition-=10
        obstacle.style.left=obstaclePosition+'px'
    },20);
    if(!obstacleInterval)
        obstacleInterval=setInterval(generateObstacles,randomTime)
    }
}

function updateScore(){
    if(!isGameOver){
        score++; 
        scoreDisplay.textContent=`Score: ${score}`
        setTimeout(updateScore,100)
    }  
} 

function restartGame(){
    isGameOver=false;
    alert.innerHTML='';
    scoreDisplay.textContent="Score: 0"
    restartButton.style.display='none'
    score=0 
    position=0;
    dino.style.bottom=position+'px';

    while (grid.firstChild) {
        grid.removeChild(grid.lastChild);
    }

    // Clear intervals before starting new ones
     if (obstacleInterval) {
        clearInterval(obstacleInterval);
    }
    obstacleInterval = null;

     // Clear any remaining intervals
     for (let i = 0; i < 1000; i++) {
        clearInterval(i);
    }

    generateObstacles()
    updateScore()
}

restartButton.addEventListener('click',restartGame);
generateObstacles()
updateScore()
