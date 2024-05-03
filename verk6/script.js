let mybutton = document.getElementById("start-anim")
mybutton.addEventListener("click", animation);




function animation(){
    console.log("click");
    anime({
        // translateX: 250,
        targets: ".svg-icon polygon",
        points: [
            {value: "194 242 , 423 41 , 678 246 , 418 472"},
            {value: "194 242 , 426 283 , 678 246 , 423 309"},
            {value: "194 242 , 913 81 , 678 246 , 22 463"}
        ],
        direction: "alternate",
        // loop: true,
        duration: 2000,
        easing: 'easeInOutExpo'
    });
}