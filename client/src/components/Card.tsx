import { Tweet } from "react-tweet"
import { ShareIcon } from "../icons/ShareIcon"

interface CardProps{
  title : string;
  link: string;
  type: "twitter" | "youtube"
}

const Card = ({title, link, type}:CardProps) => {
  console.log(link)
  return (
    <>
    <div className="p-4 min-h-48 min-w-72
     max-w-72 bg-white rounded-md border border-gray-300">
      <div className="flex justify-between">
        <div className="flex items-center text-md">
          <div className="text-gray-500 pr-2">
            <ShareIcon/>
          </div>
          {title}
        </div>
        <div className="flex items-center">
          <div className="pr-2 text-gray-500">
            <ShareIcon/>
          </div>
          <div className="text-gray-500">
            <a href={link} target="_blank">
            <ShareIcon/>
            </a>
          </div>
        </div>
      </div>
      {(type==="youtube") &&
      <div>
      <iframe
        className="mx-2 my-4 rounded-xl max-w-[96%] max-h-[300px]"
        src={link.replace("watch?v=", "embed/")}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="no-referrer"
        allowFullScreen
      ></iframe>

      </div>}
      {type==="twitter" &&      
      <div>
      <Tweet id={(link.match(/status\/(\d+)/)?.[1]) || "1683920951807971329"} />
      </div>
    
      }
    </div>
    </>
  )
}

export default Card