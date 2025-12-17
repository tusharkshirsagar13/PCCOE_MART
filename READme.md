# PCCOE MART

**PCCOE MART** is a comprehensive campus marketplace platform designed specifically for **Pimpri Chinchwad College of Engineering (PCCOE)** students to facilitate secure buying, selling, and lost-and-found item management within the campus community. Built with modern web technologies, the platform creates a trusted environment for student-to-student transactions.

## 🔗 Live Demo
[Link to Live Demo](https://your-demo-link-here.com)

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

## 🚀 Run Locally

Follow these steps to run the project on your local machine.

### Prerequisites
- **Node.js** (v16 or higher)
- **MongoDB** (Ensure it is running locally or have a MongoDB Atlas connection string)
- **Git**

### 1. Clone the Repository
```bash
git clone [https://github.com/yourusername/pccoe-mart.git](https://github.com/yourusername/pccoe-mart.git)
cd pccoe-mart
2. Backend Setup
Navigate to the backend directory and install dependencies:

Bash

cd backend
npm install
Create a .env file in the backend folder and add the following variables:

Code snippet

PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
EMAIL_USER=your_email_address_for_otp
EMAIL_PASS=your_email_app_password
# Add AWS S3 variables if using cloud storage for images
Start the backend server:

Bash

npm run dev
# or
npm start
The server should be running on http://localhost:5000.

3. Frontend Setup
Open a new terminal, navigate to the frontend directory, and install dependencies:

Bash

cd frontend
npm install
Create a .env file (or update config.js if applicable) to point to your local backend:

Code snippet

VITE_API_URL=http://localhost:5000/api
Start the frontend application:

Bash

npm run dev
Open the link provided in the terminal (usually http://localhost:5173) to view the application.

📸 Screenshots
📋 Requirements
Node.js (v16 or higher)

MongoDB (local installation or MongoDB Atlas)

College Email Account (for testing registration)

SMTP Email Service (Gmail App Password recommended for OTP delivery)