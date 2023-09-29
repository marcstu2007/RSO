import TaskList from "./components/TaskList";
import TaskForm from "./TaskForm.jsx";
import TaskPID from "./TaskPID";
import Detalle from "./components/route/Detail";

function App() {
  return (
    <main className="bg-zinc-900">
      <div className="container mx-auto p-10">
        <h1 className="text-2xl font-bold text-white text-center mb-3 ">
          Modulos de kernel
        </h1>
        <select>
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          {/* <option selected value="coconut">
            Coconut
          </option> */}
          <option value="mango">Mango</option>
        </select>
        <TaskList />
        {/* <TaskForm /> */}
        <TaskPID />
        <Detalle />
      </div>
    </main>
  );
}

export default App;
