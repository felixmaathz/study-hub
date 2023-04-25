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
const pinsArray = []


export default function Map() {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [major, setMajor] = useState("");
    const [competencies, setCompetencies] = useState([]);
    const [bio, setBio] = useState("");
    const [profilePictureURL, setProfilePictureURL] = useState("")
    const [profilePicture, setProfilePicture] = useState("")

    const [profilePopup, setProfilePopup] = useState(false);
    const [otherUserPopup, setOtherUserPopup] = useState(false);
    const [location, setLocation] = useState([]);

    const [isPinned, setIsPinned] = useState(null);
    const {user, getPins,getDisplayPicture} = useAuth()

    React.useEffect(() => {
        if(user.location.length > 0){
            console.log("User is pinned")
        }else{
            console.log("User is not pinned")
        }


    }, [])


    function Markers() {
        let userIcon;

        const yourIcon = L.icon({
            iconSize: [35, 35],
            iconUrl: "../images/markerIcons/yourPin.png",
        });

        const map = useMapEvents(
            {
                click: (e) => {

                    if (!isPinned) {
                        if (myMarker) {
                            myMarker.remove();
                        }

                        const {lat, lng} = e.latlng;
                        setLocation([lat, lng])
                        console.log("your position is: " + location)

                        //Your own marker
                        myMarker = L.marker([lat, lng], {icon: yourIcon}).addTo(map)

                        setIsPinned(false)
                    }
                }
            });
        map.whenReady(async() => {

            if (pinsArray.length === 0) {
                await getPins().then((pins) => {
                    console.log(pins)
                    pins.forEach((pin) => {
                        pinsArray.push(pin)
                    })
                    console.log("alla pins " + pinsArray)
                })
            }

            if (pinsArray.length > 0) {
                pinsArray.forEach((pin) => {
                    if (pin.major === "E") {
                        userIcon = new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/EPin.png",
                        });
                    }
                    if (pin.major === "ES") {
                        userIcon = new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/ESPin.png",
                        });
                    }
                    if (pin.major === "F") {
                        userIcon = new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/FPin.png",
                        });
                    }
                    if (pin.major === "I") {
                        userIcon = new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/IPin.png",
                        });
                    }
                    if (pin.major === "IT") {
                        userIcon = new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/ITPin.png",
                        });
                    }
                    if (pin.major === "K") {
                        userIcon = new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/KPin.png",
                        });
                    }
                    if (pin.major === "Other") {
                        userIcon = new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/OtherPin.png",
                        });
                    }
                    if (pin.major === "Q") {
                        userIcon = new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/QPin.png",
                        });
                    }
                    if (pin.major === "STS") {
                        userIcon = new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/STSPin.png",
                        });
                    }
                    if (pin.major === "W") {
                        userIcon =new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/WPin.png",
                        });
                    }
                    if (pin.major === "X") {
                        userIcon = new L.Icon({
                            iconSize: [35, 35],
                            iconUrl: "../images/markerIcons/XPin.png",
                        });
                    }

                    L.marker(pin.location, {icon: userIcon}).addTo(map).on("click", () => {
                        console.log("User: " + pin.username)
                        setUsername(pin.username)
                        setEmail(pin.email)
                        setMajor(pin.major)
                        setCompetencies(pin.competencies)
                        setBio(pin.bio)
                        setProfilePictureURL(pin.profilePictureURL)
                        if (pin.profilePictureURL === undefined || pin.profilePictureURL === "") {
                            setProfilePicture("/images/profile.png")
                        } else {
                            setProfilePictureURL(pin.profilePictureURL)
                            getDisplayPicture(pin.profilePictureURL).then((r)=>
                                setProfilePicture(r)
                            )
                        }
                        setOtherUserPopup(true);
                    });
                })
            }
        })
        return null;
    }

    const removeMyMarker = async () => {
        if (myMarker) {
            myMarker.remove();
        }
        const uid = user.uid;
        const docRef = await updateDoc(doc(db, "users", uid), {
            location: []
        })
        setIsPinned(false);
    }

    const saveMarkerPosition = async () => {
        console.log("your position is: " + location)
        const uid = user.uid
        const docRef = await updateDoc(doc(db, "users", uid), {
            location: location
        })
        setIsPinned(true);
    }

    function handleClick() {
        if (isPinned) {
            removeMyMarker();
        } else {
            saveMarkerPosition();
        }
    }

    const getAllPins = () => {
        getPins().then((pins) => {
            console.log(pins)
        })
    }
    return (
        <div>
            <div className={styles.buttonMarkers}>
                {(isPinned !== null) ?
                    <button
                        className={styles.setMyMarker}
                        onClick={handleClick}>
                        <h3>{isPinned ? 'Unpin me!' : 'Pin me!'}</h3>
                    </button>
                    : null}
            </div>

            <div>
                <MapContainer
                    center={{lat: 59.85882, lng: 17.63889}}
                    zoom={15}
                    style={{height: "100vh", zIndex: '1'}}
                    zoomOnScroll={false}>

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'/>

                    <Markers userMarkers={pinsArray}/>
                </MapContainer>
                <OtherUserPopup trigger={otherUserPopup} setTrigger={setOtherUserPopup} data={{
                    username: username
                    , major: major
                    , email: email
                    , competencies: competencies
                    , bio: bio
                    , profilePictureURL: profilePictureURL
                }}/>
            </div>
        </div>
    );
}



