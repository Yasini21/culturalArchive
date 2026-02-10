import { useState } from "react";
import API from "../services/api";

const AddStory = () => {
  const [title, setTitle] = useState("");
  const [region, setRegion] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setMessage("");

  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("region", region);
    formData.append("description", description);

    if (image) {
      formData.append("image", image); // 🔥 IMPORTANT
    }

    await API.post("/stories", formData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        // ❌ DO NOT set Content-Type manually
      },
    });

    setMessage("Your story has been submitted for approval.");

    setTitle("");
    setRegion("");
    setDescription("");
    setImage(null);
  } catch (err) {
    setMessage(err.response?.data?.msg || "Failed to submit story");
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="min-h-screen bg-[#FBF9F6] flex justify-center px-6 py-12">

      <div
        className="
          bg-white
          w-full
          max-w-xl
          p-10
          border border-[#E6E0D8]
          rounded-lg
        "
      >
        {/* TITLE */}
        <h1 className="text-2xl font-semibold text-[#2C2A28] mb-2">
          Add a Cultural Story
        </h1>

        <p className="text-sm text-[#6E6259] mb-8">
          Share traditions, memories, or practices from your region.
        </p>

        {/* FORM */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* TITLE */}
          <div>
            <label className="block text-sm mb-1 text-[#2C2A28]">
              Story Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="
                w-full
                px-4 py-2
                border border-[#E6E0D8]
                rounded-md
                focus:outline-none
                focus:border-[#7A4A2E]
              "
            />
          </div>

          {/* REGION */}
          <div>
            <label className="block text-sm mb-1 text-[#2C2A28]">
              Region
            </label>
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              required
              className="
                w-full
                px-4 py-2
                border border-[#E6E0D8]
                rounded-md
                focus:outline-none
                focus:border-[#7A4A2E]
              "
            />
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm mb-1 text-[#2C2A28]">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={5}
              required
              className="
                w-full
                px-4 py-2
                border border-[#E6E0D8]
                rounded-md
                focus:outline-none
                focus:border-[#7A4A2E]
              "
            />
          </div>

    {/* IMAGE UPLOAD */}
<div>
  <label className="block text-sm mb-1 text-[#3A2F2A]">
    Upload Image (optional)
  </label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => setImage(e.target.files[0])}
    className="
      w-full
      px-3 py-2
      border border-[#E6E0D8]
      rounded-md
      bg-white
    "
  />
</div>


          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="
              bg-[#7A4A2E]
              text-white
              px-6
              py-3
              rounded-md
              font-medium
              hover:bg-[#5E3823]
              transition
              disabled:opacity-60
            "
          >
            {loading ? "Submitting..." : "Submit Story"}
          </button>
        </form>

        {/* MESSAGE */}
        {message && (
          <p className="text-sm text-[#6E6259] mt-6">
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default AddStory;
