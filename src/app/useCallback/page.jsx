'use client';

import React, { useState, useCallback } from 'react';
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
} from '@/components/ui';
import MissionActions from './components/MissionActions';

export default function MarsMissionUseCallback() {
  // Estado para contar los lanzamientos del cohete.
  const [launchCount, setLaunchCount] = useState(0);

  /**
   * Estado "irrelevante" para forzar re-renders del componente padre,
   * sin que realmente afecte al lanzamiento.
   */
  const [missionNote, setMissionNote] = useState('');

  // Función sin useCallback (PRUEBA 1):
  // const handleLaunchRocket = () => {
  //   setLaunchCount((prev) => prev + 1);
  // };

  /* Función con useCallback (PRUEBA 2):
   *    Se memoiza de modo que no cambie en cada render,
   *    solo cuando 'setLaunchCount' cambie. Esto evita
   *    que se le pase una nueva referencia a <MissionActions /> cada vez.
   */
  const handleLaunchRocket = useCallback(() => {
    setLaunchCount((prev) => prev + 1);
  }, [setLaunchCount]);

  return (
    <Card className="w-fit mx-auto p-4 my-4">
      <CardHeader className="bg-gray-900 p-4 m-1">
        <Typography variant="h2" color="amber">
          Misión: Red Planet - useCallback Demo
        </Typography>
      </CardHeader>
      <Typography>
        <strong>Lanzamientos realizados:</strong> {launchCount}
      </Typography>

      <CardBody className="flex flex-col gap-4">
        <label htmlFor="missionNote">Notas de la misión:</label>
        <Input
          id="missionNote"
          type="text"
          placeholder="Escribe algo..."
          value={missionNote}
          onChange={(e) => setMissionNote(e.target.value)}
        />
      </CardBody>

      <CardFooter>
        <MissionActions onLaunch={handleLaunchRocket} />
      </CardFooter>
    </Card>
  );
}
