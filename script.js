let slider = document.querySelector('.slider')
let sliderList = slider.querySelector('.slider .list')
let thumbnail = document.querySelector('.slider .thumbnail')
let thumbnailItems = thumbnail.querySelectorAll('.item')

thumbnail.appendChild(thumbnailItems[0])

let loadingBar = document.querySelector('.loading-bar')
const autoSlideTime = 5000 // ms

let autoSlideTimeout

function startLoadingBar() {
    loadingBar.style.animation = 'none'
    loadingBar.offsetHeight // force reflow
    loadingBar.style.animation = `loadingBarAnim ${autoSlideTime}ms linear forwards`
}

function startAutoSlide() {
    clearTimeout(autoSlideTimeout)
    startLoadingBar()
    autoSlideTimeout = setTimeout(() => {
        moveSlider('next')
        startAutoSlide()
    }, autoSlideTime)
}

function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item')
    let thumbnailItems = document.querySelectorAll('.thumbnail .item')
    
    if(direction === 'next'){
        sliderList.appendChild(sliderItems[0])
        thumbnail.appendChild(thumbnailItems[0])
        slider.classList.add('next')
    } else {
        sliderList.prepend(sliderItems[sliderItems.length - 1])
        thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1])
        slider.classList.add('prev')
    }

    slider.addEventListener('animationend', function() {
        if(direction === 'next'){
            slider.classList.remove('next')
        } else {
            slider.classList.remove('prev')
        }
        startAutoSlide() // restart auto slide and loading bar after animation
    }, {once: true}) // Remove the event listener after it's triggered once
}

// Initial start
startAutoSlide()