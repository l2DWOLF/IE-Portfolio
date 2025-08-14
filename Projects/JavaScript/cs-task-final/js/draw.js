
// The draw logic was generated with AI assistance due to time constraints // 

// I will definitely review and learn each line of the code and get familiar with canvas and the Math functions that are new to me :) //

let isRandom = false;
document.getElementById('random-tri-btn').addEventListener('click', generateRandomTriangle);

document.addEventListener("DOMContentLoaded", () =>{
    const urlParams = new URLSearchParams(window.location.search);
    isRandom = urlParams.get("random") === "true";

    if (isRandom) {
        generateRandomTriangle();
    } else {
        drawTriangle();
    };
});

function drawTriangle(){
    const pointsData = localStorage.getItem('trianglePoints');

    if (!pointsData && !isRandom){
        alert('No triangle values found, redirecting to input page :)');
        window.location.href = 'index.html';
        return;
    };

    const p = JSON.parse(pointsData);
    const points = [
        { x: p.x1, y: p.y1 },
        { x: p.x2, y: p.y2 },
        { x: p.x3, y: p.y3 }
    ];

    const canvas = document.querySelector('.generated-triangle');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

// Draw JS Triangle //
    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    ctx.lineTo(points[1].x, points[1].y);
    ctx.lineTo(points[2].x, points[2].y);
    ctx.closePath();
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    ctx.stroke();

// Distance helper
    const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);

// Side lengths
    const a = dist(points[1], points[2]);
    const b = dist(points[0], points[2]);
    const c = dist(points[0], points[1]);

// Angles
    const angleA = Math.acos((b * b + c * c - a * a) / (2 * b * c)) * (180 / Math.PI);
    const angleB = Math.acos((a * a + c * c - b * b) / (2 * a * c)) * (180 / Math.PI);
    const angleC = 180 - angleA - angleB;
    const angles = [angleA, angleB, angleC];

    const angleData = calculateAngleData(points);
// Draw arcs & labels
    angleData.forEach((data, i) => {
        ctx.beginPath();
        ctx.strokeStyle = 'red';
        ctx.arc(data.point.x, data.point.y, 20, data.start, data.end);
        ctx.stroke();

// Draw label
        const labelX = data.point.x + Math.cos(data.midAngle) * 35;
        const labelY = data.point.y + Math.sin(data.midAngle) * 35;

        ctx.fillStyle = 'yellow';
        ctx.font = '16px Arial';
        ctx.fillText(angles[i].toFixed(1) + '°', labelX, labelY);
    });

// Draw CSS Triangle //
    drawCssTriangle(p);
    drawCssAngles(angleData, angles);
};

function calculateAngleData(points) {
    return points.map((pnt, i) => {
        const prev = points[(i + 2) % 3];
        const next = points[(i + 1) % 3];

        const angleToPrev = Math.atan2(prev.y - pnt.y, prev.x - pnt.x);
        const angleToNext = Math.atan2(next.y - pnt.y, next.x - pnt.x);

        let start = angleToPrev;
        let end = angleToNext;
        if (end < start) end += Math.PI * 2;

        const midAngle = (start + end) / 2;

        return { point: pnt, start, end, midAngle };
    });
}

function drawCssTriangle(p){
    const triangle = document.querySelector('.css-triangle');
    triangle.style.setProperty('--x1', p.x1 + 'px');
    triangle.style.setProperty('--y1', p.y1 + 'px');
    triangle.style.setProperty('--x2', p.x2 + 'px');
    triangle.style.setProperty('--y2', p.y2 + 'px');
    triangle.style.setProperty('--x3', p.x3 + 'px');
    triangle.style.setProperty('--y3', p.y3 + 'px');
};

function generateRandomTriangle(){
    const max = 800;
    const min = 50;
    const p = {
        x1: Math.floor(Math.random() * (max - min) + min),
        y1: Math.floor(Math.random() * (max - min) + min),
        x2: Math.floor(Math.random() * (max - min) + min),
        y2: Math.floor(Math.random() * (max - min) + min),
        x3: Math.floor(Math.random() * (max - min) + min),
        y3: Math.floor(Math.random() * (max - min) + min)
    };

    localStorage.setItem('trianglePoints', JSON.stringify(p));
    drawTriangle();
};

function drawCssAngles(angleData, angles){
    const anglesContainer = document.querySelector('.css-angles');
    anglesContainer.innerHTML = ''; 

    angleData.forEach((data, i) => {
        const labelX = data.point.x + Math.cos(data.midAngle) * 35;
        const labelY = data.point.y + Math.sin(data.midAngle) * 35;

        const label = document.createElement('span');
        label.textContent = angles[i].toFixed(1) + '°';
        label.style.left = labelX + 'px';
        label.style.top = labelY + 'px';

        anglesContainer.appendChild(label);
    });
};