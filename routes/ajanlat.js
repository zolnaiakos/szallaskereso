import pool from "../data/db.js";
import { Router } from "express";

const router = Router();


router.get('/', async(req,res)=>{
    const {varos, ej, fo} = req.query

    const hibak = []


    if (!varos) {
    hibak.push('Hiányzik a város')
}

    if (!ej || Number(ej) <= 0) {
    hibak.push('Hibás éjszakaszám')
}

    if (!fo || Number(fo) <= 0) {
    hibak.push('Hibás főszám')
}

    if (hibak.length > 0) {
    return res.status(400).json({
        hibak: hibak.join(', ')
    })
}
    
    const [ellenorzes] = await pool.query('SELECT * FROM varosok WHERE nev = ?')

    if (ellenorzes.length === 0) {
    return res.status(404).json({
        error: 'A város nem található!'
    })
}


    let sql = `
    SELECT sz.nev AS szallas, sz.csillag, sz.ar AS arFoEj, sz.ar * ? * ? AS osszesen
    FROM szallasok sz 
    LEFT JOIN varosok v ON sz.varos_id = v.id 
    WHERE v.nev = ?
`


    const [ajanlatok] = await pool.query(sql,[
        Number(ej),
        Number(fo),
        varos
    ])

    res.json({
            varos,
            ej: Number(ej),
            fo: Number(fo),
            ajanlatok
        });
})

export default router;