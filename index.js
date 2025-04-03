const home = document.getElementsByClassName("home")[0];
const home1 = home.getElementsByClassName("home-container--1")[0];
const home2 = home.getElementsByClassName("home-container--2")[0];
const navbar = document.getElementsByClassName("nav-bar")[0];
const navButton = document.getElementsByClassName("btn-nav")[0];
const works = document.getElementsByClassName("works-container")[0].children;
let homeVisible = false;
let navBarOpen = false;
let homeTimer = null;
let currentWorks = 0;

const homeOvserver = new IntersectionObserver(entries => {
    if(entries[0].isIntersecting){
        homeVisible = true;
        start();
    }
    else{
        homeVisible = false;
        stopToggleHome();
    }
}, {
    threshold: 0,
    rootMargin: "0px 0px 0px 0px",
});

homeOvserver.observe(home);

function start(){
    homeTimer = setTimeout(() => {
        invisible();
    }, 8000);
}

function invisible(){
    home1.classList.toggle("invisible");
    home2.classList.toggle("invisible");

    setTimeout(() => {
        toggleHome();
    }, 500);
}

function toggleHome(){
    home1.classList.toggle("hide");
    home2.classList.toggle("hide");

    if(homeVisible){
        start();
    }
}

function stopToggleHome(){
    if(homeTimer) clearTimeout(homeTimer);
}



function toggleNav(){
    navButton.classList.toggle("btn-nav--cross");
    navbar.classList.toggle("nav-hide");
    if(navBarOpen){
        navBarOpen = false;
    }
    else{
        navBarOpen = true;
    }
}


window.addEventListener("hashchange", () => {
    if(navBarOpen){
        toggleNav();
    }
})


function toggleDropDown(element){
    if(!element.classList.contains("dropdown--large")){
        element.classList.toggle("dropdown--large");
        const height = element.getElementsByClassName("dropdown__text")[0].clientHeight + 2 + 65 + 5;
        element.style.height = height + "px";
    }
    else{
        element.classList.toggle("dropdown--large");
        element.style.height = "65px";
    }
}

function toggleWorks(index){
    works[currentWorks].classList.toggle("works-hide");
    currentWorks = index;
    works[currentWorks].classList.toggle("works-hide");
}