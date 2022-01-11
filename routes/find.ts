import finder from '../controller/find.controller';
import { Router } from 'express';

const router = Router();

router.get('/:collection/:term', finder);

export default router;
