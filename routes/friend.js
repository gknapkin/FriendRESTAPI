const express = require("express"),
  router = express.Router(),
  Friends = require("../models/friend");

//Show all
router.get("/", async (req, res) => {
  try {
    const friends = await Friends.find();
    res.json(friends);
  } catch (err) {
    //Server side error code
    res.status(500).json({ message: err.message });
  }
});

//Show one
router.get("/:id", getFriend, (req, res) => {
  res.send(res.friend);
});

//Create
router.post("/", async (req, res) => {
  try {
    const friend = new Friends({
      name: req.body.name,
      location: req.body.location
    });
    res.status(201).json(await friend.save());
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Update
router.patch("/:id", getFriend, async (req, res) => {
  if (req.body.name != null) {
    res.friend.name = req.body.name;
  }
  if (req.body.location != null) {
    res.friend.location = req.body.location;
  }
  try {
    const updatedFriend = await res.friend.save();
    res.json(updatedFriend);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//Delete
router.delete("/:id", getFriend, async (req, res) => {
  try {
    await res.friend.remove();
    res.json({ message: "deleted friend" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//middleware - used in get one, update, delete routes
async function getFriend(req, res, next) {
  try {
    friend = await Friends.findById(req.params.id);
    if (!friend) {
      return res.status(404).json({ message: "Cant find friend" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
  res.friend = friend;
  next();
}

module.exports = router;
