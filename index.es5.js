'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(['', ''], ['', '']);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

{
  (function () {

    var dependencies = new (function () {
      function _class() {
        var _this = this;

        _classCallCheck(this, _class);

        this.list = [window.Promise || '//cdn.jsdelivr.net/npm/es6-promise@4.2.4/dist/es6-promise.auto.min.js#script', window.fetch || '//cdn.jsdelivr.net/npm/whatwg-fetch@v2.0.3/fetch.min.js#script', '//cdn.jsdelivr.net/npm/jinkela@1.3.7/umd.min.js', '//cdn.jsdelivr.net/npm/marked@0.3.17/marked.min.js', '//cdn.jsdelivr.net/npm/highlight.js@9.12.0/lib/highlight.min.js', '//cdn.jsdelivr.net/npm/highlight.js@9.12.0/styles/default.min.css#link', '//cdn.jsdelivr.net/npm/smooth-scroll@12.1.5/dist/js/smooth-scroll.min.js'];
        this._count = this.list.length;
        this.status = 0;
        this._loaded = 0;
        this._handlers = [];
        this._result = [];
        this.list.forEach(function (what, index) {
          _this._loadOne(what, _this._done.bind(_this, index), _this._fail.bind(_this));
        });
      }

      _createClass(_class, [{
        key: 'then',
        value: function then(done, fail) {
          this._handlers.push({ 1: done, '-1': fail });
          if (this.status) this._doHandlers();
        }
      }, {
        key: '_done',
        value: function _done(index, value) {
          if (this.status || index in this._result) return;
          this._result[index] = value;
          this._loaded++;
          if (this._loaded === this._count) {
            this.status = 1;
            this._doHandlers();
          }
        }
      }, {
        key: '_fail',
        value: function _fail(error) {
          if (this.status) return;
          this._error = error;
          this.status = -1;
          this._doHandlers();
        }
      }, {
        key: '_doHandlers',
        value: function _doHandlers() {
          var _this2 = this;

          this._handlers.splice(0).map(function (item) {
            return item[_this2.status];
          }).forEach(function (f) {
            return f && f(_this2._value);
          });
        }
      }, {
        key: '_loadOne',
        value: function _loadOne(what, resolve, reject) {
          if (typeof what !== 'string') return resolve(what);

          var _what$split = what.split('#'),
              _what$split2 = _slicedToArray(_what$split, 2),
              url = _what$split2[0],
              loader = _what$split2[1];

          (function () {
            switch (loader) {
              case 'script':
                var script = document.createElement('script');
                script.src = url;
                script.addEventListener('load', function () {
                  setTimeout(function () {
                    resolve(script);
                  });
                });
                script.addEventListener('error', reject);
                document.head.appendChild(script);
                break;
              case 'link':
                var link = document.createElement('link');
                link.rel = 'stylesheet';
                link.href = url;
                link.addEventListener('load', resolve.bind(null, link));
                link.addEventListener('error', reject);
                document.head.appendChild(link);
                break;
              default:
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.addEventListener('load', function () {
                  var type = xhr.getResponseHeader('Content-Type');
                  if (!xhr.status === 200 || !/\b(javascript)\b/.test(type)) throw xhr.responseText;
                  var module = { exports: {} };
                  try {
                    new Function('module', 'exports', xhr.responseText)(module, module.exports);
                  } catch (error) {
                    reject(error);
                  }
                  resolve(module.exports);
                });
                xhr.addEventListener('error', reject);
                xhr.send();
            }
          })();
        }
      }, {
        key: '_value',
        get: function get() {
          return { 1: this._result, '-1': this._error }[this.status];
        }
      }]);

      return _class;
    }())();

    window.reciper = function (config) {
      return dependencies.then(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 7),
            Jinkela = _ref2[2],
            marked = _ref2[3],
            hljs = _ref2[4],
            SmoothScroll = _ref2[6];

        var smoothScroll = new SmoothScroll();

        /**
         * 导航
        **/

        var Logo = function (_Jinkela) {
          _inherits(Logo, _Jinkela);

          function Logo() {
            _classCallCheck(this, Logo);

            return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
          }

          _createClass(Logo, [{
            key: 'init',
            value: function init() {
              if (config.logoUrl) {
                var img = document.createElement('img');
                img.src = config.logoUrl;
                this.content = img;
              } else {
                var text = config.name[0].toUpperCase();
                if (text.charCodeAt(0) < 256) text += config.name[1];
                this.content = text;
              }
              this.element.href = this.href || config.home;
            }
          }, {
            key: 'template',
            get: function get() {
              return '<a class="logo"><meta ref="content" /></a>';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          margin: auto;\n          cursor: pointer;\n          display: flex;\n          justify-content: center;\n          align-items: center;\n          > * {\n            display: block;\n            max-width: 100%;\n            max-height: 100%;\n          }\n          > span {\n            width: 100%;\n            height: 100%;\n            text-align: center;\n            background: #f5f5f5;\n            border-radius: 100%;\n          }\n        }\n      ';
            }
          }]);

          return Logo;
        }(Jinkela);

        var NavItemDroppingPanel = function (_Jinkela2) {
          _inherits(NavItemDroppingPanel, _Jinkela2);

          function NavItemDroppingPanel() {
            _classCallCheck(this, NavItemDroppingPanel);

            return _possibleConstructorReturn(this, (NavItemDroppingPanel.__proto__ || Object.getPrototypeOf(NavItemDroppingPanel)).apply(this, arguments));
          }

          _createClass(NavItemDroppingPanel, [{
            key: 'show',
            value: function show() {
              this.element.classList.add('active');
            }
          }, {
            key: 'hide',
            value: function hide() {
              this.element.classList.remove('active');
            }
          }, {
            key: 'init',
            value: function init() {
              NavItem.from(this.list).to(this);
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          position: absolute;\n          top: 100%;\n          left: 0px;\n          visibility: hidden;\n          background: #fff;\n          box-shadow: 0 4px 15px rgba(0, 0, 0, .175);\n          border-radius: 4px;\n          text-align: center;\n          opacity: 0;\n          transform: translateY(-3px);\n          transition: opacity .2s ease, visibility .2s, transform .2s ease;\n          &.active {\n            opacity: 1;\n            visibility: visible;\n            transform: translateY(0);\n          }\n        }\n        @media (max-width: 720px) {\n          .FrameMenuNav :scope {\n            position: static;\n            display: block;\n            > * {\n              line-height: 32px;\n              display: block;\n              margin-left: 1em;\n            }\n          }\n        }\n      ';
            }
          }]);

          return NavItemDroppingPanel;
        }(Jinkela);

        var NavItemDroppingTip = function (_Jinkela3) {
          _inherits(NavItemDroppingTip, _Jinkela3);

          function NavItemDroppingTip() {
            _classCallCheck(this, NavItemDroppingTip);

            return _possibleConstructorReturn(this, (NavItemDroppingTip.__proto__ || Object.getPrototypeOf(NavItemDroppingTip)).apply(this, arguments));
          }

          _createClass(NavItemDroppingTip, [{
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          border-style: solid;\n          border-width: 8px 5px 0px 5px;\n          border-right-color: transparent;\n          border-bottom-color: transparent;\n          border-left-color: transparent;\n          margin-left: .5em;\n          display: inline-block;\n          line-height: 14px;\n        }\n      ';
            }
          }]);

          return NavItemDroppingTip;
        }(Jinkela);

        var NavItem = function (_Jinkela4) {
          _inherits(NavItem, _Jinkela4);

          function NavItem() {
            _classCallCheck(this, NavItem);

            return _possibleConstructorReturn(this, (NavItem.__proto__ || Object.getPrototypeOf(NavItem)).apply(this, arguments));
          }

          _createClass(NavItem, [{
            key: 'update',
            value: function update() {
              this.active = this.href === location.pathname;
            }
          }, {
            key: 'init',
            value: function init() {
              var _this7 = this;

              var a = this.element.firstElementChild;
              if (this.href) {
                if (this.target) a.setAttribute('target', this.target);
              } else {
                this.href = 'javascript:';
              }
              this.update();
              if (this.children) {
                (function () {
                  var panel = new NavItemDroppingPanel({ list: _this7.children }).to(_this7);
                  new NavItemDroppingTip().to(a);
                  _this7.element.addEventListener('mouseenter', function () {
                    if (_this7.element.matches('.FrameMenuNav *')) return;
                    panel.show();
                  });
                  _this7.element.addEventListener('mouseleave', function () {
                    if (_this7.element.matches('.FrameMenuNav *')) return;
                    panel.hide();
                  });
                })();
              }
            }
          }, {
            key: 'active',
            set: function set(value) {
              var a = this.element.firstElementChild;
              a.classList[value ? 'add' : 'remove']('active');
            },
            get: function get() {
              var a = this.element.firstElementChild;
              return a.classList.contains('active');
            }
          }, {
            key: 'template',
            get: function get() {
              return '<span><a href="{href}">{text}</a></span>';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          position: relative;\n          display: inline-block;\n          a {\n            white-space: nowrap;\n            text-decoration: none;\n            color: ' + config.primaryColor + ';\n            margin: 0 1em;\n            position: relative;\n            &.active, &:hover {\n              &::after {\n                position: absolute;\n                content: \'\';\n                background: ' + config.primaryColor + ';\n                height: 3px;\n                bottom: -5px;\n                left: 0;\n                right: 0;\n              }\n            }\n          }\n        }\n      ';
            }
          }]);

          return NavItem;
        }(Jinkela);

        var Nav = function (_Jinkela5) {
          _inherits(Nav, _Jinkela5);

          function Nav() {
            _classCallCheck(this, Nav);

            return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
          }

          _createClass(Nav, [{
            key: 'init',
            value: function init() {
              this.list = NavItem.from(config.items);
            }
          }, {
            key: 'update',
            value: function update() {
              this.list.forEach(function (item) {
                item.update();
              });
            }
          }, {
            key: 'template',
            get: function get() {
              return '\n          <nav>\n            <meta ref="list" />\n          </nav>\n        ';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n          :scope {\n            height: 40px;\n            line-height: 40px;\n          }\n          .not-home :scope {\n            flex: 1;\n            text-align: right;\n          }\n          .home :scope {\n            order: -1;\n            text-align: center;\n          }\n          @media (max-width: 720px) {\n            .not-home :scope {\n              display: none;\n            }\n          }\n        ';
            }
          }], [{
            key: 'navMap',
            get: function get() {
              var value = {};
              config.items.forEach(function (item) {
                return value[item.href] = item;
              });
              Object.defineProperty(this, 'navMap', { configurable: true, value: value });
              return value;
            }
          }, {
            key: 'current',
            get: function get() {
              return this.navMap[location.pathname];
            }
          }]);

          return Nav;
        }(Jinkela);

        /**
         * 头部
        **/

        var HeaderDescription = function (_Jinkela6) {
          _inherits(HeaderDescription, _Jinkela6);

          function HeaderDescription() {
            _classCallCheck(this, HeaderDescription);

            return _possibleConstructorReturn(this, (HeaderDescription.__proto__ || Object.getPrototypeOf(HeaderDescription)).apply(this, arguments));
          }

          _createClass(HeaderDescription, [{
            key: 'init',
            value: function init() {
              this.element.textContent = config.description;
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        .home :scope {\n          opacity: .5;\n          margin-top: 1em;\n          color: ' + config.primaryColor + ';\n        }\n        .not-home :scope {\n          display: none;\n        }\n      ';
            }
          }]);

          return HeaderDescription;
        }(Jinkela);

        var HeaderName = function (_Jinkela7) {
          _inherits(HeaderName, _Jinkela7);

          function HeaderName() {
            _classCallCheck(this, HeaderName);

            return _possibleConstructorReturn(this, (HeaderName.__proto__ || Object.getPrototypeOf(HeaderName)).apply(this, arguments));
          }

          _createClass(HeaderName, [{
            key: 'template',
            get: function get() {
              return '<a href="' + config.home + '">' + config.name + '</a>';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          text-decoration: none;\n          color: ' + config.primaryColor + ';\n        }\n        .not-home :scope {\n          font-size: 1.5em;\n          font-weight: bold;\n          margin-left: .5em;\n          opacity: .7;\n        }\n        .home :scope {\n          font-size: 48px;\n          margin-top: 1em;\n          font-weight: bold;\n        }\n        @media (max-width: 720px) {\n          .not-home :scope {\n            display: none;\n          }\n        }\n      ';
            }
          }]);

          return HeaderName;
        }(Jinkela);

        var HeaderHamburger = function (_Jinkela8) {
          _inherits(HeaderHamburger, _Jinkela8);

          function HeaderHamburger() {
            _classCallCheck(this, HeaderHamburger);

            return _possibleConstructorReturn(this, (HeaderHamburger.__proto__ || Object.getPrototypeOf(HeaderHamburger)).apply(this, arguments));
          }

          _createClass(HeaderHamburger, [{
            key: 'init',
            value: function init() {
              var _this12 = this;

              this.element.addEventListener('click', function (event) {
                event.dontCareFrameMenuGlobalClose = true;
                event.isHamburgerClick = true;
                if (typeof _this12.onClick === 'function') _this12.onClick(event);
              });
            }
          }, {
            key: 'tagName',
            get: function get() {
              return 'div';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          display: none;\n          position: absolute;\n          background: #777;\n          margin: auto;\n          left: 1em;\n          top: 0;\n          bottom: 0;\n          height: 17px;\n          width: 20px;\n          &:before {\n            content: \'\';\n            display: block;\n            width: 100%;\n            height: 4px;\n            background: #fff;\n            margin: 3px 0;\n          }\n          &:after {\n            content: \'\';\n            display: block;\n            width: 100%;\n            height: 4px;\n            background: #fff;\n            margin: 3px 0;\n          }\n        }\n        @media (max-width: 720px) {\n          .not-home :scope {\n            display: block;\n          }\n        }\n      ';
            }
          }]);

          return HeaderHamburger;
        }(Jinkela);

        var Header = function (_Jinkela9) {
          _inherits(Header, _Jinkela9);

          function Header() {
            _classCallCheck(this, Header);

            return _possibleConstructorReturn(this, (Header.__proto__ || Object.getPrototypeOf(Header)).apply(this, arguments));
          }

          _createClass(Header, [{
            key: 'init',
            value: function init() {
              new HeaderHamburger().to(this);
              new Logo().to(this);
              new HeaderName().to(this);
              new HeaderDescription().to(this);
              this.nav = new Nav().to(this);
            }
          }, {
            key: 'update',
            value: function update() {
              this.nav.update();
            }
          }, {
            key: 'tagName',
            get: function get() {
              return 'header';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n          .not-home :scope {\n            .logo {\n              width: 40px;\n              height: 40px;\n              line-height: 40px;\n              font-size: 20px;\n            }\n            line-height: 40px;\n            box-sizing: border-box;\n            background-color: #fff;\n            box-shadow: 0 0 4px rgba(0,0,0,0.25);\n            padding: 25px 60px;\n            position: relative;\n            width: 100%;\n            display: flex;\n            z-index: 2;\n          }\n          @media (max-width: 720px) {\n            .not-home :scope {\n              padding: .5em 1em .7em 1em;\n              position: fixed;\n              display: block;\n            }\n          }\n          @media (max-width: 720px) {\n            .not-home :scope > div {\n              text-align: center;\n            }\n          }\n          .home :scope {\n            display: flex;\n            flex-direction: column;\n            .logo {\n              margin-top: 50px;\n              width: 240px;\n              height: 240px;\n              line-height: 240px;\n              font-size: 120px;\n            }\n            position: absolute;\n            top: 50%;\n            left: 0;\n            right: 0;\n            transform: translateY(-50%);\n            text-align: center;\n          }\n          @media (max-width: 720px) {\n            .home :scope {\n\n            }\n          }\n          @media (max-width: 720px) {\n            .home :scope > div {\n            }\n          }\n        ';
            }
          }]);

          return Header;
        }(Jinkela);

        /**
         * 左侧菜单
        **/

        var FrameMenuNav = function (_Nav) {
          _inherits(FrameMenuNav, _Nav);

          function FrameMenuNav() {
            _classCallCheck(this, FrameMenuNav);

            return _possibleConstructorReturn(this, (FrameMenuNav.__proto__ || Object.getPrototypeOf(FrameMenuNav)).apply(this, arguments));
          }

          _createClass(FrameMenuNav, [{
            key: 'init',
            value: function init() {
              this.element.classList.add('FrameMenuNav');
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          display: none;\n          margin-top: 20px;\n          line-height: 40px;\n          > * {\n            display: block;\n          }\n          a {\n            margin: 0;\n          }\n        }\n        @media (max-width: 720px) {\n          :scope {\n            display: block;\n          }\n        }\n      ';
            }
          }]);

          return FrameMenuNav;
        }(Nav);

        var FrameMenuItem = function (_Jinkela10) {
          _inherits(FrameMenuItem, _Jinkela10);

          function FrameMenuItem() {
            _classCallCheck(this, FrameMenuItem);

            return _possibleConstructorReturn(this, (FrameMenuItem.__proto__ || Object.getPrototypeOf(FrameMenuItem)).apply(this, arguments));
          }

          _createClass(FrameMenuItem, [{
            key: 'init',
            value: function init() {
              if (this.children) new FrameMenuList({ list: this.children }).to(this);
              this.href = '#' + encodeURIComponent(this.text);
            }
          }, {
            key: 'template',
            get: function get() {
              return '<li><a href="{href}">{text}</a></li>';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          a {\n            color: inherit;\n            text-decoration: none;\n            &.active {\n              color: ' + config.primaryColor + ';\n              font-weight: bold;\n            }\n          }\n        }\n      ';
            }
          }]);

          return FrameMenuItem;
        }(Jinkela);

        var FrameMenuList = function (_Jinkela11) {
          _inherits(FrameMenuList, _Jinkela11);

          function FrameMenuList() {
            _classCallCheck(this, FrameMenuList);

            return _possibleConstructorReturn(this, (FrameMenuList.__proto__ || Object.getPrototypeOf(FrameMenuList)).apply(this, arguments));
          }

          _createClass(FrameMenuList, [{
            key: 'init',
            value: function init() {
              var _this17 = this;

              this.list.forEach(function (item) {
                return new FrameMenuItem(item).to(_this17);
              });
            }
          }, {
            key: 'update',
            value: function update() {
              var element = this.element;

              var active = element.querySelector('.active');
              if (active) active.classList.remove('active');
              active = element.querySelector('[href="' + location.hash + '"]');
              if (active) active.classList.add('active');
            }
          }, {
            key: 'tagName',
            get: function get() {
              return 'ul';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          line-height: 1.8em;\n          list-style: none;\n          padding: 0;\n          ul {\n            padding-left: 1em;\n            font-size: .85em;\n          }\n          color: ' + config.normalColor + ';\n        }\n      ';
            }
          }]);

          return FrameMenuList;
        }(Jinkela);

        var FrameMenuCaption = function (_Jinkela12) {
          _inherits(FrameMenuCaption, _Jinkela12);

          function FrameMenuCaption() {
            _classCallCheck(this, FrameMenuCaption);

            return _possibleConstructorReturn(this, (FrameMenuCaption.__proto__ || Object.getPrototypeOf(FrameMenuCaption)).apply(this, arguments));
          }

          _createClass(FrameMenuCaption, [{
            key: 'template',
            get: function get() {
              return '<h2><a href="#">{text}</a></h2>';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          a {\n            color: inherit;\n            text-decoration: none;\n          }\n        }\n        @media (max-width: 720px) {\n          :scope {\n            display: none;\n          }\n        }\n      ';
            }
          }]);

          return FrameMenuCaption;
        }(Jinkela);

        var FrameMenu = function (_Jinkela13) {
          _inherits(FrameMenu, _Jinkela13);

          function FrameMenu() {
            _classCallCheck(this, FrameMenu);

            return _possibleConstructorReturn(this, (FrameMenu.__proto__ || Object.getPrototypeOf(FrameMenu)).apply(this, arguments));
          }

          _createClass(FrameMenu, [{
            key: 'initCaption',
            value: function initCaption() {
              new FrameMenuNav().to(this);
              if (this.caption) this.caption.element.parentNode.removeChild(this.caption.element);
              var text = Nav.current && Nav.current.text || '未知';
              if (text) this.caption = new FrameMenuCaption({ text: text }).to(this);
            }
          }, {
            key: 'updateMenu',
            value: function updateMenu() {
              this.menuList.update();
            }
          }, {
            key: 'update',
            value: function update() {
              var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
              if (scrollTop > 90) {
                this.element.classList.add('fixed');
              } else {
                this.element.classList.remove('fixed');
              }
            }
          }, {
            key: 'init',
            value: function init() {
              var _this20 = this;

              this.element.addEventListener('click', function (event) {
                if (event.target.tagName !== 'A') event.dontCareFrameMenuGlobalClose = true;
              });
              addEventListener('click', function (event) {
                if (event.dontCareFrameMenuGlobalClose) return;
                _this20.element.classList.remove('active');
              });
              this.initCaption();
              this.menuList = new FrameMenuList({ list: this.menu }).to(this);
            }
          }, {
            key: 'toggle',
            value: function toggle() {
              this.element.classList.toggle('active');
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          left: 60px;\n          top: 0;\n          height: 100%;\n          overflow: auto;\n          box-sizing: border-box;\n          position: absolute;\n          width: 260px;\n          margin-right: 20px;\n          color: ' + config.primaryColor + ';\n          &.fixed {\n            position: fixed;\n          }\n        }\n        @media (max-width: 720px) {\n          :scope.active {\n            transform: translateX(0);\n          }\n          :scope {\n            transition: transform ease 200ms;\n            transform: translateX(-120%);\n            left: 0;\n            height: 100%;\n            padding: 60px 30px 20px;\n            position: fixed;\n            z-index: 1;\n            background: #f9f9f9;\n            box-shadow: 0 0 10px rgba(0,0,0,0.2);\n          }\n        }\n      ';
            }
          }]);

          return FrameMenu;
        }(Jinkela);

        /**
         * 架子
        **/

        var FrameMain = function (_Jinkela14) {
          _inherits(FrameMain, _Jinkela14);

          function FrameMain() {
            _classCallCheck(this, FrameMain);

            return _possibleConstructorReturn(this, (FrameMain.__proto__ || Object.getPrototypeOf(FrameMain)).apply(this, arguments));
          }

          _createClass(FrameMain, [{
            key: 'init',
            value: function init() {
              var content = this.content;

              content.to(this);
            }
          }]);

          return FrameMain;
        }(Jinkela);

        var FrameError = function (_Jinkela15) {
          _inherits(FrameError, _Jinkela15);

          function FrameError() {
            _classCallCheck(this, FrameError);

            return _possibleConstructorReturn(this, (FrameError.__proto__ || Object.getPrototypeOf(FrameError)).apply(this, arguments));
          }

          _createClass(FrameError, [{
            key: 'template',
            get: function get() {
              return '<div><h1>{message}</h1></div>';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          position: relative;\n          padding: 0 60px;\n        }\n        @media (max-width: 720px) {\n          :scope {\n            padding: 60px 1em;\n          }\n        }\n      ';
            }
          }]);

          return FrameError;
        }(Jinkela);

        var FrameBody = function (_Jinkela16) {
          _inherits(FrameBody, _Jinkela16);

          function FrameBody() {
            _classCallCheck(this, FrameBody);

            return _possibleConstructorReturn(this, (FrameBody.__proto__ || Object.getPrototypeOf(FrameBody)).apply(this, arguments));
          }

          _createClass(FrameBody, [{
            key: 'toggleMenu',
            value: function toggleMenu() {
              this.frameMenu.toggle();
            }
          }, {
            key: 'hashchange',
            value: function hashchange() {
              var _this24 = this;

              this.frameMenu.updateMenu();
              if (this.hashing) return;
              var hxList = this.content.hxList;

              var text = decodeURIComponent(location.hash.slice(1));
              if (text === '') {
                this.animateScroll(document.body);
              } else {
                hxList.some(function (i) {
                  if (i.textContent === text) {
                    _this24.animateScroll(i);
                    return true;
                  }
                });
              }
            }
          }, {
            key: 'animateScroll',
            value: function animateScroll(element) {
              var _this25 = this;

              this.animating = true;
              var after = function after() {
                return _this25.animating = false;
              };
              var offset = this.fixedOffset;
              var options = { speed: 200, after: after, offset: offset };
              return smoothScroll.animateScroll(element, null, options);
            }
          }, {
            key: 'scroll',
            value: function scroll() {
              var _this26 = this;

              this.frameMenu.update();
              if (!this.animating) {
                (function () {
                  var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
                  var offsetTop = _this26.element.offsetTop;
                  var hxList = _this26.content.hxList;
                  var left = 0,
                      right = hxList.length - 1;

                  scrollTop += _this26.fixedOffset;
                  var getOffset = function getOffset(index) {
                    var _getComputedStyle = getComputedStyle(hxList[index]),
                        marginTop = _getComputedStyle.marginTop;

                    return hxList[index].offsetTop + offsetTop - parseInt(marginTop || 0, 10);
                  };
                  var hash = void 0;
                  switch (true) {
                    case scrollTop < getOffset(left):
                      hash = '##';
                      break;
                    case scrollTop > getOffset(right):
                      hash = encodeURIComponent(hxList[right].textContent);
                      break;
                    default:
                      while (right - left > 1) {
                        var middle = left + Math.ceil((right - left) / 2);
                        var middleValue = getOffset(middle);
                        if (scrollTop < middleValue) {
                          right = middle;
                        } else {
                          left = middle;
                        }
                      }
                      hash = encodeURIComponent(hxList[left].textContent);
                  }
                  clearTimeout(_this26.hashing);
                  _this26.hashing = setTimeout(function () {
                    return _this26.hashing = null;
                  }, 16);
                  _this26.updateHash(hash);
                })();
              }
            }
          }, {
            key: 'init',
            value: function init() {
              var _this27 = this;

              var menu = this.menu,
                  content = this.content;

              this.frameMenu = new FrameMenu({ menu: menu }).to(this);
              this.frameMain = new FrameMain({ content: content }).to(this);
              this.animating = false;
              this.hashing = null;
              setTimeout(function () {
                return _this27.hashchange();
              });
            }
          }, {
            key: 'fixedOffset',
            get: function get() {
              return matchMedia('(max-width: 720px)').matches ? 60 : 0;
            }
          }, {
            key: 'updateHash',
            get: function get() {
              var lastHash = null;
              var value = function value(hash) {
                if (lastHash === null) setTimeout(function () {
                  location.replace('#' + lastHash);
                  lastHash = null;
                }, 100);
                lastHash = hash;
              };
              Object.defineProperty(this, 'updateHash', { value: value, configurable: true });
              return value;
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n        :scope {\n          position: relative;\n          padding: 0 60px;\n        }\n        @media (max-width: 720px) {\n          :scope {\n            padding: 60px 1em;\n          }\n        }\n      ';
            }
          }]);

          return FrameBody;
        }(Jinkela);

        var FrameContent = function (_Jinkela17) {
          _inherits(FrameContent, _Jinkela17);

          function FrameContent() {
            _classCallCheck(this, FrameContent);

            return _possibleConstructorReturn(this, (FrameContent.__proto__ || Object.getPrototypeOf(FrameContent)).apply(this, arguments));
          }

          _createClass(FrameContent, [{
            key: 'init',
            value: function init() {
              var dom = this.dom;

              var aList = dom.querySelectorAll('a');
              // links
              [].forEach.call(aList, function (a) {
                if (!/^#/.test(a.getAttribute('href'))) a.target = '_blank';
              });
              // hxList
              var list = dom.querySelectorAll('h1,h2,h3,h4,h5,h6');
              this.hxList = [];
              for (var i = 0; i < list.length; i++) {
                var item = list[i];
                item.removeAttribute('id');
                this.hxList.push(item);
                // Wrap the h* and &~:not(h*) with a div.page
                var page = document.createElement('div');
                page.className = 'page';
                item.parentNode.insertBefore(page, item);
                page.appendChild(item);
                while (page.nextSibling && !/^H\d$/.test(page.nextSibling.tagName)) {
                  page.appendChild(page.nextSibling);
                }
              }
              while (dom.firstChild) {
                this.element.appendChild(dom.firstChild);
              }
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              var clientHeight = document.documentElement.clientHeight;

              return '\n        :scope {\n          padding-top: 2.2em;\n          margin: 0 auto;\n          max-width: 600px;\n          line-height: 1.6em;\n          color: ' + config.normalColor + ';\n          > div.page:first-child {\n            margin-top: 0;\n            > *:first-child {\n              padding-top: 0;\n              margin-top: 0;\n            }\n          }\n          > div.page:last-child {\n            min-height: ' + (clientHeight - 16) + 'px;\n            padding-bottom: 16px; /* avoid margin-bottom collapsed with children */\n          }\n          img {\n            max-width: 100%;\n          }\n          h1 {\n            margin: 1.5em 0 .3em;\n            padding: .5em 0 1.2em;\n            border-bottom: 1px solid #ddd;\n          }\n          h2 {\n            margin: 1.5em 0 .3em;\n            padding: .5em 0 1.2em;\n            border-bottom: 1px solid #ddd;\n          }\n          h3 {\n            margin: 2.5em 0 .7em;\n            padding: .5em 0 .5em;\n            position: relative;\n          }\n          table {\n            border-collapse: collapse;\n          }\n          tr:nth-child(2n) {\n            background-color: #f8f8f8;\n          }\n          td, th {\n            padding: 6px 13px;\n            border: 1px solid #ddd;\n          }\n          a {\n            color: ' + config.primaryColor + ';\n            font-weight: bold;\n            text-decoration: none;\n          }\n          pre {\n            padding: 1em;\n            position: relative;\n            &::after {\n              content: attr(data-language);\n              position: absolute;\n              top: 0;\n              right: 0;\n              color: #ccc;\n              text-align: right;\n              font-size: 0.75em;\n              padding: 5px 10px 0;\n              line-height: 15px;\n              height: 15px;\n              font-weight: 600;\n            }\n          }\n          code, pre {\n            font-family: \'Roboto Mono\', Monaco, courier, monospace;\n            font-size: .8em;\n            background-color: #f8f8f8;\n            -webkit-font-smoothing: initial;\n          }\n          h1, h2, h3, h4, strong {\n            color: ' + config.darkColor + ';\n            font-weight: bold;\n          }\n          code:not(.hljs) {\n            color: #e96900;\n            padding: 3px 5px;\n            margin: 0 2px;\n            border-radius: 2px;\n            white-space: nowrap;\n          }\n        }\n        @media (max-width: 1280px) {\n          :scope {\n            margin-left: calc(260px + 1em);\n            margin-right: 0;\n          }\n        }\n        @media (max-width: 720px) {\n          :scope {\n            margin: 0;\n          }\n        }\n      ';
            }
          }]);

          return FrameContent;
        }(Jinkela);

        var Frame = function (_Jinkela18) {
          _inherits(Frame, _Jinkela18);

          function Frame() {
            _classCallCheck(this, Frame);

            return _possibleConstructorReturn(this, (Frame.__proto__ || Object.getPrototypeOf(Frame)).apply(this, arguments));
          }

          _createClass(Frame, [{
            key: 'click',
            value: function click(event) {
              if (event.isHamburgerClick && this.frameBody) {
                this.frameBody.toggleMenu();
              }
            }
          }, {
            key: 'hashchange',
            value: function hashchange(event) {
              if (this.frameBody) this.frameBody.hashchange(event);
            }
          }, {
            key: 'scroll',
            value: function scroll(event) {
              if (this.frameBody) this.frameBody.scroll(event);
            }
          }, {
            key: 'init',
            value: function init() {
              var _this30 = this;

              addEventListener('scroll', function () {
                return _this30.scroll();
              });
              addEventListener('hashchange', function () {
                return _this30.hashchange();
              });
              if (config.spa) this.initSpa();
              this.update();
            }
          }, {
            key: 'initSpa',
            value: function initSpa() {
              var _this31 = this;

              addEventListener('popstate', function (event) {
                frame.update();
              });
              addEventListener('click', function (event) {
                var target = event.target;

                if (target.tagName !== 'A') return;
                if (target.target !== '') return;
                event.preventDefault();
                history.pushState(null, '', target.href);
                _this31.hashchange();
                frame.update();
              });
            }
          }, {
            key: 'update',
            value: function update() {
              if (this.lastPathname === location.pathname) return;
              this.lastPathname = location.pathname;
              this.frameHeader.update();
              if (location.pathname === config.home) {
                this.element.classList.add('home');
                this.element.classList.remove('not-home');
                this.frameBody = null;
              } else {
                this.element.classList.remove('home');
                this.element.classList.add('not-home');
                this.loadContent();
              }
            }
          }, {
            key: 'loadContent',
            value: function loadContent() {
              var _this32 = this;

              delete this.md;
              delete this.content;
              Promise.all([this.menu, this.content]).then(function (_ref3) {
                var _ref4 = _slicedToArray(_ref3, 2),
                    menu = _ref4[0],
                    content = _ref4[1];

                _this32.frameBody = new FrameBody({ menu: menu, content: content });
              }, function (error) {
                var name = error.name,
                    stack = error.stack;

                _this32.frameBody = new FrameError({ name: name, message: stack });
              });
            }
          }, {
            key: 'Header',
            get: function get() {
              return Header;
            }
          }, {
            key: 'md',
            get: function get() {
              var value = fetch('README.md').then(function (response) {
                if (response.status < 300) {
                  return response.text();
                } else {
                  var error = new Error(response.statusText);
                  error.name = 'HTTP_' + response.status;
                  throw error;
                }
              });
              Object.defineProperty(this, 'md', { configurable: true, value: value });
              return value;
            }
          }, {
            key: 'content',
            get: function get() {
              var _this33 = this;

              var value = Frame.$hljs.then(function () {
                return _this33.md;
              }).then(function (md) {
                return new FrameContent({ dom: Jinkela.html(_templateObject, marked(md)).element });
              }, function (error) {
                throw error;
              });
              Object.defineProperty(this, 'content', { configurable: true, value: value });
              return value;
            }
          }, {
            key: 'menu',
            get: function get() {
              return this.content.then(function (content) {
                var hxList = content.hxList;

                var index = 0;
                var result = function callee(level) {
                  var result = [];
                  for (;;) {
                    var hx = hxList[index];
                    if (!hx) return result;
                    var text = hx.textContent;
                    var h = +hx.tagName[1];
                    switch (true) {
                      case h > level:
                        var children = callee(level + 1);
                        var last = result[result.length - 1];
                        if (last) {
                          last.children = children;
                        } else {
                          return children;
                        }
                        break;
                      case h < level:
                        return result;
                      default:
                        result.push({ text: text });
                        index++;
                    }
                  }
                }(1);
                return result;
              });
            }
          }, {
            key: 'template',
            get: function get() {
              return '\n          <div on-click="{click}">\n            <jkl-header ref="frameHeader"></jkl-header>\n            <meta ref="frameBody" />\n          </div>\n        ';
            }
          }, {
            key: 'styleSheet',
            get: function get() {
              return '\n          body {\n            font-family: \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma,\n                         \'Hiragino Sans GB\', STHeiti, \'Microsoft YaHei\';\n            font-size: 15px;\n            -webkit-font-smoothing: antialiased;\n            margin: 0;\n          }\n        ';
            }
          }], [{
            key: '$hljs',
            get: function get() {
              var value = new Promise(function (resolve, reject) {
                var tasks = (config.languages || []).map(function (name) {
                  return fetch('//cdn.jsdelivr.net/npm/highlight.js@9.12.0/lib/languages/' + name + '.min.js').then(function (response) {
                    return response.text();
                  }).then(function (code) {
                    var module = { exports: {} };
                    new Function('module', code)(module);
                    hljs.registerLanguage(name, module.exports);
                  });
                });
                var renderer = new marked.Renderer();
                renderer.code = function (code, language) {
                  var validLang = !!(language && hljs.getLanguage(language));
                  var highlighted = validLang ? hljs.highlight(language, code).value : code;
                  return '<pre data-language="' + language + '"><code class="hljs ' + language + '">' + highlighted + '</code></pre>';
                };
                marked.setOptions({ renderer: renderer });
                Promise.all(tasks).then(function () {
                  return hljs;
                }).then(resolve, reject);
              });
              Object.defineProperty(this, '$hljs', { configurable: true, value: value });
              return value;
            }
          }]);

          return Frame;
        }(Jinkela);

        config.name = config.name || 'anonymous';
        config.description = config.description || config.name;
        config.darkColor = config.darkColor || '#333';
        config.normalColor = config.normalColor || '#666';
        config.primaryColor = config.primaryColor || '#000';
        config.home = config.home || '/';

        var frame = new Frame().to(document.body);
        document.title = config.name;
      });
    };
  })();
}
