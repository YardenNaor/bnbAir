
import React from "react";
import GoogleMapReact from 'google-map-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

export function StaysMap() {
    const defaultProps = {
        center: {
            lat: 32.166313,
            lng: 34.843311
        },
        zoom: 12
    };

    return (
        // Important! Always set the container height explicitly
        <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "" }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
            >
                <AnyReactComponent
                    lat={59.955413}
                    lng={30.337844}
                    text="My Marker"
                />
            </GoogleMapReact>
        </div>
    );
}


// להתקין את
// npm install --save google-map-react


// 
// https://www.google.com/search?q=airbnb+carousel+react&rlz=1C1YTUH_enIL1003IL1003&source=lnms&tbm=vid&sa=X&ved=2ahUKEwj85M3pv938AhWG_7sIHXbPAmw4FBD8BSgEegQIARAG&biw=1536&bih=754&dpr=1.25#fpstate=ive&vld=cid:e3ef2b41,vid:2zy2qX1eR6E
//map

// install
//npm install react-native-maps