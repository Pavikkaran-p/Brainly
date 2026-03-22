import { useState, useRef, useEffect } from "react";
import { Tweet } from "react-tweet";
import { ShareIcon } from "../icons/ShareIcon";

interface CardProps {
  title: string;
  link: string;
  type: "twitter" | "youtube";
  contentId: string;
  onDelete: (id: string) => void;
}

const Card = ({ title, link, type, contentId, onDelete }: CardProps) => {
  const [openMenu, setOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const shareLinkHandler = () => {
    navigator.clipboard.writeText(link);
  };

  const handleDelete = () => {
    if (confirm("Delete this item?")) {
      onDelete(contentId);
    }
    setOpenMenu(false);
  };

  const videoId = link.match(/(?:v=|youtu\.be\/|shorts\/)([^&]+)/)?.[1];
  const tweetId = link.match(/status\/(\d+)/)?.[1];

  // ✅ Close menu on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="p-4 min-h-48 min-w-72 max-w-72 bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition relative">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="text-md font-medium truncate max-w-[160px]">
          {title}
        </div>

        <div className="flex items-center gap-3 text-gray-500 relative">
          
          {/* Share */}
          <div
            onClick={shareLinkHandler}
            className="cursor-pointer hover:text-black transition"
            title="Copy link"
          >
            <ShareIcon size="lg" />
          </div>

          {/* 3-dot menu */}
          <div ref={menuRef} className="relative">
            <button
              onClick={() => setOpenMenu(!openMenu)}
              className="text-xl px-2 hover:text-black"
            >
              ⋯
            </button>

            {/* Dropdown */}
            {openMenu && (
              <div className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded-lg shadow-lg z-10">
                
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                  onClick={() => {
                    alert("More info coming soon");
                    setOpenMenu(false);
                  }}
                >
                  More Info
                </div>

                <div
                  className="px-4 py-2 hover:bg-red-100 cursor-pointer text-sm text-red-500"
                  onClick={handleDelete}
                >
                  Remove
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* YouTube */}
      {type === "youtube" && videoId && (
        <iframe
          className="mt-4 w-full aspect-video rounded-lg"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          allowFullScreen
        />
      )}

      {/* Twitter */}
      {type === "twitter" && tweetId && (
        <div className="mt-4">
          <Tweet id={tweetId} />
        </div>
      )}
    </div>
  );
};

export default Card;