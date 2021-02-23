"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _server = _interopRequireDefault(require("react-dom/server"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Generate Column structure from data if not passed 
 * @param {*} data table data
 */
var getCol = function getCol(data) {
  var firstObj = data.length > 0 ? data[0] : {};
  var columns = [];

  for (var key in firstObj) {
    if (firstObj.hasOwnProperty(key) && _typeof(firstObj[key]) != "object") {
      columns.push({
        key: key,
        title: key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").toUpperCase()
      });
    }
  }

  return columns;
};
/**
 * Table data search
 * @param query search input
 * @param col Columns
 * @param data Table data
 */


var queryCheck = function queryCheck(query, col, data) {
  if (!query) {
    return data;
  }

  var colVal;
  var queryRegex = new RegExp(query, "i");
  return data.filter(function (row) {
    var _iterator = _createForOfIteratorHelper(col),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var _ReactDOMServer$rende, _row$val$key, _colVal;

        var val = _step.value;
        colVal = val.format ? (_ReactDOMServer$rende = _server["default"].renderToStaticMarkup(val.format(row))) === null || _ReactDOMServer$rende === void 0 ? void 0 : _ReactDOMServer$rende.replace(/<[^>]*>?/gm, '') : (_row$val$key = row[val.key]) === null || _row$val$key === void 0 ? void 0 : _row$val$key.toString();

        if ((_colVal = colVal) !== null && _colVal !== void 0 && _colVal.match(queryRegex)) {
          return true;
        }
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return false;
  });
};

var SimpleTable = function SimpleTable(_ref) {
  var data = _ref.data,
      columns = _ref.columns,
      rowPerPage = _ref.rowPerPage,
      searchBox = _ref.searchBox;

  /* Set React Component State */
  var _useState = (0, _react.useState)({
    pg: 1,
    query: ""
  }),
      _useState2 = _slicedToArray(_useState, 2),
      table = _useState2[0],
      setTable = _useState2[1];

  var tableRef = /*#__PURE__*/(0, _react.createRef)();
  var tableCol = columns !== null && columns !== void 0 ? columns : getCol(data);
  var tableData = queryCheck(table.query, tableCol, _toConsumableArray(data));
  var firstRun = (0, _react.useRef)({
    status: true,
    pg: table.pg
  });
  /* Auto scroll to top on new page */

  (0, _react.useEffect)(function () {
    if (firstRun.current.status) {
      firstRun.current.status = !firstRun.current.status;
    } else if (firstRun.current.pg !== table.pg) {
      tableRef.current.scrollIntoView({
        behavior: 'smooth'
      });
      firstRun.current.pg = table.pg;
    }
  }, [table.pg, tableRef]);
  /* Generate Columns Titles */

  var colTitle = [];
  tableCol.forEach(function (_ref2, i) {
    var title = _ref2.title;
    colTitle.push( /*#__PURE__*/_react["default"].createElement("th", {
      key: "th-".concat(i),
      className: "border-top-0"
    }, title));
  });
  var records = [];
  var start = 0;
  var total = 0;
  var showing = 0;
  /* Generate Rows */

  start = (table.pg - 1) * rowPerPage;
  total = tableData.length;
  var max = start + rowPerPage;

  var _loop = function _loop(i) {
    records[i] = function () {
      var row = [];
      tableCol.forEach(function (_ref3, j) {
        var key = _ref3.key,
            format = _ref3.format;

        /* Table Columns */
        if (format && typeof format === "function") {
          row.push( /*#__PURE__*/_react["default"].createElement("td", {
            key: "td-".concat(i).concat(j),
            style: {
              verticalAlign: "middle"
            }
          }, format(_objectSpread(_objectSpread({}, tableData[i]), {}, {
            _index: i
          }))));
        } else if (_typeof(tableData[i][key]) != "object") {
          row.push( /*#__PURE__*/_react["default"].createElement("td", {
            key: "td-".concat(i).concat(j),
            style: {
              verticalAlign: "middle"
            }
          }, tableData[i][key]));
        }
      });
      return /*#__PURE__*/_react["default"].createElement("tr", {
        key: "tr-".concat(i)
      }, row);
    }();

    showing = i + 1;
  };

  for (var i = start; i < total && i < max; i++) {
    _loop(i);
  }
  /* Pagination */


  var items = [];
  var addSpaceBefore = true;
  var addSpaceAfter = true;
  var maxPage = tableData.length > 0 ? Math.ceil(tableData.length / rowPerPage) : 1;
  /* Prevent Showing non existing page */

  if (table.pg > maxPage) {
    setTable(_objectSpread(_objectSpread({}, table), {}, {
      pg: maxPage
    }));
  }

  var goToPage = function goToPage(pgNumb) {
    return function (e) {
      e.preventDefault();
      setTable(_objectSpread(_objectSpread({}, table), {}, {
        pg: pgNumb
      }));
    };
  };

  items.push( /*#__PURE__*/_react["default"].createElement("li", {
    className: "page-item",
    key: "pg-0",
    style: {
      marginRight: "0.5rem"
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "page-link",
    style: {
      cursor: "pointer"
    },
    onClick: goToPage(table.pg === 1 ? 1 : table.pg - 1)
  }, "<")));
  /* pagination Links and spacing */

  for (var j = 1; j <= maxPage; j++) {
    if (j === table.pg) {
      items.push( /*#__PURE__*/_react["default"].createElement("li", {
        className: "page-item active",
        key: "pg-".concat(j),
        style: {
          marginRight: "0.5rem"
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "page-link"
      }, j)));
    } else if (j === 1 || j === maxPage || j >= table.pg - 3 && j <= table.pg + 3) {
      items.push( /*#__PURE__*/_react["default"].createElement("li", {
        className: "page-item",
        key: "pg-".concat(j),
        style: {
          marginRight: "0.5rem"
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "page-link",
        style: {
          cursor: "pointer"
        },
        onClick: goToPage(j)
      }, j)));
    } else if (j < table.pg - 3 && addSpaceBefore) {
      items.push( /*#__PURE__*/_react["default"].createElement("li", {
        className: "page-item disabled",
        key: "pg-".concat(j),
        style: {
          marginRight: "0.5rem"
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "page-link disabled"
      }, "...")));
      addSpaceBefore = false;
    } else if (j > table.pg + 3 && addSpaceAfter) {
      items.push( /*#__PURE__*/_react["default"].createElement("li", {
        className: "page-item disabled",
        key: "pg-".concat(j),
        style: {
          marginRight: "0.5rem"
        }
      }, /*#__PURE__*/_react["default"].createElement("span", {
        className: "page-link disabled"
      }, "...")));
      addSpaceAfter = false;
    }
  }

  items.push( /*#__PURE__*/_react["default"].createElement("li", {
    className: "page-item",
    key: "pg-".concat(maxPage + 1),
    style: {
      marginRight: "0.5rem"
    }
  }, /*#__PURE__*/_react["default"].createElement("span", {
    className: "page-link",
    style: {
      cursor: "pointer"
    },
    onClick: goToPage(maxPage > table.pg ? table.pg + 1 : table.pg)
  }, ">")));
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "simple-react-table"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "table-responsive py-5",
    ref: tableRef
  }, searchBox ? /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("input", {
    type: "search",
    placeholder: "Search",
    className: "form-control",
    style: {
      maxWidth: "220px",
      "float": "right",
      marginBottom: "0.5rem"
    },
    onInput: function onInput(e) {
      var _e$currentTarget$valu;

      return setTable(_objectSpread(_objectSpread({}, table), {}, {
        query: (_e$currentTarget$valu = e.currentTarget.value) === null || _e$currentTarget$valu === void 0 ? void 0 : _e$currentTarget$valu.trim()
      }));
    }
  })) : "", /*#__PURE__*/_react["default"].createElement("table", {
    className: "table"
  }, /*#__PURE__*/_react["default"].createElement("thead", {
    className: "text-muted"
  }, /*#__PURE__*/_react["default"].createElement("tr", null, colTitle)), /*#__PURE__*/_react["default"].createElement("tbody", null, records.length === 0 ? /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    className: "text-center p-4",
    colSpan: "9"
  }, "No ", table.query === "" ? "Record" : "Match", " Found")) : records))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "px-3 row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-sm-8"
  }, /*#__PURE__*/_react["default"].createElement("ul", {
    className: "pagination pagination-sm"
  }, items)), /*#__PURE__*/_react["default"].createElement("div", {
    className: "text-right col"
  }, "Showing ", showing, " of ", total, " ", data && data.length > total ? "(filtered from ".concat(data.length, " total)") : "")));
};

SimpleTable.defaultProps = {
  data: [],
  rowPerPage: 10,
  searchBox: true
};
SimpleTable.propTypes = {
  data: _propTypes["default"].array,
  rowPerPage: _propTypes["default"].number,
  columns: _propTypes["default"].array,
  searchBox: _propTypes["default"].bool
};
var _default = SimpleTable;
exports["default"] = _default;