const home = document.getElementsByClassName("home")[0];
const home1 = home.getElementsByClassName("home-container--1")[0];
const home2 = home.getElementsByClassName("home-container--2")[0];
const navbar = document.getElementsByClassName("nav-bar")[0];
const navButton = document.getElementsByClassName("btn-nav")[0];
const works = document.getElementsByClassName("works-container")[0].children;
const projectTypes = document.getElementsByClassName("project-options")[0].children;
let workImages = null;

let homeVisible = false;
let navBarOpen = false;
let homeTimer = null;
let currentWorks = 0;
let currentWorkImage = 0;
let currentActiveLink = "#home";

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
    document.querySelector(`[href="${currentActiveLink}"]`).classList.toggle("nav-active");
    currentActiveLink = window.location.hash;
    document.querySelector(`[href="${currentActiveLink}"]`).classList.toggle("nav-active");

    if(navBarOpen){
        toggleNav();
    }
})


function toggleDropDown(element){
    const headerHeight = element.getElementsByClassName("dropdown__header")[0].clientHeight + 2;

    if(!element.classList.contains("dropdown--large")){
        element.classList.toggle("dropdown--large");
        const height = element.getElementsByClassName("dropdown__text")[0].clientHeight + 2 + headerHeight + 5;
        element.style.height = height + "px";
    }
    else{
        element.classList.toggle("dropdown--large");
        element.style.height = headerHeight + "px";
    }
}

function toggleWorks(index){
    projectTypes[currentWorks].classList.toggle("work-active");
    works[currentWorks].classList.toggle("works-hide");
    currentWorks = index;
    projectTypes[currentWorks].classList.toggle("work-active");
    works[currentWorks].classList.toggle("works-hide");
}

function toggleWorkGallery(element){
    const gallery = element.parentElement.parentElement.nextElementSibling;
    workImages = gallery.getElementsByTagName("img");
    currentWorkImage = 0;
    for(let i = 0; i < workImages.length; i++){
        if(i == currentWorkImage){
            workImages[i].classList.remove("invisible");
        }
        else{
            workImages[i].classList.add("invisible");
        }
    }
    gallery.classList.toggle("hide");
}

function closeWorkGallery(element){
    const gallery = element.parentElement;
    gallery.classList.toggle("hide");
}

function nextImage(){
    workImages[currentWorkImage].classList.toggle("invisible");
    currentWorkImage = (currentWorkImage + 1) % workImages.length;
    workImages[currentWorkImage].classList.toggle("invisible");
}