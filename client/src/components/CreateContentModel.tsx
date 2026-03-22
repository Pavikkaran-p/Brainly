import CrossIcon from "../icons/CrossIcon";
import { Button } from "./ui/Button";
import { Input } from "./Input";
import { useRef, useState } from "react";
import axios from "axios";
import { BackendUrl } from "../config/config";
import toast from "react-hot-toast";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter",
}

const CreateContentModel = ({ open, onClose }: any) => {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);

  const [type, setType] = useState(ContentType.Youtube);
  const [loading, setLoading] = useState(false);

  const addContent = async () => {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    if (!title || !link) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      await axios.post(
        BackendUrl + "/api/v1/content",
        { title, link, type },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      toast.success("Content added successfully");
      onClose();

    } catch (err) {
      toast.error("Failed to add content");
    } finally {
      setLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-white w-[400px] rounded-2xl shadow-xl p-6 space-y-5 z-10">

        <div className="flex justify-between items-center">
          <h2 className="text-lg font-semibold">Add Content</h2>
          <button onClick={onClose}>
            <CrossIcon />
          </button>
        </div>

        <div className="space-y-3">
          <Input reference={titleRef} placeholder="Title" />
          <Input reference={linkRef} placeholder="Link" />
        </div>

        <div>
          <p className="text-sm text-gray-500 mb-2">Content Type</p>
          <div className="flex gap-2">
            <Button
              size="sm"
              text="YouTube"
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button
              size="sm"
              text="Twitter"
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Twitter)}
            />
          </div>
        </div>

        <Button
          onClick={addContent}
          size="md"
          variant="primary"
          text={loading ? "Adding..." : "Add Content"}
          fullWidth
          loading={loading}
        />
      </div>
    </div>
  );
};

export default CreateContentModel;