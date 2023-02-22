import { Todo } from '../../@types/todo.type';
import styles from './taskList.module.scss';
type TaskListProps = {
  doneTaskList?: boolean;
  todos: Todo[];
  handleCheckbox: (id: string, done: boolean) => void;
  findEditTask: (id: string) => void;
  deleteTask: (id: string) => void;
};
function TaskLisk(props: TaskListProps) {
  const { doneTaskList, todos, handleCheckbox, findEditTask, deleteTask } = props;

  const handleEdit = (id: string) => {
    findEditTask(id);
  };
  return (
    <div>
      <h2 className={styles.title}>{doneTaskList ? 'Complete task' : 'Todo list'}</h2>
      <div className={styles.tasks}>
        {todos.map((todo) => (
          <div className={`${styles.task}`} key={todo.id}>
            <input
              type='checkbox'
              checked={todo.done}
              onChange={(e) => {
                handleCheckbox(todo.id, e.target.checked);
              }}
            />
            <span className={`${styles.taskName} ${todo.done ? styles.taskNameDone : ''}`}>{todo.name}</span>
            <div className={styles.taskActions}>
              <button className={styles.taskBtn} onClick={() => handleEdit(todo.id)}>
                ✏️
              </button>
              <button className={styles.taskBtn} onClick={() => deleteTask(todo.id)}>
                ➖
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TaskLisk;
