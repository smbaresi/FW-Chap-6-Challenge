const store = require("store")

const authorized = (req, res, next) => {
    let f = store.get("username") || "none"
    if (f != "none") {
        if (f.userName != "NOT FOUND" ) {
            next()
        } else {
            return res.render("login")
        }
    } else {
        return res.render("login")

    }
}

module.exports = authorized