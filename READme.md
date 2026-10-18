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


## Backend deployment and database recovery

The backend requires `DB_URL` and `JWT_SECRET` in its environment. Keep the existing
JWT secret when redeploying so existing tokens continue to verify. `DB_URL` must
be the Atlas **Connect → Drivers** URI for the original database, including its
existing database name and database-user credentials. Do not commit credentials.

The October 18, 2026 failure was `querySrv ENOTFOUND
_mongodb._tcp.cluster0.f9jedrs.mongodb.net`: DNS resolution failed before MongoDB
could authenticate. The original unhandled connection promise terminated Node.
The backend now catches initial connection failures and retries every 10 seconds.
While MongoDB is disconnected, `/api/v1` returns HTTP 503 with a JSON message
instead of buffering requests; `/health` returns 503 until MongoDB connects,
then 200. Initial configuration errors still fail with a clear message.

To restore the deployment:

1. In Atlas, check the original cluster. Resume it if paused. If its address has
   changed, update Render's `DB_URL` using the exact current Drivers URI and keep
   the original database name. A replacement empty cluster does not contain the
   existing accounts or listings; restore the original data before testing login.
2. Once DNS resolves, verify the existing database user and Atlas network access
   permit the backend to connect. Do not substitute a different DNS hostname or
   change the URI scheme as a workaround for a missing cluster.
3. Render backend: root directory `backend`, build command `npm install && npm run
   build`, start command `npm start`, health check path `/health`.
4. The frontend's `VITE_API_URL` must be the backend's HTTPS origin (without
   `/api/v1`); rebuild the frontend after changing this Vite build-time setting.
5. Confirm `Connected to MongoDB` in Render logs, HTTP 200 from `/health`, then
   test the existing account through `/api/v1/signin` and authenticated
   `/api/v1/info`. Sign-in does not depend on SMTP or S3 configuration.

Run `npm install` and `npm test` in `backend` for integration tests against an
isolated MongoDB process. The first run downloads a MongoDB test binary. Tests
cover password verification, JWTs, protected account access, listing reads,
database outages, and initial connection recovery. They never seed or reset
production accounts. Run `npm install && npm run build` in `frontend` to verify
the production frontend build.


### Brevo signup email configuration

Set `EMAIL_USER` to the exact **SMTP login** displayed by Brevo, `EMAIL_PASS` to an
active **SMTP key** (not an API key or account password), and `EMAIL_FROM` to a
verified sender email. The SMTP login may end in `@smtp-brevo.com`; that login
must not be used as the email's From address. A verified legacy EMAIL_USER address
continues to work as the sender if EMAIL_FROM is absent.

If Brevo enforces an authorized-IP list, authorize the Render service's outbound
IP addresses in Brevo. SMTP error 535 means the provider rejected authentication;
check the login, active SMTP key, and provider security restrictions. Do not change
SMTP ports or disable TLS verification as a workaround for rejected credentials.
