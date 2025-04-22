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

6. Mostrar resultados con filtros interactivos:
- Implementa una lista que muestre los resultados filtrados, y añade dos elementos de entrada para permitir al usuario cambiar los criterios de búsqueda:

- Un ```<input type="text" />``` para modificar searchTerm.

- Un ```<select>``` para modificar filterStatus, con las opciones: Todas, Activa, y Completada.

---


### Cómo comprobar la mejora en el rendimiento
Puedes verificar la optimización usando useMemo de la siguiente forma:

1. Añade un <strong>console.log()</strong> dentro de la función expensiveFilter.

2. Observa el comportamiento cuando escribes en el cuadro de búsqueda:

    - ❌ <strong> Sin useMemo: </strong> Cada pulsación en el input ejecutará expensiveFilter, incluso si filterStatus no ha cambiado.

    - ✅ <strong>Con useMemo:</strong> El filtrado solo se recalcula cuando cambien las dependencias (searchTerm o filterStatus), evitando cálculos innecesarios.

## Ejercicio 2: Evitando Re-renders en un Componente Hijo con useCallback

### 🧠 Descripción
Vas a simular una consola de control de robots exploradores en Marte. Tendrás un componente padre que controla el rover activo y un componente hijo (por ejemplo, RoverDashboard) que muestra información de ese rover. El componente padre también maneja otras funciones (como un chat o un cronómetro), que cambian con frecuencia.

### 🎯 Objetivo
Usar useCallback para memoizar una o varias funciones que se pasan como props a un componente hijo memoizado con React.memo, evitando re-renders innecesarios.

### 🛠️ Instrucciones
1. Crea el componente padre MarsRoverControl.jsx con:

  - Un estado para el rover activo (roverId).
  - Otro estado para algún elemento que cambie constantemente (por ejemplo, un cronómetro).

2. Define una función para iniciar un escaneo en el rover activo, como esta:

```jsx
const startScan = useCallback(() => {
  console.log(`Iniciando escaneo en el Rover #${roverId}`);
  // Lógica simulada
}, [roverId]);
```
3. Renderiza varios botones que permitan cambiar el roverId, por ejemplo: "Rover #1","Rover #2","Rover #3",etc.

4. Renderiza el componente hijo ``<RoverDashboard />`` y pásale las props ``onStartScan`` (función memoizada) y ``roverId``.

5. En RoverDashboard.jsx:

  - Envuelve el componente en React.memo.

  - Recibe las props roverId y onStartScan.

  - Muestra un mensaje en consola en cada render para verificar si el componente se ha vuelto a renderizar:

```jsx 
console.log("Renderizando RoverDashboard..."); 
```
---

### ✅ ¿Cómo comprobar la mejora?
- <strong> Sin </strong> ``useCallback``: cada cambio en el cronómetro del componente padre genera una nueva referencia de la función startScan, lo que forzará el re-render del hijo.
- <strong> Con </strong> ``useCallback``: la referencia se mantiene estable mientras roverId no cambie, y el componente hijo no se re-renderiza innecesariamente.