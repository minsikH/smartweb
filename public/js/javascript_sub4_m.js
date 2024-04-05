/* sub4_main_swiper */
let sub4MainSwiper = new Swiper(".sub4_main_swiper", {
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
            let activeIndex = this.realIndex + 1;
            this.el.classList.remove('slide1', 'slide2', 'slide3', 'slide4');
            this.el.classList.add('slide' + activeIndex);
            if (activeIndex === 1) {
                this.el.classList.add('slide1');
            }
        }
    }
});

let sub4PagingSwiper = new Swiper(".sub4_main_swiper", {
    loop: true,
    pagination: {
        el: ".swiper-pagination2",
        type: "progressbar",
    },
});

sub4MainSwiper.controller.control = sub4PagingSwiper;








document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('.select_result').forEach(result => {
        let inputBox = result.querySelector('.count');
        let inputResult = result.querySelector('.input_result');
        inputBox.value = 1;
        let price = 2690000;
        inputResult.textContent = (price * Number(inputBox.value)).toLocaleString();
    });

    // updateTotal 함수를 여기서 호출하도록 변경
    updateTotal();
});

document.querySelectorAll('.count').forEach(inputBox => {
    inputBox.addEventListener('blur', function () {
        let count = parseInt(inputBox.value);
        inputBox.value = Math.max(1, count);
        buttonNum(inputBox, 0, inputBox.parentElement.nextElementSibling.querySelector('.input_result'));
        updateTotal();
    });
});

function buttonNum(inputBox, num, inputResult) {
    let count = parseInt(inputBox.value);

    if ((count + num) >= 1 && (count + num) <= 100) {
        inputBox.value = count + num;
    } else {
        if ((count + num) < 1) {
            inputBox.value = 1;
            alert("1개 이상 구매하셔야 합니다.");
        } else {
            inputBox.value = 100;
            alert("100개 이하로 구매하셔야 합니다.");
        }
    }

    let price = 2690000;
    inputResult.textContent = (price * Number(inputBox.value)).toLocaleString();
}

document.querySelectorAll('.minus').forEach(button => {
    button.addEventListener('click', function () {
        let inputBox = button.parentElement.querySelector('.count');
        let inputResult = button.parentElement.nextElementSibling.querySelector('.input_result');
        buttonNum(inputBox, -1, inputResult);
        updateTotal();
    });
});

document.querySelectorAll('.plus').forEach(button => {
    button.addEventListener('click', function () {
        let inputBox = button.parentElement.querySelector('.count');
        let inputResult = button.parentElement.nextElementSibling.querySelector('.input_result');
        buttonNum(inputBox, 1, inputResult);
        updateTotal();
    });
});

function updateTotal() {
    let totalQuantity = 0;
    let totalPrice = 0;

    document.querySelectorAll('.select_result').forEach(result => {
        let inputBox = result.querySelector('.count');
        let inputResult = result.querySelector('.input_result');

        if (result.classList.contains('on') && result.style.display !== 'none') {
            totalQuantity += Number(inputBox.value);
            totalPrice += Number(inputResult.textContent.replace(/[^0-9]/g, ''));
        }
    });

    document.querySelector('.result_num').textContent = totalQuantity.toLocaleString();
    document.querySelector('.result_price').textContent = totalPrice.toLocaleString();
}











document.addEventListener("DOMContentLoaded", function () {
    let itemBox = document.querySelector(".item_box");
    let subItemBox = document.querySelector(".sub_item_box");
    let btnUpDownArea = document.querySelector(".btn_up_down_area");

    let selectResult01 = document.querySelector(".select_result_01");
    let selectResult02 = document.querySelector(".select_result_02");
    let closeBtn01 = document.querySelector(".select_result_01 .close_btn");
    let closeBtn02 = document.querySelector(".select_result_02 .close_btn");

    itemBox.addEventListener("click", function () {
        // item_box 클릭 시 on 클래스를 토글
        this.classList.toggle("on");
        subItemBox.classList.toggle("on");

        // btn_up_down_area 이미지 변경
        let src = this.classList.contains("on") ? "./img/sub4_img/icon-up-arrow.png" : "./img/sub4_img/icon-down-arrow.png";
        btnUpDownArea.src = src;
    });



    subItemBox.addEventListener("click", function (event) {
        // sub_item_box의 li 클릭 시
        let listItem = event.target.closest("li");
        let itemBoxText = itemBox.querySelector("a > span");

        if (listItem) {
            let index = Array.from(subItemBox.children).indexOf(listItem);

            if (index === 0) {
                if (selectResult01.classList.contains("on")) {
                    // 이미 선택된 경우
                    alert("이미 선택된 항목입니다.");
                } else {
                    // 처음 선택된 경우
                    selectResult01.classList.add("on");
                    subItemBox.classList.remove("on");
                    btnUpDownArea.src = "./img/sub4_img/icon-down-arrow.png";
                    itemBox.classList.remove("on");
                    itemBoxText.innerHTML =
                        '<span class="color_box">' +
                        '<span class="color_cont"></span>' +
                        '</span>' +
                        '<span class="brand_info">ILCE-7CM2 / 실버</span>';
                }
            } else if (index === 1) {
                if (selectResult02.classList.contains("on")) {
                    // 이미 선택된 경우
                    alert("이미 선택된 항목입니다.");
                } else {
                    // 처음 선택된 경우
                    selectResult02.classList.add("on");
                    subItemBox.classList.remove("on");
                    btnUpDownArea.src = "./img/sub4_img/icon-down-arrow.png";
                    itemBox.classList.remove("on");
                    itemBoxText.innerHTML =
                        '<span class="color_box">' +
                        '<span class="color_cont b"></span>' +
                        '</span>' +
                        '<span class="brand_info">ILCE-7CM2 / 블랙</span>';
                }
            }
            updateTotal();
        }
    });








    closeBtn01.addEventListener("click", function (event) {
        // select_result_01의 close_btn 클릭 시 on 클래스 제거 및 이벤트 전파 막기
        selectResult01.classList.remove("on");
        event.stopPropagation();
        updateTotal()
    });

    closeBtn02.addEventListener("click", function (event) {
        // select_result_02의 close_btn 클릭 시 on 클래스 제거 및 이벤트 전파 막기
        selectResult02.classList.remove("on");
        event.stopPropagation();
        updateTotal()
    });



});


/* 적립혜택 설명 */
let question = document.querySelector('.question')
let questionText = document.querySelector('.question_text')

question.addEventListener('mouseover', function () {
    questionText.classList.add('on')
});
question.addEventListener('mouseleave', function () {
    questionText.classList.remove('on')
});

/* section depth1 */
const depth1Items = document.querySelectorAll('.depth1 li');
const contBoxItems = document.querySelectorAll('.cont_box > li');

depth1Items.forEach(function (item, index) {
    item.addEventListener('click', function () {
        depth1Items.forEach(function (depth1Item) {
            depth1Item.classList.remove('on');
        });
        contBoxItems.forEach(function (contBoxItem) {
            contBoxItem.classList.remove('on');
        });

        item.classList.add('on');

        // 현재 클릭한 depth1 li에 해당하는 cont_box li에 'on' 클래스
        contBoxItems[index].classList.add('on');
    });
});




/* 메인이미지변경 */
const colorItems = document.querySelectorAll('.sub4_main_bot .color li');

colorItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
        colorItems.forEach(function (colorItem) {
            colorItem.classList.remove('on');
        });

        item.classList.add('on');

        const imagePrefix = (index === 0) ? 's' : 'b';

        // 모든 swiper-slide의 이미지 경로를 변경합니다.
        document.querySelectorAll('.sub4_main_area .swiper-slide').forEach(function (slide, slideIndex) {
            const sub4MainImg = slide.querySelector('.sub4_main_img');
            sub4MainImg.style.backgroundImage = `url(./img/sub4_img/main_${imagePrefix}_${(slideIndex + 1).toString().padStart(2, '0')}.png)`;
        });
    });
});






let selectArea = document.querySelector(".icon_down_arrow_wide");
let itemSelect = document.querySelector(".item_select_open");
selectArea.addEventListener("click", function () {
    // item_box 클릭 시 on 클래스를 토글
    this.classList.toggle("on");
    itemSelect.classList.toggle("on");

});







