const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const postRoutes = require('./routes/postRoutes');

//middlewares
app.use(cors()); //Enabkes cross origin resource sharing
app.use(bodyParser.json()); //parse incoming json requests

//routes
app.use('/api/posts', postRoutes);

//start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


