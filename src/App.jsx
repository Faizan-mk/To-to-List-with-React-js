import { useState,useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/navbar";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  const [showfinish, setshowfinish] = useState(true)

 useEffect(() => {
   let todostring=localStorage.getItem("todos")
   if(todostring){
    let todos=JSON.parse(localStorage.getItem("todos"))
    settodos(todos)
   }
 }, [])
 
 
   const  savetols=(params) => {
     localStorage.setItem("todos",JSON.stringify(todos))
   }
   
  const handleedit = (e,id) => {
let t=todos.filter(i=>i.id===id)
settodo(t[0].todo)
 let newtodos = todos.filter((items) => {
      return items.id !== id;
    });
    settodos(newtodos);
    savetols()
  }

  const handledelete = (e, id) => {
    let newtodos = todos.filter((items) => {
      return items.id !== id;
    });
    settodos(newtodos);
    savetols()
  };
  const handleadd = () => {
    settodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    settodo("");
    savetols()
  };
  const handlechange = (e) => {
    settodo(e.target.value);
  };
  const handlecheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((items) => {
      return items.id === id;
    });
    let newtodos = [...todos];
    newtodos[index].isCompleted = !newtodos[index].isCompleted;
    settodos(newtodos);
    savetols()
  };
  const togglefinished=(e) => {
    setshowfinish(!showfinish)
  }
  
  return (
    <>
      <Navbar />

      <div className="md:container mx-3 md:mx-auto my-5 rounded-xl p-5 
    bg-gray-900 border-2 border-pink-500 shadow-lg shadow-pink-500/50 
    h-[80vh] md:w-[35%] text-white backdrop-blur-md">
      <h1 className="font-bold text-center text-2xl neon-text"> itasks - Mange Yours Todos</h1>
        <div className="addtodo my-5 flex flex-col gap-4">
          <h1 className="text-xl font-bold my-5">Add a Todo</h1>
          <input
            onChange={handlechange}
            value={todo}
            className="bg-amber-500 w-full rounded-full p-2"
            type="text"
          />
          <button
          disabled={todo.length<=3}
            onClick={handleadd}
            className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white mx-6 rounded-full text-sm font-bold neon-btn "
          >
            Save
          </button>
        </div>
        <input className="my-4" onChange={togglefinished} type="checkbox" checked={showfinish} />  Show Finished
        <hr />
        <h2 className="text-lg font-bold my-3">Yours Todos</h2>
        <div className="todos ">
          {todos.length===0 && <div className="m-5 text-red-500">Hello Bahi  Todos Kon Dale Ga </div> }
          {todos.map(items => {
            return (showfinish || !items.isCompleted) && <div className="todo  flex key={items.id}  justify-between my-3">
                <div className="flex gap-5 ">
                <input
                  onChange={handlecheckbox}
                  type="checkbox"
                  checked={items.isCompleted}
                  name={items.id}
                  id=""
                />
                <div className={items.isCompleted ? "line-through" : ""}>
                  {" "}
                  {items.todo}
                </div>
                </div>
                <div className="button flex h-full">
                  <button
                    onClick={(e)=>handleedit(e,items.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold "
                  >
                   < FaRegEdit/>
                  </button>
                  <button
                    onClick={(e) => handledelete(e, items.id)}
                    className="bg-violet-800 hover:bg-violet-950 p-2 py-1 text-white rounded-md mx-1 text-sm font-bold "
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
          
          })}
        </div>
      </div>
    </>
  );
}

export default App;
