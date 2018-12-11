(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (factory((global.rtlDetect = {})));
}(this, (function (exports) { 'use strict';

    /**
     * Copyright 2015, Yahoo! Inc.
     * Copyrights licensed under the New BSD License. See the accompanying LICENSE file for terms.
     */
    // Private functions - star
    const _escapeRegExpPattern = function (str) {
      if (typeof str !== 'string') {
        return str;
      }

      return str.replace(/([\.\*\+\^\$\[\]\\\(\)\|\{\}\,\-\:\?])/g, '\\$1'); // eslint-disable-line no-useless-escape
    };
    const _toLowerCase = function (str, reserveReturnValue) {
      if (typeof str !== 'string') {
        return reserveReturnValue && str;
      }

      return str.toLowerCase();
    };
    const _toUpperCase = function (str, reserveReturnValue) {
      if (typeof str !== 'string') {
        return reserveReturnValue && str;
      }

      return str.toUpperCase();
    };
    const _trim = function (str, delimiter, reserveReturnValue) {
      var patterns = [];
      var regexp;

      var addPatterns = function (pattern) {
        // Build trim RegExp pattern and push it to patterns array
        patterns.push('^' + pattern + '+|' + pattern + '+$');
      }; // fix reserveReturnValue value


      if (typeof delimiter === 'boolean') {
        reserveReturnValue = delimiter;
        delimiter = null;
      }

      if (typeof str !== 'string') {
        return reserveReturnValue && str;
      } // Trim based on delimiter array values


      if (Array.isArray(delimiter)) {
        // Loop through delimiter array
        delimiter.map(function (item) {
          // Escape delimiter to be valid RegExp Pattern
          var pattern = _escapeRegExpPattern(item); // Push pattern to patterns array


          addPatterns(pattern);
        });
      } // Trim based on delimiter string value


      if (typeof delimiter === 'string') {
        // Escape delimiter to be valid RegExp Pattern
        var patternDelimiter = _escapeRegExpPattern(delimiter); // push pattern to patterns array


        addPatterns(patternDelimiter);
      } // If delimiter  is not defined, Trim white spaces


      if (!delimiter) {
        // Push white space pattern to patterns array
        addPatterns('\\s');
      } // Build RegExp pattern


      var pattern = '(' + patterns.join('|') + ')'; // Build RegExp object

      regexp = new RegExp(pattern, 'g'); // trim string for all patterns

      while (str.match(regexp)) {
        str = str.replace(regexp, '');
      } // Return trim string


      return str;
    };
    const _parseLocale = function (strLocale) {
      // parse locale regex object
      var regex = /^([a-zA-Z]*)([_\-a-zA-Z]*)$/;
      var matches = regex.exec(strLocale); // exec regex

      var parsedLocale;
      var lang;
      var countryCode;

      if (!strLocale || !matches) {
        return;
      } // fix countryCode string by trimming '-' and '_'


      matches[2] = _trim(matches[2], ['-', '_']);
      lang = _toLowerCase(matches[1]);
      countryCode = _toUpperCase(matches[2]) || countryCode; // object with lang, countryCode properties

      parsedLocale = {
        lang: lang,
        countryCode: countryCode
      }; // return parsed locale object

      return parsedLocale;
    }; // Private functions - End
    // Public functions - star

    const isRtlLang = function (strLocale) {
      var objLocale = _parseLocale(strLocale);

      if (!objLocale) {
        return;
      } // return true if the intel string lang exists in the BID RTL LANGS array else return false


      return _BIDI_RTL_LANGS.indexOf(objLocale.lang) >= 0;
    };
    const getLangDir = function (strLocale) {
      // return 'rtl' if the intel string lang exists in the BID RTL LANGS array else return 'ltr'
      return isRtlLang(strLocale) ? 'rtl' : 'ltr';
    }; // Public functions - End
    // Const BIDI_RTL_LANGS Array
    // BIDI_RTL_LANGS ref: http://en.wikipedia.org/wiki/Right-to-left
    // Table of scripts in Unicode: https://en.wikipedia.org/wiki/Script_(Unicode)

    const _BIDI_RTL_LANGS = ['ae',
    /* Avestan */
    'ar',
    /* 'العربية', Arabic */
    'arc',
    /* Aramaic */
    'bcc',
    /* 'بلوچی مکرانی', Southern Balochi */
    'bqi',
    /* 'بختياري', Bakthiari */
    'ckb',
    /* 'Soranî / کوردی', Sorani */
    'dv',
    /* Dhivehi */
    'fa',
    /* 'فارسی', Persian */
    'glk',
    /* 'گیلکی', Gilaki */
    'he',
    /* 'עברית', Hebrew */
    'ku',
    /* 'Kurdî / كوردی', Kurdish */
    'mzn',
    /* 'مازِرونی', Mazanderani */
    'nqo',
    /* N'Ko */
    'pnb',
    /* 'پنجابی', Western Punjabi */
    'ps',
    /* 'پښتو', Pashto, */
    'sd',
    /* 'سنڌي', Sindhi */
    'ug',
    /* 'Uyghurche / ئۇيغۇرچە', Uyghur */
    'ur',
    /* 'اردو', Urdu */
    'yi'
    /* 'ייִדיש', Yiddish */
    ];

    exports.isRtlLang = isRtlLang;
    exports.getLangDir = getLangDir;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
