import { useState, useEffect } from 'react'
import { TodoProvider } from './contexts'
import './App.css'
import TodoForm from './components/TodoForm'
import TodoItem from './components/TodoItem'

function App() {
  const [todos, setTodos] = useState([])
  const [filter, setFilter] = useState("all")

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev])
  }

  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    )
  }

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id))
  }

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    )
  }

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed))
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

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed
    if (filter === "pending") return !todo.completed
    return true
  })

  return (
    <TodoProvider value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}>
      <div className="bg-[#172842] min-h-screen py-8 flex flex-col">
        {/* MAIN CONTENT */}
        <div className="flex-grow">
          <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">

            {/* HERO HEADING */}
            <h1 className="text-center mb-8 mt-2">
              <span className="block text-3xl font-extrabold tracking-wide">
                Manage Your Todos
              </span>
              <span className="block text-sm text-gray-300 mt-1">
                Stay organized. Stay productive.
              </span>
            </h1>

            <div className="mb-4">
              <TodoForm />
            </div>

            {/* FILTER BUTTONS */}
            <div className="flex gap-2 justify-center mb-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 rounded ${
                  filter === "all" ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                All
              </button>

              <button
                onClick={() => setFilter("completed")}
                className={`px-3 py-1 rounded ${
                  filter === "completed" ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                Completed
              </button>

              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1 rounded ${
                  filter === "pending" ? "bg-green-600" : "bg-gray-600"
                }`}
              >
                Pending
              </button>
            </div>

            {/* CLEAR COMPLETED */}
            <div className="flex justify-center mb-6">
              <button
                onClick={clearCompleted}
                className="bg-red-600 px-4 py-1 rounded hover:bg-red-700"
              >
                Clear Completed
              </button>
            </div>

            <div className="flex flex-wrap gap-y-3">
              {filteredTodos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-12 border-t border-white/10 py-6 text-center text-sm text-gray-400">
          <div className="flex justify-center gap-6 mb-3">

            {/* GitHub */}
            <a
              href="https://github.com/Shubham-Git-Hub-1Pro"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="GitHub"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 .5C5.73.5.5 5.74.5 12.03c0 5.11 3.29 9.44 7.86 10.97.58.11.79-.25.79-.56v-2.17c-3.2.7-3.87-1.37-3.87-1.37-.52-1.34-1.27-1.7-1.27-1.7-1.04-.72.08-.71.08-.71 1.15.08 1.76 1.19 1.76 1.19 1.02 1.75 2.68 1.25 3.33.95.1-.74.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.71 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 2.9-.39c.98 0 1.97.13 2.9.39 2.21-1.49 3.18-1.18 3.18-1.18.63 1.58.23 2.75.11 3.04.74.81 1.19 1.84 1.19 3.1 0 4.44-2.69 5.41-5.25 5.69.41.36.77 1.07.77 2.16v3.2c0 .31.21.68.8.56A11.54 11.54 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z" />
              </svg>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/shubham-kumar-yadav-0b2b7029b"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition"
              aria-label="LinkedIn"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8.99h4V24h-4V8.99zM8.5 8.99h3.8v2.05h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.85c0-1.87-.03-4.28-2.61-4.28-2.61 0-3.01 2.04-3.01 4.14V24h-4V8.99z" />
              </svg>
            </a>

          </div>

          <div>
            © {new Date().getFullYear()} Shubham Kumar Yadav. All rights reserved.
          </div>
        </footer>
      </div>
    </TodoProvider>
  )
}

export default App
