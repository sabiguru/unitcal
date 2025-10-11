'use client';

import { useState, useRef, useEffect } from 'react';

interface BeadState {
  upper: boolean[];  // Upper beads (representing 5s) - only for Asian abacuses
  lower: boolean[];  // Lower beads (representing 1s) or all beads for Western
}

type AbacusType = 'suanpan' | 'soroban' | 'western';

interface AbacusCalculatorProps {
  type?: AbacusType;
}

export default function AbacusCalculator({ type }: AbacusCalculatorProps = {}) {
  const [abacusType, setAbacusType] = useState<AbacusType>(type || 'suanpan');
  const [showLabels, setShowLabels] = useState(true);
  
  // Initialize abacus state based on type
  const initializeAbacus = (type: AbacusType): BeadState[] => {
    const rodCount = type === 'western' ? 10 : 15; // 10 rows for Western, 15 rods for Asian
    
    if (type === 'western') {
      // Western counting frame: 10 rows, each with 10 beads, no upper/lower division
      return Array.from({ length: rodCount }, () => ({
        upper: [], // No upper beads in Western style
        lower: Array.from({ length: 10 }, () => false) // 10 beads per row
      }));
    } else {
      // Asian abacuses: vertical rods with upper/lower division
      return Array.from({ length: rodCount }, () => ({
        upper: type === 'suanpan' ? [false, false] : [false], // 2 upper for suanpan, 1 for soroban
        lower: type === 'suanpan' ? [false, false, false, false, false] : [false, false, false, false] // 5 lower for suanpan, 4 for soroban
      }));
    }
  };

  const [beads, setBeads] = useState<BeadState[]>(() => initializeAbacus(type || 'suanpan'));
  const [isDragging, setIsDragging] = useState<{active: boolean, row?: number}>({active: false});
  const [hoveredBead, setHoveredBead] = useState<{rowIndex: number, beadIndex: number} | null>(null);
  const abacusRef = useRef<HTMLDivElement>(null);

  // Place value labels
  const getPlaceLabels = () => {
    if (abacusType === 'western') {
      return ['Billions', 'Hundred Millions', 'Ten Millions', 'Millions', 'Hundred Thousands', 'Ten Thousands', 'Thousands', 'Hundreds', 'Tens', 'Ones'];
    } else {
      const labels = ['Ones', 'Tens', 'Hundreds', 'Thousands', 'Ten Thousands', 'Hundred Thousands', 'Millions', 'Ten Millions', 'Hundred Millions', 'Billions', 'Ten Billions', 'Hundred Billions', 'Trillions', 'Ten Trillions', 'Hundred Trillions'];
      return labels.slice(0, beads.length).reverse(); // Reverse for right-to-left reading
    }
  };

  // Calculate current value
  const getCurrentValue = (): number => {
    let total = 0;
    
    if (abacusType === 'western') {
      // Western counting frame: each row represents a power of 10
      beads.forEach((row, rowIndex) => {
        const place = beads.length - 1 - rowIndex; // Top row is highest place value
        const multiplier = Math.pow(10, place);
        const activeBeads = row.lower.filter(bead => bead).length;
        total += activeBeads * multiplier;
      });
    } else {
      // Asian abacuses: traditional upper/lower bead calculation
      beads.forEach((rod, rodIndex) => {
        const place = beads.length - 1 - rodIndex; // Right-most is ones place
        const multiplier = Math.pow(10, place);
        
        // Count upper beads (5s)
        const upperValue = rod.upper.filter(bead => bead).length * 5;
        
        // Count lower beads (1s)
        const lowerValue = rod.lower.filter(bead => bead).length;
        
        total += (upperValue + lowerValue) * multiplier;
      });
    }
    
    return total;
  };

  // Toggle bead state
  const toggleBead = (rodIndex: number, section: 'upper' | 'lower', beadIndex: number) => {
    setBeads(prev => {
      const newBeads = [...prev];
      const rod = { ...newBeads[rodIndex] };
      
      if (abacusType === 'western') {
        // Western counting frame: sliding bead behavior
        const newLower = [...rod.lower];
        const clickedActive = newLower[beadIndex];
        
        if (clickedActive) {
          // If clicking an active (right side) bead, slide it and all beads to its right back to left
          for (let i = beadIndex; i < newLower.length; i++) {
            newLower[i] = false;
          }
        } else {
          // If clicking an inactive (left side) bead, slide it and all beads to its right to the right side
          for (let i = beadIndex; i < newLower.length; i++) {
            newLower[i] = true;
          }
        }
        
        rod.lower = newLower;
      } else {
        // Asian abacuses: traditional bead behavior
        if (section === 'upper') {
          const newUpper = [...rod.upper];
          
          if (abacusType === 'suanpan') {
            // Chinese suanpan: toggle individual upper beads
            newUpper[beadIndex] = !newUpper[beadIndex];
          } else {
            // Japanese soroban: only one upper bead, so toggle it
            newUpper[0] = !newUpper[0];
          }
          
          rod.upper = newUpper;
        } else {
          const newLower = [...rod.lower];
          
          // For lower beads, we want to set a continuous count
          // If clicking on bead N, set beads 0 to N as active, rest as inactive
          const clickedActive = !newLower[beadIndex];
          
          if (clickedActive) {
            // Activate beads from 0 to beadIndex
            for (let i = 0; i <= beadIndex; i++) {
              newLower[i] = true;
            }
            for (let i = beadIndex + 1; i < newLower.length; i++) {
              newLower[i] = false;
            }
          } else {
            // If clicking an active bead, deactivate it and all above
            for (let i = beadIndex; i < newLower.length; i++) {
              newLower[i] = false;
            }
          }
          
          rod.lower = newLower;
        }
      }
      
      newBeads[rodIndex] = rod;
      return newBeads;
    });
  };

  // Reset all beads
  const resetAbacus = () => {
    setBeads(initializeAbacus(abacusType));
  };

  // Set a specific number
  const setNumber = (num: number) => {
    if (abacusType === 'western') {
      // Western counting frame: set beads based on digits
      const numStr = num.toString().padStart(beads.length, '0');
      const newBeads = beads.map((_, rowIndex) => {
        const digit = parseInt(numStr[rowIndex]);
        return {
          upper: [],
          lower: Array.from({ length: 10 }, (_, i) => i < digit)
        };
      });
      setBeads(newBeads);
    } else {
      // Asian abacuses: traditional upper/lower bead setting
      const numStr = num.toString().padStart(beads.length, '0');
      const newBeads = beads.map((_, rodIndex) => {
        const digit = parseInt(numStr[rodIndex]);
        const upperCount = Math.floor(digit / 5);
        const lowerCount = digit % 5;
        
        return {
          upper: abacusType === 'suanpan' 
            ? [upperCount >= 1, upperCount >= 2]
            : [upperCount >= 1],
          lower: Array.from({ length: abacusType === 'suanpan' ? 5 : 4 }, (_, i) => i < lowerCount)
        };
      });
      setBeads(newBeads);
    }
  };

  // Handle abacus type change
  useEffect(() => {
    setBeads(initializeAbacus(abacusType));
  }, [abacusType]);

  // Handle touch events for mobile
  const handleTouchStart = (e: React.TouchEvent, rodIndex: number, section: 'upper' | 'lower', beadIndex: number) => {
    e.preventDefault();
    toggleBead(rodIndex, section, beadIndex);
    setIsDragging({active: true, row: rodIndex});
  };

  const handleMouseDown = (rodIndex: number, section: 'upper' | 'lower', beadIndex: number) => {
    // Only for Asian abacuses now - Western has its own implementation
    if (abacusType !== 'western') {
      toggleBead(rodIndex, section, beadIndex);
      setIsDragging({active: true, row: rodIndex});
    }
  };

  const handleMouseEnter = (rodIndex: number, section: 'upper' | 'lower', beadIndex: number) => {
    if (isDragging.active && abacusType !== 'western') {
      // For Asian abacuses only - allow cross-rod dragging
      toggleBead(rodIndex, section, beadIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging({active: false});
  };

  const handleTouchEnd = () => {
    setIsDragging({active: false});
  };

  // Western abacus click handlers
  const handleWesternBeadClick = (rowIndex: number, beadIndex: number) => {
    const currentBeadCount = beads[rowIndex].lower.filter(bead => bead).length;
    
    if (beadIndex < currentBeadCount) {
      // Clicked on an ACTIVE bead (right side)
      // Slide this bead and all beads to its right back to the left
      const newBeadCount = beadIndex;
      setBeads(prev => {
        const newBeads = [...prev];
        newBeads[rowIndex] = {
          ...newBeads[rowIndex],
          lower: Array.from({ length: 10 }, (_, i) => i < newBeadCount)
        };
        return newBeads;
      });
    } else {
      // Clicked on an INACTIVE bead (left side)
      // Only slide beads from the RIGHT edge (10-1 down to beadIndex) to active
      const beadsToMove = 10 - beadIndex;
      const newBeadCount = currentBeadCount + beadsToMove;
      setBeads(prev => {
        const newBeads = [...prev];
        newBeads[rowIndex] = {
          ...newBeads[rowIndex],
          lower: Array.from({ length: 10 }, (_, i) => i < newBeadCount)
        };
        return newBeads;
      });
    }
  };

  // Helper function to determine which beads will move together
  const getBeadHierarchy = (rowIndex: number, hoveredBeadIndex: number | null) => {
    if (hoveredBeadIndex === null) return [];
    
    const currentBeadCount = beads[rowIndex].lower.filter(bead => bead).length;
    const willMove: number[] = [];
    
    if (hoveredBeadIndex < currentBeadCount) {
      // Hovering over an ACTIVE bead (right side)
      // Will move this bead and all beads to its right back to left
      for (let i = hoveredBeadIndex; i < currentBeadCount; i++) {
        willMove.push(i);
      }
    } else {
      // Hovering over an INACTIVE bead (left side)
      // Will move this bead and all beads to its right to the right side
      for (let i = hoveredBeadIndex; i < 10; i++) {
        willMove.push(i);
      }
    }
    
    return willMove;
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => setIsDragging({active: false});
    const handleGlobalTouchEnd = () => setIsDragging({active: false});
    
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('touchend', handleGlobalTouchEnd);
    
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, []);

  // Render Western counting frame
  const renderWesternAbacus = () => {
    return (
      <div 
        ref={abacusRef}
        className="relative bg-gradient-to-b from-slate-800 to-slate-900 p-2 sm:p-4 lg:p-8 rounded-2xl shadow-2xl border-4 sm:border-8 border-slate-700 overflow-x-auto"
      >
        {/* Frame decoration */}
        <div className="absolute inset-2 rounded-xl bg-gradient-to-b from-slate-100 to-slate-50 shadow-inner"></div>

        {/* Abacus content */}
        <div className="relative z-10 space-y-3 sm:space-y-6 min-w-[600px] sm:min-w-0">
          {beads.map((row, rowIndex) => {
            const activeBeadCount = row.lower.filter(bead => bead).length;
            
            return (
              <div key={`western-row-${rowIndex}`} className="flex items-center">
                {/* Row label */}
                {showLabels && (
                  <div className="w-20 sm:w-32 text-xs sm:text-sm font-semibold text-slate-800 text-right mr-2 sm:mr-4 flex-shrink-0">
                    {getPlaceLabels()[rowIndex]}
                  </div>
                )}
                
                {/* Rod area with individual clickable beads */}
                <div 
                  className="flex-1 relative bg-slate-700 h-3 rounded-full shadow-inner min-h-[3rem] sm:min-h-[4rem] flex items-center"
                  data-western-row={rowIndex}
                >
                  {/* Rod line */}
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full h-1 bg-slate-600 rounded-full"></div>
                  </div>
                  
                  {/* Center divider */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-12 bg-slate-900 rounded-full z-10"></div>
                  
                  {/* Left side beads (uncounted) */}
                  <div className="absolute left-2 sm:left-4 flex items-center space-x-1 sm:space-x-2">
                    {row.lower.map((isActive, beadIndex) => {
                      // Only render beads that are NOT active (uncounted)
                      if (isActive) return null;
                      
                      const willMove = hoveredBead?.rowIndex === rowIndex ? 
                        getBeadHierarchy(rowIndex, hoveredBead.beadIndex).includes(beadIndex) : false;
                      
                      return (
                        <div
                          key={`left-bead-${rowIndex}-${beadIndex}`}
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 shadow-lg cursor-pointer transition-all duration-200 ${
                            willMove
                              ? 'scale-105 border-orange-500 shadow-orange-300'
                              : 'border-amber-700 hover:scale-105 hover:border-orange-400'
                          }`}
                          style={{
                            background: willMove 
                              ? 'radial-gradient(ellipse at 30% 30%, #fb923c, #ea580c)'
                              : 'radial-gradient(ellipse at 30% 30%, #fde047, #d97706)'
                          }}
                          onClick={() => handleWesternBeadClick(rowIndex, beadIndex)}
                          onMouseEnter={() => setHoveredBead({rowIndex, beadIndex})}
                          onMouseLeave={() => setHoveredBead(null)}
                          title={`Bead ${beadIndex + 1} - Will slide with ${getBeadHierarchy(rowIndex, beadIndex).length} beads`}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Right side beads (counted) */}
                  <div className="absolute right-2 sm:right-4 flex items-center space-x-1 sm:space-x-2 flex-row-reverse">
                    {row.lower.map((isActive, beadIndex) => {
                      // Only render beads that ARE active (counted)
                      if (!isActive) return null;
                      
                      const willMove = hoveredBead?.rowIndex === rowIndex ? 
                        getBeadHierarchy(rowIndex, hoveredBead.beadIndex).includes(beadIndex) : false;
                      
                      return (
                        <div
                          key={`right-bead-${rowIndex}-${beadIndex}`}
                          className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 shadow-lg cursor-pointer transition-all duration-200 ${
                            willMove
                              ? 'scale-105 border-green-500 shadow-green-300'
                              : 'border-emerald-800 hover:scale-105 hover:border-green-400'
                          }`}
                          style={{
                            background: willMove 
                              ? 'radial-gradient(ellipse at 30% 30%, #4ade80, #16a34a)'
                              : 'radial-gradient(ellipse at 30% 30%, #34d399, #059669)'
                          }}
                          onClick={() => handleWesternBeadClick(rowIndex, beadIndex)}
                          onMouseEnter={() => setHoveredBead({rowIndex, beadIndex})}
                          onMouseLeave={() => setHoveredBead(null)}
                          title={`Bead ${beadIndex + 1} - Will slide with ${getBeadHierarchy(rowIndex, beadIndex).length} beads`}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Click hint */}
                  {hoveredBead?.rowIndex !== rowIndex && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="text-xs text-slate-500 bg-slate-200 px-2 py-1 rounded opacity-75">
                        Click any bead to slide
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  // Render Asian abacus (Suanpan or Soroban)
  const renderAsianAbacus = () => (
    <div 
      ref={abacusRef}
      className="relative bg-gradient-to-b from-amber-900 to-amber-800 p-2 sm:p-4 lg:p-6 rounded-2xl shadow-2xl border-4 sm:border-8 border-amber-900 overflow-x-auto"
      style={{
        backgroundImage: 'linear-gradient(45deg, #8b4513 25%, transparent 25%), linear-gradient(-45deg, #8b4513 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #8b4513 75%), linear-gradient(-45deg, transparent 75%, #8b4513 75%)',
        backgroundSize: '20px 20px',
        backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px'
      }}
    >
      {/* Frame decoration */}
      <div className="absolute inset-2 rounded-xl bg-gradient-to-b from-amber-100 to-amber-50 shadow-inner"></div>
      
      {/* Place value labels */}
      {showLabels && (
        <div className="relative z-10 flex justify-between mb-2 sm:mb-4 px-2 sm:px-4 min-w-[600px] sm:min-w-0">
          {getPlaceLabels().map((label, index) => (
            <div key={index} className="text-xs font-semibold text-amber-900 text-center w-8 sm:w-12 flex-shrink-0">
              {label}
            </div>
          ))}
        </div>
      )}

      {/* Abacus content */}
      <div className="relative z-10 min-w-[600px] sm:min-w-0">
        {/* Upper section */}
        <div className="mb-2 sm:mb-4">
          <div className="flex justify-between px-2 sm:px-4">
            {beads.map((rod, rodIndex) => (
              <div key={`upper-${rodIndex}`} className="flex flex-col items-center w-8 sm:w-12 flex-shrink-0">
                {rod.upper.map((isActive, beadIndex) => (
                  <div
                    key={`upper-${rodIndex}-${beadIndex}`}
                    className={`
                      w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer transition-all duration-300 mb-1 shadow-lg
                      ${isActive 
                        ? 'bg-gradient-to-b from-red-400 to-red-600 transform -translate-y-2 shadow-red-500/50' 
                        : 'bg-gradient-to-b from-amber-200 to-amber-400 hover:from-amber-300 hover:to-amber-500'
                      }
                      border-2 border-amber-800 active:scale-95
                    `}
                    onMouseDown={() => handleMouseDown(rodIndex, 'upper', beadIndex)}
                    onMouseEnter={() => handleMouseEnter(rodIndex, 'upper', beadIndex)}
                    onTouchStart={(e) => handleTouchStart(e, rodIndex, 'upper', beadIndex)}
                    style={{
                      background: isActive 
                        ? 'radial-gradient(ellipse at 30% 30%, #fca5a5, #dc2626)'
                        : 'radial-gradient(ellipse at 30% 30%, #fde68a, #d97706)'
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Crossbar */}
        <div className="relative mb-2 sm:mb-4">
          <div className="h-2 sm:h-3 bg-gradient-to-r from-amber-800 via-amber-700 to-amber-800 shadow-lg rounded-sm"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-amber-600 to-transparent opacity-50 rounded-sm"></div>
        </div>

        {/* Lower section */}
        <div>
          <div className="flex justify-between px-2 sm:px-4">
            {beads.map((rod, rodIndex) => (
              <div key={`lower-${rodIndex}`} className="flex flex-col items-center w-8 sm:w-12 flex-shrink-0">
                {rod.lower.map((isActive, beadIndex) => (
                  <div
                    key={`lower-${rodIndex}-${beadIndex}`}
                    className={`
                      w-6 h-6 sm:w-8 sm:h-8 rounded-full cursor-pointer transition-all duration-300 mb-1 shadow-lg
                      ${isActive 
                        ? 'bg-gradient-to-b from-blue-400 to-blue-600 transform translate-y-2 shadow-blue-500/50' 
                        : 'bg-gradient-to-b from-amber-200 to-amber-400 hover:from-amber-300 hover:to-amber-500'
                      }
                      border-2 border-amber-800 active:scale-95
                    `}
                    onMouseDown={() => handleMouseDown(rodIndex, 'lower', beadIndex)}
                    onMouseEnter={() => handleMouseEnter(rodIndex, 'lower', beadIndex)}
                    onTouchStart={(e) => handleTouchStart(e, rodIndex, 'lower', beadIndex)}
                    style={{
                      background: isActive 
                        ? 'radial-gradient(ellipse at 30% 30%, #93c5fd, #2563eb)'
                        : 'radial-gradient(ellipse at 30% 30%, #fde68a, #d97706)'
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Vertical rods */}
        <div className="absolute inset-0 flex justify-between px-2 sm:px-4 pointer-events-none">
          {beads.map((_, rodIndex) => (
            <div key={`rod-${rodIndex}`} className="w-8 sm:w-12 flex justify-center flex-shrink-0">
              <div className="w-1 h-full bg-gradient-to-b from-amber-800 to-amber-700 rounded-full shadow-inner"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mb-8">
      {/* Header with logo and title */}
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-amber-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">🧮</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {type === 'soroban' ? 'Soroban Abacus Calculator' :
             type === 'suanpan' ? 'Suanpan Abacus Calculator' :
             type === 'western' ? 'Western Counting Frame' :
             'Traditional Abacus Collection'}
          </h1>
          <p className="text-gray-600">
            {type === 'soroban' ? 'Master the Japanese soroban abacus with 1:4 bead configuration' :
             type === 'suanpan' ? 'Experience the traditional Chinese suanpan with 2:5 bead configuration' :
             type === 'western' ? 'Practice with the Western counting frame using sliding beads' :
             'Experience three distinct calculating traditions from around the world'}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap justify-center items-center gap-4 mb-8">
        {!type && (
          <div className="flex rounded-lg border border-gray-300 bg-white shadow-sm">
            <button
              onClick={() => setAbacusType('suanpan')}
              className={`px-6 py-3 rounded-l-lg text-sm font-medium transition-colors ${
                abacusType === 'suanpan'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              🇨🇳 Chinese Suanpan
            </button>
            <button
              onClick={() => setAbacusType('soroban')}
              className={`px-6 py-3 text-sm font-medium transition-colors ${
                abacusType === 'soroban'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              🇯🇵 Japanese Soroban
            </button>
            <button
              onClick={() => setAbacusType('western')}
              className={`px-6 py-3 rounded-r-lg text-sm font-medium transition-colors ${
                abacusType === 'western'
                  ? 'bg-red-600 text-white shadow-sm'
                  : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
              }`}
            >
              🏛️ Western Counting Frame
            </button>
          </div>
        )}
      </div>

      {/* Current Value Display */}
      <div className="text-center mb-8">
        <div className="inline-block bg-black text-green-400 px-8 py-4 rounded-lg font-mono text-4xl font-bold shadow-lg border-4 border-gray-800">
          {getCurrentValue().toLocaleString()}
        </div>
        <p className="text-sm text-gray-600 mt-2">Current Value</p>
      </div>

      {/* Abacus Display */}
      <div className="w-full max-w-6xl mx-auto px-2 sm:px-4">
        {abacusType === 'western' ? renderWesternAbacus() : renderAsianAbacus()}

        {/* Control buttons */}
        <div className="grid grid-cols-2 sm:flex sm:flex-wrap sm:justify-center gap-2 sm:gap-4 mt-4 sm:mt-8 px-2">
          <button
            onClick={resetAbacus}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium shadow-lg text-sm sm:text-base"
          >
            Reset All
          </button>
          <button
            onClick={() => setNumber(12345)}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg text-sm sm:text-base"
          >
            Demo: 12,345
          </button>
          <button
            onClick={() => setNumber(Math.floor(Math.random() * (abacusType === 'western' ? 10000000000 : 1000000000000000)))}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-lg text-sm sm:text-base"
          >
            Random
          </button>
          <button
            onClick={() => setShowLabels(!showLabels)}
            className="px-3 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium shadow-lg text-sm sm:text-base"
          >
            {showLabels ? 'Hide Labels' : 'Show Labels'}
          </button>
        </div>
      </div>


      
      {/* Show all usage instructions only when no specific type is set (original abacus page) */}
      {!type && (
        <div className="mt-8 bg-white rounded-xl p-6 shadow-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">How to Use Each Abacus</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-600">
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Chinese & Japanese</h4>
              <ul className="space-y-1">
                <li>• <span className="text-red-600 font-medium">Red beads:</span> Worth 5 in that position</li>
                <li>• <span className="text-blue-600 font-medium">Blue beads:</span> Worth 1 in that position</li>
                <li>• Active beads move toward the crossbar</li>
                <li>• Click to toggle individual beads</li>
                <li>• Drag across for quick input</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">Western Counting Frame</h4>
              <ul className="space-y-1">
                <li>• <span className="text-emerald-600 font-medium">Green beads:</span> Counted (moved right)</li>
                <li>• <span className="text-amber-600 font-medium">Amber beads:</span> Not counted (left)</li>
                <li>• Each row represents a place value</li>
                <li>• Click any bead to toggle individually</li>
                <li>• All beads are independent</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-2">General Tips</h4>
              <ul className="space-y-1">
                <li>• Works on both desktop and mobile</li>
                <li>• Touch and swipe gestures supported</li>
                <li>• Toggle labels for learning</li>
                <li>• Use demo numbers to practice</li>
                <li>• Reset to clear and start over</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}