const { Todo } = require("../models/index");

/* Todos 전체 목록 불러오기 */
exports.readAll = async (req, res) => {
  try {
    const allTodo = await Todo.findAll();
    res.send(allTodo);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: "server error" });
  }
};

/* Todo 한 개 불러오기 */
exports.readOne = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findOne({
      where: { id },
    });

    if (!todo) {
      res.send({ message: "Todo not found" });
    } else {
      res.send(todo);
    }
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: "server error" });
  }
};

/* 새로운 Todo 생성 */
exports.create = async (req, res) => {
  try {
    const { id, title, done } = req.body;
    const newTodo = await Todo.create({
      id,
      title,
      done,
    });
    res.send(newTodo);
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: "server error" });
  }
};

/* 기존 Todo 수정 */
exports.update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, done } = req.body;
    const updatedTodo = await Todo.update(
      {
        title,
        done,
      },
      { where: { id } }
    );
    const todo = await Todo.findOne({
      where: { id },
    });

    if (Boolean(updatedTodo)) {
      res.send(todo);
    } else res.send({ message: "Todo not found" });
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: "server error" });
  }
};

/* 기존 Todo 삭제 */
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await Todo.destroy({
      where: { id },
    });

    if (Boolean(deleteTodo)) {
      res.send({ message: "Todo deleted successfully", deletedId: id });
    } else res.send({ message: "Todo not found" });
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: "server error" });
  }
};
