const Marchant = require('../models/marchant')

const getMarchants = async (req, res, next) =>{
try {
    const marchant = await Marchant.find()
    res.send({
        status: true,
        message: 'All marchant fetched successfully',
        marchant: marchant
    })
} catch (error) {
    next(error)
}
}

module.exports = {
    getMarchants
}