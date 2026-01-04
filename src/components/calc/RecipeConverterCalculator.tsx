'use client';

import { useState } from 'react';

export default function RecipeConverterCalculator() {
  const [originalServings, setOriginalServings] = useState('');
  const [targetServings, setTargetServings] = useState('');
  const [ingredients, setIngredients] = useState([
    { name: '', amount: '', unit: 'cups' }
  ]);
  const [results, setResults] = useState<any>(null);

  const units = [
    'cups', 'tablespoons', 'teaspoons', 'ounces', 'pounds', 'grams', 'kilograms',
    'milliliters', 'liters', 'fluid ounces', 'pints', 'quarts', 'gallons',
    'pieces', 'cloves', 'packages', 'cans', 'bottles'
  ];

  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '', unit: 'cups' }]);
  };

  const removeIngredient = (index: number) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const updateIngredient = (index: number, field: string, value: string) => {
    const updated = ingredients.map((ingredient, i) => 
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setIngredients(updated);
  };

  const convertRecipe = () => {
    const original = parseFloat(originalServings);
    const target = parseFloat(targetServings);

    if (!original || !target) return;

    const conversionFactor = target / original;
    
    const convertedIngredients = ingredients.map(ingredient => {
      const amount = parseFloat(ingredient.amount);
      if (!amount || !ingredient.name) return null;
      
      const convertedAmount = amount * conversionFactor;
      return {
        name: ingredient.name,
        originalAmount: amount,
        convertedAmount: convertedAmount,
        unit: ingredient.unit,
        displayAmount: formatAmount(convertedAmount)
      };
    }).filter(Boolean);

    setResults({
      conversionFactor,
      originalServings: original,
      targetServings: target,
      convertedIngredients
    });
  };

  const formatAmount = (amount: number) => {
    // Convert decimals to fractions for common cooking measurements
    if (amount % 1 === 0) return amount.toString();
    
    const fractions = {
      0.125: '1/8',
      0.25: '1/4',
      0.333: '1/3',
      0.5: '1/2',
      0.667: '2/3',
      0.75: '3/4'
    };

    const decimal = amount % 1;
    const whole = Math.floor(amount);
    
    for (const [dec, frac] of Object.entries(fractions)) {
      if (Math.abs(decimal - parseFloat(dec)) < 0.01) {
        return whole > 0 ? `${whole} ${frac}` : frac;
      }
    }
    
    return amount.toFixed(2);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">👨‍🍳</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Recipe Converter</h1>
          <p className="text-gray-600">Scale recipes up or down to match your serving size needs</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Original Servings</label>
          <input
            type="number"
            value={originalServings}
            onChange={(e) => setOriginalServings(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="4"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Target Servings</label>
          <input
            type="number"
            value={targetServings}
            onChange={(e) => setTargetServings(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
            placeholder="8"
          />
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Ingredients</h3>
          <button
            onClick={addIngredient}
            className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Add Ingredient
          </button>
        </div>

        <div className="space-y-4">
          {ingredients.map((ingredient, index) => (
            <div key={index} className="grid grid-cols-12 gap-3 items-end">
              <div className="col-span-12 md:col-span-5">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ingredient Name</label>
                <input
                  type="text"
                  value={ingredient.name}
                  onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Flour"
                />
              </div>
              <div className="col-span-6 md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
                <input
                  type="number"
                  step="0.01"
                  value={ingredient.amount}
                  onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="2"
                />
              </div>
              <div className="col-span-6 md:col-span-3">
                <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
                <select
                  value={ingredient.unit}
                  onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  {units.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-12 md:col-span-1">
                <button
                  onClick={() => removeIngredient(index)}
                  className="w-full bg-red-500 text-white px-3 py-3 rounded-lg hover:bg-red-600 transition-colors"
                  disabled={ingredients.length === 1}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={convertRecipe}
        className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-4 px-6 rounded-lg font-medium hover:from-orange-600 hover:to-red-700 transition-all duration-200 shadow-lg hover:shadow-xl"
      >
        Convert Recipe
      </button>

      {results && (
        <div className="mt-8 space-y-6">
          <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
            <h3 className="text-lg font-semibold text-orange-900 mb-4">Conversion Summary</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-orange-900">{results.originalServings}</div>
                <div className="text-sm text-orange-700">Original Servings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-900">{results.targetServings}</div>
                <div className="text-sm text-orange-700">Target Servings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-900">{results.conversionFactor.toFixed(2)}×</div>
                <div className="text-sm text-orange-700">Conversion Factor</div>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Converted Recipe</h3>
            <div className="space-y-3">
              {results.convertedIngredients.map((ingredient: any, index: number) => (
                <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                  <span className="font-medium text-gray-900">{ingredient.name}</span>
                  <div className="text-right">
                    <div className="font-bold text-gray-900">
                      {ingredient.displayAmount} {ingredient.unit}
                    </div>
                    <div className="text-sm text-gray-500">
                      (was {ingredient.originalAmount} {ingredient.unit})
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}