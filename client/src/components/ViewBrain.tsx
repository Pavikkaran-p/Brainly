import axios from "axios";
import { useEffect, useState } from "react";
import { BackendUrl } from "../config/config";
import DisplayContents from "./DisplayContents";
import { useParams } from "react-router-dom";

const ViewBrain = () => {
  const { brainUrl } = useParams();

  const [contents, setContents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!brainUrl) return;

    const controller = new AbortController();

    const fetchBrain = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          `${BackendUrl}/api/v1/brain/${brainUrl}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            signal: controller.signal,
          }
        );

        setContents(response.data?.content || []);
      } catch (err: any) {
        if (axios.isCancel(err)) return;

        console.error(err);
        setError(
          err?.response?.data?.message ||
            "Failed to load brain content. Try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchBrain();

    return () => controller.abort(); // cleanup
  }, [brainUrl]);

  if (loading) {
    return <div className="p-4 text-gray-500">Loading content...</div>;
  }

  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
        <button
          className="ml-3 underline"
          onClick={() => window.location.reload()}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Brain Contents</h2>

      {contents.length === 0 ? (
        <div className="text-gray-400">No content available</div>
      ) : (
        <DisplayContents contents={contents} />
      )}
    </div>
  );
};

export default ViewBrain;