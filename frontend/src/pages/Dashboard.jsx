import { useEffect, useState } from "react";
import API from "../services/api";

const Dashboard = () => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    fetchMyStories();
  }, []);

  const fetchMyStories = async () => {
    const res = await API.get("/stories/my-stories");
    setStories(res.data);
  };

  const handleEdit = async (id) => {
    const newTitle = prompt("Enter new title");
    const newContent = prompt("Enter new content");

    await API.post(`/stories/edit/${id}`, {
      title: newTitle,
      content: newContent
    });

    alert("Edit request sent for approval");
    fetchMyStories();
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">My Dashboard</h2>

      {stories.map((story) => (
        <div key={story._id} className="border p-4 mb-4 rounded">

          <h3 className="text-xl font-semibold">{story.title}</h3>

          <p>Status:
            {story.status === "approved" && (
              <span className="text-green-600 ml-2">Approved</span>
            )}
            {story.status === "pending" && (
              <span className="text-yellow-600 ml-2">Pending</span>
            )}
            {story.status === "rejected" && (
              <span className="text-red-600 ml-2">Rejected</span>
            )}
          </p>

          {story.status === "approved" && (
            <button
              onClick={() => handleEdit(story._id)}
              className="bg-blue-500 text-white px-3 py-1 mt-2 rounded"
            >
              Edit
            </button>
          )}

        </div>
      ))}
    </div>
  );
};

export default Dashboard;
