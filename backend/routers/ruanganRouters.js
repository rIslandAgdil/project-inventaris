const express = require('express')
const router = express.Router()
const {getAllRuangan, createRuangan, updateRuangan, deleteRuangan} = require('../controllers/ruanganControllers')

router.get('/', getAllRuangan)
router.put('/:id', updateRuangan)
router.post('/', createRuangan)
router.delete('/:id', deleteRuangan)

module.exports =  router