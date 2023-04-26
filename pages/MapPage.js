import React, {useState} from "react";
import Map from "../components/LoggedInPage/Map/map_ssr";
import {PinContextProvider} from "../components/Context/pinContext";

function MapPage() {


    return (
        <PinContextProvider>
            <Map/>
        </PinContextProvider>
    )

}

export default MapPage;
