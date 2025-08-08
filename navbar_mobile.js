document.addEventListener("DOMContentLoaded", function() {
    let bars = document.querySelector('.bars');
    let close = document.querySelector('.close');
    let nav = document.querySelector('nav');

    bars.addEventListener('click', function () {
        bars.style.display = 'none';
        close.style.display = 'flex';
        nav.style.display = 'block';
        setTimeout(() => {
            nav.classList.add('active');
        }, 10); // Kis késleltetés az animáció elindításához
    });

    close.addEventListener('click', function () {
        bars.style.display = 'flex';
        close.style.display = 'none';
        nav.classList.remove('active');
        nav.addEventListener('transitionend', function() {
            if (!nav.classList.contains('active')) { //ha az aktív osztály nincs rajta
                nav.style.display = 'none';
            }
        }, { once: true }); // Csak egyszer fut le az eseménykezelő
    });

    
});