// server.ts (Express server)

import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express();
const PORT = 3001;

// Use cookie-parser middleware
app.use(cookieParser());

// Configure CORS
const corsOptions = {
  origin: 'https://my-testing-app-client.vercel.app', // Allow requests from this origin (React frontend)
  methods: 'GET,POST', // Allow these methods
  credentials: true, // Allow cookies to be sent with requests
};

app.use(cors(corsOptions));

// Route to set a cookie
app.get('/set-cookie', (req, res) => {
  res.cookie('__my_token', 'someTokenValue', {
    httpOnly: true,
    secure: true, // `secure: true` for production over HTTPS
    sameSite: 'None', // SameSite=None for cross-site cookie
    domain: '.my-testing-app-client.vercel.app', // Optional: specify your domain here
  });
  res.send('Cookie has been set');
});

// Route to get the cookie
app.get('/get-cookie', (req, res) => {
  const token = req.cookies.__my_token; // Access the cookie using its name
  res.send(`Cookie Value: ${token}`);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
