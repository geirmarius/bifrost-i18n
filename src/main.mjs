import dictionaryLookup from './dictionary-lookup.mjs';
import formatNumber from './format-number.mjs';

const bifrost = ({ language, dictionaries }) => {
  const languageSets = new Map();
  const numberFormatter = new Intl.NumberFormat(language);

  if (dictionaries) {
    for (const dictionaryEntry of dictionaries) {
      const language = dictionaryEntry[0];

      languageSets.set(language, {
        dictionary: dictionaryEntry[1],
        cardinalRules: new Intl.PluralRules(language, { type: 'cardinal' }),
        ordinalRules: new Intl.PluralRules(language, { type: 'ordinal' }),
      });
    }
  }

  return (key, options) => {
    switch (key.constructor) {
      case String:
        return dictionaryLookup({
          languageSets,
          key,
          options,
        });

      case Number:
        return formatNumber({
          numberFormatter,
          key,
        });

      default:
        throw new TypeError(`${key.constructor} is not a valid key type`);
    }
  };
};

export default bifrost;