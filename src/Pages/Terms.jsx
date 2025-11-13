// pages/Terms.jsx
import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Terms & Conditions</h1>
      <p className="text-gray-700 mb-4">
        Welcome to Tech Gadget! These terms and conditions outline the rules and regulations 
        for using our services. By accessing or using our platform, you agree to comply with these terms.
      </p>
      <ul className="list-disc list-inside text-gray-700 space-y-2">
        <li>Keep your account information secure and confidential.</li>
        <li>Do not use the platform for any illegal activities.</li>
        <li>Provide accurate information about your products and services.</li>
        <li>Tech Gadget may update these terms at any time without prior notice.</li>
      </ul>
    </div>
  );
};

export default Terms;
