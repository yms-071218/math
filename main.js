function getRandomjha(width, height) {
    // 너비와 높이 사이의 랜덤한 왼쪽 좌표를 계산합니다.
    const left = Math.floor(Math.random() * width); // 0부터 width-1까지의 정수 범위
    // 너비와 높이 사이의 랜덤한 상단 좌표를 계산합니다.
    const top = Math.floor(Math.random() * height); // 0부터 height-1 까지의 정수 범위
    // 계산된 좌표를 반환합니다.
    return { left, top };
}

// 점을 생성하는 함수
function createDots(count, cityId, dotClass) {
    // 도시의 div 요소를 가져옵니다.
    const cityDiv = document.getElementById(cityId); // cityid 매개변수로 여러가지 id를 전달받음
    // 부모 요소의 너비와 높이를 가져와서 점이 부모 요소 내에 위치하도록 조정합니다.
    const parentWidth = cityDiv.offsetWidth - 7; // 부모 요소의 너비(-7로 콘텐츠영역에 딱 맞게 표시ㅣ함)
    const parentHeight = cityDiv.offsetHeight - 7; // 부모 요소의 높이
    // 주어진 개수만큼 점을 생성합니다.
    for (let i = 0; i < count; i++) {
        // 새로운 점 요소를 생성합니다.
        const dot = document.createElement('span');
        // 점에 지정된 클래스를 추가합니다.
        dot.classList.add(dotClass); //css에 맞는 클래스로 작성해야함
        // 랜덤한 좌표를 생성하여 스타일로 설정합니다.
        const jha = getRandomjha(parentWidth, parentHeight);
        dot.style.left = `${jha.left}px`; //for문으로 여러개의 생성된 점이 새로운 좌표로 랜덤이 위치로
        dot.style.top = `${jha.top}px`;
        // 도시의 div에 새로운 점을 추가합니다.
        cityDiv.appendChild(dot); // 위의 -7 하던 부모요소에 자식요소로 점이 생성
    }
}

// 각 도시에 대해 점을 생성합니다.
createDots(20, 'Sapporo', 'blue-dot'); // 20개의 삿포로라는 파란점을 만든다
createDots(3, 'Hakodate', 'yellow-dot');
createDots(135, 'Tokyo', 'red-dot');
createDots(27, 'Osaka', 'black-dot');
createDots(16, 'Fukuoka', 'white-dot');

// 점을 이동시키는 함수
function moveDots() {
    // 모든 점 클래스를 배열로 정의합니다.
    const dotClasses = ['blue-dot', 'yellow-dot', 'red-dot', 'black-dot', 'white-dot'];
    // 각 점 클래스에 대해 반복합니다.
    dotClasses.forEach((dotClass) => {
        // 해당 클래스의 모든 점을 선택합니다.
        const dots = document.querySelectorAll(`.${dotClass}`); // blue-dot이 클래스라면 그 클래스 안에 있는 점 모든것 지정
        // 각 점에 대해 반복합니다.
        dots.forEach((dot) => {
            // 랜덤한 각도를 설정합니다.
            const θ = Math.random() * 2 * Math.PI; // 0 이상 2π미만의 범위를 가진 각도 PI 메소드는 π를 나타냄
            // 이동 거리를 설정합니다.
            const distance = 8;
            // x와 y 방향으로의 이동 거리를 계산합니다.
            const dx = distance * Math.cos(θ); // 세타가 0도면 코사인은 1이니 8*1=8로 dx는 8임
            const dy = distance * Math.sin(θ); // 세타가 45도면 2분의 루트 2(약 0.707), 8*0.707=5.656. y축 방향으로 5.656만큼 이동
            // 새로운 위치를 계산합니다.
            let left = parseFloat(dot.style.left); //기존 점의 left값을 가져와서 문자열을 숫자로 변환함
            let top = parseFloat(dot.style.top);
            const newLeft = left + dx; //기존 left값과 이동한 길이를 더함
            const newTop = top + dy;
            // 새로운 위치가 부모 요소 내에 있는지 확인하고, 스타일을 업데이트합니다.
            const parentWidth = dot.parentElement.offsetWidth - 7; // 부모 요소의 너비
            const parentHeight = dot.parentElement.offsetHeight - 7; // 부모 요소의 높이
            if (newLeft >= 0 && newLeft <= parentWidth) {
                //만약 newLeft가 0보다 크거나 같으면 div범위에 벗어나지않음 그런식으로 뒤에 있는 조건 두개 다 같아야지 참임.
                dot.style.left = `${newLeft}px`; // 점이 부모요소에 있다면 랜덤으로 계속 진행함.
            }
            if (newTop >= 0 && newTop <= parentHeight) {
                dot.style.top = `${newTop}px`;
            }
        });
    });
}

// 점을 이동시키는 함수를 일정한 간격으로 반복 호출하여 애니메이션 효과를 구현합니다.
setInterval(moveDots, 1); // 1밀리초마다 호출하여 부드러운 애니메이션을 만듭니다.
