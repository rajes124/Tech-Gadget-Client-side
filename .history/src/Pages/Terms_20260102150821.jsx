import React from "react";

const Terms = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12 bg-white dark:bg-gray-900 rounded-lg shadow-md mt-10 mb-20">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600 dark:text-blue-400">
        Terms & Conditions
      </h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-10">
        Last updated: January 02, 2026
      </p>

      <div className="prose prose-lg dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing or using Tech Gadget (the "Platform"), you agree to be bound by these Terms & Conditions. 
            If you do not agree with any part of these terms, you must not use our services.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            2. Use of the Platform
          </h2>
          <p>You agree to use the Platform only for lawful purposes and in accordance with these Terms. You must:</p>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-5">
            <li>Be at least 18 years old or have parental consent to use the Platform.</li>
            <li>Provide accurate and complete information during registration and purchases.</li>
            <li>Keep your account password confidential and secure.</li>
            <li>Not engage in any activity that interferes with or disrupts the Platform.</li>
            <li>Not use the Platform for any illegal or unauthorized purpose.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            3. User Accounts
          </h2>
          <p>
            You are responsible for maintaining the confidentiality of your account and password. 
            Tech Gadget is not liable for any loss or damage arising from your failure to comply with this security obligation.
          </p>
          <p className="mt-3">
            We reserve the right to suspend or terminate your account at any time for violation of these Terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            4. Products and Orders
          </h2>
          <ul className="list-disc list-inside space-y-2 mt-3 ml-5">
            <li>All product prices are listed in Bangladeshi Taka (BDT) and include VAT where applicable.</li>
            <li>We reserve the right to modify prices or discontinue products without notice.</li>
            <li>Orders are subject to acceptance and availability. We may cancel or refuse any order at our discretion.</li>
            <li>Product images are for illustration purposes only. Actual products may vary slightly.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            5. Payments
          </h2>
          <p>
            We accept payments via bKash, Nagad, Rocket, credit/debit cards, and Cash on Delivery (COD).
            You agree to provide valid payment information and authorize us to charge your chosen payment method.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            6. Shipping and Delivery
          </h2>
          <p>
            Delivery times are estimates and not guaranteed. Tech Gadget is not responsible for delays caused by 
            courier services or unforeseen circumstances.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            7. Returns and Refunds
          </h2>
          <p>
            We offer returns within 7 days for defective or damaged products. 
            Products must be unused, in original packaging, and with proof of purchase.
          </p>
          <p className="mt-3">
            Refunds will be processed within 7-10 business days after receiving the returned item.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            8. Intellectual Property
          </h2>
          <p>
            All content on the Platform including text, images, logos, and designs are the property of Tech Gadget 
            or its licensors. You may not reproduce, distribute, or use any content without prior written permission.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            9. Limitation of Liability
          </h2>
          <p>
            Tech Gadget shall not be liable for any indirect, incidental, or consequential damages arising from 
            the use of the Platform or purchased products.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            10. Changes to Terms
          </h2>
          <p>
            We reserve the right to update these Terms & Conditions at any time. 
            Changes will be effective immediately upon posting on the Platform. 
            Your continued use constitutes acceptance of the updated terms.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-blue-600 dark:text-blue-400 mb-4">
            11. Contact Information
          </h2>
          <p>
            For any questions regarding these Terms, please contact us at:
          </p>
          <p className="mt-3">
            <strong>Email:</strong> rajesray307@gmail.com<br />
            <strong>Phone:</strong> +880-1407539879<br />
            <strong>Address:</strong> Level-5, House 34, Road 12, Banani, Dhaka, Bangladesh
          </p>
        </section>
      </div>

      <div className="mt-12 text-center">
        <p className="text-gray-600 dark:text-gray-400">
          © 2026 Tech Gadget. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Terms;