document.querySelectorAll('.bot_menu_area a').forEach(function(element) {
    element.addEventListener('click', function(event) {
        // 클릭된 링크의 href 속성을 가져옵니다.
        const targetSectionId = this.getAttribute('href');

        // 해당 위치로 스크롤합니다.
        document.querySelector(targetSectionId).scrollIntoView({
            behavior: 'smooth',
            block: 'start'  // 스크롤이 시작되는 부분을 기준으로 스크롤합니다.
        });

        // 기본 동작(해시 이동)을 막습니다.
        event.preventDefault();
    });
});