import React, { useState, useEffect } from "react";
import { auth } from "../firebase.config";
import { updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Mail,
  Camera,
  Edit3,
  Check,
  X,
  Loader2,
} from "lucide-react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

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
    setSaving(true);
    try {
      await updateProfile(auth.currentUser, {
        displayName: name.trim() || null,
        photoURL: photo.trim() || null,
      });

      const updatedUser = {
        ...auth.currentUser,
        displayName: name.trim() || null,
        photoURL: photo.trim() || null,
        email: auth.currentUser.email,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      toast.success("Profile updated successfully!");
      setShowForm(false);
    } catch (err) {
      toast.error(`Update failed: ${err.message}`);
    } finally {
      setSaving(false);
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-600 dark:text-gray-400">No user logged in.</p>
      </div>
    );
  }

  return (
    <>
      {/* No bg class here - inherit from App.jsx (white in light, black in dark) */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-500">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-600 to-blue-600 px-8 py-10 text-center">
              <h2 className="text-3xl font-bold text-white flex items-center justify-center gap-3">
                <User className="w-9 h-9" />
                My Profile
              </h2>
            </div>

            <div className="p-8 lg:p-12">
              <div className="flex flex-col items-center gap-8">
                {/* Photo */}
                <div className="relative group">
                  <img
                    src={photo || "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt={name || email}
                    className="w-40 h-40 rounded-full object-cover border-4 border-indigo-500 shadow-xl transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 rounded-full bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                    <Camera className="w-10 h-10 text-white" />
                  </div>
                </div>

                {/* Info */}
                <div className="text-center space-y-3">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {user.displayName || "Anonymous User"}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-300 flex items-center justify-center gap-2">
                    <Mail className="w-5 h-5" />
                    {user.email}
                  </p>
                </div>

                {/* Edit Button */}
                <button
                  onClick={() => setShowForm(!showForm)}
                  className="flex items-center gap-3 px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300"
                >
                  {showForm ? (
                    <>
                      <X className="w-5 h-5" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit3 className="w-5 h-5" />
                      Edit Profile
                    </>
                  )}
                </button>

                {/* Form */}
                <AnimatePresence>
                  {showForm && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="w-full mt-6 pt-6 border-t border-gray-200 dark:border-gray-700 space-y-6"
                    >
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Email (Read-only)
                        </label>
                        <div className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed flex items-center gap-2">
                          <Mail className="w-5 h-5" />
                          {email}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Photo URL
                        </label>
                        <input
                          type="url"
                          value={photo}
                          onChange={(e) => setPhoto(e.target.value)}
                          className="w-full px-5 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                          placeholder="https://example.com/photo.jpg"
                        />
                        {photo && (
                          <div className="mt-3 flex justify-center">
                            <img
                              src={photo}
                              alt="Preview"
                              className="w-24 h-24 rounded-lg object-cover border-2 border-indigo-500 shadow"
                              onError={(e) => (e.target.style.display = "none")}
                            />
                          </div>
                        )}
                      </div>

                      <button
                        onClick={handleUpdateProfile}
                        disabled={saving}
                        className="w-full py-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-3"
                      >
                        {saving ? (
                          <>
                            <Loader2 className="w-6 h-6 animate-spin" />
                            Saving...
                          </>
                        ) : (
                          <>
                            <Check className="w-6 h-6" />
                            Save Changes
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <ToastContainer position="bottom-right" theme="colored" />
    </>
  );
};

export default Profile;