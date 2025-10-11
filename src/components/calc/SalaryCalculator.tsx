'use client';

import { useState } from 'react';

export default function SalaryCalculator() {
  const [salaryAmount, setSalaryAmount] = useState('');
  const [salaryType, setSalaryType] = useState('annual');
  const [hoursPerWeek, setHoursPerWeek] = useState('40');
  const [vacationDays, setVacationDays] = useState('10');
  const [results, setResults] = useState<any>(null);

  const calculateSalary = () => {
    const amount = parseFloat(salaryAmount);
    const hours = parseFloat(hoursPerWeek);
    const vacation = parseFloat(vacationDays);

    if (!amount || !hours) return;

    const workingDaysPerYear = 365 - 104 - vacation; // 365 days - weekends - vacation
    const workingHoursPerYear = (workingDaysPerYear / 7) * hours;
    const workingWeeksPerYear = workingHoursPerYear / hours;

    let annualSalary, monthlySalary, weeklySalary, dailySalary, hourlySalary;

    switch (salaryType) {
      case 'annual':
        annualSalary = amount;
        monthlySalary = amount / 12;
        weeklySalary = amount / 52;
        dailySalary = amount / workingDaysPerYear;
        hourlySalary = amount / workingHoursPerYear;
        break;
      case 'monthly':
        annualSalary = amount * 12;
        monthlySalary = amount;
        weeklySalary = amount * 12 / 52;
        dailySalary = amount * 12 / workingDaysPerYear;
        hourlySalary = amount * 12 / workingHoursPerYear;
        break;
      case 'weekly':
        annualSalary = amount * 52;
        monthlySalary = amount * 52 / 12;
        weeklySalary = amount;
        dailySalary = amount * 52 / workingDaysPerYear;
        hourlySalary = amount * 52 / workingHoursPerYear;
        break;
      case 'daily':
        annualSalary = amount * workingDaysPerYear;
        monthlySalary = amount * workingDaysPerYear / 12;
        weeklySalary = amount * workingDaysPerYear / 52;
        dailySalary = amount;
        hourlySalary = amount / (hours * 5 / 7); // assuming 5 working days per week
        break;
      case 'hourly':
        annualSalary = amount * workingHoursPerYear;
        monthlySalary = amount * workingHoursPerYear / 12;
        weeklySalary = amount * hours;
        dailySalary = amount * hours * 5 / 7; // assuming 5 working days per week
        hourlySalary = amount;
        break;
      default:
        return;
    }

    // Calculate take-home pay estimates (rough estimates)
    const federalTaxRate = 0.22; // Approximate federal tax rate
    const stateTaxRate = 0.05; // Approximate state tax rate
    const socialSecurityRate = 0.062;
    const medicareRate = 0.0145;
    const totalTaxRate = federalTaxRate + stateTaxRate + socialSecurityRate + medicareRate;

    const netAnnualSalary = annualSalary * (1 - totalTaxRate);
    const netMonthlySalary = netAnnualSalary / 12;
    const netWeeklySalary = netAnnualSalary / 52;
    const netDailySalary = netAnnualSalary / workingDaysPerYear;
    const netHourlySalary = netAnnualSalary / workingHoursPerYear;

    setResults({
      gross: {
        annual: annualSalary,
        monthly: monthlySalary,
        weekly: weeklySalary,
        daily: dailySalary,
        hourly: hourlySalary
      },
      net: {
        annual: netAnnualSalary,
        monthly: netMonthlySalary,
        weekly: netWeeklySalary,
        daily: netDailySalary,
        hourly: netHourlySalary
      },
      taxes: {
        annual: annualSalary - netAnnualSalary,
        monthly: monthlySalary - netMonthlySalary,
        rate: totalTaxRate * 100
      },
      workingStats: {
        hoursPerYear: workingHoursPerYear,
        daysPerYear: workingDaysPerYear,
        weeksPerYear: workingWeeksPerYear,
        vacationDays: vacation
      }
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
        <div className="flex items-center mb-6">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
            <span className="text-white text-2xl">💰</span>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Salary Calculator — Hourly to Annual Salary Converter</h1>
            <p className="text-gray-600">Convert between hourly, daily, weekly, monthly, and annual salary</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                value={salaryAmount}
                onChange={(e) => setSalaryAmount(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="60000"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Salary Type</label>
            <select
              value={salaryType}
              onChange={(e) => setSalaryType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="annual">Annual</option>
              <option value="monthly">Monthly</option>
              <option value="weekly">Weekly</option>
              <option value="daily">Daily</option>
              <option value="hourly">Hourly</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Hours per Week</label>
            <input
              type="number"
              value={hoursPerWeek}
              onChange={(e) => setHoursPerWeek(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="40"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Vacation Days per Year</label>
            <input
              type="number"
              value={vacationDays}
              onChange={(e) => setVacationDays(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="10"
            />
          </div>
        </div>

        <button
          onClick={calculateSalary}
          className="w-full bg-gradient-to-r from-blue-500 to-green-600 text-white py-4 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-green-700 transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          Calculate Salary
        </button>

        {results && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-900 mb-4">Gross Income</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-blue-700">Annual</span>
                    <span className="font-bold text-blue-900">{formatCurrency(results.gross.annual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Monthly</span>
                    <span className="font-bold text-blue-900">{formatCurrency(results.gross.monthly)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Weekly</span>
                    <span className="font-bold text-blue-900">{formatCurrency(results.gross.weekly)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Daily</span>
                    <span className="font-bold text-blue-900">{formatCurrency(results.gross.daily)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-blue-700">Hourly</span>
                    <span className="font-bold text-blue-900">{formatCurrency(results.gross.hourly)}</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Net Income (After Tax)</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-green-700">Annual</span>
                    <span className="font-bold text-green-900">{formatCurrency(results.net.annual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Monthly</span>
                    <span className="font-bold text-green-900">{formatCurrency(results.net.monthly)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Weekly</span>
                    <span className="font-bold text-green-900">{formatCurrency(results.net.weekly)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Daily</span>
                    <span className="font-bold text-green-900">{formatCurrency(results.net.daily)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-green-700">Hourly</span>
                    <span className="font-bold text-green-900">{formatCurrency(results.net.hourly)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-red-50 rounded-xl p-6 border border-red-200">
                <h3 className="text-lg font-semibold text-red-900 mb-4">Tax Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-red-700">Annual Tax</span>
                    <span className="font-bold text-red-900">{formatCurrency(results.taxes.annual)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Monthly Tax</span>
                    <span className="font-bold text-red-900">{formatCurrency(results.taxes.monthly)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-red-700">Tax Rate</span>
                    <span className="font-bold text-red-900">{results.taxes.rate.toFixed(1)}%</span>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 rounded-xl p-6 border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-4">Working Statistics</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-purple-700">Hours per Year</span>
                    <span className="font-bold text-purple-900">{results.workingStats.hoursPerYear.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Working Days</span>
                    <span className="font-bold text-purple-900">{results.workingStats.daysPerYear.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Working Weeks</span>
                    <span className="font-bold text-purple-900">{results.workingStats.weeksPerYear.toFixed(0)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-purple-700">Vacation Days</span>
                    <span className="font-bold text-purple-900">{results.workingStats.vacationDays}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border border-yellow-200">
              <h3 className="text-lg font-semibold text-yellow-900 mb-4">Salary Breakdown</h3>
              <div className="text-sm text-yellow-800 space-y-2">
                <p><strong>Note:</strong> Tax calculations are estimates based on average rates and don't include deductions or state-specific taxes.</p>
                <p><strong>Gross Annual:</strong> {formatCurrency(results.gross.annual)}</p>
                <p><strong>Net Annual:</strong> {formatCurrency(results.net.annual)} (after ~{results.taxes.rate.toFixed(1)}% tax)</p>
                <p><strong>Monthly Take-Home:</strong> {formatCurrency(results.net.monthly)}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}