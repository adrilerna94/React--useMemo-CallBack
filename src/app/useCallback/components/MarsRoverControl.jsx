'use client';
import { useCallback, useEffect, useState } from "react";
import RoverDashboard from "@/app/useMemo/components/RoverDashboard";
import { Typography, CardHeader, Card, CardBody, Button, Chip } from "@/components/ui";

export default function MarsRoverControl () {
    const [rovers, setRovers] = useState(() => {
        const initialRovers = [];
        const rovers = [
            "Curiosity",
            "Perseverance",
            "Opportunity",
            "Spirit",
            "Sojourner",
            "Zhurong",
            "Lunokhod 1",
            "Lunokhod 2",
            "Pathfinder",
            "Rosalind Franklin",
            "Endeavor",
            "Vanguard",
            "Aurora",
            "Pioneer",
            "TerraNova"
        ];  
        
        for (let i = 0; i <= 50; i++) {
            initialRovers[i] = {
                id: `Rover #${i}`,
                name: rovers[Math.floor(Math.random() * rovers.length)],
                status: i % 2 === 0 ? "Active" : "Repairing",
            }
        }
        return initialRovers;
    });
    const [contador, setContador] = useState(0);
    const [isRunning, setRunning] = useState(true);
    const [roverId, setRoverId] = useState("Rover #0");
    
    // Memoiza la función y usa siempre la misma referencia para evitar re-render a menos que roverId cambie
    const startScan = useCallback (() => {
        console.log(`Starting ${roverId} Scan`);
    }, [roverId]);

    useEffect(() => {
        // creamos el intervalo cada segundo
        if (!isRunning) return;
        const interval = setInterval(() => {
            setContador(prev => prev + 1);
        }, 1000);

        // limpiamos intervalo cuando componente se desmonta
        return () => clearInterval(interval);
    }, [isRunning]);

    const rover = rovers.find((r) => r.id === roverId);
    return (
        <>
          {/* Encabezado con contador y controles */}
          <div className="mb-6 space-y-4">
            <Typography variant="h2" className="text-center text-white">Panel de Control de Rovers</Typography>
      
            <div className="flex items-center gap-4">
              <Typography variant='h4' className="text-blue-400">
                ⏱️ Contador: {contador}
              </Typography>
              <Button
                color={isRunning ? "red" : "green"}
                onClick={() => setRunning(prev => !prev)}
              >
                {isRunning ? "⏸️ Pausar Contador" : "▶️ Activar Contador"}
              </Button>
              <Button color="yellow" onClick={() => setContador(0)}>
                🔄 Reset
              </Button>
            </div>
          </div>
      
          {/* Panel de información del rover activo */}
          <div className="mb-6 p-4 bg-gray-800 rounded-xl shadow-md text-white">
            <Typography variant="h5" className="text-blue-400 mb-2">
              Rover seleccionado: <strong>{roverId}</strong>
            </Typography>
            <Typography
              variant="h5"
              className={rover.status === "Active" ? "text-green-400" : "text-yellow-400"}
            >
              Estado: {rover.status === "Active" ? "✅ Activo" : "🚫 En Reparación"}
            </Typography>
          </div>
      
          {/* Componente Hijo: RoverDashboard */}
          <div className="mb-8">
            <RoverDashboard roverId={roverId} onStartScan={startScan} />
          </div>
      
          {/* Lista de Rovers */}
          <div className="space-y-4">
            <Typography variant="h3" className="text-center text-white mb-4">Lista de Rovers</Typography>
      
            {rovers.map((rover) => (
              <Card key={rover.id} className="bg-gray-900 text-white">
                <CardBody className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <Typography variant="h5" className="mb-1">{rover.name}</Typography>
                    <Chip
                      value={rover.status === "Active" ? "✅ Active" : "🚫 Repairing"}
                      color={rover.status === "Active" ? "green" : "yellow"}
                      variant="outlined"
                    />
                  </div>
      
                  <Button onClick={() => {
                    setRoverId(rover.id);
                    setRovers((prevRovers) =>
                      prevRovers.map((r) =>
                        r.id === rover.id
                          ? { ...r, status: r.status === "Active" ? "Repairing" : "Active" }
                          : r
                      )
                    );
                  }}>
                    <Typography variant="h5" className="text-blue-400">{rover.id}</Typography>
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </>
      );
}