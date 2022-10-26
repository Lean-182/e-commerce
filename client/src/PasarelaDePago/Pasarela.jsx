import { useRef, useState, useEffect } from 'react'

import { useHistory } from "react-router-dom";
import './Pasarela.css';
import { BiWorld } from "react-icons/bi";
import { MdContactPhone, MdPayment } from "react-icons/md";
import GoogleMapPasarela from "./GoogleMapPasarela.jsx";
import FormularioContacto from "./FormularioContacto.jsx";
import ResumenPago from "./ResumenMetodoCompra.jsx";
import Thanks from "./Thanks.jsx";
import { AiFillCarryOut } from "react-icons/ai";
import { IconContext } from "react-icons";
import { useDispatch, useSelector } from "react-redux";
import { putUserAddrees } from "../../redux/actions";
import Swal from 'sweetalert2';




function Pasarela() {
  const history = useHistory();
  const user_login = useSelector((state) => state.user_login);
  const carry = useSelector((state) => state.carryProducts);
  const [page, setPage] = useState(1)
  const [coordinates, setCoordinates] = useState([])
  const [contact, setContact] = useState({ phone: (user_login.phone == undefined) ? 0 : user_login.phone, reference: "" })
  const [SelectTypeSearch, setSelectTypeSearch] = useState("TypeSearchBox")
  const [myAdress, setMyAdress] = useState({ name: "", adress: "" })
  const [map, setMap] = useState(/** @type google.maps.Map */(null))
  const PlaceRef = useRef()
  const [startPage, SetstartPage] = useState(true)
  const dispatch = useDispatch();
  

  console.log(carry)


  useEffect(() => {
    if (JSON.stringify(carry) === JSON.stringify([]) || user_login == false || user_login.typeUser == "Admin")
      history.push("/");
  }, [])


  function handleChangeContact(e, type) {
    setContact({ ...contact, [type]: e.target.value });
  }

  async function SearchByBox(e) {
    const directionsService = new google.maps.Geocoder()
    try {
      var A = await directionsService.geocode({ address: PlaceRef.current.value })
      var array = [];
      for (let index = 0; index < A.results.length; index++) {
        const element = A.results[index];
        array.push({ adress: { lat: element.geometry.location.lat(), lng: element.geometry.location.lng() }, name: element.formatted_address })
      }
      setMyAdress(array[0])
      setCoordinates(array);
      map.panTo(array[0].adress)
      map.setZoom(15)
    }
    catch (error) {
      console.log(error)
    }
  }

  function ChangeStartYes(e) {
    setMyAdress({ name: user_login.adress, adress: { lat: user_login.lat, lng: user_login.lng } })
    ClickContinue();
    SetstartPage(false)
  }

  function ChangeStartNo(e) {
    SetstartPage(false)
  }

  function ChangeTypeSearch(e) {
    setSelectTypeSearch(e)
  }
  async function SelectAdress(e, elemento) {
    try {
      setMyAdress(elemento)
      map.panTo(elemento.adress)
    }
    catch (error) {
      console.log(error)
    }
  }

  function ClickContinue() {
    if (page == 1) {
      console.log(myAdress)
      if (user_login.lat === -1 && user_login.lng === -1 && myAdress.adress!=="" && myAdress.name!=="") {
        Swal.fire({
          title: "Do you want to add this address to your data?",
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: "Yes",
          denyButtonText: "No",
          icon: "question",
        }).then((result) => {
          if (result.isConfirmed) {
            dispatch(putUserAddrees({ lat: myAdress.adress.lat, lng: myAdress.adress.lng, address: myAdress.name }, user_login.id)).then((e) => {
              Swal.fire({
                title: e.payload,
                position: "center",
                icon: "success",
                showConfirmButton: false,
                timer: 1000,
              }).then(e => setPage(page + 1))
            }
            ).catch(e =>
              Swal.fire({
                title: e.response.data,
                position: "center",
                icon: "error",
                showConfirmButton: true,
              }))
          }
          else {
            setPage(page + 1)
          }
        }).catch(e =>
          Swal.fire({
            title: e,
            position: "center",
            icon: "error",
            showConfirmButton: true,
          }))
      }
    }
    setPage(page + 1)
  }

  function ClickPreview() {
    if (page == 2) {
      SetstartPage(true);
      setMyAdress({ name: "", adress: "" })
    }
    setPage(page - 1)
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
          array.push({ adress: { lat: element.geometry.location.lat(), lng: element.geometry.location.lng() }, name: element.formatted_address })
        }
        setMyAdress(array[0])
        var array2 = []
        array2.push(array[0])
        setCoordinates(array2);
        map.panTo(array[0].adress)
      }
      catch (error) {
        console.log(error)
      }
    }
  }

  function Validacion() {
    if (page == 1) {
      if (myAdress.name != "") {
        return true;
      }
    }
    if (page == 2) {
      if (contact.phone != 0 && contact.reference != "") {
        return true;
      }
    }

    return false
  }

  console.log(user_login)

  var Validacion2 = Validacion();

  var Adress = myAdress.name != "" ? myAdress.name : "Search your adress"

  return (
    <div className='BoxPasarela'>
      <div className='navMaps'>
        <ul className='ListaPasarela'>
          <li key={"Pasarela" + 1}
            id={page == 1 ? "LisPasarelaSelect" : "ListPasarelaNoSelect" + 1}
            className="page-itemPasarela">
            <IconContext.Provider value={{ size: "40px" }}>  <BiWorld /></IconContext.Provider></li>
          <li key={"Pasarela" + 2}
            id={page == 2 ? "LisPasarelaSelect" : "ListPasarelaNoSelect" + 2}
            className="page-itemPasarela"> <IconContext.Provider value={{ size: "40px" }}><MdContactPhone /></IconContext.Provider></li>
          <li key={"Pasarela" + 3}
            id={page == 3 ? "LisPasarelaSelect" : "ListPasarelaNoSelect" + 3}
            className="page-itemPasarela"> <IconContext.Provider value={{ size: "40px" }}><MdPayment /></IconContext.Provider> </li>
          <li key={"Pasarela" + 4}
            id={page == 4 ? "LisPasarelaSelect" : "ListPasarelaNoSelect" + 4}
            className="page-itemPasarela"><IconContext.Provider value={{ size: "40px" }}> <AiFillCarryOut /> </IconContext.Provider></li>
        </ul>
      </div>
      <div className='Pasarela '>
        {page == 1 &&
          (
            (startPage && user_login !== "Loading" && user_login !== "false" && user_login.lat !== -1 && user_login.lng !== -1) ?
              <div>
                <GoogleMapPasarela ChangeTypeSearch={ChangeTypeSearch}
                  setMap={setMap}
                  Pointer={Pointer}
                  Adress={Adress}
                  SelectTypeSearch={SelectTypeSearch}
                  PlaceRef={PlaceRef}
                  coordinates={coordinates}
                  SelectAdress={SelectAdress}
                  myAdress={myAdress}
                  map={map}
                  SearchByBox={SearchByBox}
                  question={true}
                  adress={{ lat: user_login.lat, lng: user_login.lng }}
                  ChangeStartYes={ChangeStartYes}
                  ChangeStartNo={ChangeStartNo}
                />
              </div>
              : <GoogleMapPasarela ChangeTypeSearch={ChangeTypeSearch}
                setMap={setMap}
                Pointer={Pointer}
                Adress={Adress}
                SelectTypeSearch={SelectTypeSearch}
                PlaceRef={PlaceRef}
                coordinates={coordinates}
                SelectAdress={SelectAdress}
                myAdress={myAdress}
                map={map}
                SearchByBox={SearchByBox}
                question={false}
                adress={{ lat: 0, lng: 0 }}
                ChangeStartYes={ChangeStartYes}
                ChangeStartNo={ChangeStartNo}
              />
          )
        }
        {page == 2 &&
          <FormularioContacto handleChangeContact={handleChangeContact}
            adress={contact.adress}
            phone={contact.phone}
            reference={contact.reference}
          />
        }
        {page == 3 &&
          <ResumenPago ClickContinue={ClickContinue} contact={contact} myAdress={myAdress} />
        }
        {page == 4 &&
          <Thanks />}

        {Validacion2 &&
          <button className='buttonContinue btnGlobal btnContinueReference' onClick={() => ClickContinue()}>Continue</button>}
        {page > 1 && page != 4 &&
          <button className='buttonPreview btnGlobal' onClick={() => ClickPreview()}>Preview</button>}
      </div>
    </div>
  )
}


export default Pasarela
