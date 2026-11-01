
async function myMap() {

    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } =
        await google.maps.importLibrary("marker");

    const esoerdok = [
        {
            nev: "Amazonas esőerdő",
            hely: { lat: -3.4653, lng: -62.2159 }
        },
        {
            nev: "Kongói esőerdő",
            hely: { lat: -0.2280, lng: 20.8800 }
        },
        {
            nev: "Délkelet-ázsiai esőerdő",
            hely: { lat: 0.7893, lng: 113.9213 }
        },
        {
            nev: "Daintree esőerdő",
            hely: { lat: -16.1700, lng: 145.4180 }
        },
        {
            nev: "Valdiviai mérsékelt övi esőerdő",
            hely: { lat: -40.0000, lng: -73.0000 }
        },
        {
            nev: "Madagaszkári esőerdő",
            hely: { lat: -18.7669, lng: 46.8691 }
        }
    ];

    const terkep = new Map(
        document.getElementById("googleMap"),
        {
            center: { lat: 0, lng: 20 },
            zoom: 2,
            mapId: "DEMO_MAP_ID",
            mapTypeId: "hybrid"
        }
    );

    esoerdok.forEach(esoerdo => {

        const marker = new AdvancedMarkerElement({
            map: terkep,
            position: esoerdo.hely,
            title: esoerdo.nev
        });

    });

}

window.myMap = myMap;
