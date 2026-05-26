import { useState ,useEffect} from 'react'
import { TodoContext,TodoProvider,useTodo } from './context'
import {TodoForm,TodoItem} from './components'

function App() {
  const [todos, setTodos] = useState([])
  //this addTodo function is add new todo , in prev todo list
  const addTodo = (todo) => {
    setTodos((prev) => [{id: Date.now(), ...todo}, ...prev] ) // new todo at top, then prev todo at last, acccoording this written way/order
  }
  //this updateTodo finds id then replace it with new todo that's why it take two argument(id,todo), here todo is new todo data
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo )))
 //prev: current todos array
 //.map(): loops through every todo one by one
 //return a new array with changed applied 
  }

  // deleteTodo function tryit to find that id's which are doen't match with passing id which we want to remove

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  //.fiter(): keeps only todos whose id doesn't match
  }

  //Finds the todo wtih matching id
  //spread all its existing properties of target id's todo data (by ...prevTodo)
  //flips completed : if true->false or vice-versa
  const toggleComplete = (id) => {
    //console.log(id);
    setTodos((prev) => 
    prev.map((prevTodo) => 
      prevTodo.id === id ? { ...prevTodo, 
        completed: !prevTodo.completed } : prevTodo))
  }

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"))

    if (todos && todos.length > 0) {
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }, [todos])
  
  return (
   <TodoProvider value={{todos, addTodo, updateTodo, deleteTodo, toggleComplete}}> {/* here todos is  a reactive state variable define by useStae , not come from createContext default todos array */}
    
      <div className="bg-linear-to-br from-purple-700 via-blue-600 to-teal-500 min-h-screen py-8">
                <div className="w-full max-w-2xl mx-auto bg-white/10 backdrop-blur-md shadow-xl rounded-2xl px-6 py-6 mt-10 text-amber-500">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-4">Manage Your Todos</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <TodoForm />
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                        {todos.map((todo) => (
                          <div key={todo.id}
                          className='w-full'
                          >
                            <TodoItem todo={todo} />
                          </div>
                        ))}
                    </div>
                </div>
            </div>
    
    </TodoProvider>
  )
}

export default App
