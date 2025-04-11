'use client';

import {
  Typography,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
} from '@/components/ui';
import { useState, useMemo } from 'react';

export default function MarsMissionHeavyCalculation() {
  const [tempIterationCount, setTempIterationCount] = useState(5000000);
  const [confirmedIterationCount, setConfirmedIterationCount] =
    useState(5000000);

  const [forceRenderCount, setForceRenderCount] = useState(0);

  // Cálculo costoso sin useMemo (PRUEBA 1):
  console.log('2. Ejecutando cálculo costoso...');
  let heavyCalculation2 = 0;
  for (let i = 0; i < confirmedIterationCount; i++) {
    // Operación aleatoria para simular carga
    heavyCalculation2 += i * 2;
  }
  console.log('2. Cálculo costoso completado.');

  /* Cálculo costoso con useMemo (PRUEBA 2):
   *    Se memoiza para que se ejecute solo si
   *    "confirmedIterationCount" cambia.
   *    Si se cambia "tempIterationCount", no se vuelve a ejecutar
   *    hasta que se confirme con "applyIterationCount".
   */
  const heavyCalculation = useMemo(() => {
    console.log('Ejecutando cálculo costoso...');
    let result = 0;
    for (let i = 0; i < confirmedIterationCount; i++) {
      // Operación aleatoria para simular carga
      result += i * 2;
    }
    console.log('Cálculo costoso completado.');
    return result;
    // Se vuelve a calcular SOLO si cambia "iterationCount"
  }, [confirmedIterationCount]);

  // Actualizar el estado temporal al escribir en el input
  const handleTempCountChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue) && newValue >= 0) {
      setTempIterationCount(newValue);
    }
  };

  // Al hacer clic en este botón, actualizamos el estado "oficial" (confirmedIterationCount)
  const applyIterationCount = () => {
    setConfirmedIterationCount(tempIterationCount);
  };

  // Función para forzar un re-render manual sin cambiar iterationCount
  const forceRerender = () => {
    setForceRenderCount((prev) => prev + 1);
  };

  return (
    <Card className="w-fit mx-auto p-4 my-4">
      <CardHeader className="bg-gray-900 p-4 m-1">
        <Typography variant="h2" color="amber">
          Misión: Red Planet - Cálculo Costoso
        </Typography>
        <Typography>
          <strong>Simulación de Carga Pesada:</strong>
          <br />
          Se están procesando datos de polvo cósmico en el módulo marciano.
          <br />
          <em>
            (Observa la consola para ver cuándo se ejecuta el cálculo realmente)
          </em>
        </Typography>
      </CardHeader>
      <CardBody className="flex flex-col gap-4">
        <label htmlFor="iterationCount">Iteraciones del cálculo:</label>
        <Input
          type="number"
          value={tempIterationCount}
          onChange={handleTempCountChange}
          id="iterationCount"
        />
        <Button onClick={applyIterationCount}>Aplicar cambios</Button>
        <Button onClick={forceRerender}>Forzar re-render</Button>
      </CardBody>

      <CardFooter>
        <Typography variant="h3" color="amber">
          Resultado del cálculo
        </Typography>
        <p>
          Valor computado: <strong>{heavyCalculation}</strong>
        </p>
        <p>
          Contador de re-renders forzados: <strong>{forceRenderCount}</strong>
        </p>
      </CardFooter>
    </Card>
  );
}
