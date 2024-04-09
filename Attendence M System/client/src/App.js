// import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from "axios"
import Formtable from './components/Formtable';
// import Header from './components/Header';
// import FoodMenu from './components/FoodMenu';



axios.defaults.baseURL = "http://localhost:8080/"

function App() {

  const [addSection,setAddSection] = useState(false)
  const [editSection,setEditSection] = useState(false)
  const [formData,setFormData] = useState({
    name : "",
    email : "",
    mobile : "",
  })
  const [formDataEdit,setFormDataEdit] = useState({
    name : "",
    email : "",
    mobile : "",
    log_In : "",
    log_Out : "",
    status : {
      present : "Present",
      absent : "Absent",
      halfDay : "Half Day"
    },
    _id : ""
  })

  const [dataList,setDataList] = useState([])

  const handleOnChange = (e)=>{
    const {value, name} = e.target
    setFormData((preve)=>{
      return {
        ...preve,
        [name] : value.toLowerCase()
      }

    })
  }


  const handleSubmit = async(e)=>{
    e.preventDefault()
    const data = await axios.post("/create",formData)
    console.log(data)
    if(data.data.success){
      setAddSection(false)
      alert(data.data.message)
      getFetchData()
      setFormData({
        name : "",
        email : "",
        mobile : "",
        log_In : "",
        log_Out : "",
        status : {
          present : "Present",
          absent : "Absent",
          halfDay : "Half Day",
          lateArraivl : ""
        }
      })
    }
  }

  const getFetchData = async()=>{
    const data = await axios.get("/")
    console.log(data)
    if(data.data.success){
      setDataList(data.data.data)
    }
  }
  useEffect(()=>{
  getFetchData()
  },[])

  const handleDelete = async(id)=>{
    const data = await axios.delete("/delete/"+id)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
   
  }

  const handleUpdate = async(e)=>{
    e.preventDefault()
    const data = await axios.put("/update/",formDataEdit)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }

  }
   const handleEditOnChange = async(e)=>{
    const {value, name} = e.target
    setFormDataEdit((preve)=>{
      return {
        ...preve,
        [name] : value
      }

    })
   }

   const handleEdit = (el)=>{
    setFormDataEdit(el)
    setEditSection(true)
   }
  return (
    <>
    {/* <Header/> */}
    {/* <nav className='navbar navbar-dark bg-dark navbar-expand-sm'>
            <div className="container">
                <a href='' className='navbar-brand'>Foodie</a>
            </div>
        </nav> */}
    {/* <FoodMenu/> */}
    <section class= "main-container">
      <div class="container">
          <h1>EMPLOYEE DETAILS</h1>
          <button class="btn btn-primary px-4 fs-4 fw-bold" onClick={()=>setAddSection(true)}>ADD</button>
          {
            addSection && (
              <Formtable
              handleSubmit={handleSubmit}
              handleOnChange={handleOnChange}
              handleClose={()=>setAddSection(false)}
              rest={formData}
              />
            )
          }
          {
            editSection && (
              <Formtable
              handleSubmit={handleUpdate}
              handleOnChange={handleEditOnChange}
              handleClose={()=>setAddSection(false)}
              rest={formDataEdit}
              />
            )
          }

          <div className= "table-container mt-3">
            <table>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  {/* <th>Mobile</th> */}
                  <th>LogIn_Time</th>
                  <th>LogOut_Time</th>
                  <th>Status</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                { dataList[0] ? (
                  dataList.map((el)=>{
                    return(
                      <tr>
                        {/* <td>{SlNumber}</td> */}
                        <td>{el._id}</td>
                        <td>{el.name}</td>
                        <td>{el.email}</td>
                        {/* <td>{el.mobile}</td> */}
                        <td>{el.log_In}</td>
                        <td>{el.log_Out}</td>
                        <td>{el.status}</td>
                        <td>
                        <button class="btn-2 btn-edit px-4" onClick={()=>handleEdit(el)}>Edit</button>
                        </td>
                        <td>
                        <button class="btn-2 btn-delete" onClick={()=>handleDelete(el._id)}>Delete</button>
                        </td>
                      </tr>
                    )
                  }))
                  : 
                  (
                    <p class="empty-table">No Data Available</p>
                  )
                } 
              </tbody>
            </table>
          </div>
         
      </div>
    </section>
   </>
  );
}

export default App;
