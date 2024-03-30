const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Get All the notes using :GET  "/api/notes/fetchallnotes" .
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
});

// Get All the notes using :GET  "/api/notes/addnote" .
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "Enter a valid Title").isLength({ min: 3 }),
    body("description", "Desc must be at least 5 char").isLength({ min: 5 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
      const note = new Note({
        user: req.user.id,
        title,
        description,
        tag,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Server Error");
    }
  }
);

//Update an existing notes using :GET  "/api/notes/updatenote" .
router.put(
  "/updatenote/:id",fetchuser,async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote obj
    const newNote={};
    if (title) { newNote.title=title;}
    if (description) {newNote.description=description;}
    if (tag) {newNote.tag=tag;}

    //Find the note to be updated
    let  note = await Note.findById(req.params.id);
    if(!note){
      return res.send(404).send("Not Found");
    }
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }
    // Update the note with the new data
    note = await Note.findByIdAndUpdate(req.params.id ,{$set:newNote}, {new:true});
    res.json(note);
  });

module.exports = router;
