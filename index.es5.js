'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**/{
  (function () {

    var render = function render(config) {
      var LandingHeader = function (_Jinkela) {
        _inherits(LandingHeader, _Jinkela);

        function LandingHeader() {
          _classCallCheck(this, LandingHeader);

          return _possibleConstructorReturn(this, (LandingHeader.__proto__ || Object.getPrototypeOf(LandingHeader)).apply(this, arguments));
        }

        _createClass(LandingHeader, [{
          key: 'init',
          value: function init() {
            new Nav().to(this);
          }
        }, {
          key: 'tagName',
          get: function get() {
            return 'header';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return '\n        :scope {\n          text-align: center;\n          height: 40px;\n          line-height: 40px;\n        }\n      ';
          }
        }]);

        return LandingHeader;
      }(Jinkela);

      var LandingCaption = function (_Jinkela2) {
        _inherits(LandingCaption, _Jinkela2);

        function LandingCaption() {
          _classCallCheck(this, LandingCaption);

          return _possibleConstructorReturn(this, (LandingCaption.__proto__ || Object.getPrototypeOf(LandingCaption)).apply(this, arguments));
        }

        _createClass(LandingCaption, [{
          key: 'init',
          value: function init() {
            this.element.textContent = config.name;
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return '\n        :scope {\n          font-size: 48px;\n          margin-top: 1em;\n          font-weight: bold;\n          color: ' + config.primaryColor + ';\n        }\n      ';
          }
        }]);

        return LandingCaption;
      }(Jinkela);

      var LandingDescription = function (_Jinkela3) {
        _inherits(LandingDescription, _Jinkela3);

        function LandingDescription() {
          _classCallCheck(this, LandingDescription);

          return _possibleConstructorReturn(this, (LandingDescription.__proto__ || Object.getPrototypeOf(LandingDescription)).apply(this, arguments));
        }

        _createClass(LandingDescription, [{
          key: 'init',
          value: function init() {
            this.element.textContent = config.description;
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return '\n        :scope {\n          opacity: .5;\n          margin-top: 1em;\n          color: ' + config.primaryColor + ';\n        }\n      ';
          }
        }]);

        return LandingDescription;
      }(Jinkela);

      var Landing = function (_Jinkela4) {
        _inherits(Landing, _Jinkela4);

        function Landing() {
          _classCallCheck(this, Landing);

          return _possibleConstructorReturn(this, (Landing.__proto__ || Object.getPrototypeOf(Landing)).apply(this, arguments));
        }

        _createClass(Landing, [{
          key: 'init',
          value: function init() {
            new LandingHeader().to(this);
            var logo = new Logo({ size: 240, href: config.logoHref }).to(this);
            logo.element.style.marginTop = '50px';
            new LandingCaption().to(this);
            new LandingDescription().to(this);
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return '\n        html, body {\n          height: 100%;\n        }\n        body {\n          margin: 0;\n          font-family: \'Helvetica Neue\', \'Luxi Sans\', \'DejaVu Sans\', Tahoma, \'Hiragino Sans GB\', STHeiti, \'Microsoft YaHei\';\n        }\n        :scope {\n          position: relative;\n          top: 50%;\n          transform: translateY(-50%);\n          text-align: center;\n        }\n      ';
          }
        }]);

        return Landing;
      }(Jinkela);

      var Logo = function (_Jinkela5) {
        _inherits(Logo, _Jinkela5);

        function Logo() {
          _classCallCheck(this, Logo);

          return _possibleConstructorReturn(this, (Logo.__proto__ || Object.getPrototypeOf(Logo)).apply(this, arguments));
        }

        _createClass(Logo, [{
          key: 'init',
          value: function init() {
            var _this6 = this;

            var size = this.size + 'px';
            if (config.logoUrl) {
              new Jinkela({ template: '<img src="' + config.logoUrl + '" />' }).to(this);
            } else {
              var text = config.name[0].toUpperCase();
              if (text.charCodeAt(0) < 256) text += config.name[1];
              new Jinkela({ template: '<span>' + text + '</span>' }).to(this);
              this.element.style.lineHeight = size;
              this.element.style.fontSize = this.size / 2 + 'px';
            }
            this.element.style.width = size;
            this.element.style.height = size;
            this.element.addEventListener('click', function (event) {
              return location.href = _this6.href || config.home;
            });
          }
        }, {
          key: 'template',
          get: function get() {
            return '<div class="logo"></div>';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return '\n        :scope {\n          margin: auto;\n          cursor: pointer;\n          > * {\n            display: block;\n            width: 100%;\n            height: 100%;\n          }\n          > span {\n            text-align: center;\n            background: #f5f5f5;\n            border-radius: 100%;\n          }\n        }\n      ';
          }
        }]);

        return Logo;
      }(Jinkela);

      var NavItemDroppingPanel = function (_Jinkela6) {
        _inherits(NavItemDroppingPanel, _Jinkela6);

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

      var NavItemDroppingTip = function (_Jinkela7) {
        _inherits(NavItemDroppingTip, _Jinkela7);

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

      var NavItem = function (_Jinkela8) {
        _inherits(NavItem, _Jinkela8);

        function NavItem() {
          _classCallCheck(this, NavItem);

          return _possibleConstructorReturn(this, (NavItem.__proto__ || Object.getPrototypeOf(NavItem)).apply(this, arguments));
        }

        _createClass(NavItem, [{
          key: 'init',
          value: function init() {
            var _this10 = this;

            var a = this.element.firstElementChild;
            if (this.href) {
              if (this.href === location.pathname) {
                a.classList.add('active');
              }
              if (this.target) a.setAttribute('target', this.target);
            } else {
              this.href = 'javascript:';
            }
            if (this.children) {
              (function () {
                var panel = new NavItemDroppingPanel({ list: _this10.children }).to(_this10);
                new NavItemDroppingTip().to(a);
                _this10.element.addEventListener('mouseenter', function () {
                  if (_this10.element.matches('.FrameMenuNav *')) return;
                  panel.show();
                });
                _this10.element.addEventListener('mouseleave', function () {
                  if (_this10.element.matches('.FrameMenuNav *')) return;
                  panel.hide();
                });
              })();
            }
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

      var Nav = function (_Jinkela9) {
        _inherits(Nav, _Jinkela9);

        function Nav() {
          _classCallCheck(this, Nav);

          return _possibleConstructorReturn(this, (Nav.__proto__ || Object.getPrototypeOf(Nav)).apply(this, arguments));
        }

        _createClass(Nav, [{
          key: 'init',
          value: function init() {
            NavItem.from(config.items).to(this);
          }
        }, {
          key: 'tagName',
          get: function get() {
            return 'nav';
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
            var value = this.navMap[location.pathname];
            Object.defineProperty(this, 'current', { configurable: true, value: value });
            return value;
          }
        }]);

        return Nav;
      }(Jinkela);

      var FrameHeaderName = function (_Jinkela10) {
        _inherits(FrameHeaderName, _Jinkela10);

        function FrameHeaderName() {
          _classCallCheck(this, FrameHeaderName);

          return _possibleConstructorReturn(this, (FrameHeaderName.__proto__ || Object.getPrototypeOf(FrameHeaderName)).apply(this, arguments));
        }

        _createClass(FrameHeaderName, [{
          key: 'template',
          get: function get() {
            return '<a href="' + config.home + '">' + config.name + '</a>';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return '\n        :scope {\n          text-decoration: none;\n          font-size: 1.5em;\n          font-weight: bold;\n          margin-left: .5em;\n          color: ' + config.primaryColor + ';\n          opacity: .7;\n        }\n        @media (max-width: 720px) {\n          :scope {\n            display: none;\n          }\n        }\n      ';
          }
        }]);

        return FrameHeaderName;
      }(Jinkela);

      var FrameHeaderNav = function (_Nav) {
        _inherits(FrameHeaderNav, _Nav);

        function FrameHeaderNav() {
          _classCallCheck(this, FrameHeaderNav);

          return _possibleConstructorReturn(this, (FrameHeaderNav.__proto__ || Object.getPrototypeOf(FrameHeaderNav)).apply(this, arguments));
        }

        _createClass(FrameHeaderNav, [{
          key: 'styleSheet',
          get: function get() {
            return '\n        :scope {\n          flex: 1;\n          text-align: right;\n        }\n        @media (max-width: 720px) {\n          :scope {\n            display: none;\n          }\n        }\n      ';
          }
        }]);

        return FrameHeaderNav;
      }(Nav);

      var FrameHeaderHamburger = function (_Jinkela11) {
        _inherits(FrameHeaderHamburger, _Jinkela11);

        function FrameHeaderHamburger() {
          _classCallCheck(this, FrameHeaderHamburger);

          return _possibleConstructorReturn(this, (FrameHeaderHamburger.__proto__ || Object.getPrototypeOf(FrameHeaderHamburger)).apply(this, arguments));
        }

        _createClass(FrameHeaderHamburger, [{
          key: 'init',
          value: function init() {
            var _this15 = this;

            this.element.addEventListener('click', function (event) {
              event.dontCareFrameMenuGlobalClose = true;
              event.isHamburgerClick = true;
              if (typeof _this15.onClick === 'function') _this15.onClick(event);
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
            return '\n        :scope {\n          display: none;\n          position: absolute;\n          background: #777;\n          margin: auto;\n          left: 1em;\n          top: 0;\n          bottom: 0;\n          height: 17px;\n          width: 20px;\n          &:before {\n            content: \'\';\n            display: block;\n            width: 100%;\n            height: 4px;\n            background: #fff;\n            margin: 3px 0;\n          }\n          &:after {\n            content: \'\';\n            display: block;\n            width: 100%;\n            height: 4px;\n            background: #fff;\n            margin: 3px 0;\n          }\n        }\n        @media (max-width: 720px) {\n          :scope {\n            display: block;\n          }\n        }\n      ';
          }
        }]);

        return FrameHeaderHamburger;
      }(Jinkela);

      var FrameHeader = function (_Jinkela12) {
        _inherits(FrameHeader, _Jinkela12);

        function FrameHeader() {
          _classCallCheck(this, FrameHeader);

          return _possibleConstructorReturn(this, (FrameHeader.__proto__ || Object.getPrototypeOf(FrameHeader)).apply(this, arguments));
        }

        _createClass(FrameHeader, [{
          key: 'init',
          value: function init() {
            new FrameHeaderHamburger().to(this);
            var logo = new Logo({ size: 40 }).to(this);
            new FrameHeaderName().to(this);
            new FrameHeaderNav().to(this);
          }
        }, {
          key: 'tagName',
          get: function get() {
            return 'header';
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return '\n        :scope {\n          line-height: 40px;\n          box-sizing: border-box;\n          background-color: #fff;\n          box-shadow: 0 0 4px rgba(0,0,0,0.25);\n          padding: 25px 60px;\n          position: relative;\n          width: 100%;\n          display: flex;\n          z-index: 2;\n        }\n        @media (max-width: 720px) {\n          :scope {\n            padding: .5em 1em .7em 1em;\n            position: fixed;\n            display: block;\n          }\n        }\n        @media (max-width: 720px) {\n          :scope > div {\n            text-align: center;\n          }\n        }\n      ';
          }
        }]);

        return FrameHeader;
      }(Jinkela);

      var FrameMenuNav = function (_Nav2) {
        _inherits(FrameMenuNav, _Nav2);

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

      var FrameMenuItem = function (_Jinkela13) {
        _inherits(FrameMenuItem, _Jinkela13);

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

      var FrameMenuList = function (_Jinkela14) {
        _inherits(FrameMenuList, _Jinkela14);

        function FrameMenuList() {
          _classCallCheck(this, FrameMenuList);

          return _possibleConstructorReturn(this, (FrameMenuList.__proto__ || Object.getPrototypeOf(FrameMenuList)).apply(this, arguments));
        }

        _createClass(FrameMenuList, [{
          key: 'init',
          value: function init() {
            var _this20 = this;

            this.list.forEach(function (item) {
              return new FrameMenuItem(item).to(_this20);
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

      var FrameMenuCaption = function (_Jinkela15) {
        _inherits(FrameMenuCaption, _Jinkela15);

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

      var FrameMenu = function (_Jinkela16) {
        _inherits(FrameMenu, _Jinkela16);

        function FrameMenu() {
          _classCallCheck(this, FrameMenu);

          return _possibleConstructorReturn(this, (FrameMenu.__proto__ || Object.getPrototypeOf(FrameMenu)).apply(this, arguments));
        }

        _createClass(FrameMenu, [{
          key: 'initCaption',
          value: function initCaption() {
            var frameMenuNav = new FrameMenuNav().to(this);
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
            if (document.documentElement.scrollTop > 90) {
              this.element.classList.add('fixed');
            } else {
              this.element.classList.remove('fixed');
            }
          }
        }, {
          key: 'init',
          value: function init() {
            var _this23 = this;

            this.element.addEventListener('click', function (event) {
              if (event.target.tagName !== 'A') event.dontCareFrameMenuGlobalClose = true;
            });
            addEventListener('click', function (event) {
              if (event.dontCareFrameMenuGlobalClose) return;
              _this23.element.classList.remove('active');
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

      var FrameMain = function (_Jinkela17) {
        _inherits(FrameMain, _Jinkela17);

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

      var FrameError = function (_Jinkela18) {
        _inherits(FrameError, _Jinkela18);

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

      var FrameBody = function (_Jinkela19) {
        _inherits(FrameBody, _Jinkela19);

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
            var _this27 = this;

            this.frameMenu.updateMenu();
            if (this.hashing) return;
            var hxList = this.hxList;

            var text = decodeURIComponent(location.hash.slice(1));
            hxList.forEach(function (i) {
              if (i.textContent === text) {
                _this27.animating = true;
                var callback = function callback() {
                  return _this27.animating = false;
                };
                var offset = _this27.fixedOffset;
                var options = { speed: 200, callback: callback, offset: offset };
                return smoothScroll.animateScroll(i, null, options);
              }
            });
          }
        }, {
          key: 'scroll',
          value: function scroll() {
            var _this28 = this;

            this.frameMenu.update();
            if (!this.animating) {
              (function () {
                var scrollTop = document.documentElement.scrollTop;
                var offsetTop = _this28.element.offsetTop;
                var hxList = _this28.hxList;
                var left = 0,
                    right = hxList.length - 1;

                scrollTop += _this28.fixedOffset;
                var getOffset = function getOffset(index) {
                  var _getComputedStyle = getComputedStyle(hxList[index]),
                      marginTop = _getComputedStyle.marginTop;

                  return hxList[index].offsetTop + offsetTop - parseInt(marginTop || 0);
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
                clearTimeout(_this28.hashing);
                _this28.hashing = setTimeout(function () {
                  return _this28.hashing = null;
                }, 100);
                location.replace('#' + hash);
              })();
            }
          }
        }, {
          key: 'init',
          value: function init() {
            var _this29 = this;

            var menu = this.menu,
                content = this.content;

            this.frameMenu = new FrameMenu({ menu: menu }).to(this);
            this.frameMain = new FrameMain({ content: content }).to(this);
            this.animating = false;
            this.hashing = null;
            addEventListener('scroll', function () {
              return _this29.scroll();
            });
            addEventListener('hashchange', function () {
              return _this29.hashchange();
            });
            setTimeout(function () {
              return _this29.hashchange();
            });
          }
        }, {
          key: 'fixedOffset',
          get: function get() {
            return matchMedia('(max-width: 720px)').matches ? 60 : 0;
          }
        }, {
          key: 'styleSheet',
          get: function get() {
            return '\n        :scope {\n          position: relative;\n          padding: 0 60px;\n        }\n        @media (max-width: 720px) {\n          :scope {\n            padding: 60px 1em;\n          }\n        }\n      ';
          }
        }]);

        return FrameBody;
      }(Jinkela);

      var FrameContent = function (_Jinkela20) {
        _inherits(FrameContent, _Jinkela20);

        function FrameContent() {
          _classCallCheck(this, FrameContent);

          return _possibleConstructorReturn(this, (FrameContent.__proto__ || Object.getPrototypeOf(FrameContent)).apply(this, arguments));
        }

        _createClass(FrameContent, [{
          key: 'styleSheet',
          get: function get() {
            return '\n        :scope {\n          padding: 2.2em 0;\n          margin: 0 auto;\n          max-width: 600px;\n          line-height: 1.6em;\n          color: ' + config.normalColor + ';\n          > *:first-child {\n            margin-top: 0;\n          }\n          img {\n            max-width: 100%;\n          }\n          h1 {\n            margin: 0 0 1em;\n          }\n          h2 {\n            margin: 2em 0 .8em;\n            padding-bottom: 0.7em;\n            border-bottom: 1px solid #ddd;\n          }\n          h3 {\n            margin: 3em 0 1.2em;\n            position: relative;\n          }\n          table {\n            border-collapse: collapse;\n          }\n          tr:nth-child(2n) {\n            background-color: #f8f8f8;\n          }\n          td, th {\n            padding: 6px 13px;\n            border: 1px solid #ddd;\n          }\n          a {\n            color: ' + config.primaryColor + ';\n            font-weight: bold;\n            text-decoration: none;\n          }\n          pre {\n            padding: 1em;\n            position: relative;\n            &::after {\n              content: attr(data-language);\n              position: absolute;\n              top: 0;\n              right: 0;\n              color: #ccc;\n              text-align: right;\n              font-size: 0.75em;\n              padding: 5px 10px 0;\n              line-height: 15px;\n              height: 15px;\n              font-weight: 600;\n            }\n          }\n          code, pre {\n            font-family: \'Roboto Mono\', Monaco, courier, monospace;\n            font-size: .8em;\n            background-color: #f8f8f8;\n            -webkit-font-smoothing: initial;\n          }\n          h1, h2, h3, h4, strong {\n            color: ' + config.darkColor + ';\n            font-weight: bold;\n          }\n          code:not(.hljs) {\n            color: #e96900;\n            padding: 3px 5px;\n            margin: 0 2px;\n            border-radius: 2px;\n            white-space: nowrap;\n          }\n        }\n        @media (max-width: 1280px) {\n          :scope {\n            margin-left: calc(260px + 1em);\n            margin-right: 0;\n          }\n        }\n        @media (max-width: 720px) {\n          :scope {\n            margin: 0;\n          }\n        }\n      ';
          }
        }]);

        return FrameContent;
      }(Jinkela);

      var Frame = function (_Jinkela21) {
        _inherits(Frame, _Jinkela21);

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
          key: 'init',
          value: function init() {
            var _this32 = this;

            this.element.addEventListener('click', function (event) {
              return _this32.click(event);
            });
            new FrameHeader().to(this);
            Promise.all([this.menu, this.content, this.hxList]).then(function (_ref) {
              var _ref2 = _slicedToArray(_ref, 3),
                  menu = _ref2[0],
                  content = _ref2[1],
                  hxList = _ref2[2];

              _this32.frameBody = new FrameBody({ menu: menu, content: content, hxList: hxList }).to(_this32);
            }, function (error) {
              var name = error.name,
                  message = error.message;

              _this32.frameBody = new FrameError({ name: name, message: message }).to(_this32);
            });
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
              var content = new FrameContent({ template: '<div>' + marked(md) + '</div>' });
              var aList = content.element.querySelectorAll('a');
              [].forEach.call(aList, function (a) {
                if (!/^#/.test(a.getAttribute('href'))) a.target = '_blank';
              });
              var imgList = content.element.querySelectorAll('img');
              var width = Math.min(_this33.element.offsetWidth - 28, 600);
              [].forEach.call(imgList, function (img) {
                if (img.width > width) {
                  var scale = width / img.width;
                  img.width *= scale;
                  img.height *= scale;
                }
              });
              return content;
            }, function (error) {
              throw error;
            });
            Object.defineProperty(this, 'content', { configurable: true, value: value });
            return value;
          }
        }, {
          key: 'hxList',
          get: function get() {
            var value = this.content.then(function (content) {
              var list = content.element.querySelectorAll('h1,h2,h3,h4,h5,h6');
              list = [].slice.call(list);
              list.forEach(function (i) {
                return i.removeAttribute('id');
              });
              return list;
            }, function (error) {
              throw error;
            });
            Object.defineProperty(this, 'hxList', { configurable: true, value: value });
            return value;
          }
        }, {
          key: 'menu',
          get: function get() {
            return this.hxList.then(function (hxList) {
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
          key: 'styleSheet',
          get: function get() {
            return '\n        body {\n          font-family: \'Source Sans Pro\', \'Helvetica Neue\', Arial, sans-serif;\n          font-size: 15px;\n          -webkit-font-smoothing: antialiased;\n          margin: 0;\n        }\n      ';
          }
        }], [{
          key: '$hljs',
          get: function get() {
            var value = new Promise(function (resolve, reject) {
              var tasks = (config.languages || []).map(function (name) {
                return fetch('//github.elemecdn.com/isagalaev/highlight.js/9.6.0/src/languages/' + name + '.js').then(function (response) {
                  return response.text();
                }).then(function (code) {
                  hljs.registerLanguage(name, new Function('return (' + code + ')')());
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

      var Component = location.pathname === config.home ? Landing : Frame;
      new Component().to(document.body);
      document.title = config.name;
    };

    var loadScript = function loadScript(url) {
      return new Promise(function (resolve) {
        var script = document.createElement('script');
        script.src = url;
        script.addEventListener('load', resolve);
        document.head.appendChild(script);
      });
    };

    var loadStyle = function loadStyle(url) {
      return new Promise(function (resolve) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = url;
        link.addEventListener('load', resolve);
        document.head.appendChild(link);
      });
    };

    var load = function load(resources) {
      if (!(resources instanceof Array)) resources = [resources];
      var tasks = resources.map(function (url) {
        if (url.then) return url;
        switch (url.match(/\.(\w*)$|$/)[1]) {
          case 'js':
            return loadScript(url);
          case 'css':
            return loadStyle(url);
        }
      });
      return Promise.all(tasks);
    };

    var $loading = load([load('//github.elemecdn.com/uglifyjs!YanagiEiichi/jinkela/1.2.19/umd.js'), '//github.elemecdn.com/chjj/marked/v0.3.6/marked.min.js', '//github.elemecdn.com/uglifyjs!isagalaev/highlight.js/9.6.0/src/highlight.js', '//github.elemecdn.com/cferdinandi/smooth-scroll/v10.0.1/dist/js/smooth-scroll.min.js', '//github.elemecdn.com/isagalaev/highlight.js/9.6.0/src/styles/default.css']);

    window.reciper = function (config) {
      $loading.then(function () {
        return render(config);
      });
    };

    /**/
  })();
}
