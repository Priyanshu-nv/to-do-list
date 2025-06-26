import TodoItems from './TodoItems';
import todo_icon from '../assets/todo_icon.png';
import { useEffect, useRef, useState } from 'react';

const Todo = () => {
  const [todoList, settodoList] = useState(
    localStorage.getItem('todos')
      ? JSON.parse(localStorage.getItem('todos'))
      : []
  );

  const inputRef = useRef();

  const add = () => {
    const inputText = inputRef.current.value.trim();

    if (inputText === '') {
      return null;
    }

    const newTodo = {
      id: Date.now(),
      text: inputText,
      isComplete: false,
    };
    settodoList((prev) => [...prev, newTodo]);
    inputRef.current.value = '';
  };

  const deleteTodo = (id) => {
    settodoList((prevTodo) => {
      return prevTodo.filter((todo) => todo.id !== id);
    });
  };

  const toggle = (id) => {
    settodoList((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isComplete: !todo.isComplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <div className="place-self-center flex flex-col p-7 min-h-[550px] bg-white w-11/12 rounded-xl max-w-md">
      <div className="flex items-center mt-7 gap-2">
        <img className="w-8 pt-1" src={todo_icon} alt="" />
        <h1 className="text-3xl font-semibold text-black">To-Do List</h1>
      </div>

      <div className="flex items-center my-7 bg-gray-200 rounded-full">
        <input
          ref={inputRef}
          className="border-none outline-0 flex-1 h-14 pl-6 pr-2 placeholder:text-slate-600"
          type="text"
          placeholder="Add your task"
        />
        <button
          onClick={add}
          className="rounded-full bg-orange-500 w-26 h-14 text-white text-lg font-medium cursor-pointer hover:bg-orange-600"
        >
          ADD
        </button>
      </div>

      <div>
        {todoList.map((item, i) => {
          return (
            <TodoItems
              key={i}
              text={item.text}
              id={item.id}
              isComplete={item.isComplete}
              deleteTodo={deleteTodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
