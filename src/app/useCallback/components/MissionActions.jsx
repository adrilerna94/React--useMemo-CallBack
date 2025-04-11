'use client';

import React from 'react';
import { Button } from '@/components/ui';

/**
 * 1. Componente hijo "MissionActions", memoizado con React.memo.
 * 2. Si la prop "onLaunch" cambia en cada render del padre, este hijo se renderizará de nuevo.
 * 3. Gracias a useCallback, se mantiene la misma referencia a la función, evitando re-renders.
 */
export default React.memo(function MissionActions({ onLaunch }) {
  console.log('🔄 Renderizando <MissionActions />');
  return (
    <div>
      <Button onClick={onLaunch}>Lanzar Cohete</Button>
    </div>
  );
});
