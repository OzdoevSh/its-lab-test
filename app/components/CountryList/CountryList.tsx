'use client';

import React, { useEffect, useState } from 'react';
import SegmentButton from '../ui/SegmentButton';

interface Country {
  name: string;
  currencies: string[];
}

interface Currency {
  name: string;
  countries: string[];
}

interface CountryListProps {
  countries: Country[];
  currencies: Currency[];
}

const CountryList: React.FC<CountryListProps> = ({ countries, currencies }) => {
  const [mode, setMode] = useState<'country' | 'currency'>('country');
  const [activeCountries, setActiveCountries] = useState<Record<string, boolean>>({});
  const [activeCurrencies, setActiveCurrencies] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const storedActiveCountries = JSON.parse(localStorage.getItem('activeCountries') || '{}');
    const storedActiveCurrencies = JSON.parse(localStorage.getItem('activeCurrencies') || '{}');
    setActiveCountries(storedActiveCountries);
    setActiveCurrencies(storedActiveCurrencies);
  }, []);

  const handleToggle = (type: 'country' | 'currency', key: string) => {
    const stateMap = {
      country: {
        state: activeCountries,
        setState: setActiveCountries,
        storageKey: 'activeCountries',
      },
      currency: {
        state: activeCurrencies,
        setState: setActiveCurrencies,
        storageKey: 'activeCurrencies',
      },
    };

    const { state, setState, storageKey } = stateMap[type];

    const newState = {
      ...state,
      [key]: !state[key],
    };

    setState(newState);
    localStorage.setItem(storageKey, JSON.stringify(newState));
  };

  return (
    <div className="p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Список стран и валют</h1>

      <SegmentButton
        options={[
          { value: 'country', label: 'Страна+Валюты' },
          { value: 'currency', label: 'Валюта+Страны' },
        ]}
        selectedValue={mode}
        onChange={value => setMode(value as 'country' | 'currency')}
      />

      {mode === 'country' ? (
        <ul className="space-y-3">
          {countries.map(country => (
            <li key={country.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">
                <span className="font-semibold">{country.name}</span> - {country.currencies.join(', ')}
              </span>
              <input
                type="checkbox"
                checked={!!activeCountries[country.name]}
                onChange={() => handleToggle('country', country.name)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
            </li>
          ))}
        </ul>
      ) : (
        <ul className="space-y-3">
          {currencies.map(currency => (
            <li key={currency.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">
                <span className="font-semibold">{currency.name}</span> - {currency.countries.join(', ')}
              </span>
              <input
                type="checkbox"
                checked={!!activeCurrencies[currency.name]}
                onChange={() => handleToggle('currency', currency.name)}
                className="form-checkbox h-5 w-5 text-blue-600 rounded"
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CountryList;
