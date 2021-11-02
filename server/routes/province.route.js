import express from 'express'
import {
  getAllProvince,
  getDistrictOfProvince,
  getSubdistrictOfDistrict,
} from '../controllers/province.controller'
const router = express.Router()
router.get('/', getAllProvince)
router.get('/:province', getDistrictOfProvince)
router.get('/:province/:district', getSubdistrictOfDistrict)
export default router
