import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

export default function MapBox({
  height,
  marks,
  midpoint,
  defaultZoom,
  markedClicked
}) {



  const renderMarker = (handleMarkClick) => {
    return (
      marks &&
      marks.marks.map((m, index) => {
        return (
          <Marker
            id={m.id}
            key={index}
            position={{ lat: m.lat, lng: m.lng }}
            markerId={m.name}
            onClick={() => handleMarkClick(m.city)}
          />
        );
      })
    );
  };

  const renderMap = () => {
      return (
        <APIProvider apiKey={process.env.REACT_APP_GOOGLEMAP}>
          <Map
            style={{ width: "100%", height: height }}
            defaultCenter={midpoint}
            defaultZoom={defaultZoom}
            gestureHandling="greedy"
            disableDefaultUI
            onChange={(map) => console.log('Map moved', map)}
          >
            {renderMarker(markedClicked)}
          </Map>
        </APIProvider>
      );
  };

  return <>{renderMap()}</>;
}
