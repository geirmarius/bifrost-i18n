# Bifrost i18n

WIP: No code available yet.

## Setup

```javascript
import { bifrost } from 'bifrost-i18n';
import { en, no } from './dictionaries.js';

const t = bifrost({
  lang: 'nb-NO',
  dictionaries: new Map([
    ['nb-NO', no],
    ['en-GB', en],
  ]),
});
```

```javascript
const en = {
  // Simple replace
  "get-the-*": "get the _",

  // Replace in specific order
  "from-*-to-*": "from _2 to _1",

  // Simple plural
  "fetch-updates": {
    "one": "fetch update",
    "other": "fetch updates",
  },

  // Multiple plurals
  "tomatoes-and-cucumbers": new Map([
    ["one/one", "tomato and cucumber"],
    ["one/other", "tomato and cucumbers"],
    ["other/one", "tomatoes and cucumber"],
    ["other/other", "tomatoes and cucumbers"],
  ]),

  // Plural, but it's for ordinals only
  "the-nth-update": new Map([
    ["o-one", "the first update"],
    ["o-two", "the second update"],
    ["o-few", "the third update"],
    ["o-many", "the forth update"],
    ["o-other", "the _th update"],
  ]),
};

export { en };
```

#### Notes on setup:

- When specifying languages, use a [BCP 47 language tag](https://www.w3.org/International/articles/language-tags/).
- `lang` is only used to translate numbers and other non dictionary translations. 
- `dictionaries` determines the order in which Bifrost should look for strings. In the example above, it would first look in the Norwegian dictionary, then the English one. If none are found, it'll return an empty string.
- With a JSON loader, you could import JSON files as JS files to use with Bifrost.

## Use

### Translate strings

If key is string, the options are (in order):

1. Array of replacement words
2. Array of cardinal numbers matching string in dictionary
3. Array of ordinal numbers matching string in dictionary

```javascript
t('key', [[/*1.*/][/*2.*/][/*3.*/]]);
```

or in object form:

```javascript
t('key', {
  replacements: [/*1.*/],
  cardinals: [/*2.*/],
  ordinals: [/*3.*/],
});
```


#### English:

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

Coming
