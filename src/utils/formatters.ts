import { Currency } from '../types';
import { EXCHANGE_RATES, CURRENCY_SYMBOLS } from '../data/mockData';

export function formatPrice(amountInTnd: number, currency: Currency = 'TND'): string {
  const rate = EXCHANGE_RATES[currency] || 1;
  const converted = amountInTnd * rate;
  const symbol = CURRENCY_SYMBOLS[currency] || 'DT';

  if (currency === 'TND') {
    return `${converted.toFixed(2)} ${symbol}`;
  } else if (currency === 'EUR') {
    return `${converted.toFixed(2)} ${symbol}`;
  } else {
    return `${symbol}${converted.toFixed(2)}`;
  }
}
