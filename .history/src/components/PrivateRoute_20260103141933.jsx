import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebase.config";
import { motion } from "framer-motion";

const PrivateRoute = ({ children, redirectTo }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Loading Screen – তোমার সুন্দর animation same রেখেছি
  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 via-white to-gray-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="ml-4 text-gray-700 dark:text-gray-300 text-lg font-medium tracking-wide"
        >
          Loading, please wait...
        </motion.p>
      </div>
    );

  // যদি user না থাকে → login-এ পাঠাও
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // যদি redirectTo থাকে → সেখানে পাঠাও (পুরানো URL থেকে নতুন dashboard-এ)
  if (redirectTo) {
    return <Navigate to={redirectTo} replace />;
  }

  // Normal case – children দেখাও (dashboard layout বা অন্য প্রাইভেট পেজ)
  return children;
};

export default PrivateRoute;