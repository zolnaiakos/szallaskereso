import pool from '../data/db.js'
import { Router } from 'express'

const router = Router();


router.get("/", async(req,res)=>{
    let sql = 'SELECT * FROM szallasok ORDER BY ar ASC'

    const [eredmeny] = await pool.query(sql)

    res.json(eredmeny)
})

export default router;