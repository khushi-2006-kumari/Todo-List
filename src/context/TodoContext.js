import {useContext,createContext} from "react"

export const TodoContext=createContext({
    //below a;; are default value of craeteContext
    todos: [ //a real todos : a react state array that holds all your todo items,  infact 'todos' : fallback array, when no Provider exist(rarely used)
        //todos array is just shake of safety, it prevents from crash 
        //beacause this a plain JS object, not state. It never changes, React doesn't track
        //as this is not wrapped by Provider, if somehow a component accidentally uses useTodo() outside the Provider then no crashes, it just gets the default valu which we define in todos array
        {
            id: 1,
            todo: " Todo msg",
            completed: false,
        }
    ],
    //These are placeholder function ,they are just initialised not define here all are defined in App.jsx
    addTodo:(todo)=>{},
    updatteTodo:(id,todo)=>{},
    deleteTodo:(id)=>{},
    toggleComplete:(id)=>{}
})

export const useTodo=()=>{
     return useContext(TodoContext) // 'useTodo' : a custom hook, instead of calling useContext(TodoContext) everywhere, any component just calls useTodo() to get access to the todos & all the functions
}

export const TodoProvider=TodoContext.Provider //it is just easiness for us, instead of calling 'TodoContext.Provider' everywhere we can call by 'TodoProvider'
