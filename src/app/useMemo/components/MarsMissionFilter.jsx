'use client'; // componente se renderiza lado cliente

import {
    Typography,
    Chip,
    Input,
    Select,
    Option,
    Card,
    CardBody,
    Button,
} from "@/components/ui";
// importacion de hooks de react
import { useState, useMemo, useEffect } from "react";

export default function MarsMissionFilter() {
    const [searchTerm, setSearchedTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState(""); // All / Active / Completed
    const [active, setActive] = useState(false);

    // const [missions, setMissions] = useState([]);

    // useEffect(() => {
    //     const simulated = [];
    //     for (let i = 0; i <= 1000; i++) {
    //         simulated.push({
    //             missionId: i,
    //             name: `Spatial Mission Num ${i}`,
    //             status: i % 2 === 0 ? "Active" : "Completed",
    //         });
    //     }
    //     setMissions(simulated);
    // },[]);
    
    // estado inicial con una lista de 2000 misiones generadas dinámicamente
    const [missions, setMissions] = useState(()=> {
        const simulated = [];
        for (let i = 0; i <= 2000; i++) {
            simulated.push({
                missionId: i,
                name: `Spatial Mission Num ${i}`,
                status: i % 2 === 0 ? "Active" : "Completed",
            });
        }
        return simulated;
    });

    // 👇
    console.log("🌀 Renderizando componente");
    // Función de filtrado costoso que simula un proceso lento
    function expensiveFilter (list, searchTerm, status) {
        console.log("🔍 Ejecutando expensiveFilter para:", searchTerm, "con estado:", status);
        // delay artificial para simular carga de procesamiento
        for (let i = 0; i  < 5000_000; i++) {
            // unnecessary calculation, only for making the function slower
            // genera hydration error --> Math.sqrt(i) * Math.random();
            i *= i**i;
        }
        // devolvemos lista filtrada de misiones
        return list.filter((mission) => {
            const matchTerm = mission.name.toLowerCase().includes(searchTerm.toLowerCase()); // mission.name incluye el searchTerm
            const matchStatus = !status  || mission.status === status; // no hay filtro o coincide con el de la mission
            return matchTerm && matchStatus; // retorna la lista filtrada con el stado y el searchTerm
            // return true && true
            //  solo devuelve la mission si coincide con el termino de búsqueda y cumple con el filtro estado (sin estado o coincide)
        })
    }

    // Memoized filtered result using useMemo
    const filteredMissions = useMemo(() => {
        console.log("📦 useMemo ejecutando expensiveFilter");
        // Only if missions, searchTerm or FilterStatus change, filter is recalculated
        return expensiveFilter(missions, searchTerm, filterStatus);

    }, [missions, searchTerm, filterStatus]);

    // ❌ Sin useMemo: se ejecuta cada vez que el componente renderiza tanto si cambian las dependencias como si no
    // const filteredMissions = expensiveFilter(missions, searchTerm, filterStatus);
    

    // rendering component
    return (
        <div className="p-6">
          <Typography variant="h4" color="white" className="mb-6">
            🚀 Mission Filter
          </Typography>
      
          <div className="flex flex-col sm:flex-row gap-2 mb-2">
            {/* Input de búsqueda */}
            <Input
              label="🔍 Search mission by name..."
              value={searchTerm}
              onChange={(e) => setSearchedTerm(e.target.value)}
              color="blue"
              className="text-white"
              crossOrigin=""
            />
      
            {/* Selector de estado */}
            <Select
              label="Filter by status"
              value={filterStatus}
              onChange={(val) => setFilterStatus(val)}
              color="blue"
            >
              <Option value="">All</Option>
              <Option value="Active">Activas</Option>
              <Option value="Completed">Completadas</Option>
            </Select>
            <Button
                onClick={() => setActive(!active)}
                className={`rounded-md font-semibold transition duration-300 ${
                    active
                    ? "bg-red-600 hover:bg-red-700"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white px-6 py-2`}
                >
                {active ? "Desactivar" : "Activar"}
            </Button>

            <div
                className={`inline-block px-4 py-2 rounded-lg text-white text-sm font-medium ${
                    active ? "bg-green-600" : "bg-gray-500"
                }`}
                >
                {active ? "✅ Activo" : "🕓 Inactivo"}
            </div>

          </div>
      
          <div className="space-y-4">
            {filteredMissions.map((mission) => (
              <Card key={mission.missionId} className="bg-gray-900 text-white">
                <CardBody className="flex items-center justify-between">
                  <Typography>{mission.name}</Typography>
                  <Chip
                    value={mission.status === "Active" ? "🚀 Active" : "✅ Completed"}
                    color={mission.status === "Active" ? "blue" : "green"}
                    variant="outlined"
                  />
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      );
    
}