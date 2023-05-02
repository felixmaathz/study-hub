import {MapContainer, TileLayer, useMapEvents, Marker} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import React, {useState, useMemo, useRef} from "react";
import ProfilePopup from "../ProfilePopup";
import styles from '../../../styles/map.module.css';

import {getAuth, onAuthStateChanged} from "firebase/auth";
import {app, db} from "../../../config/firebaseConfig";
import {useAuth} from "../../Context/userAuthContext";
import {collection, getDoc, doc, getDocs, updateDoc} from "firebase/firestore";
import OtherUserPopup from "../OtherUserPopup";
import {usePin} from "../../Context/pinContext";


//With inspiration from  "https://codesandbox.io/s/how-to-save-marker-location-when-adding-a-marker-with-onclick-on-map-in-react-leaflet-v3x-lghwn?file=/src/MyMap.jsx:0-41"

let myMarker = null;
let pinsArray = [];

const yourPinnedIcon = new L.Icon({
    iconSize: [35, 35],
    iconUrl: "../images/markerIcons/yourPinnedPin.png",
});

const yourIcon = new L.Icon({
    iconSize: [35, 35],
    iconUrl: "../images/markerIcons/yourPin.png",
});

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
    const [key,setKey] = useState(0)

    const [center, setCenter] = useState([59.85882,17.63889]);
    const [zoom, setZoom] = useState(15);
    const dataFetchedRef = useRef(false);

    const {user, getPins, getDisplayPicture} = useAuth()
    const {userJoined, userLeft} = usePin()

    React.useEffect(() => {
        if (userJoined && userJoined !== user.username){
            console.log("User joined: " + userJoined.username)
            fetchPins().then(r => {
                console.log("pins fetched")
                handleReload()

            })
        }
        if (userLeft && userLeft !== user.username) {
            console.log("User left: " + userLeft.username)
            fetchPins().then(r => {
                console.log("pins fetched")
                handleReload()

            })
        }


    }, [userJoined, userLeft])


    const handleReload = () => {
        console.log("reload")
        const currentCenter = center;
        const currentZoom = zoom;
        setKey(key=>key+1)
        setCenter(currentCenter);
        setZoom(currentZoom);
    }

    const fetchPins = async () => {
        pinsArray = []
        await getPins().then((pins) => {
            console.log(pins)
            pins.forEach((pin) => {
                pinsArray.push(pin)
            })
            console.log("alla pins " + pinsArray)
        })
    }

    function Markers() {
        let userIcon;
       /* const yourIcon = new L.Icon({
            iconSize: [35, 35],
            iconUrl: "../images/markerIcons/yourPinnedPin.png",
        });

        const yourIconTwo = new L.Icon({
            iconSize: [35, 35],
            iconUrl: "../images/markerIcons/WPin.png",
        });*/

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
                },
                moveend: (e) => {
                    const map = e.target;
                    const newCenter = map.getCenter();
                    const newZoom = map.getZoom();

                    localStorage.setItem('mapCenter', JSON.stringify(newCenter));
                    localStorage.setItem('mapZoom', JSON.stringify(newZoom));

                    setCenter(newCenter);
                    setZoom(newZoom);
                    console.log("center saved")
                }
            }
            );
        map.whenReady(async () => {
            if (pinsArray.length === 0) {
                await fetchPins()
            }
            if (pinsArray.length > 0 && !dataFetchedRef.current) {
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
                        userIcon = new L.Icon({
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
                        getDisplayPicture(pin.profilePictureURL).then((r) => {
                                setProfilePicture(r)
                                setOtherUserPopup(true);
                            }
                        )
                    });
                })
            }
        })
        return null;
    }

    const removeMyMarker = async () => {
        myMarker.setIcon(yourIcon)
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
        myMarker.setIcon(yourPinnedIcon)
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

    const clearProfile = () => {
        setUsername("")
        setEmail("")
        setMajor("")
        setCompetencies("")
        setBio("")
        setProfilePictureURL("")
        setProfilePicture("")
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

            <div style={{width: '100%', height: '100%'}}>
                <MapContainer
                    center={center}
                    zoom={zoom}
                    style={{height: "100vh", zIndex: '1'}}
                    zoomOnScroll={false}
                    worldCopyJump={true}
                    minZoom={5}
                    key={key}


                >

                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                        url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
                    />

                    <Markers/>
                </MapContainer>
                <OtherUserPopup
                    trigger={otherUserPopup}
                    setTrigger={setOtherUserPopup}
                    clearProfile={clearProfile}
                    data={{
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



