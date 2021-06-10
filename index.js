mapboxgl.accessToken = 'pk.eyJ1IjoidmlkdXNoaTkwMSIsImEiOiJja3BjaDBkY2YxZG4wMnZwN3plbWZnNWNxIn0.qaKQ5qFzkXNmBKvpo3A48Q';
  var mapboxClient = mapboxSdk({ accessToken: mapboxgl.accessToken });
  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v10',
    zoom: 1,
    center: [0,20]
  });

function updateMap() {
    console.log("Updating map with realtime data")
    const api_url ="https://api.covid19api.com/summary";

    async function getapi(url) {
        const response = await fetch(url);
        var data = await response.json();
        data.Countries.forEach(element => {
          country = element.Country;
          cases = element.NewConfirmed;
          if(cases>100)
          {
            if(cases<3000){
              console.log(cases);
                color = "rgb(255, 0, 0)";     
                mapboxClient.geocoding
                .forwardGeocode({
                    query: country,
                    autocomplete: false,
                    limit: 1
                })
                .send()
                .then(function (response) {
                    var feature = response.body.features[0];
                    center=feature.center;
                    new mapboxgl.Marker({
                      draggable: false,
                  }).setLngLat(feature.center).addTo(map);
                });
            }
            else{
              console.log(cases);
                color = "rgb(255,0,0)";     
                mapboxClient.geocoding
                .forwardGeocode({
                    query: country,
                    autocomplete: false,
                    limit: 1
                })
                .send()
                .then(function (response) {
                    var feature = response.body.features[0];
                    center=feature.center;
                    new mapboxgl.Marker({
                      draggable: false,
                      color: color
                  }).setLngLat(feature.center).addTo(map);
                });
            }
          }
          
})
}
getapi(api_url);
}

let interval = 1000000;
updateMap();
setInterval(updateMap, interval);


