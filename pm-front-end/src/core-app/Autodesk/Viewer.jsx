import React, { useEffect } from 'react';
import launchViewer from './ViewerFunctions';
import {useModel} from "../Hooks/useModel";

export default function Viewer() {
    const {docId} = useModel()

    useEffect(() => {
        launchViewer('viewerDiv', docId);
    }, [docId])

    return (
        <div style={{position: "absolute", width: "100%", height: "90%"}} id="viewerDiv"/>
    )
}