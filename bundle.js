/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_node_modules_sass_loader_dist_cjs_js_base_scss__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "[aria-hidden=true] {\n  display: none;\n}\n\n#pastTrips, #upcomingTrips, #pendingTrips {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n}\n\narticle {\n  background-color: lightblue;\n  margin-bottom: 1em;\n  width: 250px;\n}\narticle h3, article p {\n  padding: 0 1em;\n}\narticle img {\n  width: 250px;\n  height: 150px;\n}\n\nh1 {\n  float: right;\n  padding-left: 1em;\n}\n\nh2 {\n  margin-top: 2em;\n}\n\n#request {\n  margin: 1em auto;\n  display: block;\n}\n\nbutton {\n  margin-bottom: 1em;\n}\n\nform {\n  background-color: lightblue;\n  padding: 1em;\n  margin-bottom: 1em;\n}\nform input, form select {\n  margin: 0 auto 1em;\n  display: block;\n}\nform label {\n  text-align: center;\n  display: block;\n  clear: left;\n}\n\narticle, form {\n  box-shadow: 0px 0px 4px 1px black;\n}\n\n#amountSpentLastYear {\n  text-align: center;\n  margin: 1em auto;\n}\n\n.login-wrapper {\n  max-width: 150px;\n  margin: 8em auto;\n}\n.login-wrapper input {\n  margin-bottom: 1em;\n}\n.login-wrapper label {\n  clear: left;\n  display: block;\n}\n.login-wrapper > * {\n  margin: auto;\n  display: block;\n}\n\n.no-trip, #amountSpentLastYear {\n  padding: 1em;\n  text-align: center;\n}", "",{"version":3,"sources":["webpack://./src/css/base.scss"],"names":[],"mappings":"AAAA;EACE,aAAA;AACF;;AAEA;EACE,aAAA;EACA,eAAA;EACA,6BAAA;AACF;;AAEA;EACE,2BAAA;EACA,kBAAA;EACA,YAAA;AACF;AAAE;EACE,cAAA;AAEJ;AAAE;EACE,YAAA;EACA,aAAA;AAEJ;;AAEA;EACE,YAAA;EACA,iBAAA;AACF;;AAEA;EACE,eAAA;AACF;;AAEA;EACE,gBAAA;EACA,cAAA;AACF;;AAEA;EACE,kBAAA;AACF;;AAEA;EACE,2BAAA;EACA,YAAA;EACA,kBAAA;AACF;AAAE;EACE,kBAAA;EACA,cAAA;AAEJ;AAAE;EACE,kBAAA;EACA,cAAA;EACA,WAAA;AAEJ;;AAEA;EACE,iCAAA;AACF;;AAEA;EACE,kBAAA;EACA,gBAAA;AACF;;AAEA;EACE,gBAAA;EACA,gBAAA;AACF;AAAE;EACE,kBAAA;AAEJ;AAAE;EACE,WAAA;EACA,cAAA;AAEJ;AAAE;EACE,YAAA;EACA,cAAA;AAEJ;;AAEA;EACE,YAAA;EACA,kBAAA;AACF","sourcesContent":["[aria-hidden=true] {\n  display: none;\n}\n\n#pastTrips, #upcomingTrips, #pendingTrips {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: space-around;\n}\n\narticle {\n  background-color: lightblue;\n  margin-bottom: 1em;\n  width: 250px;\n  h3, p {\n    padding: 0 1em;\n  }\n  img {\n    width: 250px;\n    height: 150px;\n  }\n}\n\nh1 {\n  float: right;\n  padding-left: 1em;\n}\n\nh2 {\n  margin-top: 2em;\n}\n\n#request {\n  margin: 1em auto;\n  display: block;\n}\n\nbutton {\n  margin-bottom: 1em;\n}\n\nform {\n  background-color: lightblue;\n  padding: 1em;\n  margin-bottom: 1em;\n  input, select {\n    margin: 0 auto 1em;\n    display: block;\n  }\n  label {\n    text-align: center;\n    display: block;\n    clear: left;\n  }\n}\n\narticle, form {\n  box-shadow: 0px 0px 4px 1px black;\n}\n\n#amountSpentLastYear {\n  text-align: center;\n  margin: 1em auto;\n}\n\n.login-wrapper {\n  max-width: 150px;\n  margin: 8em auto;\n  input {\n    margin-bottom: 1em;\n  }\n  label {\n    clear: left;\n    display: block;\n  }\n  > * {\n    margin: auto;\n    display: block;\n  }\n}\n\n.no-trip, #amountSpentLastYear {\n  padding: 1em;\n  text-align: center;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {



function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "travelersData": () => (/* binding */ travelersData),
/* harmony export */   "tripData": () => (/* binding */ tripData),
/* harmony export */   "destinationData": () => (/* binding */ destinationData),
/* harmony export */   "requestTrip": () => (/* binding */ requestTrip)
/* harmony export */ });
const getData = (fetchAPI) => {
  return fetch(`http://localhost:3001/api/v1/${fetchAPI}`)
              .then(response => response.json())
              .catch(e => console.log(e))
}





const requestTrip = (tripData) => {
  return fetch(`http://localhost:3001/api/v1/trips`,
    {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(tripData)
  })
  .then(response => {
    if (!response.ok) throw new Error('Please fill out all fields.');
    return response.json()
  })
  .catch(e => error.innerHTML += e)
}






const travelersData = getData('travelers');
const tripData = getData('trips');
const destinationData = getData('destinations');




/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "updateDom": () => (/* binding */ updateDom)
/* harmony export */ });
const myTrips = document.querySelector('#myTrips');
const pastTrips = document.querySelector('#pastTrips');
const upcomingTrips = document.querySelector('#upcomingTrips');
const pendingTrips = document.querySelector('#pendingTrips');
const amountSpentLastYear = document.querySelector('#amountSpentLastYear');
const selectDestination = document.querySelector('#selectDestination');
const requestTrip = document.querySelector('#requestTrip');
const requestSection = document.querySelector('#requestSection');
const request = document.querySelector('#request');
const userName = document.querySelector('#userName');


const toggleRequest = () => {
  if (request.ariaExpanded === 'false') {
    request.ariaExpanded = 'true';
    requestSection.ariaHidden = 'false';
  } else {
    request.ariaExpanded = 'false';
    requestSection.ariaHidden = 'true';
  }
}

const welcomeUser = (user) => {
  userName.innerHTML = user.name;
}

const updateDom = (user, destinations) => {
  welcomeUser(user);
  populateDashboard(user, destinations);
  populateDestinationList(destinations);
}

const populateDashboard = (user, destinations) => {
  displayTripArticles(user, destinations);
  displayAmountSpentThisYear(user, destinations);
}

const displayTripArticles = (user, destinations) => {
  let today = new Date();
  today = [today.getFullYear(), today.getMonth() + 1, today.getDate()].reduce((acc, val) => {
    val += '';
    if (val.length === 1) {
      val = '0' + val;
    }
    return [...acc, val];
  }, []).join('/');

  let travelerPastTrips = user.trips.filter(trip => trip.date <= today);
  let travelerUpcomingTrips = user.trips.filter(trip => trip.date >= today && trip.status === 'approved');
  let travelerPendingTrips = user.trips.filter(trip => trip.date >= today && trip.status === 'pending');

  if (!travelerPastTrips.length) {
    pastTrips.innerHTML += '<article class="no-trip">You don\'t have any past trips yet!</article>';
  } else {
    travelerPastTrips.forEach(trip => {
      pastTrips.innerHTML +=
      `<article>
        <img src='${destinations.destinations[trip.destinationID].image}' alt='${destinations.destinations[trip.destinationID].alt}'/>
        <h3>${destinations.destinations.find(destination => destination.id === trip.destinationID).destination}</h3>
        <p>Travelers: ${trip.travelers}</p>
        <p>Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <p>Status: ${trip.status}</p>
        <p>Total Cost: $${destinations.getCost(trip.destinationID, trip.duration, trip.travelers)}</p>
      </article>`;
    });
  }
  if (!travelerUpcomingTrips.length) {
    upcomingTrips.innerHTML += '<article class="no-trip">You don\'t have any upcoming trips at this time.</article>';
  } else {
    travelerUpcomingTrips.forEach(trip => {
      upcomingTrips.innerHTML +=
      `<article>
        <img src='${destinations.destinations[trip.destinationID].image}' alt='${destinations.destinations[trip.destinationID].alt}'/>
        <h3>${destinations.destinations.find(destination => destination.id === trip.destinationID).destination}</h3>
        <p>Travelers: ${trip.travelers}</p>
        <p>Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <p>Status: ${trip.status}</p>
        <p>Total Cost: $${destinations.getCost(trip.destinationID, trip.duration, trip.travelers)}</p>
      </article>`;
    });
  }
  if (!travelerPendingTrips.length) {
    pendingTrips.innerHTML += '<article class="no-trip">You do not have any pending trips at this time.</article>';
  } else {
    travelerPendingTrips.forEach(trip => {
      pendingTrips.innerHTML +=
      `<article>
        <img src='${destinations.destinations[trip.destinationID].image}' alt='${destinations.destinations[trip.destinationID].alt}'/>
        <h3>${destinations.destinations.find(destination => destination.id === trip.destinationID).destination}</h3>
        <p>Travelers: ${trip.travelers}</p>
        <p>Date: ${trip.date}</p>
        <p>Duration: ${trip.duration} days</p>
        <p>Status: ${trip.status}</p>
        <p>Total Cost: $${destinations.getCost(trip.destinationID, trip.duration, trip.travelers)}</p>
      </article>`;
    });
  }

}

const populateDestinationList = (destinations) => {
  destinations.destinations.forEach(destination => {
    selectDestination.innerHTML += `<option value='${destination.destination}'>${destination.destination}</option>`;
  });
}

const displayAmountSpentThisYear = (user, destinations) => {
  let today = new Date();
  amountSpentLastYear.querySelector('.amount').innerHTML = user.getYearlyAmountSpent(today.getFullYear(), destinations);
}

request.onclick = toggleRequest;




/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class Traveler {
  constructor(traveler, tripData) {
    this.id = traveler.id,
    this.name = traveler.name,
    this.travelerType = traveler.travelerType,
    this.trips = tripData.trips.filter(trip => trip.userID === this.id)
  }

  getYearlyAmountSpent(year, repo) {
    let yearlyTrips = this.trips.filter(trip => trip.date.includes(year) && trip.status === 'approved');
    let amountSpentThatYear = yearlyTrips.reduce((sum, trip) => {
      return sum + repo.getCost(trip.destinationID, trip.duration, trip.travelers);
    }, 0);
    return amountSpentThatYear;
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Traveler);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Traveler__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);


class TravelerRepository {
  constructor(travelerData, tripData) {
    this.travelers = travelerData.travelers.map(traveler => new _Traveler__WEBPACK_IMPORTED_MODULE_0__.default(traveler, tripData));
  }

  getTraveler(id) {
    return this.travelers.find(traveler => traveler.id === id);
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TravelerRepository);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
class DestinationRepository {
  constructor(data) {
    this.destinations = data.destinations;
  }

  getCost(id, numDays, numPeople) {
    let destination = this.destinations.find(location => location.id === id);
    let costOfLodging = destination.estimatedLodgingCostPerDay * numDays;
    let costOfFlights = destination.estimatedFlightCostPerPerson * numPeople;
    let cost = costOfLodging + costOfFlights;
    return Math.floor(cost * 1.1);
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (DestinationRepository);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_base_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCalls__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _js_Traveler__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
/* harmony import */ var _js_TravelerRepository__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _js_DestinationRepository__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);






const main = document.querySelector('main');

const fetchData = (id) => {
  Promise.all([_apiCalls__WEBPACK_IMPORTED_MODULE_1__.travelersData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.tripData, _apiCalls__WEBPACK_IMPORTED_MODULE_1__.destinationData]).then(data => {
    loadDashboard(data, id);
  });
}


const loadDashboard = (data, id) => {
  const travelers = new _js_TravelerRepository__WEBPACK_IMPORTED_MODULE_4__.default(data[0], data[1]);
  let currentUser = travelers.travelers[id - 1];
  const destinations = new _js_DestinationRepository__WEBPACK_IMPORTED_MODULE_5__.default(data[2]);
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.updateDom)(currentUser, destinations);

  const sendData = (e) => {
    e.preventDefault();
    let formData = new FormData(e.target);
    let nextID = 0;
    travelers.travelers.forEach(traveler => {
      traveler.trips.forEach(trip => {
        if (trip.id >= nextID) {
          nextID = trip.id + 1;
        }
      });
    });
    let destination = formData.get('destination');
    let requestedDestinationID = getDestinationID(destination, destinations);
    const newTripRequest = {
      id: nextID,
      userID: currentUser.id,
      destinationID: requestedDestinationID,
      travelers: formData.get('numTravelers'),
      date: formData.get('date'),
      duration: formData.get('duration'),
      status: "pending",
      suggestedActivities: [ ]
    }
    currentUser.trips.push(newTripRequest);
    (0,_domUpdates__WEBPACK_IMPORTED_MODULE_2__.updateDom)(currentUser, destinations);
    (0,_apiCalls__WEBPACK_IMPORTED_MODULE_1__.requestTrip)(newTripRequest);
    e.target.reset();
    estimatedCost.innerHTML = '';
  }

  const displayRequestedCost = (e) => {
    let inputs = e.target.closest('#requestSection').querySelectorAll('input');
    let formFilled = true;
    inputs.forEach(input => {
      if (input.type !== 'submit') {
        if (input.value === '') {
          formFilled = false;
        } else {
          formFilled = true;
        }
      }
    });
    if (formFilled) {
      calculateCost();
    }
  }

  const calculateCost = () => {
    let requestedTrip = new FormData(requestSection);
    let numTravelers = requestedTrip.get('numTravelers');
    let duration = requestedTrip.get('duration');
    let destination = requestedTrip.get('destination');
    let destinationID = getDestinationID(destination, destinations);
    let cost = destinations.getCost(destinationID, duration, numTravelers);
    estimatedCost.innerHTML = `Your estimated cost is $${cost}`;
  }

  requestSection.onsubmit = sendData;
  requestSection.onkeyup = displayRequestedCost;
  requestSection.onclick = displayRequestedCost;
}

const getDestinationID = (destination, destinations) => {
  let destinationName = destination;
  let requestedDestination = destinations.destinations.find(destination => destination.destination === destinationName)
  let requestedDestinationID = requestedDestination.id;
  return requestedDestinationID;
}

const attemptLogin = (e) => {
  e.preventDefault();
  let name = username.value.slice(0, 8);
  let id = username.value.slice(8);
  if (name === 'traveler' && password.value === 'travel' && id <= 50 && id > 0) {
    login.ariaHidden = 'true';
    fetchData(id);
    main.ariaHidden = 'false';
  } else {
    loginError.innerHTML = 'Please enter a valid username/password.';
  }
}

submitLogin.onclick = attemptLogin;
// window.onload = fetchData;

})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map