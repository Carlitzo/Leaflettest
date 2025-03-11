function renderMap() {
    // const map = L.map('map', {
    //     //minimum/maximum zoom på kartan
    //     minZoom: 1,
    //     maxZoom: 5,
    //     //koordinater för där kartan ska börja (västra hamnen, Latitud sen Longitud)
    //     center: [55.6091, 12.9721],
    //     //start zoomen
    //     zoom: 2,
    //     //anger att ett enkelt koordinatsystem används
    //     crs: L.CRS.Simple
    // });

    // //Definiera var kartbilden ska placeras i kartans kordinatsystem
    // const imageBounds = [[0,0], [1000, 1000]] // bilden ska täcka ett område från 0,0 till 1000,1000
    // const imageURL = 'min-bild.png' //min bilds url

    const mapDiv = document.createElement("div");
    mapDiv.id = "map";
    document.body.appendChild(mapDiv);

    //skapar en Leaflet-karta och kopplar den till 'map'-diven
    const map = L.map('map').setView([55.6091, 12.9721], 13); // koordinater för Västra Hamnen, 13 är zoomnivå

    // lägger till en bakgrundskarta från openstreetmap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
        {
            attribution: `&copy; OpenStreetMap contributors`, //måste finnas med när man använder openstreetmap
            maxZoom: 19 //maximal zoom för kartan (no shit)
        }).addTo(map);

    const marker = L.marker([55.6091, 12.9721]); //lägger till en markör för västra hamnen
    marker.addTo(map); //binder markören till kartan

    navigator.geolocation.watchPosition((position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        console.log(`Spelarens GPS-position: Lat: ${lat}, Lon: ${lon}`);

        L.marker([lat, lon]).addTo(map).bindPopup("Din GPS-location").openPopup();

        map.setView([lat, lon], 15);
    }, {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000
    })
}

renderMap();