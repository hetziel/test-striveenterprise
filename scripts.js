// Queries
let header = document.querySelector(".app-header");
let welcome = document.querySelector(".app-section-welcome");
let reviewVideo = document.querySelector(".app-testimonial-video");

let sliderInner = document.querySelector('.app-slider-inner');
let sliderInner2 = document.querySelector('.app-slider-testimonial-inner');
let sliderInner2Btn = document.querySelector('.app-slider-testimonial-btns');

let cards = sliderInner.querySelectorAll('.app-team-card').length - 1;
let testimonials = sliderInner2.querySelectorAll('.app-testimonials-img').length;

// Variables
let indexSlider = 1;
let indexSlider2 = 0;
let playingReview = false;
let btns = [];

// Interceptor
function callback(entries) {
    entries.forEach(entry => {
        let test = entry.target;
        if (entry.intersectionRatio != 0) {
            test.classList.add("unset");
        } else {
            test.classList.remove("unset");
        }
    })
}

const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0
}

const observer = new IntersectionObserver(callback, options);
const elements = document.querySelectorAll('[data-animation]')

elements.forEach(element => {
    observer.observe(element)
});

// Scroll detector
window.addEventListener("scroll", function () {
    if (window.scrollY > 0) {
        header.removeAttribute("main")
        header.querySelector(".app-nav").classList.remove('d-none')
        welcome.querySelector(".app-nav").classList.add('d-none')


    } else {
        header.setAttribute("main", "")
        header.querySelector(".app-nav").classList.add('d-none')
        welcome.querySelector(".app-nav").classList.remove('d-none')
    }
})

// Events
window.addEventListener('click', (e) => {
    let menu = e.target.closest('button[menu]')
    let eHeader = !e.target.closest('.app-header')
    if (menu) {
        header.classList.add('contracted');

    } else if (eHeader) {
        header.classList.remove('contracted');
    }

    let sliderNext = e.target.closest('button[next]');

    if (sliderNext) {
        switch (sliderNext.getAttribute("next")) {
            case "app-slider-testimonial":
                slideControl2('next', sliderInner2);
                break;

            default:
                slideControl('next', sliderInner);
                break;
        }
    }

    let sliderPrevious = e.target.closest('button[previous]');

    if (sliderPrevious) {
        slideControl('previous', sliderInner);
    }

    let sliderManual = e.target.closest('button[slider]');

    if (sliderManual) {
        sliderManual.parentNode.childNodes.forEach(element => {
            element.removeAttribute("active");

        });
        playReviewFun("pause");

        sliderManual.setAttribute("active", "");
        slideControl2(sliderManual.getAttribute("slider"), sliderInner2);
    }

    let playReview = e.target.closest('.app-slider-testimonial-play');

    if (playReview) {
        playReviewFun()
    }
})

for (let i = 0; i < testimonials; i++) {
    btns[i] = "<button slider=" + i + " " + (i == 0 ? "active" : "") + "></button>";
}
sliderInner2Btn.innerHTML = btns.join("")

setInterval(() => {
    slideControl('next', sliderInner,);
}, 6000)

// Functions
function slideControl(control, slider) {
    let position;
    switch (control) {
        case 'next':
            position = indexSlider * -100;
            if (indexSlider < cards) {
                indexSlider++
            } else {
                indexSlider = 0;
            }

            break;

        case 'previous':
            if (indexSlider == 0) {
                indexSlider = cards;
                position = indexSlider * -100;
            }
            else if (indexSlider > 0) {
                indexSlider--;
                position = indexSlider * -100;
            }
            break;
    }
    slider.style.transform = "translateX(" + position + "%)"

}

function slideControl2(index, slider) {
    position = index * -100;
    indexSlider2 = index;
    reviewVideo.innerHTML = '<source src="./assets/video/review-' + index + '.mp4" type="video/mp4"></source>'
    reviewVideo.load();
    slider.style.transform = "translateX(" + position + "%)"
}

function playReviewFun(status = null) {
    let playReview = reviewVideo.parentNode.querySelector(".app-slider-testimonial-play")
    if (status == "pause" || playingReview) {

        reviewVideo.pause();
        playingReview = false;
        playReview.innerHTML = '<div><i class="fa-solid fa-play"></i></div>';
        reviewVideo.style.zIndex = "-1"
    } else {
        if (status == "play" || !playingReview) {
            reviewVideo.innerHTML = '<source src="./assets/video/review-' + indexSlider2 + '.mp4" type="video/mp4"></source>'
            reviewVideo.load();
            reviewVideo.play();
            playingReview = true;
            playReview.innerHTML = '<div><i class="fa-solid fa-pause"></i></div>';
            reviewVideo.style.zIndex = "0"
        }
    }
}