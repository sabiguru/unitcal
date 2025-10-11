'use client';

import { useState } from 'react';

export default function BudgetCalculator() {
  const [income, setIncome] = useState('');
  const [expenses, setExpenses] = useState({
    housing: '',
    transportation: '',
    food: '',
    healthcare: '',
    entertainment: '',
    savings: '',
    utilities: '',
    insurance: '',
    other: ''
  });
  const [results, setResults] = useState<any>(null);

  const calculateBudget = () => {
    const monthlyIncome = parseFloat(income);
    
    const totalExpenses = Object.values(expenses).reduce((sum, expense) => {
      return sum + (parseFloat(expense) || 0);
    }, 0);

    if (!monthlyIncome) return;

    const surplus = monthlyIncome - totalExpenses;
    const savingsRate = ((parseFloat(expenses.savings) || 0) / monthlyIncome) * 100;

    // Calculate expense percentages
    const expensePercentages = Object.entries(expenses).reduce((acc, [key, value]) => {
      acc[key] = ((parseFloat(value) || 0) / monthlyIncome) * 100;
      return acc;
    }, {} as any);

    // Recommended budget percentages (50/30/20 rule)
    const recommendations = {
      housing: 25,
      transportation: 15,
      food: 12,
      healthcare: 5,
      entertainment: 5,
      savings: 20,
      utilities: 6,
      insurance: 7,
      other: 5
    };

    const budgetAnalysis = Object.entries(expensePercentages).map(([category, percentage]) => ({
      category,
      current: percentage,
      recommended: recommendations[category as keyof typeof recommendations],
      difference: percentage - recommendations[category as keyof typeof recommendations],
      amount: parseFloat(expenses[category as keyof typeof expenses]) || 0
    }));

    setResults({
      monthlyIncome,
      totalExpenses,
      surplus,
      savingsRate,
      expensePercentages,
      budgetAnalysis
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const handleExpenseChange = (category: string, value: string) => {
    setExpenses(prev => ({
      ...prev,
      [category]: value
    }));
  };

  const getCategoryColor = (difference: number) => {
    if (difference > 5) return 'text-red-600';
    if (difference > 0) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="mb-8">
      {/* Main Calculator */}
      <div>
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
                <span className="text-white text-2xl">📊</span>
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Budget Calculator — Personal Finance & Budget Planner</h1>
                <p className="text-gray-600">Track your income, expenses, and savings goals with detailed analysis</p>
              </div>
            </div>

            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Monthly Income</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="5000"
                  />
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Expenses</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Housing & Rent</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={expenses.housing}
                        onChange={(e) => handleExpenseChange('housing', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="1500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transportation</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={expenses.transportation}
                        onChange={(e) => handleExpenseChange('transportation', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="600"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Food & Groceries</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={expenses.food}
                        onChange={(e) => handleExpenseChange('food', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Healthcare</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={expenses.healthcare}
                        onChange={(e) => handleExpenseChange('healthcare', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="300"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Entertainment</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={expenses.entertainment}
                        onChange={(e) => handleExpenseChange('entertainment', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="200"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Savings & Investments</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={expenses.savings}
                        onChange={(e) => handleExpenseChange('savings', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="1000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Utilities</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={expenses.utilities}
                        onChange={(e) => handleExpenseChange('utilities', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="150"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Insurance</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={expenses.insurance}
                        onChange={(e) => handleExpenseChange('insurance', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="250"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Other Expenses</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                      <input
                        type="number"
                        value={expenses.other}
                        onChange={(e) => handleExpenseChange('other', e.target.value)}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="100"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={calculateBudget}
              className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-4 px-6 rounded-lg font-medium hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Analyze Budget
            </button>

            {results && (
              <div className="mt-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-900 mb-1">
                        {formatCurrency(results.monthlyIncome)}
                      </div>
                      <div className="text-sm text-blue-700">Monthly Income</div>
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-900 mb-1">
                        {formatCurrency(results.totalExpenses)}
                      </div>
                      <div className="text-sm text-red-700">Total Expenses</div>
                    </div>
                  </div>
                  <div className={`rounded-xl p-6 border ${
                    results.surplus >= 0 ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
                  }`}>
                    <div className="text-center">
                      <div className={`text-2xl font-bold mb-1 ${
                        results.surplus >= 0 ? 'text-green-900' : 'text-red-900'
                      }`}>
                        {formatCurrency(results.surplus)}
                      </div>
                      <div className={`text-sm ${
                        results.surplus >= 0 ? 'text-green-700' : 'text-red-700'
                      }`}>
                        {results.surplus >= 0 ? 'Surplus' : 'Deficit'}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Budget Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-2 px-3">Category</th>
                          <th className="text-right py-2 px-3">Amount</th>
                          <th className="text-right py-2 px-3">Current %</th>
                          <th className="text-right py-2 px-3">Recommended %</th>
                          <th className="text-right py-2 px-3">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.budgetAnalysis.map((item: any, index: number) => (
                          <tr key={index} className="border-b border-gray-100">
                            <td className="py-2 px-3 font-medium capitalize">{item.category.replace(/([A-Z])/g, ' $1').trim()}</td>
                            <td className="py-2 px-3 text-right">{formatCurrency(item.amount)}</td>
                            <td className="py-2 px-3 text-right">{formatPercentage(item.current)}</td>
                            <td className="py-2 px-3 text-right">{formatPercentage(item.recommended)}</td>
                            <td className={`py-2 px-3 text-right font-medium ${getCategoryColor(item.difference)}`}>
                              {item.difference > 5 ? 'Over Budget' : 
                               item.difference > 0 ? 'Near Limit' : 'On Track'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
                  <h3 className="text-lg font-semibold text-yellow-900 mb-4">Budget Recommendations</h3>
                  <div className="space-y-2 text-sm text-yellow-800">
                    <p><strong>Savings Rate:</strong> {formatPercentage(results.savingsRate)} (Recommended: 20%)</p>
                    <p><strong>Status:</strong> {results.surplus >= 0 ? 'Your budget is balanced' : 'You need to reduce expenses or increase income'}</p>
                    {results.savingsRate < 20 && (
                      <p><strong>Tip:</strong> Try to increase your savings rate to at least 20% of your income.</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 50/30/20 Rule */}
        <div className="mt-8 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <h3 className="text-lg font-semibold text-purple-900 mb-4 flex items-center">
            <span className="text-purple-600 mr-2">💡</span>
            50/30/20 Rule
          </h3>
          <div className="space-y-3 text-sm text-purple-800">
            <div className="flex justify-between">
              <span>Needs (Housing, Food, Bills)</span>
              <span className="font-medium">50%</span>
            </div>
            <div className="flex justify-between">
              <span>Wants (Entertainment, Dining)</span>
              <span className="font-medium">30%</span>
            </div>
            <div className="flex justify-between">
              <span>Savings & Debt Payment</span>
              <span className="font-medium">20%</span>
            </div>
          </div>
        </div>
      </div>
  );
}