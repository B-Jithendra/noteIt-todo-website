const express = require("express");
const router = express.Router();
const Tasks = require("../Models/taskModel");
const authMiddleware = require('../middlewares/authMiddleware')

router.get("/tasks", authMiddleware, async (req, res) => {
  try {
    const tasks = await Tasks.find({ userId: req.user.id });
    !tasks && res.json({"message" : "No Tasks"})
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/dashboard", authMiddleware, async (req, res) => {
  try {
    const tasks = await Tasks.find({ userId: req.user.id });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/dashboard/work", authMiddleware, async (req, res) => {
  try {
    const tasks = (await Tasks.find({ userId: req.user.id, category : "Work" }));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/dashboard/urgent", authMiddleware, async (req, res) => {
  try {
    const tasks = (await Tasks.find({ userId: req.user.id, category : "Urgent" }));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
router.get("/dashboard/personal", authMiddleware, async (req, res) => {
  try {
    const tasks = (await Tasks.find({ userId: req.user.id, category : "Personal" }));
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post("/tasks",authMiddleware, async (req, res) => {
  try{
    const task = new Tasks({
    task: req.body.task,
    category : req.body.category,
    isCompleted: req.body.isCompleted,
    deadline: req.body.deadline,
    userId: req.body.userId
  });

  await task.save();

  res.json({ task, message: "Task added Successfully!" });
  }
  catch(err){
    console.log(err)
  }
  
});

router.put("/tasks/:id",authMiddleware, async (req, res) => {
  try {
    const task = await Tasks.findByIdAndUpdate(
      req.params.id,
      {
        task: req.body.task,
        category: req.body.category,
        isCompleted: req.body.isCompleted,
        deadline: req.body.deadline,
      },
      { new: true }
    );

    if (!task) return res.status(404).send("Task Not Found to update");

    res.json({ task, message: "Task Updated" });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.delete("/tasks/:id",authMiddleware, async (req, res) => {
  try {
    const task = await Tasks.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).send("Task Not Found");
    res.status(200).json({ task, message: "Task Deleted" });
  } catch (err) {
    console.log(err);
    res.json({err, "message" : "Task Not Deleted"});
  }
});

module.exports = router;
