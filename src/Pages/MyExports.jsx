import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MyExports = () => {
  const [exports, setExports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch Exports
  useEffect(() => {
    const fetchExports = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`http://localhost:4000/my-exports/${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch exports");
        const data = await res.json();
        setExports(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch data!");
      } finally {
        setLoading(false);
      }
    };

    fetchExports();
  }, [user?.email]);

  // Delete Product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      const res = await fetch(`http://localhost:4000/my-exports/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete");

      setExports(exports.filter((item) => item._id !== id));
      toast.success("✅ Product deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("❌ Delete failed!");
    }
  };

  // Open Modal
  const handleEdit = (item) => {
    setEditing(item._id);
    setEditData({ ...item });
  };

  // Update Data
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:4000/my-exports/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Failed to update");

      const updated = await res.json();
      setExports(exports.map((item) => (item._id === updated._id ? updated : item)));
      toast.success("✅ Product updated successfully!");
      setEditing(null);
    } catch (error) {
      console.error(error);
      toast.error("❌ Update failed!");
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );

  if (!user)
    return (
      <div className="text-center mt-20">
        <h2 className="text-xl font-semibold text-gray-800">
          Please log in to view your exports.
        </h2>
      </div>
    );

  if (exports.length === 0)
    return (
      <div className="text-center mt-20">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">My Exports</h2>
        <p className="text-gray-500">No exports found yet.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pt-24 px-6">
      <h2 className="text-3xl font-extrabold text-center mb-10 text-gray-800 tracking-wide">
        My Exported Products
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-7xl mx-auto">
        {exports.map((item) => (
          <div
            key={item._id}
            className="bg-white border border-gray-100 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.productName}
              className="w-full h-48 object-cover rounded-t-2xl"
            />
            <div className="p-5">
              <h3 className="font-semibold text-lg text-gray-800 mb-1">
                {item.productName}
              </h3>
              <p className="text-sm text-gray-500 mb-2">
                🌍 {item.originCountry}
              </p>
              <p className="text-sm text-gray-600 mb-1">
                ⭐ Rating: <span className="font-semibold">{item.rating}</span>
              </p>
              <p className="text-sm text-gray-600 mb-1">
                📦 Quantity:{" "}
                <span className="font-semibold">{item.availableQuantity}</span>
              </p>
              <p className="text-lg font-bold text-blue-600 mt-3">
                ৳ {item.price}
              </p>

              <div className="flex justify-between mt-5">
                <button
                  onClick={() => handleEdit(item)}
                  className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-blue-700 transition-all duration-300"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-medium hover:from-red-600 hover:to-red-700 transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ✳️ Update Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-2xl p-8 shadow-2xl animate-fadeIn">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
              ✏️ Update Product
            </h2>

            <form onSubmit={handleUpdate} className="space-y-4">
              {[
                { label: "Product Name", name: "productName" },
                { label: "Image URL", name: "image" },
                { label: "Price ($)", name: "price" },
                { label: "Origin Country", name: "originCountry" },
                { label: "Rating (0-5)", name: "rating" },
                { label: "Available Quantity", name: "availableQuantity" },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {field.label}
                  </label>
                  <input
                    type="text"
                    name={field.name}
                    value={editData[field.name] || ""}
                    onChange={(e) =>
                      setEditData({ ...editData, [field.name]: e.target.value })
                    }
                    className="w-full border border-gray-300 text-green-800 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 p-2.5 rounded-lg outline-none transition"
                    required
                  />
                </div>
              ))}

              <div className="flex justify-between mt-6">
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-green-700 transition-all duration-300"
                >
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="px-5 py-2 bg-gray-400 text-white rounded-lg font-medium hover:bg-gray-500 transition-all duration-300"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer position="bottom-right" theme="colored" />
    </div>
  );
};

export default MyExports;
