import React, {useState, useEffect} from "react";
import ReactDOM from "react-dom/client";
import {TaskCard} from "./Task";
import { Posts } from "./Post";
const root = ReactDOM.createRoot(document.getElementById('root'))

function Counter() {

    const [counter, setCounter] = useState(0)
    cosnt [mensaje, setMensaje] = useState("")

    useEffect(function() {
        console.log("counter")
    },[])

    return (
        <div>
            <h1>Counter: {counter}</h1>
            <button onClick={()=>{
                setCounter(counter+1);
            }}>Sumar</button>
        </div>
    )
}
root.render(
    <>
        {/* <TaskCard/>
        <TaskCard/> */}
        {/* <Posts /> */}
        <Counter />
    </>
)
