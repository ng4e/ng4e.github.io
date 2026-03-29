import { useRef, useEffect } from "react";

interface Node {
  x: number;
  y: number;
  pulseOffset: number;
  pulseSpeed: number;
  isPulsing: boolean;
}

function generateHexGrid(width: number, height: number, cellSize: number): Node[] {
  const nodes: Node[] = [];
  const rowHeight = (cellSize * Math.sqrt(3)) / 2;

  for (let row = 0; row * rowHeight < height + cellSize; row++) {
    const offsetX = row % 2 === 0 ? 0 : cellSize / 2;
    for (let col = 0; col * cellSize < width + cellSize; col++) {
      nodes.push({
        x: col * cellSize + offsetX,
        y: row * rowHeight,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 3 + Math.random() * 2, // 3-5 second cycle
        isPulsing: false,
      });
    }
  }

  // Select 3-5 random nodes to pulse
  const pulseCount = 3 + Math.floor(Math.random() * 3);
  const shuffled = [...nodes].sort(() => Math.random() - 0.5);
  for (let i = 0; i < Math.min(pulseCount, shuffled.length); i++) {
    shuffled[i].isPulsing = true;
  }

  return nodes;
}

function getNeighbors(
  nodeIndex: number,
  nodes: Node[],
  cellSize: number
): number[] {
  const node = nodes[nodeIndex];
  const maxDist = cellSize * 1.2;
  const neighbors: number[] = [];

  for (let i = 0; i < nodes.length; i++) {
    if (i === nodeIndex) continue;
    const dx = nodes[i].x - node.x;
    const dy = nodes[i].y - node.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < maxDist) {
      neighbors.push(i);
    }
  }

  return neighbors;
}

export default function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number>(0);
  const resizeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let nodes: Node[] = [];
    let neighborMap: Map<number, number[]> = new Map();

    const setupCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      const cellSize = 50;
      nodes = generateHexGrid(width, height, cellSize);
      neighborMap = new Map();
      for (let i = 0; i < nodes.length; i++) {
        neighborMap.set(i, getNeighbors(i, nodes, cellSize));
      }
    };

    const drawGrid = (time: number) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      // Draw grid lines
      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        const neighbors = neighborMap.get(i) || [];
        for (const ni of neighbors) {
          if (ni > i) {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(58, 124, 165, 0.1)";
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[ni].x, nodes[ni].y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        let opacity = 0.15;
        let radius = 2;

        if (node.isPulsing && !reducedMotion) {
          const phase = Math.sin(
            (time / 1000) * ((Math.PI * 2) / node.pulseSpeed) + node.pulseOffset
          );
          // Map sin [-1, 1] to opacity [0.15, 0.4]
          opacity = 0.15 + ((phase + 1) / 2) * 0.25;
          radius = 2 + ((phase + 1) / 2) * 1.5;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(58, 124, 165, ${opacity})`;
        ctx.fill();
      }
    };

    setupCanvas();

    if (reducedMotion) {
      // Draw static grid once
      drawGrid(0);
      return;
    }

    // Animation loop throttled to 30fps
    let lastFrameTime = 0;
    const frameInterval = 1000 / 30; // ~33ms

    const loop = (time: number) => {
      if (time - lastFrameTime >= frameInterval) {
        lastFrameTime = time;
        drawGrid(time);
      }
      animFrameRef.current = requestAnimationFrame(loop);
    };

    animFrameRef.current = requestAnimationFrame(loop);

    // Debounced resize handler
    const handleResize = () => {
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
      resizeTimerRef.current = setTimeout(() => {
        setupCanvas();
        drawGrid(performance.now());
      }, 200);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
      if (resizeTimerRef.current) {
        clearTimeout(resizeTimerRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
