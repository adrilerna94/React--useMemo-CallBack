import { useState } from "react";

export default function MarsMissionFilter() {
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
}