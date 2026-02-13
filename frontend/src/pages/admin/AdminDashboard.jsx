import { useEffect, useState } from "react";
import API from "../../services/api";

const AdminDashboard = () => {
  const [pendingStories, setPendingStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedId, setExpandedId] = useState(null);

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

      setPendingStories((prev) =>
        prev.filter((story) => story._id !== id)
      );
    } catch (err) {
      alert("Failed to approve story");
    }
  };

  const rejectStory = async (id) => {
    if (!window.confirm("Reject this story?")) return;

    try {
      await API.put(
        `/stories/${id}/reject`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setPendingStories((prev) =>
        prev.filter((story) => story._id !== id)
      );
    } catch (err) {
      alert("Failed to reject story");
    }
  };

  useEffect(() => {
    fetchPendingStories();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF9F6] px-6 md:px-12 py-10">

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold text-[#2C2A28] mb-2">
          Admin Dashboard
        </h1>
        <p className="text-sm text-[#6E6259]">
          Review and moderate user-submitted cultural stories.
        </p>
      </div>

      {/* LOADING STATE */}
      {loading ? (
        <p>Loading pending stories...</p>
      ) : pendingStories.length === 0 ? (
        <p className="text-[#6E6259]">No pending stories 🎉</p>
      ) : (

        <div className="space-y-8">
          {pendingStories.map((story) => (
            <div
              key={story._id}
              className="bg-white border border-[#E6E0D8] rounded-2xl p-6 shadow-sm hover:shadow-md transition"
            >

              {/* TOP SECTION */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">

                {/* LEFT CONTENT */}
                <div className="flex-1">

                  {/* TITLE */}
                  <h3 className="text-xl font-semibold text-[#2C2A28] mb-2">
                    {story.title}
                  </h3>

                  {/* META INFO */}
                  <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-3">

                    {story.region && (
                      <span className="px-2 py-1 bg-[#E6E0D8] rounded-full text-xs">
                        {story.region}
                      </span>
                    )}

                    {story.category && (
                      <span className="px-2 py-1 bg-[#F1ECE5] rounded-full text-xs">
                        {story.category}
                      </span>
                    )}

                    {story.era && (
                      <span className="text-xs text-gray-500">
                        Era: {story.era}
                      </span>
                    )}

                    <span>
                      {new Date(story.createdAt).toLocaleDateString()}
                    </span>

                    <span>
                      Submitted by:{" "}
                      <span className="font-medium">
                        {story.createdBy?.name || "Unknown"}
                      </span>
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <div className="text-sm text-[#3A2F2A] leading-relaxed">

                    {expandedId === story._id
                      ? story.description
                      : story.description.slice(0, 250) + "..."}

                    {story.description.length > 250 && (
                      <button
                        onClick={() =>
                          setExpandedId(
                            expandedId === story._id ? null : story._id
                          )
                        }
                        className="ml-2 text-blue-600 text-xs"
                      >
                        {expandedId === story._id
                          ? "Show Less"
                          : "Read More"}
                      </button>
                    )}
                  </div>

                </div>

                {/* ACTION BUTTONS */}
                <div className="flex gap-3">
                 <button
  onClick={() => approveStory(story._id)}
  className="px-4 py-1.5 bg-green-600 text-white rounded-md text-sm hover:bg-green-700 transition"
>
  {story.isEditRequest ? "Re-Approve" : "Approve"}
</button>


                  <button
                    onClick={() => rejectStory(story._id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
                  >
                    Reject
                  </button>
                </div>
              </div>

              {/* IMAGE */}
              {story.image && (
                <img
                  src={story.image}
                  alt="story"
                  className="mt-6 w-full max-h-72 object-cover rounded-xl"
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
