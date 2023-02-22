import styles from './taskInput.module.scss';
import { useState, useRef } from 'react';
import { Todo } from '../../@types/todo.type';
type TaskInputProps = {
  addTask: (name: string) => void;
  editCurrentTask: Todo | null;
  editTodo: (value: string) => void;
  completeEditTodo: () => void;
};
function TaskInput(props: TaskInputProps) {
  const { addTask, editCurrentTask, editTodo, completeEditTodo } = props;
  const input = useRef<HTMLInputElement>(null);
  const [name, setName] = useState<string>('');
  const handleAddTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (editCurrentTask) {
      editTodo(value);
    } else setName(value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (editCurrentTask) {
      completeEditTodo();
      setName('');
    } else {
      addTask(name);
      setName('');
    }
    input.current?.focus();
  };
  return (
    <div>
      <h1 className={styles.title}>Todo app with react-typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input
          type='text'
          className={styles.formEnter}
          placeholder='Enter your task'
          value={editCurrentTask ? editCurrentTask.name : name}
          onChange={handleAddTodo}
          ref={input}
        />
        <button type='submit' className={styles.formBtn}>
          {editCurrentTask ? '✔️' : '➕'}
        </button>
      </form>
    </div>
  );
}

export default TaskInput;
