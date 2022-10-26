import { useRef, useState,useEffect } from 'react'
import { useHistory } from "react-router-dom";
import GoogleMapComponent from './GoogleMapComponent';
import { useDispatch, useSelector } from "react-redux";



function GoogleMapAdress({myAdress,setMyAdress,handleModalClose,handleSetAdress,input}) {
  const history = useHistory();
  const user_login = useSelector((state) => state.user_login);
  const [coordinates, setCoordinates] = useState([])
  const [SelectTypeSearch, setSelectTypeSearch] = useState("TypeSearchBox")
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const PlaceRef = useRef()
  
 console.log(myAdress);
  useEffect(() => {
    //if(JSON.stringify(carry)===JSON.stringify([]) || user_login==false || user_login.typeUser=="Admin")
    //history.push("/");
  }, [])
  
  async function SearchByBox(e) {
    const directionsService = new google.maps.Geocoder()
    try {
      var A = await directionsService.geocode({ address: PlaceRef.current.value })
      var array = [];
      for (let index = 0; index < A.results.length; index++) {
        const element = A.results[index];
        array.push({ address: { lat: element.geometry.location.lat(), lng: element.geometry.location.lng() }, name: element.formatted_address })
      }
      setMyAdress(array[0])
      setCoordinates(array);
      map.panTo(array[0].address)
      map.setZoom(15)
    }
    catch (error) {
      console.log(error)
    }
  }

  function ChangeTypeSearch(e) {
    setSelectTypeSearch(e)
  }
  async function SelectAdress(e, elemento) {
    try {
      setMyAdress(elemento)
      map.panTo(elemento.address)
    }
    catch (error) {
      console.log(error)
    }
  }

  async function Pointer(e) {
    if (SelectTypeSearch == "TypePointer") {
      const directionsService = new google.maps.Geocoder()
      console.log(e.latLng)
      try {
        var A = await directionsService.geocode({ location: { lat: e.latLng.lat(), lng: e.latLng.lng() } })
        var array = [];
        for (let index = 0; index < A.results.length; index++) {
          const element = A.results[index];
          array.push({ address: { lat: element.geometry.location.lat(), lng: element.geometry.location.lng() }, name: element.formatted_address })
        }
        setMyAdress(array[0])
        var array2 = []
        array2.push(array[0])
        setCoordinates(array2);
        console.log(array[0].address)
        map.panTo(array[0].address)
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  var address = (myAdress.name != "" || myAdress.name != "Need to complete" )? myAdress.name : "Search your address"

  return (
    <div className='BoxPasarela'>
          <GoogleMapComponent ChangeTypeSearch={ChangeTypeSearch}
            setMap={setMap}
            Pointer={Pointer}
            address={address}
            SelectTypeSearch={SelectTypeSearch}
            PlaceRef={PlaceRef}
            coordinates={coordinates}
            SelectAdress={SelectAdress}
            myAdress={myAdress}
            map={map}
            SearchByBox={SearchByBox}
            handleModalClose={handleModalClose}
            handleSetAdress={handleSetAdress}
            setCoordinates={setCoordinates}
            input={input}/>
    </div>
  )
}


export default GoogleMapAdress
