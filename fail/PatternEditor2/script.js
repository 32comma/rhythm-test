let pattern = [];
let audioPlayer = document.getElementById('audioPlayer');
let startTime = null;

audioPlayer.onplay = function() {
    startTime = audioPlayer.currentTime;
};

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
    } else {
        alert("버튼을 선택해 주세요!");
    }
}

function displayPattern() {
    const patternDisplay = document.getElementById('patternDisplay');
    patternDisplay.textContent = JSON.stringify(pattern, null, 2);
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
