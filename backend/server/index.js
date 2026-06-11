const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173', // Your Vite frontend URL
    methods: ['GET', 'POST']         // Allowed request types
}))

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello from your Express server!!');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});