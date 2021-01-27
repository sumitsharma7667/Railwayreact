import React, { useEffect, useState } from "react"
import './App.css';
function App() {
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
  const [image, setimage] = useState('')
  useEffect(() => {

  }, [])
  const saveinfo = () => {
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
        this.getFeeCategory()
      })
      .then(err => { })
  }
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
            }}>Indian Railway Track Tracking System</h1>
          </div>
          <div className="col-3 px-5">
       <img src={require("../src/images/track.png").default} style={{height:100,width:"50%"}}  alt="Logo" />
       </div>
        </div>
      </nav>

      <section class="p-5 ">
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
                <input type="file" onChange={(e) => { setimage(e.target.files[0]) }} />
              </div>
            </div>
            <div className="col-6">
              <button className="btn btn-lg btn-success " type="submit" onClick={(e) => { saveinfo() }}>Save</button>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
export default App;
