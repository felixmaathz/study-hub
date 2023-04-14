import styles from "../styles/index.module.css"
import React, {useState} from "react";
import Link from 'next/link';
import Map from "../components/LoggedInPage/Map/map_ssr";
import ProtectedRoute from "../hooks/ProtectedRoute";
import Layout from "../components/LoggedInPage/Layout";

function MapPage() {

    return (
        <>
            <Layout>
                <Map/>
            </Layout>
        </>
    )
}

export default ProtectedRoute(MapPage)