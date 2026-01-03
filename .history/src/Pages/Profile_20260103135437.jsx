import React, { useEffect, useState } from "react";
import { auth } from "../firebase.config";
import { updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("user"));
    if (u) {
      setUser(u);
      setName(u.displayName || "");
      setPhoto(u.photoURL || "");
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <p className="text-gray-700 dark:text-gray-300">No user logged in</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-500 py-16">
      <div className="max-w-xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 text-center">
        <img
          src={photo || "https://i.ibb.co/2kzH8v1/user.png"}
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />

        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {user.displayName || "Anonymous"}
        </h2>

        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>

        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mt-6 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Your name"
        />

        <input
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          className="w-full mt-3 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
          placeholder="Photo URL"
        />

        <button
          onClick={async () => {
            await updateProfile(auth.currentUser, {
              displayName: name,
              photoURL: photo,
            });
            toast.success("Profile updated");
          }}
          className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-bold"
        >
          Save Changes
        </button>
      </div>

      <ToastContainer
        theme={document.documentElement.classList.contains("dark") ? "dark" : "light"}
      />
    </div>
  );
};

export default Profile;
