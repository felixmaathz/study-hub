import {MapContainer, TileLayer, useMapEvents, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, { useState } from "react";
import ProfilePopup from "../ProfilePopup";
import styles from '../../../styles/clearButton.module.css';

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app, db} from "../../../config/firebaseConfig";
import {collection, getDoc, doc, getDocs} from "firebase/firestore";


//With inspiration from  "https://codesandbox.io/s/how-to-save-marker-location-when-adding-a-marker-with-onclick-on-map-in-react-leaflet-v3x-lghwn?file=/src/MyMap.jsx:0-41"

let yourActiveMarker = null;

export default function Map()  {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [profilePopup, setProfilePopup] = useState(false);

    const auth = getAuth(app);
    const user = auth.currentUser;
    console.log(user)
    let uid = ""

    // onAuthStateChanged(auth, (user) => {
    //     if (user) {
    //         uid = user.uid;
    //         console.log("User is logged in " + uid)
    //         getUserData().then(r => {
    //             console.log("username: " + username+ " email: " + email + " major: " + major)
    //         })
    //
    //     } else {
    //         console.log("User is not logged in")
    //     }
    // });
    //
    // const getUserData = async () => {
    //     console.log(uid)
    //     const docRef = doc(db, "users", uid);
    //     try {
    //         const docSnap = await getDoc(docRef);
    //         if (docSnap.exists()) {
    //             setUsername(docSnap.data().username)
    //             setEmail(docSnap.data().email)
    //             setMajor(docSnap.data().major)
    //
    //         } else {
    //             console.log("Document does not exist")
    //         }
    //
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


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

                if (yourActiveMarker) {
                    yourActiveMarker.remove();
                }

                const { lat, lng } = e.latlng;
                //Your own marker
                yourActiveMarker = L.marker([lat, lng], { icon: yourIcon }).addTo(map).on("click", () => {
                    triggerPopup();
                });
            },
        });

        //Other peoples markers, for now hardcoded markers
        /*const fogenIndustries = [
            ["Glocken", 59.852320, 17.611310],
            ["Fogen", 59.859370, 17.611960],
            ["Simpy", 59.847410, 17.583440],
            ["Ste", 59.862630, 17.648070],
        ];

        for (let i = 0; i < fogenIndustries.length; i++) {
            L.marker([fogenIndustries[i][1], fogenIndustries[i][2]], {icon: theirIcon}).addTo(map).on("click", () => {
                triggerPopup()
                alert(fogenIndustries[i][0])
            });
        }*/

        const removeMyMarker = () => {
            if (yourActiveMarker) {
                yourActiveMarker.remove();
            }
        }

        return(
            <button onClick={removeMyMarker} className={styles.clearMyMarker}>Remove My Marker</button>
        )
    }

    function triggerPopup() {
        setProfilePopup(true);
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
            {/*<ProfilePopup trigger={profilePopup} setTrigger={setProfilePopup} />*/}
            <ProfilePopup trigger={profilePopup} setTrigger={setProfilePopup} data={{
                username: username,
                email: email,
                major: major
            }}/>
        </div>
    );
}



