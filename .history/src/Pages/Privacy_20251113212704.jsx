
import React from "react";

const Privacy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        At Tech Gadget, we take your personal information seriously. This Privacy Policy explains 
        how we collect, use, and protect your data when you use our platform.
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>We keep all user personal information confidential.</li>
        <li>We do not share data with third parties unless legally required.</li>
        <li>Cookies and tracking technologies may be used to improve your experience.</li>
        <li>Privacy Policy may be updated from time to time.</li>
      </ul>
    </div>
  );
};

export default Privacy;
