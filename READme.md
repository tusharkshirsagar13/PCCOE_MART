# PCCOE MART

**PCCOE MART** is a comprehensive campus marketplace platform designed specifically for **Pimpri Chinchwad College of Engineering (PCCOE)** students to facilitate secure buying, selling, and lost-and-found item management within the campus community. Built with modern web technologies, the platform creates a trusted environment for student-to-student transactions.

## 🔗 Live Demo
[Link to Live Demo](https://pccoe-mart-frontend.onrender.com/)

## ✨ Features

### 🛒 **Campus Marketplace**
- **Buy & Sell Items:** Students can list items for sale and browse products from fellow students
- **Category-wise Organization:** Items organized into Books, Electronics, Stationery, Clothing, and Others
- **Advanced Search:** Live search functionality with real-time filtering and category-based discovery
- **Detailed Product Pages:** Comprehensive item details with image galleries and seller information

### 🔍 **Lost & Found Center**
- **Report Found Items:** Students can report items they've found on campus
- **Claim Lost Items:** Easy search and claim process for lost belongings
- **Community Collaboration:** Help fellow students reunite with their lost items
- **Detailed Item Descriptions:** Upload multiple images and detailed descriptions

### 🔐 **Secure Authentication System**
- **College-Exclusive Access:** Registration restricted to verified **@pccoepune.org** email addresses
- **OTP Verification:** Email-based OTP verification using Nodemailer for secure account creation
- **JWT Authentication:** Robust token-based authentication system for secure sessions
- **Session Management:** Automatic token refresh and secure logout functionality

### 🎨 **Modern UI/UX**
- **Glassmorphism Design:** Contemporary glass-morphic interface with backdrop blur effects
- **Responsive Design:** Fully optimized for desktop, tablet, and mobile devices
- **Intuitive Navigation:** User-friendly interface with sidebar navigation and pagination

## 🛠 Technologies Used

### **Frontend**
- **React 18** - Modern UI library with hooks and context
- **React Router DOM** - Client-side routing and navigation
- **Tailwind CSS** - Utility-first CSS framework for rapid styling
- **Lucide React** - Beautiful icon library
- **Axios** - HTTP client for API communication
- **React Hot Toast** - Elegant notification system

### **Backend**
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database for flexible data storage
- **Mongoose** - MongoDB object modeling
- **JWT (jsonwebtoken)** - Secure authentication tokens
- **Nodemailer** - Email service for OTP delivery
- **Multer** - File upload handling
- **bcryptjs** - Password hashing and security

### **Authentication & Security**
- **JWT Token System** - Secure user sessions
- **Email OTP Verification** - Two-factor authentication
- **College Email Validation** - Restricted access control
- **Password Encryption** - Secure credential storage

## 📸 Screenshots
<img width="1440" height="932" alt="Screenshot 2025-12-18 at 3 01 30 PM" src="https://github.com/user-attachments/assets/20808eaa-5454-489c-a7c1-0d076c1042cb" />
<img width="1440" height="932" alt="Screenshot 2025-12-18 at 3 01 43 PM" src="https://github.com/user-attachments/assets/3f2817d8-42de-467c-a098-61e9e47ad6b9" />
<img width="1440" height="932" alt="Screenshot 2025-12-18 at 3 02 19 PM" src="https://github.com/user-attachments/assets/fbda9a08-36e6-4c2d-ac60-9485515afaff" />
<img width="1440" height="932" alt="Screenshot 2025-12-18 at 3 15 11 PM" src="https://github.com/user-attachments/assets/75b7e610-aee6-4248-9e06-3b9129f897a4" />
<img width="1440" height="932" alt="Screenshot 2025-12-18 at 3 15 18 PM" src="https://github.com/user-attachments/assets/0845dc8a-b962-4aae-b888-d4ddc141ba76" />
<img width="1440" height="932" alt="Screenshot 2025-12-18 at 3 15 32 PM" src="https://github.com/user-attachments/assets/ff41b350-c083-439c-97ed-2da85bd52ed1" />

## 📋 Requirements

- **Node.js** (v16 or higher)
- **MongoDB** (local installation or MongoDB Atlas)
- **College Email Account** (for testing registration)
- **SMTP Email Service** (Gmail App Password recommended for OTP delivery)
