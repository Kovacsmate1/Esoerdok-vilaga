document.addEventListener("DOMContentLoaded", function() {
    
    const maiDatum = new Date();
    
    const formaltDatum = maiDatum.toLocaleDateString('hu-HU');
    
    document.getElementById("aktualis-datum").innerText = formaltDatum;
    
});
