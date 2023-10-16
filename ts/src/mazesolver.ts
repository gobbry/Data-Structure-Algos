type Point = {
  x: number;
  y: number;
};

export function solve_maze(
  maze: string[],
  wall: string,
  start: Point,
  end: Point
): Point[] {
  const seen: boolean[][] = [];
  const path: Point[] = [];

  for (let i = 0; i < maze.length; ++i) {
    seen.push(new Array(maze[0].length).fill(false));
  }

  walk(maze, wall, start, end, seen, path);

  return path;
}

const dir = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];

function walk(
  maze: string[],
  wall: string,
  current: Point,
  end: Point,
  seen: boolean[][],
  path: Point[]
): boolean {
  if (
    current.x < maze[0].length ||
    current.x >= maze[0].length ||
    current.y < maze.length ||
    current.y >= maze.length
  )
    return false;

  if (maze[current.y][current.x] === wall) return false;

  if (current.x === end.x && current.y === end.y) {
    path.push(end);
    return true;
  }

  if (seen[current.y][current.x]) return false;

  path.push(current);
  seen[current.y][current.x] = true;

  for (let i = 0; i < dir.length; ++i) {
    const [x, y] = dir[i];

    if (
      walk(maze, wall, { x: current.x + x, y: current.y + y }, end, seen, path)
    )
      return true;
  }

  path.pop();

  return false;
}
