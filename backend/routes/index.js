import express from 'express';
import { login, me, logout, refreshToken } from '../controllers/Users.js';
import { verifyToken } from '../middleware/VerifyToken.js';
import picaRules from '../controllers/PicaRules.js';
import { getDataPabrik, getProductionPica } from '../controllers/ApiSgn.js';

const router = express.Router();

router.post('/login', login);
router.get('/me', verifyToken, me);
router.post('/logout', logout);
router.get('/refresh-token', refreshToken);


// PicaRules routes
router.get('/pica-rule/', picaRules.getAllPicaRules);
router.get('/pica-rule/:id', picaRules.getPicaRulesById);
router.post('/pica-rule/', picaRules.createPicaRule);
router.post('/pica-rule/bulk', picaRules.createBulkPicaRules);
router.put('/pica-rule/:id', picaRules.updatePicaRule);
router.delete('/pica-rule/:id', picaRules.deletePicaRule);
router.get('/pica-rule/type/:type', picaRules.getPicaRulesByType);
router.post('/pica-rule/initialize', picaRules.initializeDefaultPicaRules);
router.post('/pica-rule/initialize/lmg', picaRules.initializeDefaultPicaRulesLMG);



router.get('/pica/get-data-pabrik', getDataPabrik);
router.get('/pica/get-produksi', getProductionPica);

export default router;
