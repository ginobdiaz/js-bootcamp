let num = 103.941;

console.log(num.toFixed(2));

console.log(Math.round(num));
console.log(Math.floor(num));
console.log(Math.ceil(num));


let randomNum = Math.random();
console.log(randomNum);

let min = 10;
let max = 20;
randomNum = Math.floor(Math.random() * (max - min)) + min

console.log(randomNum);


let makeGuess = function(guessNum){
    let min = 1;
    let max = 5;
    let randomNum = Math.floor(Math.random() * (max - min)) + min
    
    return guessNum === randomNum;
}

console.log(makeGuess(4));