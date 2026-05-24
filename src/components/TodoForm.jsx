import React, { useState } from 'react'
import { useTodo } from '../context';

function TodoForm() {
    const [todo, setTodo] = useState("")
    const {addTodo} = useTodo()

    const add = (e) => {
      e.preventDefault()// stops the form refreshing the page on submit. without this,page reloads every time you click Add

      if (!todo) return //if input is empty, do nothing and exit,prevents adding blank todos

      addTodo({ todo, completed: false}) //you can add like {id: ,toto:todo,completed:false  } instead of { todo, completed: false}, because in addTodo function in App.jsx id is already defined so no need to define here and write simple todo rather than todo:todo  due to same name
      // todo: the text typed in input, completed: false-> new todo always starts as incomplete
      setTodo("") //clear input field after adding the input
    }

  return (
      <form onSubmit={add}  className="flex">
          <input
              type="text"
              placeholder="Write Todo..."
              className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
              value={todo} //input is controlled by state
              onChange={(e) => setTodo(e.target.value)} // onChange:every keypress updates todo state with typed value, e.target.value: whatever is currently typed in the input
          />
          <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
              Add
          </button>
      </form>
  );
}

export default TodoForm;