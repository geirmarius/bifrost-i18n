const pluralKey = ({ formatter, numbers }) => {
  return numbers
    .map(number => formatter.select(number))
    .join('&');
}

const splitKey = (key) => {
  return key
    .replace(/\s/g, '')
    .split('|');
}

const findInDictionaries = ({ key, languageSets, options }) => {
  for (const entry of languageSets) {
    const language = entry[0];
    const value = entry[1].dictionary.get(key);

    if (!value) continue;

    switch (Object.prototype.toString.call(value)) {
      case '[object String]': {
        return value;
      }

      case '[object Map]': {
        const languageSet = languageSets.get(language);

        const cardinalKey = pluralKey({
          formatter: languageSet.cardinalRules,
          numbers: options[1] || options.cardinals || [],
        })

        const ordinalKey = pluralKey({
          formatter: languageSet.ordinalRules,
          numbers: options[2] || options.ordinals || [],
        })

        for (const entry of value) {
          const cardinalIndex = cardinalKey.indexOf(splitKey(entry[0])[0]);
          const ordinalIndex = ordinalKey.indexOf(splitKey(entry[0])[1]);

          if (~cardinalIndex && ~ordinalIndex) {
            return entry[1];
          }
        }

        throw new ReferenceError(`Missing key '${cardinalKey}|${ordinalKey}' in '${key}'`);
      }
    }
  }
}

const replaceValues = ({ value, replacements }) => {
  let index = 0;

  return value
    .replace(/_(\d)+/g, (match, offset, string) => {
      index++;
      return replacements[Number(match.substring(1)) - 1];
    })
    .replace(/_/g, (match, offset, string) => {
      return replacements[index++];
    });
}

const dictionaryLookup = ({ languageSets, key, options }) => {
  const value = findInDictionaries({ key, languageSets, options });
  let index = 0;

  if (options && ((options[0] && options[0].length) || options.replacements)) {
    return replaceValues({
      value,
      replacements: options[0] || options.replacements,
    });
  }

  return value;
}

export default dictionaryLookup;