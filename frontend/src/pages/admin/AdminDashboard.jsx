import { useEffect, useState } from "react";
import API from "../../services/api";

const AdminDashboard = () => {
  const [pendingStories, setPendingStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingStories = async () => {
    try {
      const res = await API.get("/stories/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setPendingStories(res.data);
    } catch (err) {
      console.error("Failed to load pending stories");
    } finally {
      setLoading(false);
    }
  };

  const approveStory = async (id) => {
  if (!window.confirm("Approve this story?")) return;

  try {
    await API.put(
      `/stories/${id}/approve`,
      {},
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    // remove approved story from list
    setPendingStories((prev) =>
      prev.filter((story) => story._id !== id)
    );
  } catch (err) {
    alert("Failed to approve story");
  }
};


  useEffect(() => {
    fetchPendingStories();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F6] px-8 py-10">

      <h1 className="text-2xl font-semibold text-[#2C2A28] mb-2">
        Admin Dashboard
      </h1>
      <p className="text-sm text-[#6E6259] mb-8">
        Review and moderate user-submitted cultural stories.
      </p>

      {loading ? (
        <p>Loading pending stories...</p>
      ) : pendingStories.length === 0 ? (
        <p className="text-[#6E6259]">No pending stories 🎉</p>
      ) : (
        
        <div>
  {pendingStories.map((story) => (
    <div
      key={story._id}
      className="border border-[#E6E0D8] rounded-lg p-5 mb-6 bg-white"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{story.title}</h3>

          <p className="text-sm text-gray-600">
            Region: {story.region}
          </p>

          <p className="text-sm text-gray-600">
            Submitted by: {story.createdBy?.email || "Unknown"}
          </p>

          <p className="text-xs text-gray-500">
            {new Date(story.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => approveStory(story._id)}
            className="px-3 py-1 bg-green-600 text-white rounded"
          >
            Approve
          </button>

          <button
            className="px-3 py-1 bg-red-600 text-white rounded"
          >
            Reject
          </button>
        </div>
      </div>

      {/* FULL CONTENT */}
      <div className="mt-4 text-sm text-[#3A2F2A] whitespace-pre-line">
        {story.description}
      </div>

      {/* IMAGE (OPTIONAL) */}
      {story.image && (
        <img
          src={story.image}
          alt="story"
          className="mt-4 max-h-64 rounded"
        />
      )}
    </div>
  ))}
</div>

      )}
    </div>
  );
};

export default AdminDashboard;
