import pool from '../data/db.js';
import {Router} from 'express';

const router = Router();


router.get('/:db', async(req,res)=>{

    const db = Number(req.params.db)

    if (!Number.isInteger(db) || db <= 0) {
    return res.status(400).json({
        error: 'Hibás darabszám!'
    })
}

    const sql = 'SELECT * FROM szallasok ORDER BY ertekeles DESC LIMIT ?'

    const [eredmeny] = await pool.query(sql, [db]);

    res.json(eredmeny)
})

export default router