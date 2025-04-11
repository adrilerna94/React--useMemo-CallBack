import Link from 'next/link';
import Image from 'next/image';
import { Typography, List, ListItem } from '@/components/ui';

export default function Home() {
  return (
    <main className="p-8 flex flex-col gap-10">
      <Typography variant="h1" color="amber" className="font-bold text-center">
        Mission: Red Planet
      </Typography>
      <Image
        src="/images/Mission-RedPlanet_cover.webp"
        alt="Base en Marte"
        width={600}
        height={400}
        className="mx-auto"
      />
      <List className="flex flex-col gap-4 justify-center items-center">
        <ListItem>
          <Link href="/useMemo">useMemo</Link>
        </ListItem>
        <ListItem>
          <Link href="/useCallback">useCallback</Link>
        </ListItem>
      </List>
    </main>
  );
}
