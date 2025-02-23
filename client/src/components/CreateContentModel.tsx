import CrossIcon from "../icons/CrossIcon";
import { Button } from "./ui/Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../config/config";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

const CreateContentModel = ({ open, onClose }: any) => {
  const titleRef = useRef<HTMLInputElement>();
  const linkRef = useRef<HTMLInputElement>();
  const [type, setType] = useState(ContentType.Youtube);

  const addContent =async () => {
    console.log("Clicked");
    const title = titleRef?.current?.value;
    const link = linkRef?.current?.value;
    const response = await axios.post(BackendUrl+"/api/v1/content",{
        title,
        link,
        type
    },{
      headers: {
        "Authorization": localStorage.getItem("token")
      }
    })
    console.log(response)
    onClose()
  };
  return (
    <>
      {open == true && (
        <div className="w-screen h-screen bg-gray-500 fixed top-0 left-0 opacity-60 flex justify-center z-50 ">
          CreateContent model
          <div className="flex flex-col justify-center">
            <span className="bg-white opacity-100 p-4 rounded-md">
              <div className="flex justify-end" onClick={onClose}>
                <CrossIcon />
              </div>
              <div className="p-4">
                <Input reference={titleRef} placeholder={"Title"} />
                <Input reference={linkRef} placeholder={"Link"} />
              </div>
              <div>
                <h1>Type</h1>
                <div className="flex p-4 gap-1">
                <Button size="md"
                  text="Youtube"
                  variant={type === ContentType.Youtube ? "primary" : "secondary" } onClick={()=>{
                    setType(ContentType.Youtube)
                  }}
                ></Button>
                <Button size="md"
                  text="Twitter"
                  variant={type === ContentType.Twitter ? "primary" : "secondary" } onClick={()=>{
                    setType(ContentType.Twitter)
                  }}
                ></Button>
                </div>
              </div>
              <div className="flex justify-center mt-2">
                <Button
                  onClick={addContent}
                  size="sm"
                  variant="primary"
                  text="Submit"
                />
              </div>
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateContentModel;
