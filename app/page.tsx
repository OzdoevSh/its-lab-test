import CountryList from './components/CountryList';

const getCountries = async (): Promise<{ name: string; currencies: string[] }[]> => {
  return [
    { name: 'United States', currencies: ['USD'] },
    { name: 'Russian Federation', currencies: ['RUB', 'USD', 'EUR'] },
    { name: 'Belarus', currencies: ['BYN', 'RUB', 'EUR', 'USD'] },
    { name: 'Japan', currencies: ['JPY', 'USD'] },
    { name: 'United Kingdom', currencies: ['GBP', 'EUR', 'USD'] },
    { name: 'Canada', currencies: ['CAD', 'USD'] },
    { name: 'France', currencies: ['EUR', 'USD'] },
    { name: 'Germany', currencies: ['EUR', 'USD'] },
  ];
};

const getCurrencies = (countries: { name: string; currencies: string[] }[]) => {
  const currencyMap: Record<string, string[]> = {};

  countries.forEach(country => {
    country.currencies.forEach(currency => {
      if (!currencyMap[currency]) {
        currencyMap[currency] = [];
      }
      currencyMap[currency].push(country.name);
    });
  });

  return Object.entries(currencyMap).map(([name, countries]) => ({
    name,
    countries,
  }));
};

export default async function Home() {
  const countries = await getCountries();
  const currencies = getCurrencies(countries);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto">
        <CountryList countries={countries} currencies={currencies} />
      </div>
    </div>
  );
}
