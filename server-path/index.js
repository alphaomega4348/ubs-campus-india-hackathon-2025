const inventory = 100;

const schools = [
  { name: 'A', demand: 50, needFactor: 2, location: [0, 0] },
  { name: 'B', demand: 40, needFactor: 3, location: [3, 4] },
  { name: 'C', demand: 30, needFactor: 5, location: [6, 8] },
];

const warehouse = { name: 'Warehouse', location: [0, 0] };


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

function primMST(nodes) {
  const n = nodes.length;
  const inMST = Array(n).fill(false);
  const key = Array(n).fill(Infinity);
  const parent = Array(n).fill(null);

  key[0] = 0; 

  for (let count = 0; count < n - 1; count++) {
    let u = -1;
    for (let i = 0; i < n; i++) {
      if (!inMST[i] && (u === -1 || key[i] < key[u])) {
        u = i;
      }
    }

    inMST[u] = true;

    for (let v = 0; v < n; v++) {
      if (!inMST[v]) {
        const d = distance(nodes[u].location, nodes[v].location);
        if (d < key[v]) {
          key[v] = d;
          parent[v] = u;
        }
      }
    }
  }

  const edges = [];
  for (let i = 1; i < n; i++) {
    edges.push({
      from: nodes[parent[i]].name,
      to: nodes[i].name,
      cost: distance(nodes[parent[i]].location, nodes[i].location).toFixed(2)
    });
  }

  return edges;
}


const allocatedSchools = allocateBooks(schools, inventory);
console.log("\n📦 Book Allocation:");
allocatedSchools.forEach(s => {
  console.log(`${s.name}: Allocated ${s.allocated} (Demand: ${s.demand}, Need: ${s.needFactor})`);
});


const deliveryNodes = [warehouse, ...allocatedSchools];
const mstEdges = primMST(deliveryNodes);

console.log("\n🚚 Optimized Delivery Path (MST):");
mstEdges.forEach(edge => {
  console.log(`${edge.from} → ${edge.to} (Cost: ${edge.cost})`);
});
