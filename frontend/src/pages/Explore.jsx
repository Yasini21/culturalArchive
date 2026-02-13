import { useEffect, useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Explore = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("");
  const [category, setCategory] = useState("");

  const navigate = useNavigate();
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  }

  // 🔄 Fetch All Stories
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

  useEffect(() => {
    fetchStories();
  }, []);

  // 🔍 Filter Stories
  const applyFilter = async () => {
    try {
      setLoading(true);
      const res = await API.get(
        `/stories/filter?region=${region}&category=${category}`
      );
      setStories(res.data);
    } catch (err) {
      console.error("Filter failed");
    } finally {
      setLoading(false);
    }
  };

  // ❤️ Like
  const handleLike = async (id) => {
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const res = await API.put(
        `/stories/like/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updatedStory = res.data;

      setStories((prevStories) =>
        prevStories.map((story) =>
          story._id === id ? updatedStory : story
        )
      );
    } catch (err) {
      console.error("Like failed");
    }
  };

  const deleteStory = async (id) => {
    if (!window.confirm("Delete this story?")) return;

    try {
      await API.delete(`/stories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setStories((prev) => prev.filter((story) => story._id !== id));
    } catch (err) {
      alert("Failed to delete story");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#FBF8F4] text-[#6B5B52]">
        Loading archive…
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#FBF8F4] px-6 py-12">

    {/* HEADER */}
    <div className="max-w-7xl mx-auto mb-12">
      <h1 className="text-4xl font-semibold text-[#2F2A24] mb-3">
        Cultural Archive
      </h1>
      <p className="text-[#6B5B52]">
        Preserving traditions through shared community knowledge.
      </p>
    </div>

    {/* MAIN LAYOUT */}
    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">

      {/* 🔎 SIDEBAR FILTER */}
      <div className="md:col-span-1 bg-white p-6 rounded-2xl shadow-sm border h-fit">

        <h2 className="text-lg font-semibold mb-6 text-[#2F2A24]">
          Filter Stories
        </h2>

        {/* Region */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Region
          </label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A4A2E]"
          >
            <option value="">All Regions</option>
            <option value="Nilgiris">Nilgiris</option>
            <option value="Ooty">Ooty</option>
            <option value="Coonoor">Coonoor</option>
            <option value="Kotagiri">Kotagiri</option>
          </select>
        </div>

        {/* Category */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7A4A2E]"
          >
            <option value="">All Categories</option>
            <option value="Ritual">Ritual</option>
            <option value="Festival">Festival</option>
            <option value="Food">Food</option>
            <option value="Language">Language</option>
            <option value="Oral History">Oral History</option>
            <option value="Dress">Dress</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={applyFilter}
            className="w-full px-4 py-2 bg-[#7A4A2E] text-white rounded-lg hover:bg-[#5f3923] transition"
          >
            Apply Filters
          </button>

          <button
            onClick={fetchStories}
            className="w-full px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* 📚 STORY FEED */}
      <div className="md:col-span-3 space-y-10">

        {stories.length === 0 && (
          <div className="bg-white p-10 rounded-2xl border text-center">
            <p className="text-gray-500">
              No stories found for selected filters.
            </p>
          </div>
        )}

        {stories.map((story) => {
          const isLiked = story.likes?.some(
            (id) => id.toString() === userId
          );

          return (
            <div
              key={story._id}
              className="bg-white rounded-2xl border shadow-sm overflow-hidden hover:shadow-md transition"
            >
              {story.image && (
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-64 object-cover"
                />
              )}

              <div className="p-6">

                <h2 className="text-2xl font-semibold mb-3 text-[#2F2A24]">
                  {story.title}
                </h2>

                <div className="flex flex-wrap items-center gap-3 mb-4 text-sm text-gray-500">

                  {story.region && (
                    <span className="px-2 py-1 bg-[#F1ECE5] rounded-full text-xs">
                      {story.region}
                    </span>
                  )}

                  {story.category && (
                    <span className="px-2 py-1 bg-[#E8E2D8] rounded-full text-xs">
                      {story.category}
                    </span>
                  )}

                  <span>
                    {new Date(story.createdAt).toLocaleDateString()}
                  </span>

                  {story.createdBy?._id && (
                    <div className="flex items-center gap-2">
  <div className="w-7 h-7 rounded-full bg-[#7A4A2E] text-white flex items-center justify-center text-xs">
    {story.createdBy.name?.charAt(0)}
  </div>

  <span
    onClick={() =>
      navigate(`/profile/${story.createdBy._id}`)
    }
    className="cursor-pointer font-medium text-[#7A4A2E] hover:underline"
  >
    {story.createdBy.name}
  </span>
</div>

                  )}
                </div>

                <p className="text-gray-700 mb-5 leading-relaxed">
                  {story.description}
                </p>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => handleLike(story._id)}
                    className="text-2xl transition-transform hover:scale-110"
                  >
                    {isLiked ? "♥" : "♡"}
                  </button>

                  <span className="text-sm font-medium text-gray-600">
                    {story.likes?.length || 0}
                  </span>

                  

                </div>

                {role === "admin" && (
                  <button
                    onClick={() => deleteStory(story._id)}
                    className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
                  >
                    Delete Story
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  </div>
);

};

export default Explore;
