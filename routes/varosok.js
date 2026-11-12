import pool  from "../data/db.js";
import { Router } from "express";

const router = Router();


router.get('/', async(req,res)=>{
    let sql = `
    SELECT v.id, v.nev, v.orszag, COUNT(sz.id) AS szallasDb, MIN(sz.ar) AS legolcsobb,  ROUND(AVG(sz.ar)) AS atlagAr 
    FROM varosok v 
    LEFT JOIN szallasok sz ON sz.varos_id = v.id 
    GROUP BY v.id, v.nev, v.orszag 
`
    const {minSzallas} = req.query
    const szallas = []

    if(minSzallas !== undefined ){
        sql += ' HAVING COUNT(sz.id) >= ?'
        szallas.push(Number(minSzallas))
    }

    sql += ' ORDER BY v.nev ASC'

    const [eredmeny] = await pool.query(sql, szallas)

    res.json(eredmeny)
})

router.get('/:id/szallasok', async(req,res)=>{
    const id = req.params.id
    

    const [varos] = await pool.query('SELECT * FROM varosok  WHERE id = ?', [id])

    if(varos.length === 0){
        res.status(404).json({
            error : "A város nem található"
        })
    }

    const [szallasok] = await pool.query('SELECT * FROM szallasok WHERE varos_id = ?',[id])
    

    res.json(szallasok)
})




export default router