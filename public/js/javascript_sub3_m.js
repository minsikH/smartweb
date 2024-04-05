/* sub3_main_swiper */
let sub3MainSwiper = new Swiper(".sub3_main_swiper", {
    /*             autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                }, */
    loop: true,
    pagination: {
        el: ".swiper-pagination",
        type: "fraction",
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    on: {
        slideChangeTransitionEnd: function () {
            var activeIndex = this.realIndex + 1;
            this.el.classList.remove('slide1', 'slide2', 'slide3', 'slide4');
            this.el.classList.add('slide' + activeIndex);
            if (activeIndex === 1) {
                this.el.classList.add('slide1');
            }
        }
    }
});

let sub3PagingSwiper = new Swiper(".sub3_main_swiper", {
    loop: true,
    pagination: {
        el: ".swiper-pagination2",
        type: "progressbar",
    },
});

sub3MainSwiper.controller.control = sub3PagingSwiper;


/* aside swiper */
let sub3AsideSwiper = new Swiper(".sub3_aside_swiper", {
    loop: false,
    slidesPerView: 4.5,
    spaceBetween: 0,
});











/* aside */
document.addEventListener('DOMContentLoaded', function () {
    const aside = document.querySelector('.sub3_aside_swiper');
    const asideTopOffset = aside.offsetTop;
    //console.log('asideTopOffset:', asideTopOffset)
    window.addEventListener('scroll', function () {
        const scrollTop = window.scrollY;
        //console.log(scrollTop)
        if (scrollTop >= asideTopOffset) {
            aside.classList.add('fixed');
        } else {
            aside.classList.remove('fixed');
        }
    });

    let asideList = document.querySelectorAll('.sub3_aside_swiper .swiper-slide'); 

    window.addEventListener('scroll', function () {
        let scrollPosition = window.scrollY;

        asideList.forEach(function (li) {
            let targetSectionId = li.querySelector('a').getAttribute('href').substring(1);
            let targetSection = document.getElementById(targetSectionId);

            if (targetSection) {
                let sectionTop = targetSection.offsetTop - 65;
                let sectionBottom = sectionTop + targetSection.offsetHeight;

                if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                    li.classList.add('on');
                } else {
                    li.classList.remove('on');
                }
            }
        });
    });
});
















/* 
// 각 swiper-slide에 해당하는 translate 값들을 객체에 저장합니다.
const translateValues = {
    'swiper-slide01': '0px',
    'swiper-slide02': '-83.3333px',
    'swiper-slide03': '-166.6666px',
    'swiper-slide04': '-249.9999px',
    'swiper-slide05': '-333.3332px',
    'swiper-slide06': '-416.6665px',
    'swiper-slide07': '-499.9998px',
    'swiper-slide08': '-583.3331px',
    'swiper-slide09': '-666.6664px',
};

// 윈도우의 스크롤 이벤트를 감지하여 함수를 실행합니다.
window.addEventListener('scroll', function () {
    // 각 swiper-slide 요소에 대해 반복합니다.
    for (const slideId in translateValues) {
        // 해당 slideId에 해당하는 요소를 찾습니다.
        const slide = document.getElementById(slideId);
        // 만약 slide가 존재하고, 'on' 클래스가 붙어 있다면:
        if (slide && slide.classList.contains('on')) {
            // 해당 slide의 translate 값을 가져와 변수에 할당합니다.
            const translateValue = translateValues[slideId];
            // swiper-wrapper 요소를 찾아 translate 값을 적용합니다.
            const swiperWrapper = document.querySelector('.sub3_aside_swiper .swiper-wrapper');
            // 스타일을 설정할 때 !important를 사용하여 강제로 변경합니다.
            swiperWrapper.style.setProperty('transform', `translate3d(${translateValue}, 0px, 0px)`, 'important');
            // 반복문을 빠져나옵니다.
            break;
        }
    }
}); */



/* section 의  swiper들 */
const sub3ContentsAreas = document.querySelectorAll('.sub3_contents_area');

sub3ContentsAreas.forEach(function (sub3ContentsArea) {
    new Swiper(sub3ContentsArea, {
        loop: false,
        slidesPerView: 2.5,
        spaceBetween: 20,
    });
});

/* 어사이드 스와이프 클릭시 보이는화면 위치 조정 */
/* document.querySelectorAll('.swiper-slide a').forEach(function(element) {
    element.addEventListener('click', function(event) {

        // 이동할 위치 계산
        const targetSectionId = this.getAttribute('href');
        const targetSection = document.querySelector(targetSectionId);
        const offset = targetSection.offsetTop - 60; // 이동할 위치에서 60px 만큼 위로 이동

        // 스크롤 이동
        window.scrollTo({
            top: offset,
            behavior: 'smooth' // 부드러운 스크롤 효과를 사용합니다.
        });
    });
}); */
/* document.querySelectorAll('.swiper-slide a').forEach(function(element) {
    element.addEventListener('click', function(event) {
        event.preventDefault(); // 기본 동작(해시 이동)을 막습니다.

        // 이동할 위치 계산
        const targetSectionId = this.getAttribute('href');
        const targetSection = document.querySelector(targetSectionId);

        // targetSection의 위치를 콘솔에 출력
        console.log('Target Section OffsetTop:', targetSection.offsetTop);

        const offset = targetSection.offsetTop - 60; // 이동할 위치에서 60px 만큼 위로 이동

        // 스크롤 이동
        window.scrollTo({
            top: offset,
            behavior: 'smooth' // 부드러운 스크롤 효과를 사용합니다.
        });
    });
}); */
document.querySelectorAll('.swiper-slide a').forEach(function(element) {
    element.addEventListener('click', function(event) {
        // 어사이드 해시 클릭인 경우에만 기본 동작(해시 이동)을 막습니다.
        if (this.closest('.sub3_aside_swiper')) {
            event.preventDefault();
        }

        // 이동할 위치 계산
        const targetSectionId = this.getAttribute('href');
        const targetSection = document.querySelector(targetSectionId);

        // targetSection이 null이 아닌 경우에만 처리
        if (targetSection) {
            // targetSection의 위치를 콘솔에 출력
            console.log('Target Section OffsetTop:', targetSection.offsetTop);

            // 이동할 위치 계산
            const offset = targetSection.offsetTop - 60; // 이동할 위치에서 60px 만큼 위로 이동

            // 스크롤 이동
            window.scrollTo({
                top: offset,
                behavior: 'smooth' // 부드러운 스크롤 효과를 사용합니다.
            });
        }
    });
});






/* 스크롤 시 슬라이드on이 맨좌측 슬라이드로 위치이동 */



/* function adjustSlidePosition() {
    const activeSlide = document.querySelector('.swiper-slide.on');
    if (activeSlide) {
        // 활성화된 슬라이드의 인덱스를 가져옵니다.
        const activeSlideIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
        const slideWidth = 83.3333; // 슬라이드의 너비
        const transformValue = -Math.round(activeSlideIndex * slideWidth); // 위치값을 반올림하여 계산합니다.

        // 슬라이드 래퍼의 transform 속성을 조정하여 활성화된 슬라이드를 화면 왼쪽 끝으로 이동시킵니다.
        document.querySelector('.sub3_aside_swiper .swiper-wrapper').style.transform = `translate3d(${transformValue}px, 0px, 0px)`;
    }
}

document.addEventListener('DOMContentLoaded', adjustSlidePosition);
window.addEventListener('scroll', adjustSlidePosition); */




/* function adjustSlidePosition() {
    const activeSlide = document.querySelector('.swiper-slide.on');
    if (activeSlide) {
        // 활성화된 슬라이드의 인덱스를 가져옵니다.
        const activeSlideIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
        const slideWidth = 83.3333; // 슬라이드의 너비
        const transformValue = -Math.round(activeSlideIndex * slideWidth); // 위치값을 반올림하여 계산합니다.

        // 슬라이드 래퍼의 transform 속성을 조정하여 활성화된 슬라이드를 화면 왼쪽 끝으로 이동시킵니다.
        const swiperWrapper = document.querySelector('.sub3_aside_swiper .swiper-wrapper');
        swiperWrapper.style.transition = 'transform 0.3s ease'; // 애니메이션 효과 추가
        swiperWrapper.style.transform = `translate3d(${transformValue}px, 0px, 0px)`;
    }
}

document.addEventListener('DOMContentLoaded', adjustSlidePosition);
window.addEventListener('scroll', adjustSlidePosition); */
function adjustSlidePosition() {
    const activeSlide = document.querySelector('.swiper-slide.on');
    if (activeSlide) {
        const slidesPerView = 4.5; // 슬라이드가 한 번에 보이는 개수
        const activeSlideIndex = Array.from(activeSlide.parentNode.children).indexOf(activeSlide);
        const containerWidth = document.querySelector('.sub3_aside_swiper').clientWidth; // 슬라이드 컨테이너의 너비
        const slideWidth = containerWidth / slidesPerView; // 슬라이드의 너비 계산
        const transformValue = -Math.round(activeSlideIndex * slideWidth);

        const swiperWrapper = document.querySelector('.sub3_aside_swiper .swiper-wrapper');
        swiperWrapper.style.transition = 'transform 0.3s ease';
        swiperWrapper.style.transform = `translate3d(${transformValue}px, 0px, 0px)`;
    }
}

document.addEventListener('DOMContentLoaded', adjustSlidePosition);
window.addEventListener('scroll', adjustSlidePosition);
