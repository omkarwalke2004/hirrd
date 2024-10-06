import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';  // Global styles
import './App.css';    // Styles for Clerk modal and carousel
import { ClerkProvider } from '@clerk/clerk-react';
import { shadesOfPurple } from '@clerk/themes';


// Import your publishable key and frontend URL
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const FRONTEND_URL = import.meta.env.VITE_CLERK_FRONTEND_URL;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// Optional: You can log the frontend URL for debugging purposes
console.log("Clerk Frontend URL:", FRONTEND_URL);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider
      appearance={{
        baseTheme: shadesOfPurple,
      }}
      publishableKey={PUBLISHABLE_KEY}
      afterSignOutUrl="/"
      frontendApi={FRONTEND_URL} // Add this line
    >
      <App />
    </ClerkProvider>
  </React.StrictMode>
);
