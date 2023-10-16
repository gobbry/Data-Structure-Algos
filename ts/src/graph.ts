type WeightedAdjacencyMatrix = number[][];
type GraphEdge = { to: number; weight: number };
type WeightedAdjacencyList = GraphEdge[][];

export function BFSOnAdjMatrix(
  graph: WeightedAdjacencyMatrix,
  source: number,
  target: number
): number[] | null {
  const visited = new Array(graph.length).fill(false);
  const prev = new Array(graph.length).fill(-1);
  const queue: number[] = [source];

  visited[source] = true;
  while (queue.length) {
    const curr = queue.shift() as number;
    if (curr === target) break;

    for (let i = 0; i < graph.length; ++i) {
      if (graph[curr][i] === 0) continue;
      if (visited[i]) continue;

      queue.push(i);
      visited[i] = true;
      prev[i] = curr;
    }
  }
  if (prev[target] === -1) return null;

  const result: number[] = [];
  let curr = target;
  while (prev[curr] != -1) {
    result.push(curr);
    curr = prev[curr];
  }
  result.push(source);

  return result.reverse();
}

export function DFSOnAdjList(
  graph: WeightedAdjacencyList,
  source: number,
  target: number
): number[] | null {
  const visited = new Array(graph.length).fill(false);
  const path: number[] = [];

  DFSWalkAdjList(graph, source, target, visited, path);

  if (path.length === 0) return null;

  return path;
}

function DFSWalkAdjList(
  graph: WeightedAdjacencyList,
  curr: number,
  target: number,
  visited: boolean[],
  path: number[]
): boolean {
  if (visited[curr]) return false;

  visited[curr] = true;
  if (curr === target) {
    path.push(curr);
    return true;
  }

  const adjs = graph[curr];
  for (let i = 0; i < adjs.length; ++i) {
    const edge = adjs[i];

    if (DFSWalkAdjList(graph, edge.to, target, visited, path)) return true;
  }

  path.pop();

  return false;
}

export function DijkstraList(
  graph: WeightedAdjacencyList,
  source: number,
  target: number
): number[] {
  return [];
}

//use minHeap instead for getLowest and hasUnvisited to reduce complexity from O(V^2 + E) to O((V+E)logV)
export function DijkstraListSlow(
  graph: WeightedAdjacencyList,
  source: number,
  target: number
): number[] {
  const prev = new Array(graph.length).fill(-1);
  const visited = new Array(graph.length).fill(false);
  const dists = new Array(graph.length).fill(Infinity);

  dists[source] = 0;
  while (hasUnvisited(visited, dists)) {
    const lowest = getLowestUnvisited(visited, dists);
    visited[lowest] = true;

    const adjs = graph[lowest];
    for (let i = 0; i < adjs.length; ++i) {
      const edge = adjs[i];
      if (visited[edge.to]) continue;

      const dist = dists[lowest] + edge.weight;
      if (dist < dists[edge.to]) {
        dists[edge.to] = dist;
        prev[edge.to] = lowest;
      }
    }
  }

  if (prev[target] === -1) return [];

  const result: number[] = [];
  let curr = target;

  while (prev[curr] !== -1) {
    result.push(curr);
    curr = prev[curr];
  }
  result.push(source);

  return result.reverse();
}

function hasUnvisited(visited: boolean[], dists: number[]): boolean {
  return visited.some((visit, idx) => !visit && dists[idx] < Infinity);
}

function getLowestUnvisited(visited: boolean[], dists: number[]): number {
  let idx = -1;
  let lowestDistance = Infinity;
  for (let i = 0; i < visited.length; ++i) {
    if (visited[i]) continue;

    if (lowestDistance > dists[i]) {
      idx = i;
      lowestDistance = dists[i];
    }
  }

  return idx;
}
