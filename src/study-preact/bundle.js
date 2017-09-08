/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _preact = __webpack_require__(1);

(0, _preact.render)((0, _preact.h)(
	"div",
	{ id: "foo" },
	(0, _preact.h)(
		"span",
		null,
		"Hello, world!"
	)
), document.body);

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.render = render;
exports.h = h;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var EMPTY = {};
var NO_RENDER = { render: false };
var SYNC_RENDER = { renderSync: true };
var DOM_RENDER = { build: true };
var EMPTY_BASE = '';
var NON_DIMENSION_PROPS = {
	boxFlex: 1, boxFlexGroup: 1, columnCount: 1, fillOpacity: 1, flex: 1, flexGrow: 1,
	flexPositive: 1, flexShrink: 1, flexNegative: 1, fontWeight: 1, lineClamp: 1, lineHeight: 1,
	opacity: 1, order: 1, orphans: 1, strokeOpacity: 1, widows: 1, zIndex: 1, zoom: 1
};

var slice = Array.prototype.slice;

var hop = Object.prototype.hasOwnProperty;

/** 工具函数，生成一个带有缓存的函数
 *	@private
 */
var memoize = function memoize(fn) {
	var mem = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	return function (k) {
		return hop.call(mem, k) ? mem[k] : mem[k] = fn(k);
	};
};

/** 类似lodash的get，获取obj的嵌套值
 *	@private
 */
var delve = function delve(obj, key) {
	return key.split('.').map(function (p) {
		return obj = obj && obj[p];
	}), obj;
};

/** Global options
 *	@public
 *	@namespace {Object}
 */
var options = {
	/** If `true`, `prop` changes trigger synchronous component updates.
   * 如果true，prop改变就会触发同步的组件更新
  *	@boolean
  */
	syncComponentUpdates: true
};

/** Global hook methods
 * ？？
 *	@public
 *	@namespace {Object}
 */
var hooks = {

	/** Processes all created VNodes.
  *	@param {VNode} vnode	A newly-created VNode to normalize/process
  *	@protected
  */
	vnode: function vnode(_ref) {
		var attributes = _ref.attributes;

		if (!attributes) return;

		var s = attributes.style;
		if (s && !s.substring) {
			attributes.style = styleObjToCss(s);
		}

		var c = attributes['class'];
		if (hop.call(attributes, 'className')) {
			c = attributes['class'] = attributes.className;
			delete attributes.className;
		}
		if (c && !c.substring) {
			attributes['class'] = hashToClassName(c);
		}
	}
};

/** Base Component class, for he ES6 Class method of creating Components
 *	@public
 *
 *	@example
 *	class MyFoo extends Component {
 *		render(props, state) {
 *			return <div />;
 *		}
 *	}
 */

var Component = exports.Component = function () {
	function Component() {
		_classCallCheck(this, Component);

		/** @private */
		this._dirty = this._disableRendering = false;
		/** @private */
		this._linkedStates = {};
		/** @public */
		this.nextProps = this.base = null;
		/** @type {object} */
		// 触发getDefaultProps生命周期
		this.props = hook(this, 'getDefaultProps') || {};
		/** @type {object} */
		// 触发getInitialState生命周期
		this.state = hook(this, 'getInitialState') || {};
		// @TODO remove me?
		hook(this, 'initialize');
	}

	/** Returns a `boolean` value indicating if the component should re-render when receiving the given `props` and `state`.
  *	@param {object} props
  *	@param {object} state
  */


	_createClass(Component, [{
		key: 'shouldComponentUpdate',
		value: function shouldComponentUpdate(props, state) {
			return true;
		}

		/** Returns a function that sets a state property when called.
   *	Calling linkState() repeatedly with the same arguments returns a cached link function.
   *
   *	Provides some built-in special cases:
   *		- Checkboxes and radio buttons link their boolean `checked` value
   *		- Inputs automatically link their `value` property
   *		- Event paths fall back to any associated Component if not found on an element
   *		- If linked value is a function, will invoke it and use the result
   *
   *	@param {string} key				The path to set - can be a dot-notated deep key
   *	@param {string} [eventPath]		If set, attempts to find the new state value at a given dot-notated path within the object passed to the linkedState setter.
   *	@returns {function} linkStateSetter(e)
   *
   *	@example Update a "text" state value when an input changes:
   *		<input onChange={ this.linkState('text') } />
   *
   *	@example Set a deep state value on click
    *		<button onClick={ this.linkState('touch.coords', 'touches.0') }>Tap</button
    理解为一个简单的双向绑定实现
   */

	}, {
		key: 'linkState',
		value: function linkState(key, eventPath) {
			var c = this._linkedStates,
			    cacheKey = key + '|' + (eventPath || '');
			return c[cacheKey] || (c[cacheKey] = createLinkedState(this, key, eventPath));
		}

		/** Update component state by copying properties from `state` to `this.state`.
   *	@param {object} state		A hash of state properties to update with new values
   */

	}, {
		key: 'setState',
		value: function setState(state) {
			extend(this.state, state);
			triggerComponentRender(this);
		}

		/** @private */
		// ？？

	}, {
		key: 'setProps',
		value: function setProps(props, opts) {
			return setComponentProps(this, props, opts);
		}

		/** Accepts `props` and `state`, and returns a new Virtual DOM tree to build.
   *	Virtual DOM is generally constructed via [JSX](http://jasonformat.com/wtf-is-jsx).
   *	@param {object} props		Props (eg: JSX attributes) received from parent element/component
   *	@param {object} state		The component's current state
   *	@returns VNode
   */

	}, {
		key: 'render',
		value: function render(props) {
			return h('div', null, props.children);
		}
	}]);

	return Component;
}();

/** Virtual DOM Node */
// 虚拟DOM节点类


var VNode = exports.VNode = function VNode(nodeName, attributes, children) {
	_classCallCheck(this, VNode);

	/** @type {string|function} */
	this.nodeName = nodeName;

	/** @type {object<string>|undefined} */
	this.attributes = attributes;

	/** @type {array<VNode>|undefined} */
	this.children = children;
};

VNode.prototype.__isVNode = true;

/** Render JSX into a `parent` Element.
 *	@param {VNode} vnode		A (JSX) VNode to render
 *	@param {Element} parent		DOM element to render into
 *	@param {Element} [merge]	Attempt to re-use an existing DOM tree rooted at `merge`
 *	@public
 *
 *	@example
 *	// render a div into <body>:
 *	render(<div id="hello">hello!</div>, document.body);
 *
 *	@example
 *	// render a "Thing" component into #foo:
 *	const Thing = ({ name }) => <span>{ name }</span>;
 *	render(<Thing name="one" />, document.querySelector('#foo'));
 */
function render(vnode, parent) {
	var merge = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

	var existing = merge && merge._component && merge._componentConstructor === vnode.nodeName,
	    built = build(merge, vnode),
	    c = !existing && built._component;
	if (c) deepHook(c, 'componentWillMount');
	if (build.parentNode !== parent) {
		parent.appendChild(built);
	}
	if (c) deepHook(c, 'componentDidMount');
	return built;
}

/** @public JSX/hyperscript reviver
 *	@see http://jasonformat.com/wtf-is-jsx
 *  @example
 *  /** @jsx h *\/
 *  import { render, h } from 'preact';
 *  render(<span>foo</span>, document.body);
 */
function h(nodeName, attributes) {
	for (var _len = arguments.length, args = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
		args[_key - 2] = arguments[_key];
	}

	var children = void 0,
	    sharedArr = [],
	    len = args.length,
	    arr = void 0,
	    lastSimple = void 0;
	if (len) {
		children = [];
		for (var i = 0; i < len; i++) {
			var _p = args[i];
			if (empty(_p)) continue;
			if (_p.join) {
				arr = _p;
			} else {
				arr = sharedArr;
				arr[0] = _p;
			}
			for (var j = 0; j < arr.length; j++) {
				var child = arr[j],
				    simple = !empty(child) && !isVNode(child);
				if (simple) child = String(child);
				if (simple && lastSimple) {
					children[children.length - 1] += child;
				} else if (!empty(child)) {
					children.push(child);
				}
				lastSimple = simple;
			}
		}
	}

	if (attributes && attributes.children) {
		delete attributes.children;
	}

	var p = new VNode(nodeName, attributes || undefined, children || undefined);
	hook(hooks, 'vnode', p);
	return p;
}

/** Invoke a "hook" method with arguments if it exists.
 *	@private
 */
function hook(obj, name) {
	var fn = obj[name];

	for (var _len2 = arguments.length, args = Array(_len2 > 2 ? _len2 - 2 : 0), _key2 = 2; _key2 < _len2; _key2++) {
		args[_key2 - 2] = arguments[_key2];
	}

	if (fn && typeof fn === 'function') return fn.apply(obj, args);
}

/** Invoke hook() on a component and child components (recursively)
 *	@private
 */
function deepHook(obj) {
	for (var _len3 = arguments.length, args = Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {
		args[_key3 - 1] = arguments[_key3];
	}

	do {
		hook.apply(undefined, [obj].concat(args));
	} while (obj = obj._component);
}

/** Fast check if an object is a VNode.
 *	@private
 */
function isVNode(obj) {
	return obj && obj.__isVNode === true;
}

/** Check if a value is `null` or `undefined`.
 *	@private
 */
function empty(x) {
	return x === null || x === undefined;
}

/** Check if two nodes are equivalent.
 *	@param {Element} node
 *	@param {VNode} vnode
 *	@private
 */
function isSameNodeType(node, vnode) {
	if (node.nodeType === 3) {
		return typeof vnode === 'string';
	}
	if (isFunctionalComponent(vnode)) return true;
	var nodeName = vnode.nodeName;
	if (typeof nodeName === 'function') return node._componentConstructor === nodeName;
	return node.nodeName.toLowerCase() === nodeName;
}

/** Check if a VNode is a reference to a stateless functional component.
 *	A function component is represented as a VNode whose `nodeName` property is a reference to a function.
 *	If that function is not a Component (ie, has no `.render()` method on a prototype), it is considered a stateless functional component.
 *	@param {VNode} vnode	A VNode
 *	@private
 */
function isFunctionalComponent(_ref2) {
	var nodeName = _ref2.nodeName;

	return typeof nodeName === 'function' && !nodeName.prototype.render;
}

/** Construct a resultant VNode from a VNode referencing a stateless functional component.
 *	@param {VNode} vnode	A VNode with a `nodeName` property that is a reference to a function.
 *	@private
 */
function buildFunctionalComponent(vnode) {
	return vnode.nodeName(getNodeProps(vnode)) || EMPTY_BASE;
}

/** Mark component as dirty and queue up a render.
 *	@param {Component} component
 *	@private
 */
function triggerComponentRender(component) {
	if (!component._dirty) {
		component._dirty = true;
		renderQueue.add(component);
	}
}

/** Set a component's `props` (generally derived from JSX attributes).
*	@param {Object} props
*	@param {Object} [opts]
*	@param {boolean} [opts.renderSync=false]	If `true` and {@link options.syncComponentUpdates} is `true`, triggers synchronous rendering.
*	@param {boolean} [opts.render=true]			If `false`, no render will be triggered.
 */
function setComponentProps(component, props) {
	var opts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : EMPTY;

	var d = component._disableRendering;
	component._disableRendering = true;
	hook(component, 'componentWillReceiveProps', props, component.props);
	component.nextProps = props;
	component._disableRendering = d;
	if (opts.render !== false) {
		if (opts.renderSync || options.syncComponentUpdates) {
			renderComponent(component);
		} else {
			triggerComponentRender(component);
		}
	}
}

/** Render a Component, triggering necessary lifecycle events and taking High-Order Components into account.
 *	@param {Component} component
 *	@param {Object} [opts]
 *	@param {boolean} [opts.build=false]		If `true`, component will build and store a DOM node if not already associated with one.
 *	@private
 */
function renderComponent(component, opts) {
	if (component._disableRendering) return;

	component._dirty = false;

	var p = component.nextProps,
	    s = component.state;

	if (component.base) {
		if (hook(component, 'shouldComponentUpdate', p, s) === false) {
			component.props = p;
			return;
		}

		hook(component, 'componentWillUpdate', p, s);
	}

	component.props = p;

	var rendered = hook(component, 'render', p, s),
	    childComponent = rendered && rendered.nodeName,
	    base = void 0;

	if (typeof childComponent === 'function' && childComponent.prototype.render) {
		// set up high order component link

		var inst = component._component;
		if (inst && inst.constructor !== childComponent) {
			unmountComponent(component.base, inst);
			inst = null;
		}

		var childProps = getNodeProps(rendered);

		if (inst) {
			setComponentProps(inst, childProps, SYNC_RENDER);
		} else {
			inst = componentRecycler.create(childComponent);
			inst._parentComponent = component;
			component._component = inst;
			if (component.base) deepHook(inst, 'componentWillMount');
			setComponentProps(inst, childProps, NO_RENDER);
			renderComponent(inst, opts);
			if (component.base) deepHook(inst, 'componentDidMount');
		}

		base = inst.base;
	} else {
		// destroy high order component link
		if (component._component) {
			unmountComponent(component.base, component._component);
		}
		component._component = null;

		if (component.base || opts && opts.build) {
			base = build(component.base, rendered || EMPTY_BASE, component);
		}
	}

	if (component.base && base !== component.base) {
		var _p2 = component.base.parentNode;
		if (_p2) _p2.replaceChild(base, component.base);
	}

	component.base = base;
	if (base) {
		base._component = component;
		base._componentConstructor = component.constructor;
	}

	hook(component, 'componentDidUpdate', p, s);

	return rendered;
}

/** Apply the Component referenced by a VNode to the DOM.
 *	@param {Element} dom	The DOM node to mutate
 *	@param {VNode} vnode	A Component-referencing VNode
 *	@returns {Element} dom	The created/mutated element
 *	@private
 */
function buildComponentFromVNode(dom, vnode) {
	var c = dom && dom._component;

	if (isFunctionalComponent(vnode)) {
		var p = build(dom, buildFunctionalComponent(vnode));
		p._componentConstructor = vnode.nodeName;
		return p;
	}

	var isOwner = c && dom._componentConstructor === vnode.nodeName;
	while (c && !isOwner && (c = c._parentComponent)) {
		isOwner = c.constructor === vnode.nodeName;
	}

	if (isOwner) {
		setComponentProps(c, getNodeProps(vnode), SYNC_RENDER);
	} else {
		if (c) {
			unmountComponent(dom, c);
		}
		dom = createComponentFromVNode(vnode);
	}

	return dom;
}

/** Instantiate and render a Component, given a VNode whose nodeName is a constructor.
 *	@param {VNode} vnode
 *	@private
 */
function createComponentFromVNode(vnode) {
	var component = componentRecycler.create(vnode.nodeName);

	var props = getNodeProps(vnode);
	setComponentProps(component, props, NO_RENDER);
	renderComponent(component, DOM_RENDER);

	// let node = component.base;
	//if (!node._component) {
	//	node._component = component;
	//	node._componentConstructor = vnode.nodeName;
	//}

	return component.base;
}

/** Remove a component from the DOM and recycle it.
 *	@param {Element} dom			A DOM node from which to unmount the given Component
 *	@param {Component} component	The Component instance to unmount
 *	@private
 */
function unmountComponent(dom, component) {
	console.warn('unmounting mismatched component', component);

	if (dom._component === component) {
		delete dom._component;
		delete dom._componentConstructor;
	}
	hook(component, 'componentWillUnmount');
	var base = component.base;
	if (base && base.parentNode) {
		base.parentNode.removeChild(base);
	}
	hook(component, 'componentDidUnmount');
	componentRecycler.collect(component);
}

/** Apply differences in a given vnode (and it's deep children) to a real DOM Node.
 *	@param {Element} [dom=null]		A DOM node to mutate into the shape of the `vnode`
 *	@param {VNode} vnode			A VNode (with descendants forming a tree) representing the desired DOM structure
 *	@returns {Element} dom			The created/mutated element
 *	@private
 */
function build(dom, vnode) {
	var out = dom,
	    nodeName = vnode.nodeName;

	if (typeof nodeName === 'function' && !nodeName.prototype.render) {
		vnode = buildFunctionalComponent(vnode);
		nodeName = vnode.nodeName;
	}

	if (typeof nodeName === 'function') {
		return buildComponentFromVNode(dom, vnode);
	}

	if (typeof vnode === 'string') {
		if (dom) {
			if (dom.nodeType === 3) {
				dom.textContent = vnode;
				return dom;
			} else {
				if (dom.nodeType === 1) recycler.collect(dom);
			}
		}
		return document.createTextNode(vnode);
	}

	if (nodeName === null || nodeName === undefined) {
		nodeName = 'x-undefined-element';
	}

	if (!dom) {
		out = recycler.create(nodeName);
	} else if (dom.nodeName.toLowerCase() !== nodeName) {
		out = recycler.create(nodeName);
		appendChildren(out, slice.call(dom.childNodes));
		// reclaim element nodes
		if (dom.nodeType === 1) recycler.collect(dom);
	}

	// apply attributes
	var old = getNodeAttributes(out) || EMPTY,
	    attrs = vnode.attributes || EMPTY;

	// removed attributes
	if (old !== EMPTY) {
		for (var name in old) {
			if (hop.call(old, name)) {
				var o = attrs[name];
				if (o === undefined || o === null || o === false) {
					setAccessor(out, name, null, old[name]);
				}
			}
		}
	}

	// new & updated attributes
	if (attrs !== EMPTY) {
		for (var _name in attrs) {
			if (hop.call(attrs, _name)) {
				var value = attrs[_name];
				if (value !== undefined && value !== null && value !== false) {
					var prev = getAccessor(out, _name, old[_name]);
					if (value !== prev) {
						setAccessor(out, _name, value, prev);
					}
				}
			}
		}
	}

	var children = slice.call(out.childNodes);
	var keyed = {};
	for (var i = children.length; i--;) {
		var t = children[i].nodeType;
		var key = void 0;
		if (t === 3) {
			key = t.key;
		} else if (t === 1) {
			key = children[i].getAttribute('key');
		} else {
			continue;
		}
		if (key) keyed[key] = children.splice(i, 1)[0];
	}
	var newChildren = [];

	if (vnode.children) {
		for (var _i = 0, vlen = vnode.children.length; _i < vlen; _i++) {
			var vchild = vnode.children[_i];
			// if (isFunctionalComponent(vchild)) {
			// 	vchild = buildFunctionalComponent(vchild);
			// }
			var _attrs = vchild.attributes,
			    _key4 = void 0,
			    child = void 0;
			if (_attrs) {
				_key4 = _attrs.key;
				child = _key4 && keyed[_key4];
			}

			// attempt to pluck a node of the same type from the existing children
			if (!child) {
				var len = children.length;
				if (children.length) {
					for (var j = 0; j < len; j++) {
						if (isSameNodeType(children[j], vchild)) {
							child = children.splice(j, 1)[0];
							break;
						}
					}
				}
			}

			// morph the matched/found/created DOM child to match vchild (deep)
			newChildren.push(build(child, vchild));
		}
	}

	// apply the constructed/enhanced ordered list to the parent
	for (var _i2 = 0, _len4 = newChildren.length; _i2 < _len4; _i2++) {
		// we're intentionally re-referencing out.childNodes here as it is a live NodeList
		if (out.childNodes[_i2] !== newChildren[_i2]) {
			var _child = newChildren[_i2],
			    c = _child._component,
			    next = out.childNodes[_i2 + 1];
			if (c) deepHook(c, 'componentWillMount');
			if (next) {
				out.insertBefore(_child, next);
			} else {
				out.appendChild(_child);
			}
			if (c) deepHook(c, 'componentDidMount');
		}
	}

	// remove orphaned children
	for (var _i3 = 0, _len5 = children.length; _i3 < _len5; _i3++) {
		var _child2 = children[_i3],
		    _c = _child2._component;
		if (_c) hook(_c, 'componentWillUnmount');
		_child2.parentNode.removeChild(_child2);
		if (_c) {
			hook(_c, 'componentDidUnmount');
			componentRecycler.collect(_c);
		} else if (_child2.nodeType === 1) {
			recycler.collect(_child2);
		}
	}

	return out;
}

/** Create an Event handler function that sets a given state property.
 *	@param {Component} component	The component whose state should be updated
 *	@param {string} key				A dot-notated key path to update in the component's state
 *	@param {string} eventPath		A dot-notated key path to the value that should be retrieved from the Event or component
 *	@returns {function} linkedStateHandler
 *	@private
 */
function createLinkedState(component, key, eventPath) {
	var path = key.split('.'),
	    p0 = path[0];
	return function (e) {
		var t = this,
		    obj = component.state,
		    v = void 0,
		    i = void 0;
		if (typeof eventPath === 'string') {
			v = delve(e, eventPath);
			if (empty(v) && (t = t._component)) {
				v = delve(t, eventPath);
			}
		} else {
			v = (t.nodeName + t.type).match(/^input(checkbox|radio)$/i) ? t.checked : t.value;
		}
		if (typeof v === 'function') v = v.call(t);
		for (i = 0; i < path.length - 1; i++) {
			obj = obj[path[i]] || {};
		}
		obj[path[i]] = v;
		component.setState(_defineProperty({}, p0, component.state[p0]));
	};
}

/** Managed queue of dirty components to be re-rendered.
 *	@private
 */
var renderQueue = {
	// items/itemsOffline swap on each process() call (just a simple pool technique)
	items: [],
	itemsOffline: [],

	add: function add(component) {
		if (renderQueue.items.push(component) !== 1) return;

		var d = hooks.debounceRendering;
		if (d) d(renderQueue.process);else setTimeout(renderQueue.process, 0);
	},
	process: function process() {
		var items = renderQueue.items,
		    len = items.length;
		if (!len) return;
		renderQueue.items = renderQueue.itemsOffline;
		renderQueue.items.length = 0;
		renderQueue.itemsOffline = items;
		while (len--) {
			if (items[len]._dirty) {
				renderComponent(items[len]);
			}
		}
	}
};

/** Trigger all queued component renders.
 *	@function
 */
var rerender = renderQueue.process;

/** DOM node pool, keyed on nodeName.
 *	@private
 */
var recycler = {
	nodes: {},
	normalizeName: memoize(function (name) {
		return name.toUpperCase();
	}),

	collect: function collect(node) {
		recycler.clean(node);
		var name = recycler.normalizeName(node.nodeName),
		    list = recycler.nodes[name];
		if (list) list.push(node);else recycler.nodes[name] = [node];
	},
	create: function create(nodeName) {
		var name = recycler.normalizeName(nodeName),
		    list = recycler.nodes[name];
		return list && list.pop() || document.createElement(nodeName);
	},
	clean: function clean(node) {
		node.remove();

		if (node.nodeType === 3) return;

		delete node._component;
		delete node._componentConstructor;

		// remove event listeners & registry
		var l = node._listeners;
		delete node._listeners;
		if (l) for (var i in l) {
			node.removeEventListener(i, eventProxy);
		} // strip attributes
		var len = node.attributes && node.attributes.length;
		if (len) for (var _i4 = len; _i4--;) {
			node.removeAttribute(node.attributes[_i4].name);
		}

		// if (node.childNodes.length>0) {
		// 	console.warn(`Warning: Recycler collecting <${node.nodeName}> with ${node.childNodes.length} children.`);
		// 	slice.call(node.childNodes).forEach(recycler.collect);
		// }
	}
};

/** Retains a pool of Components for re-use, keyed on component name.
 *	@private
 */
var componentRecycler = {
	components: {},

	collect: function collect(component) {
		var name = component.constructor.name,
		    list = componentRecycler.components[name];
		if (list) list.push(component);else componentRecycler.components[name] = [component];
	},
	create: function create(ctor) {
		var list = componentRecycler.components[ctor.name];
		if (list && list.length) {
			for (var i = list.length; i--;) {
				if (list[i].constructor === ctor) {
					return list.splice(i, 1)[0];
				}
			}
		}
		return new ctor();
	}
};

/** Append multiple children to a Node.
 *	Uses a Document Fragment to batch when appending 2 or more children
 *	@private
 */
function appendChildren(parent, children) {
	var len = children.length;
	if (len <= 2) {
		parent.appendChild(children[0]);
		if (len === 2) parent.appendChild(children[1]);
		return;
	}

	var frag = document.createDocumentFragment();
	for (var i = 0; i < len; i++) {
		frag.appendChild(children[i]);
	}parent.appendChild(frag);
}

/** Retrieve the value of a rendered attribute
 *	@private
 */
function getAccessor(node, name, value) {
	if (name === 'class') return node.className;
	if (name === 'style') return node.style.cssText;
	return value;
}

/** Set a named attribute on the given Node, with special behavior for some names and event handlers.
 *	If `value` is `null`, the attribute/handler will be removed.
 *	@private
 */
function setAccessor(node, name, value, old) {
	if (name === 'class') {
		node.className = value;
	} else if (name === 'style') {
		node.style.cssText = value;
	} else {
		setComplexAccessor(node, name, value, old);
	}
}

/** For props without explicit behavior, apply to a Node as event handlers or attributes.
 *	@private
 */
function setComplexAccessor(node, name, value, old) {
	if (name.substring(0, 2) === 'on') {
		var _type = normalizeEventName(name),
		    l = node._listeners || (node._listeners = {});
		if (!l[_type]) node.addEventListener(_type, eventProxy);
		l[_type] = value;
		// @TODO automatically remove proxy event listener when no handlers are left
		return;
	}

	var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
	if (value === null) {
		node.removeAttribute(name);
	} else if (type !== 'function' && type !== 'object') {
		node.setAttribute(name, value);
	}
}

/** Proxy an event to hooked event handlers
 *	@private
 */
function eventProxy(e) {
	var fn = this._listeners[normalizeEventName(e.type)];
	if (fn) return fn.call(this, hook(hooks, 'event', e) || e);
}

/** Convert an Event name/type to lowercase and strip any "on*" prefix.
 *	@function
 *	@private
 */
var normalizeEventName = memoize(function (t) {
	return t.replace(/^on/i, '').toLowerCase();
});

/** Get a node's attributes as a hashmap, regardless of type.
 *	@private
 */
function getNodeAttributes(node) {
	var list = node.attributes;
	if (!list || !list.getNamedItem) return list;
	if (list.length) return getAttributesAsObject(list);
}

/** Convert a DOM `.attributes` NamedNodeMap to a hashmap.
 *	@private
 */
function getAttributesAsObject(list) {
	var attrs = {};
	for (var i = list.length; i--;) {
		var item = list[i];
		attrs[item.name] = item.value;
	}
	return attrs;
}

/** Reconstruct Component-style `props` from a VNode
 *	@private
 */
function getNodeProps(vnode) {
	var props = extend({}, vnode.attributes);
	if (vnode.children) {
		props.children = vnode.children;
	}
	return props;
}

/** Convert a hashmap of styles to CSSText
 *	@private
 */
function styleObjToCss(s) {
	var str = '',
	    sep = ': ',
	    term = '; ';
	for (var prop in s) {
		if (hop.call(s, prop)) {
			var val = s[prop];
			str += jsToCss(prop);
			str += sep;
			str += val;
			if (typeof val === 'number' && !hop.call(NON_DIMENSION_PROPS, prop)) {
				str += 'px';
			}
			str += term;
		}
	}
	return str;
}

/** Convert a hashmap of CSS classes to a space-delimited className string
 *	@private
 */
function hashToClassName(c) {
	var str = '';
	for (var prop in c) {
		if (c[prop]) {
			if (str) str += ' ';
			str += prop;
		}
	}
	return str;
}

/** Convert a JavaScript camel-case CSS property name to a CSS property name
 *	@private
 *	@function
 */
var jsToCss = memoize(function (s) {
	return s.replace(/([A-Z])/, '-$1').toLowerCase();
});

/** Copy own-properties from `props` onto `obj`.
 *	@returns obj
 *	@private
 */
function extend(obj, props) {
	for (var i in props) {
		if (hop.call(props, i)) {
			obj[i] = props[i];
		}
	}return obj;
}

exports.options = options;
exports.hooks = hooks;
exports.rerender = rerender;
exports.default = { options: options, hooks: hooks, render: render, rerender: rerender, h: h, Component: Component };

/***/ })
/******/ ]);