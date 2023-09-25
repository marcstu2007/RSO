import "./Task.css"
import {Button} from "./Button"
export function TaskCard(){
    return <div className="card">
        <h1>Mi primera tarea</h1>
        <p text="Mi nuevo botón">Tarea realizada</p>
        <Button/>
    </div>
}