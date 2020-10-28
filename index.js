const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const TodoTask = require("./models/TodoTask");
const port = process.env.PORT || 3000

dotenv.config();

mongoose.set("useFindAndModify", false);
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to db!");

    app.listen(port, () => console.log(`Listening on port ${port}...`))
  }
);

app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("public"));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", { todoTasks: tasks });
  });
});

app.post("/", async (req, res) => {
  const todoTask = new TodoTask({
    todo: req.body.todo,
    category: req.body.category,
  });
  try {
    await todoTask.save();
    res.redirect("/");
  } catch (err) {
    res.redirect("/");
  }
});

app
  .route("/edit/:id")
  .get((req, res) => {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks) => {
      res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
    });
  })
  .post((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { todo: req.body.todo, category: req.body.category }, (err) => {
      if (err) return res.send(500, err);
      res.redirect("/");
    });
  });

app.route("/remove/:id").get((req, res) => {
  const id = req.params.id;
  TodoTask.findByIdAndRemove(id, (err) => {
    if (err) return res.send(500, err);
    res.redirect("/");
  });
});

