import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FiTrash2, FiUserCheck } from "react-icons/fi";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://back-end-server-theta.vercel.app/admin/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        toast.error("Failed to load users");
        setLoading(false);
      });
  }, []);

  const handleMakeAdmin = async (email) => {
    if (!confirm("Make this user Admin?")) return;
    try {
      await fetch(`https://back-end-server-theta.vercel.app/admin/make-admin/${email}`, { method: "PATCH" });
      setUsers(users.map(u => u.email === email ? { ...u, role: "admin" } : u));
      toast.success("User promoted to Admin!");
    } catch {
      toast.error("Failed");
    }
  };

  const handleDelete = async (email) => {
    if (!confirm("Delete this user permanently?")) return;
    try {
      await fetch(`https://back-end-server-theta.vercel.app/admin/delete-user/${email}`, { method: "DELETE" });
      setUsers(users.filter(u => u.email !== email));
      toast.success("User deleted");
    } catch {
      toast.error("Failed");
    }
  };

  if (loading) return <div className="text-center py-20">Loading users...</div>;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-center mb-10">Manage Users</h1>
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                <tr>
                  <th className="p-6 text-left">Name</th>
                  <th className="p-6 text-left">Email</th>
                  <th className="p-6 text-left">Role</th>
                  <th className="p-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u.email} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <td className="p-6">{u.name || "N/A"}</td>
                    <td className="p-6">{u.email}</td>
                    <td className="p-6">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold ${u.role === "admin" ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
                        {u.role || "user"}
                      </span>
                    </td>
                    <td className="p-6 text-center space-x-3">
                      {u.role !== "admin" && (
                        <button onClick={() => handleMakeAdmin(u.email)} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-xl">
                          <FiUserCheck className="inline mr-2" />Make Admin
                        </button>
                      )}
                      <button onClick={() => handleDelete(u.email)} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl">
                        <FiTrash2 className="inline mr-2" />Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default ManageUsers;