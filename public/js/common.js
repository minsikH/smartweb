//데이터베이스 가져오기
const db = firebase.firestore();

/* 마이페이지 (로그인/비로그인) 에 따른 주소값 변경 */
/* $(document).ready(function() {
    // 마이페이지 버튼 클릭 시 동작 설정
    $('#mypageButton').on('click', function(event) {
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
        window.location.href = "mypageUser.html"; // 유저페이지로 이동
    } else {
        // 사용자가 로그아웃된 경우
        console.log("사용자가 로그아웃되어 있습니다.");
        window.location.href = "mypageLogin.html"; // 로그인 페이지로 이동
    }
} */

$(document).ready(function () {
    // 모든 #mypageButton 버튼에 대해 클릭 이벤트 설정
    $(document).on('click', '#mypageButton', function (event) {
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
        window.location.href = "mypageUser.html"; // 유저페이지로 이동
    } else {
        // 사용자가 로그아웃된 경우
        console.log("사용자가 로그아웃되어 있습니다.");
        window.location.href = "mypageLogin.html"; // 로그인 페이지로 이동
    }
}












/* mypageLogin */

//로그인 버튼
$('#login').on('click', function () {
    let loginEmail = $('#loginEmail').val()
    let loginPwd = $('#loginPwd').val()

    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPwd).then((result) => {

        //1. 로그인이 성공하면
        console.log(result.user)

        //2. 로그인한 사용자의 정보를 로컬 스토리지에 저장
        localStorage.setItem('user', JSON.stringify(result.user))

        //페이지 전환(리다이렉션)
        window.location.href = 'index.html'

    })
})

//구글 인증 기능 추가
var provider = new firebase.auth.GoogleAuthProvider();

//구글 인증하기
$('#loginGoogle').on('click', function () {
    firebase.auth().signInWithPopup(provider).then(function (result) {
        //var token = result.credential.accessToken;
        var user = result.user;
        window.location.href = 'index.html'

        console.log(user); //인증 후 어떤 데이터를 받아오는지 확인하는 용도        
    }).catch(function (error) {
        console.log('실패사유는 ', error)
    })
})





/* mypageUser */

//유저정보 확인
let localUser = localStorage.getItem('user')
//console.log(localName)
if (localUser) {
    //사용자정보가 있으면 displayName을 표시
    let displayName = JSON.parse(localUser).displayName
    $('#displayName').text(displayName)
    let email = JSON.parse(localUser).email
    $('#email').text(email)
    $('#displaySub').text(' 님 반갑습니다.')
}

//.onAuthStateChanged - 사용자의 로그인상태가 변할때 실행
//로그인시 //로그아웃시 //새로고침
/*     firebase.auth().onAuthStateChanged((user)=> {
     if (user) {
         //사용자가 로그인 한 경우
         //console.log(user)
         console.log(user.displayName)
         localStorage.setItem('user', JSON.stringify(user))
     }
 }) */

$('#btnLogout').on('click', function () {
    //로컬스토리에서 사용자 데이터 삭제
    localStorage.removeItem('user')
    alert('로그아웃되었습니다.')
    window.location.href = 'index.html'
})

















/* mypageJoin */

//회원가입시키는 코드
//firebase.auth().createUserWithEmailAndPassword(이메일/패스워드);

//성공하면 then, 에러나면 catch
/* 
    firebase.auth().createUserWithEmailAndPassword(email, password).then((result)=>{
        console.log(result)
        console.log(result.user)
    })
*/

//가입하기 버튼을 클릭
/* $('#register').on('click', function () {
    let userEmail = $('#email_new').val();
    let userPwd = $('#password_new').val();
    let userName = $('#name_new').val();

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPwd).then((result) => {
        console.log(result)
        console.log(result.user);

        //가입기능 업그레이드: 이름표시
        result.user.updateProfile({
            displayName: userName
        }).then((
            alert("회원가입이 완료되었습니다."),
            window.location.href = "index.html"
        )).catch(function (error) {
            console.log("정보를 다시 입력해주세요.", error)
        })
    })

})
 */

$('#register').on('click', function () {
    let userEmail = $('#email_new').val();
    let userPwd = $('#password_new').val();
    let userName = $('#name_new').val();

    firebase.auth().createUserWithEmailAndPassword(userEmail, userPwd).then((result) => {
        console.log(result);
        console.log(result.user);

        // 가입 기능 업그레이드: 이름 표시
        return result.user.updateProfile({
            displayName: userName
        });
    }).then(() => {
        // 프로필 업데이트 성공 시 실행되는 코드
        alert("회원가입이 완료되었습니다.");
        window.location.href = "index.html";
    }).catch((error) => {
        console.log("정보를 다시 입력해주세요.", error);
    });
});
