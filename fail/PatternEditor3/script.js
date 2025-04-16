let pattern = [];
let audioPlayer = document.getElementById('audioPlayer');
let startTime = null;
let timeline = document.getElementById('timeline');
let marker = document.getElementById('marker');

audioPlayer.onplay = function() {
    startTime = audioPlayer.currentTime;
    updateMarker();
};

audioPlayer.ontimeupdate = function() {
    updateMarker();
};

function updateMarker() {
    if (startTime !== null) {
        const currentTime = audioPlayer.currentTime - startTime;
        const timelineWidth = timeline.offsetWidth;
        const duration = audioPlayer.duration;
        const position = (currentTime / duration) * timelineWidth;
        marker.style.left = `${position}px`;
    }
}

function addPattern() {
    if (startTime === null) {
        alert("음악을 먼저 재생해주세요!");
        return;
    }
    
    const time = audioPlayer.currentTime - startTime; // 음악 시작 이후 시간
    const button = document.getElementById('button').value;

    if (time && button) {
        const patternObject = {
            time: time.toFixed(2), // 소수점 두 자리까지 표시
            button: parseInt(button)
        };
        pattern.push(patternObject);
        displayPattern();
        addPatternToTimeline(patternObject);
    } else {
        alert("버튼을 선택해 주세요!");
    }
}

function displayPattern() {
    const patternDisplay = document.getElementById('patternDisplay');
    patternDisplay.textContent = JSON.stringify(pattern, null, 2);
}

function addPatternToTimeline(patternObject) {
    const patternDiv = document.createElement('div');
    patternDiv.classList.add('pattern');
    patternDiv.style.left = `${(patternObject.time / audioPlayer.duration) * timeline.offsetWidth}px`;
    patternDiv.textContent = `Button ${patternObject.button}`;
    patternDiv.style.position = 'absolute';
    patternDiv.style.top = '30px'; // 패턴의 높이를 약간 조정
    patternDiv.style.backgroundColor = 'rgba(0, 255, 0, 0.7)';
    patternDiv.style.padding = '5px';
    patternDiv.style.borderRadius = '5px';
    patternDiv.style.fontSize = '12px';
    patternDiv.style.cursor = 'pointer';
    
    patternDiv.addEventListener('click', () => {
        alert(`버튼 ${patternObject.button}이 ${patternObject.time}초에 추가되었습니다.`);
    });

    timeline.appendChild(patternDiv);
}

function savePattern() {
    const blob = new Blob([JSON.stringify(pattern, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pattern.json';
    link.click();
}

document.getElementById('btn1').addEventListener('click', () => {
    document.getElementById('button').value = 1;
});

document.getElementById('btn2').addEventListener('click', () => {
    document.getElementById('button').value = 2;
});

document.getElementById('btn3').addEventListener('click', () => {
    document.getElementById('button').value = 3;
});

document.getElementById('btn4').addEventListener('click', () => {
    document.getElementById('button').value = 4;
});
