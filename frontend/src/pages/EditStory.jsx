import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../services/api";

const EditStory = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    region: "",
    category: "",
    era: "",
  });

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const res = await API.get(`/stories/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

setFormData({
  title: res.data.title || "",
  description: res.data.description || "",
  region: res.data.region || "",
  category: res.data.category || "",
  era: res.data.era || "",
});

      } catch (err) {
        console.error("Failed to load story");
      }
    };

    fetchStory();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/stories/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      alert("Story updated and sent for re-approval.");
      navigate("/explore");

    } catch (err) {
      alert("Update failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF8F4] px-6 py-12">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border">

        <h2 className="text-2xl font-semibold mb-6">
          Edit Story
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Title */}
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            placeholder="Title"
            required
          />

          {/* Description */}
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            rows="5"
            placeholder="Description"
            required
          />

          {/* Region */}
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          >
            <option value="">Select Region</option>
            <option value="Nilgiris">Nilgiris</option>
            <option value="Ooty">Ooty</option>
            <option value="Coonoor">Coonoor</option>
            <option value="Kotagiri">Kotagiri</option>
          </select>

          {/* Category */}
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          >
            <option value="">Select Category</option>
            <option value="Ritual">Ritual</option>
            <option value="Festival">Festival</option>
            <option value="Food">Food</option>
            <option value="Language">Language</option>
            <option value="Oral History">Oral History</option>
            <option value="Dress">Dress</option>
          </select>

          {/* Era */}
          <select
            name="era"
            value={formData.era}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
            required
          >
            <option value="">Select Era</option>
            <option value="Ancient">Ancient</option>
            <option value="Colonial">Colonial</option>
            <option value="Modern">Modern</option>
          </select>

          <button
            type="submit"
            className="px-6 py-2 bg-[#7A4A2E] text-white rounded-lg hover:bg-[#5f3923]"
          >
            Update Story
          </button>

        </form>
      </div>
    </div>
  );
};

export default EditStory;
