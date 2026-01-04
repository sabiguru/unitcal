'use client';

import { useState, useRef, useEffect } from 'react';

export default function GraphingCalculator() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [equation, setEquation] = useState<string>('x^2');
  const [xMin, setXMin] = useState<number>(-10);
  const [xMax, setXMax] = useState<number>(10);
  const [yMin, setYMin] = useState<number>(-10);
  const [yMax, setYMax] = useState<number>(10);
  const [functions, setFunctions] = useState<string[]>(['x^2']);

  const evaluateFunction = (expr: string, x: number): number => {
    try {
      // Replace mathematical expressions with JavaScript equivalents
      let jsExpr = expr
        .replace(/\^/g, '**')
        .replace(/sin/g, 'Math.sin')
        .replace(/cos/g, 'Math.cos')
        .replace(/tan/g, 'Math.tan')
        .replace(/log/g, 'Math.log10')
        .replace(/ln/g, 'Math.log')
        .replace(/sqrt/g, 'Math.sqrt')
        .replace(/abs/g, 'Math.abs')
        .replace(/pi/g, 'Math.PI')
        .replace(/e(?!\d)/g, 'Math.E')
        .replace(/x/g, x.toString());
      
      return Function('"use strict"; return (' + jsExpr + ')')();
    } catch {
      return NaN;
    }
  };

  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    
    // Clear canvas
    ctx.clearRect(0, 0, width, height);
    
    // Set up coordinate system
    const xRange = xMax - xMin;
    const yRange = yMax - yMin;
    const xScale = width / xRange;
    const yScale = height / yRange;
    
    // Convert screen coordinates to graph coordinates
    const screenToGraph = (screenX: number, screenY: number) => ({
      x: xMin + (screenX / width) * xRange,
      y: yMax - (screenY / height) * yRange
    });
    
    // Convert graph coordinates to screen coordinates
    const graphToScreen = (graphX: number, graphY: number) => ({
      x: (graphX - xMin) * xScale,
      y: height - (graphY - yMin) * yScale
    });

    // Draw grid
    ctx.strokeStyle = '#e5e5e5';
    ctx.lineWidth = 1;
    
    // Vertical grid lines
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      const screenX = graphToScreen(x, 0).x;
      ctx.beginPath();
      ctx.moveTo(screenX, 0);
      ctx.lineTo(screenX, height);
      ctx.stroke();
    }
    
    // Horizontal grid lines
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      const screenY = graphToScreen(0, y).y;
      ctx.beginPath();
      ctx.moveTo(0, screenY);
      ctx.lineTo(width, screenY);
      ctx.stroke();
    }

    // Draw axes
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    
    // X-axis
    const xAxisY = graphToScreen(0, 0).y;
    if (xAxisY >= 0 && xAxisY <= height) {
      ctx.beginPath();
      ctx.moveTo(0, xAxisY);
      ctx.lineTo(width, xAxisY);
      ctx.stroke();
    }
    
    // Y-axis
    const yAxisX = graphToScreen(0, 0).x;
    if (yAxisX >= 0 && yAxisX <= width) {
      ctx.beginPath();
      ctx.moveTo(yAxisX, 0);
      ctx.lineTo(yAxisX, height);
      ctx.stroke();
    }

    // Draw axis labels
    ctx.fillStyle = '#000000';
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    
    // X-axis labels
    for (let x = Math.ceil(xMin); x <= Math.floor(xMax); x++) {
      if (x !== 0) {
        const screenPos = graphToScreen(x, 0);
        if (screenPos.x >= 0 && screenPos.x <= width) {
          ctx.fillText(x.toString(), screenPos.x, screenPos.y + 15);
        }
      }
    }
    
    // Y-axis labels
    ctx.textAlign = 'left';
    for (let y = Math.ceil(yMin); y <= Math.floor(yMax); y++) {
      if (y !== 0) {
        const screenPos = graphToScreen(0, y);
        if (screenPos.y >= 0 && screenPos.y <= height) {
          ctx.fillText(y.toString(), screenPos.x + 5, screenPos.y + 4);
        }
      }
    }

    // Draw functions
    const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
    
    functions.forEach((func, index) => {
      if (!func.trim()) return;
      
      ctx.strokeStyle = colors[index % colors.length];
      ctx.lineWidth = 2;
      ctx.beginPath();
      
      let firstPoint = true;
      const step = xRange / width;
      
      for (let screenX = 0; screenX <= width; screenX++) {
        const graphX = xMin + (screenX / width) * xRange;
        const graphY = evaluateFunction(func, graphX);
        
        if (!isNaN(graphY) && isFinite(graphY)) {
          const screenY = graphToScreen(graphX, graphY).y;
          
          if (screenY >= -50 && screenY <= height + 50) {
            if (firstPoint) {
              ctx.moveTo(screenX, screenY);
              firstPoint = false;
            } else {
              ctx.lineTo(screenX, screenY);
            }
          } else {
            firstPoint = true;
          }
        } else {
          firstPoint = true;
        }
      }
      
      ctx.stroke();
    });
  };

  useEffect(() => {
    drawGraph();
  }, [functions, xMin, xMax, yMin, yMax]);

  const addFunction = () => {
    if (functions.length < 5) {
      setFunctions([...functions, '']);
    }
  };

  const updateFunction = (index: number, value: string) => {
    const newFunctions = [...functions];
    newFunctions[index] = value;
    setFunctions(newFunctions);
  };

  const removeFunction = (index: number) => {
    if (functions.length > 1) {
      setFunctions(functions.filter((_, i) => i !== index));
    }
  };

  const resetView = () => {
    setXMin(-10);
    setXMax(10);
    setYMin(-10);
    setYMax(10);
  };

  return (
    <div className="mb-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">📈</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Graphing Calculator — Function Plotter & Graph Calculator</h1>
          <p className="text-gray-600">Plot functions and analyze mathematical relationships visually</p>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">

      {/* Graph Display */}
      <div className="mb-6">
        <canvas
          ref={canvasRef}
          width={600}
          height={400}
          className="w-full border border-gray-300 rounded-lg"
        />
      </div>
      
      {/* Controls */}
      <div className="space-y-4">
        {/* Functions */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">Functions</h3>
          <div className="space-y-2">
            {functions.map((func, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-4 h-4 rounded border-2"
                  style={{ backgroundColor: ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'][index % 5] }}
                ></div>
                <span className="text-sm font-medium">f{index + 1}(x) =</span>
                <input
                  type="text"
                  value={func}
                  onChange={(e) => updateFunction(index, e.target.value)}
                  placeholder="e.g., x^2, sin(x), 2*x+1"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {functions.length > 1 && (
                  <button
                    onClick={() => removeFunction(index)}
                    className="text-red-600 hover:text-red-800"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            {functions.length < 5 && (
              <button
                onClick={addFunction}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                + Add Function
              </button>
            )}
          </div>
        </div>

        {/* View Settings */}
        <div>
          <h3 className="text-lg font-medium text-gray-900 mb-3">View Range</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">X Min</label>
              <input
                type="number"
                value={xMin}
                onChange={(e) => setXMin(parseFloat(e.target.value) || -10)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">X Max</label>
              <input
                type="number"
                value={xMax}
                onChange={(e) => setXMax(parseFloat(e.target.value) || 10)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Y Min</label>
              <input
                type="number"
                value={yMin}
                onChange={(e) => setYMin(parseFloat(e.target.value) || -10)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Y Max</label>
              <input
                type="number"
                value={yMax}
                onChange={(e) => setYMax(parseFloat(e.target.value) || 10)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div className="flex space-x-4">
          <button
            onClick={drawGraph}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg font-medium transition-colors"
          >
            Plot Graph
          </button>
          <button
            onClick={resetView}
            className="bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-medium transition-colors"
          >
            Reset View
          </button>
        </div>
      </div>
      </div>
    </div>
  );
}