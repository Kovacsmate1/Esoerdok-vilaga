document.addEventListener('DOMContentLoaded', () => {
    const filterCards = document.querySelectorAll('.filter-card');
    const animalCards = document.querySelectorAll('.animal-card');
    const subtitle = document.querySelector('.animals-section .section-subtitle');
    const resetBtn = document.getElementById('reset-filter-btn');

    function szures(kategoria) {
        filterCards.forEach(card => {
            if (card.dataset.filter === kategoria) {
                card.classList.add('active');
            } else {
                card.classList.remove('active');
            }
        });

        animalCards.forEach(card => {
            if (kategoria === 'all' || card.dataset.category === kategoria) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.classList.remove('filter-hidden');
                }, 10);
            } else {
                card.classList.add('filter-hidden');
                card.style.display = 'none';
            }
        });

        if (subtitle) {
            const nevek = {
                emlosok: 'Emlősök (6 faj)',
                hullok: 'Hüllők és kétéltűek (6 faj)',
                madarak: 'Madarak (6 faj)',
                izeltlabuak: 'Ízeltlábúak (6 faj)',
                all: 'Összes faj (24 faj)'
            };
            subtitle.textContent = 'Kiválasztott kategória: ' + (nevek[kategoria] || kategoria);
        }
    }

    filterCards.forEach(card => {
        card.addEventListener('click', () => {
            szures(card.dataset.filter);
            const lista = document.getElementById('allatok-lista');
            if (lista) {
                lista.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            szures('all');
            filterCards.forEach(c => c.classList.remove('active'));
        });
    }

    szures('emlosok');
});
