const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createTask, getTasks, updateTask,deleteTask,getTaskById
} = require("../controllers/taskController");

const router = express.Router();

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.get("/:id", protect, getTaskById);





module.exports = router;
