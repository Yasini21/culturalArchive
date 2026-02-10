import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const Explore = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStories = async () => {
      try {
        const res = await API.get("/stories");
        setStories(res.data);
      } catch (err) {
        console.error("Failed to load stories");
      } finally {
        setLoading(false);
      }
    };

    fetchStories();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F4] text-[#6B5B52]">
        Loading archive…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F4] px-6 py-16">

      {/* HEADER */}
      <div className="max-w-4xl mx-auto mb-16">
        <h1 className="text-4xl font-semibold text-[#3A2F2A] mb-4">
          Cultural Archive
        </h1>
        <p className="text-[#6B5B52] leading-relaxed">
          A growing collection of traditions, memories, and practices
          shared by communities to preserve cultural knowledge.
        </p>
      </div>

      {/* EMPTY STATE */}
      {stories.length === 0 && (
        <div className="max-w-3xl mx-auto bg-white border border-[#E6DDD2] p-12">
          <p className="text-[#6B5B52] mb-4">
            This archive is currently empty.
          </p>
          <p className="text-[#6B5B52] mb-8">
            Cultural memory begins when someone chooses to record it.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="
              border
              border-[#A89CC8]
              text-[#7A6BB7]
              px-6
              py-2.5
              hover:bg-[#A89CC8]
              hover:text-white
              transition
            "
          >
            Login to contribute
          </button>
        </div>
      )}

      {/* STORIES LIST (ARCHIVE STYLE) */}
      {stories.length > 0 && (
        <div className="max-w-5xl mx-auto space-y-14">
          {stories.map((story) => (
            <div
              key={story._id}
              className="border-b border-[#E6DDD2] pb-10"
            >
              {/* OPTIONAL IMAGE */}
              {story.image && (
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full max-h-[360px] object-cover mb-6"
                />
              )}

              <h2 className="text-2xl font-semibold text-[#3A2F2A] mb-2">
                {story.title}
              </h2>

              <p className="text-sm text-[#8B5E3C] mb-4">
                Region: {story.region}
              </p>

              <p className="text-[#5E564D] leading-relaxed max-w-3xl">
                {story.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Explore;
