const router = require("express").Router();
const { User } = require("../../models");

// GET /api/users

//User.findAll = SELECT * FROM users;
router.get('/', (req, res) => {
    User.findAll({
        attributes: { exclude: ["password"]}
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET /api/users/1
//User.findOne = SELECT * FROM users WHERE id = 1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude: ["password"]},
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData) {
            res.status(404).res.JSON({ message: "No user found with this id"});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    });
});

// POST /api/users
//User.create = INSERT INTO users (username, email, password) VALUES ("Lernantino", "lernantino@gmail.com", "password1234");
router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// PUT /api/users/1
//User.update = UPDATE users SET username = "Lernantino", email = "lernantino@gmail.com", password = "newPassword1234" WHERE id = 1;
router.put('/:id', (req, res) => {
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if(!dbUserData[0]) {
            res.status(404).json({ message: "No user found with this id"});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: "No user found with this id" });
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router;