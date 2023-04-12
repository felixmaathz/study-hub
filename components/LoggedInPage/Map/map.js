import {MapContainer, TileLayer, useMapEvents, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { Component, useState } from "react";
import ProfilePopup from "../ProfilePopup";



//With inspiration from  "https://codesandbox.io/s/how-to-save-marker-location-when-adding-a-marker-with-onclick-on-map-in-react-leaflet-v3x-lghwn?file=/src/MyMap.jsx:0-41"





export default function Map()  {
    const [profilePopup, setProfilePopup] = useState(false);

    const icon = L.icon({
        iconSize: [30, 30],
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    });

    function MyComponent() {
        let previousMarker = null;

        const map = useMapEvents({
                click: (e) => {
                    if (previousMarker) {
                        previousMarker.remove();
                    }
                    const { lat, lng } = e.latlng;
                    const newMarker = L.marker([lat, lng], { icon }).addTo(map).on("click", () => {
                        alert("Marker clicked");
                        setProfilePopup(true);
                        newMarker.remove();
                    });
                    previousMarker= newMarker;
                },
            }
        );
        return null;
    }

        return (
            <div>
                <MapContainer
                    center={{ lat: 59.85882, lng: 17.63889 }}
                    zoom={15}
                    style={{ height: "100vh", zIndex: '1' }}

                    zoomOnScroll={false}>

                    {/*<Marker position={{ lat: 59.85882, lng: 17.63889 }} icon={icon}/>*/}

                    <TileLayer
                        attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url= 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
                    />
                    <MyComponent/>
                    </MapContainer>
                    <ProfilePopup trigger={profilePopup} setTrigger = {setProfilePopup}/>
            </div>
        );
}


