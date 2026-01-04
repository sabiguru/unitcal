'use client';

import { useState, useEffect } from 'react';

interface ExchangeRates {
  [key: string]: number;
}

interface CurrencyData {
  code: string;
  name: string;
  flag: string;
}

export default function CurrencyConverterCalculator() {
  const [amount, setAmount] = useState('100');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
  const [loading, setLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [useCustomRate, setUseCustomRate] = useState(false);
  const [customRate, setCustomRate] = useState('');
  const [calculationMode, setCalculationMode] = useState<'live' | 'custom' | 'scenario'>('live');

  const majorCurrencies: CurrencyData[] = [
    // Major Global Currencies
    { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
    { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
    { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
    { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
    { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
    { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
    { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
    { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
    { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
    { code: 'KRW', name: 'South Korean Won', flag: '🇰🇷' },
    { code: 'SGD', name: 'Singapore Dollar', flag: '🇸🇬' },
    { code: 'HKD', name: 'Hong Kong Dollar', flag: '🇭🇰' },
    { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
    { code: 'SEK', name: 'Swedish Krona', flag: '🇸🇪' },
    { code: 'NOK', name: 'Norwegian Krone', flag: '🇳🇴' },
    { code: 'MXN', name: 'Mexican Peso', flag: '🇲🇽' },
    { code: 'BRL', name: 'Brazilian Real', flag: '🇧🇷' },
    { code: 'RUB', name: 'Russian Ruble', flag: '🇷🇺' },
    { code: 'TRY', name: 'Turkish Lira', flag: '🇹🇷' },
    
    // African Currencies
    { code: 'ZAR', name: 'South African Rand', flag: '🇿🇦' },
    { code: 'NGN', name: 'Nigerian Naira', flag: '🇳🇬' },
    { code: 'EGP', name: 'Egyptian Pound', flag: '🇪🇬' },
    { code: 'KES', name: 'Kenyan Shilling', flag: '🇰🇪' },
    { code: 'GHS', name: 'Ghanaian Cedi', flag: '🇬🇭' },
    { code: 'UGX', name: 'Ugandan Shilling', flag: '🇺🇬' },
    { code: 'TZS', name: 'Tanzanian Shilling', flag: '🇹🇿' },
    { code: 'ETB', name: 'Ethiopian Birr', flag: '🇪🇹' },
    { code: 'MAD', name: 'Moroccan Dirham', flag: '🇲🇦' },
    { code: 'DZD', name: 'Algerian Dinar', flag: '🇩🇿' },
    { code: 'AOA', name: 'Angolan Kwanza', flag: '🇦🇴' },
    { code: 'BWP', name: 'Botswana Pula', flag: '🇧🇼' },
    { code: 'XOF', name: 'West African Franc', flag: '🏁' },
    { code: 'XAF', name: 'Central African Franc', flag: '🏁' },
    { code: 'MUR', name: 'Mauritian Rupee', flag: '🇲🇺' },
    { code: 'MWK', name: 'Malawian Kwacha', flag: '🇲🇼' },
    { code: 'ZMW', name: 'Zambian Kwacha', flag: '🇿🇲' },
    { code: 'RWF', name: 'Rwandan Franc', flag: '🇷🇼' }
  ];

  const fetchExchangeRates = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Using a free API that doesn't require authentication
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch exchange rates');
      }
      
      const data = await response.json();
      setExchangeRates(data.rates);
      setLastUpdated(new Date(data.date).toLocaleString());
    } catch (err) {
      setError('Unable to fetch current exchange rates. Please try again later.');
      console.error('Exchange rate fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency]);

  const convertAmount = () => {
    const numAmount = parseFloat(amount);
    if (!numAmount) return 0;
    
    // Use custom rate if enabled
    if (calculationMode === 'custom' && customRate) {
      const rate = parseFloat(customRate);
      return numAmount * rate;
    }
    
    // Use live rates
    if (!exchangeRates[toCurrency]) return 0;
    return numAmount * exchangeRates[toCurrency];
  };

  const getCurrentRate = () => {
    if (calculationMode === 'custom' && customRate) {
      return parseFloat(customRate);
    }
    return exchangeRates[toCurrency] || 0;
  };

  const getReverseRate = () => {
    const currentRate = getCurrentRate();
    if (!currentRate) return 0;
    return 1 / currentRate;
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  const formatCurrency = (amount: number, currencyCode: string) => {
    const currency = majorCurrencies.find(c => c.code === currencyCode);
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currencyCode,
      minimumFractionDigits: 2,
      maximumFractionDigits: 4
    }).format(amount);
  };

  const convertedAmount = convertAmount();
  const reverseRate = getReverseRate();

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-8">
      <div className="flex items-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 flex-shrink-0">
          <span className="text-white text-2xl">💱</span>
        </div>
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Currency Converter</h1>
          <p className="text-gray-600">Convert between world currencies with live exchange rates</p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-red-700 text-sm">{error}</span>
          </div>
        </div>
      )}

      {/* Calculation Mode Selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">Calculation Mode</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <button
            onClick={() => setCalculationMode('live')}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
              calculationMode === 'live' 
                ? 'bg-green-500 text-white border-green-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            📈 Live Rates
          </button>
          <button
            onClick={() => setCalculationMode('custom')}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
              calculationMode === 'custom' 
                ? 'bg-blue-500 text-white border-blue-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            ⚙️ Custom Rate
          </button>
          <button
            onClick={() => setCalculationMode('scenario')}
            className={`p-3 rounded-lg border text-sm font-medium transition-colors ${
              calculationMode === 'scenario' 
                ? 'bg-purple-500 text-white border-purple-500' 
                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
            }`}
          >
            🎯 What-if Scenario
          </button>
        </div>
      </div>

      {/* Mode Description */}
      <div className="mb-6">
        {calculationMode === 'live' && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-green-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <span className="text-green-800 font-medium">Live Market Rates</span>
            </div>
            <p className="text-green-700 text-sm">Using real-time exchange rates from financial markets. Perfect for current transactions and planning.</p>
          </div>
        )}
        {calculationMode === 'custom' && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span className="text-blue-800 font-medium">Custom Exchange Rate</span>
            </div>
            <p className="text-blue-700 text-sm">Enter your own exchange rate for historical analysis, future projections, or specialized calculations.</p>
          </div>
        )}
        {calculationMode === 'scenario' && (
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <svg className="w-5 h-5 text-purple-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
              <span className="text-purple-800 font-medium">What-if Analysis</span>
            </div>
            <p className="text-purple-700 text-sm">Test different rate scenarios. "What would my investment be worth if USD/NGN hits 2000?" Perfect for planning and analysis.</p>
          </div>
        )}
      </div>

      {/* Custom Rate Input */}
      {(calculationMode === 'custom' || calculationMode === 'scenario') && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {calculationMode === 'custom' ? 'Custom Exchange Rate' : 'Scenario Rate'}
          </label>
          <div className="relative">
            <input
              type="number"
              step="0.0001"
              value={customRate}
              onChange={(e) => setCustomRate(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder={`1 ${fromCurrency} = ? ${toCurrency}`}
            />
            <div className="absolute right-3 top-3.5 text-sm text-gray-500">
              {fromCurrency}/{toCurrency}
            </div>
          </div>
          {exchangeRates[toCurrency] && (
            <div className="mt-2 text-sm text-gray-600">
              Current market rate: 1 {fromCurrency} = {exchangeRates[toCurrency].toFixed(4)} {toCurrency}
            </div>
          )}
        </div>
      )}

      {/* Amount Input */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg font-medium"
          placeholder="Enter amount"
        />
      </div>

      {/* Currency Selection */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select
            value={fromCurrency}
            onChange={(e) => setFromCurrency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {majorCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
          <select
            value={toCurrency}
            onChange={(e) => setToCurrency(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            {majorCurrencies.map((currency) => (
              <option key={currency.code} value={currency.code}>
                {currency.flag} {currency.code} - {currency.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Swap Button */}
      <div className="text-center mb-6">
        <button
          onClick={swapCurrencies}
          className="inline-flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          disabled={loading}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
          <span>Swap Currencies</span>
        </button>
      </div>

      {/* Conversion Result */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 mb-6 border border-green-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {loading ? (
              <div className="inline-flex items-center">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mr-3"></div>
                Loading...
              </div>
            ) : (
              <>
                {amount} {majorCurrencies.find(c => c.code === fromCurrency)?.flag} {fromCurrency} =
              </>
            )}
          </div>
          <div className="text-4xl font-bold text-green-600 mb-2">
            {loading ? '---' : formatCurrency(convertedAmount, toCurrency)}
          </div>
          <div className="text-sm text-gray-600">
            {majorCurrencies.find(c => c.code === toCurrency)?.flag} {toCurrency} - {majorCurrencies.find(c => c.code === toCurrency)?.name}
          </div>
        </div>
      </div>

      {/* Exchange Rate Info */}
      {getCurrentRate() > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">
              Exchange Rate 
              {calculationMode !== 'live' && (
                <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                  calculationMode === 'custom' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                }`}>
                  {calculationMode === 'custom' ? 'Custom' : 'Scenario'}
                </span>
              )}
            </div>
            <div className="text-lg font-medium">
              1 {fromCurrency} = {getCurrentRate().toFixed(4)} {toCurrency}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="text-sm text-gray-600 mb-1">Reverse Rate</div>
            <div className="text-lg font-medium">
              1 {toCurrency} = {getReverseRate().toFixed(4)} {fromCurrency}
            </div>
          </div>
        </div>
      )}

      {/* Comparison with Market Rate */}
      {(calculationMode === 'custom' || calculationMode === 'scenario') && customRate && exchangeRates[toCurrency] && (
        <div className="mb-6">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-yellow-700 mb-1">Market vs Your Rate</div>
                <div className="text-sm">
                  Market: 1 {fromCurrency} = {exchangeRates[toCurrency].toFixed(4)} {toCurrency}
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${
                  parseFloat(customRate) > exchangeRates[toCurrency] ? 'text-green-600' : 'text-red-600'
                }`}>
                  {parseFloat(customRate) > exchangeRates[toCurrency] ? '+' : ''}
                  {(((parseFloat(customRate) - exchangeRates[toCurrency]) / exchangeRates[toCurrency]) * 100).toFixed(2)}%
                </div>
                <div className="text-xs text-gray-600">
                  {parseFloat(customRate) > exchangeRates[toCurrency] ? 'Better rate' : 'Lower rate'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Refresh Button */}
      <div className="text-center mb-6">
        <button
          onClick={fetchExchangeRates}
          disabled={loading}
          className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-lg hover:from-green-600 hover:to-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50"
        >
          <svg className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          <span>{loading ? 'Updating...' : 'Refresh Rates'}</span>
        </button>
      </div>

      {/* Last Updated & Disclaimer */}
      {lastUpdated && (
        <div className="text-center text-sm text-gray-500 mb-4">
          Rates last updated: {lastUpdated}
        </div>
      )}
      
      {/* Exchange Rate Disclaimer */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm">
        <div className="flex items-start">
          <svg className="w-5 h-5 text-amber-600 mr-2 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 13.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
          <div>
            <div className="font-medium text-amber-800 mb-1">Exchange Rate Disclaimer</div>
            <div className="text-amber-700 space-y-1">
              <p>• Rates are provided by ExchangeRate-API and are for informational purposes only</p>
              <p>• Actual trading rates may differ from displayed rates due to market spreads and timing</p>
              <p>• For critical financial decisions, please verify rates with your bank or financial institution</p>
              <p>• Rates may differ from other providers (OANDA, XE, etc.) due to different data sources and update frequencies</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}