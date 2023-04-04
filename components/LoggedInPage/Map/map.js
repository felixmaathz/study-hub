import {MapContainer, TileLayer, useMapEvents} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { Component } from "react";



//With inspiration from  "https://codesandbox.io/s/how-to-save-marker-location-when-adding-a-marker-with-onclick-on-map-in-react-leaflet-v3x-lghwn?file=/src/MyMap.jsx:0-41"



const icon = L.icon({
    iconSize: [30, 30],
    iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

function MyComponent() {
    let previousMarker = null;

    const map = useMapEvents({
            click: (e) => {
                if (previousMarker) {
                    previousMarker.remove();
                }
                const { lat, lng } = e.latlng;
                const newMarker = L.marker([lat, lng], { icon }).addTo(map).on("click", function (e) {
                    alert("Anropa popuprutan för profil");});
                    previousMarker= newMarker;
            },
        }
    );
    return null;
}

export default class Map extends Component  {
    render() {
        return (
            <div>
                <MapContainer
                    center={{ lat: 59.85882, lng: 17.63889 }}
                    zoom={15}
                    style={{ height: "100vh", width: "100vw", zIndex: '1' }}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url='https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png'
                    />
                    <MyComponent/>
                </MapContainer>
            </div>
        );
    }
}


