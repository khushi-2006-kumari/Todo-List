import React, { useState } from 'react'
import { useTodo } from '../context';

function TodoItem({ todo }) { //here todo is from useState from App.jsx via Provider
    //Defines a acomponent that receives a single todo object as a prop(with field like id,todo,completed)
  const [isTodoEditable, setIsTodoEditable] = useState(false) //Tracks whether this specific todo is in edit mode. Starts as false(read-only)
  const [todoMsg, setTodoMsg] = useState(todo.todo) //the object itself is called todo(the prop), &inside it the text field ia also named todo (only todo means all thw hole object which consists id,todo,completed)
  const {updateTodo, deleteTodo, toggleComplete} = useTodo() //destructures three functions from the global context-update,delete, & toggle cpmpletion

  const editTodo = () => {
    updateTodo(todo.id, {...todo, todo: todoMsg})
    setIsTodoEditable(false) //this line for exits edit mode
    //when saving an edit-calls updateTodo with same todo object but with the new text(todoMsg), then exits edit mode
  }
  const toggleCompleted = () => { //for toggle only
    //console.log(todo.id); //use it for debugging
    toggleComplete(todo.id)
  }

  return (
      <div
          className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
              todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
          }`}
      >
          <input
              type="checkbox"
              className="cursor-pointer"
              checked={todo.completed}
              onChange={toggleCompleted}
          />
          <input
              type="text"
              className={`border outline-none w-full bg-transparent rounded-lg ${
                  isTodoEditable ? "border-black/10 px-2" : "border-transparent"
              } ${todo.completed ? "line-through" : ""}`}
              value={todoMsg}
              onChange={(e) => setTodoMsg(e.target.value)}
              readOnly={!isTodoEditable} //readOnly when not in edit mode-so you can't accidentally type
          />
          {/* Edit, Save Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
              onClick={() => {
                  if (todo.completed) return;

                  if (isTodoEditable) {
                      editTodo();
                  } else setIsTodoEditable((prev) => !prev);
              }}
              disabled={todo.completed}
          >
              {isTodoEditable ? "📁" : "✏️"}
          </button>
          {/* Delete Todo Button */}
          <button
              className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
              onClick={() => deleteTodo(todo.id)}
          >
              ❌
          </button>
      </div>
  );
}

export default TodoItem;