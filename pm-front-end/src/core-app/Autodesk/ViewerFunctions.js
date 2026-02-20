/* global Autodesk, THREE */
import {getAccesstoken} from '../Auth/Auth'

var viewer;
var defaultModel
let dbIdsSet = []

const statusColor = {
    notStarted: new THREE.Vector4(0,0,0,1),
    arrived: new THREE.Vector4(254,127,45,1),
    onHold: new THREE.Vector4(255,0,0,1),
    inProgress: new THREE.Vector4(252,202,70,1),
    done: new THREE.Vector4(0,255,0,1),
    default: new THREE.Vector4(0,0,255,1)
}

function launchViewer(div, urn){
    const tkn = getAccesstoken()

    tkn()
        .then((result) => {
            //core view
            var options = {
            'env': 'AutodeskProduction',
            'accessToken': result.data.access_token
            };

            Autodesk.Viewing.Initializer(options, function() {
            var htmlDiv = document.getElementById(div);
            viewer = new Autodesk.Viewing.GuiViewer3D(htmlDiv);
            var startedCode = viewer.start();
            if (startedCode > 0) {
                console.error('Failed to create a Viewer: WebGL not supported.');
                return;
            }

            console.log('Initialization complete, loading a model next...');
            var documentId = urn;
            Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
            viewer.addEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, onGeometryLoaded);

            function onDocumentLoadSuccess(viewerDocument) {
            defaultModel = viewerDocument.getRoot().getDefaultGeometry();
            viewer.loadDocumentNode(viewerDocument, defaultModel);
            };

            function onDocumentLoadFailure() {
            console.error('Failed fetching Forge manifest');
            };

        });

            })
        .catch((err) => {
            console.log('error')
        })
    
}

function onGeometryLoaded(event){
    var viewer = event.target;

    viewer.removeEventListener(Autodesk.Viewing.GEOMETRY_LOADED_EVENT, onGeometryLoaded);
	viewer.fitToView();

    viewer.model.getExternalIdMapping((data) => {


    }, (err) => console.log(err));
};

export function getSelected (){
    return new Promise((resolve, reject) => {
        const dbId = viewer.getSelection()[0];
        if (viewer.getSelectionCount() > 0) {
            viewer.model.getProperties(dbId, (item) => {
                resolve(item)
            })
        }
    })
};

export function setModelColor (){
    return new Promise((resolve, reject) => {
        const color = new THREE.Vector4(0,255,0,0.1)
        viewer.clearThemingColors()
        viewer.setThemingColor(1, color)
        resolve()
    })
};
export function setColor(dbId) {
    const color = new THREE.Vector4(255,0,0,1)
    viewer.setThemingColor(dbId, color)
};

export function setColors(dbIds) {
    const color = new THREE.Vector4(255,0,0,1)
    dbIds.map((id) => {
        viewer.setThemingColor(id, color)
    })
    viewer.isolate()
    viewer.isolate(dbIds)

};

export function setTagColor(status, dbIds) {
    let color = new THREE.Vector4(0,0,255,1)
        switch (status) {
            case 'NotStarted':
                color = new THREE.Vector4(0,0,0,1)
                break;
            case 'Arrived':
                color = new THREE.Vector4(254,127,45,1)
                break;
            case 'In Progress':
                color = new THREE.Vector4(0,0,255,1)
                break;
            case 'OnHold':
                color = new THREE.Vector4(255,0,0,1)
                break;
            case 'Done':
                color = new THREE.Vector4(0,255,0,1)
                break;
            default:
                color = new THREE.Vector4(0,0,0,1)
                break;
        }

        viewer.isolate()

        dbIds.map((id) => {
            viewer.setThemingColor(id, color)
            dbIdsSet.push(id)
        })

        viewer.isolate(dbIdsSet)

};

export function isolate(dbId) {
    viewer.isolate(dbId)
    viewer.refresh(true)
};

export function isolateSets() {
    if (dbIdsSet.length !== 0) {

        viewer.isolate(dbIdsSet)
    }

};

export function search(tag, status) {
    //search(text, onSuccessCallback, onErrorCallback, attributeNames, options)
    if (defaultModel !== undefined) {
            viewer.search(tag,
                async (dbIds) => {
                    setTagColor(status, dbIds)
                }, () => {
                })
    }
}

export function clearDBSets() {
    dbIdsSet = []
}

export default launchViewer;