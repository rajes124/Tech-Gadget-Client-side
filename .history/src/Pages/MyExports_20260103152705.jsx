import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiPackage, FiEdit2, FiTrash2, FiX, FiSave, FiGlobe, FiStar, FiBox } from "react-icons/fi";

const MyExports = () => {
  const theme = localStorage.getItem("theme") || "light";

  const [exports, setExports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));

  // Fetch, Delete, Edit – সব same (কোনো change নাই)

  useEffect(() => {
    const fetchExports = async () => {
      if (!user?.email) {
        setLoading(false);
        return;
      }

      try {
        const res = await fetch(`https://back-end-server-theta.vercel.app/my-exports/${user.email}`);
        if (!res.ok) throw new Error("Failed to fetch exports");
        const data = await res.json();
        setExports(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to load your exports!");
      } finally {
        setLoading(false);
      }
    };

    fetchExports();
  }, [user?.email]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this export?")) return;

    try {
      const res = await fetch(`https://back-end-server-theta.vercel.app/my-exports/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setExports(exports.filter((item) => item._id !== id));
      toast.success("Export deleted successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete!");
    }
  };

  const handleEdit = (item) => {
    setEditing(item._id);
    setEditData({ ...item });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`https://back-end-server-theta.vercel.app/my-exports/${editing}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editData),
      });

      if (!res.ok) throw new Error("Update failed");

      const updated = await res.json();
      setExports(exports.map((item) => (item._id === updated._id ? updated : item)));
      toast.success("Export updated successfully!");
      setEditing(null);
    } catch (error) {
      console.error(error);
      toast.error("Update failed!");
    }
  };

  // Loading & Empty states – same

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin w-16 h-16 border-6 border-blue-500 border-t-transparent rounded-full"></div>
      </div>
    );

  if (!user)
    return (
      <div className="text-center py-32 px-4">
        <FiPackage className="w-20 h-20 text-gray-400 mx-auto mb-6" />
        <h2 className="text-2xl font-bold text-gray-700 dark:text-gray-300">
          Please log in to manage your exports
        </h2>
      </div>
    );

  if (exports.length === 0)
    return (
      <div className="text-center py-32 px-4">
        <FiPackage className="w-24 h-24 text-gray-300 dark:text-gray-600 mx-auto mb-8" />
        <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-4">
          My Exports
        </h2>
        <p className="text-xl text-gray-500 dark:text-gray-400">
          No exported products yet. Start adding from "Add Export"!
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      {/* Header */}
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-black mb-4">
          <span className="text-gray-800 dark:text-white">My</span>{" "}
          <span className="text-transparent bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text">
            Exported Products
          </span>
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-400">
          Manage all products you have listed for export
        </p>
      </div>

      {/* Cards Grid – gap কমানো, card compact */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {exports.map((item) => (
          <div
            key={item._id}
            className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl 
              overflow-hidden transition-all duration-500 border border-gray-200 dark:border-gray-700 
              flex flex-col h-full"
          >
            {/* Image – fixed height */}
            <div className="relative overflow-hidden h-48">
              <img
                src={item.image || "https://i.ibb.co/2kzH8v1/no-image.png"}
                alt={item.productName}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>

            {/* Content – compact */}
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-2">
                  {item.productName}
                </h3>

                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                  <p className="flex items-center gap-2">
                    <FiGlobe className="w-4 h-4 text-blue-500" />
                    {item.originCountry || "Global"}
                  </p>
                  <p className="flex items-center gap-2">
                    <FiStar className="w-4 h-4 text-yellow-500" />
                    Rating: <span className="font-medium">{item.rating || "N/A"}</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <FiBox className="w-4 h-4 text-green-500" />
                    Available: <span className="font-medium">{item.availableQuantity} pcs</span>
                  </p>
                </div>

                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-3">
                  ${item.price?.toLocaleString()}
                </p>
              </div>

              {/* Actions – compact buttons */}
              <div className="grid grid-cols-2 gap-3 mt-5">
                <button
                  onClick={() => handleEdit(item)}
                  className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white py-2.5 rounded-xl text-sm font-medium transition"
                >
                  <FiEdit2 className="w-4 h-4" />
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(item._id)}
                  className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium transition"
                >
                  <FiTrash2 className="w-4 h-4" />
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal – same as before */}
      {editing && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative">
            <button
              onClick={() => setEditing(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <FiX className="w-6 h-6 text-gray-600 dark:text-gray-300" />
            </button>

            <h2 className="text-3xl font-black text-center mb-8 text-gray-800 dark:text-white">
              Update Export Product
            </h2>

            <form onSubmit={handleUpdate} className="space-y-6">
              {[
                { label: "Product Name", name: "productName", icon: FiPackage },
                { label: "Image URL", name: "image", icon: FiPackage },
                { label: "Price ($)", name: "price", icon: FiPackage },
                { label: "Origin Country", name: "originCountry", icon: FiGlobe },
                { label: "Rating (0-5)", name: "rating", icon: FiStar },
                { label: "Available Quantity", name: "availableQuantity", icon: FiBox },
              ].map((field) => (
                <div key={field.name} className="relative">
                  <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    {field.icon && <field.icon className="inline w-5 h-5 mr-2 text-blue-500" />}
                    {field.label}
                  </label>
                  <input
                    type={field.name === "price" || field.name === "rating" || field.name === "availableQuantity" ? "number" : "text"}
                    value={editData[field.name] || ""}
                    onChange={(e) => setEditData({ ...editData, [field.name]: e.target.value })}
                    className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-2xl focus:ring-4 focus:ring-blue-400/50 focus:border-blue-500 text-gray-900 dark:text-white transition-all"
                    required
                  />
                </div>
              ))}

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300"
                >
                  <FiSave className="w-5 h-5" />
                  Save Changes
                </button>
                <button
                  type="button"
                  onClick={() => setEditing(null)}
                  className="flex-1 py-4 bg-gray-400 hover:bg-gray-500 text-white rounded-2xl font-bold text-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer 
        position="bottom-right" 
        theme={theme === "dark" ? "dark" : "light"} 
      />
    </div>
  );
};

export default MyExports;