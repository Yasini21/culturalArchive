import { useEffect, useState } from "react";
import API from "../../services/api";

const AdminApproval = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPending = async () => {
    try {
      const res = await API.get("/stories/pending", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setStories(res.data);
    } catch (err) {
      alert("Failed to load pending stories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPending();
  }, []);

  const approveStory = async (id) => {
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

      setStories((prev) => prev.filter((s) => s._id !== id));
    } catch (err) {
      alert("Approval failed");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F5F3EF] text-[#6B5B52]">
        Loading admin panel…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F3EF] px-6 py-12">
      <div className="max-w-5xl mx-auto">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#2E2A26]">
            Pending Story Approvals
          </h1>
          <p className="text-sm text-[#6B5B52] mt-1">
            Review submissions before publishing them publicly
          </p>
        </div>

        {/* EMPTY STATE */}
        {stories.length === 0 && (
          <div className="bg-white border border-[#E6DDD2] p-10">
            <p className="text-[#6B5B52]">
              No pending stories at the moment.
            </p>
          </div>
        )}

        {/* STORY LIST */}
        <div className="space-y-10">
          {stories.map((story) => (
            <div
              key={story._id}
              className="bg-white border border-[#E6DDD2] p-8"
            >
              {/* OPTIONAL IMAGE */}
              {story.image && (
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full max-h-64 object-cover mb-6"
                />
              )}

              <h2 className="text-xl font-semibold text-[#2E2A26] mb-1">
                {story.title}
              </h2>

              <p className="text-sm text-[#8B5E3C] mb-4">
                Region: {story.region}
              </p>

              <p className="text-[#5E564D] leading-relaxed mb-8">
                {story.description}
              </p>

              <button
                onClick={() => approveStory(story._id)}
                className="
                  bg-[#A89CC8]
                  text-white
                  px-6
                  py-2
                  rounded-md
                  hover:bg-[#9488B8]
                  transition
                "
              >
                Approve Story
              </button>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default AdminApproval;
