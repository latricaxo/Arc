import React, { useState, useEffect, useRef } from 'react';
import { GalaxyNode } from '../types';
import { MOCK_GALAXY_NODES } from '../data/mockData';
import { Sparkles, Zap, Search, RefreshCw, ZoomIn, ZoomOut, Layers, Compass, User, MessageSquare, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface GalaxyViewProps {
  onZapNode: (nodeId: string, sats: number) => void;
  onOpenAI: () => void;
}

export const GalaxyView: React.FC<GalaxyViewProps> = ({ onZapNode, onOpenAI }) => {
  const [nodes, setNodes] = useState<GalaxyNode[]>(MOCK_GALAXY_NODES);
  const [selectedNode, setSelectedNode] = useState<GalaxyNode | null>(MOCK_GALAXY_NODES[0]);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered nodes
  const filteredNodes = nodes.filter((n) => {
    const matchesType = filterType === 'all' || n.type === filterType;
    const matchesQuery = n.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         n.details.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  // Canvas interactive rendering for galaxy connected graph
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      angle += 0.002;

      const width = canvas.width;
      const height = canvas.height;

      // Draw starry background particles
      for (let i = 0; i < 60; i++) {
        const starX = (Math.sin(i * 99 + angle) * 0.5 + 0.5) * width;
        const starY = (Math.cos(i * 33 + angle) * 0.5 + 0.5) * height;
        const starOpacity = (Math.sin(angle * 3 + i) * 0.5 + 0.5) * 0.5 + 0.2;
        ctx.fillStyle = `rgba(255, 255, 255, ${starOpacity})`;
        ctx.fillRect(starX, starY, 1.5, 1.5);
      }

      // Draw connecting lines between nodes
      filteredNodes.forEach((node) => {
        const x1 = (node.x / 100) * width;
        const y1 = (node.y / 100) * height;

        node.connections.forEach((connId) => {
          const target = filteredNodes.find((n) => n.id === connId);
          if (target) {
            const x2 = (target.x / 100) * width;
            const y2 = (target.y / 100) * height;

            // Gradient line
            const grad = ctx.createLinearGradient(x1, y1, x2, y2);
            grad.addColorStop(0, node.color + '66');
            grad.addColorStop(1, target.color + '66');

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = grad;
            ctx.lineWidth = selectedNode?.id === node.id || selectedNode?.id === target.id ? 2.5 : 1;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            // Animated pulsing light particle moving along connection line
            const progress = (Math.sin(angle * 2 + node.x) + 1) / 2;
            const px = x1 + (x2 - x1) * progress;
            const py = y1 + (y2 - y1) * progress;

            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = '#FFD166';
            ctx.fill();
          }
        });
      });

      // Draw Nodes
      filteredNodes.forEach((node) => {
        const nx = (node.x / 100) * width;
        const ny = (node.y / 100) * height;
        const radius = (node.size / 2) * zoomLevel;
        const isSelected = selectedNode?.id === node.id;

        // Glow ring for selected or central node
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(nx, ny, radius + 10, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(247, 147, 26, 0.2)';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(nx, ny, radius + 6, 0, Math.PI * 2);
          ctx.strokeStyle = '#F7931A';
          ctx.lineWidth = 2;
          ctx.stroke();
        }

        // Main Node Fill
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowColor = node.color;
        ctx.shadowBlur = isSelected ? 20 : 10;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Label
        ctx.font = isSelected ? 'bold 13px system-ui' : '11px system-ui';
        ctx.fillStyle = isSelected ? '#FFFFFF' : '#A1A1AA';
        ctx.textAlign = 'center';
        ctx.fillText(node.label, nx, ny + radius + 16);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [filteredNodes, selectedNode, zoomLevel]);

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = canvasRef.current.parentElement?.clientWidth || 800;
        canvasRef.current.height = canvasRef.current.parentElement?.clientHeight || 600;
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle click on node in graph
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const width = canvas.width;
    const height = canvas.height;

    // Find clicked node
    const found = filteredNodes.find((n) => {
      const nx = (n.x / 100) * width;
      const ny = (n.y / 100) * height;
      const dist = Math.hypot(clickX - nx, clickY - ny);
      return dist <= n.size;
    });

    if (found) {
      setSelectedNode(found);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-6 md:py-8 space-y-6">
      
      {/* Title Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#F7931A]/10 border border-[#F7931A]/30 text-[#F7931A] text-xs font-mono">
            <Globe className="w-3.5 h-3.5 animate-spin-slow" />
            <span>CORE FEATURE #2 • CONVERSATION GALAXY</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white mt-1">
            Knowledge <span className="text-gradient-btc">Galaxy Map</span>
          </h1>
          <p className="text-zinc-400 text-sm">
            Explore how Nostr concepts, authors, threads, and Bitcoin liquidity connect in real time.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {['all', 'concept', 'person', 'topic'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-medium capitalize transition-all ${
                filterType === type
                  ? 'bg-[#F7931A] text-black font-bold shadow-[0_0_15px_rgba(247,147,26,0.4)]'
                  : 'bg-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Main Galaxy Interactive Stage */}
      <div className="relative w-full h-[550px] md:h-[650px] glass-panel rounded-3xl overflow-hidden border border-white/10 flex flex-col md:flex-row shadow-2xl">
        
        {/* Canvas Background Interactive Map */}
        <div className="relative flex-1 h-full bg-[#050505]">
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full cursor-pointer"
          />

          {/* Map Controls */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-20">
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 0.2, 2))}
              className="p-2.5 rounded-full glass-card hover:bg-white/10 text-white border border-white/10"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 0.2, 0.6))}
              className="p-2.5 rounded-full glass-card hover:bg-white/10 text-white border border-white/10"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
          </div>

          {/* Top Search Overlay */}
          <div className="absolute top-4 right-4 z-20 w-64 hidden sm:block">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-zinc-400" />
              <input
                type="text"
                placeholder="Search nodes in galaxy..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/60 backdrop-blur-md border border-white/15 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#F7931A]"
              />
            </div>
          </div>
        </div>

        {/* Right Info Drawer for Selected Node */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            key={selectedNode.id}
            className="w-full md:w-80 glass-panel border-t md:border-t-0 md:border-l border-white/10 p-6 flex flex-col justify-between space-y-4 bg-[#111111]/90 backdrop-blur-xl z-20"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-[11px] font-mono font-bold uppercase" style={{ backgroundColor: selectedNode.color + '22', color: selectedNode.color }}>
                  {selectedNode.type} Node
                </span>
                <button
                  onClick={() => setSelectedNode(null)}
                  className="text-zinc-500 hover:text-white text-xs"
                >
                  Close
                </button>
              </div>

              <h3 className="text-xl font-bold text-white leading-tight">{selectedNode.label}</h3>

              <p className="text-zinc-300 text-xs leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
                {selectedNode.details}
              </p>

              {selectedNode.zaps && (
                <div className="flex items-center justify-between p-3 rounded-xl bg-[#F7931A]/10 border border-[#F7931A]/30">
                  <span className="text-xs text-zinc-400">Node Liquidity</span>
                  <span className="text-xs font-mono font-bold text-[#F7931A] flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5 fill-[#F7931A]" />
                    {selectedNode.zaps.toLocaleString()} sats
                  </span>
                </div>
              )}

              {/* Connected Nodes List */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Connected Orbits ({selectedNode.connections.length})</span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedNode.connections.map((connId) => {
                    const connNode = nodes.find((n) => n.id === connId);
                    if (!connNode) return null;
                    return (
                      <button
                        key={connId}
                        onClick={() => setSelectedNode(connNode)}
                        className="px-2.5 py-1 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-zinc-300 hover:text-white text-[11px] transition-all"
                      >
                        {connNode.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => onZapNode(selectedNode.id, 1000)}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-gradient-to-r from-[#F7931A] to-[#FFD166] text-black font-bold text-xs glow-btc hover:scale-102 transition-transform"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>Zap Node +1,000 sats</span>
              </button>

              <button
                onClick={onOpenAI}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-full glass-card hover:bg-white/10 text-amber-300 border border-amber-500/20 text-xs font-medium"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Synthesize Node with AI</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
