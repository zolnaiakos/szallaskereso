import pool from '../data/db.js'
import { Router } from 'express'

const router = Router();


router.get('/', async(req,res)=>{
    let sql = `
    SELECT v.orszag,COUNT(DISTINCT v.id) AS varosDb,COUNT(s.id) AS szallasDb,ROUND(AVG(s.ertekeles), 1) AS atlagErtekeles 
    FROM varosok v 
    LEFT JOIN szallasok s ON s.varos_id = v.id  
    GROUP BY v.orszag  
    ORDER BY v.orszag ASC
`

    const [eredmeny] = await pool.query(sql)

    res.json(eredmeny)
})

export default router