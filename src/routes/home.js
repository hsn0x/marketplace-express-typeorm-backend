import { Router } from 'express';

const router = Router();

router.get('/', function (req, res) {
  res.json({
    info: 'Node.js, Express, and Postgre API',
  });
});

export default router;
