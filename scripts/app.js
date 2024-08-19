// Shared functions

const clone = (array) => {
    const newItems = [];

    array.forEach(item => {
        const newItem = item.cloneNode(true);
        newItem.setAttribute('aria-hidden', true);
        newItems.push(newItem);
    });

    return newItems;
};

const moving = (slider, activeSlide, newSlide, lastIndex, newIndex, width, isAnimate) => {
    slider.style.transform = `translateX(-${width * newIndex}px)`;

    if (isAnimate) {
        animate(lastIndex, newIndex, slider, width);
    };

    activeSlide.classList.remove('active-slide');
    newSlide.classList.add('active-slide');
};

const dotUpdate = (activeDot, newDot) => {
    activeDot.classList.remove('stages__dot--active');
    newDot.classList.add('stages__dot--active');
};

const animate = (lastIndex, newIndex, element, width) => {
    const keyframes = [
        {
            transform: `translateX(-${width * lastIndex}px)`,
        },
        {
            transform: `translateX(-${width * newIndex}px)`,
        },
    ];

    element.animate(keyframes, 500);
};

// Slider - stages section

const sliderStages = document.querySelector('.stages__grid');

const nextBtnStages = document.querySelector('.stages__btn--right');
const prevBtnStages = document.querySelector('.stages__btn--left');

const dotsStages = document.querySelector('.stages__dots');

const sliderItemsStages = Array.from(sliderStages.children);

const sliderStagesWidth = sliderItemsStages[0].getBoundingClientRect().width;

nextBtnStages.addEventListener('click', () => {
    const activeSlide = sliderStages.querySelector('.active-slide');
    const newSlide = activeSlide.nextElementSibling;

    const lastIndex = sliderItemsStages.findIndex(item => item === activeSlide);
    const newIndex = sliderItemsStages.findIndex(item => item === newSlide);

    if (newIndex === sliderItemsStages.length - 1) {
        nextBtnStages.classList.add('slider__btn--unactive');
    } else if (newIndex === 1) {
        prevBtnStages.classList.remove('slider__btn--unactive');
    };

    const activeDot = dotsStages.querySelector('.stages__dot--active');
    const newDot = activeDot.nextElementSibling;

    moving(sliderStages, activeSlide, newSlide, lastIndex, newIndex, sliderStagesWidth, true);
    dotUpdate(activeDot, newDot);
});

prevBtnStages.addEventListener('click', () => {
    const activeSlide = sliderStages.querySelector('.active-slide');
    const newSlide = activeSlide.previousElementSibling;

    const lastIndex = sliderItemsStages.findIndex(item => item === activeSlide);
    const newIndex = sliderItemsStages.findIndex(item => item === newSlide);

    if (newIndex === 0) {
        prevBtnStages.classList.add('slider__btn--unactive');
    } else if (newIndex === sliderItemsStages.length - 2) {
        nextBtnStages.classList.remove('slider__btn--unactive');
    };

    const activeDot = dotsStages.querySelector('.stages__dot--active');
    const newDot = activeDot.previousElementSibling;

    moving(sliderStages, activeSlide, newSlide, lastIndex, newIndex, sliderStagesWidth, true);
    dotUpdate(activeDot, newDot);
});


// Slider - patricipants section

const sliderPatricipants = document.querySelector('.patricipants__slider');

const nextBtnPatricipants = document.querySelector('.patricipants__btn--right');
const prevBtnPatricipants = document.querySelector('.patricipants__btn--left');

const patricipantsIndex = document.querySelector('.patricipants__index');

const clonesItemsPatricipants = clone(Array.from(sliderPatricipants.children));

clonesItemsPatricipants.slice(-3).reverse().forEach(item => {
    sliderPatricipants.insertAdjacentHTML('afterbegin', item.outerHTML);
});

clonesItemsPatricipants.slice(0, 3).forEach(item => {
    sliderPatricipants.insertAdjacentHTML('beforeend', item.outerHTML);
});

const sliderItemsPatricipants = Array.from(sliderPatricipants.children);

const sliderPatricipantsWidth = sliderItemsPatricipants[0].getBoundingClientRect().width;
sliderPatricipants.style.transform = `translateX(-${sliderPatricipantsWidth * 3}px)`;

let patricipantsIndexNumber = 1;
patricipantsIndex.textContent = patricipantsIndexNumber;

const moveForward = () => {
    let activeSlide = sliderPatricipants.querySelector('.active-slide');

    if (activeSlide === sliderItemsPatricipants[9]) {
        moving(sliderPatricipants, activeSlide, sliderItemsPatricipants[3], 3, 3, false);
    };

    activeSlide = sliderPatricipants.querySelector('.active-slide');
    const newSlide = activeSlide.nextElementSibling;

    const lastIndex = sliderItemsPatricipants.findIndex(item => item === activeSlide);
    const newIndex = sliderItemsPatricipants.findIndex(item => item === newSlide);

    moving(sliderPatricipants, activeSlide, newSlide, lastIndex, newIndex, sliderPatricipantsWidth, true);

    patricipantsIndexNumber++;

    if (patricipantsIndexNumber > 6) patricipantsIndexNumber = 1;

    patricipantsIndex.textContent = patricipantsIndexNumber;
};

const moveBackward = () => {
    let activeSlide = sliderPatricipants.querySelector('.active-slide');

    if (activeSlide === sliderItemsPatricipants[0]) {
        moving(sliderPatricipants, activeSlide, sliderItemsPatricipants[6], 3, 6, false);
    };

    activeSlide = sliderPatricipants.querySelector('.active-slide');
    const newSlide = activeSlide.previousElementSibling;

    const lastIndex = sliderItemsPatricipants.findIndex(item => item === activeSlide);
    const newIndex = sliderItemsPatricipants.findIndex(item => item === newSlide);

    moving(sliderPatricipants, activeSlide, newSlide, lastIndex, newIndex, sliderPatricipantsWidth, true);

    patricipantsIndexNumber--;

    if (patricipantsIndexNumber === 0) patricipantsIndexNumber = 6;

    patricipantsIndex.textContent = patricipantsIndexNumber;
};

nextBtnPatricipants.addEventListener('click', moveForward);

prevBtnPatricipants.addEventListener('click', moveBackward);

setInterval(moveForward, 4000);

// Moving line

const quotes = ['Дело помощи утопающим — дело рук самих утопающих!', 'Шахматы двигают вперед не только культуру, но и экономику!', 'Лед тронулся, господа присяжные заседатели!'];

const sliderLines = document.querySelectorAll('.line__slider');

sliderLines.forEach(slide => {
    quotes.forEach(item => {
        const sliderItem = document.createElement('li');
        const sliderText = document.createElement('p');
    
        sliderText.textContent = item;
    
        sliderText.classList.add('title', 'title--line', 'line__text');
    
        sliderItem.append(sliderText);

        slide.append(sliderItem);
    })
});

sliderLines.forEach(slider => {
    const clones = clone(Array.from(slider.children));
    clones.forEach(item => {
        //slider.insertAdjacentHTML('afterbegin', item.outerHTML);
        slider.append(item);
    });
});