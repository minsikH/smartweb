//이미지 업로드 -> firestorage
const storage = firebase.storage();

//랜덤한 아이디로 document가 생성
/* db.collection('product').add({
    title: '게맛살',
    price: 1000
}) */

/* 
    then() 그리고 .catch()를 각각  붙이고
    그 안에 실행될 함수를 () => {}(화살표 함수) 선언
    각각 성공시 , 실행시, 에러가 났을 때 실행할 코드 작성

    const storage = firebase.storage();
    var storageRef = storage.ref();
    var 저장할경로 = storageRef.child('image/' + '파일명');
    var 업로드작업 = 저장할경로.put(업로드한 파일 JS로 찾은거)
*/
$('#send').on('click', function () {
    //form 요소에 입력된 정보
    let file = document.querySelector('#image').files[0];
    // 이미지가 선택되지 않은 경우에 대한 처리
    if (!file) {
        alert("이미지를 선택해주세요.");
        return; // 함수 종료
    }
    let storageRef = storage.ref(); //스토리지 주소 참조
    let storagePath = storageRef.child('image/' + file.name); //이미지 저장경로
    let uploadImg = storagePath.put(file); //업로드 파일

    //이미지 업로드 성공(then)/실패(catch) => 이미지 업로드시 용량의 문제가 있을 수 있으므로 이 코드 필요
    uploadImg.on('state_changed', //storage가 상태가 변하면(업로드성공/에러/업로드 중)
        //변화시 동작하는 함수
        null,
        //에러났을 때 동작하는 함수
        (error) => {
            console.log('실패사유는', error)
            alert("업로드에 실패했습니다. 다시 시도해주세요.");
        },
        //이미지 업로드가 성공
        () => {
            uploadImg.snapshot.ref.getDownloadURL().then((url) => {
                /*                 console.log("업로드된 경우는", url); */

                // 현재 로그인한 사용자의 정보 가져오기
                /*                 var user = localStorage.getItem('user');
                                var userEmail = user ? user.email : null; // 사용자가 로그인한 경우에만 이메일 주소 가져오기 */

                // 현재 로그인한 사용자의 UID 가져오기
                /*                 var user = localStorage.getItem('user');
                                let userUID = JSON.parse(user).uid */
                function getUserInfo() {
                    // Firebase Authentication을 사용하여 현재 로그인된 사용자의 정보를 가져옵니다.
                    const user = firebase.auth().currentUser;
                    let userInfo = {};

                    // 사용자가 로그인되어 있는 경우 사용자의 닉네임을 반환합니다.
                    if (user) {
                        userInfo.uid = user.uid;
                        userInfo.displayName = user.displayName;
                    } else {
                        // 사용자가 로그인되어 있지 않은 경우 기본값을 설정합니다.
                        userInfo.uid = null;
                        userInfo.displayName = "Anonymous"; // 예: 익명 사용자로 설정
                    }

                    return userInfo; // 사용자 정보 객체 반환
                }

                // 현재 로그인된 사용자의 닉네임을 가져옵니다.
                const userInfo = getUserInfo();


                let uploadProduct = {
                    date: new Date(),
                    score: Number($('input[name="rating"]:checked').val()),
                    title: $('#title').val(),
                    content: $('#content').val(),
                    uid: userInfo.uid, // 사용자 UID 추가
                    displayName: userInfo.displayName, // 사용자 닉네임 추가
                    image: url,
                }
                /*                 console.log(userUID)
                 */
                //데이터베이스에 업로드 성공(then)/실패(catch)
                db.collection('review').add(uploadProduct).then((result) => {
                    //성공 후에 실행할 코드
                    alert('후기를 저장했습니다.')
                    /*                     console.log(result.id) */
                    window.location.href = 'sub4.html'
                }).catch((err) => {
                    //실패 후에 실행할 코드
                    console.log(err)
                })
            });
        }

    )
}
);