const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Your routes will go here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});