
/* Maths helper */
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);

    let random = Math.floor(Math.random() * (max - min) + min);
    while(random==0){
        random = Math.floor(Math.random() * (max - min) + min);
    }

    return random;   
}

function stringifyFrac(frac){
    return frac[0]%frac[1]==0?frac[0]/frac[1]:"("+frac[0]+"/"+frac[1]+")";
}

function multiplyFrac(num1,num2,dem1=1,dem2=1){
    newNum = num1*num2;
    newDem = dem1*dem2;
    return [newNum,newDem];
}


/* Front helper */
function updateText(id, value){
    document.getElementById(id).innerText = value
}

/* Handler */
function handlerCorrect(){
    updateText("correction",currentCorrection)
}

function handlerOther(){
    updateText("correction","")
    updateText("question","")
    console.log(document.getElementById("selector").value);
    switch(document.getElementById("selector").value){
        case "1":
            affineEquationGenerator()
            break;
        case "2":
            simpleFracAlphaAffineGenerator()
            break;
    }
}

/* initialize Front constant */
let currentCorrection = ""
let question = document.getElementById("question");



/* Equation generator */
function affineEquationGenerator(){
    range = [-25,60]
    alpha = getRandomInt(range[0],range[1])
    beta = getRandomInt(range[0],range[1])
    zeta = getRandomInt(range[0],range[1])

    let solution;
    let equation=alpha + "x" + (beta>0?"+"+beta:beta) + " = " + zeta

    updateText("question", equation);

    

    if((zeta-beta)%alpha == 0){
        solution = (zeta - beta)/alpha
    }
    else if((zeta-beta)<0 && alpha<0){
        solution = (-(zeta - beta)) + "/" + (-alpha)
    }
    else{
        solution = (zeta - beta) + "/" + alpha
    }

    currentCorrection = "La réponse est " + solution;
    demo = "\n\n La démonstration : \n" + equation
    + "\n" + alpha + "x" + (beta>0? ("+"+beta) : beta) + (-beta>0? ("+"+ -beta) : -beta) + " = " + zeta + (-beta>0?"+"+-beta:-beta)
    + "\n" + alpha + "x" + " = " + (zeta - beta)
    + "\n" + (alpha + "x"+"/"+alpha) + " = " + (zeta - beta) + "/" + alpha
    + "\n" + "x = " + solution


    currentCorrection += demo
}


function simpleFracAlphaAffineGenerator(){
    range = [-10,10]
    alpha = [1,getRandomInt(range[0],range[1])]
    beta = getRandomInt(range[0],range[1])
    zeta = getRandomInt(range[0],range[1])

    let solution;
    let equation= stringifyFrac(alpha) + "x" + (beta>0?"+"+beta:beta) + " = " + zeta

    updateText("question", equation);

    solution = (zeta - beta)*alpha[1]

    currentCorrection = "La réponse est " + solution;
    demo = "\n\n La démonstration : \n" + equation
    + "\n" + stringifyFrac(alpha) + "x" + (beta>0? ("+"+beta) : beta) + (-beta>0? ("+"+ -beta) : -beta) + " = " + zeta + (-beta>0?"+"+-beta:-beta)
    + "\n" + stringifyFrac(alpha) + "x" + " = " + (zeta - beta)
    + "\n" + (stringifyFrac(alpha) + "x"+"*"+alpha[1]) + " = " + (zeta - beta) + "*" + alpha[1]
    + "\n" + (stringifyFrac(alpha) + "x"+"*"+alpha[1]) + " = " + (zeta - beta) + "*" + alpha[1]
    + "\n" + "x = " + solution


    currentCorrection += demo
}