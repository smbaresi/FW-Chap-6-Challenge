const fs = require("fs");
const express = require("express");
const store = require("store");
const app = express();
const authorized = require("./internal/app/server/authorized");
const path = require("path");
const port = 3000;
const cors = require("cors");
const pool = require("./internal/app/server/db");

//middleware
app.use(cors());
app.set('view engine', 'ejs');
app.use(express.static("./public"))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.get("/", (req, res) => {
    let f = store.get("username") || "login"
    if (f != "login") {
        f = f.userName
    }
    res.render("home", {
        username: f
    })
})

const getUser = async (req, res) => {
    try {
        const query = await pool.query('SELECT * FROM user_game WHERE user_name =$1 AND user_password = $2', [req.body["username"], req.body["password"]])
        if (query.rows.length == 1) {
            let user = query.rows[0].user_name
            store.set("username", {
                userName: user
            })
            res.redirect("/home")
        } else {
            store.set("username", {
                userName: "NOT FOUND"
            })
            res.status(500).send({
                "error": "username/password doesnt match"
            })
        }
    } catch (err) {
        console.error(err.message)
    }
}

const getUserID = async (req, res) => {
    try {
        const query = await pool.query('SELECT * FROM user_game WHERE user_game_id =$1', [req.body["userID"]])
        if (query.rows.length == 1) {
            let ID = query.rows[0].user_name
            store.set("username", {
                userName: user
            })
            res.redirect("/home")
        }
    } catch (err) {
        console.error(err.message)
    }
}

app.post("/login", (req, res) => {
    res.set("Content-Type", "application/json")
    getUser(req, res)
})


app.post("/signup", async (req, res) => {
    try {
        const newSignuser = req.body["signuser"]
        const newSignpassword = req.body["signpassword"]
        const newSignup = await pool.query(
            "INSERT INTO user_game (user_name, user_password) VALUES ($1, $2)",
            [newSignuser, newSignpassword]
        );
        res.redirect("/dashboard")
    } catch (err) {
        console.error(err.message);
    }
})

// start of crud
// create
app.post("/profile", async (req, res) => {
    try {
        const biodescription = req.body["description"];
        const newBiodata = await pool.query(
            "INSERT INTO biodata (description) VALUES ($1) RETURNING *",
            [biodescription],
        );
        res.redirect("/profile")
    } catch (err) {
        console.error(err.message);
    }
})

//read specific
app.get("/profile/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const biodata = await pool.query("SELECT * FROM biodata WHERE user_game_id = $1", [id])

        res.json(biodata.rows[0]);
    } catch (err) {
        console.error(err.message)
    }
})

//update
app.put("/profile/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const {
            description
        } = req.body;
        const updateBiodata = await pool.query("UPDATE biodata SET description = $1 WHERE user_game_id = $2", [description, id]);

        res.json("updated!")
    } catch (err) {
        console.error(err.message)

    }

})

//delete
app.delete("/profile/:id", async (req, res) => {
    try {
        const {
            id
        } = req.params;
        const deleteBiodata = await pool.query("DELETE FROM biodata Where user_game_id = $1", [id])

        res.json("deleted!")
    } catch (err) {
        console.error(err.message)
    }
})


// end of CRUD

app.get("/login", (req, res) => {
    res.render("login")
})

app.get("/signup", (req, res) => {
    res.render("signup")
})

app.get("/profile", [authorized], async (req, res) => {
    const history = await pool.query("SELECT win,lose FROM history LIMIT 1");
    const biodata = await pool.query("SELECT description FROM biodata");
    const userID = await pool.query("SELECT user_game_id FROM user_game");
    let f = store.get("username") || "login"
    if (f != "login") {
        f = f.userName
    }
    res.render("profile", {
        username: f,
        hist: history.rows,
        bio: biodata.rows,
        newUserID: userID.rows
    })
})

app.get("/dashboard", async (req, res) => {
    const query = await pool.query("SELECT user_game_id,user_name,user_password FROM user_game");
    res.render("dashboard", {
        data: query.rows
    })
})



app.get("/home", [authorized], (req, res) => {
    let f = store.get("username") || "login"
    if (f != "login") {
        f = f.userName
    }
    res.render("home", {
        username: f
    })
})


app.get("/suit", [authorized], (req, res) => {
    res.render("suit")
})

app.all("*", (req, res) => {
    res.status(404).send("<h1> resource not found</h1>")
})



app.listen(port, () => {
    console.log("running node on port 3000")
})