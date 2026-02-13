const Task = require("../models/Task");
const asyncHandler = require("express-async-handler");

const createTask = asyncHandler(async (req, res) => {
  const { title, priority } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const task = await Task.create({
    title,
    priority,
    user: req.user,
  });

  res.status(201).json(task);
});

const getTasks = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 5;
  const search = req.query.search || "";
  const priority = req.query.priority;
  const completed = req.query.completed;

  const skip = (page - 1) * limit;

  const query = {
    user: req.user,
    title: { $regex: search, $options: "i" },
  };

  // Add priority filter if provided
  if (priority) {
    query.priority = priority;
  }

  // Add completed filter if provided
  if (completed !== undefined) {
    query.completed = completed === "true";
  }

  const tasks = await Task.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Task.countDocuments(query);

  res.status(200).json({
    page,
    pages: Math.ceil(total / limit),
    total,
    tasks,
  });
});



const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      req.body,
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(updatedTask);
  } catch (error) {
    console.error("Update Task Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user,
    });

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Delete Task Error:", error.message);
    res.status(500).json({ message: error.message });
  }
};

const getTaskById = asyncHandler(async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    user: req.user,
  });

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  res.status(200).json(task);
});


module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getTaskById
};

