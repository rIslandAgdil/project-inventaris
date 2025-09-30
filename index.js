const express = require('express')
const bodyParser = require('body-parser');
const loginRouter = require('./routers/loginRouters')
const barangRoutes = require('./routers/barangRouters');

const app = express()
app.use(bodyParser.json());
app.use(express.json())

app.use('/', loginRouter)
app.use('/api', barangRoutes);


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
})