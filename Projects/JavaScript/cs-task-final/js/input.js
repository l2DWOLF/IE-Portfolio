

const form = document.querySelector('.triangle-form');
localStorage.removeItem('trianglePoints');

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const points = {
        x1: +document.getElementById('x1').value,
        y1: +document.getElementById('y1').value,
        x2: +document.getElementById('x2').value,
        y2: +document.getElementById('y2').value,
        x3: +document.getElementById('x3').value,
        y3: +document.getElementById('y3').value
    };
    localStorage.setItem('trianglePoints', JSON.stringify(points));
    window.location.href = 'display.html';
});