# Tech-Gadget | Import Export Hub

🌐 **Live Website:** https://remarkable-tanuki-7ac8b0.netlify.app  
📦 **Client Repository:** https://github.com/rajes124/Tech-Gadget-Client-side  
🛠 **Server Repository:** https://github.com/rajes124/Back-end-server  

---

## 📌 Project Overview

**Tech-Gadget** is a modern Import–Export web platform where users can explore global products, export their own items, and import products into their personal dashboard with a single click.  
The application focuses on clean UI, secure authentication, real-time database updates, and a smooth user experience.

---

## 🚀 Key Features

- Secure authentication with Email/Password and Google Sign-In
- Browse all products with detailed information and ratings
- Import products with quantity validation and real-time stock updates
- Export and manage personal products with update & delete options
- Fully responsive design for mobile, tablet, and desktop devices

---

## 🏠 Home Page Features

- Eye-catching banner/slider section
- Latest 6 products displayed in a 3-column grid
- Products sorted by newest first using `createdAt`
- Each product card shows:
  - Product Image  
  - Product Name  
  - Price  
  - Origin Country  
  - Rating  
  - Available Quantity  
  - “See Details” button
- Two additional custom sections for enhanced user engagement

---

## 🔐 Authentication System

### Login
- Email & Password based login
- Google social login support
- Error messages displayed using toast notifications
- Redirects users to their intended private route after login

### Registration
- User registration with Name, Email, Photo URL, and Password
- Password validation rules:
  - At least one uppercase letter  
  - At least one lowercase letter  
  - Minimum 6 characters
- Google sign-up supported
- Successful registration redirects to Home page

---

## 📄 Product Details Page (Private Route)

- Displays complete product information
- “Import Now” button opens a modal for quantity input
- Import rules:
  - Imported quantity cannot exceed available stock
  - Submit button disables automatically if limit exceeds
- Product quantity updates in database using `$inc` operator

---

## 📦 All Products Page

- Displays all products in a 3-column grid layout
- Each card includes:
  - Product Image  
  - Product Name  
  - Price  
  - Origin Country  
  - Rating  
  - Available Quantity  
  - “See Details” button
- Search functionality based on product name

---

## 📥 My Imports Page (Private Route)

- Shows all products imported by the logged-in user
- Includes:
  - Product Image  
  - Product Name  
  - Price  
  - Rating  
  - Origin Country  
  - Imported Quantity  
  - Remove Button  
  - “See Details” button
- Removing a product deletes it from both UI and database

---

## ➕ Add Export / Product Page (Private Route)

- Form to add new export products
- Fields include:
  - Product Name  
  - Image URL  
  - Price  
  - Origin Country  
  - Rating  
  - Available Quantity
- Newly added products appear instantly on All Products page

---

## 📤 My Exports Page (Private Route)

- Displays all products added by the logged-in user
- Features:
  - Update product details via modal form
  - Delete products from database and UI
  - View available quantity and ratings

---

## 🎨 UI & UX Highlights

- Unique and modern design
- Consistent typography, spacing, and button styles
- Equal-height product cards with grid layout
- Dark mode & light mode toggle
- Dynamic page titles for better user experience
- Uses the latest **X (Twitter) logo** instead of old branding

---

## 🛠 Technology Stack

### Frontend
- HTML5  
- CSS3  
- Tailwind CSS  
- JavaScript (ES6+)  
- React.js  

### Backend
- Node.js  
- Express.js  
- MongoDB  

### Authentication & Hosting
- Firebase Authentication
- Client hosted on Netlify
- Server hosted on Vercel

---

## ✅ Assignment Compliance

- Minimum 15 meaningful client-side commits
- Minimum 8 meaningful server-side commits
- No Lorem Ipsum text used
- Toast notifications used instead of default alerts
- Protected routes persist on reload
- Firebase domain authorized for deployment
- SPA routing works without reload errors

---

## 👤 Developer Information

👨‍💻 Author

Anonto Rishi
MERN Stack Developer
📍 Sylhet, Moulvibazar, Bangladesh
📧 rajesray307@gmail.com

📞 Phone: 01407539879  

---


