// Бургер меню
document.addEventListener('click', burgerInit);

function burgerInit(e) {
    const burgerIcon = e.target.closest('.burger-icon');
    const burgerNavLink = e.target.closest('.nav__link');

    if(!burgerIcon && !burgerNavLink) return
    if(document.documentElement.clientWidth > 900) return

  

    if(!document.body.classList.contains('body--opened-menu')){
        document.body.classList.add('body--opened-menu')
    } else {
        document.body.classList.remove('body--opened-menu')
    }
}


// sliders
const slides = Array.from(document.querySelectorAll('.slide'));
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const offset = 50;
const maxAngle = 2;
let index = Math.floor(slides.length / 2);

// Пагинаторы
const dots = document.querySelectorAll('.dot');

function updateDots() {
  dots.forEach((dot, i) => {
    dot.classList.toggle('active', i === index);
  });
}

function animateSlide(slide, x, angle, duration = 600) {
  const from = getComputedStyle(slide).transform;
  const to = `translateX(${x}px) rotate(${angle}deg)`;

  slide.animate([{
      transform: from
    },
    {
      transform: to
    }
  ], {
    duration,
    easing: 'cubic-bezier(0.25, 0.8, 0.25, 1)'
  }).onfinish = () => {
    slide.style.transform = to;
  };
}

function updateCarousel() {
  slides.forEach((slide, i) => {
    const delta = i - index;
    const x = delta * offset;
    const angle = delta * (maxAngle / (slides.length / 2));
    slide.style.zIndex = String(slides.length - Math.abs(delta));
    animateSlide(slide, x, angle);
  });
  updateDots(); // обновляем точки при прокрутке
  
}

// начальная установка позиций
slides.forEach((slide, i) => {
  const delta = i - index;
  slide.style.transform = `translateX(${delta * offset}px) rotate(${delta * (maxAngle / (slides.length / 2))}deg)`;
  slide.style.zIndex = String(slides.length - Math.abs(delta));
});
updateDots(); // начальная активация точки

prevBtn.addEventListener('click', () => {
  index = index > 0 ? index - 1 : slides.length - 1;
  updateCarousel();
});

nextBtn.addEventListener('click', () => {
  index = index < slides.length - 1 ? index + 1 : 0;
  updateCarousel();
});

// клики по точкам
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    updateCarousel();
  });
});




// Перелистывание слайдов при удерживании курсора мыши
let isDragging = false;
let startX;

slides.forEach(slide => {
  slide.addEventListener('mousedown', (event) => {
    isDragging = true;
    startX = event.clientX; 
    event.preventDefault(); 
  });

  slide.addEventListener('mousemove', (event) => {
    if (!isDragging) return; 
    const deltaX = event.clientX - startX; 
    if (deltaX > offset / 2) {
      index = index > 0 ? index - 1 : slides.length - 1; 
      updateCarousel();
      isDragging = false; 
    } else if (deltaX < -offset / 2) {
      index = index < slides.length - 1 ? index + 1 : 0; 
      updateCarousel();
      isDragging = false; 
    }
  });

  slide.addEventListener('mouseup', () => {
    isDragging = false; 
  });

  slide.addEventListener('mouseleave', () => {
    isDragging = false; 
  });
});



// script.js
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.aihelp_grid');
  const items = container.querySelectorAll('.aihelp_grid_item');
  const dots = document.querySelectorAll('.indicator-dot');

  function getStep() {
    const style = getComputedStyle(container);
    const gap = parseInt(style.gap || style.columnGap || 0, 10);
    return items[0].offsetWidth + gap;
  }

  function updateDots() {
    const index = Math.round(container.scrollLeft / getStep());
    dots.forEach((dot, i) => dot.classList.toggle('active', i === index));
  }

  container.addEventListener('scroll', updateDots);

  // Навигация кликом по точке
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      container.scrollTo({
        left: i * getStep(),
        behavior: 'smooth'
      });
    });
  });
});

let isTouching = false;
let touchStartX;

slides.forEach(slide => {
  slide.addEventListener('touchstart', (event) => {
    isTouching = true;
    touchStartX = event.touches[0].clientX; 
  }, { passive: true }); 
  slide.addEventListener('touchmove', (event) => {
    if (!isTouching) return; 
    const deltaX = event.touches[0].clientX - touchStartX; 
    if (deltaX > offset / 2) {
      index = index > 0 ? index - 1 : slides.length - 1; 
      updateCarousel();
      isTouching = false; 
    } else if (deltaX < -offset / 2) {
      index = index < slides.length - 1 ? index + 1 : 0; 
      updateCarousel();
      isTouching = false; 
    }
  }, { passive: false }); 

  slide.addEventListener('touchend', () => {
    isTouching = false; 
  });

  slide.addEventListener('touchcancel', () => {
    isTouching = false; 
  });
});

    // Табы, переключатели между аккордионами
    const tabControls = document.querySelector('.tab-controls')

    tabControls.addEventListener('click', toggleTab)

    function toggleTab(e){

        const tabControl = e.target.closest('.tab-controls__link')

        if(!tabControl) return
        e.preventDefault()
        if(tabControl.classList.contains('tab-controls__link--active')) return

        const tabContentID = tabControl.getAttribute('href')
        const tabContent = document.querySelector(tabContentID)
        const activeControl = document.querySelector('.tab-controls__link--active')
        const activeContent = document.querySelector('.tab-content--show')
        
        if(activeControl){
            activeControl.classList.remove('tab-controls__link--active')
        }
        if(activeContent){
            activeContent.classList.remove('tab-content--show')
        }
        
        tabControl.classList.add('tab-controls__link--active')
        tabContent.classList.add('tab-content--show')


        
    }
  
    const swiper = new Swiper(".mySwiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
    
    801:{
      slidesPerView: 2,
    },
    901:{
      slidesPerView: 2.5,
    },
    1150:{
      slidesPerView: 3,
      
    }
  }
    });

 new Swiper(".second-swiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });
 new Swiper(".third-swiper", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });



// Аккордион
    const accordionLists = document.querySelectorAll('.accordion-list');

    accordionLists.forEach(el => {

        el.addEventListener('click', (e) => {

            const accordionList = e.currentTarget
            const accordionOpenedItem = accordionList.querySelector('.accordion-list__item--opened')
            const accordionOpenedContent = accordionList.querySelector('.accordion-list__item--opened .accordion-list__content')

            const accordionControl = e.target.closest('.accordion-list__control');
            if (!accordionControl) return
            e.preventDefault()
            const accordionItem = accordionControl.parentElement;
            const accordionContent = accordionControl.nextElementSibling;

            if (accordionOpenedItem && accordionItem != accordionOpenedItem) {
                accordionOpenedItem.classList.remove('accordion-list__item--opened');
                accordionOpenedContent.style.maxHeight = null;
            }
            accordionItem.classList.toggle('accordion-list__item--opened');

            if (accordionItem.classList.contains('accordion-list__item--opened')) {
                accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px';
            } else {
                accordionContent.style.maxHeight = null;
            }

        });

    });


