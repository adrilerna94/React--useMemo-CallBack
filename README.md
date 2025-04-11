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

   # 🚀 Ejercicio 2: Evitando Re-renders en un Componente Hijo con `useCallback`

## Descripción
Vas a simular una consola de control de robots exploradores en Marte.  
Tendrás un componente **padre** que controla el “rover activo” y un componente **hijo** (`RoverDashboard`) que muestra información de ese rover.  
El padre también maneja otras funciones (por ejemplo, un chat o un cronómetro), que cambian con frecuencia.

---

## Objetivo
Usar `useCallback` para memoizar una o varias funciones que se pasan como props a un componente hijo memoizado con `React.memo`,  
evitando **re-renders innecesarios**.

---

## Instrucciones

1. Crea el componente padre `MarsRoverControl.jsx` con un estado para:
   - El **rover activo** (`roverId`)
   - Otro estado que **cambie constantemente**, como un cronómetro

2. Define una función para “iniciar un escaneo” en el rover activo, memoizada con `useCallback`:

   ```jsx
   const startScan = useCallback(() => {
     console.log(`Iniciando escaneo en el Rover #${roverId}`);
     // Lógica simulada
   }, [roverId]);

