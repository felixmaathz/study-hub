import {MapContainer, TileLayer, useMapEvents, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useState, useMemo } from "react";
import ProfilePopup from "../ProfilePopup";
import styles from '../../../styles/clearButton.module.css';

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app, db} from "../../../config/firebaseConfig";
import {collection, getDoc, doc, getDocs} from "firebase/firestore";
import {useAuth} from "../../Context/userAuthContext";


//With inspiration from  "https://codesandbox.io/s/how-to-save-marker-location-when-adding-a-marker-with-onclick-on-map-in-react-leaflet-v3x-lghwn?file=/src/MyMap.jsx:0-41"

let myMarker = null;

export default function Map()  {


    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [profilePopup, setProfilePopup] = useState(false);
    const [location, setLocation] = useState([]);

    // const auth = getAuth(app);
    // const user = auth.currentUser;
    // console.log(user)
    // let uid = ""

    const { user, getPins } = useAuth()



    function Markers()  {
        const yourIcon = L.icon({
            iconSize: [30, 30],
            iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        });

        const theirIcon = L.icon({
            iconSize: [30, 30],
            iconUrl: "https://cdn-icons-png.flaticon.com/512/9131/9131546.png",
        });
        const map = useMapEvents({
            click: (e) => {

                if (myMarker) {
                    myMarker.remove();
                }

                const { lat, lng } = e.latlng;
                setGeoLocation(lat, lng)

                //Your own marker
                myMarker = L.marker([lat, lng], { icon: yourIcon }).addTo(map).on("click", () => {
                    triggerPopup();
                });

            },
        });

        return null;
    }

    const triggerPopup = ()=> {
        setProfilePopup(true);
    }

    const setGeoLocation = (lat, lng) =>  {
        setLocation([lat, lng])
    }

    const removeMyMarker = ()  => {
       if (myMarker) {
            myMarker.remove();
        }
    }

    const getAllPins = () =>{
        getPins().then((pins) =>{
            console.log(pins)
        })

    }

    return (
        <div>
            <button className={styles.getPinsButton} onClick={getAllPins}>Get pins</button>
            <button className={styles.clearMyMarker} onClick={removeMyMarker}>Clear my marker</button>
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
            <ProfilePopup trigger={profilePopup} setTrigger={setProfilePopup}></ProfilePopup>
        </div>
        </div>
    );
}



