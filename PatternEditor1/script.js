let pattern = [];

function addPattern() {
    const time = document.getElementById('time').value;
    const button = document.getElementById('button').value;

    if (time && button) {
        const patternObject = {
            time: parseInt(time),
            button: parseInt(button)
        };
        pattern.push(patternObject);
        displayPattern();
    } else {
        alert("타이밍과 버튼을 모두 입력해주세요!");
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
