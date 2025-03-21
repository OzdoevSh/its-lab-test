import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import CountryList from '../components/CountryList';
import '@testing-library/jest-dom';

const mockCountries = [
  { name: 'United States', currencies: ['USD'] },
  { name: 'European Union', currencies: ['EUR'] },
];

const mockCurrencies = [
  { name: 'USD', countries: ['United States'] },
  { name: 'EUR', countries: ['European Union'] },
];

describe('CountryList', () => {
  it('рендерит список стран и валют', () => {
    render(<CountryList countries={mockCountries} currencies={mockCurrencies} />);

    expect(screen.getByText('Список стран и валют')).toBeInTheDocument();

    expect(screen.getByText(/United States/)).toBeInTheDocument();
    expect(screen.getByText(/USD/)).toBeInTheDocument();

    expect(screen.getByText(/European Union/)).toBeInTheDocument();
    expect(screen.getByText(/EUR/)).toBeInTheDocument();
  });

  it('переключает режим отображения на "валюта+страны"', () => {
    render(<CountryList countries={mockCountries} currencies={mockCurrencies} />);

    const switchButton = screen.getByText('Валюта+Страны');
    fireEvent.click(switchButton);

    expect(screen.getByText(/USD/)).toBeInTheDocument();
    expect(screen.getByText(/United States/)).toBeInTheDocument();

    expect(screen.getByText(/EUR/)).toBeInTheDocument();
    expect(screen.getByText(/European Union/)).toBeInTheDocument();
  });

  it('активирует/деактивирует страну', () => {
    render(<CountryList countries={mockCountries} currencies={mockCurrencies} />);

    const checkboxes = screen.getAllByRole('checkbox');
    const checkbox = checkboxes[0]; // Первый чекбокс
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });

  it('активирует/деактивирует валюту', () => {
    render(<CountryList countries={mockCountries} currencies={mockCurrencies} />);

    const switchButton = screen.getByText('Валюта+Страны');
    fireEvent.click(switchButton);

    const checkboxes = screen.getAllByRole('checkbox');
    const checkbox = checkboxes[0]; // Первый чекбокс
    fireEvent.click(checkbox);

    expect(checkbox).toBeChecked();
  });
});
