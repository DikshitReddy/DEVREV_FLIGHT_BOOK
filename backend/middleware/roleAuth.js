const roleAuth = (allowedRoles) => {
    return (req,res,next) => {
        if(!req?.role) return res.status(401).send("Can't possibleee")
        const userRole = req.role
        if(allowedRoles.includes(userRole)){
            next()
        }else {
            return res.status(401).send("Can't possible")
        }
    }
}

module.exports = roleAuth