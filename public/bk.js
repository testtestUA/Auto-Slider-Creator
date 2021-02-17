const zoomValue = document.querySelector(".zoom-value")
const select = document.querySelectorAll(".select");
const choose = document.getElementById("choose");
const click = document.querySelectorAll(".click");
const teamPlayer = document.querySelectorAll(".team-player");
const players1 = document.querySelectorAll(".player1");
const players2 = document.querySelectorAll(".player2");
const player1Image = document.querySelector(".player1-image");
const player2Image = document.querySelector(".player2-image");
const player3Image = document.querySelector(".player3-image");
const player4Image = document.querySelector(".player4-image");
const print = document.querySelector(".print");
const zoom = document.querySelectorAll(".zoom");
const savedImage = document.querySelector(".saved-image");
const change = document.querySelector(".change");
const mobilePic = document.querySelector(".grid");

change.ondblclick = (e)=>{
    e.preventDefault()
    window.location.replace("/betkanyon");
} 

let playerZoom = player1Image;

player1Image.onclick = ()=>{
    playerZoom = player1Image;
    zoomValue.value = player1Image.height;
    console.log(player1Image.height);
    
}


player2Image.onclick = ()=>{
    playerZoom = player2Image;
    zoomValue.value = player2Image.height;
}

player3Image.onclick = ()=>{
    playerZoom = player3Image;
    zoomValue.value = player3Image.height;
    console.log(player3Image.height);
    
}


player4Image.onclick = ()=>{
    playerZoom = player4Image;
    zoomValue.value = player4Image.height;
}


//Change max-height by range
zoomValue.onmousemove = function(){
    playerZoom.style.maxHeight=zoomValue.value + "px"
    
}


select.forEach(select => {
    select.onmouseover = () => {
        select.style.color = "rgb(0, 110, 255)";
    }
    select.onmouseleave = () => {
        select.style.color = "black";
    }
    select.addEventListener("click", () => {
        submit()
    })
})


//When hover to the player, show the change button.
zoom.forEach(player => {

        

})

//When click player button list the football players!
click.forEach(click => {
    click.onclick = function (e) {
        e.preventDefault();

    }
})

//cursor pointor for each football players.
players1.forEach(player => {
    player.onmouseover = function () {
        player.style.opacity = "80%";
    }
    player.onmouseleave = function () {
        player.style.opacity = "100%";
    }

    player.onclick = function () {

        player1Image.src = player.src.slice(0, player.src.lastIndexOf("-")) + ".png";
        player3Image.src = player.src.slice(0, player.src.lastIndexOf("-")) + ".png";

    }
})

//cursor pointor for each football players.
players2.forEach(player => {
    player.onmouseover = function () {
        player.style.opacity = "80%";
    }
    player.onmouseleave = function () {
        player.style.opacity = "100%";
    }

    player.onclick = function () {
        player2Image.src = player.src.slice(0, player.src.lastIndexOf("-")) + ".png";
        player4Image.src = player.src.slice(0, player.src.lastIndexOf("-")) + ".png";


    }
})



//Drag and drop Elements!
function dragFactory(selector) {
    dragElement(document.querySelector(selector));

    function dragElement(elmnt) {
        let pos1 = 0,
            pos2 = 0,
            pos3 = 0,
            pos4 = 0;
        if (document.getElementById(elmnt.id + "header")) {
            /* if present, the header is where you move the DIV from:*/
            document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
        } else {
            /* otherwise, move the DIV from anywhere inside the DIV:*/
            elmnt.onmousedown = dragMouseDown;
        }

        function dragMouseDown(e) {
            e = e || window.event;
            e.preventDefault();
            // get the mouse cursor position at startup:
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            // call a function whenever the cursor moves:
            document.onmousemove = elementDrag;
        }

        function elementDrag(e) {
            e = e || window.event;
            e.preventDefault();
            // calculate the new cursor position:
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            // set the element's new position:
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        }

        function closeDragElement() {
            /* stop moving when mouse button is released:*/
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }
}

dragFactory(".drag1")
dragFactory(".drag2")
dragFactory(".drag3")
dragFactory(".drag4")

//Print image
print.addEventListener("click", (e) => {
    e.preventDefault();
    let captureThis = document.querySelector(".capture");
    let captureThis2 = document.querySelector(".capture2");

    if (captureThis || captureThis2 ) {
        captureThis.remove();
        captureThis2.remove();
    }


    html2canvas(document.querySelector(".banner-container"), {

        logging: true,
        letterRendering: 1,
        allowTaint: true
    }).then(canvas => {
        canvas.setAttribute("class", "capture")
        savedImage.appendChild(canvas)
        document.querySelector(".capture").scrollIntoView({
            behavior: "smooth",
            block: "end",
            inline: "nearest"
        });

    });

    html2canvas(document.querySelector(".grid"), {

        logging: true,
        letterRendering: 1,
        allowTaint: true
    }).then(canvas => {
        canvas.setAttribute("class", "capture2")
        savedImage.appendChild(canvas)
    });



})


