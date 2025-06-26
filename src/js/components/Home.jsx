import React, { useState, useEffect } from "react";
import "../../styles/index.css";

const Home = () => {
  const [tarea, setTarea] = useState(""); // Estado para el input
  const [tareas, setTareas] = useState([]); // Estado para la lista de tareas

  // Se ejecuta una sola vez cuando el componente se monta
  useEffect(() => {
    agregarTareas();
  }, []);

  // Función para crear usuario si no existe
  function crearUsuario() {
    fetch("https://playground.4geeks.com/todo/users/maria", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "maria" }),
    })
      .then((response) => {
        if (response.status === 201) {
          console.log("Usuario creado correctamente");
          agregarTareas(); // luego de crearlo, traemos las tareas vacías
        } else {
          console.log("Código:", response.status);
        }
        return response.json();
      })
      .catch((error) => {
        console.error("Error al crear usuario:", error);
      });
  }

  // Función para traer las tareas con método GET
  function agregarTareas() {
    fetch("https://playground.4geeks.com/todo/users/maria", {
      method: "GET",
    })
      .then((response) => {
        if (response.status === 404) {
          crearUsuario(); // Si no existe, lo creamos
          return;
        }
        return response.json();
      })
      .then((data) => {
        if (data?.todos) {
          setTareas(data.todos); // Guardamos las tareas recibidas
        }
      })
      .catch((error) => console.log("Error al obtener tareas:", error));
  }

  // Función para crear tarea
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
        setTarea(""); // Limpiar input
        agregarTareas(); // Volver a traer la lista actualizada
      })
      .catch((error) => {
        console.error("Error al crear tarea:", error);
      });
  };

  // Función para eliminar tarea
  const eliminarTarea = (id) => {
    fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          console.log("Tarea eliminada");
          agregarTareas(); // Refrescar la lista después de eliminar
        } else { // siempre es mejor colocar un else para asi saber que ha sucedido en caso de que salga negativo
          console.error("No se pudo eliminar la tarea");
        }
      })
      .catch((error) => {
        console.error("Error al eliminar tarea:", error);
      });
  };

  return (
    <div className="text-center container mt-5">
      <h1>Mi lista de tareas</h1>
      <input
        type="text"
        value={tarea}
        placeholder="Escribe tu tarea aquí"
        onChange={(e) => setTarea(e.target.value)}
      />
      <button onClick={crearTarea}>Crear tarea</button>
      <ul className="list-group mt-3" style={{ listStyleType: "none", paddingLeft: "0" }}>
        {tareas.map((t) => (
          <li key={t.id}>
            {t.label} 
            <button onClick={() => eliminarTarea(t.id)} >X</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
