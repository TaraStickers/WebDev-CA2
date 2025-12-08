const express = require('express');  // Importing Express
const app = express();  // Initializing Express

const port = 3000;  // Port number

app.get('/', (req, res) => {
  res.send('Hello World!');  // Simple route to test
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
