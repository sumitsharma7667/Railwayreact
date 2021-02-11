import React, { useEffect, useState } from "react"
import { GoogleMap, Marker,withScriptjs,withGoogleMap,KmlLayer  } from "react-google-maps"
//import { GoogleMap, useJsApiLoader,LoadScript,KmlLayer,Marker } from '@react-google-maps/api';
import './App.css';
import Modal from 'react-modal';
const customStyles = {
  content : {
    top                   : "50%",
    left                  : "50%",
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
  
    width:800
  }
};
function App(props) {
  const [projectname, setprojectname] = useState("")
  const [owner, setowner] = useState("")
  const [latitude, setlatitude] = useState("")
  const [longitude, setlongitude] = useState("")
  const [description, setdescription] = useState("")
  const [location, setlocation] = useState("")
  const [estimatedbudget, setestimatedbudget] = useState("")
  const [approvedbudget, setapprovedbudget] = useState("")
  const [utilzedbudget, setutilzedbudget] = useState("")
  const [remainingbudget, setremainingbudget] = useState("")
  const [image, setimage] = useState([])
  const [projectdata,setprojectdata]=useState([])
  const [modalIsOpen,setIsOpen] = React.useState(false);
  const[markerindex,setmarkerindex]=useState(0)
  const [markers,setmarker]=[{
    position:{
      lat:30.107933757795426, lng:78.28807467100444
    },position:{
      lat:30.468317, lng:77.771431,
    }
  }]
  useEffect(() => {
    getproject()
  }, [])
  function openModal() {
    setIsOpen(true);
  }
  function closeModal(){
    setIsOpen(false);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = '#f00';
  }
  const emptydata=()=>{
    setprojectname("")
    setowner("")
    setlatitude("")
    setlongitude("")
    setdescription("")
    setlocation("")
    setestimatedbudget("")
    setapprovedbudget("")
    setutilzedbudget("")
    setremainingbudget("")
    setimage([])
  }
  const getproject = () => {
    fetch("http://192.168.29.65:4600/getproject")
        .then(res => res.json())
        .then(data => {
          setprojectdata(data)
          console.log(data)
        })
        .then(err => console.log(err))
}
    const saveinfo = () => {
      console.log(image)
    const data = new FormData()
    data.append('projectname', projectname)
    data.append('owner', owner)
    data.append('latitude', latitude)
    data.append('longitude', longitude)
    data.append('description', description)
    data.append('location', location)
    data.append('estimatedbudget', estimatedbudget)
    data.append('approvedbudget', approvedbudget)
    data.append('utilzedbudget', utilzedbudget)
    data.append('remainingbudget', remainingbudget)
    data.append('image', image)
    const url = "http://192.168.29.65:4600/createproject"
    fetch(url, {
      method: 'post',
      body: data
    })
      .then(res => res.json())
      .then(data => {
        alert("Category Created Successfully")
        emptydata()
      })
      .then(err => { })
  }
  
  const newmarker=(index)=>{
    openModal()
    setmarkerindex(index)
  }
  const MapWithAMarker = withScriptjs(withGoogleMap(props =>   
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat:30.468317, lng:77.771431 }}     
    >
    {/* <KmlLayer 
    url='https://www.google.com/maps/d/u/0/edit?mid=1_lLEWU_IwTm-aKI18Cagu8J5YedwSaZs&usp=sharing'
     options={{ preserveViewport : false}}       
    /> */}
        <Marker 
             onClick={()=>{newmarker(0)}}
        position={{ lat: 30.0869, lng: 78.2676 }} 
        icon={require("./images/railway.png")}
        />   
        <Marker  
             onClick={()=>{newmarker(1)}}
            position={markers.position}
        />
    </GoogleMap>
  ));
// new map
const mapContainerStyle = {
  width: "100vw",
  height: "100vh"
};
// end map
console.log(image)
  return (
    <>
     <nav className="shadow-lg p-0 mb-3 bg-white rounded">
        <div className="row py-1" style={{ backgroundColor: "#42429c" }} >
          <div className="col-3 px-5 d-flex " style={{ alignItems: "center" }}>
            <img src={require("../src/images/railway.png").default} style={{ height: 80, width: 80 }} alt="Logo" />
          </div>
          <div className="col-6 d-flex " style={{ alignItems: "center",justifyContent:"center" }}>
            <h1 style={{
              color: "#fff", justifyContent: "center",
              alignItems: "center"
            }}>Railway Project Information Management System</h1>
          </div>
          <div className="col-3 px-5">
       <img src={require("../src/images/track.png").default} style={{height:100,width:"50%"}}  alt="Logo" />
       </div>
        </div>
      </nav>
      {/* <LoadScript googleMapsApiKey="AIzaSyBFSKCrZvReWE5ftJLQ9zWPEzQrlG-f2us">
        <GoogleMap
          center={{ lat: 30.468317, lng: 77.771431 }}
          mapContainerStyle={mapContainerStyle}
          zoom={4}
        >
          <KmlLayer url="https://www.google.com/maps/d/u/0/embed?mid=1_lLEWU_IwTm-aKI18Cagu8J5YedwSaZs"/>
         {
           projectdata.map((el,ind)=>{
          console.log(el.latitude)
          return(
          <Marker
          position={{ lat: JSON.parse(el.latitude),lng: JSON.parse(el.longitude) }}/>
          )
           }
           )
         }          
        </GoogleMap>
      </LoadScript> */}
      <section className="p-2 shadow-lg p-3 mb-5 bg-white rounded ">
      {/* <iframe src="https://www.google.com/maps/d/embed?mid=1_lLEWU_IwTm-aKI18Cagu8J5YedwSaZs" width="100%" height="580px"></iframe> */}
    <MapWithAMarker
  googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBFSKCrZvReWE5ftJLQ9zWPEzQrlG-f2us&v=3.exp&libraries=geometry,drawing,places"
  loadingElement={<div style={{ height: `100%` }} />}
  containerElement={<div style={{ height: `600px` }} />}
  mapElement={<div style={{ height: `100%` }} />}
>
</MapWithAMarker>
</section>
      <section className="p-5 ">
        <div className="row p-5 d-flex justify-content-center shadow-lg p-3 mb-5 bg-white rounded" style={{ backgroundColor: "#f9f9f9", borderRadius: 100 }}  >
          <div className="col-11 ">
            <div className="form-row">
              <div className="col-6">
                <div className="form-group">
                  <label>Project Name</label>
                  <input type="text" placeholder="Enter Name" className="form-control" onChange={(e) => { setprojectname(e.target.value) }} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>Owner</label>
                  <input type="text" placeholder="Enter Owner" className="form-control" onChange={(e) => { setowner(e.target.value) }} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>latitude</label>
                  <input type="text" placeholder="Enter latitude" className="form-control" onChange={(e) => { setlatitude(e.target.value) }} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>longitude</label>
                  <input type="text" placeholder="Enter longitude" className="form-control" onChange={(e) => { setlongitude(e.target.value) }} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>location</label>
                  <input type="text" placeholder="Enter location" className="form-control" onChange={(e) => { setlocation(e.target.value) }} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>estimated budget</label>
                  <input type="text" placeholder="Enter estimated budget" className="form-control" onChange={(e) => { setestimatedbudget(e.target.value) }} />
                </div>
              </div>

              <div className="col-6">
                <div className="form-group">
                  <label>approved budget</label>
                  <input type="text" placeholder="Enter approved budget" className="form-control" onChange={(e) => { setapprovedbudget(e.target.value) }} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>utilized budget</label>
                  <input type="text" placeholder="Enter utilized budget" className="form-control" onChange={(e) => { setutilzedbudget(e.target.value) }} />
                </div>
              </div>
              <div className="col-6">
                <div className="form-group">
                  <label>remaining budget</label>
                  <input type="text" placeholder="Enter Rename budget" className="form-control" onChange={(e) => { setremainingbudget(e.target.value) }} />
                </div>
              </div>


              <div className="col-6">
                <div className="form-group">
                  <label>Description</label>
                  <textarea type="text" placeholder="Enter Descrition" className="form-control" onChange={(e) => { setdescription(e.target.value) }}></textarea>
                </div>
              </div>
            </div>

            <div className="col-6">
              <div className="form-group">
                <label>Image</label>
                <input type="file" multiple={true} onChange={(e) => { setimage(e.target.files) }} name="image" />
              </div>
            </div>
            <div className="col-6">
              <button className="btn btn-lg btn-success "  type="submit" onClick={(e) => { saveinfo() }}>Save</button>
            </div>
          </div>
        </div>
      </section>
      <div>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          >
  <div class="container">
  <h2 style={{textAlign:"center"}}>Project Details</h2>            
  <table class="table">
    <tbody>
      {projectdata.map((el,ind)=>{
        console.log(el)
        if(ind==markerindex){
          return(
            <>
            <tr>
            <th>Project Name</th>
            <td>{el.projectname}</td>      
          </tr>
          <tr>
            <th>Owner</th>
            <td>{el.owner}</td>
          </tr>
          <tr>
            <th>Location</th>
            <td>{el.location}</td>
          </tr>
          <tr>
            <th>estimated budget</th>
            <td>{el.estimatedbudget}</td>
          </tr>
          <tr>
            <th>approved budget</th>
            <td>{el.approvedbudget}</td>
          </tr>
          <tr>
            <th>utilized budget</th>
            <td>{el.utilizedbudget}</td>
          </tr>
          <tr>
            <th>remaining budget</th>
            <td>{el.remainingbudget}</td>
          </tr>
          <tr>
            <th>Description</th>
            <td>{el.description}</td>
          </tr>
          <tr>
            <th>latitude</th>
            <td>{el.latitude}</td>
          </tr>

          <tr>
            <th>longitude</th>
            <td>{el.longitude}</td>
          </tr>
          </>
          )
        }
      })}     
    </tbody>
  </table>
</div>
        </Modal>
      </div>
    </>
  );

}


 

// const App=()=>{
// return(
//   <section>
//     <div >
//     <img src={require("./images/railway.jpg").default} style={{height:"100%",width:"100%"}}/>
//     </div>
//   </section>
// )
// }


export default App;