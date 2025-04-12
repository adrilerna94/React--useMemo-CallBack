# 🪐 Mission: Red Planet

## S11 - React (NextJS): Memoization

### 📁 demo-nextjs-Memoization  
### 📄 S11-Ex

---

## 🧪 Ejercicio 1: Filtrado Costoso con `useMemo`

### Descripción
Vas a simular un listado grande de misiones que pueden filtrarse por nombre o por su estado (por ejemplo, “Activa” o “Completada”).  
El proceso de filtrado será deliberadamente pesado para que notes la mejora cuando uses `useMemo`.

---

### Objetivo
Usar `useMemo` para **memoizar** la operación de filtrado y evitar que cada pulsación de tecla desencadene todo el proceso de forma innecesaria.

---

### Instrucciones

1. Crea un componente `MarsMissionFilter.jsx`.

2. Define un estado `missions` con, por ejemplo, **1000 o más misiones simuladas**.  
   Puedes usar un bucle para generarlas. Ejemplo:

   ```jsx
   const [missions, setMissions] = useState(() => {
     const temp = [];
     for (let i = 1; i <= 1000; i++) {
       temp.push({
         id: i,
         name: `Mission #${i}`,
         status: i % 2 === 0 ? "Activa" : "Completada",
       });
     }
     return temp;
   });

3. Define también un estado para el término de búsqueda (searchTerm) y otro para el filtro por estado (filterStatus).

4. Implementa una función de filtrado costosa como esta:

  ```jsx
  function expensiveFilter(list, searchTerm, status) {
    // Simulación de trabajo pesado
    for (let i = 0; i < 500000; i++) {
      // Operación de relleno
    }

    return list.filter((mission) => {
      const matchTerm = mission.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchStatus = !status || mission.status === status;
      return matchTerm && matchStatus;
    });
  }
  ```
💡 Este bucle interno simula una operación pesada, para apreciar el impacto del memoizado.

5. Usa useMemo para memoizar el resultado del filtro:

```jsx
const filteredMissions = useMemo(() => {
  console.log("Recalculando filtro...");
  return expensiveFilter(missions, searchTerm, filterStatus);
}, [missions, searchTerm, filterStatus]);
```

6. Mostrar resultados con filtros interactivos
Implementa una lista que muestre los resultados filtrados, y añade dos elementos de entrada para permitir al usuario cambiar los criterios de búsqueda:

- Un <input type="text" /> para modificar searchTerm.

- Un <select> para modificar filterStatus, con las opciones: Todas, Activa, y Completada.

### Cómo comprobar la mejora en el rendimiento
Puedes verificar la optimización usando useMemo de la siguiente forma:

1. Añade un console.log() dentro de la función expensiveFilter.

2. Observa el comportamiento cuando escribes en el cuadro de búsqueda:

  - ❌ Sin useMemo: Cada pulsación en el input ejecutará expensiveFilter, incluso si filterStatus no ha cambiado.

  - ✅ Con useMemo: El filtrado solo se recalcula cuando cambien las dependencias (searchTerm o filterStatus), evitando cálculos innecesarios.

