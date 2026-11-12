import pool from '../data/db.js'
import { Router } from 'express'

const router = Router();


router.get("/", async(req,res)=>{

    let sql = 'SELECT * FROM szallasok sz LEFT JOIN varosok v ON v.id = sz.varos_id WHERE 1=1 '

    const {varos, minCsillag, maxAr, medence} = req.query
    const igen = req.query.igen

    const szurok = []

    if(varos){
        sql += ' AND v.nev = ?'
        szurok.push(varos)
    }

    if (minCsillag){
        sql += ' AND sz.csillag >= ?'
        szurok.push(Number(minCsillag))
    }

    if(maxAr){
        sql += ' AND sz.ar <= ?'
        szurok.push(Number(maxAr))
    }

    if(medence !== undefined){
        sql+= ' AND sz.medence = ?'
        szurok.push(medence === 'true')
    }

    sql += ' ORDER BY ar ASC'

    const [eredmeny] = await pool.query(sql,szurok)

      if(medence === 'igen' || medence === 'nem'){
        return res.status(400).json({
            error : "medence csak true vagy false lehet"
        })
    }

    if(6 < minCsillag ||minCsillag > 0){
        return res.status(400).json({
            error : "A minCsillag csak 1 és 5 között lehet"
        })
    }

    res.json(eredmeny)
})

router.get('/:id', async(req,res)=>{
    const id = req.params.id

    let sql = 'SELECT * FROM szallasok sz WHERE id = ?'

    const [eredmeny] = await pool.query(sql,[id])

    if (eredmeny.length === 0){
        return res.status(404).json({
            error: "Nem létező szállás"
        })
    }

    res.json(eredmeny)

})

export default router;