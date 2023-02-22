import TaskInput from '../TaskInput';
import TaskLisk from '../TodoTask';
import styles from './todoList.module.scss';
import { Todo } from '../../@types/todo.type';
import { useState, useEffect } from 'react';
function TodoList() {
  const getTodoFromLocal: Todo[] = JSON.parse(localStorage.getItem('todos') || '[]');
  const initTodos = () => {
    return getTodoFromLocal.length ? getTodoFromLocal : [];
  };
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  useEffect(() => {
    if (todos.length === 0) {
      localStorage.clear();
    } else {
      const todoLocal = JSON.stringify(todos);
      localStorage.setItem('todos', todoLocal);
    }
  }, [todos]);
  const [editCurrentTask, setEditCurrentTask] = useState<Todo | null>(null);
  const addTask = (name: string) => {
    const todo: Todo = {
      name,
      done: false,
      id: new Date().toISOString()
    };
    setTodos((prev) => [...prev, todo]);
  };
  const handleCheckbox = (id: string | number, done: boolean) => {
    setTodos((prev) => {
      return prev.map((todo) => {
        return todo.id === id ? { ...todo, done } : todo;
      });
    });
  };
  const findEditTask = (id: string) => {
    const editTask = todos.find((todo) => todo.id === id);
    if (editTask) {
      setEditCurrentTask(editTask);
    }
  };
  const editTodo = (value: string) => {
    setEditCurrentTask((prev) => {
      if (prev) {
        return { ...prev, name: value };
      }
      return null;
    });
  };
  const completeEditTodo = () => {
    setTodos((prev) => {
      return prev.map((todo) => {
        if (todo.id === editCurrentTask?.id) {
          return editCurrentTask;
        } else return todo;
      });
    });
    setEditCurrentTask(null);
  };
  const deleteTask = (id: string) => {
    setTodos((prev) => {
      return prev.filter((todo) => todo.id !== id);
    });
  };
  const doneTodo = todos.filter((todo) => todo.done);
  const notDoneTodo = todos.filter((todo) => !todo.done);
  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput
          addTask={addTask}
          editCurrentTask={editCurrentTask}
          editTodo={editTodo}
          completeEditTodo={completeEditTodo}
        />
        {todos.length > 0 && (
          <>
            <TaskLisk
              doneTaskList={false}
              todos={notDoneTodo}
              handleCheckbox={handleCheckbox}
              findEditTask={findEditTask}
              deleteTask={deleteTask}
            />
            <TaskLisk
              doneTaskList
              todos={doneTodo}
              handleCheckbox={handleCheckbox}
              findEditTask={findEditTask}
              deleteTask={deleteTask}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default TodoList;
