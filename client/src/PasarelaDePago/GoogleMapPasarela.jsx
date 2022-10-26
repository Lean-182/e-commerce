import React from "react";
import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    HStack,
    IconButton,
    Input,
    SkeletonText,
    Text,
} from '@chakra-ui/react'
import { FaSearchLocation, FaTimes } from 'react-icons/fa'

import {
    useJsApiLoader,
    GoogleMap,
    Marker,
    Autocomplete,
    DirectionsRenderer,
    StandaloneSearchBox
} from '@react-google-maps/api'

import { useRef, useState } from 'react'
import './GoogleMapPasarela.css';



function GoogleMapComponent({ ChangeTypeSearch, setMap, Pointer, Adress,
    SelectTypeSearch, PlaceRef, coordinates, SelectAdress, myAdress, map, SearchByBox,
    question, adress,ChangeStartYes,ChangeStartNo }) {

    const [libraries] = useState(['places']);

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    })

    if (!isLoaded) {
        return <SkeletonText />
    }


    const center = question === false ? { lat: 4.640487, lng: -74.079624 } : adress

    const svgMarker = {
        path: "M 10 11 l 4 0 l 0 -3 l -2 -2 l -2 2 z M 12 2.016 q 2.906 0 4.945 2.039 t 2.039 4.945 q 0 1.453 -0.727 3.328 t -1.758 3.516 t -2.039 3.07 t -1.711 2.273 l -0.75 0.797 q -0.281 -0.328 -0.75 -0.867 t -1.688 -2.156 t -2.133 -3.141 t -1.664 -3.445 t -0.75 -3.375 q 0 -2.906 2.039 -4.945 t 4.945 -2.039 z",
        fillColor: "blue",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(15, 30),
    };

    const svgMarker2 = {
        path: "M 10 11 l 4 0 l 0 -3 l -2 -2 l -2 2 z M 12 2.016 q 2.906 0 4.945 2.039 t 2.039 4.945 q 0 1.453 -0.727 3.328 t -1.758 3.516 t -2.039 3.07 t -1.711 2.273 l -0.75 0.797 q -0.281 -0.328 -0.75 -0.867 t -1.688 -2.156 t -2.133 -3.141 t -1.664 -3.445 t -0.75 -3.375 q 0 -2.906 2.039 -4.945 t 4.945 -2.039 z",
        fillColor: "red",
        fillOpacity: 0.6,
        strokeWeight: 0,
        rotation: 0,
        scale: 2,
        anchor: new google.maps.Point(15, 30),
    };

    return (
        <Flex
            position='relative'
            flexDirection='column'
            alignContent="center"
            justifyContent="center"
            alignItems="center"
            justifyItems="center"
        >
            <Box className="boxGmap">
                {/* Google Map Box */}
                <GoogleMap
                    center={center}
                    onClick={e => (Pointer(e))}
                    zoom={15}
                    mapContainerStyle={{ width: '80%', height: '80%', margin: 'auto', marginTop: '5px' }}
                    options={{
                        zoomControl: true,
                        streetViewControl: true,
                        mapTypeControl: true,
                        fullscreenControl: true,
                    }}
                    onLoad={map => setMap(map)}
                >
                    {question === false ?
                        coordinates.map((elemento, index) => {
                            console.log(elemento, " ", myAdress)
                            return (<Marker key={"Marker " + index} position={elemento.adress}
                                icon={JSON.stringify(myAdress) !== JSON.stringify(elemento) ? svgMarker : svgMarker2} />)
                        })
                        :
                        <Marker key={"Marker House"} position={center} icon={svgMarker2} />
                    }

                </GoogleMap>
            </Box>



            <div className='GoogleMapPlacesSearch'>
                {question === false ?
                    <div className='Columnas'>
                        <p className='Adress'><label>Your Adress:</label>
                            <label>{Adress}</label></p>

                        <p><label>Type Search: </label>
                            <select value={SelectTypeSearch} onChange={(e) => ChangeTypeSearch(e.target.value)}>
                                <option key={"TypeSearchBox"} value={"TypeSearchBox"}>{"SearchBox"}</option>
                                <option key={"TypePointer"} value={"TypePointer"}>{"Pointer"}</option>
                            </select>
                        </p>


                        {SelectTypeSearch == "TypeSearchBox" &&
                            <div className="SearchboxK">
                                <div >
                                    <div className='SearchBox'>
                                        <StandaloneSearchBox >
                                            <input
                                                type='text'
                                                placeholder='find your address'
                                                ref={PlaceRef}
                                                className={"inputSearchbox"}
                                            />
                                        </StandaloneSearchBox>
                                        <IconButton
                                            aria-label='center back'
                                            icon={<FaSearchLocation />}
                                            isRound
                                            onClick={() => { SearchByBox() }}
                                        />
                                    </div>
                                </div>
                                <div className='OpcionesAdress'>
                                    {coordinates.map((elemento, index) => {
                                        return (<button
                                            type='submit' key={"adress" + elemento.name + index} onClick={(e) => SelectAdress(e, elemento)} >
                                            {elemento.name}
                                        </button>)
                                    })}
                                </div>
                            </div>}
                    </div>
                    :
                    <div className="btnsAddress">
                        <label>Do you want to use your address?</label>
                        <button className="btnGlobal btnYes" onClick={(e) => ChangeStartYes(e)}>Yes</button>
                        <button className="btnGlobal btnNo" onClick={(e) => ChangeStartNo(e)}>No</button>
                    </div>
                }
            </div>

        </Flex >
    );
}

export default GoogleMapComponent;
