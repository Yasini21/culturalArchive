import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";

const MyStories = () => {
  const [stories, setStories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchMyStories = async () => {
      try {
        const res = await API.get("/stories/mystories", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setStories(res.data);
      } catch (err) {
        console.error("Failed to fetch your stories");
      }
    };

    fetchMyStories();
  }, []);

  return (
    <div className="min-h-screen bg-[#FBF8F4] px-4 sm:px-6 py-12">

      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-semibold mb-10 text-[#2F2A24]">
          My Contributions
        </h2>

        {stories.length === 0 && (
          <div className="bg-white p-8 rounded-xl border text-center text-gray-500">
            You haven’t contributed any stories yet.
          </div>
        )}

        <div className="space-y-8">

          {stories.map((story) => (

            <div
              key={story._id}
              className="bg-white rounded-2xl border shadow-sm hover:shadow-md transition overflow-hidden"
            >

              {/* Image */}
              {story.image && (
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-56 object-cover"
                />
              )}

              <div className="p-6">

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 text-[#2F2A24]">
                  {story.title}
                </h3>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                  <span>{story.region}</span>
                  <span>•</span>
                  <span>{story.category}</span>
                  <span>•</span>
                  <span>{story.era}</span>
                  <span>•</span>
                  <span>
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Description */}
                <p className="text-gray-700 mb-4">
                  {story.description}
                </p>

                {/* Status Badge */}
                <div className="mb-4">
                  {story.isApproved ? (
                    <span className="px-3 py-1 text-xs bg-green-100 text-green-700 rounded-full">
                      Approved
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full">
                      Pending Approval
                    </span>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">

                  <button
                    onClick={() => navigate(`/edit/${story._id}`)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>

                </div>

              </div>
            </div>

          ))}

        </div>
      </div>
    </div>
  );
};

export default MyStories;
