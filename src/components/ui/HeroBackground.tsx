import { useRef, useEffect } from "react";

interface Node {
  x: number;
  y: number;
  pulseOffset: number;
  pulseSpeed: number;
  isActive: boolean;
}

// mulberry32 - fast, high-quality 32-bit seeded PRNG
function mulberry32(seed: number): () => number {
  return function () {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const SEED = 42;

// Grid-jittered placement for even distribution
function generateNodes(
  width: number,
  height: number,
  count: number,
  rng: () => number
): Node[] {
  const nodes: Node[] = [];
  const cols = Math.ceil(Math.sqrt(count * (width / height)));
  const rows = Math.ceil(count / cols);
  const cellW = width / cols;
  const cellH = height / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (nodes.length >= count) break;
      nodes.push({
        x: (c + 0.1 + rng() * 0.8) * cellW,
        y: (r + 0.1 + rng() * 0.8) * cellH,
        pulseOffset: rng() * Math.PI * 2,
        pulseSpeed: 3 + rng(), // 3-4s cycle
        isActive: false,
      });
    }
  }

  // Mark 8-12 nodes as active using Fisher-Yates shuffle
  const activeCount = 8 + Math.floor(rng() * 5);
  const indices = nodes.map((_, i) => i);
  for (let i = indices.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1));
    [indices[i], indices[j]] = [indices[j], indices[i]];
  }
  for (let i = 0; i < Math.min(activeCount, nodes.length); i++) {
    nodes[indices[i]].isActive = true;
  }

  return nodes;
}

// Pre-compute nearest-neighbor connections
function computeConnections(
  nodes: Node[],
  maxConnections: number = 3
): Map<number, number[]> {
  const connections = new Map<number, number[]>();

  for (let i = 0; i < nodes.length; i++) {
    const distances: { index: number; dist: number }[] = [];
    for (let j = 0; j < nodes.length; j++) {
      if (i === j) continue;
      const dx = nodes[j].x - nodes[i].x;
      const dy = nodes[j].y - nodes[i].y;
      distances.push({ index: j, dist: Math.sqrt(dx * dx + dy * dy) });
    }
    distances.sort((a, b) => a.dist - b.dist);
    connections.set(
      i,
      distances.slice(0, maxConnections).map((d) => d.index)
    );
  }

  return connections;
}

// Compute trace brightness boost from active node pulse
function getTraceOpacity(
  nodeA: Node,
  nodeB: Node,
  time: number,
  baseOpacity: number
): number {
  let boost = 0;

  if (nodeA.isActive) {
    const phase = Math.sin(
      (time / 1000) * ((Math.PI * 2) / nodeA.pulseSpeed) + nodeA.pulseOffset
    );
    boost = Math.max(boost, ((phase + 1) / 2) * 0.07);
  }
  if (nodeB.isActive) {
    const phase = Math.sin(
      (time / 1000) * ((Math.PI * 2) / nodeB.pulseSpeed) + nodeB.pulseOffset
    );
    boost = Math.max(boost, ((phase + 1) / 2) * 0.07);
  }

  return baseOpacity + boost;
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

      // Seeded PRNG ensures same layout on every resize
      const rng = mulberry32(SEED);
      nodes = generateNodes(width, height, 60, rng);
      neighborMap = computeConnections(nodes, 3);
    };

    const drawGrid = (time: number) => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      ctx.clearRect(0, 0, width, height);

      // Layer 1: L-shaped traces
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const neighbors = neighborMap.get(i) || [];
        for (const ni of neighbors) {
          // Deduplicate: only draw when i < ni
          if (ni <= i) continue;

          const opacity = reducedMotion
            ? 0.1
            : getTraceOpacity(nodes[i], nodes[ni], time, 0.1);

          ctx.beginPath();
          ctx.strokeStyle = `rgba(51, 109, 147, ${opacity})`;
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[ni].x, nodes[i].y); // horizontal segment
          ctx.lineTo(nodes[ni].x, nodes[ni].y); // vertical segment
          ctx.stroke();
        }
      }

      // Layer 2: Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        let opacity: number;
        let radius: number;

        if (reducedMotion) {
          // Static nodes at 25% opacity
          opacity = 0.25;
          radius = 2;
        } else if (node.isActive) {
          const phase = Math.sin(
            (time / 1000) * ((Math.PI * 2) / node.pulseSpeed) +
              node.pulseOffset
          );
          // Map sin [-1, 1] to opacity [0.15, 0.40]
          opacity = 0.15 + ((phase + 1) / 2) * 0.25;
          // Map sin [-1, 1] to radius [2, 3.5]
          radius = 2 + ((phase + 1) / 2) * 1.5;
        } else {
          opacity = 0.15;
          radius = 2;
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(51, 109, 147, ${opacity})`;
        ctx.fill();
      }

      // Layer 3: Radial glow handled by CSS in HeroSection.astro
    };

    setupCanvas();

    if (reducedMotion) {
      // Draw static grid once, no animation loop
      drawGrid(0);
      return;
    }

    // Animation loop throttled to 30fps
    let lastFrameTime = 0;
    const frameInterval = 1000 / 30;

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
