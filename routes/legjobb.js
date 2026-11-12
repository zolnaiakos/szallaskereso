import pool from '../data/db.js';
import {Router} from 'express';

const router = Router();


router.get('/:db', async(req,res)=>{

    const db = Number(req.params.db)

    const sql = 'SELECT * FROM szallasok ORDER BY ertekeles DESC LIMIT ?'

    const [eredmeny] = await pool.query(sql, [db]);

    res.json(eredmeny)
})

export default router