document.addEventListener('DOMContentLoaded', () => {
    const kerdesek = [
        {
            kerdes: "Melyik állat a világ legnagyobb rágcsálója?",
            kategoria: "Emlősök",
            opciok: ["Jaguár", "Kapibara", "Lajhár", "Gyűrűsfarkú maki"],
            helyes: 1,
            leiras: "A kapibara (vízidisznó) Dél-Amerika esőerdeiben és vizes élőhelyein él, súlya a 65 kg-ot is elérheti."
        },
        {
            kerdes: "Melyik a világ legnagyobb virága?",
            kategoria: "Növényvilág",
            opciok: ["Orchidea", "Bromélia", "Rafflesia", "Óriás-tündérrózsa"],
            helyes: 2,
            leiras: "A Rafflesia arnoldii átmérője elérheti az 1 métert, kellemetlen szaga a döglegyeket vonzza a beporzáshoz."
        },
        {
            kerdes: "Melyik madár képes hátrafelé is repülni?",
            kategoria: "Madarak",
            opciok: ["Ara papagáj", "Tarka tukán", "Hárpiasas", "Smaragd kolibri"],
            helyes: 3,
            leiras: "A kolibrik különleges szárnyízülete lehetővé teszi, hogy hátrafelé, fejjel lefelé és egy helyben lebegve is repüljenek."
        },
        {
            kerdes: "Milyen magasra nőhet meg a kapokfa?",
            kategoria: "Növényvilág",
            opciok: ["30 méterre", "50 méterre", "70 méterre", "100 méterre"],
            helyes: 2,
            leiras: "A kapokfa (gyapokfa) az esőerdő lombkoronája fölé magasodó emergensek közé tartozik, akár 70 méter magasra is megnő."
        },
        {
            kerdes: "Melyik állat bundájában telepednek meg apró algák?",
            kategoria: "Emlősök",
            opciok: ["Háromujjú lajhár", "Bengáli tigris", "Kapibara", "Jaguár"],
            helyes: 0,
            leiras: "A lajhár lassú mozgása és a párás környezet kedvez az algáknak, melyek zöldes árnyalatot adva rejtik el az állatot a ragadozók elől."
        },
        {
            kerdes: "Hogyan ejti csapdába a rovarokat a kancsóka?",
            kategoria: "Húsevő növények",
            opciok: [
                "Ragacsos virágaival",
                "Csőszerű leveleivel",
                "Tüskés száraival",
                "Nagy leveleivel"
            ],
            helyes: 1,
            leiras: "A kancsóka levelei csúszós belső falú edényekké alakultak, melyek alján emésztőnedv bontja le a csapdába esett rovarokat."
        },
        {
            kerdes: "Melyik állat képes külön-külön forgatni a szemeit?",
            kategoria: "Hüllők",
            opciok: ["Zöld leguán", "Párduckaméleon", "Levelibéka", "Kvézál"],
            helyes: 1,
            leiras: "A kaméleon szemei egymástól teljesen függetlenül mozognak, így egyszerre figyelheti a zsákmányt és pásztázhatja a környezetét."
        },
        {
            kerdes: "Mit gyűjtenek a broméliák a levélrózsáikban?",
            kategoria: "Növényvilág",
            opciok: ["Homokot", "Nektárt", "Esővizet", "Leveleket"],
            helyes: 2,
            leiras: "A broméliák tölcsérszerű levélrózsája összegyűjti az esővizet, valóságos mini élőhelyet teremtve békák és rovarok számára."
        },
        {
            kerdes: "Milyen messzire hallatszik el a vörös bőgőmajom hangja?",
            kategoria: "Emlősök",
            opciok: [
                "500 méterre",
                "1 kilométerre",
                "5 kilométerre",
                "10 kilométerre"
            ],
            helyes: 2,
            leiras: "A vörös bőgőmajom megnagyobbodott nyelvcsontja rezonátorként működik, mély hangja akár 5 kilométeres távolságba is elhallatszik."
        },
        {
            kerdes: "Melyik folyóban található az óriás-tündérrózsa?",
            kategoria: "Növényvilág",
            opciok: ["Nílus", "Amazonas", "Duna", "Mississippi"],
            helyes: 1,
            leiras: "A Victoria amazonica az Amazonas sekély vizeiben él, hatalmas, peremes levelei akár 3 méteres átmérőt is elérhetnek."
        }
    ];

    let jelenlegiIndex = 0;
    const valaszok = new Array(kerdesek.length).fill(null);

    const kerdesSzamlalo = document.getElementById('kerdes-szamlalo');
    const szazalekJelzo = document.getElementById('szazalek-jelzo');
    const folyamatjelzo = document.getElementById('folyamatjelzo');
    const kerdesKontener = document.getElementById('kerdes-kontener');
    const kvizFigyelmeztetes = document.getElementById('kviz-figyelmeztetes');
    const gombVissza = document.getElementById('gomb-vissza');
    const gombTovabb = document.getElementById('gomb-tovabb');
    const kvizVezerlok = document.getElementById('kviz-vezerlok');
    const eredmenyKontener = document.getElementById('eredmeny-kontener');
    const quizHeader = document.querySelector('.quiz-header');

    const szamok = ['1', '2', '3', '4'];

    function kerdesBetoltes(index) {
        const adat = kerdesek[index];

        kerdesSzamlalo.innerHTML = `<i class="fa-solid fa-compass"></i> Kérdés ${index + 1} / ${kerdesek.length}`;
        const szazalek = Math.round(((index + 1) / kerdesek.length) * 100);
        szazalekJelzo.textContent = `${szazalek}%`;
        folyamatjelzo.style.width = `${szazalek}%`;

        kvizFigyelmeztetes.style.display = 'none';

        if (index > 0) {
            gombVissza.style.display = 'inline-flex';
        } else {
            gombVissza.style.display = 'none';
        }

        if (index === kerdesek.length - 1) {
            gombTovabb.innerHTML = `<span>Befejezés</span> <i class="fa-solid fa-flag-checkered"></i>`;
        } else {
            gombTovabb.innerHTML = `<span>Következő</span> <i class="fa-solid fa-arrow-right"></i>`;
        }

        let opciokHtml = '';
        adat.opciok.forEach((opcio, opcioIdx) => {
            const vanKivalasztva = valaszok[index] === opcioIdx;
            opciokHtml += `
                <div class="quiz-option ${vanKivalasztva ? 'active' : ''}" data-idx="${opcioIdx}" role="button" tabindex="0">
                    <span class="quiz-option-letter">${szamok[opcioIdx]}</span>
                    <span class="quiz-option-text">${opcio}</span>
                    <span class="quiz-option-radio">
                        ${vanKivalasztva ? '<i class="fa-solid fa-check"></i>' : ''}
                    </span>
                </div>
            `;
        });

        kerdesKontener.innerHTML = `
            <div class="quiz-question-wrapper">
                <span class="quiz-category-tag">
                    <i class="fa-solid fa-tag"></i> ${adat.kategoria}
                </span>
                <h2 class="quiz-question-title">${adat.kerdes}</h2>
                <div class="quiz-options-list">
                    ${opciokHtml}
                </div>
            </div>
        `;

        const opcioElemek = kerdesKontener.querySelectorAll('.quiz-option');
        opcioElemek.forEach(elem => {
            const kattintasKezelo = () => {
                const kivalasztottIdx = parseInt(elem.getAttribute('data-idx'), 10);
                valaszKivalasztas(kivalasztottIdx);
            };

            elem.addEventListener('click', kattintasKezelo);
            elem.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    kattintasKezelo();
                }
            });
        });
    }

    function valaszKivalasztas(opcioIdx) {
        valaszok[jelenlegiIndex] = opcioIdx;
        kvizFigyelmeztetes.style.display = 'none';

        const opcioElemek = kerdesKontener.querySelectorAll('.quiz-option');
        opcioElemek.forEach((elem, idx) => {
            const radio = elem.querySelector('.quiz-option-radio');
            if (idx === opcioIdx) {
                elem.classList.add('active');
                radio.innerHTML = '<i class="fa-solid fa-check"></i>';
            } else {
                elem.classList.remove('active');
                radio.innerHTML = '';
            }
        });
    }

    gombTovabb.addEventListener('click', () => {
        if (valaszok[jelenlegiIndex] === null) {
            kvizFigyelmeztetes.style.display = 'flex';
            const doboz = kerdesKontener.querySelector('.quiz-options-list');
            if (doboz) {
                doboz.animate([
                    { transform: 'translateX(0)' },
                    { transform: 'translateX(-6px)' },
                    { transform: 'translateX(6px)' },
                    { transform: 'translateX(-6px)' },
                    { transform: 'translateX(0)' }
                ], { duration: 350, easing: 'ease' });
            }
            return;
        }

        if (jelenlegiIndex < kerdesek.length - 1) {
            jelenlegiIndex++;
            kerdesBetoltes(jelenlegiIndex);
        } else {
            eredmenyMegjelenites();
        }
    });

    gombVissza.addEventListener('click', () => {
        if (jelenlegiIndex > 0) {
            jelenlegiIndex--;
            kerdesBetoltes(jelenlegiIndex);
        }
    });

    function eredmenyMegjelenites() {
        quizHeader.style.display = 'none';
        kerdesKontener.style.display = 'none';
        kvizVezerlok.style.display = 'none';
        kvizFigyelmeztetes.style.display = 'none';

        let helyesDb = 0;
        kerdesek.forEach((k, idx) => {
            if (valaszok[idx] === k.helyes) {
                helyesDb++;
            }
        });

        const szazalek = Math.round((helyesDb / kerdesek.length) * 100);
        const hibasDb = kerdesek.length - helyesDb;

        let cim;
        let uzenet;
        let jelvenyIkon = 'fa-trophy';

        if (szazalek === 100) {
            cim = "Tökéletes! Esőerdő Szakértő vagy! 🌟";
            uzenet = "Kivételes tudás! Mind a 10 kérdésre hibátlanul válaszoltál, a trópusi esőerdők mestere vagy!";
            jelvenyIkon = 'fa-crown';
        } else if (szazalek >= 80) {
            cim = "Fantasztikus Természetbúvár! 🌿";
            uzenet = "Nagyszerű teljesítmény! Nagyon jól ismered az esőerdők különleges növény- és állatvilágát!";
            jelvenyIkon = 'fa-award';
        } else if (szazalek >= 60) {
            cim = "Ügyes Felfedező! 🦜";
            uzenet = "Szép eredmény! Már most sokat tudsz erről a lenyűgöző élőhelyről, érdemes még bővíteni a tudásodat!";
            jelvenyIkon = 'fa-medal';
        } else if (szazalek >= 40) {
            cim = "Kezdő Utazó! 🌱";
            uzenet = "Jó kezdet! Érdemes átolvasnod az állatok és növények bemutató oldalainkat, hogy még magabiztosabb legyél!";
            jelvenyIkon = 'fa-compass';
        } else {
            cim = "Bátor Kalandor! 🧭";
            uzenet = "Ne csüggedj! Nézd át újra az oldalaink érdekes leírásait, majd próbáld meg újra a kvízt!";
            jelvenyIkon = 'fa-rotate-right';
        }

        let attekintesHtml = '';
        kerdesek.forEach((k, idx) => {
            const adottValaszIdx = valaszok[idx];
            const joValasz = adottValaszIdx === k.helyes;
            const adottValaszSzoveg = k.opciok[adottValaszIdx];
            const helyesValaszSzoveg = k.opciok[k.helyes];

            attekintesHtml += `
                <div class="quiz-review-item ${joValasz ? 'is-correct' : 'is-wrong'}">
                    <div class="quiz-review-header">
                        <h4 class="quiz-review-question">${idx + 1}. ${k.kerdes}</h4>
                        <span class="quiz-review-status-badge">
                            ${joValasz ? '<i class="fa-solid fa-check"></i> Helyes' : '<i class="fa-solid fa-xmark"></i> Téves'}
                        </span>
                    </div>
                    <div class="quiz-review-answers">
                        <div class="review-row">
                            <span class="review-label">Te válaszod:</span>
                            <span class="review-val ${joValasz ? 'correct' : 'wrong'}">${adottValaszSzoveg}</span>
                        </div>
                        ${!joValasz ? `
                            <div class="review-row">
                                <span class="review-label">Helyes válasz:</span>
                                <span class="review-val correct">${helyesValaszSzoveg}</span>
                            </div>
                        ` : ''}
                    </div>
                    <p class="quiz-review-fact">
                        <i class="fa-solid fa-lightbulb"></i> <strong>Tudtad?</strong> ${k.leiras}
                    </p>
                </div>
            `;
        });

        eredmenyKontener.innerHTML = `
            <div class="quiz-results-badge">
                <i class="fa-solid ${jelvenyIkon}"></i>
            </div>
            <h2 class="quiz-results-title">${cim}</h2>
            <p class="quiz-results-message">${uzenet}</p>

            <div class="quiz-score-circle">
                <div class="quiz-score-value">${helyesDb} / ${kerdesek.length}</div>
                <div class="quiz-score-percent">${szazalek}% helyes válasz</div>
            </div>

            <div class="quiz-stats-grid">
                <div class="quiz-stat-box stat-correct">
                    <i class="fa-solid fa-circle-check"></i>
                    <span class="quiz-stat-num">${helyesDb}</span>
                    <span class="quiz-stat-label">Helyes válasz</span>
                </div>
                <div class="quiz-stat-box stat-wrong">
                    <i class="fa-solid fa-circle-xmark"></i>
                    <span class="quiz-stat-num">${hibasDb}</span>
                    <span class="quiz-stat-label">Téves válasz</span>
                </div>
                <div class="quiz-stat-box stat-total">
                    <i class="fa-solid fa-chart-pie"></i>
                    <span class="quiz-stat-num">${szazalek}%</span>
                    <span class="quiz-stat-label">Pontosság</span>
                </div>
            </div>

            <div class="quiz-review-section">
                <button type="button" class="quiz-review-toggle" id="attekintes-kapcsolo">
                    <span><i class="fa-solid fa-list-check"></i> Válaszok áttekintése</span>
                    <i class="fa-solid fa-chevron-down toggle-arrow"></i>
                </button>
                <div class="quiz-review-list" id="attekintes-lista" style="display: none;">
                    ${attekintesHtml}
                </div>
            </div>

            <div class="quiz-actions">
                <button type="button" class="quiz-btn quiz-btn-primary" id="gomb-ujrakezdes">
                    <i class="fa-solid fa-rotate-right"></i> <span>Újrakezdés</span>
                </button>
                <a href="allatok.html" class="quiz-pill-link">
                    <i class="fa-solid fa-paw"></i> <span>Állatok felfedezése</span>
                </a>
                <a href="novenyek.html" class="quiz-pill-link">
                    <i class="fa-solid fa-leaf"></i> <span>Növények felfedezése</span>
                </a>
            </div>
        `;

        eredmenyKontener.style.display = 'block';

        const attekintesKapcsolo = document.getElementById('attekintes-kapcsolo');
        const attekintesLista = document.getElementById('attekintes-lista');
        if (attekintesKapcsolo && attekintesLista) {
            attekintesKapcsolo.addEventListener('click', () => {
                const nyitva = attekintesLista.style.display === 'block';
                attekintesLista.style.display = nyitva ? 'none' : 'block';
                attekintesKapcsolo.classList.toggle('open', !nyitva);
            });
        }

        const gombUjra = document.getElementById('gomb-ujrakezdes');
        if (gombUjra) {
            gombUjra.addEventListener('click', () => {
                kvizUjrainditas();
            });
        }

        document.getElementById('quiz-doboz').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    function kvizUjrainditas() {
        jelenlegiIndex = 0;
        valaszok.fill(null);

        eredmenyKontener.style.display = 'none';
        eredmenyKontener.innerHTML = '';

        quizHeader.style.display = 'block';
        kerdesKontener.style.display = 'block';
        kvizVezerlok.style.display = 'flex';

        kerdesBetoltes(0);
        document.getElementById('quiz-doboz').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    kerdesBetoltes(0);
});
