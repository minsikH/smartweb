db.collection('review').get().then((result) => {
    result.forEach((doc) => {
        //console.log(doc.data());
        const reviewData = doc.data().score; // 리뷰 데이터를 가져옵니다.
        //console.log(reviewData);
        // 날짜 정보를 변환 -> timestamp -> date()객체로 변환
        const timestamp = doc.data().date; // firebase에서 가져온 timestamp 값
        const date = timestamp.toDate();
        const year = date.getFullYear();
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const day = ('0' + date.getDate()).slice(-2);
        const docId = doc.id;
        let convertedScore = reviewData / 2;
        // NaN인 경우 0으로 설정
        if (isNaN(convertedScore)) {
            convertedScore = 0;
        }
/*                 let displayName = JSON.parse(localUser).displayName */
        const displayName = doc.data().displayName

        // 새로운 리뷰를 생성
        let product = `
                <li id="${doc.data().uid}" class="review_contents">
                    <div class="top_area">
                        <div class="top_user">
                            <figure>
                                <img src="./img/icon/icon_mypage.png" alt="">
                            </figure>
                            <div class="user_info">
                                <p class="name">${displayName}</p>
                            </div>
                        </div>
                        <div class="util_area">
                            <ul>
                                <li class="date">${year}/${month}/${day}</li>
                                <li><a href="javascript:;" id='btn_close' data-id=${docId}><img src="./img/icon/icon_close.png" alt=""></a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="mid_area">
                        <div class="user_img">
                            <div class="img" style="background-image: url('${doc.data().image}');"></div>
                        </div>
                        <p class="title">${doc.data().title}</p>
                        <p class="text">${doc.data().content}</p>
                    </div>
                    <div class="bot_area">
                        <div class="item">
                            <span class="brand">소니</span>
                            <span class="item_cont">Alpha A7R</span>
                        </div>
                        <div class="score">
                            <div class="no_click"></div>
                            <fieldset class="rate">
                                <input type="radio" id="rating10_${doc.id}" name="rating_${doc.id}" value="10" disabled><label for="rating10_${doc.id}" title="5점"></label>
                                <input type="radio" id="rating9_${doc.id}" name="rating_${doc.id}" value="9" disabled><label class="half" for="rating9_${doc.id}" title="4.5점"></label>
                                <input type="radio" id="rating8_${doc.id}" name="rating_${doc.id}" value="8" disabled><label for="rating8_${doc.id}" title="4점"></label>
                                <input type="radio" id="rating7_${doc.id}" name="rating_${doc.id}" value="7" disabled><label class="half" for="rating7_${doc.id}" title="3.5점"></label>
                                <input type="radio" id="rating6_${doc.id}" name="rating_${doc.id}" value="6" disabled><label for="rating6_${doc.id}" title="3점"></label>
                                <input type="radio" id="rating5_${doc.id}" name="rating_${doc.id}" value="5" disabled><label class="half" for="rating5_${doc.id}" title="2.5점"></label>
                                <input type="radio" id="rating4_${doc.id}" name="rating_${doc.id}" value="4" disabled><label for="rating4_${doc.id}" title="2점"></label>
                                <input type="radio" id="rating3_${doc.id}" name="rating_${doc.id}" value="3" disabled><label class="half" for="rating3_${doc.id}" title="1.5점"></label>
                                <input type="radio" id="rating2_${doc.id}" name="rating_${doc.id}" value="2" disabled><label for="rating2_${doc.id}" title="1점"></label>
                                <input type="radio" id="rating1_${doc.id}" name="rating_${doc.id}" value="1" disabled><label class="half" for="rating1_${doc.id}" title="0.5점"></label>
                            </fieldset>
                            <div class="score_num">
                                <span>${convertedScore}</span>
                            </div>
                        </div>
                    </div>
                </li>`;

        // 새로운 리뷰를 맨 위에 추가
        const existingReviews = $('.cont_box02 > ul');
        const firstReview = existingReviews.children().first();
        if (firstReview.length) {
            firstReview.before(product);
        } else {
            existingReviews.append(product);
        }

        const ratingValue = reviewData;
        $(`input[name="rating_${doc.id}"][value="${ratingValue}"]`).prop('checked', true);


        //삭제버튼 클릭 이벤트 
        $('#btn_close').on('click', function () {
            //삭제할 문서의 id가져옴
            const docId = $(this).data('id')
            //console.log(docId)

            // 현재 로그인한 사용자의 정보 가져오기
            var currentUser = firebase.auth().currentUser;

            // 현재 사용자의 UID 가져오기
            var currentUserUid = currentUser ? currentUser.uid : null;

            // 현재 클릭된 리뷰의 UID 가져오기
            var reviewContent = $(this).closest('.top_area').parent();
            var reviewUid = reviewContent.attr('id');

            if (currentUserUid === reviewUid) {
                // 엘럿으로 확인 메시지 표시
                if (confirm("정말 삭제하시겠습니까?")) {
                    // "예"를 클릭한 경우
                    // Firestore에서 해당 리뷰 문서 삭제
                    db.collection('review').doc(docId).delete().then(() => {
                        // 삭제 성공한 경우
                        alert("리뷰가 성공적으로 삭제되었습니다.");
                        // 해당 리뷰를 화면에서 제거
                        $(this).closest('.review_contents').remove();
                    }).catch((error) => {
                        // 삭제 실패한 경우
                        console.error("리뷰 삭제 중 오류 발생:", error);
                    });
                } else {
                    // "아니요"를 클릭한 경우
                    //console.log("삭제가 취소되었습니다.");
                }
            } else {
                // 현재 로그인한 사용자의 UID와 리뷰의 UID가 다른 경우
                alert("본인이 작성한 리뷰만 삭제가 가능합니다.");
            }


        })


       

    })
})




$(document).ready(function () {
    // 모든 #mypageButton 버튼에 대해 클릭 이벤트 설정
    $(document).on('click', '#reviewButton', function (event) {
        // 이벤트 기본 동작 방지
        event.preventDefault();

        // 사용자 로그인 상태 확인 후 페이지 이동
        checkUserAndRedirect();
    });
});

// 사용자 로그인 상태 확인 후 페이지 이동 함수
function checkUserAndRedirect() {
    var user = localStorage.getItem('user');
    if (user) {
        // 사용자가 로그인된 경우
        console.log("사용자가 로그인되어 있습니다.");
        window.location.href = "review.html"; // 유저페이지로 이동
    } else {
        // 사용자가 로그아웃된 경우
        var confirmLogin = confirm("로그인 후 이용 가능합니다. 로그인 페이지로 이동 하시겠습니까?");
        if (confirmLogin) {
            window.location.href = "mypageLogin.html"; // 마이페이지 로그인 페이지로 이동
        } else {
            // 사용자가 취소한 경우 현재 페이지에 그대로 유지
        }
    }
}



















