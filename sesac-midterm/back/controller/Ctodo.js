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
// (배점 1점) 존재하는 Todo ID 로 수정하는 경우, Todo가 잘 수정되는가?
// Todo 는 title, done 두 속성에 대해 수정 가능합니다.
// 두 속성 중 하나라도 수정되었다면 updatedAt 컬럼 값이 변경됩니다.
// (배점 0.5점) 존재하지 않는 Todo ID 로 삭제하는 경우, 에러 메세지가 잘 응답되는가?
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
      res.send({ message: "Todo not found", deletedId: id });
    } else res.send({ message: "Todo not found" });
  } catch (err) {
    console.log("err", err);
    res.status(500).send({ message: "server error" });
  }
};
