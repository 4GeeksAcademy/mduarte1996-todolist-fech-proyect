import React, { useState } from "react";
import { fetchModule } from "vite";

const Home = () => {
  const [tarea, setTarea] = useState(""); // Estado para el input
  const [tareas, setTareas] = useState([]);

  function crearUsuario() {
    fetch("https://playground.4geeks.com/todo/users/maria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "maria",
      }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Usuario 'maria' creado correctamente");
        } else {
          console.log(`Algo pasó. Código: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Respuesta de la API:", data);
      })
      .catch((error) => {
        console.error("Error de red al crear usuario:", error);
      });
  }

  const crearTarea = () => {
    if (tarea.trim() === "") return;

    fetch("https://playground.4geeks.com/todo/todos/maria", {
      method: "POST",
      body: JSON.stringify({
        label: tarea,
        is_done: false,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Tarea creada:", data);
        setTareas([...tareas, data]); // Añadir la nueva tarea al estado
        setTarea(""); // Limpiar el input
      })
      .catch((error) => {
        console.error("Error al crear tarea:", error);
      });
  }; 

  // const eliminarTarea = () => {
  //   fetch("https://playground.4geeks.com/todo/todos/maria", {
  //     method: "DELETE",
  //     })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  

  // }



  return (
    <div>
      <h1>Mi lista de tareas</h1>
      <br />
      <input
        type="text"
        value={tarea}
        placeholder="Escribe tu tarea aquí"
        onChange={(e) => setTarea(e.target.value)}
      />
      <button onClick={crearTarea}>Crear tarea</button>
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            {t.label}
            {/* <button onClick={() => eliminarTarea(t.id)}>🗑️</button> */}
          </li>
        ))}
      </ul>
    </div>
    
  );
};

export default Home;