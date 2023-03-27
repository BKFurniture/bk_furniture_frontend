import "mapbox-gl/dist/mapbox-gl.css";
import "react-map-gl-geocoder/dist/mapbox-gl-geocoder.css";
import axios from "axios";
import "./mapbox.css";
import React, { useState, useRef, useCallback, useEffect } from "react";
import Geocoder from "react-map-gl-geocoder";
import MapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
  NavigationControl,
  Popup,
} from "react-map-gl";
import PlaceIcon from "@mui/icons-material/Place";
import EmojiPeopleIcon from "@mui/icons-material/EmojiPeople";

const MAPBOXACCESSTOKEN =
  "pk.eyJ1IjoibG9uZ21haTEwNiIsImEiOiJjbDB4ajZ3cWwwOGxiM2lwajN2MG9kN2p1In0.4PE7Yoc48wF6IEmKGWT--Q";

function Mapbox(props) {
  // Set initial viewport for Mapbox
  const [viewport, setViewport] = useState({
    longitude: 106.65810126772554,
    latitude: 10.772171321844857,
    zoom: 14,
  });

  const mapRef = useRef();
  const handleViewportChange = useCallback(
    (newViewport) => setViewport(newViewport),
    []
  );

  const handleGeocoderViewportChange = useCallback((newViewport) => {
    const geocoderDefaultOverrides = { transitionDuration: 1000 };

    return handleViewportChange({
      ...newViewport,
      ...geocoderDefaultOverrides,
    });
  }, []);
  //---------------------------------------------------------------------------------------------

  const [locateb, setLocateb] = useState({
    longitude: 0,
    latitude: 0,
  });
  const [fullScreenFlag, setFullScreenFlag] = useState(false);

  // Get Address from Coordinates Function
  const [choosenAdd, setChoosenAdd] = useState("");
  const getAddress = (lng, lat) => {
    axios
      .get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${MAPBOXACCESSTOKEN}`
      )
      .then(function (response) {
        setChoosenAdd(response.data.features[0].place_name);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const [distance, setDistance] = useState(0);
  const checkDistance = (url) => {
    axios
      .get(url)
      .then(function (response) {
        setDistance(response.data.routes[0].distance / 1000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleClick = (lng, lat) => {
    checkDistance(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${lng},${lat};106.65810126772554,10.772171321844857,?geometries=geojson&access_token=${MAPBOXACCESSTOKEN}`
    );
    setLocateb({ longitude: lng, latitude: lat });
    getAddress(lng, lat);
  };

  const gotoChoosenPlace = () => {
    setViewport({
      longitude: locateb.longitude,
      latitude: locateb.latitude,
      zoom: 14,
    });
  };

  useEffect(() => {
    if (choosenAdd && distance)
      props.ParentcallbackFunction({ choosenAdd, distance });
  }, [choosenAdd, distance]);

  return (
    <div>
      <MapGL
        ref={mapRef}
        {...viewport}
        width="100%"
        height="40vh"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        onViewportChange={handleViewportChange}
        onNativeClick={(e) => {
          if (e.target.className === "overlays") {
            handleClick(e.lngLat[0], e.lngLat[1]);
          }
          if (e.target.className === "mapboxgl-ctrl-icon") {
            setFullScreenFlag(!fullScreenFlag);
          }
        }}
        mapboxApiAccessToken={MAPBOXACCESSTOKEN}
        transitionDuration={20}>
        <Geocoder
          mapRef={mapRef}
          onViewportChange={handleGeocoderViewportChange}
          mapboxApiAccessToken={MAPBOXACCESSTOKEN}
          position="top-left"
          reverseGeocode={true}
          country="vn"
        />
        <Marker
          longitude={106.65810126772554}
          latitude={10.772171321844857}
          mapboxApiAccessToken={MAPBOXACCESSTOKEN}
          offsetLeft={-25}
          offsetTop={-40}>
          <PlaceIcon style={{ height: 48, width: 48, color: "#ea4335" }} />
        </Marker>
        {locateb ? (
          <Marker
            longitude={locateb && locateb.longitude}
            latitude={locateb && locateb.latitude}
            draggable={true}
            mapboxApiAccessToken={MAPBOXACCESSTOKEN}
            onDragEnd={(e) => handleClick(e.lngLat[0], e.lngLat[1])}
            offsetLeft={-15}
            offsetTop={-25}>
            <EmojiPeopleIcon color="#04CE6D" className="animationMarker" />
          </Marker>
        ) : (
          <></>
        )}

        <FullscreenControl style={{ right: 10, bottom: 10 }} />
        <NavigationControl style={{ right: 10, bottom: 50 }} />

        <GeolocateControl
          style={{ right: 10, bottom: 150 }}
          positionOptions={{ enableHighAccuracy: true }}
          trackUserLocation={true}
          auto
        />
        <button
          className="choosen-position"
          onClick={gotoChoosenPlace}
          style={{ position: "absolute", right: 10, bottom: 190 }}
          title="Find My Choosen Location">
          <EmojiPeopleIcon color="#04CE6D" style={{ width: "25px" }} />
        </button>

        {locateb && fullScreenFlag ? (
          <Popup
            className="font-weight-bold"
            longitude={locateb && locateb.longitude}
            latitude={locateb && locateb.latitude}
            closeButton={false}
            anchor="bottom"
            offsetTop={-25}>
            <div>{props.address ? props.address : choosenAdd}</div>
            <div>{`Distance: ${distance.toFixed(2)} km`}</div>
            <div>{`Price: ${10}$`}</div>
          </Popup>
        ) : (
          <></>
        )}
      </MapGL>
    </div>
  );
}

export default Mapbox;
