import { useEffect, useState } from "react";
import CreateContentModel from "../components/CreateContentModel";
import SideBar from "../components/SideBar";
import { Button } from "../components/ui/Button";
import { PlusIcon } from "../icons/PlusIcon";
import { ShareIcon } from "../icons/ShareIcon";
import useContent from "../hooks/useContent";
import axios from "axios";
import { BackendUrl, frontendUrl } from "../config/config";
import DisplayContents from "../components/DisplayContents";
import { useNavigate } from "react-router-dom";
import copyToClipboard from "../utils/copyToClipboard";

function DashBoard() {
  const [modelOpen, setModelOpen] = useState(false)
  const {contents,refresh} = useContent();
  const navigate = useNavigate()
  useEffect(() => {
    refresh()
  }, [modelOpen])

  useEffect(()=>{
    if(localStorage.getItem("token"))
    console.log("logged in")
    else navigate('/signin')
  },[])
  return (
<div>
    {/* <div>
    </div> */}
            <SideBar/>
    <div className="ml-[20%] pr-4 min-h-screen bg-gray-100 bottom-2" > 
        <CreateContentModel onClose={()=>{
          setModelOpen(false) 
        }} open={modelOpen} />
        <div className={`p-4 ${modelOpen && "blur-3xl"}`}>
          <div className="flex justify-end gap-4">
            <Button
              variant={"primary"}
              startIcon={<PlusIcon size={"lg"} />}
              // endIcon={<ShareIcon size={"lg"} />}
              size="sm"
              text={"Add content"}
              onClick={()=>{
                setModelOpen(true)
              }}
            ></Button>

            <Button
              variant={"secondary"}
              startIcon={<ShareIcon size={"lg"} />}
              size="sm"
              text={"Share Brain"}
              onClick={()=>{
                axios.post(BackendUrl+"/api/v1/brain/share",{
                  share: true
                },{
                  headers:{
                    "Authorization": localStorage.getItem("token")
                  },
                  
                })
                .then((response)=>{
                    console.log(response)
                    const shareUrl = `${frontendUrl +"/brain"+ response.data?.hash}`
                    copyToClipboard(shareUrl)
                })
              }}
            ></Button>
          </div>
          
          <DisplayContents contents={contents} />
        </div>
    </div>
</div>
  );
}

export default DashBoard;
