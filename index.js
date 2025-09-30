const express = require('express');
const bodyParser = require('body-parser');
const barangRoutes = require('./routers/barangRouters');

const app =  express();
app.use(bodyParser.json());

app.use('/api', barangRoutes);

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

