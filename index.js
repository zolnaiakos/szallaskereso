import express from "express"
import szallasok from './routes/szallasok.js'
import varosok from './routes/varosok.js'
import orszagok from './routes/orszagok.js'
import ajanlat from './routes/ajanlat.js'
import legjobb from './routes/legjobb.js'

const app = express();
const port = 3000

app.use('/szallasok', szallasok)
app.use('/varosok', varosok)
app.use('/orszagok', orszagok)
app.use('/ajanlat', ajanlat)
app.use('/legjobb', legjobb)




app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000')
})