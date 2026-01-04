'use client';

import { useState } from 'react';

export default function MolecularWeightCalculator() {
  const [formula, setFormula] = useState('');
  const [results, setResults] = useState<any>(null);

  const atomicWeights = {
    'H': 1.008, 'He': 4.003, 'Li': 6.941, 'Be': 9.012, 'B': 10.811,
    'C': 12.011, 'N': 14.007, 'O': 15.999, 'F': 18.998, 'Ne': 20.180,
    'Na': 22.990, 'Mg': 24.305, 'Al': 26.982, 'Si': 28.086, 'P': 30.974,
    'S': 32.065, 'Cl': 35.453, 'Ar': 39.948, 'K': 39.098, 'Ca': 40.078,
    'Sc': 44.956, 'Ti': 47.867, 'V': 50.942, 'Cr': 51.996, 'Mn': 54.938,
    'Fe': 55.845, 'Co': 58.933, 'Ni': 58.693, 'Cu': 63.546, 'Zn': 65.38,
    'Ga': 69.723, 'Ge': 72.64, 'As': 74.922, 'Se': 78.96, 'Br': 79.904,
    'Kr': 83.798, 'Rb': 85.468, 'Sr': 87.62, 'Y': 88.906, 'Zr': 91.224,
    'Nb': 92.906, 'Mo': 95.96, 'Tc': 98, 'Ru': 101.07, 'Rh': 102.906,
    'Pd': 106.42, 'Ag': 107.868, 'Cd': 112.411, 'In': 114.818, 'Sn': 118.71,
    'Sb': 121.76, 'Te': 127.60, 'I': 126.904, 'Xe': 131.293, 'Cs': 132.905,
    'Ba': 137.327, 'La': 138.905, 'Ce': 140.116, 'Pr': 140.908, 'Nd': 144.242,
    'Pm': 145, 'Sm': 150.36, 'Eu': 151.964, 'Gd': 157.25, 'Tb': 158.925,
    'Dy': 162.500, 'Ho': 164.930, 'Er': 167.259, 'Tm': 168.934, 'Yb': 173.054,
    'Lu': 174.967, 'Hf': 178.49, 'Ta': 180.948, 'W': 183.84, 'Re': 186.207,
    'Os': 190.23, 'Ir': 192.217, 'Pt': 195.084, 'Au': 196.967, 'Hg': 200.59,
    'Tl': 204.383, 'Pb': 207.2, 'Bi': 208.980, 'Po': 209, 'At': 210,
    'Rn': 222, 'Fr': 223, 'Ra': 226, 'Ac': 227, 'Th': 232.038, 'Pa': 231.036,
    'U': 238.029, 'Np': 237, 'Pu': 244, 'Am': 243, 'Cm': 247, 'Bk': 247,
    'Cf': 251, 'Es': 252, 'Fm': 257, 'Md': 258, 'No': 259, 'Lr': 262
  };

  const parseFormula = (formula: string) => {
    // Remove spaces and make uppercase for element symbols
    const cleanFormula = formula.replace(/\s/g, '');
    
    // Regular expression to match element and count pairs
    const regex = /([A-Z][a-z]?)(\d*)/g;
    const composition: { [key: string]: number } = {};
    const elements: Array<{element: string, count: number, mass: number}> = [];
    let match;
    let totalMass = 0;
    let isValid = true;
    let errorMessage = '';

    while ((match = regex.exec(cleanFormula)) !== null) {
      const element = match[1];
      const count = match[2] ? parseInt(match[2]) : 1;
      
      if (!atomicWeights[element as keyof typeof atomicWeights]) {
        isValid = false;
        errorMessage = `Unknown element: ${element}`;
        break;
      }
      
      const atomicWeight = atomicWeights[element as keyof typeof atomicWeights];
      composition[element] = (composition[element] || 0) + count;
      
      const mass = atomicWeight * count;
      totalMass += mass;
      
      elements.push({
        element,
        count,
        mass
      });
    }

    // Group same elements together for display
    const groupedElements = Object.entries(composition).map(([element, count]) => ({
      element,
      count,
      atomicWeight: atomicWeights[element as keyof typeof atomicWeights],
      totalMass: atomicWeights[element as keyof typeof atomicWeights] * count,
      percentage: (atomicWeights[element as keyof typeof atomicWeights] * count / totalMass) * 100
    }));

    return {
      isValid,
      errorMessage,
      totalMass,
      elements: groupedElements,
      rawElements: elements
    };
  };

  const calculateMolecularWeight = () => {
    if (!formula.trim()) return;
    
    const result = parseFormula(formula);
    setResults(result);
  };

  const getCommonCompounds = () => [
    { name: 'Water', formula: 'H2O' },
    { name: 'Carbon Dioxide', formula: 'CO2' },
    { name: 'Methane', formula: 'CH4' },
    { name: 'Ammonia', formula: 'NH3' },
    { name: 'Glucose', formula: 'C6H12O6' },
    { name: 'Sodium Chloride', formula: 'NaCl' },
    { name: 'Sulfuric Acid', formula: 'H2SO4' },
    { name: 'Ethanol', formula: 'C2H5OH' },
    { name: 'Caffeine', formula: 'C8H10N4O2' },
    { name: 'Aspirin', formula: 'C9H8O4' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">⚗️</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Molecular Weight Calculator — Chemical Formula Mass Calculator</h1>
          <p className="text-gray-600">Calculate molecular weight and composition of chemical compounds</p>
        </div>
      </div>

      <div className="mb-8">
        <label className="block text-sm font-medium text-gray-700 mb-2">Chemical Formula</label>
        <input
          type="text"
          value={formula}
          onChange={(e) => setFormula(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-lg"
          placeholder="Enter formula (e.g., H2SO4, C6H12O6)"
        />
        <div className="mt-2 text-sm text-gray-600">
          Examples: H2O, CO2, C6H12O6, CaCl2, H2SO4
        </div>
      </div>

      <button
        onClick={calculateMolecularWeight}
        className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 text-white py-4 px-6 rounded-lg font-medium hover:from-teal-600 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Calculate Molecular Weight
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          {results.isValid ? (
            <>
              <div className="bg-teal-50 rounded-xl p-6 border border-teal-200">
                <h3 className="text-lg font-semibold text-teal-900 mb-4">Molecular Weight</h3>
                <div className="text-center">
                  <div className="text-4xl font-bold text-teal-900 mb-2">
                    {results.totalMass.toFixed(3)} g/mol
                  </div>
                  <div className="text-sm text-teal-700">Formula: {formula}</div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Elemental Composition</h3>
                <div className="space-y-3">
                  {results.elements.map((element: any, index: number) => (
                    <div key={index} className="flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <span className="font-medium text-gray-900 text-lg">
                          {element.element}
                          {element.count > 1 && <sub>{element.count}</sub>}
                        </span>
                        <span className="text-sm text-gray-600">
                          ({element.atomicWeight} g/mol)
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-gray-900">
                          {element.totalMass.toFixed(3)} g/mol
                        </div>
                        <div className="text-sm text-gray-600">
                          {element.percentage.toFixed(1)}%
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-900 mb-4">Molar Calculations</h3>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span>1 mole contains:</span>
                      <span className="font-medium">{results.totalMass.toFixed(3)} g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>1 gram contains:</span>
                      <span className="font-medium">{(1/results.totalMass).toFixed(6)} mol</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Molecules per mole:</span>
                      <span className="font-medium">6.022 × 10²³</span>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                  <h3 className="text-lg font-semibold text-green-900 mb-4">Mass Percentages</h3>
                  <div className="space-y-2">
                    {results.elements.map((element: any, index: number) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{element.element}:</span>
                        <span className="font-medium">{element.percentage.toFixed(2)}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="bg-red-50 rounded-xl p-6 border border-red-200">
              <div className="text-red-800 font-medium">Error: {results.errorMessage}</div>
              <div className="text-red-600 text-sm mt-2">
                Please check your formula and try again. Make sure all element symbols are correct.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Common Compounds */}
      <div className="mt-8 bg-yellow-50 rounded-xl p-6 border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-900 mb-4">Common Compounds</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {getCommonCompounds().map((compound, index) => (
            <button
              key={index}
              onClick={() => setFormula(compound.formula)}
              className="text-left p-3 bg-white rounded-lg border border-yellow-300 hover:bg-yellow-100 transition-colors"
            >
              <div className="font-medium text-yellow-900">{compound.name}</div>
              <div className="text-sm text-yellow-700">{compound.formula}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}