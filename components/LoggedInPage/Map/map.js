import {MapContainer, TileLayer, useMapEvents, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, {useState, useMemo} from "react";
import ProfilePopup from "../ProfilePopup";
import styles from '../../../styles/clearButton.module.css';

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app, db} from "../../../config/firebaseConfig";
import {useAuth} from "../../Context/userAuthContext";
import {collection, getDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import OtherUserPopup from "../OtherUserPopup";


//With inspiration from  "https://codesandbox.io/s/how-to-save-marker-location-when-adding-a-marker-with-onclick-on-map-in-react-leaflet-v3x-lghwn?file=/src/MyMap.jsx:0-41"

let myMarker = null;

export default function Map() {

    const [username, setUsername] = useState("");
    const [major, setMajor] = useState("");
    const [email, setEmail] = useState("");

    const [profilePopup, setProfilePopup] = useState(false);
    const [otherUserPopup, setOtherUserPopup] = useState(false);
    const [location, setLocation] = useState([]);
    const {user, getPins} = useAuth()
    const pinsArray = []

    React.useEffect(() => {
        getPins().then((pins) => {
            console.log(pins)
            pins.forEach((pin) => {
                pinsArray.push(pin)
            })
            console.log(pinsArray)
        })
    }, [])


    function Markers() {
        const yourIcon = L.icon({
            iconSize: [30, 30],
            iconUrl: "https://cdn-icons-png.flaticon.com/512/447/447031.png",
        });

        const map = useMapEvents(
            {
                click: (e) => {

                    if (myMarker) {
                        myMarker.remove();
                    }

                    if (pinsArray.length > 0) {
                        pinsArray.forEach((pin) => {
                            L.marker(pin.location, {icon: yourIcon}).addTo(map).on("click", () => {
                                console.log("User: "+pin.username)
                                setUsername(pin.username)
                                setEmail(pin.email)
                                setMajor(pin.major)
                                setOtherUserPopup(true);
                            });
                        })
                    }

                    const {lat, lng} = e.latlng;
                    setLocation([lat, lng])
                    console.log("your position is: " + location)

                    //Your own marker
                    myMarker = L.marker([lat, lng], {icon: yourIcon}).addTo(map).on("click", () => {
                        triggerPopup();
                    });

                },
            }
        );

        return null;
    }

    const triggerPopup = () => {
        setProfilePopup(true);
    }


    const removeMyMarker = async () => {
        if (myMarker) {
            myMarker.remove();
        }
        const uid = user.uid;
        const docRef = await updateDoc(doc(db, "users", uid), {
            location: []
        })
    }

    const saveMarkerPosition = async () => {
        console.log("your position is: " + location)
        const uid = user.uid
        const docRef = await updateDoc(doc(db, "users", uid), {
            location: location
        })
    }

    // const placePins = (pinsArray) => {
    //     pinsArray.forEach((pin) => {
    //         L.marker(pin).addTo(map)
    //     })
    // }
    //

    return (
        <div>
            {/*<button className={styles.getPinsButton} onClick={getAllPins}>Get pins</button>*/}
            <button className={styles.clearMyMarker} onClick={removeMyMarker}>Clear my marker</button>
            <button className={styles.setMyMarker} onClick={saveMarkerPosition}>Save marker position< /button>
            <div>
                <MapContainer
                    center={{lat: 59.85882, lng: 17.63889}}
                    zoom={15}
                    style={{height: "100vh", zIndex: '1'}}
                    zoomOnScroll={false}>

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'/>

                    <Markers/>
                </MapContainer>
                <OtherUserPopup trigger={otherUserPopup} setTrigger={setOtherUserPopup} data={{
                    username: username
                    , major: major
                    , email: email
                }}></OtherUserPopup>
                <ProfilePopup trigger={profilePopup} setTrigger={setProfilePopup}></ProfilePopup>
            </div>
        </div>
    );
}



