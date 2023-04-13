import {MapContainer, TileLayer, useMapEvents, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useState } from "react";
import ProfilePopup from "../ProfilePopup";
import styles from '../../../styles/clearButton.module.css';


//With inspiration from  "https://codesandbox.io/s/how-to-save-marker-location-when-adding-a-marker-with-onclick-on-map-in-react-leaflet-v3x-lghwn?file=/src/MyMap.jsx:0-41"


export default function Map()  {

    const [profilePopup, setProfilePopup] = useState(false);

    const yourIcon = L.icon({
        iconSize: [30, 30],
        iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
    });

    const theirIcon = L.icon({
        iconSize: [30, 30],
        iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131546.png",
    });



    function Markers()  {
        let yourPreviousMarker = null;

        const map = useMapEvents({
            click: (e) => {
                if (yourPreviousMarker) {
                    yourPreviousMarker.remove();
                }

                const { lat, lng } = e.latlng;
                //Your own marker
                let yourMarker = L.marker([lat, lng], { icon: yourIcon }).addTo(map)
                yourPreviousMarker = yourMarker;
                yourMarker.on("click", () => {
                    alert("You clicked on your own marker");
                    setProfilePopup(true);
                    yourMarker.remove()

                });
                yourPreviousMarker = yourMarker;
            },
        });

        //Other peoples markers, for now hardcoded markers
        const locations = [
            ["LOCATION_1", 59.852320, 17.611310],
            ["LOCATION_2", 59.859370, 17.611960],
            ["LOCATION_3", 59.847410, 17.583440],
            ["LOCATION_4", 59.862630, 17.648070],
        ];

        for (let i = 0; i < locations.length; i++) {
            L.marker([locations[i][1], locations[i][2]], {icon: theirIcon}).addTo(map).on("click", () => {
                alert("You clicked on somebodys marker");
                setProfilePopup(true);
            });
        }

        const removeMyMarker = () => {
            if (yourPreviousMarker) {
                yourPreviousMarker.remove();
            }
        }

        return(
            <button onClick={removeMyMarker} className={styles.clearMyMarker}>Remove My Marker</button>
        )
    }


    return (
        <div>
            <MapContainer
                center={{ lat: 59.85882, lng: 17.63889 }}
                zoom={15}
                style={{ height: "100vh", zIndex: '1' }}
                zoomOnScroll={false}>

                <TileLayer
                    attribution= '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                    url= 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'/>

                <Markers/>
            </MapContainer>
            <ProfilePopup trigger={profilePopup} setTrigger={setProfilePopup}/>
        </div>
    );
}



