import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Privacy Policy</h1>
      <p className="text-gray-700 dark:text-gray-300 mb-4">
        At Tech Gadget, we value your privacy and are committed to protecting your personal information.
      </p>
      <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">Information We Collect</h2>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-6">
        <li>Personal details (name, email, address) during registration or purchase</li>
        <li>Payment information (processed securely via third-party gateways)</li>
        <li>Browsing behavior and preferences (via cookies)</li>
      </ul>
      <h2 className="text-xl font-semibold mb-3 text-blue-600 dark:text-blue-400">How We Use Your Information</h2>
      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2 mb-6">
        <li>To process and fulfill your orders</li>
        <li>To improve our services and website experience</li>
        <li>To send promotional offers (you can opt-out anytime)</li>
      </ul>
      <p className="text-gray-700 dark:text-gray-300">
        We never sell your data to third parties. Your information is stored securely and 
        complies with applicable data protection laws.
      </p>
    </div>
  );
};

export default PrivacyPolicy;