
const title = document.querySelector(".welcome-text");
const runButton = document.querySelectorAll(".run");


//Call Button Timeout
setTimeout(() => {
    callButton()
}, 1000);

//Functions

function callButton(){
    runButton.forEach(run => {
        run.style.animationName="fade-in";
    })
    
}
