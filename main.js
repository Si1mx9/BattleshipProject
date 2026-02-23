/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/Gameboard.js"
/*!**********************************!*\
  !*** ./src/modules/Gameboard.js ***!
  \**********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Ship */ "./src/modules/Ship.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Gameboard = /*#__PURE__*/function () {
  function Gameboard() {
    _classCallCheck(this, Gameboard);
    this.board = Array(10).fill(null).map(function () {
      return Array(10).fill(null);
    });
    this.missedAttacks = [];
    this.ships = [];
  }
  return _createClass(Gameboard, [{
    key: "placeShip",
    value: function placeShip(length, row, col, isVertical) {
      if (row < 0 || col < 0 || row >= 10 || col >= 10) {
        throw new Error('Out of bounds');
      }
      if (isVertical) {
        if (row + length > 10) throw new Error('Out of bounds');
        // optional: check overlapping
        for (var i = 0; i < length; i++) {
          if (this.board[row + i][col] !== null) throw new Error('Overlap');
        }
      } else {
        if (col + length > 10) throw new Error('Out of bounds');
        for (var _i = 0; _i < length; _i++) {
          if (this.board[row][col + _i] !== null) throw new Error('Overlap');
        }
      }
      var ship = new _Ship__WEBPACK_IMPORTED_MODULE_0__["default"](length);
      this.ships.push(ship);
      for (var _i2 = 0; _i2 < length; _i2++) {
        if (isVertical) {
          this.board[row + _i2][col] = ship;
        } else {
          this.board[row][col + _i2] = ship;
        }
      }
    }
  }, {
    key: "receiveAttack",
    value: function receiveAttack(row, col) {
      if (row < 0 || col < 0 || row >= 10 || col >= 10) {
        throw new Error('Out of bounds');
      }
      var target = this.board[row][col];
      if (target === 'hit' || target === 'miss') {
        return false; // Already attacked
      }
      if (target instanceof _Ship__WEBPACK_IMPORTED_MODULE_0__["default"]) {
        target.hit();
        this.board[row][col] = 'hit';
        return true; // Hit successful
      }
      this.board[row][col] = 'miss';
      this.missedAttacks.push([row, col]);
      return false; // Miss
    }
  }, {
    key: "allShipsSunk",
    value: function allShipsSunk() {
      if (this.ships.length === 0) return true;
      return this.ships.every(function (ship) {
        return ship.isSunk();
      });
    }
  }, {
    key: "getRemainingShips",
    value: function getRemainingShips() {
      return this.ships.filter(function (ship) {
        return !ship.isSunk();
      }).length;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);

/***/ },

/***/ "./src/modules/Player.js"
/*!*******************************!*\
  !*** ./src/modules/Player.js ***!
  \*******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Gameboard__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Gameboard */ "./src/modules/Gameboard.js");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }

var Player = /*#__PURE__*/function () {
  function Player() {
    var type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'human';
    _classCallCheck(this, Player);
    this.type = type;
    this.gameboard = new _Gameboard__WEBPACK_IMPORTED_MODULE_0__["default"]();
  }
  return _createClass(Player, [{
    key: "attack",
    value: function attack(enemyGameboard, row, col) {
      if (this.type !== 'human') throw new Error('Computer should use randomAttack');
      return enemyGameboard.receiveAttack(row, col);
    }
  }, {
    key: "randomAttack",
    value: function randomAttack(enemyGameboard) {
      if (this.type !== 'computer') throw new Error('Human should use attack');
      var availableMoves = [];
      for (var r = 0; r < 10; r++) {
        for (var c = 0; c < 10; c++) {
          var spot = enemyGameboard.board[r][c];
          if (spot !== 'hit' && spot !== 'miss') {
            availableMoves.push({
              row: r,
              col: c
            });
          }
        }
      }
      if (availableMoves.length === 0) return false;
      var randomIndex = Math.floor(Math.random() * availableMoves.length);
      var move = availableMoves[randomIndex];
      return enemyGameboard.receiveAttack(move.row, move.col);
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Player);

/***/ },

/***/ "./src/modules/Ship.js"
/*!*****************************!*\
  !*** ./src/modules/Ship.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var Ship = /*#__PURE__*/function () {
  function Ship(length) {
    _classCallCheck(this, Ship);
    this.length = length;
    this.hits = 0;
  }
  return _createClass(Ship, [{
    key: "hit",
    value: function hit() {
      this.hits++;
    }
  }, {
    key: "isSunk",
    value: function isSunk() {
      return this.hits >= this.length;
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);

/***/ },

/***/ "./src/ui/DOMController.js"
/*!*********************************!*\
  !*** ./src/ui/DOMController.js ***!
  \*********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var DOMController = /*#__PURE__*/function () {
  function DOMController() {
    _classCallCheck(this, DOMController);
    this.playerBoardEl = null;
    this.computerBoardEl = null;
    this.turnMessageEl = null;
    this.randomizeBtn = null;
    this.startBtn = null;
    this.restartBtn = null;
  }
  return _createClass(DOMController, [{
    key: "init",
    value: function init() {
      this.playerBoardEl = document.getElementById('player-board');
      this.computerBoardEl = document.getElementById('computer-board');
      this.turnMessageEl = document.getElementById('turn-message');
      this.randomizeBtn = document.getElementById('randomize-btn');
      this.startBtn = document.getElementById('start-btn');
      this.restartBtn = document.getElementById('restart-btn');
      this.fleetCountEl = document.querySelector('.fleet-count');
    }
  }, {
    key: "updateFleetStatus",
    value: function updateFleetStatus(count) {
      var fleetCountEl = document.querySelector('.fleet-count');
      if (fleetCountEl) {
        fleetCountEl.textContent = "".concat(count, " ship").concat(count !== 1 ? 's' : '');
      }
    }
  }, {
    key: "renderBoard",
    value: function renderBoard(boardEl, gameboard) {
      var isEnemy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
      boardEl.innerHTML = '';
      for (var r = 0; r < 10; r++) {
        for (var c = 0; c < 10; c++) {
          var cell = document.createElement('div');
          cell.classList.add('cell');
          cell.dataset.row = r;
          cell.dataset.col = c;
          var spot = gameboard.board[r][c];
          if (spot === 'hit') {
            cell.classList.add('hit');
          } else if (spot === 'miss') {
            cell.classList.add('miss');
          } else if (spot !== null && !isEnemy) {
            cell.classList.add('ship');
          }
          boardEl.appendChild(cell);
        }
      }
    }
  }, {
    key: "updateMessage",
    value: function updateMessage(msg) {
      this.turnMessageEl.textContent = msg;
    }
  }, {
    key: "showGameOver",
    value: function showGameOver(computerSectionEl) {
      computerSectionEl.classList.add('game-over');
      this.restartBtn.classList.remove('hidden');
      this.randomizeBtn.classList.add('hidden');
      this.startBtn.classList.add('hidden');
    }
  }, {
    key: "bindAttackHandler",
    value: function bindAttackHandler(handler) {
      this.computerBoardEl.addEventListener('click', function (e) {
        if (e.target.classList.contains('cell')) {
          var row = parseInt(e.target.dataset.row);
          var col = parseInt(e.target.dataset.col);
          handler(row, col);
        }
      });
    }
  }, {
    key: "bindRandomizeHandler",
    value: function bindRandomizeHandler(handler) {
      this.randomizeBtn.addEventListener('click', handler);
    }
  }, {
    key: "bindStartHandler",
    value: function bindStartHandler(handler) {
      this.startBtn.addEventListener('click', handler);
    }
  }, {
    key: "bindRestartHandler",
    value: function bindRestartHandler(handler) {
      this.restartBtn.addEventListener('click', handler);
    }
  }]);
}();
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (new DOMController());

/***/ },

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles.css"
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles.css ***!
  \**************************************************************/
(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, `:root {
  --bg-color: #0a0e17;
  --bg-secondary: #111827;
  --text-color: #e2e8f0;
  --text-muted: #94a3b8;
  --accent-color: #0ea5e9;
  --accent-glow: #38bdf8;
  --accent-secondary: #818cf8;
  --board-bg: rgba(17, 24, 39, 0.9);
  --cell-bg: rgba(30, 41, 59, 0.8);
  --cell-hover: rgba(56, 189, 248, 0.3);
  --ship-color: #fbbf24;
  --ship-glow: rgba(251, 191, 36, 0.5);
  --hit-color: #ef4444;
  --hit-glow: rgba(239, 68, 68, 0.6);
  --miss-color: #64748b;
  --success-color: #22c55e;
  --danger-color: #f43f5e;
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Rajdhani', 'Segoe UI', system-ui, sans-serif;
  background: var(--bg-color);
  color: var(--text-color);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
}

.ocean-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: 
    radial-gradient(ellipse at 20% 20%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),
    radial-gradient(ellipse at 80% 80%, rgba(129, 140, 248, 0.1) 0%, transparent 50%),
    linear-gradient(180deg, #0a0e17 0%, #0f172a 50%, #1e1b4b 100%);
  z-index: -1;
  animation: oceanPulse 8s ease-in-out infinite;
}

@keyframes oceanPulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.8; }
}

header {
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.title-wrapper {
  position: relative;
  display: inline-block;
}

h1 {
  font-family: 'Orbitron', sans-serif;
  font-size: 3.5rem;
  font-weight: 900;
  letter-spacing: 0.3rem;
  background: linear-gradient(135deg, var(--accent-glow), var(--accent-secondary), var(--accent-color));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(56, 189, 248, 0.3);
  animation: titleGlow 3s ease-in-out infinite;
}

@keyframes titleGlow {
  0%, 100% { filter: drop-shadow(0 0 20px rgba(56, 189, 248, 0.4)); }
  50% { filter: drop-shadow(0 0 30px rgba(56, 189, 248, 0.6)); }
}

.title-accent {
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 3px;
  background: linear-gradient(90deg, transparent, var(--accent-color), transparent);
  border-radius: 2px;
}

.subtitle {
  font-size: 1.1rem;
  color: var(--text-muted);
  letter-spacing: 0.5rem;
  text-transform: uppercase;
  margin-top: 0.5rem;
}

.message-container {
  margin-bottom: 1.5rem;
}

.message-box {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(17, 24, 39, 0.9));
  padding: 0.75rem 2rem;
  border-radius: 50px;
  border: 1px solid rgba(56, 189, 248, 0.2);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.message-icon {
  font-size: 1.5rem;
}

#turn-message {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--accent-glow);
}

.boards-wrapper {
  display: flex;
  align-items: center;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 1.5rem;
}

.board-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
}

.section-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.section-icon {
  font-size: 1.5rem;
}

h3 {
  font-family: 'Orbitron', sans-serif;
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--text-color);
  letter-spacing: 0.1rem;
  text-transform: uppercase;
}

.player-section h3 {
  color: var(--ship-color);
}

.computer-section h3 {
  color: var(--danger-color);
}

.board-container {
  position: relative;
}

.coord-labels {
  display: flex;
  font-size: 0.7rem;
  color: var(--text-muted);
  font-weight: 600;
}

.coord-labels.top {
  justify-content: space-around;
  padding-left: 1.5rem;
  padding-right: 0.25rem;
}

.coord-labels.left {
  flex-direction: column;
  justify-content: space-around;
  padding-top: 0.25rem;
  padding-bottom: 1.5rem;
}

.coord-labels.left span {
  height: 35px;
  display: flex;
  align-items: center;
}

.board-with-coords {
  display: flex;
}

.gameboard {
  display: grid;
  grid-template-columns: repeat(10, 38px);
  grid-template-rows: repeat(10, 38px);
  gap: 3px;
  background: var(--board-bg);
  padding: 12px;
  border-radius: 16px;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(56, 189, 248, 0.15);
}

.cell {
  width: 38px;
  height: 38px;
  background: var(--cell-bg);
  border-radius: 6px;
  transition: all 0.2s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(255, 255, 255, 0.03);
}

.cell.ship {
  background: linear-gradient(135deg, var(--ship-color), #f59e0b);
  box-shadow: 0 0 15px var(--ship-glow), inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.computer-section .cell.ship {
  background: var(--cell-bg);
  box-shadow: none;
}

.computer-section.game-over .cell.ship {
  background: linear-gradient(135deg, var(--ship-color), #f59e0b);
  box-shadow: 0 0 15px var(--ship-glow);
}

.cell:not(.hit):not(.miss):hover {
  background: var(--cell-hover);
  transform: scale(1.08);
  box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);
}

.cell.hit {
  background: linear-gradient(135deg, var(--hit-color), #dc2626);
  animation: hitPulse 0.5s ease-out;
  box-shadow: 0 0 20px var(--hit-glow);
  cursor: default;
}

@keyframes hitPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.cell.hit::after {
  content: "✕";
  font-size: 1.2rem;
  font-weight: bold;
  color: white;
}

.cell.miss {
  background: rgba(100, 116, 139, 0.3);
  cursor: default;
}

.cell.miss::after {
  content: "•";
  font-size: 1.5rem;
  color: var(--miss-color);
}

.vs-divider {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: linear-gradient(135deg, var(--danger-color), #be123c);
  border-radius: 50%;
  font-family: 'Orbitron', sans-serif;
  font-weight: 900;
  font-size: 0.9rem;
  box-shadow: 0 0 20px rgba(244, 63, 94, 0.4);
}

.fleet-status {
  display: flex;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: var(--text-muted);
}

.fleet-count {
  color: var(--success-color);
  font-weight: 600;
}

.legend {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(17, 24, 39, 0.6);
  border-radius: 50px;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--text-muted);
}

.legend-color {
  width: 20px;
  height: 20px;
  border-radius: 4px;
}

.legend-color.ship {
  background: var(--ship-color);
}

.legend-color.hit {
  background: var(--hit-color);
}

.legend-color.miss {
  background: rgba(100, 116, 139, 0.5);
}

.controls-container {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  justify-content: center;
}

.btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.85rem 1.75rem;
  font-size: 1rem;
  font-weight: 700;
  font-family: 'Rajdhani', sans-serif;
  border: none;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05rem;
}

.btn-icon {
  font-size: 1.1rem;
}

.btn-primary {
  background: linear-gradient(135deg, var(--accent-color), #2563eb);
  color: white;
  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);
}

.btn-primary:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(14, 165, 233, 0.6);
}

.btn-secondary {
  background: linear-gradient(135deg, #475569, #334155);
  color: var(--text-color);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
}

.btn-secondary:hover {
  background: linear-gradient(135deg, #64748b, #475569);
  transform: translateY(-3px);
}

.btn-danger {
  background: linear-gradient(135deg, var(--danger-color), #be123c);
  color: white;
  box-shadow: 0 4px 20px rgba(244, 63, 94, 0.4);
}

.btn-danger:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 30px rgba(244, 63, 94, 0.6);
}

.btn:active {
  transform: translateY(1px);
}

.btn.hidden {
  display: none;
}

footer {
  margin-top: auto;
  padding: 2rem;
  color: rgba(255, 255, 255, 0.3);
  font-size: 0.9rem;
}

.author {
  color: var(--accent-glow);
  font-weight: 600;
}

@media (max-width: 900px) {
  h1 {
    font-size: 2.5rem;
  }
  
  .gameboard {
    grid-template-columns: repeat(10, 28px);
    grid-template-rows: repeat(10, 28px);
    gap: 2px;
    padding: 8px;
  }
  
  .cell {
    width: 28px;
    height: 28px;
  }
  
  .coord-labels.left span {
    height: 28px;
  }
  
  .coord-labels {
    font-size: 0.55rem;
  }
  
  .boards-wrapper {
    gap: 1rem;
  }
  
  .vs-divider {
    width: 40px;
    height: 40px;
    font-size: 0.75rem;
  }
  
  .legend {
    gap: 1rem;
    padding: 0.5rem 1rem;
  }
  
  .legend-item {
    font-size: 0.75rem;
  }
}

@media (max-width: 600px) {
  .boards-wrapper {
    flex-direction: column;
  }
  
  .vs-divider {
    width: 60px;
    height: 40px;
  }
}
`, "",{"version":3,"sources":["webpack://./src/styles.css"],"names":[],"mappings":"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","sourcesContent":[":root {\n  --bg-color: #0a0e17;\n  --bg-secondary: #111827;\n  --text-color: #e2e8f0;\n  --text-muted: #94a3b8;\n  --accent-color: #0ea5e9;\n  --accent-glow: #38bdf8;\n  --accent-secondary: #818cf8;\n  --board-bg: rgba(17, 24, 39, 0.9);\n  --cell-bg: rgba(30, 41, 59, 0.8);\n  --cell-hover: rgba(56, 189, 248, 0.3);\n  --ship-color: #fbbf24;\n  --ship-glow: rgba(251, 191, 36, 0.5);\n  --hit-color: #ef4444;\n  --hit-glow: rgba(239, 68, 68, 0.6);\n  --miss-color: #64748b;\n  --success-color: #22c55e;\n  --danger-color: #f43f5e;\n}\n\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: 'Rajdhani', 'Segoe UI', system-ui, sans-serif;\n  background: var(--bg-color);\n  color: var(--text-color);\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  overflow-x: hidden;\n}\n\n.ocean-bg {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: \n    radial-gradient(ellipse at 20% 20%, rgba(14, 165, 233, 0.15) 0%, transparent 50%),\n    radial-gradient(ellipse at 80% 80%, rgba(129, 140, 248, 0.1) 0%, transparent 50%),\n    linear-gradient(180deg, #0a0e17 0%, #0f172a 50%, #1e1b4b 100%);\n  z-index: -1;\n  animation: oceanPulse 8s ease-in-out infinite;\n}\n\n@keyframes oceanPulse {\n  0%, 100% { opacity: 1; }\n  50% { opacity: 0.8; }\n}\n\nheader {\n  margin-top: 1.5rem;\n  margin-bottom: 1rem;\n  text-align: center;\n}\n\n.title-wrapper {\n  position: relative;\n  display: inline-block;\n}\n\nh1 {\n  font-family: 'Orbitron', sans-serif;\n  font-size: 3.5rem;\n  font-weight: 900;\n  letter-spacing: 0.3rem;\n  background: linear-gradient(135deg, var(--accent-glow), var(--accent-secondary), var(--accent-color));\n  -webkit-background-clip: text;\n  -webkit-text-fill-color: transparent;\n  background-clip: text;\n  text-shadow: 0 0 40px rgba(56, 189, 248, 0.3);\n  animation: titleGlow 3s ease-in-out infinite;\n}\n\n@keyframes titleGlow {\n  0%, 100% { filter: drop-shadow(0 0 20px rgba(56, 189, 248, 0.4)); }\n  50% { filter: drop-shadow(0 0 30px rgba(56, 189, 248, 0.6)); }\n}\n\n.title-accent {\n  position: absolute;\n  bottom: -10px;\n  left: 50%;\n  transform: translateX(-50%);\n  width: 60%;\n  height: 3px;\n  background: linear-gradient(90deg, transparent, var(--accent-color), transparent);\n  border-radius: 2px;\n}\n\n.subtitle {\n  font-size: 1.1rem;\n  color: var(--text-muted);\n  letter-spacing: 0.5rem;\n  text-transform: uppercase;\n  margin-top: 0.5rem;\n}\n\n.message-container {\n  margin-bottom: 1.5rem;\n}\n\n.message-box {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  background: linear-gradient(135deg, rgba(30, 41, 59, 0.9), rgba(17, 24, 39, 0.9));\n  padding: 0.75rem 2rem;\n  border-radius: 50px;\n  border: 1px solid rgba(56, 189, 248, 0.2);\n  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);\n}\n\n.message-icon {\n  font-size: 1.5rem;\n}\n\n#turn-message {\n  font-size: 1.25rem;\n  font-weight: 600;\n  color: var(--accent-glow);\n}\n\n.boards-wrapper {\n  display: flex;\n  align-items: center;\n  gap: 2rem;\n  flex-wrap: wrap;\n  justify-content: center;\n  margin-bottom: 1.5rem;\n}\n\n.board-section {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  gap: 0.75rem;\n}\n\n.section-header {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n}\n\n.section-icon {\n  font-size: 1.5rem;\n}\n\nh3 {\n  font-family: 'Orbitron', sans-serif;\n  font-size: 1.1rem;\n  font-weight: 700;\n  color: var(--text-color);\n  letter-spacing: 0.1rem;\n  text-transform: uppercase;\n}\n\n.player-section h3 {\n  color: var(--ship-color);\n}\n\n.computer-section h3 {\n  color: var(--danger-color);\n}\n\n.board-container {\n  position: relative;\n}\n\n.coord-labels {\n  display: flex;\n  font-size: 0.7rem;\n  color: var(--text-muted);\n  font-weight: 600;\n}\n\n.coord-labels.top {\n  justify-content: space-around;\n  padding-left: 1.5rem;\n  padding-right: 0.25rem;\n}\n\n.coord-labels.left {\n  flex-direction: column;\n  justify-content: space-around;\n  padding-top: 0.25rem;\n  padding-bottom: 1.5rem;\n}\n\n.coord-labels.left span {\n  height: 35px;\n  display: flex;\n  align-items: center;\n}\n\n.board-with-coords {\n  display: flex;\n}\n\n.gameboard {\n  display: grid;\n  grid-template-columns: repeat(10, 38px);\n  grid-template-rows: repeat(10, 38px);\n  gap: 3px;\n  background: var(--board-bg);\n  padding: 12px;\n  border-radius: 16px;\n  box-shadow: \n    0 10px 40px rgba(0, 0, 0, 0.5),\n    inset 0 1px 0 rgba(255, 255, 255, 0.05);\n  border: 1px solid rgba(56, 189, 248, 0.15);\n}\n\n.cell {\n  width: 38px;\n  height: 38px;\n  background: var(--cell-bg);\n  border-radius: 6px;\n  transition: all 0.2s ease;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border: 1px solid rgba(255, 255, 255, 0.03);\n}\n\n.cell.ship {\n  background: linear-gradient(135deg, var(--ship-color), #f59e0b);\n  box-shadow: 0 0 15px var(--ship-glow), inset 0 1px 0 rgba(255, 255, 255, 0.3);\n}\n\n.computer-section .cell.ship {\n  background: var(--cell-bg);\n  box-shadow: none;\n}\n\n.computer-section.game-over .cell.ship {\n  background: linear-gradient(135deg, var(--ship-color), #f59e0b);\n  box-shadow: 0 0 15px var(--ship-glow);\n}\n\n.cell:not(.hit):not(.miss):hover {\n  background: var(--cell-hover);\n  transform: scale(1.08);\n  box-shadow: 0 0 15px rgba(56, 189, 248, 0.4);\n}\n\n.cell.hit {\n  background: linear-gradient(135deg, var(--hit-color), #dc2626);\n  animation: hitPulse 0.5s ease-out;\n  box-shadow: 0 0 20px var(--hit-glow);\n  cursor: default;\n}\n\n@keyframes hitPulse {\n  0% { transform: scale(1); }\n  50% { transform: scale(1.2); }\n  100% { transform: scale(1); }\n}\n\n.cell.hit::after {\n  content: \"✕\";\n  font-size: 1.2rem;\n  font-weight: bold;\n  color: white;\n}\n\n.cell.miss {\n  background: rgba(100, 116, 139, 0.3);\n  cursor: default;\n}\n\n.cell.miss::after {\n  content: \"•\";\n  font-size: 1.5rem;\n  color: var(--miss-color);\n}\n\n.vs-divider {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 50px;\n  height: 50px;\n  background: linear-gradient(135deg, var(--danger-color), #be123c);\n  border-radius: 50%;\n  font-family: 'Orbitron', sans-serif;\n  font-weight: 900;\n  font-size: 0.9rem;\n  box-shadow: 0 0 20px rgba(244, 63, 94, 0.4);\n}\n\n.fleet-status {\n  display: flex;\n  gap: 0.5rem;\n  font-size: 0.9rem;\n  color: var(--text-muted);\n}\n\n.fleet-count {\n  color: var(--success-color);\n  font-weight: 600;\n}\n\n.legend {\n  display: flex;\n  gap: 2rem;\n  margin-bottom: 1.5rem;\n  padding: 0.75rem 1.5rem;\n  background: rgba(17, 24, 39, 0.6);\n  border-radius: 50px;\n  border: 1px solid rgba(255, 255, 255, 0.05);\n}\n\n.legend-item {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-size: 0.85rem;\n  color: var(--text-muted);\n}\n\n.legend-color {\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n}\n\n.legend-color.ship {\n  background: var(--ship-color);\n}\n\n.legend-color.hit {\n  background: var(--hit-color);\n}\n\n.legend-color.miss {\n  background: rgba(100, 116, 139, 0.5);\n}\n\n.controls-container {\n  display: flex;\n  gap: 1rem;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.btn {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  padding: 0.85rem 1.75rem;\n  font-size: 1rem;\n  font-weight: 700;\n  font-family: 'Rajdhani', sans-serif;\n  border: none;\n  border-radius: 50px;\n  cursor: pointer;\n  transition: all 0.3s ease;\n  text-transform: uppercase;\n  letter-spacing: 0.05rem;\n}\n\n.btn-icon {\n  font-size: 1.1rem;\n}\n\n.btn-primary {\n  background: linear-gradient(135deg, var(--accent-color), #2563eb);\n  color: white;\n  box-shadow: 0 4px 20px rgba(14, 165, 233, 0.4);\n}\n\n.btn-primary:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 30px rgba(14, 165, 233, 0.6);\n}\n\n.btn-secondary {\n  background: linear-gradient(135deg, #475569, #334155);\n  color: var(--text-color);\n  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);\n}\n\n.btn-secondary:hover {\n  background: linear-gradient(135deg, #64748b, #475569);\n  transform: translateY(-3px);\n}\n\n.btn-danger {\n  background: linear-gradient(135deg, var(--danger-color), #be123c);\n  color: white;\n  box-shadow: 0 4px 20px rgba(244, 63, 94, 0.4);\n}\n\n.btn-danger:hover {\n  transform: translateY(-3px);\n  box-shadow: 0 8px 30px rgba(244, 63, 94, 0.6);\n}\n\n.btn:active {\n  transform: translateY(1px);\n}\n\n.btn.hidden {\n  display: none;\n}\n\nfooter {\n  margin-top: auto;\n  padding: 2rem;\n  color: rgba(255, 255, 255, 0.3);\n  font-size: 0.9rem;\n}\n\n.author {\n  color: var(--accent-glow);\n  font-weight: 600;\n}\n\n@media (max-width: 900px) {\n  h1 {\n    font-size: 2.5rem;\n  }\n  \n  .gameboard {\n    grid-template-columns: repeat(10, 28px);\n    grid-template-rows: repeat(10, 28px);\n    gap: 2px;\n    padding: 8px;\n  }\n  \n  .cell {\n    width: 28px;\n    height: 28px;\n  }\n  \n  .coord-labels.left span {\n    height: 28px;\n  }\n  \n  .coord-labels {\n    font-size: 0.55rem;\n  }\n  \n  .boards-wrapper {\n    gap: 1rem;\n  }\n  \n  .vs-divider {\n    width: 40px;\n    height: 40px;\n    font-size: 0.75rem;\n  }\n  \n  .legend {\n    gap: 1rem;\n    padding: 0.5rem 1rem;\n  }\n  \n  .legend-item {\n    font-size: 0.75rem;\n  }\n}\n\n@media (max-width: 600px) {\n  .boards-wrapper {\n    flex-direction: column;\n  }\n  \n  .vs-divider {\n    width: 60px;\n    height: 40px;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ },

/***/ "./node_modules/css-loader/dist/runtime/api.js"
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ },

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js"
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
(module) {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ },

/***/ "./src/styles.css"
/*!************************!*\
  !*** ./src/styles.css ***!
  \************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./styles.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());
options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ },

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js"
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
(module) {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
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
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js"
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
(module) {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
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
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js"
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js"
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js"
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ },

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js"
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }

/******/ 	});
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
/******/ 		// Check if module exists (development only)
/******/ 		if (__webpack_modules__[moduleId] === undefined) {
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
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
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles.css */ "./src/styles.css");
/* harmony import */ var _modules_Player__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Player */ "./src/modules/Player.js");
/* harmony import */ var _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ui/DOMController */ "./src/ui/DOMController.js");



_ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].init();
var human;
var computer;
var gameStarted = false;
var gameOver = false;

// Ship sizes for standard Battleship
var shipLengths = [5, 4, 3, 3, 2];
function initGame() {
  human = new _modules_Player__WEBPACK_IMPORTED_MODULE_1__["default"]('human');
  computer = new _modules_Player__WEBPACK_IMPORTED_MODULE_1__["default"]('computer');
  gameStarted = false;
  gameOver = false;
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].computerSectionEl = document.querySelector('.computer-section');
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].computerSectionEl.classList.remove('game-over');
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].randomizeBtn.classList.remove('hidden');
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].startBtn.classList.remove('hidden');
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].restartBtn.classList.add('hidden');
  randomizeBoard(human.gameboard);
  randomizeBoard(computer.gameboard);
  renderBoards();
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].updateFleetStatus(human.gameboard.getRemainingShips());
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].updateMessage('Place your ships or Randomize! Click Start when ready.');
}
function randomizeBoard(gameboard) {
  // Clear existing boards
  gameboard.board = Array(10).fill(null).map(function () {
    return Array(10).fill(null);
  });
  gameboard.ships = [];
  gameboard.missedAttacks = [];
  shipLengths.forEach(function (length) {
    var placed = false;
    while (!placed) {
      var row = Math.floor(Math.random() * 10);
      var col = Math.floor(Math.random() * 10);
      var isVertical = Math.random() > 0.5;
      try {
        gameboard.placeShip(length, row, col, isVertical);
        placed = true;
      } catch (e) {
        // Overlap or out of bounds, try again
      }
    }
  });
}
function renderBoards() {
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].renderBoard(_ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].playerBoardEl, human.gameboard, false);
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].renderBoard(_ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].computerBoardEl, computer.gameboard, true);
}
function handleAttack(row, col) {
  if (!gameStarted || gameOver) return;
  var spot = computer.gameboard.board[row][col];
  if (spot === 'hit' || spot === 'miss') {
    return;
  }
  human.attack(computer.gameboard, row, col);
  renderBoards();
  if (computer.gameboard.allShipsSunk()) {
    endGame('You win! 🏆');
    return;
  }

  // Computer's turn
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].updateMessage('Enemy is attacking...');
  setTimeout(function () {
    if (gameOver) return;
    computer.randomAttack(human.gameboard);
    renderBoards();
    _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].updateFleetStatus(human.gameboard.getRemainingShips());
    if (human.gameboard.allShipsSunk()) {
      endGame('You lost! The enemy destroyed your fleet. 💥');
    } else {
      _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].updateMessage('Your turn! Attack the enemy waters.');
    }
  }, 600);
}
function endGame(message) {
  gameOver = true;
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].updateMessage(message);
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].showGameOver(_ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].computerSectionEl);
  renderBoards();
}

// Bind events
_ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].bindAttackHandler(handleAttack);
_ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].bindRandomizeHandler(function () {
  if (gameStarted) return;
  randomizeBoard(human.gameboard);
  renderBoards();
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].updateFleetStatus(human.gameboard.getRemainingShips());
});
_ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].bindStartHandler(function () {
  if (gameStarted) return;
  gameStarted = true;
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].randomizeBtn.classList.add('hidden');
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].startBtn.classList.add('hidden');
  _ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].updateMessage('Game Started! Your turn to attack.');
});
_ui_DOMController__WEBPACK_IMPORTED_MODULE_2__["default"].bindRestartHandler(function () {
  initGame();
});

// Start
initGame();
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxhQUFhO0FBQ2IsUUFBUTtBQUNSOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxPQUFPO0FBQ1AsUUFBUTtBQUNSLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU8saUZBQWlGLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxXQUFXLFVBQVUsTUFBTSxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsV0FBVyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFVBQVUsVUFBVSxVQUFVLE9BQU8sT0FBTyxXQUFXLFlBQVksT0FBTyxLQUFLLG9CQUFvQixxQkFBcUIsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLHNCQUFzQix1QkFBdUIsT0FBTyxLQUFLLFlBQVksV0FBVyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssVUFBVSxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLGFBQWEsYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsWUFBWSxhQUFhLFdBQVcsWUFBWSxXQUFXLFlBQVksT0FBTyxPQUFPLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxXQUFXLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsYUFBYSxXQUFXLE9BQU8sS0FBSyxzQkFBc0IsdUJBQXVCLHVCQUF1QixPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxNQUFNLEtBQUssWUFBWSxXQUFXLE9BQU8sS0FBSyxVQUFVLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxZQUFZLGFBQWEsV0FBVyxVQUFVLFlBQVksYUFBYSxhQUFhLGFBQWEsYUFBYSxhQUFhLE9BQU8sS0FBSyxVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksYUFBYSxPQUFPLEtBQUssVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsVUFBVSxVQUFVLFlBQVksT0FBTyxLQUFLLFVBQVUsWUFBWSxXQUFXLFlBQVksV0FBVyxZQUFZLGFBQWEsV0FBVyxZQUFZLFdBQVcsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxhQUFhLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksV0FBVyxZQUFZLGFBQWEsT0FBTyxLQUFLLFlBQVksYUFBYSxPQUFPLEtBQUssS0FBSyxZQUFZLE9BQU8sS0FBSyxZQUFZLGFBQWEsV0FBVyxVQUFVLE1BQU0sS0FBSyxVQUFVLFVBQVUsTUFBTSxLQUFLLFVBQVUsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksT0FBTyxLQUFLLFlBQVksTUFBTSxNQUFNLEtBQUssS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsS0FBSyxnQ0FBZ0Msd0JBQXdCLDRCQUE0QiwwQkFBMEIsMEJBQTBCLDRCQUE0QiwyQkFBMkIsZ0NBQWdDLHNDQUFzQyxxQ0FBcUMsMENBQTBDLDBCQUEwQix5Q0FBeUMseUJBQXlCLHVDQUF1QywwQkFBMEIsNkJBQTZCLDRCQUE0QixHQUFHLE9BQU8sMkJBQTJCLGNBQWMsZUFBZSxHQUFHLFVBQVUsK0RBQStELGdDQUFnQyw2QkFBNkIsc0JBQXNCLGtCQUFrQiwyQkFBMkIsd0JBQXdCLHVCQUF1QixHQUFHLGVBQWUsb0JBQW9CLFdBQVcsWUFBWSxnQkFBZ0IsaUJBQWlCLHFRQUFxUSxnQkFBZ0Isa0RBQWtELEdBQUcsMkJBQTJCLGVBQWUsYUFBYSxVQUFVLGVBQWUsR0FBRyxZQUFZLHVCQUF1Qix3QkFBd0IsdUJBQXVCLEdBQUcsb0JBQW9CLHVCQUF1QiwwQkFBMEIsR0FBRyxRQUFRLHdDQUF3QyxzQkFBc0IscUJBQXFCLDJCQUEyQiwwR0FBMEcsa0NBQWtDLHlDQUF5QywwQkFBMEIsa0RBQWtELGlEQUFpRCxHQUFHLDBCQUEwQixlQUFlLHdEQUF3RCxVQUFVLHdEQUF3RCxHQUFHLG1CQUFtQix1QkFBdUIsa0JBQWtCLGNBQWMsZ0NBQWdDLGVBQWUsZ0JBQWdCLHNGQUFzRix1QkFBdUIsR0FBRyxlQUFlLHNCQUFzQiw2QkFBNkIsMkJBQTJCLDhCQUE4Qix1QkFBdUIsR0FBRyx3QkFBd0IsMEJBQTBCLEdBQUcsa0JBQWtCLGtCQUFrQix3QkFBd0IsaUJBQWlCLHNGQUFzRiwwQkFBMEIsd0JBQXdCLDhDQUE4Qyw4Q0FBOEMsR0FBRyxtQkFBbUIsc0JBQXNCLEdBQUcsbUJBQW1CLHVCQUF1QixxQkFBcUIsOEJBQThCLEdBQUcscUJBQXFCLGtCQUFrQix3QkFBd0IsY0FBYyxvQkFBb0IsNEJBQTRCLDBCQUEwQixHQUFHLG9CQUFvQixrQkFBa0IsMkJBQTJCLHdCQUF3QixpQkFBaUIsR0FBRyxxQkFBcUIsa0JBQWtCLHdCQUF3QixnQkFBZ0IsR0FBRyxtQkFBbUIsc0JBQXNCLEdBQUcsUUFBUSx3Q0FBd0Msc0JBQXNCLHFCQUFxQiw2QkFBNkIsMkJBQTJCLDhCQUE4QixHQUFHLHdCQUF3Qiw2QkFBNkIsR0FBRywwQkFBMEIsK0JBQStCLEdBQUcsc0JBQXNCLHVCQUF1QixHQUFHLG1CQUFtQixrQkFBa0Isc0JBQXNCLDZCQUE2QixxQkFBcUIsR0FBRyx1QkFBdUIsa0NBQWtDLHlCQUF5QiwyQkFBMkIsR0FBRyx3QkFBd0IsMkJBQTJCLGtDQUFrQyx5QkFBeUIsMkJBQTJCLEdBQUcsNkJBQTZCLGlCQUFpQixrQkFBa0Isd0JBQXdCLEdBQUcsd0JBQXdCLGtCQUFrQixHQUFHLGdCQUFnQixrQkFBa0IsNENBQTRDLHlDQUF5QyxhQUFhLGdDQUFnQyxrQkFBa0Isd0JBQXdCLG1HQUFtRywrQ0FBK0MsR0FBRyxXQUFXLGdCQUFnQixpQkFBaUIsK0JBQStCLHVCQUF1Qiw4QkFBOEIsb0JBQW9CLGtCQUFrQiw0QkFBNEIsd0JBQXdCLGdEQUFnRCxHQUFHLGdCQUFnQixvRUFBb0Usa0ZBQWtGLEdBQUcsa0NBQWtDLCtCQUErQixxQkFBcUIsR0FBRyw0Q0FBNEMsb0VBQW9FLDBDQUEwQyxHQUFHLHNDQUFzQyxrQ0FBa0MsMkJBQTJCLGlEQUFpRCxHQUFHLGVBQWUsbUVBQW1FLHNDQUFzQyx5Q0FBeUMsb0JBQW9CLEdBQUcseUJBQXlCLFNBQVMsc0JBQXNCLFVBQVUsd0JBQXdCLFdBQVcsc0JBQXNCLEdBQUcsc0JBQXNCLG1CQUFtQixzQkFBc0Isc0JBQXNCLGlCQUFpQixHQUFHLGdCQUFnQix5Q0FBeUMsb0JBQW9CLEdBQUcsdUJBQXVCLG1CQUFtQixzQkFBc0IsNkJBQTZCLEdBQUcsaUJBQWlCLGtCQUFrQix3QkFBd0IsNEJBQTRCLGdCQUFnQixpQkFBaUIsc0VBQXNFLHVCQUF1Qix3Q0FBd0MscUJBQXFCLHNCQUFzQixnREFBZ0QsR0FBRyxtQkFBbUIsa0JBQWtCLGdCQUFnQixzQkFBc0IsNkJBQTZCLEdBQUcsa0JBQWtCLGdDQUFnQyxxQkFBcUIsR0FBRyxhQUFhLGtCQUFrQixjQUFjLDBCQUEwQiw0QkFBNEIsc0NBQXNDLHdCQUF3QixnREFBZ0QsR0FBRyxrQkFBa0Isa0JBQWtCLHdCQUF3QixnQkFBZ0IsdUJBQXVCLDZCQUE2QixHQUFHLG1CQUFtQixnQkFBZ0IsaUJBQWlCLHVCQUF1QixHQUFHLHdCQUF3QixrQ0FBa0MsR0FBRyx1QkFBdUIsaUNBQWlDLEdBQUcsd0JBQXdCLHlDQUF5QyxHQUFHLHlCQUF5QixrQkFBa0IsY0FBYyxvQkFBb0IsNEJBQTRCLEdBQUcsVUFBVSxrQkFBa0Isd0JBQXdCLGdCQUFnQiw2QkFBNkIsb0JBQW9CLHFCQUFxQix3Q0FBd0MsaUJBQWlCLHdCQUF3QixvQkFBb0IsOEJBQThCLDhCQUE4Qiw0QkFBNEIsR0FBRyxlQUFlLHNCQUFzQixHQUFHLGtCQUFrQixzRUFBc0UsaUJBQWlCLG1EQUFtRCxHQUFHLHdCQUF3QixnQ0FBZ0MsbURBQW1ELEdBQUcsb0JBQW9CLDBEQUEwRCw2QkFBNkIsOENBQThDLEdBQUcsMEJBQTBCLDBEQUEwRCxnQ0FBZ0MsR0FBRyxpQkFBaUIsc0VBQXNFLGlCQUFpQixrREFBa0QsR0FBRyx1QkFBdUIsZ0NBQWdDLGtEQUFrRCxHQUFHLGlCQUFpQiwrQkFBK0IsR0FBRyxpQkFBaUIsa0JBQWtCLEdBQUcsWUFBWSxxQkFBcUIsa0JBQWtCLG9DQUFvQyxzQkFBc0IsR0FBRyxhQUFhLDhCQUE4QixxQkFBcUIsR0FBRywrQkFBK0IsUUFBUSx3QkFBd0IsS0FBSyxvQkFBb0IsOENBQThDLDJDQUEyQyxlQUFlLG1CQUFtQixLQUFLLGVBQWUsa0JBQWtCLG1CQUFtQixLQUFLLGlDQUFpQyxtQkFBbUIsS0FBSyx1QkFBdUIseUJBQXlCLEtBQUsseUJBQXlCLGdCQUFnQixLQUFLLHFCQUFxQixrQkFBa0IsbUJBQW1CLHlCQUF5QixLQUFLLGlCQUFpQixnQkFBZ0IsMkJBQTJCLEtBQUssc0JBQXNCLHlCQUF5QixLQUFLLEdBQUcsK0JBQStCLHFCQUFxQiw2QkFBNkIsS0FBSyxxQkFBcUIsa0JBQWtCLG1CQUFtQixLQUFLLEdBQUcscUJBQXFCO0FBQ3owYTtBQUNBLGlFQUFlLHVCQUF1QixFQUFDOzs7Ozs7Ozs7OztBQ3plMUI7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRDtBQUNyRDtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQSxxRkFBcUY7QUFDckY7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGlCQUFpQjtBQUN2QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQkFBcUIscUJBQXFCO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNGQUFzRixxQkFBcUI7QUFDM0c7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLGlEQUFpRCxxQkFBcUI7QUFDdEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWLHNEQUFzRCxxQkFBcUI7QUFDM0U7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxFOzs7Ozs7Ozs7O0FDcEZhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsY0FBYztBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFvRztBQUNwRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhO0FBQ3JDLGlCQUFpQix1R0FBYTtBQUM5QixpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHVGQUFPOzs7O0FBSThDO0FBQ3RFLE9BQU8saUVBQWUsdUZBQU8sSUFBSSx1RkFBTyxVQUFVLHVGQUFPLG1CQUFtQixFQUFDOzs7Ozs7Ozs7OztBQ3hCaEU7O0FBRWI7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQiw2QkFBNkI7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRTs7Ozs7Ozs7OztBQ25GYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0M7Ozs7Ozs7Ozs7QUNqQ2E7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQzs7Ozs7Ozs7OztBQ1RhOztBQUViO0FBQ0E7QUFDQSxjQUFjLEtBQXdDLEdBQUcsc0JBQWlCLEdBQUcsQ0FBSTtBQUNqRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdEOzs7Ozs7Ozs7O0FDVGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0Q7QUFDbEQ7QUFDQTtBQUNBLDBDQUEwQztBQUMxQztBQUNBO0FBQ0E7QUFDQSxpRkFBaUY7QUFDakY7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSx5REFBeUQ7QUFDekQ7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtDQUFrQztBQUNsQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7Ozs7Ozs7QUM1RGE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUM7Ozs7OztVQ2JBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDNUJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBLEU7Ozs7O1dDUEE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RCxFOzs7OztXQ05BLG1DOzs7Ozs7Ozs7Ozs7OztBQ0FzQjtBQUNnQjtBQUNTO0FBRS9DQSx5REFBYSxDQUFDTyxJQUFJLENBQUMsQ0FBQztBQUVwQixJQUFJaUMsS0FBSztBQUNULElBQUlDLFFBQVE7QUFDWixJQUFJQyxXQUFXLEdBQUcsS0FBSztBQUN2QixJQUFJQyxRQUFRLEdBQUcsS0FBSzs7QUFFcEI7QUFDQSxJQUFNQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBRW5DLFNBQVNDLFFBQVFBLENBQUEsRUFBRztFQUNsQkwsS0FBSyxHQUFHLElBQUkxRCx1REFBTSxDQUFDLE9BQU8sQ0FBQztFQUMzQjJELFFBQVEsR0FBRyxJQUFJM0QsdURBQU0sQ0FBQyxVQUFVLENBQUM7RUFDakM0RCxXQUFXLEdBQUcsS0FBSztFQUNuQkMsUUFBUSxHQUFHLEtBQUs7RUFFaEIzQyx5REFBYSxDQUFDNkIsaUJBQWlCLEdBQUdyQixRQUFRLENBQUNHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztFQUM3RVgseURBQWEsQ0FBQzZCLGlCQUFpQixDQUFDUCxTQUFTLENBQUNRLE1BQU0sQ0FBQyxXQUFXLENBQUM7RUFFN0Q5Qix5REFBYSxDQUFDSSxZQUFZLENBQUNrQixTQUFTLENBQUNRLE1BQU0sQ0FBQyxRQUFRLENBQUM7RUFDckQ5Qix5REFBYSxDQUFDSyxRQUFRLENBQUNpQixTQUFTLENBQUNRLE1BQU0sQ0FBQyxRQUFRLENBQUM7RUFDakQ5Qix5REFBYSxDQUFDTSxVQUFVLENBQUNnQixTQUFTLENBQUNDLEdBQUcsQ0FBQyxRQUFRLENBQUM7RUFFaER1QixjQUFjLENBQUNOLEtBQUssQ0FBQ3RELFNBQVMsQ0FBQztFQUMvQjRELGNBQWMsQ0FBQ0wsUUFBUSxDQUFDdkQsU0FBUyxDQUFDO0VBRWxDNkQsWUFBWSxDQUFDLENBQUM7RUFDZC9DLHlEQUFhLENBQUNZLGlCQUFpQixDQUFDNEIsS0FBSyxDQUFDdEQsU0FBUyxDQUFDTixpQkFBaUIsQ0FBQyxDQUFDLENBQUM7RUFDcEVvQix5REFBYSxDQUFDMEIsYUFBYSxDQUFDLHdEQUF3RCxDQUFDO0FBQ3ZGO0FBRUEsU0FBU29CLGNBQWNBLENBQUM1RCxTQUFTLEVBQUU7RUFDakM7RUFDQUEsU0FBUyxDQUFDOUIsS0FBSyxHQUFHQyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQ0MsR0FBRyxDQUFDO0lBQUEsT0FBTUYsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDO0VBQUEsRUFBQztFQUN0RTRCLFNBQVMsQ0FBQ3pCLEtBQUssR0FBRyxFQUFFO0VBQ3BCeUIsU0FBUyxDQUFDMUIsYUFBYSxHQUFHLEVBQUU7RUFFNUJvRixXQUFXLENBQUNJLE9BQU8sQ0FBQyxVQUFBbEYsTUFBTSxFQUFJO0lBQzVCLElBQUltRixNQUFNLEdBQUcsS0FBSztJQUNsQixPQUFPLENBQUNBLE1BQU0sRUFBRTtNQUNkLElBQU1sRixHQUFHLEdBQUc0QixJQUFJLENBQUNDLEtBQUssQ0FBQ0QsSUFBSSxDQUFDRSxNQUFNLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztNQUMxQyxJQUFNN0IsR0FBRyxHQUFHMkIsSUFBSSxDQUFDQyxLQUFLLENBQUNELElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxFQUFFLENBQUM7TUFDMUMsSUFBTTVCLFVBQVUsR0FBRzBCLElBQUksQ0FBQ0UsTUFBTSxDQUFDLENBQUMsR0FBRyxHQUFHO01BRXRDLElBQUk7UUFDRlgsU0FBUyxDQUFDckIsU0FBUyxDQUFDQyxNQUFNLEVBQUVDLEdBQUcsRUFBRUMsR0FBRyxFQUFFQyxVQUFVLENBQUM7UUFDakRnRixNQUFNLEdBQUcsSUFBSTtNQUNmLENBQUMsQ0FBQyxPQUFPZixDQUFDLEVBQUU7UUFDVjtNQUFBO0lBRUo7RUFDRixDQUFDLENBQUM7QUFDSjtBQUVBLFNBQVNhLFlBQVlBLENBQUEsRUFBRztFQUN0Qi9DLHlEQUFhLENBQUNnQixXQUFXLENBQUNoQix5REFBYSxDQUFDQyxhQUFhLEVBQUV1QyxLQUFLLENBQUN0RCxTQUFTLEVBQUUsS0FBSyxDQUFDO0VBQzlFYyx5REFBYSxDQUFDZ0IsV0FBVyxDQUFDaEIseURBQWEsQ0FBQ0UsZUFBZSxFQUFFdUMsUUFBUSxDQUFDdkQsU0FBUyxFQUFFLElBQUksQ0FBQztBQUNwRjtBQUVBLFNBQVNnRSxZQUFZQSxDQUFDbkYsR0FBRyxFQUFFQyxHQUFHLEVBQUU7RUFDOUIsSUFBSSxDQUFDMEUsV0FBVyxJQUFJQyxRQUFRLEVBQUU7RUFFOUIsSUFBTWxELElBQUksR0FBR2dELFFBQVEsQ0FBQ3ZELFNBQVMsQ0FBQzlCLEtBQUssQ0FBQ1csR0FBRyxDQUFDLENBQUNDLEdBQUcsQ0FBQztFQUMvQyxJQUFJeUIsSUFBSSxLQUFLLEtBQUssSUFBSUEsSUFBSSxLQUFLLE1BQU0sRUFBRTtJQUNyQztFQUNGO0VBRUErQyxLQUFLLENBQUNyRCxNQUFNLENBQUNzRCxRQUFRLENBQUN2RCxTQUFTLEVBQUVuQixHQUFHLEVBQUVDLEdBQUcsQ0FBQztFQUUxQytFLFlBQVksQ0FBQyxDQUFDO0VBRWQsSUFBSU4sUUFBUSxDQUFDdkQsU0FBUyxDQUFDVCxZQUFZLENBQUMsQ0FBQyxFQUFFO0lBQ3JDMEUsT0FBTyxDQUFDLGFBQWEsQ0FBQztJQUN0QjtFQUNGOztFQUVBO0VBQ0FuRCx5REFBYSxDQUFDMEIsYUFBYSxDQUFDLHVCQUF1QixDQUFDO0VBRXBEMEIsVUFBVSxDQUFDLFlBQU07SUFDZixJQUFJVCxRQUFRLEVBQUU7SUFFZEYsUUFBUSxDQUFDcEQsWUFBWSxDQUFDbUQsS0FBSyxDQUFDdEQsU0FBUyxDQUFDO0lBQ3hDNkQsWUFBWSxDQUFDLENBQUM7SUFDZC9DLHlEQUFhLENBQUNZLGlCQUFpQixDQUFDNEIsS0FBSyxDQUFDdEQsU0FBUyxDQUFDTixpQkFBaUIsQ0FBQyxDQUFDLENBQUM7SUFFbEUsSUFBSTRELEtBQUssQ0FBQ3RELFNBQVMsQ0FBQ1QsWUFBWSxDQUFDLENBQUMsRUFBRTtNQUNsQzBFLE9BQU8sQ0FBQyw4Q0FBOEMsQ0FBQztJQUN6RCxDQUFDLE1BQU07TUFDTG5ELHlEQUFhLENBQUMwQixhQUFhLENBQUMscUNBQXFDLENBQUM7SUFDcEU7RUFDRixDQUFDLEVBQUUsR0FBRyxDQUFDO0FBQ1Q7QUFFQSxTQUFTeUIsT0FBT0EsQ0FBQ0UsT0FBTyxFQUFFO0VBQ3hCVixRQUFRLEdBQUcsSUFBSTtFQUNmM0MseURBQWEsQ0FBQzBCLGFBQWEsQ0FBQzJCLE9BQU8sQ0FBQztFQUNwQ3JELHlEQUFhLENBQUM0QixZQUFZLENBQUM1Qix5REFBYSxDQUFDNkIsaUJBQWlCLENBQUM7RUFDM0RrQixZQUFZLENBQUMsQ0FBQztBQUNoQjs7QUFFQTtBQUNBL0MseURBQWEsQ0FBQytCLGlCQUFpQixDQUFDbUIsWUFBWSxDQUFDO0FBRTdDbEQseURBQWEsQ0FBQ3FDLG9CQUFvQixDQUFDLFlBQU07RUFDdkMsSUFBSUssV0FBVyxFQUFFO0VBQ2pCSSxjQUFjLENBQUNOLEtBQUssQ0FBQ3RELFNBQVMsQ0FBQztFQUMvQjZELFlBQVksQ0FBQyxDQUFDO0VBQ2QvQyx5REFBYSxDQUFDWSxpQkFBaUIsQ0FBQzRCLEtBQUssQ0FBQ3RELFNBQVMsQ0FBQ04saUJBQWlCLENBQUMsQ0FBQyxDQUFDO0FBQ3RFLENBQUMsQ0FBQztBQUVGb0IseURBQWEsQ0FBQ3NDLGdCQUFnQixDQUFDLFlBQU07RUFDbkMsSUFBSUksV0FBVyxFQUFFO0VBQ2pCQSxXQUFXLEdBQUcsSUFBSTtFQUNsQjFDLHlEQUFhLENBQUNJLFlBQVksQ0FBQ2tCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztFQUNsRHZCLHlEQUFhLENBQUNLLFFBQVEsQ0FBQ2lCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztFQUM5Q3ZCLHlEQUFhLENBQUMwQixhQUFhLENBQUMsb0NBQW9DLENBQUM7QUFDbkUsQ0FBQyxDQUFDO0FBRUYxQix5REFBYSxDQUFDdUMsa0JBQWtCLENBQUMsWUFBTTtFQUNyQ00sUUFBUSxDQUFDLENBQUM7QUFDWixDQUFDLENBQUM7O0FBRUY7QUFDQUEsUUFBUSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXBwcm9qZWN0Ly4vc3JjL21vZHVsZXMvR2FtZWJvYXJkLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBwcm9qZWN0Ly4vc3JjL21vZHVsZXMvUGxheWVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBwcm9qZWN0Ly4vc3JjL21vZHVsZXMvU2hpcC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcHJvamVjdC8uL3NyYy91aS9ET01Db250cm9sbGVyLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBwcm9qZWN0Ly4vc3JjL3N0eWxlcy5jc3MiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHByb2plY3QvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHByb2plY3QvLi9zcmMvc3R5bGVzLmNzcz80NGIyIiwid2VicGFjazovL2JhdHRsZXNoaXBwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcHJvamVjdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXBwcm9qZWN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHByb2plY3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHByb2plY3Qvd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHByb2plY3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2JhdHRsZXNoaXBwcm9qZWN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHByb2plY3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwcHJvamVjdC93ZWJwYWNrL3J1bnRpbWUvbm9uY2UiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcHByb2plY3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFNoaXAgZnJvbSAnLi9TaGlwJztcblxuY2xhc3MgR2FtZWJvYXJkIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5ib2FyZCA9IEFycmF5KDEwKS5maWxsKG51bGwpLm1hcCgoKSA9PiBBcnJheSgxMCkuZmlsbChudWxsKSk7XG4gICAgdGhpcy5taXNzZWRBdHRhY2tzID0gW107XG4gICAgdGhpcy5zaGlwcyA9IFtdO1xuICB9XG5cbiAgcGxhY2VTaGlwKGxlbmd0aCwgcm93LCBjb2wsIGlzVmVydGljYWwpIHtcbiAgICBpZiAocm93IDwgMCB8fCBjb2wgPCAwIHx8IHJvdyA+PSAxMCB8fCBjb2wgPj0gMTApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignT3V0IG9mIGJvdW5kcycpO1xuICAgIH1cbiAgICBpZiAoaXNWZXJ0aWNhbCkge1xuICAgICAgaWYgKHJvdyArIGxlbmd0aCA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoJ091dCBvZiBib3VuZHMnKTtcbiAgICAgIC8vIG9wdGlvbmFsOiBjaGVjayBvdmVybGFwcGluZ1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgICBpZiAodGhpcy5ib2FyZFtyb3cgKyBpXVtjb2xdICE9PSBudWxsKSB0aHJvdyBuZXcgRXJyb3IoJ092ZXJsYXAnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGNvbCArIGxlbmd0aCA+IDEwKSB0aHJvdyBuZXcgRXJyb3IoJ091dCBvZiBib3VuZHMnKTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMuYm9hcmRbcm93XVtjb2wgKyBpXSAhPT0gbnVsbCkgdGhyb3cgbmV3IEVycm9yKCdPdmVybGFwJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgc2hpcCA9IG5ldyBTaGlwKGxlbmd0aCk7XG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xuXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xuICAgICAgaWYgKGlzVmVydGljYWwpIHtcbiAgICAgICAgdGhpcy5ib2FyZFtyb3cgKyBpXVtjb2xdID0gc2hpcDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuYm9hcmRbcm93XVtjb2wgKyBpXSA9IHNoaXA7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmVjZWl2ZUF0dGFjayhyb3csIGNvbCkge1xuICAgIGlmIChyb3cgPCAwIHx8IGNvbCA8IDAgfHwgcm93ID49IDEwIHx8IGNvbCA+PSAxMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdPdXQgb2YgYm91bmRzJyk7XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuYm9hcmRbcm93XVtjb2xdO1xuICAgIFxuICAgIGlmICh0YXJnZXQgPT09ICdoaXQnIHx8IHRhcmdldCA9PT0gJ21pc3MnKSB7XG4gICAgICByZXR1cm4gZmFsc2U7IC8vIEFscmVhZHkgYXR0YWNrZWRcbiAgICB9XG5cbiAgICBpZiAodGFyZ2V0IGluc3RhbmNlb2YgU2hpcCkge1xuICAgICAgdGFyZ2V0LmhpdCgpO1xuICAgICAgdGhpcy5ib2FyZFtyb3ddW2NvbF0gPSAnaGl0JztcbiAgICAgIHJldHVybiB0cnVlOyAvLyBIaXQgc3VjY2Vzc2Z1bFxuICAgIH1cblxuICAgIHRoaXMuYm9hcmRbcm93XVtjb2xdID0gJ21pc3MnO1xuICAgIHRoaXMubWlzc2VkQXR0YWNrcy5wdXNoKFtyb3csIGNvbF0pO1xuICAgIHJldHVybiBmYWxzZTsgLy8gTWlzc1xuICB9XG5cbiAgYWxsU2hpcHNTdW5rKCkge1xuICAgIGlmICh0aGlzLnNoaXBzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHRydWU7XG4gICAgcmV0dXJuIHRoaXMuc2hpcHMuZXZlcnkoc2hpcCA9PiBzaGlwLmlzU3VuaygpKTtcbiAgfVxuXG4gIGdldFJlbWFpbmluZ1NoaXBzKCkge1xuICAgIHJldHVybiB0aGlzLnNoaXBzLmZpbHRlcihzaGlwID0+ICFzaGlwLmlzU3VuaygpKS5sZW5ndGg7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgR2FtZWJvYXJkO1xuIiwiaW1wb3J0IEdhbWVib2FyZCBmcm9tICcuL0dhbWVib2FyZCc7XG5cbmNsYXNzIFBsYXllciB7XG4gIGNvbnN0cnVjdG9yKHR5cGUgPSAnaHVtYW4nKSB7XG4gICAgdGhpcy50eXBlID0gdHlwZTtcbiAgICB0aGlzLmdhbWVib2FyZCA9IG5ldyBHYW1lYm9hcmQoKTtcbiAgfVxuXG4gIGF0dGFjayhlbmVteUdhbWVib2FyZCwgcm93LCBjb2wpIHtcbiAgICBpZiAodGhpcy50eXBlICE9PSAnaHVtYW4nKSB0aHJvdyBuZXcgRXJyb3IoJ0NvbXB1dGVyIHNob3VsZCB1c2UgcmFuZG9tQXR0YWNrJyk7XG4gICAgcmV0dXJuIGVuZW15R2FtZWJvYXJkLnJlY2VpdmVBdHRhY2socm93LCBjb2wpO1xuICB9XG5cbiAgcmFuZG9tQXR0YWNrKGVuZW15R2FtZWJvYXJkKSB7XG4gICAgaWYgKHRoaXMudHlwZSAhPT0gJ2NvbXB1dGVyJykgdGhyb3cgbmV3IEVycm9yKCdIdW1hbiBzaG91bGQgdXNlIGF0dGFjaycpO1xuXG4gICAgY29uc3QgYXZhaWxhYmxlTW92ZXMgPSBbXTtcbiAgICBmb3IgKGxldCByID0gMDsgciA8IDEwOyByKyspIHtcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMTA7IGMrKykge1xuICAgICAgICBjb25zdCBzcG90ID0gZW5lbXlHYW1lYm9hcmQuYm9hcmRbcl1bY107XG4gICAgICAgIGlmIChzcG90ICE9PSAnaGl0JyAmJiBzcG90ICE9PSAnbWlzcycpIHtcbiAgICAgICAgICBhdmFpbGFibGVNb3Zlcy5wdXNoKHsgcm93OiByLCBjb2w6IGMgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYXZhaWxhYmxlTW92ZXMubGVuZ3RoID09PSAwKSByZXR1cm4gZmFsc2U7XG5cbiAgICBjb25zdCByYW5kb21JbmRleCA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIGF2YWlsYWJsZU1vdmVzLmxlbmd0aCk7XG4gICAgY29uc3QgbW92ZSA9IGF2YWlsYWJsZU1vdmVzW3JhbmRvbUluZGV4XTtcblxuICAgIHJldHVybiBlbmVteUdhbWVib2FyZC5yZWNlaXZlQXR0YWNrKG1vdmUucm93LCBtb3ZlLmNvbCk7XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgUGxheWVyO1xuIiwiY2xhc3MgU2hpcCB7XG4gIGNvbnN0cnVjdG9yKGxlbmd0aCkge1xuICAgIHRoaXMubGVuZ3RoID0gbGVuZ3RoO1xuICAgIHRoaXMuaGl0cyA9IDA7XG4gIH1cblxuICBoaXQoKSB7XG4gICAgdGhpcy5oaXRzKys7XG4gIH1cblxuICBpc1N1bmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuaGl0cyA+PSB0aGlzLmxlbmd0aDtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBTaGlwO1xuIiwiY2xhc3MgRE9NQ29udHJvbGxlciB7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMucGxheWVyQm9hcmRFbCA9IG51bGw7XG4gICAgdGhpcy5jb21wdXRlckJvYXJkRWwgPSBudWxsO1xuICAgIHRoaXMudHVybk1lc3NhZ2VFbCA9IG51bGw7XG4gICAgdGhpcy5yYW5kb21pemVCdG4gPSBudWxsO1xuICAgIHRoaXMuc3RhcnRCdG4gPSBudWxsO1xuICAgIHRoaXMucmVzdGFydEJ0biA9IG51bGw7XG4gIH1cblxuICBpbml0KCkge1xuICAgIHRoaXMucGxheWVyQm9hcmRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItYm9hcmQnKTtcbiAgICB0aGlzLmNvbXB1dGVyQm9hcmRFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb21wdXRlci1ib2FyZCcpO1xuICAgIHRoaXMudHVybk1lc3NhZ2VFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0dXJuLW1lc3NhZ2UnKTtcbiAgICB0aGlzLnJhbmRvbWl6ZUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyYW5kb21pemUtYnRuJyk7XG4gICAgdGhpcy5zdGFydEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzdGFydC1idG4nKTtcbiAgICB0aGlzLnJlc3RhcnRCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncmVzdGFydC1idG4nKTtcbiAgICB0aGlzLmZsZWV0Q291bnRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mbGVldC1jb3VudCcpO1xuICB9XG5cbiAgdXBkYXRlRmxlZXRTdGF0dXMoY291bnQpIHtcbiAgICBjb25zdCBmbGVldENvdW50RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmxlZXQtY291bnQnKTtcbiAgICBpZiAoZmxlZXRDb3VudEVsKSB7XG4gICAgICBmbGVldENvdW50RWwudGV4dENvbnRlbnQgPSBgJHtjb3VudH0gc2hpcCR7Y291bnQgIT09IDEgPyAncycgOiAnJ31gO1xuICAgIH1cbiAgfVxuXG4gIHJlbmRlckJvYXJkKGJvYXJkRWwsIGdhbWVib2FyZCwgaXNFbmVteSA9IGZhbHNlKSB7XG4gICAgYm9hcmRFbC5pbm5lckhUTUwgPSAnJztcbiAgICBcbiAgICBmb3IgKGxldCByID0gMDsgciA8IDEwOyByKyspIHtcbiAgICAgIGZvciAobGV0IGMgPSAwOyBjIDwgMTA7IGMrKykge1xuICAgICAgICBjb25zdCBjZWxsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNlbGwuY2xhc3NMaXN0LmFkZCgnY2VsbCcpO1xuICAgICAgICBjZWxsLmRhdGFzZXQucm93ID0gcjtcbiAgICAgICAgY2VsbC5kYXRhc2V0LmNvbCA9IGM7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBzcG90ID0gZ2FtZWJvYXJkLmJvYXJkW3JdW2NdO1xuICAgICAgICBcbiAgICAgICAgaWYgKHNwb3QgPT09ICdoaXQnKSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdoaXQnKTtcbiAgICAgICAgfSBlbHNlIGlmIChzcG90ID09PSAnbWlzcycpIHtcbiAgICAgICAgICBjZWxsLmNsYXNzTGlzdC5hZGQoJ21pc3MnKTtcbiAgICAgICAgfSBlbHNlIGlmIChzcG90ICE9PSBudWxsICYmICFpc0VuZW15KSB7XG4gICAgICAgICAgY2VsbC5jbGFzc0xpc3QuYWRkKCdzaGlwJyk7XG4gICAgICAgIH1cblxuICAgICAgICBib2FyZEVsLmFwcGVuZENoaWxkKGNlbGwpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHVwZGF0ZU1lc3NhZ2UobXNnKSB7XG4gICAgdGhpcy50dXJuTWVzc2FnZUVsLnRleHRDb250ZW50ID0gbXNnO1xuICB9XG5cbiAgc2hvd0dhbWVPdmVyKGNvbXB1dGVyU2VjdGlvbkVsKSB7XG4gICAgY29tcHV0ZXJTZWN0aW9uRWwuY2xhc3NMaXN0LmFkZCgnZ2FtZS1vdmVyJyk7XG4gICAgdGhpcy5yZXN0YXJ0QnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGRlbicpO1xuICAgIHRoaXMucmFuZG9taXplQnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICAgIHRoaXMuc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIH1cblxuICBiaW5kQXR0YWNrSGFuZGxlcihoYW5kbGVyKSB7XG4gICAgdGhpcy5jb21wdXRlckJvYXJkRWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnY2VsbCcpKSB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHBhcnNlSW50KGUudGFyZ2V0LmRhdGFzZXQucm93KTtcbiAgICAgICAgY29uc3QgY29sID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC5jb2wpO1xuICAgICAgICBoYW5kbGVyKHJvdywgY29sKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGJpbmRSYW5kb21pemVIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICB0aGlzLnJhbmRvbWl6ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuICB9XG5cbiAgYmluZFN0YXJ0SGFuZGxlcihoYW5kbGVyKSB7XG4gICAgdGhpcy5zdGFydEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZXIpO1xuICB9XG5cbiAgYmluZFJlc3RhcnRIYW5kbGVyKGhhbmRsZXIpIHtcbiAgICB0aGlzLnJlc3RhcnRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVyKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBuZXcgRE9NQ29udHJvbGxlcigpO1xuIiwiLy8gSW1wb3J0c1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzXCI7XG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fIGZyb20gXCIuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzXCI7XG52YXIgX19fQ1NTX0xPQURFUl9FWFBPUlRfX18gPSBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18oX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyk7XG4vLyBNb2R1bGVcbl9fX0NTU19MT0FERVJfRVhQT1JUX19fLnB1c2goW21vZHVsZS5pZCwgYDpyb290IHtcbiAgLS1iZy1jb2xvcjogIzBhMGUxNztcbiAgLS1iZy1zZWNvbmRhcnk6ICMxMTE4Mjc7XG4gIC0tdGV4dC1jb2xvcjogI2UyZThmMDtcbiAgLS10ZXh0LW11dGVkOiAjOTRhM2I4O1xuICAtLWFjY2VudC1jb2xvcjogIzBlYTVlOTtcbiAgLS1hY2NlbnQtZ2xvdzogIzM4YmRmODtcbiAgLS1hY2NlbnQtc2Vjb25kYXJ5OiAjODE4Y2Y4O1xuICAtLWJvYXJkLWJnOiByZ2JhKDE3LCAyNCwgMzksIDAuOSk7XG4gIC0tY2VsbC1iZzogcmdiYSgzMCwgNDEsIDU5LCAwLjgpO1xuICAtLWNlbGwtaG92ZXI6IHJnYmEoNTYsIDE4OSwgMjQ4LCAwLjMpO1xuICAtLXNoaXAtY29sb3I6ICNmYmJmMjQ7XG4gIC0tc2hpcC1nbG93OiByZ2JhKDI1MSwgMTkxLCAzNiwgMC41KTtcbiAgLS1oaXQtY29sb3I6ICNlZjQ0NDQ7XG4gIC0taGl0LWdsb3c6IHJnYmEoMjM5LCA2OCwgNjgsIDAuNik7XG4gIC0tbWlzcy1jb2xvcjogIzY0NzQ4YjtcbiAgLS1zdWNjZXNzLWNvbG9yOiAjMjJjNTVlO1xuICAtLWRhbmdlci1jb2xvcjogI2Y0M2Y1ZTtcbn1cblxuKiB7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIG1hcmdpbjogMDtcbiAgcGFkZGluZzogMDtcbn1cblxuYm9keSB7XG4gIGZvbnQtZmFtaWx5OiAnUmFqZGhhbmknLCAnU2Vnb2UgVUknLCBzeXN0ZW0tdWksIHNhbnMtc2VyaWY7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJnLWNvbG9yKTtcbiAgY29sb3I6IHZhcigtLXRleHQtY29sb3IpO1xuICBtaW4taGVpZ2h0OiAxMDB2aDtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xufVxuXG4ub2NlYW4tYmcge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZDogXG4gICAgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgMjAlIDIwJSwgcmdiYSgxNCwgMTY1LCAyMzMsIDAuMTUpIDAlLCB0cmFuc3BhcmVudCA1MCUpLFxuICAgIHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IDgwJSA4MCUsIHJnYmEoMTI5LCAxNDAsIDI0OCwgMC4xKSAwJSwgdHJhbnNwYXJlbnQgNTAlKSxcbiAgICBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGEwZTE3IDAlLCAjMGYxNzJhIDUwJSwgIzFlMWI0YiAxMDAlKTtcbiAgei1pbmRleDogLTE7XG4gIGFuaW1hdGlvbjogb2NlYW5QdWxzZSA4cyBlYXNlLWluLW91dCBpbmZpbml0ZTtcbn1cblxuQGtleWZyYW1lcyBvY2VhblB1bHNlIHtcbiAgMCUsIDEwMCUgeyBvcGFjaXR5OiAxOyB9XG4gIDUwJSB7IG9wYWNpdHk6IDAuODsgfVxufVxuXG5oZWFkZXIge1xuICBtYXJnaW4tdG9wOiAxLjVyZW07XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnRpdGxlLXdyYXBwZXIge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbn1cblxuaDEge1xuICBmb250LWZhbWlseTogJ09yYml0cm9uJywgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAzLjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA5MDA7XG4gIGxldHRlci1zcGFjaW5nOiAwLjNyZW07XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWFjY2VudC1nbG93KSwgdmFyKC0tYWNjZW50LXNlY29uZGFyeSksIHZhcigtLWFjY2VudC1jb2xvcikpO1xuICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDtcbiAgLXdlYmtpdC10ZXh0LWZpbGwtY29sb3I6IHRyYW5zcGFyZW50O1xuICBiYWNrZ3JvdW5kLWNsaXA6IHRleHQ7XG4gIHRleHQtc2hhZG93OiAwIDAgNDBweCByZ2JhKDU2LCAxODksIDI0OCwgMC4zKTtcbiAgYW5pbWF0aW9uOiB0aXRsZUdsb3cgM3MgZWFzZS1pbi1vdXQgaW5maW5pdGU7XG59XG5cbkBrZXlmcmFtZXMgdGl0bGVHbG93IHtcbiAgMCUsIDEwMCUgeyBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMCAyMHB4IHJnYmEoNTYsIDE4OSwgMjQ4LCAwLjQpKTsgfVxuICA1MCUgeyBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMCAzMHB4IHJnYmEoNTYsIDE4OSwgMjQ4LCAwLjYpKTsgfVxufVxuXG4udGl0bGUtYWNjZW50IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IC0xMHB4O1xuICBsZWZ0OiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgd2lkdGg6IDYwJTtcbiAgaGVpZ2h0OiAzcHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCg5MGRlZywgdHJhbnNwYXJlbnQsIHZhcigtLWFjY2VudC1jb2xvciksIHRyYW5zcGFyZW50KTtcbiAgYm9yZGVyLXJhZGl1czogMnB4O1xufVxuXG4uc3VidGl0bGUge1xuICBmb250LXNpemU6IDEuMXJlbTtcbiAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xuICBsZXR0ZXItc3BhY2luZzogMC41cmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBtYXJnaW4tdG9wOiAwLjVyZW07XG59XG5cbi5tZXNzYWdlLWNvbnRhaW5lciB7XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbn1cblxuLm1lc3NhZ2UtYm94IHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjc1cmVtO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCByZ2JhKDMwLCA0MSwgNTksIDAuOSksIHJnYmEoMTcsIDI0LCAzOSwgMC45KSk7XG4gIHBhZGRpbmc6IDAuNzVyZW0gMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg1NiwgMTg5LCAyNDgsIDAuMik7XG4gIGJveC1zaGFkb3c6IDAgNHB4IDIwcHggcmdiYSgwLCAwLCAwLCAwLjMpO1xufVxuXG4ubWVzc2FnZS1pY29uIHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG59XG5cbiN0dXJuLW1lc3NhZ2Uge1xuICBmb250LXNpemU6IDEuMjVyZW07XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG4gIGNvbG9yOiB2YXIoLS1hY2NlbnQtZ2xvdyk7XG59XG5cbi5ib2FyZHMtd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMnJlbTtcbiAgZmxleC13cmFwOiB3cmFwO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuXG4uYm9hcmQtc2VjdGlvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogMC43NXJlbTtcbn1cblxuLnNlY3Rpb24taGVhZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG59XG5cbi5zZWN0aW9uLWljb24ge1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cblxuaDMge1xuICBmb250LWZhbWlseTogJ09yYml0cm9uJywgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxLjFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LWNvbG9yKTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMXJlbTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbn1cblxuLnBsYXllci1zZWN0aW9uIGgzIHtcbiAgY29sb3I6IHZhcigtLXNoaXAtY29sb3IpO1xufVxuXG4uY29tcHV0ZXItc2VjdGlvbiBoMyB7XG4gIGNvbG9yOiB2YXIoLS1kYW5nZXItY29sb3IpO1xufVxuXG4uYm9hcmQtY29udGFpbmVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4uY29vcmQtbGFiZWxzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZm9udC1zaXplOiAwLjdyZW07XG4gIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbn1cblxuLmNvb3JkLWxhYmVscy50b3Age1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgcGFkZGluZy1sZWZ0OiAxLjVyZW07XG4gIHBhZGRpbmctcmlnaHQ6IDAuMjVyZW07XG59XG5cbi5jb29yZC1sYWJlbHMubGVmdCB7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBwYWRkaW5nLXRvcDogMC4yNXJlbTtcbiAgcGFkZGluZy1ib3R0b206IDEuNXJlbTtcbn1cblxuLmNvb3JkLWxhYmVscy5sZWZ0IHNwYW4ge1xuICBoZWlnaHQ6IDM1cHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5ib2FyZC13aXRoLWNvb3JkcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG59XG5cbi5nYW1lYm9hcmQge1xuICBkaXNwbGF5OiBncmlkO1xuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzhweCk7XG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzOHB4KTtcbiAgZ2FwOiAzcHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWJvYXJkLWJnKTtcbiAgcGFkZGluZzogMTJweDtcbiAgYm9yZGVyLXJhZGl1czogMTZweDtcbiAgYm94LXNoYWRvdzogXG4gICAgMCAxMHB4IDQwcHggcmdiYSgwLCAwLCAwLCAwLjUpLFxuICAgIGluc2V0IDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg1NiwgMTg5LCAyNDgsIDAuMTUpO1xufVxuXG4uY2VsbCB7XG4gIHdpZHRoOiAzOHB4O1xuICBoZWlnaHQ6IDM4cHg7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNlbGwtYmcpO1xuICBib3JkZXItcmFkaXVzOiA2cHg7XG4gIHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMyk7XG59XG5cbi5jZWxsLnNoaXAge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1zaGlwLWNvbG9yKSwgI2Y1OWUwYik7XG4gIGJveC1zaGFkb3c6IDAgMCAxNXB4IHZhcigtLXNoaXAtZ2xvdyksIGluc2V0IDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xufVxuXG4uY29tcHV0ZXItc2VjdGlvbiAuY2VsbC5zaGlwIHtcbiAgYmFja2dyb3VuZDogdmFyKC0tY2VsbC1iZyk7XG4gIGJveC1zaGFkb3c6IG5vbmU7XG59XG5cbi5jb21wdXRlci1zZWN0aW9uLmdhbWUtb3ZlciAuY2VsbC5zaGlwIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tc2hpcC1jb2xvciksICNmNTllMGIpO1xuICBib3gtc2hhZG93OiAwIDAgMTVweCB2YXIoLS1zaGlwLWdsb3cpO1xufVxuXG4uY2VsbDpub3QoLmhpdCk6bm90KC5taXNzKTpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNlbGwtaG92ZXIpO1xuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpO1xuICBib3gtc2hhZG93OiAwIDAgMTVweCByZ2JhKDU2LCAxODksIDI0OCwgMC40KTtcbn1cblxuLmNlbGwuaGl0IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0taGl0LWNvbG9yKSwgI2RjMjYyNik7XG4gIGFuaW1hdGlvbjogaGl0UHVsc2UgMC41cyBlYXNlLW91dDtcbiAgYm94LXNoYWRvdzogMCAwIDIwcHggdmFyKC0taGl0LWdsb3cpO1xuICBjdXJzb3I6IGRlZmF1bHQ7XG59XG5cbkBrZXlmcmFtZXMgaGl0UHVsc2Uge1xuICAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cbiAgNTAlIHsgdHJhbnNmb3JtOiBzY2FsZSgxLjIpOyB9XG4gIDEwMCUgeyB0cmFuc2Zvcm06IHNjYWxlKDEpOyB9XG59XG5cbi5jZWxsLmhpdDo6YWZ0ZXIge1xuICBjb250ZW50OiBcIuKclVwiO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiB3aGl0ZTtcbn1cblxuLmNlbGwubWlzcyB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMTAwLCAxMTYsIDEzOSwgMC4zKTtcbiAgY3Vyc29yOiBkZWZhdWx0O1xufVxuXG4uY2VsbC5taXNzOjphZnRlciB7XG4gIGNvbnRlbnQ6IFwi4oCiXCI7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xuICBjb2xvcjogdmFyKC0tbWlzcy1jb2xvcik7XG59XG5cbi52cy1kaXZpZGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHdpZHRoOiA1MHB4O1xuICBoZWlnaHQ6IDUwcHg7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWRhbmdlci1jb2xvciksICNiZTEyM2MpO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGZvbnQtZmFtaWx5OiAnT3JiaXRyb24nLCBzYW5zLXNlcmlmO1xuICBmb250LXdlaWdodDogOTAwO1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgYm94LXNoYWRvdzogMCAwIDIwcHggcmdiYSgyNDQsIDYzLCA5NCwgMC40KTtcbn1cblxuLmZsZWV0LXN0YXR1cyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGdhcDogMC41cmVtO1xuICBmb250LXNpemU6IDAuOXJlbTtcbiAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xufVxuXG4uZmxlZXQtY291bnQge1xuICBjb2xvcjogdmFyKC0tc3VjY2Vzcy1jb2xvcik7XG4gIGZvbnQtd2VpZ2h0OiA2MDA7XG59XG5cbi5sZWdlbmQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDJyZW07XG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcbiAgcGFkZGluZzogMC43NXJlbSAxLjVyZW07XG4gIGJhY2tncm91bmQ6IHJnYmEoMTcsIDI0LCAzOSwgMC42KTtcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcbn1cblxuLmxlZ2VuZC1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZ2FwOiAwLjVyZW07XG4gIGZvbnQtc2l6ZTogMC44NXJlbTtcbiAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xufVxuXG4ubGVnZW5kLWNvbG9yIHtcbiAgd2lkdGg6IDIwcHg7XG4gIGhlaWdodDogMjBweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG4ubGVnZW5kLWNvbG9yLnNoaXAge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1zaGlwLWNvbG9yKTtcbn1cblxuLmxlZ2VuZC1jb2xvci5oaXQge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1oaXQtY29sb3IpO1xufVxuXG4ubGVnZW5kLWNvbG9yLm1pc3Mge1xuICBiYWNrZ3JvdW5kOiByZ2JhKDEwMCwgMTE2LCAxMzksIDAuNSk7XG59XG5cbi5jb250cm9scy1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBnYXA6IDFyZW07XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbi5idG4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBnYXA6IDAuNXJlbTtcbiAgcGFkZGluZzogMC44NXJlbSAxLjc1cmVtO1xuICBmb250LXNpemU6IDFyZW07XG4gIGZvbnQtd2VpZ2h0OiA3MDA7XG4gIGZvbnQtZmFtaWx5OiAnUmFqZGhhbmknLCBzYW5zLXNlcmlmO1xuICBib3JkZXI6IG5vbmU7XG4gIGJvcmRlci1yYWRpdXM6IDUwcHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMDVyZW07XG59XG5cbi5idG4taWNvbiB7XG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xufVxuXG4uYnRuLXByaW1hcnkge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1hY2NlbnQtY29sb3IpLCAjMjU2M2ViKTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMTQsIDE2NSwgMjMzLCAwLjQpO1xufVxuXG4uYnRuLXByaW1hcnk6aG92ZXIge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XG4gIGJveC1zaGFkb3c6IDAgOHB4IDMwcHggcmdiYSgxNCwgMTY1LCAyMzMsIDAuNik7XG59XG5cbi5idG4tc2Vjb25kYXJ5IHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzQ3NTU2OSwgIzMzNDE1NSk7XG4gIGNvbG9yOiB2YXIoLS10ZXh0LWNvbG9yKTtcbiAgYm94LXNoYWRvdzogMCA0cHggMTVweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG59XG5cbi5idG4tc2Vjb25kYXJ5OmhvdmVyIHtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY0NzQ4YiwgIzQ3NTU2OSk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtM3B4KTtcbn1cblxuLmJ0bi1kYW5nZXIge1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1kYW5nZXItY29sb3IpLCAjYmUxMjNjKTtcbiAgY29sb3I6IHdoaXRlO1xuICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMjQ0LCA2MywgOTQsIDAuNCk7XG59XG5cbi5idG4tZGFuZ2VyOmhvdmVyIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xuICBib3gtc2hhZG93OiAwIDhweCAzMHB4IHJnYmEoMjQ0LCA2MywgOTQsIDAuNik7XG59XG5cbi5idG46YWN0aXZlIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKDFweCk7XG59XG5cbi5idG4uaGlkZGVuIHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuZm9vdGVyIHtcbiAgbWFyZ2luLXRvcDogYXV0bztcbiAgcGFkZGluZzogMnJlbTtcbiAgY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4zKTtcbiAgZm9udC1zaXplOiAwLjlyZW07XG59XG5cbi5hdXRob3Ige1xuICBjb2xvcjogdmFyKC0tYWNjZW50LWdsb3cpO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuXG5AbWVkaWEgKG1heC13aWR0aDogOTAwcHgpIHtcbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMi41cmVtO1xuICB9XG4gIFxuICAuZ2FtZWJvYXJkIHtcbiAgICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMjhweCk7XG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDI4cHgpO1xuICAgIGdhcDogMnB4O1xuICAgIHBhZGRpbmc6IDhweDtcbiAgfVxuICBcbiAgLmNlbGwge1xuICAgIHdpZHRoOiAyOHB4O1xuICAgIGhlaWdodDogMjhweDtcbiAgfVxuICBcbiAgLmNvb3JkLWxhYmVscy5sZWZ0IHNwYW4ge1xuICAgIGhlaWdodDogMjhweDtcbiAgfVxuICBcbiAgLmNvb3JkLWxhYmVscyB7XG4gICAgZm9udC1zaXplOiAwLjU1cmVtO1xuICB9XG4gIFxuICAuYm9hcmRzLXdyYXBwZXIge1xuICAgIGdhcDogMXJlbTtcbiAgfVxuICBcbiAgLnZzLWRpdmlkZXIge1xuICAgIHdpZHRoOiA0MHB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgICBmb250LXNpemU6IDAuNzVyZW07XG4gIH1cbiAgXG4gIC5sZWdlbmQge1xuICAgIGdhcDogMXJlbTtcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgfVxuICBcbiAgLmxlZ2VuZC1pdGVtIHtcbiAgICBmb250LXNpemU6IDAuNzVyZW07XG4gIH1cbn1cblxuQG1lZGlhIChtYXgtd2lkdGg6IDYwMHB4KSB7XG4gIC5ib2FyZHMtd3JhcHBlciB7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgfVxuICBcbiAgLnZzLWRpdmlkZXIge1xuICAgIHdpZHRoOiA2MHB4O1xuICAgIGhlaWdodDogNDBweDtcbiAgfVxufVxuYCwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLG1CQUFtQjtFQUNuQix1QkFBdUI7RUFDdkIscUJBQXFCO0VBQ3JCLHFCQUFxQjtFQUNyQix1QkFBdUI7RUFDdkIsc0JBQXNCO0VBQ3RCLDJCQUEyQjtFQUMzQixpQ0FBaUM7RUFDakMsZ0NBQWdDO0VBQ2hDLHFDQUFxQztFQUNyQyxxQkFBcUI7RUFDckIsb0NBQW9DO0VBQ3BDLG9CQUFvQjtFQUNwQixrQ0FBa0M7RUFDbEMscUJBQXFCO0VBQ3JCLHdCQUF3QjtFQUN4Qix1QkFBdUI7QUFDekI7O0FBRUE7RUFDRSxzQkFBc0I7RUFDdEIsU0FBUztFQUNULFVBQVU7QUFDWjs7QUFFQTtFQUNFLDBEQUEwRDtFQUMxRCwyQkFBMkI7RUFDM0Isd0JBQXdCO0VBQ3hCLGlCQUFpQjtFQUNqQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsTUFBTTtFQUNOLE9BQU87RUFDUCxXQUFXO0VBQ1gsWUFBWTtFQUNaOzs7a0VBR2dFO0VBQ2hFLFdBQVc7RUFDWCw2Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSxXQUFXLFVBQVUsRUFBRTtFQUN2QixNQUFNLFlBQVksRUFBRTtBQUN0Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNs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O0FBQ25COztBQUVBO0VBQ0UsaUVBQWlFO0VBQ2pFLFlBQVk7RUFDWiw4Q0FBOEM7QUFDaEQ7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsOENBQThDO0FBQ2hEOztBQUVBO0VBQ0UscURBQXFEO0VBQ3JELHdCQUF3QjtFQUN4Qix5Q0FBeUM7QUFDM0M7O0FBRUE7RUFDRSxxREFBcUQ7RUFDckQsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsaUVBQWlFO0VBQ2pFLFlBQVk7RUFDWiw2Q0FBNkM7QUFDL0M7O0FBRUE7RUFDRSwyQkFBMkI7RUFDM0IsNkNBQTZDO0FBQy9DOztBQUVBO0VBQ0UsMEJBQTBCO0FBQzVCOztBQUVBO0VBQ0UsYUFBYTtBQUNmOztBQUVBO0VBQ0UsZ0JBQWdCO0VBQ2hCLGFBQWE7RUFDYiwrQkFBK0I7RUFDL0IsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UseUJBQXlCO0VBQ3pCLGdCQUFnQjtBQUNsQjs7QUFFQTtFQUNFO0lBQ0UsaUJBQWlCO0VBQ25COztFQUVBO0lBQ0UsdUNBQXVDO0lBQ3ZDLG9DQUFvQztJQUNwQyxRQUFRO0lBQ1IsWUFBWTtFQUNkOztFQUVBO0lBQ0UsV0FBVztJQUNYLFlBQVk7RUFDZDs7RUFFQTtJQUNFLFlBQVk7RUFDZDs7RUFFQTtJQUNFLGtCQUFrQjtFQUNwQjs7RUFFQTtJQUNFLFNBQVM7RUFDWDs7RUFFQTtJQUNFLFdBQVc7SUFDWCxZQUFZO0lBQ1osa0JBQWtCO0VBQ3BCOztFQUVBO0lBQ0UsU0FBUztJQUNULG9CQUFvQjtFQUN0Qjs7RUFFQTtJQUNFLGtCQUFrQjtFQUNwQjtBQUNGOztBQUVBO0VBQ0U7SUFDRSxzQkFBc0I7RUFDeEI7O0VBRUE7SUFDRSxXQUFXO0lBQ1gsWUFBWTtFQUNkO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiOnJvb3Qge1xcbiAgLS1iZy1jb2xvcjogIzBhMGUxNztcXG4gIC0tYmctc2Vjb25kYXJ5OiAjMTExODI3O1xcbiAgLS10ZXh0LWNvbG9yOiAjZTJlOGYwO1xcbiAgLS10ZXh0LW11dGVkOiAjOTRhM2I4O1xcbiAgLS1hY2NlbnQtY29sb3I6ICMwZWE1ZTk7XFxuICAtLWFjY2VudC1nbG93OiAjMzhiZGY4O1xcbiAgLS1hY2NlbnQtc2Vjb25kYXJ5OiAjODE4Y2Y4O1xcbiAgLS1ib2FyZC1iZzogcmdiYSgxNywgMjQsIDM5LCAwLjkpO1xcbiAgLS1jZWxsLWJnOiByZ2JhKDMwLCA0MSwgNTksIDAuOCk7XFxuICAtLWNlbGwtaG92ZXI6IHJnYmEoNTYsIDE4OSwgMjQ4LCAwLjMpO1xcbiAgLS1zaGlwLWNvbG9yOiAjZmJiZjI0O1xcbiAgLS1zaGlwLWdsb3c6IHJnYmEoMjUxLCAxOTEsIDM2LCAwLjUpO1xcbiAgLS1oaXQtY29sb3I6ICNlZjQ0NDQ7XFxuICAtLWhpdC1nbG93OiByZ2JhKDIzOSwgNjgsIDY4LCAwLjYpO1xcbiAgLS1taXNzLWNvbG9yOiAjNjQ3NDhiO1xcbiAgLS1zdWNjZXNzLWNvbG9yOiAjMjJjNTVlO1xcbiAgLS1kYW5nZXItY29sb3I6ICNmNDNmNWU7XFxufVxcblxcbioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIG1hcmdpbjogMDtcXG4gIHBhZGRpbmc6IDA7XFxufVxcblxcbmJvZHkge1xcbiAgZm9udC1mYW1pbHk6ICdSYWpkaGFuaScsICdTZWdvZSBVSScsIHN5c3RlbS11aSwgc2Fucy1zZXJpZjtcXG4gIGJhY2tncm91bmQ6IHZhcigtLWJnLWNvbG9yKTtcXG4gIGNvbG9yOiB2YXIoLS10ZXh0LWNvbG9yKTtcXG4gIG1pbi1oZWlnaHQ6IDEwMHZoO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbn1cXG5cXG4ub2NlYW4tYmcge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgYmFja2dyb3VuZDogXFxuICAgIHJhZGlhbC1ncmFkaWVudChlbGxpcHNlIGF0IDIwJSAyMCUsIHJnYmEoMTQsIDE2NSwgMjMzLCAwLjE1KSAwJSwgdHJhbnNwYXJlbnQgNTAlKSxcXG4gICAgcmFkaWFsLWdyYWRpZW50KGVsbGlwc2UgYXQgODAlIDgwJSwgcmdiYSgxMjksIDE0MCwgMjQ4LCAwLjEpIDAlLCB0cmFuc3BhcmVudCA1MCUpLFxcbiAgICBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjMGEwZTE3IDAlLCAjMGYxNzJhIDUwJSwgIzFlMWI0YiAxMDAlKTtcXG4gIHotaW5kZXg6IC0xO1xcbiAgYW5pbWF0aW9uOiBvY2VhblB1bHNlIDhzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIG9jZWFuUHVsc2Uge1xcbiAgMCUsIDEwMCUgeyBvcGFjaXR5OiAxOyB9XFxuICA1MCUgeyBvcGFjaXR5OiAwLjg7IH1cXG59XFxuXFxuaGVhZGVyIHtcXG4gIG1hcmdpbi10b3A6IDEuNXJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDFyZW07XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi50aXRsZS13cmFwcGVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcXG59XFxuXFxuaDEge1xcbiAgZm9udC1mYW1pbHk6ICdPcmJpdHJvbicsIHNhbnMtc2VyaWY7XFxuICBmb250LXNpemU6IDMuNXJlbTtcXG4gIGZvbnQtd2VpZ2h0OiA5MDA7XFxuICBsZXR0ZXItc3BhY2luZzogMC4zcmVtO1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tYWNjZW50LWdsb3cpLCB2YXIoLS1hY2NlbnQtc2Vjb25kYXJ5KSwgdmFyKC0tYWNjZW50LWNvbG9yKSk7XFxuICAtd2Via2l0LWJhY2tncm91bmQtY2xpcDogdGV4dDtcXG4gIC13ZWJraXQtdGV4dC1maWxsLWNvbG9yOiB0cmFuc3BhcmVudDtcXG4gIGJhY2tncm91bmQtY2xpcDogdGV4dDtcXG4gIHRleHQtc2hhZG93OiAwIDAgNDBweCByZ2JhKDU2LCAxODksIDI0OCwgMC4zKTtcXG4gIGFuaW1hdGlvbjogdGl0bGVHbG93IDNzIGVhc2UtaW4tb3V0IGluZmluaXRlO1xcbn1cXG5cXG5Aa2V5ZnJhbWVzIHRpdGxlR2xvdyB7XFxuICAwJSwgMTAwJSB7IGZpbHRlcjogZHJvcC1zaGFkb3coMCAwIDIwcHggcmdiYSg1NiwgMTg5LCAyNDgsIDAuNCkpOyB9XFxuICA1MCUgeyBmaWx0ZXI6IGRyb3Atc2hhZG93KDAgMCAzMHB4IHJnYmEoNTYsIDE4OSwgMjQ4LCAwLjYpKTsgfVxcbn1cXG5cXG4udGl0bGUtYWNjZW50IHtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvdHRvbTogLTEwcHg7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XFxuICB3aWR0aDogNjAlO1xcbiAgaGVpZ2h0OiAzcHg7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoOTBkZWcsIHRyYW5zcGFyZW50LCB2YXIoLS1hY2NlbnQtY29sb3IpLCB0cmFuc3BhcmVudCk7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxufVxcblxcbi5zdWJ0aXRsZSB7XFxuICBmb250LXNpemU6IDEuMXJlbTtcXG4gIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcXG4gIGxldHRlci1zcGFjaW5nOiAwLjVyZW07XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgbWFyZ2luLXRvcDogMC41cmVtO1xcbn1cXG5cXG4ubWVzc2FnZS1jb250YWluZXIge1xcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xcbn1cXG5cXG4ubWVzc2FnZS1ib3gge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBnYXA6IDAuNzVyZW07XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCByZ2JhKDMwLCA0MSwgNTksIDAuOSksIHJnYmEoMTcsIDI0LCAzOSwgMC45KSk7XFxuICBwYWRkaW5nOiAwLjc1cmVtIDJyZW07XFxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg1NiwgMTg5LCAyNDgsIDAuMik7XFxuICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG59XFxuXFxuLm1lc3NhZ2UtaWNvbiB7XFxuICBmb250LXNpemU6IDEuNXJlbTtcXG59XFxuXFxuI3R1cm4tbWVzc2FnZSB7XFxuICBmb250LXNpemU6IDEuMjVyZW07XFxuICBmb250LXdlaWdodDogNjAwO1xcbiAgY29sb3I6IHZhcigtLWFjY2VudC1nbG93KTtcXG59XFxuXFxuLmJvYXJkcy13cmFwcGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAycmVtO1xcbiAgZmxleC13cmFwOiB3cmFwO1xcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxuICBtYXJnaW4tYm90dG9tOiAxLjVyZW07XFxufVxcblxcbi5ib2FyZC1zZWN0aW9uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMC43NXJlbTtcXG59XFxuXFxuLnNlY3Rpb24taGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAwLjVyZW07XFxufVxcblxcbi5zZWN0aW9uLWljb24ge1xcbiAgZm9udC1zaXplOiAxLjVyZW07XFxufVxcblxcbmgzIHtcXG4gIGZvbnQtZmFtaWx5OiAnT3JiaXRyb24nLCBzYW5zLXNlcmlmO1xcbiAgZm9udC1zaXplOiAxLjFyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgY29sb3I6IHZhcigtLXRleHQtY29sb3IpO1xcbiAgbGV0dGVyLXNwYWNpbmc6IDAuMXJlbTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxufVxcblxcbi5wbGF5ZXItc2VjdGlvbiBoMyB7XFxuICBjb2xvcjogdmFyKC0tc2hpcC1jb2xvcik7XFxufVxcblxcbi5jb21wdXRlci1zZWN0aW9uIGgzIHtcXG4gIGNvbG9yOiB2YXIoLS1kYW5nZXItY29sb3IpO1xcbn1cXG5cXG4uYm9hcmQtY29udGFpbmVyIHtcXG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG59XFxuXFxuLmNvb3JkLWxhYmVscyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZm9udC1zaXplOiAwLjdyZW07XFxuICBjb2xvcjogdmFyKC0tdGV4dC1tdXRlZCk7XFxuICBmb250LXdlaWdodDogNjAwO1xcbn1cXG5cXG4uY29vcmQtbGFiZWxzLnRvcCB7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIHBhZGRpbmctbGVmdDogMS41cmVtO1xcbiAgcGFkZGluZy1yaWdodDogMC4yNXJlbTtcXG59XFxuXFxuLmNvb3JkLWxhYmVscy5sZWZ0IHtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcXG4gIHBhZGRpbmctdG9wOiAwLjI1cmVtO1xcbiAgcGFkZGluZy1ib3R0b206IDEuNXJlbTtcXG59XFxuXFxuLmNvb3JkLWxhYmVscy5sZWZ0IHNwYW4ge1xcbiAgaGVpZ2h0OiAzNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbi5ib2FyZC13aXRoLWNvb3JkcyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbn1cXG5cXG4uZ2FtZWJvYXJkIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzhweCk7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzhweCk7XFxuICBnYXA6IDNweDtcXG4gIGJhY2tncm91bmQ6IHZhcigtLWJvYXJkLWJnKTtcXG4gIHBhZGRpbmc6IDEycHg7XFxuICBib3JkZXItcmFkaXVzOiAxNnB4O1xcbiAgYm94LXNoYWRvdzogXFxuICAgIDAgMTBweCA0MHB4IHJnYmEoMCwgMCwgMCwgMC41KSxcXG4gICAgaW5zZXQgMCAxcHggMCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDUpO1xcbiAgYm9yZGVyOiAxcHggc29saWQgcmdiYSg1NiwgMTg5LCAyNDgsIDAuMTUpO1xcbn1cXG5cXG4uY2VsbCB7XFxuICB3aWR0aDogMzhweDtcXG4gIGhlaWdodDogMzhweDtcXG4gIGJhY2tncm91bmQ6IHZhcigtLWNlbGwtYmcpO1xcbiAgYm9yZGVyLXJhZGl1czogNnB4O1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuMnMgZWFzZTtcXG4gIGN1cnNvcjogcG9pbnRlcjtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBib3JkZXI6IDFweCBzb2xpZCByZ2JhKDI1NSwgMjU1LCAyNTUsIDAuMDMpO1xcbn1cXG5cXG4uY2VsbC5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLXNoaXAtY29sb3IpLCAjZjU5ZTBiKTtcXG4gIGJveC1zaGFkb3c6IDAgMCAxNXB4IHZhcigtLXNoaXAtZ2xvdyksIGluc2V0IDAgMXB4IDAgcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xcbn1cXG5cXG4uY29tcHV0ZXItc2VjdGlvbiAuY2VsbC5zaGlwIHtcXG4gIGJhY2tncm91bmQ6IHZhcigtLWNlbGwtYmcpO1xcbiAgYm94LXNoYWRvdzogbm9uZTtcXG59XFxuXFxuLmNvbXB1dGVyLXNlY3Rpb24uZ2FtZS1vdmVyIC5jZWxsLnNoaXAge1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tc2hpcC1jb2xvciksICNmNTllMGIpO1xcbiAgYm94LXNoYWRvdzogMCAwIDE1cHggdmFyKC0tc2hpcC1nbG93KTtcXG59XFxuXFxuLmNlbGw6bm90KC5oaXQpOm5vdCgubWlzcyk6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tY2VsbC1ob3Zlcik7XFxuICB0cmFuc2Zvcm06IHNjYWxlKDEuMDgpO1xcbiAgYm94LXNoYWRvdzogMCAwIDE1cHggcmdiYSg1NiwgMTg5LCAyNDgsIDAuNCk7XFxufVxcblxcbi5jZWxsLmhpdCB7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1oaXQtY29sb3IpLCAjZGMyNjI2KTtcXG4gIGFuaW1hdGlvbjogaGl0UHVsc2UgMC41cyBlYXNlLW91dDtcXG4gIGJveC1zaGFkb3c6IDAgMCAyMHB4IHZhcigtLWhpdC1nbG93KTtcXG4gIGN1cnNvcjogZGVmYXVsdDtcXG59XFxuXFxuQGtleWZyYW1lcyBoaXRQdWxzZSB7XFxuICAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cXG4gIDUwJSB7IHRyYW5zZm9ybTogc2NhbGUoMS4yKTsgfVxcbiAgMTAwJSB7IHRyYW5zZm9ybTogc2NhbGUoMSk7IH1cXG59XFxuXFxuLmNlbGwuaGl0OjphZnRlciB7XFxuICBjb250ZW50OiBcXFwi4pyVXFxcIjtcXG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XFxuICBjb2xvcjogd2hpdGU7XFxufVxcblxcbi5jZWxsLm1pc3Mge1xcbiAgYmFja2dyb3VuZDogcmdiYSgxMDAsIDExNiwgMTM5LCAwLjMpO1xcbiAgY3Vyc29yOiBkZWZhdWx0O1xcbn1cXG5cXG4uY2VsbC5taXNzOjphZnRlciB7XFxuICBjb250ZW50OiBcXFwi4oCiXFxcIjtcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcbiAgY29sb3I6IHZhcigtLW1pc3MtY29sb3IpO1xcbn1cXG5cXG4udnMtZGl2aWRlciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbiAgd2lkdGg6IDUwcHg7XFxuICBoZWlnaHQ6IDUwcHg7XFxuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCB2YXIoLS1kYW5nZXItY29sb3IpLCAjYmUxMjNjKTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcXG4gIGZvbnQtZmFtaWx5OiAnT3JiaXRyb24nLCBzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IDkwMDtcXG4gIGZvbnQtc2l6ZTogMC45cmVtO1xcbiAgYm94LXNoYWRvdzogMCAwIDIwcHggcmdiYSgyNDQsIDYzLCA5NCwgMC40KTtcXG59XFxuXFxuLmZsZWV0LXN0YXR1cyB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZ2FwOiAwLjVyZW07XFxuICBmb250LXNpemU6IDAuOXJlbTtcXG4gIGNvbG9yOiB2YXIoLS10ZXh0LW11dGVkKTtcXG59XFxuXFxuLmZsZWV0LWNvdW50IHtcXG4gIGNvbG9yOiB2YXIoLS1zdWNjZXNzLWNvbG9yKTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxufVxcblxcbi5sZWdlbmQge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMnJlbTtcXG4gIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcXG4gIHBhZGRpbmc6IDAuNzVyZW0gMS41cmVtO1xcbiAgYmFja2dyb3VuZDogcmdiYSgxNywgMjQsIDM5LCAwLjYpO1xcbiAgYm9yZGVyLXJhZGl1czogNTBweDtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wNSk7XFxufVxcblxcbi5sZWdlbmQtaXRlbSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGdhcDogMC41cmVtO1xcbiAgZm9udC1zaXplOiAwLjg1cmVtO1xcbiAgY29sb3I6IHZhcigtLXRleHQtbXV0ZWQpO1xcbn1cXG5cXG4ubGVnZW5kLWNvbG9yIHtcXG4gIHdpZHRoOiAyMHB4O1xcbiAgaGVpZ2h0OiAyMHB4O1xcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xcbn1cXG5cXG4ubGVnZW5kLWNvbG9yLnNoaXAge1xcbiAgYmFja2dyb3VuZDogdmFyKC0tc2hpcC1jb2xvcik7XFxufVxcblxcbi5sZWdlbmQtY29sb3IuaGl0IHtcXG4gIGJhY2tncm91bmQ6IHZhcigtLWhpdC1jb2xvcik7XFxufVxcblxcbi5sZWdlbmQtY29sb3IubWlzcyB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDEwMCwgMTE2LCAxMzksIDAuNSk7XFxufVxcblxcbi5jb250cm9scy1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGdhcDogMXJlbTtcXG4gIGZsZXgtd3JhcDogd3JhcDtcXG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4uYnRuIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgZ2FwOiAwLjVyZW07XFxuICBwYWRkaW5nOiAwLjg1cmVtIDEuNzVyZW07XFxuICBmb250LXNpemU6IDFyZW07XFxuICBmb250LXdlaWdodDogNzAwO1xcbiAgZm9udC1mYW1pbHk6ICdSYWpkaGFuaScsIHNhbnMtc2VyaWY7XFxuICBib3JkZXI6IG5vbmU7XFxuICBib3JkZXItcmFkaXVzOiA1MHB4O1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgdHJhbnNpdGlvbjogYWxsIDAuM3MgZWFzZTtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBsZXR0ZXItc3BhY2luZzogMC4wNXJlbTtcXG59XFxuXFxuLmJ0bi1pY29uIHtcXG4gIGZvbnQtc2l6ZTogMS4xcmVtO1xcbn1cXG5cXG4uYnRuLXByaW1hcnkge1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgdmFyKC0tYWNjZW50LWNvbG9yKSwgIzI1NjNlYik7XFxuICBjb2xvcjogd2hpdGU7XFxuICBib3gtc2hhZG93OiAwIDRweCAyMHB4IHJnYmEoMTQsIDE2NSwgMjMzLCAwLjQpO1xcbn1cXG5cXG4uYnRuLXByaW1hcnk6aG92ZXIge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0zcHgpO1xcbiAgYm94LXNoYWRvdzogMCA4cHggMzBweCByZ2JhKDE0LCAxNjUsIDIzMywgMC42KTtcXG59XFxuXFxuLmJ0bi1zZWNvbmRhcnkge1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzQ3NTU2OSwgIzMzNDE1NSk7XFxuICBjb2xvcjogdmFyKC0tdGV4dC1jb2xvcik7XFxuICBib3gtc2hhZG93OiAwIDRweCAxNXB4IHJnYmEoMCwgMCwgMCwgMC4zKTtcXG59XFxuXFxuLmJ0bi1zZWNvbmRhcnk6aG92ZXIge1xcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDEzNWRlZywgIzY0NzQ4YiwgIzQ3NTU2OSk7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XFxufVxcblxcbi5idG4tZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxMzVkZWcsIHZhcigtLWRhbmdlci1jb2xvciksICNiZTEyM2MpO1xcbiAgY29sb3I6IHdoaXRlO1xcbiAgYm94LXNoYWRvdzogMCA0cHggMjBweCByZ2JhKDI0NCwgNjMsIDk0LCAwLjQpO1xcbn1cXG5cXG4uYnRuLWRhbmdlcjpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTNweCk7XFxuICBib3gtc2hhZG93OiAwIDhweCAzMHB4IHJnYmEoMjQ0LCA2MywgOTQsIDAuNik7XFxufVxcblxcbi5idG46YWN0aXZlIHtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgxcHgpO1xcbn1cXG5cXG4uYnRuLmhpZGRlbiB7XFxuICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5mb290ZXIge1xcbiAgbWFyZ2luLXRvcDogYXV0bztcXG4gIHBhZGRpbmc6IDJyZW07XFxuICBjb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjMpO1xcbiAgZm9udC1zaXplOiAwLjlyZW07XFxufVxcblxcbi5hdXRob3Ige1xcbiAgY29sb3I6IHZhcigtLWFjY2VudC1nbG93KTtcXG4gIGZvbnQtd2VpZ2h0OiA2MDA7XFxufVxcblxcbkBtZWRpYSAobWF4LXdpZHRoOiA5MDBweCkge1xcbiAgaDEge1xcbiAgICBmb250LXNpemU6IDIuNXJlbTtcXG4gIH1cXG4gIFxcbiAgLmdhbWVib2FyZCB7XFxuICAgIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAyOHB4KTtcXG4gICAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDI4cHgpO1xcbiAgICBnYXA6IDJweDtcXG4gICAgcGFkZGluZzogOHB4O1xcbiAgfVxcbiAgXFxuICAuY2VsbCB7XFxuICAgIHdpZHRoOiAyOHB4O1xcbiAgICBoZWlnaHQ6IDI4cHg7XFxuICB9XFxuICBcXG4gIC5jb29yZC1sYWJlbHMubGVmdCBzcGFuIHtcXG4gICAgaGVpZ2h0OiAyOHB4O1xcbiAgfVxcbiAgXFxuICAuY29vcmQtbGFiZWxzIHtcXG4gICAgZm9udC1zaXplOiAwLjU1cmVtO1xcbiAgfVxcbiAgXFxuICAuYm9hcmRzLXdyYXBwZXIge1xcbiAgICBnYXA6IDFyZW07XFxuICB9XFxuICBcXG4gIC52cy1kaXZpZGVyIHtcXG4gICAgd2lkdGg6IDQwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xcbiAgfVxcbiAgXFxuICAubGVnZW5kIHtcXG4gICAgZ2FwOiAxcmVtO1xcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcXG4gIH1cXG4gIFxcbiAgLmxlZ2VuZC1pdGVtIHtcXG4gICAgZm9udC1zaXplOiAwLjc1cmVtO1xcbiAgfVxcbn1cXG5cXG5AbWVkaWEgKG1heC13aWR0aDogNjAwcHgpIHtcXG4gIC5ib2FyZHMtd3JhcHBlciB7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxuICBcXG4gIC52cy1kaXZpZGVyIHtcXG4gICAgd2lkdGg6IDYwcHg7XFxuICAgIGhlaWdodDogNDBweDtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGVzLmNzc1wiO1xuICAgICAgXG4gICAgICBcblxudmFyIG9wdGlvbnMgPSB7fTtcblxub3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybSA9IHN0eWxlVGFnVHJhbnNmb3JtRm47XG5vcHRpb25zLnNldEF0dHJpYnV0ZXMgPSBzZXRBdHRyaWJ1dGVzO1xub3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlcy5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5mdW5jdGlvbiBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKSB7XG4gIHZhciByZXN1bHQgPSAtMTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5mdW5jdGlvbiBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucykge1xuICB2YXIgaWRDb3VudE1hcCA9IHt9O1xuICB2YXIgaWRlbnRpZmllcnMgPSBbXTtcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuICAgIGlkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gIH1cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcbiAgdmFyIHVwZGF0ZXIgPSBmdW5jdGlvbiB1cGRhdGVyKG5ld09iaikge1xuICAgIGlmIChuZXdPYmopIHtcbiAgICAgIGlmIChuZXdPYmouY3NzID09PSBvYmouY3NzICYmIG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmIG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXAgJiYgbmV3T2JqLnN1cHBvcnRzID09PSBvYmouc3VwcG9ydHMgJiYgbmV3T2JqLmxheWVyID09PSBvYmoubGF5ZXIpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gdXBkYXRlcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGxpc3QsIG9wdGlvbnMpIHtcbiAgb3B0aW9ucyA9IG9wdGlvbnMgfHwge307XG4gIGxpc3QgPSBsaXN0IHx8IFtdO1xuICB2YXIgbGFzdElkZW50aWZpZXJzID0gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpO1xuICByZXR1cm4gZnVuY3Rpb24gdXBkYXRlKG5ld0xpc3QpIHtcbiAgICBuZXdMaXN0ID0gbmV3TGlzdCB8fCBbXTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG4gICAgZm9yICh2YXIgX2kgPSAwOyBfaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IF9pKyspIHtcbiAgICAgIHZhciBfaWRlbnRpZmllciA9IGxhc3RJZGVudGlmaWVyc1tfaV07XG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcbiAgICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKF9pbmRleCwgMSk7XG4gICAgICB9XG4gICAgfVxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcblxuICAgIC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG4gICAgaWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgLy8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcbiAgICAgICAgLy8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBzdHlsZVRhcmdldC5jb250ZW50RG9jdW1lbnQuaGVhZDtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gaXN0YW5idWwgaWdub3JlIG5leHRcbiAgICAgICAgc3R5bGVUYXJnZXQgPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydEJ5U2VsZWN0b3IoaW5zZXJ0LCBzdHlsZSkge1xuICB2YXIgdGFyZ2V0ID0gZ2V0VGFyZ2V0KGluc2VydCk7XG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRCeVNlbGVjdG9yOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKSB7XG4gIHZhciBlbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuICBvcHRpb25zLnNldEF0dHJpYnV0ZXMoZWxlbWVudCwgb3B0aW9ucy5hdHRyaWJ1dGVzKTtcbiAgb3B0aW9ucy5pbnNlcnQoZWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbiAgcmV0dXJuIGVsZW1lbnQ7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxubW9kdWxlLmV4cG9ydHMgPSBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXM7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopIHtcbiAgdmFyIGNzcyA9IFwiXCI7XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuICB2YXIgbmVlZExheWVyID0gdHlwZW9mIG9iai5sYXllciAhPT0gXCJ1bmRlZmluZWRcIjtcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuICBjc3MgKz0gb2JqLmNzcztcbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cbiAgdmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfVxuXG4gIC8vIEZvciBvbGQgSUVcbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuICBvcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtKGNzcywgc3R5bGVFbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xufVxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gZG9tQVBJKG9wdGlvbnMpIHtcbiAgaWYgKHR5cGVvZiBkb2N1bWVudCA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHJldHVybiB7XG4gICAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZSgpIHt9LFxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7fVxuICAgIH07XG4gIH1cbiAgdmFyIHN0eWxlRWxlbWVudCA9IG9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpO1xuICByZXR1cm4ge1xuICAgIHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKG9iaikge1xuICAgICAgYXBwbHkoc3R5bGVFbGVtZW50LCBvcHRpb25zLCBvYmopO1xuICAgIH0sXG4gICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUoKSB7XG4gICAgICByZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGVFbGVtZW50KTtcbiAgICB9XG4gIH07XG59XG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5tb2R1bGUuZXhwb3J0cyA9IHN0eWxlVGFnVHJhbnNmb3JtOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGV4aXN0cyAoZGV2ZWxvcG1lbnQgb25seSlcblx0aWYgKF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdID09PSB1bmRlZmluZWQpIHtcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyBtb2R1bGVJZCArIFwiJ1wiKTtcblx0XHRlLmNvZGUgPSAnTU9EVUxFX05PVF9GT1VORCc7XG5cdFx0dGhyb3cgZTtcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0ICcuL3N0eWxlcy5jc3MnO1xuaW1wb3J0IFBsYXllciBmcm9tICcuL21vZHVsZXMvUGxheWVyJztcbmltcG9ydCBET01Db250cm9sbGVyIGZyb20gJy4vdWkvRE9NQ29udHJvbGxlcic7XG5cbkRPTUNvbnRyb2xsZXIuaW5pdCgpO1xuXG5sZXQgaHVtYW47XG5sZXQgY29tcHV0ZXI7XG5sZXQgZ2FtZVN0YXJ0ZWQgPSBmYWxzZTtcbmxldCBnYW1lT3ZlciA9IGZhbHNlO1xuXG4vLyBTaGlwIHNpemVzIGZvciBzdGFuZGFyZCBCYXR0bGVzaGlwXG5jb25zdCBzaGlwTGVuZ3RocyA9IFs1LCA0LCAzLCAzLCAyXTtcblxuZnVuY3Rpb24gaW5pdEdhbWUoKSB7XG4gIGh1bWFuID0gbmV3IFBsYXllcignaHVtYW4nKTtcbiAgY29tcHV0ZXIgPSBuZXcgUGxheWVyKCdjb21wdXRlcicpO1xuICBnYW1lU3RhcnRlZCA9IGZhbHNlO1xuICBnYW1lT3ZlciA9IGZhbHNlO1xuICBcbiAgRE9NQ29udHJvbGxlci5jb21wdXRlclNlY3Rpb25FbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb21wdXRlci1zZWN0aW9uJyk7XG4gIERPTUNvbnRyb2xsZXIuY29tcHV0ZXJTZWN0aW9uRWwuY2xhc3NMaXN0LnJlbW92ZSgnZ2FtZS1vdmVyJyk7XG4gIFxuICBET01Db250cm9sbGVyLnJhbmRvbWl6ZUJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgRE9NQ29udHJvbGxlci5zdGFydEJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdoaWRkZW4nKTtcbiAgRE9NQ29udHJvbGxlci5yZXN0YXJ0QnRuLmNsYXNzTGlzdC5hZGQoJ2hpZGRlbicpO1xuICBcbiAgcmFuZG9taXplQm9hcmQoaHVtYW4uZ2FtZWJvYXJkKTtcbiAgcmFuZG9taXplQm9hcmQoY29tcHV0ZXIuZ2FtZWJvYXJkKTtcbiAgXG4gIHJlbmRlckJvYXJkcygpO1xuICBET01Db250cm9sbGVyLnVwZGF0ZUZsZWV0U3RhdHVzKGh1bWFuLmdhbWVib2FyZC5nZXRSZW1haW5pbmdTaGlwcygpKTtcbiAgRE9NQ29udHJvbGxlci51cGRhdGVNZXNzYWdlKCdQbGFjZSB5b3VyIHNoaXBzIG9yIFJhbmRvbWl6ZSEgQ2xpY2sgU3RhcnQgd2hlbiByZWFkeS4nKTtcbn1cblxuZnVuY3Rpb24gcmFuZG9taXplQm9hcmQoZ2FtZWJvYXJkKSB7XG4gIC8vIENsZWFyIGV4aXN0aW5nIGJvYXJkc1xuICBnYW1lYm9hcmQuYm9hcmQgPSBBcnJheSgxMCkuZmlsbChudWxsKS5tYXAoKCkgPT4gQXJyYXkoMTApLmZpbGwobnVsbCkpO1xuICBnYW1lYm9hcmQuc2hpcHMgPSBbXTtcbiAgZ2FtZWJvYXJkLm1pc3NlZEF0dGFja3MgPSBbXTtcblxuICBzaGlwTGVuZ3Rocy5mb3JFYWNoKGxlbmd0aCA9PiB7XG4gICAgbGV0IHBsYWNlZCA9IGZhbHNlO1xuICAgIHdoaWxlICghcGxhY2VkKSB7XG4gICAgICBjb25zdCByb3cgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBjb2wgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCk7XG4gICAgICBjb25zdCBpc1ZlcnRpY2FsID0gTWF0aC5yYW5kb20oKSA+IDAuNTtcbiAgICAgIFxuICAgICAgdHJ5IHtcbiAgICAgICAgZ2FtZWJvYXJkLnBsYWNlU2hpcChsZW5ndGgsIHJvdywgY29sLCBpc1ZlcnRpY2FsKTtcbiAgICAgICAgcGxhY2VkID0gdHJ1ZTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgLy8gT3ZlcmxhcCBvciBvdXQgb2YgYm91bmRzLCB0cnkgYWdhaW5cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZW5kZXJCb2FyZHMoKSB7XG4gIERPTUNvbnRyb2xsZXIucmVuZGVyQm9hcmQoRE9NQ29udHJvbGxlci5wbGF5ZXJCb2FyZEVsLCBodW1hbi5nYW1lYm9hcmQsIGZhbHNlKTtcbiAgRE9NQ29udHJvbGxlci5yZW5kZXJCb2FyZChET01Db250cm9sbGVyLmNvbXB1dGVyQm9hcmRFbCwgY29tcHV0ZXIuZ2FtZWJvYXJkLCB0cnVlKTtcbn1cblxuZnVuY3Rpb24gaGFuZGxlQXR0YWNrKHJvdywgY29sKSB7XG4gIGlmICghZ2FtZVN0YXJ0ZWQgfHwgZ2FtZU92ZXIpIHJldHVybjtcblxuICBjb25zdCBzcG90ID0gY29tcHV0ZXIuZ2FtZWJvYXJkLmJvYXJkW3Jvd11bY29sXTtcbiAgaWYgKHNwb3QgPT09ICdoaXQnIHx8IHNwb3QgPT09ICdtaXNzJykge1xuICAgIHJldHVybjtcbiAgfVxuICBcbiAgaHVtYW4uYXR0YWNrKGNvbXB1dGVyLmdhbWVib2FyZCwgcm93LCBjb2wpO1xuICBcbiAgcmVuZGVyQm9hcmRzKCk7XG5cbiAgaWYgKGNvbXB1dGVyLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgIGVuZEdhbWUoJ1lvdSB3aW4hIPCfj4YnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBDb21wdXRlcidzIHR1cm5cbiAgRE9NQ29udHJvbGxlci51cGRhdGVNZXNzYWdlKCdFbmVteSBpcyBhdHRhY2tpbmcuLi4nKTtcbiAgXG4gIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgIGlmIChnYW1lT3ZlcikgcmV0dXJuO1xuICAgIFxuICAgIGNvbXB1dGVyLnJhbmRvbUF0dGFjayhodW1hbi5nYW1lYm9hcmQpO1xuICByZW5kZXJCb2FyZHMoKTtcbiAgRE9NQ29udHJvbGxlci51cGRhdGVGbGVldFN0YXR1cyhodW1hbi5nYW1lYm9hcmQuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XG4gICAgXG4gICAgaWYgKGh1bWFuLmdhbWVib2FyZC5hbGxTaGlwc1N1bmsoKSkge1xuICAgICAgZW5kR2FtZSgnWW91IGxvc3QhIFRoZSBlbmVteSBkZXN0cm95ZWQgeW91ciBmbGVldC4g8J+SpScpO1xuICAgIH0gZWxzZSB7XG4gICAgICBET01Db250cm9sbGVyLnVwZGF0ZU1lc3NhZ2UoJ1lvdXIgdHVybiEgQXR0YWNrIHRoZSBlbmVteSB3YXRlcnMuJyk7XG4gICAgfVxuICB9LCA2MDApO1xufVxuXG5mdW5jdGlvbiBlbmRHYW1lKG1lc3NhZ2UpIHtcbiAgZ2FtZU92ZXIgPSB0cnVlO1xuICBET01Db250cm9sbGVyLnVwZGF0ZU1lc3NhZ2UobWVzc2FnZSk7XG4gIERPTUNvbnRyb2xsZXIuc2hvd0dhbWVPdmVyKERPTUNvbnRyb2xsZXIuY29tcHV0ZXJTZWN0aW9uRWwpO1xuICByZW5kZXJCb2FyZHMoKTtcbn1cblxuLy8gQmluZCBldmVudHNcbkRPTUNvbnRyb2xsZXIuYmluZEF0dGFja0hhbmRsZXIoaGFuZGxlQXR0YWNrKTtcblxuRE9NQ29udHJvbGxlci5iaW5kUmFuZG9taXplSGFuZGxlcigoKSA9PiB7XG4gIGlmIChnYW1lU3RhcnRlZCkgcmV0dXJuO1xuICByYW5kb21pemVCb2FyZChodW1hbi5nYW1lYm9hcmQpO1xuICByZW5kZXJCb2FyZHMoKTtcbiAgRE9NQ29udHJvbGxlci51cGRhdGVGbGVldFN0YXR1cyhodW1hbi5nYW1lYm9hcmQuZ2V0UmVtYWluaW5nU2hpcHMoKSk7XG59KTtcblxuRE9NQ29udHJvbGxlci5iaW5kU3RhcnRIYW5kbGVyKCgpID0+IHtcbiAgaWYgKGdhbWVTdGFydGVkKSByZXR1cm47XG4gIGdhbWVTdGFydGVkID0gdHJ1ZTtcbiAgRE9NQ29udHJvbGxlci5yYW5kb21pemVCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIERPTUNvbnRyb2xsZXIuc3RhcnRCdG4uY2xhc3NMaXN0LmFkZCgnaGlkZGVuJyk7XG4gIERPTUNvbnRyb2xsZXIudXBkYXRlTWVzc2FnZSgnR2FtZSBTdGFydGVkISBZb3VyIHR1cm4gdG8gYXR0YWNrLicpO1xufSk7XG5cbkRPTUNvbnRyb2xsZXIuYmluZFJlc3RhcnRIYW5kbGVyKCgpID0+IHtcbiAgaW5pdEdhbWUoKTtcbn0pO1xuXG4vLyBTdGFydFxuaW5pdEdhbWUoKTtcbiJdLCJuYW1lcyI6WyJTaGlwIiwiR2FtZWJvYXJkIiwiX2NsYXNzQ2FsbENoZWNrIiwiYm9hcmQiLCJBcnJheSIsImZpbGwiLCJtYXAiLCJtaXNzZWRBdHRhY2tzIiwic2hpcHMiLCJfY3JlYXRlQ2xhc3MiLCJrZXkiLCJ2YWx1ZSIsInBsYWNlU2hpcCIsImxlbmd0aCIsInJvdyIsImNvbCIsImlzVmVydGljYWwiLCJFcnJvciIsImkiLCJzaGlwIiwicHVzaCIsInJlY2VpdmVBdHRhY2siLCJ0YXJnZXQiLCJoaXQiLCJhbGxTaGlwc1N1bmsiLCJldmVyeSIsImlzU3VuayIsImdldFJlbWFpbmluZ1NoaXBzIiwiZmlsdGVyIiwiUGxheWVyIiwidHlwZSIsImFyZ3VtZW50cyIsInVuZGVmaW5lZCIsImdhbWVib2FyZCIsImF0dGFjayIsImVuZW15R2FtZWJvYXJkIiwicmFuZG9tQXR0YWNrIiwiYXZhaWxhYmxlTW92ZXMiLCJyIiwiYyIsInNwb3QiLCJyYW5kb21JbmRleCIsIk1hdGgiLCJmbG9vciIsInJhbmRvbSIsIm1vdmUiLCJoaXRzIiwiRE9NQ29udHJvbGxlciIsInBsYXllckJvYXJkRWwiLCJjb21wdXRlckJvYXJkRWwiLCJ0dXJuTWVzc2FnZUVsIiwicmFuZG9taXplQnRuIiwic3RhcnRCdG4iLCJyZXN0YXJ0QnRuIiwiaW5pdCIsImRvY3VtZW50IiwiZ2V0RWxlbWVudEJ5SWQiLCJmbGVldENvdW50RWwiLCJxdWVyeVNlbGVjdG9yIiwidXBkYXRlRmxlZXRTdGF0dXMiLCJjb3VudCIsInRleHRDb250ZW50IiwiY29uY2F0IiwicmVuZGVyQm9hcmQiLCJib2FyZEVsIiwiaXNFbmVteSIsImlubmVySFRNTCIsImNlbGwiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwiZGF0YXNldCIsImFwcGVuZENoaWxkIiwidXBkYXRlTWVzc2FnZSIsIm1zZyIsInNob3dHYW1lT3ZlciIsImNvbXB1dGVyU2VjdGlvbkVsIiwicmVtb3ZlIiwiYmluZEF0dGFja0hhbmRsZXIiLCJoYW5kbGVyIiwiYWRkRXZlbnRMaXN0ZW5lciIsImUiLCJjb250YWlucyIsInBhcnNlSW50IiwiYmluZFJhbmRvbWl6ZUhhbmRsZXIiLCJiaW5kU3RhcnRIYW5kbGVyIiwiYmluZFJlc3RhcnRIYW5kbGVyIiwiaHVtYW4iLCJjb21wdXRlciIsImdhbWVTdGFydGVkIiwiZ2FtZU92ZXIiLCJzaGlwTGVuZ3RocyIsImluaXRHYW1lIiwicmFuZG9taXplQm9hcmQiLCJyZW5kZXJCb2FyZHMiLCJmb3JFYWNoIiwicGxhY2VkIiwiaGFuZGxlQXR0YWNrIiwiZW5kR2FtZSIsInNldFRpbWVvdXQiLCJtZXNzYWdlIl0sInNvdXJjZVJvb3QiOiIifQ==