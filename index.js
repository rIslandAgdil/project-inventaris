const express = require('express')
const app = express()
const loginRouter = require('./routers/loginRouters')
const barangRouter = require('./routers/barangRouters')


app.use('/', loginRouter)


const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
})