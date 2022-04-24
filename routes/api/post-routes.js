const router = require("express").Router();
const { User, Post } = require("../../models");

router.get("/", (req, res) => {
    Post.findAll({
        attributes: ["id", "post_url", "title", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.get("/:id", (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
        },
        attributes: ["id", "post_url", "title", "created_at"],
        include: [
            {
                model: User,
                attributes: ["username"]
            }
        ]
    })
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(400).json({ message: "No Post found with this id" });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


module.exports = router;