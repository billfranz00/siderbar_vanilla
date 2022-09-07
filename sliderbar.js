const intervals = document.querySelector('.interval'),
    intervalArray = [],
    thumb = document.querySelector('.thumb');
let intervalPosition = -20,
    startingXPosition = 0,
    xPosition = 0,
    targetInterval;

for (let i = 0; i < 12; i++) {
    intervals.innerHTML += (
        `<li
            data-position="${intervalPosition}"
            data-number="${i}"
            class="interval__dash${i > 9 ? ' interval__dash--margin-left' : ''}">
            |
        </li>`
    );
    intervalArray.push(intervalPosition);
    intervalPosition += 40;
}
thumb.addEventListener('mousedown', startMove);

function startMove(e) {
    e.preventDefault();
    if (targetInterval) {
        targetInterval.classList.remove('interval__dash--selected');
    }
    xPosition = e.target.offsetLeft;
    startingXPosition = e.pageX - xPosition;
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', stopMove);
}

function onMove(e) {
    xPosition = e.pageX - startingXPosition;
    if (xPosition > 420) {
        thumb.style.left = '420px';
    } else if (xPosition < -20) {
        thumb.style.left = '-20px';
    } else {
        thumb.style.left = xPosition + 'px';
    }
}

function stopMove() {
    xPosition = intervalArray.reduce((prev, curr) =>
        Math.abs(curr - xPosition) < Math.abs(prev - xPosition) ? curr : prev);
    targetInterval = Array.prototype.find.call(
        document.querySelectorAll('.interval__dash'),
            dash => Number(dash.dataset.position) === xPosition);
    thumb.style.left = xPosition + 'px';
    targetInterval.classList.add('interval__dash--selected');
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', stopMove);
}
