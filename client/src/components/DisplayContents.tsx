import axios from "axios";
import { BackendUrl } from "../config/config";
import Card from "./Card"

const DisplayContents = ({contents}:any) => {
  const deleteContentHandler = (contentId:string) =>{
    if(confirm("Delete this content?")){
      let token = localStorage.getItem("token");
      axios.delete(BackendUrl+"/api/v1/content/"+contentId,{
        headers: {
          Authorization: token ? `Bearer ${token}` : ""
        }
      })
      .then((response)=>{
        console.log(response)
      })
      .catch((err)=>{
        console.log(err)
      })

    }
  }
  return (
    <div>
        <div className="flex gap-4 flex-wrap">
            {
              contents.map(({type,link,title,_id}:any,index:number) =>
            <Card key={index} type={type} link={link} title={title} contentId={_id}
  onDelete={() => deleteContentHandler(_id)} />
            )}
          </div>
    </div>
  )
}

export default DisplayContents