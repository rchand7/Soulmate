# [Soul Connect](https://soul-connect-bysam.web.app/)

Welcome to our Matrimony platform, a modern and efficient solution for finding your life partner online. This platform is built using the MERN stack and powered by Vite and React to provide a fast and seamless user experience.

-   📧 **Admin Email:** admin@password.com  
-   🔑 **Admin Password:** adminXpassword 
-   🚀 **Live Site URL:** https://soul-connect-bysam.web.app/

## Features

### 📱 Responsive Design

Our platform is designed to be fully responsive, ensuring a smooth and consistent user experience across all devices, including mobile phones, tablets, and desktop computers.

### 🔒 Secure Authentication

Users can register and log in securely using email/password authentication or via their Google account. Passwords are encrypted to ensure maximum security.

### 💼 Premium Membership

Upgrade to premium membership to unlock additional features, such as access to contact information and enhanced profile visibility.

### 🖼️ Profile Management

Users can create, edit, and view their biodata profiles, including personal details, preferences, and photos. Profile information is stored securely and can be updated at any time.

### 🎯 Biodata Filtering

Easily filter biodata profiles based on age, gender, and location preferences to find the most suitable matches.

### 💳 Contact Request

Normal users can request contact information of other users by paying a fee securely through Stripe. Admins verify and approve contact requests.

### 📊 Admin Dashboard

Admins have access to a comprehensive dashboard where they can manage users, approve premium memberships, handle contact requests, and view platform statistics.

## 💡 Powered by the Following Technologies:

**🖥️ Frontend Framework:** React.js
**🔌 API Integration:** Axios
**🎨 Styling Magic:** Tailwind CSS
**🎴 Animations:** Framer Motion
**🔏  Athentication:** Firebase & JWT

## Getting Started

To run the Matrimony platform locally on your machine, follow these steps:

1. Clone the repository:

   ```bash
   git clone [copy this repo url you are at this time then paste it into your cmd]
   ```

2. Navigate to the project directory:

   ```bash
   cd [project directory]
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Set up environment variables:
   Create a `.env` file in the root directory and add the following variables:

   ```bash
   // Firebase Configuration
   VITE_API_KEY = 'your_firebase_api_key'
   VITE_AUTH_DOMAIN = 'your_firebase_auth_domain'
   VITE_PROJECT_ID = 'your_firebase_project_id'
   VITE_STORAGE_BUCKET = 'your_firebase_storage_bucket'
   VITE_MESSAGING_SENDERID = 'your_firebase_messaging_sender_id'
   VITE_APP_ID = 'your_firebase_app_id'

   // Stripe Configuration
   VITE_STRIPE_PK = 'your_stripe_public_key'
   ```

5. Start the development server:

```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:5000` to access the Matrimony platform.

Thank you for choosing our Matrimony platform. We wish you success in finding your perfect match!
