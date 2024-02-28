import {Router} from 'express';

const router = Router();

router.get('/user',(req, res) => {
    res.status(200);
    res.json({
        username: 'rahul'
    })
    res.send()
})



export default router;