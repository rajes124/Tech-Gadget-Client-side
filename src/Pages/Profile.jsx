import React, { useState, useEffect } from "react";
import { auth } from "../firebase.config";
import { updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setName(storedUser.displayName || "");
      setPhoto(storedUser.photoURL || "");
      setEmail(storedUser.email || "");
    }
  }, []);

  const handleUpdateProfile = async () => {
    if (!auth.currentUser) return;
    setLoading(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: photo,
      });

      const updatedUser = {
        ...auth.currentUser,
        displayName: name,
        photoURL: photo,
        email: auth.currentUser.email,
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success("✅ Profile updated successfully!");
      setShowForm(false);
    } catch (err) {
      toast.error(`❌ ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (!user)
    return <p className="text-center mt-20 text-gray-500">No user logged in.</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md flex flex-col items-center gap-5 transition-all duration-300">
        <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>

        {/* Profile Photo */}
        <img
          src={photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
          alt={name || user.email}
          className="w-28 h-28 rounded-full border-4 border-blue-500 object-cover shadow-md transition-transform duration-300 hover:scale-105"
        />

        {/* User Info */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-800">
            {user.displayName || "No Name"}
          </h3>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Toggle Button */}
        <button
          onClick={() => setShowForm(!showForm)}
          className="mt-3 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md"
        >
          {showForm ? "Close Editor" : "Edit Profile"}
        </button>

        {/* Edit Form */}
        {showForm && (
          <div className="w-full flex flex-col gap-4 mt-4 border-t pt-4">
            <div className="w-full flex flex-col text-left">
              <label className="text-gray-700 font-medium mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                placeholder="Enter your name"
              />
            </div>

            <div className="w-full flex flex-col text-left">
              <label className="text-gray-700 font-medium mb-1">Email</label>
              <input
                type="email"
                value={email}
                readOnly
                className="border border-gray-300 p-2 rounded-lg text-gray-500 bg-gray-100 cursor-not-allowed text-base"
              />
            </div>

            <div className="w-full flex flex-col text-left">
              <label className="text-gray-700 font-medium mb-1">
                Photo URL
              </label>
              <input
                type="text"
                value={photo}
                onChange={(e) => setPhoto(e.target.value)}
                className="border border-gray-300 p-2 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                placeholder="Enter photo URL"
              />
            </div>

            <button
              onClick={handleUpdateProfile}
              disabled={loading}
              className={`mt-3 w-full py-2.5 rounded-lg font-semibold text-white transition-all duration-300 ${
                loading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 shadow-md"
              }`}
            >
              {loading ? "Updating..." : "Save Changes"}
            </button>
          </div>
        )}
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </div>
  );
};

export default Profile;
