import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../services/api";

const Profile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get(`/users/${id}/profile`);
        setProfile(res.data);
      } catch (err) {
        console.error("Failed to fetch profile");
      }
    };

    fetchProfile();
  }, [id]);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FBF8F4] px-6 py-12">

      <div className="max-w-5xl mx-auto">

        {/* PROFILE HEADER */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 mb-10">

          <div className="flex flex-col md:flex-row md:items-center md:justify-between">

            <div>
              <h2 className="text-3xl font-semibold text-[#2F2A24] mb-2">
                {profile.user.name}
              </h2>

              <p className="text-gray-500 text-sm">
                Joined {new Date(profile.user.createdAt).toDateString()}
              </p>
            </div>

            <div className="mt-6 md:mt-0 flex gap-10">

              <div className="text-center">
                <p className="text-2xl font-semibold text-[#2F2A24]">
                  {profile.stories.length}
                </p>
                <p className="text-sm text-gray-500">Stories</p>
              </div>

              <div className="text-center">
                <p className="text-2xl font-semibold text-[#2F2A24]">
                  {profile.totalLikes}
                </p>
                <p className="text-sm text-gray-500">Total Likes</p>
              </div>

            </div>

          </div>
        </div>

        {/* STORIES SECTION */}
        <div>
          <h3 className="text-xl font-semibold mb-6 text-[#2F2A24]">
            Contributions
          </h3>

          <div className="space-y-6">

            {profile.stories.length === 0 && (
              <div className="bg-white p-6 rounded-xl border text-center text-gray-500">
                No stories contributed yet.
              </div>
            )}
            

            {profile.stories.map((story) => (

              <div
                key={story._id}
                className="bg-white p-6 rounded-2xl border shadow-sm hover:shadow-md transition"
              >
                {/* IMAGE */}
    {story.image && (
      <img
        src={story.image}
        alt={story.title}
        className="w-full h-48 object-cover rounded-lg mb-4"
      />
    )}

    {/* TITLE */}
    <h4 className="text-lg font-semibold mb-2 text-[#2F2A24]">
      {story.title}
    </h4>

                <p className="text-gray-600 text-sm mb-3">
                  {new Date(story.createdAt).toLocaleDateString()}
                </p>

                <p className="text-gray-700 mb-4">
                  {story.description}
                </p>

                <p className="text-sm text-gray-500">
                  ❤️ {story.likes.length} Likes
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default Profile;
