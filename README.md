# Bifrost i18n

```javascript
t(x, options)
```

## Setup

```javascript
import { bifrost } from 'bifrost-i18n';
import { en, no } from './dictionaries.js';

const t = bifrost({
  language: 'nb-NO',
  dictionaries: new Map([
    ['nb-NO', no],
    ['en-GB', en],
  ]),
});
```

```javascript
const en = new Map([
  ['key', 'value'],

  // Simple replace
  ['get-the-*': 'get the _'],

  // Replace in specific order
  ['from-*-to-*': 'from _2 to _1'],

  // Simple plural
  ['fetch-updates': {
    'one': 'fetch update',
    'other': 'fetch updates',
  }],

  // Multiple plurals
  ['tomatoes-and-cucumbers', new Map([
    ['one/one', 'tomato and cucumber'],
    ['one/other', 'tomato and cucumbers'],
    ['other/one', 'tomatoes and cucumber'],
    ['other/other', 'tomatoes and cucumbers'],
  ])],

  // Plural, but it's for ordinals only
  ['the-nth-update', new Map([
    ['|one', 'the first update'],
    ['|two', 'the second update'],
    ['|few', 'the third update'],
    ['|many', 'the forth update'],
    ['|other', 'the _th update'],
  ])],

  // Combined cardinal and ordinal plurals
  ['n-iron-bars-and-n-gold-coins-for-my-nth-legandry-sword-on-my-nth-character': new Map([
    ['one/other|few/two', '_ iron ore and _ gold coins for my _rd legendary sword on my _nd character'],
    ...allOtherCombinations,
  ])],
]);

export { en };
```

#### Notes on setup:

- When specifying languages, use a [BCP 47 language tag](https://www.w3.org/International/articles/language-tags/).
- `language` is only used to translate numbers and other non dictionary translations. 
- `dictionaries` determines the order in which Bifrost should look for strings. In the example above, it would first look in the Norwegian dictionary, then the English one. If none are found, it'll return an empty string.

## Use

### Translate strings

If key is string, the options are (in order):

1. Array of replacement words
2. Array of cardinal numbers matching string in dictionary
3. Array of ordinal numbers matching string in dictionary

```javascript
t('key', [[/*1.*/][/*2.*/][/*3.*/]]);
```

In object form, the options are:

```javascript
t('key', {
  replacements: [/*1.*/],
  cardinals: [/*2.*/],
  ordinals: [/*3.*/],
});
```


#### English:

```javascript
t('key');
//=> "value"
```

```javascript
t('get-the-*', [['gin']]);
//=> "get the gin"
```

```javascript
t('from-*-to-*', [['London', 'Oslo']]);
//=> "from Oslo to London"
```

```javascript
t('fetch-updates', [,[1]]);
//=> "fetch update"
```

```javascript
t('fetch-updates', [,[9]]);
//=> "fetch updates"
```

```javascript
t('tomatoes-and-cucumbers', [,[1, 3]]);
//=> "tomato and cucumbers"
```

```javascript
t('the-nth-update', [,,[2]]);
//=> "the second update"
```

```javascript
t('the-nth-update', [[7],,[7]]);
//=> "the 7th update"
```

Optionally, in object form:

```javascript
t('the-nth-update', {
  replacements: [7],
  ordinals: [7],
});
//=> "the 7th update"
```

### Translate numbers

#### English:
```javascript
t(500000);
//=> "500,000"
```

```javascript
t(3.14);
//=> "3.14"
```

#### Norwegian:
```javascript
t(500000);
//=> "500 000"
```

```javascript
t(3.14);
//=> "3,14"
```

### Dates

_Coming_
