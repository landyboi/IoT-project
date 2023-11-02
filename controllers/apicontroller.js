const storeValue = (req, res) => {
    res.status(200).json({message: "Controller function!"})
}

module.exports = {storeValue}