import axios from "axios"
import { useEffect, useState } from "react"
import { BackendUrl } from "../config/config"
import DisplayContents from "./DisplayContents"
import { useParams } from "react-router-dom"

const ViewBrain = () => {
  const {brainUrl} = useParams()
  const [contents, setContents] = useState([])
  useEffect(() => {
    axios.get(BackendUrl+"/api/v1/brain/"+brainUrl,{
        headers:{
          "Authorization": localStorage.getItem("token")
        }
      })
      .then((response)=>{
          setContents(response.data.content)
      })
  }, [])
  
  return (
    <div>
        <h2>ViewBrain</h2>
        <DisplayContents contents={contents} />
    </div>
  )
}

export default ViewBrain