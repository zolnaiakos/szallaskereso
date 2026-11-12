import pool  from "../data/db.js";
import { Router } from "express";

const router = Router();


router.get('/', async(req,res)=>{
    let sql = 'SELECT v.id, v.nev, v.orszag, COUNT(sz.id) AS szallasDb, MIN(sz.ar) AS legolcsobb,  ROUND(AVG(sz.ar)) AS atlagAr FROM varosok v LEFT JOIN szallasok sz ON sz.varos_id = v.id GROUP BY v.id, v.nev, v.orszag '
    const {minSzallas} = req.query
    const szallas = []

    if(szallas){
        sql += ' HAVING COUNT(sz.id) >= ?'
        szallas.push(Number(minSzallas))
    }

    sql += ' ORDER BY v.nev ASC'

    const [eredmeny] = await pool.query(sql, szallas)

    res.json(eredmeny)
})




export default router