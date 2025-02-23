import axios from "axios"
import { useEffect, useState } from "react"
import { BackendUrl } from "../config/config"

const useContent = () => {
  const [contents, setContents] = useState([])
  const [error, setError] = useState()
  console.log(error)
  const refresh = async () =>{
    axios.get(BackendUrl+"/api/v1/content",{
      headers:{
        "Authorization": localStorage.getItem("token")
      }
    })
    .then((response)=>{
        setContents(response.data.content)
    })
    .catch((err)=>{
        setError(err)
    }) 
  }
  useEffect(()=>{
    refresh()
    let interval = setInterval(() => {
      refresh()
    }, 10 * 1000);
    return () =>{
      clearInterval(interval)
    }
  },[])
  return {contents,refresh};
}

export default useContent