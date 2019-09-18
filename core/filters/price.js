import { currentStoreView } from '@vue-storefront/core/lib/multistore';

const formatValue = (value, locale) => {
  const price = Math.abs(parseFloat(value));

  return price.toLocaleString(locale, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

const applyCurrencySign = (formattedPrice, { currencySign, currencySignPlacement, currencySignSpacing }) => {
  currencySignSpacing = currencySignSpacing ? ' ' : ''
  if (currencySignPlacement === 'append') {
    return `${formattedPrice}${currencySignSpacing}${currencySign}`
  }

  return `${currencySign}${currencySignSpacing}${formattedPrice}`
}

/**
 * Converts number to price string
 * @param {Number} value
 */
export function price (value) {
  if (isNaN(value)) {
    return value;
  }
  const storeView = currentStoreView();
  const { defaultLocale, currencySign, currencySignPlacement, currencySignSpacing } = storeView.i18n

  const formattedValue = formatValue(value, defaultLocale);
  const valueWithSign = applyCurrencySign(formattedValue, { currencySign, currencySignPlacement, currencySignSpacing })

  if (value >= 0) {
    return valueWithSign;
  } else {
    return '-' + valueWithSign;
  }
}
