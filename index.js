import express from "express"
import szallasok from './routes/szallasok.js'

const app = express();
const port = 3000

app.use('/szallasok', szallasok)




app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})