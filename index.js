const express = require('express')
const bodyParser = require('body-parser');
const loginRouter = require('./routers/loginRouters')
const barangRoutes = require('./routers/barangRouters');
const ruanganRoutes = require('./routers/ruanganRouters');

const app = express()
app.use(bodyParser.json());
app.use(express.json())

app.use('/', loginRouter)
app.use('/api', barangRoutes);
app.use('/ruangan', ruanganRoutes);


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
})