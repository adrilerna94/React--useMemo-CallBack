import { memo, useState } from "react";
import { Button, Typography } from '@/components/ui';

const RoverDashboard = memo(({ roverId, onStartScan }) => {
  const [isScanning, setScanning] = useState(false);

  console.log("Renderizando Componente Hijo RoverDashboard...");

  return (
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-md space-y-4">
      <Typography variant="h5" className="text-blue-400">
        🚀 Panel de control del <strong>{roverId}</strong>
      </Typography>

      <div className="flex items-center gap-4">
        <Button
          onClick={() => {
            setScanning((scann) => !scann);
            onStartScan();
          }}
          className="mt-2"
        >
          {!isScanning ? "▶️ Iniciar escaneo" : "🔍 Escaneando..."}
        </Button>

        {isScanning && (
          <Typography variant="small" className="text-green-400">
            🔄 Proceso en curso...
          </Typography>
        )}
      </div>
    </div>
  );
});

export default RoverDashboard;
