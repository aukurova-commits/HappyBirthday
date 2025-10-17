// Открытие попапов
document.querySelectorAll('.marker').forEach(marker => {
    marker.addEventListener('click', function() {
        const eventId = this.getAttribute('data-event');
        const popup = document.getElementById(eventId);
        if (popup) {
            popup.style.display = 'block';
        }
    });
});

// Закрытие попапов
document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.closest('.event-popup').style.display = 'none';
    });
});

// Закрытие по клику вне попапа
document.querySelectorAll('.event-popup').forEach(popup => {
    popup.addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });
});

// Закрытие по ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.event-popup').forEach(popup => {
            popup.style.display = 'none';
        });
    }
});

// РИСУЕМ ЛИНИИ ЗМЕЙКИ МЕЖДУ МАРКЕРАМИ
function drawSnakeLines() {
    // Удаляем старые SVG перед рисованием новых
    document.querySelectorAll('.map-container svg').forEach(svg => {
        svg.remove();
    });
    
    // Для каждой карты
    document.querySelectorAll('.adventure-map').forEach(map => {
        const markers = Array.from(map.querySelectorAll('.marker'));
        const svgNS = "http://www.w3.org/2000/svg";
        
        // Создаем SVG для линий
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.style.position = 'absolute';
        svg.style.top = '0';
        svg.style.left = '0';
        svg.style.zIndex = '2';
        svg.style.pointerEvents = 'none';
        
        // Рисуем линии между маркерами
        for (let i = 0; i < markers.length - 1; i++) {
            const currentMarker = markers[i];
            const nextMarker = markers[i + 1];
            
            const currentRect = currentMarker.getBoundingClientRect();
            const nextRect = nextMarker.getBoundingClientRect();
            const mapRect = map.getBoundingClientRect();
            
            const currentX = currentRect.left + currentRect.width / 2 - mapRect.left;
            const currentY = currentRect.top + currentRect.height / 2 - mapRect.top;
            const nextX = nextRect.left + nextRect.width / 2 - mapRect.left;
            const nextY = nextRect.top + nextRect.height / 2 - mapRect.top;
            
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute('x1', currentX);
            line.setAttribute('y1', currentY);
            line.setAttribute('x2', nextX);
            line.setAttribute('y2', nextY);
            line.setAttribute('stroke', 'rgba(255,255,255,0.6)');
            line.setAttribute('stroke-width', '2');
            line.setAttribute('stroke-dasharray', '5,3');
            
            svg.appendChild(line);
        }
        
        map.querySelector('.map-container').appendChild(svg);
    });
}

// Добавляем задержку для resize чтобы не было моргания
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(drawSnakeLines, 250);
});

// Запускаем отрисовку линий после загрузки страницы
document.addEventListener('DOMContentLoaded', function() {
    drawSnakeLines();
});

// Также обновляем линии при открытии/закрытии попапов
document.querySelectorAll('.marker').forEach(marker => {
    marker.addEventListener('click', function() {
        setTimeout(drawSnakeLines, 50);
    });
});

document.querySelectorAll('.close-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        setTimeout(drawSnakeLines, 50);
    });
});