import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker, Polyline } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = 'AIzaSyCliTDgdPUC04xTYS6RDXsbbKIYR5Ir5W0'; 

const BookAllocationTSP = () => {
  const inventory = 100;

  const initialSchools = [
    { name: 'Don Bosco High School', demand: 45, needFactor: 2, location: [18.552789, 73.893750] },
    { name: 'St. Vincent\'s High School', demand: 40, needFactor: 3, location: [18.518344, 73.855417] },
    { name: 'Loyola High School & Junior College', demand: 55, needFactor: 5, location: [18.537778, 73.820278] },
    { name: 'Chanakya Junior College', demand: 30, needFactor: 4, location: [18.511143, 73.683479] },
    { name: 'Pimpri Chinchwad College of Engineering', demand: 60, needFactor: 2, location: [18.651674, 73.761536] },
    { name: 'MIT Vishwashanti Gurukul', demand: 35, needFactor: 3, location: [18.515000, 73.925000] },
    { name: 'Podar International School, Talegaon', demand: 50, needFactor: 2, location: [18.735700, 73.675500] },
    { name: 'Savitribai Phule Pune University', demand: 42, needFactor: 4, location: [18.554499, 73.825729] },
    { name: 'Walnut School, Shivane', demand: 38, needFactor: 3, location: [18.465775, 73.782887] },
    { name: 'SB Patil College of Engineering', demand: 48, needFactor: 3, location: [18.147085, 74.777115] },
  ];
  

  const warehouse = { name: 'Warehouse', location: [18.5668967, 73.9071862] }; // Viman Nagar

  const [allocations, setAllocations] = useState([]);
  const [tspPath, setTspPath] = useState([]);

  useEffect(() => {
    const allocatedSchools = allocateBooks([...initialSchools], inventory);
    setAllocations(allocatedSchools);

    const deliveryNodes = [warehouse, ...allocatedSchools];
    const tspResult = solveTSP(deliveryNodes);
    setTspPath(tspResult);
  }, []);

  function allocateBooks(schools, totalInventory) {
    let totalEffectiveDemand = 0;
    schools.forEach(school => {
      school.effectiveDemand = school.demand * school.needFactor;
      totalEffectiveDemand += school.effectiveDemand;
    });

    let allocatedTotal = 0;
    schools.forEach(school => {
      school.allocated = Math.floor((school.effectiveDemand / totalEffectiveDemand) * totalInventory);
      allocatedTotal += school.allocated;
    });

    const remaining = totalInventory - allocatedTotal;
    const remainders = schools.map(s => ({
      name: s.name,
      remainder: ((s.effectiveDemand / totalEffectiveDemand) * totalInventory) % 1,
      school: s
    })).sort((a, b) => b.remainder - a.remainder);

    for (let i = 0; i < remaining; i++) {
      remainders[i].school.allocated += 1;
    }

    return schools;
  }

  function distance(a, b) {
    const dx = a[0] - b[0];
    const dy = a[1] - b[1];
    return Math.sqrt(dx * dx + dy * dy);
  }

  function solveTSP(nodes) {
    const n = nodes.length;
    const dist = Array.from({ length: n }, (_, i) =>
      Array.from({ length: n }, (_, j) => distance(nodes[i].location, nodes[j].location))
    );

    const memo = {};
    const VISITED_ALL = (1 << n) - 1;

    function tsp(mask, pos) {
      if (mask === VISITED_ALL) return dist[pos][0];

      const key = `${mask}-${pos}`;
      if (memo[key] !== undefined) return memo[key];

      let min = Infinity;
      for (let city = 0; city < n; city++) {
        if ((mask & (1 << city)) === 0) {
          const newCost = dist[pos][city] + tsp(mask | (1 << city), city);
          min = Math.min(min, newCost);
        }
      }

      memo[key] = min;
      return min;
    }

    function getPath() {
      const path = [];
      let mask = 1, pos = 0;

      while (mask !== VISITED_ALL) {
        let next = -1;
        let min = Infinity;

        for (let city = 0; city < n; city++) {
          if ((mask & (1 << city)) === 0) {
            const nextMask = mask | (1 << city);
            const key = `${nextMask}-${city}`;
            const distToNext = dist[pos][city];
            const remainingCost = memo[key] ?? tsp(nextMask, city);
            const totalCost = distToNext + remainingCost;

            if (totalCost < min) {
              min = totalCost;
              next = city;
            }
          }
        }

        if (next === -1) break;

        path.push({ from: nodes[pos].name, to: nodes[next].name, coords: nodes[next].location });
        mask |= 1 << next;
        pos = next;
      }

      // Return to warehouse
      path.push({ from: nodes[pos].name, to: nodes[0].name, coords: nodes[0].location });
      return [nodes[0].location, ...path.map(p => p.coords)];
    }

    tsp(1, 0);
    return getPath();
  }

  const containerStyle = {
    width: '100%',
    height: '500px'
  };

  const center = { lat: 28.6, lng: 77.2 };

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px' }}>
      <h2>📦 Book Allocation</h2>
      <ul>
        {allocations.map(s => (
          <li key={s.name}>
            <strong>{s.name}</strong>: Allocated {s.allocated} (Demand: {s.demand}, Need: {s.needFactor})
          </li>
        ))}
      </ul>

      <h2>🗺️ Delivery Route (TSP on Google Maps)</h2>
      <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={6}>
          {/* Markers */}
          {[warehouse, ...allocations].map((loc, idx) => (
            <Marker
              key={idx}
              position={{ lat: loc.location[0], lng: loc.location[1] }}
              label={loc.name}
            />
          ))}

          {/* TSP Path */}
          {tspPath.length > 0 && (
            <Polyline
              path={tspPath.map(coord => ({ lat: coord[0], lng: coord[1] }))}
              options={{ strokeColor: '#FF0000', strokeOpacity: 0.8, strokeWeight: 2 }}
            />
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default BookAllocationTSP;