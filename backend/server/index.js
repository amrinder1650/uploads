const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors({
    origin: 'http://localhost:5173', // Your Vite frontend URL
    methods: ['GET', 'POST']         // Allowed request types
}))

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.get('/', (req, res) => {
  res.send('Hello from your Express server!!');
});

app.post('/api/upload-data', (req, res) => {
    // 1. Grab the sent data from the request body
    const incomingData = req.body;

    // 2. See it arrive in your backend terminal console
    console.log(`Received ${incomingData.length} rows of data from the frontend!`);
    console.log("Sample of received data:", incomingData.slice(0, 2)); // Shows first 2 rows

    // -------------------------------------------------------------
    // This is where your backend can securely append API keys,
    // save the history logs, or prepare the data for the government API.
    // -------------------------------------------------------------

    const targetData = incomingData.filter(row => {
      return !row.Name.includes('test') && !row.Name.includes('Test') && !row.Name.includes('client') && !row.Name.includes('Client');
    });

    const formattedData = targetData.map(row => ({
      ...row,
      Type: row.Type === `NHRSO` ? `Non-HRSO` : row.Type
    }));

    console.log(`formattedData`, formattedData);

    // 3. Always send a response back to React so it knows it succeeded
    res.json({
        success: true,
        message: "Data securely received by the backend server.",
        data: formattedData // <--- Clean array returned to frontend
    });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});