document.addEventListener("DOMContentLoaded", function () {
    const datumElem = document.getElementById("aktualis-datum");
    if (datumElem) {
        const maiDatum = new Date();
        datumElem.innerText = maiDatum.toLocaleDateString('hu-HU');
    }
});
