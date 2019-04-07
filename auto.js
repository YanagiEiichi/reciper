{

  const dependencies = new class {
    constructor() {
      this.list = [
        window.Promise || '//cdn.jsdelivr.net/npm/es6-promise@4.2.4/dist/es6-promise.auto.min.js#script',
        window.fetch || '//cdn.jsdelivr.net/npm/whatwg-fetch@v2.0.3/fetch.min.js#script',
        '//cdn.jsdelivr.net/npm/jinkela@1.3.7/umd.min.js',
        '//cdn.jsdelivr.net/npm/marked@0.3.17/marked.min.js',
        '//cdn.jsdelivr.net/npm/highlight.js@9.12.0/lib/highlight.min.js',
        '//cdn.jsdelivr.net/npm/highlight.js@9.12.0/styles/default.min.css#link',
        '//cdn.jsdelivr.net/npm/smooth-scroll@12.1.5/dist/js/smooth-scroll.min.js'
      ];
      this._count = this.list.length;
      this.status = 0;
      this._loaded = 0;
      this._handlers = [];
      this._result = [];
      this.list.forEach((what, index) => {
        this._loadOne(what, this._done.bind(this, index), this._fail.bind(this));
      });
    }
    then(done, fail) {
      this._handlers.push({ 1: done, '-1': fail });
      if (this.status) this._doHandlers();
    }
    get _value() { return { 1: this._result, '-1': this._error }[this.status]; }
    _done(index, value) {
      if (this.status || index in this._result) return;
      this._result[index] = value;
      this._loaded++;
      if (this._loaded === this._count) {
        this.status = 1;
        this._doHandlers();
      }
    }
    _fail(error) {
      if (this.status) return;
      this._error = error;
      this.status = -1;
      this._doHandlers();
    }
    _doHandlers() {
      this._handlers.splice(0).map(item => item[this.status]).forEach(f => f && f(this._value));
    }
    _loadOne(what, resolve, reject) {
      if (typeof what !== 'string') return resolve(what);
      let [ url, loader ] = what.split('#');
      switch (loader) {
        case 'script':
          let script = document.createElement('script');
          script.src = url;
          script.addEventListener('load', () => {
            setTimeout(() => {
              resolve(script);
            });
          });
          script.addEventListener('error', reject);
          document.head.appendChild(script);
          break;
        case 'link':
          let link = document.createElement('link');
          link.rel = 'stylesheet';
          link.href = url;
          link.addEventListener('load', resolve.bind(null, link));
          link.addEventListener('error', reject);
          document.head.appendChild(link);
          break;
        default:
          let xhr = new XMLHttpRequest();
          xhr.open('GET', url);
          xhr.addEventListener('load', () => {
            let type = xhr.getResponseHeader('Content-Type');
            if (!xhr.status === 200 || !/\b(javascript)\b/.test(type)) throw xhr.responseText;
            let module = { exports: {} };
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
    }
  }();

  window.reciper = config => dependencies.then(([ , , Jinkela, marked, hljs, , SmoothScroll ]) => {
    const smoothScroll = new SmoothScroll();

    /**
     * 导航
    **/

    class Logo extends Jinkela {
      init() {
        if (config.logoUrl) {
          let img = document.createElement('img');
          img.src = config.logoUrl;
          this.content = img;
        } else {
          let text = config.name[0].toUpperCase();
          if (text.charCodeAt(0) < 256) text += config.name[1];
          this.content = text;
        }
        this.element.href = this.href || config.home;
      }
      get template() {
        return '<a class="logo"><meta ref="content" /></a>';
      }
      get styleSheet() {
        return `
        :scope {
          margin: auto;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;
          > * {
            display: block;
            max-width: 100%;
            max-height: 100%;
          }
          > span {
            width: 100%;
            height: 100%;
            text-align: center;
            background: #f5f5f5;
            border-radius: 100%;
          }
        }
      `;
      }
    }

    class NavItemDroppingPanel extends Jinkela {
      get styleSheet() {
        return `
        :scope {
          position: absolute;
          top: 100%;
          left: 0px;
          visibility: hidden;
          background: #fff;
          box-shadow: 0 4px 15px rgba(0, 0, 0, .175);
          border-radius: 4px;
          text-align: center;
          opacity: 0;
          transform: translateY(-3px);
          transition: opacity .2s ease, visibility .2s, transform .2s ease;
          &.active {
            opacity: 1;
            visibility: visible;
            transform: translateY(0);
          }
        }
        @media (max-width: 720px) {
          .FrameMenuNav :scope {
            position: static;
            display: block;
            > * {
              line-height: 32px;
              display: block;
              margin-left: 1em;
            }
          }
        }
      `;
      }
      show() { this.element.classList.add('active'); }
      hide() { this.element.classList.remove('active'); }
      init() {
        NavItem.from(this.list).to(this);
      }
    }

    class NavItemDroppingTip extends Jinkela {
      get styleSheet() {
        return `
        :scope {
          border-style: solid;
          border-width: 8px 5px 0px 5px;
          border-right-color: transparent;
          border-bottom-color: transparent;
          border-left-color: transparent;
          margin-left: .5em;
          display: inline-block;
          line-height: 14px;
        }
      `;
      }
    }

    class NavItem extends Jinkela {
      update() {
        this.active = this.href === location.pathname;
      }
      set active(value) {
        let a = this.element.firstElementChild;
        a.classList[value ? 'add' : 'remove']('active');
      }
      get active() {
        let a = this.element.firstElementChild;
        return a.classList.contains('active');
      }
      init() {
        let a = this.element.firstElementChild;
        if (this.href) {
          if (this.target) a.setAttribute('target', this.target);
        } else {
          this.href = 'javascript:';
        }
        this.update();
        if (this.children) {
          let panel = new NavItemDroppingPanel({ list: this.children }).to(this);
          new NavItemDroppingTip().to(a);
          this.element.addEventListener('mouseenter', () => {
            if (this.element.matches('.FrameMenuNav *')) return;
            panel.show();
          });
          this.element.addEventListener('mouseleave', () => {
            if (this.element.matches('.FrameMenuNav *')) return;
            panel.hide();
          });
        }
      }
      get template() {
        return '<span><a href="{href}">{text}</a></span>';
      }
      get styleSheet() {
        return `
        :scope {
          position: relative;
          display: inline-block;
          a {
            white-space: nowrap;
            text-decoration: none;
            color: ${config.primaryColor};
            margin: 0 1em;
            position: relative;
            &.active, &:hover {
              &::after {
                position: absolute;
                content: '';
                background: ${config.primaryColor};
                height: 3px;
                bottom: -5px;
                left: 0;
                right: 0;
              }
            }
          }
        }
      `;
      }
    }

    class Nav extends Jinkela {
      get template() {
        return `
          <nav>
            <meta ref="list" />
          </nav>
        `;
      }
      static get navMap() {
        let value = {};
        config.items.forEach(item => (value[item.href] = item));
        Object.defineProperty(this, 'navMap', { configurable: true, value });
        return value;
      }
      static get current() {
        return this.navMap[location.pathname];
      }
      init() {
        this.list = NavItem.from(config.items);
      }
      update() {
        this.list.forEach(item => {
          item.update();
        });
      }
      get styleSheet() {
        return `
          :scope {
            height: 40px;
            line-height: 40px;
          }
          .not-home :scope {
            flex: 1;
            text-align: right;
          }
          .home :scope {
            order: -1;
            text-align: center;
          }
          @media (max-width: 720px) {
            .not-home :scope {
              display: none;
            }
          }
        `;
      }
    }


    /**
     * 头部
    **/

    class HeaderDescription extends Jinkela {
      init() {
        this.element.textContent = config.description;
      }
      get styleSheet() {
        return `
        .home :scope {
          opacity: .5;
          margin-top: 1em;
          color: ${config.primaryColor};
        }
        .not-home :scope {
          display: none;
        }
      `;
      }
    }

    class HeaderName extends Jinkela {
      get template() { return `<a href="${config.home}">${config.name}</a>`; }
      get styleSheet() {
        return `
        :scope {
          text-decoration: none;
          color: ${config.primaryColor};
        }
        .not-home :scope {
          font-size: 1.5em;
          font-weight: bold;
          margin-left: .5em;
          opacity: .7;
        }
        .home :scope {
          font-size: 48px;
          margin-top: 1em;
          font-weight: bold;
        }
        @media (max-width: 720px) {
          .not-home :scope {
            display: none;
          }
        }
      `;
      }
    }

    class HeaderHamburger extends Jinkela {
      get tagName() { return 'div'; }
      init() {
        this.element.addEventListener('click', event => {
          event.dontCareFrameMenuGlobalClose = true;
          event.isHamburgerClick = true;
          if (typeof this.onClick === 'function') this.onClick(event);
        });
      }
      get styleSheet() {
        return `
        :scope {
          display: none;
          position: absolute;
          background: #777;
          margin: auto;
          left: 1em;
          top: 0;
          bottom: 0;
          height: 17px;
          width: 20px;
          &:before {
            content: '';
            display: block;
            width: 100%;
            height: 4px;
            background: #fff;
            margin: 3px 0;
          }
          &:after {
            content: '';
            display: block;
            width: 100%;
            height: 4px;
            background: #fff;
            margin: 3px 0;
          }
        }
        @media (max-width: 720px) {
          .not-home :scope {
            display: block;
          }
        }
      `;
      }
    }

    class Header extends Jinkela {
      get tagName() { return 'header'; }
      init() {
        new HeaderHamburger().to(this);
        new Logo().to(this);
        new HeaderName().to(this);
        new HeaderDescription().to(this);
        this.nav = new Nav().to(this);
      }
      update() {
        this.nav.update();
      }
      get styleSheet() {
        return `
          .not-home :scope {
            .logo {
              width: 40px;
              height: 40px;
              line-height: 40px;
              font-size: 20px;
            }
            line-height: 40px;
            box-sizing: border-box;
            background-color: #fff;
            box-shadow: 0 0 4px rgba(0,0,0,0.25);
            padding: 25px 60px;
            position: relative;
            width: 100%;
            display: flex;
            z-index: 2;
          }
          @media (max-width: 720px) {
            .not-home :scope {
              padding: .5em 1em .7em 1em;
              position: fixed;
              display: block;
            }
          }
          @media (max-width: 720px) {
            .not-home :scope > div {
              text-align: center;
            }
          }
          .home :scope {
            display: flex;
            flex-direction: column;
            .logo {
              margin-top: 50px;
              width: 240px;
              height: 240px;
              line-height: 240px;
              font-size: 120px;
            }
            position: absolute;
            top: 50%;
            left: 0;
            right: 0;
            transform: translateY(-50%);
            text-align: center;
          }
          @media (max-width: 720px) {
            .home :scope {

            }
          }
          @media (max-width: 720px) {
            .home :scope > div {
            }
          }
        `;
      }
    }

    /**
     * 左侧菜单
    **/

    class FrameMenuNav extends Nav {
      init() { this.element.classList.add('FrameMenuNav'); }
      get styleSheet() {
        return `
        :scope {
          display: none;
          margin-top: 20px;
          line-height: 40px;
          > * {
            display: block;
          }
          a {
            margin: 0;
          }
        }
        @media (max-width: 720px) {
          :scope {
            display: block;
          }
        }
      `;
      }
    }

    class FrameMenuItem extends Jinkela {
      init() {
        if (this.children) new FrameMenuList({ list: this.children }).to(this);
        this.href = '#' + encodeURIComponent(this.text);
      }
      get template() {
        return '<li><a href="{href}">{text}</a></li>';
      }
      get styleSheet() {
        return `
        :scope {
          a {
            color: inherit;
            text-decoration: none;
            &.active {
              color: ${config.primaryColor};
              font-weight: bold;
            }
          }
        }
      `;
      }
    }

    class FrameMenuList extends Jinkela {
      init() {
        this.list.forEach(item => new FrameMenuItem(item).to(this));
      }
      update() {
        let { element } = this;
        let active = element.querySelector('.active');
        if (active) active.classList.remove('active');
        active = element.querySelector(`[href="${location.hash}"]`);
        if (active) active.classList.add('active');
      }
      get tagName() { return 'ul'; }
      get styleSheet() {
        return `
        :scope {
          line-height: 1.8em;
          list-style: none;
          padding: 0;
          ul {
            padding-left: 1em;
            font-size: .85em;
          }
          color: ${config.normalColor};
        }
      `;
      }
    }

    class FrameMenuCaption extends Jinkela {
      get template() { return '<h2><a href="#">{text}</a></h2>'; }
      get styleSheet() {
        return `
        :scope {
          a {
            color: inherit;
            text-decoration: none;
          }
        }
        @media (max-width: 720px) {
          :scope {
            display: none;
          }
        }
      `;
      }
    }

    class FrameMenu extends Jinkela {
      initCaption() {
        new FrameMenuNav().to(this);
        if (this.caption) this.caption.element.parentNode.removeChild(this.caption.element);
        let text = Nav.current && Nav.current.text || '未知';
        if (text) this.caption = new FrameMenuCaption({ text }).to(this);
      }
      updateMenu() { this.menuList.update(); }
      update() {
        let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        if (scrollTop > 90) {
          this.element.classList.add('fixed');
        } else {
          this.element.classList.remove('fixed');
        }
      }
      init() {
        this.element.addEventListener('click', event => {
          if (event.target.tagName !== 'A') event.dontCareFrameMenuGlobalClose = true;
        });
        addEventListener('click', event => {
          if (event.dontCareFrameMenuGlobalClose) return;
          this.element.classList.remove('active');
        });
        this.initCaption();
        this.menuList = new FrameMenuList({ list: this.menu }).to(this);
      }
      toggle() { this.element.classList.toggle('active'); }
      get styleSheet() {
        return `
        :scope {
          left: 60px;
          top: 0;
          height: 100%;
          overflow: auto;
          box-sizing: border-box;
          position: absolute;
          width: 260px;
          margin-right: 20px;
          color: ${config.primaryColor};
          &.fixed {
            position: fixed;
          }
        }
        @media (max-width: 720px) {
          :scope.active {
            transform: translateX(0);
          }
          :scope {
            transition: transform ease 200ms;
            transform: translateX(-120%);
            left: 0;
            height: 100%;
            padding: 60px 30px 20px;
            position: fixed;
            z-index: 1;
            background: #f9f9f9;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
          }
        }
      `;
      }
    }

    /**
     * 架子
    **/

    class FrameMain extends Jinkela {
      init() {
        let { content } = this;
        content.to(this);
      }
    }

    class FrameError extends Jinkela {
      get template() {
        return '<div><h1>{message}</h1></div>';
      }
      get styleSheet() {
        return `
        :scope {
          position: relative;
          padding: 0 60px;
        }
        @media (max-width: 720px) {
          :scope {
            padding: 60px 1em;
          }
        }
      `;
      }
    }

    class FrameBody extends Jinkela {
      toggleMenu() { this.frameMenu.toggle(); }
      get fixedOffset() {
        return matchMedia('(max-width: 720px)').matches ? 60 : 0;
      }
      hashchange() {
        this.frameMenu.updateMenu();
        if (this.hashing) return;
        let { hxList } = this.content;
        let text = decodeURIComponent(location.hash.slice(1));
        if (text === '') {
          this.animateScroll(document.body);
        } else {
          hxList.some(i => {
            if (i.textContent === text) {
              this.animateScroll(i);
              return true;
            }
          });
        }
      }
      animateScroll(element) {
        this.animating = true;
        let after = () => (this.animating = false);
        let offset = this.fixedOffset;
        let options = { speed: 200, after, offset };
        return smoothScroll.animateScroll(element, null, options);
      }
      scroll() {
        this.frameMenu.update();
        if (!this.animating) {
          let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
          let { offsetTop } = this.element;
          let { hxList } = this.content;
          let [ left, right ] = [ 0, hxList.length - 1 ];
          scrollTop += this.fixedOffset;
          const getOffset = index => {
            let { marginTop } = getComputedStyle(hxList[index]);
            return (hxList[index].offsetTop + offsetTop - parseInt(marginTop || 0, 10));
          };
          let hash;
          switch (true) {
            case scrollTop < getOffset(left):
              hash = '##';
              break;
            case scrollTop > getOffset(right):
              hash = encodeURIComponent(hxList[right].textContent);
              break;
            default:
              while (right - left > 1) {
                let middle = left + Math.ceil((right - left) / 2);
                let middleValue = getOffset(middle);
                if (scrollTop < middleValue) {
                  right = middle;
                } else {
                  left = middle;
                }
              }
              hash = encodeURIComponent(hxList[left].textContent);
          }
          clearTimeout(this.hashing);
          this.hashing = setTimeout(() => (this.hashing = null), 16);
          this.updateHash(hash);
        }
      }
      get updateHash() {
        let lastHash = null;
        let value = hash => {
          if (lastHash === null) setTimeout(() => {
            location.replace('#' + lastHash);
            lastHash = null;
          }, 100);
          lastHash = hash;
        };
        Object.defineProperty(this, 'updateHash', { value, configurable: true });
        return value;
      }
      init() {
        let { menu, content } = this;
        this.frameMenu = new FrameMenu({ menu }).to(this);
        this.frameMain = new FrameMain({ content }).to(this);
        this.animating = false;
        this.hashing = null;
        setTimeout(() => this.hashchange());
      }
      get styleSheet() {
        return `
        :scope {
          position: relative;
          padding: 0 60px;
        }
        @media (max-width: 720px) {
          :scope {
            padding: 60px 1em;
          }
        }
      `;
      }
    }

    class FrameContent extends Jinkela {
      init() {
        let { dom } = this;
        let aList = dom.querySelectorAll('a');
        // links
        [].forEach.call(aList, a => {
          if (!/^#/.test(a.getAttribute('href'))) a.target = '_blank';
        });
        // hxList
        let list = dom.querySelectorAll('h1,h2,h3,h4,h5,h6');
        this.hxList = [];
        for (let i = 0; i < list.length; i++) {
          let item = list[i];
          item.removeAttribute('id');
          this.hxList.push(item);
          // Wrap the h* and &~:not(h*) with a div.page
          let page = document.createElement('div');
          page.className = 'page';
          item.parentNode.insertBefore(page, item);
          page.appendChild(item);
          while (page.nextSibling && !/^H\d$/.test(page.nextSibling.tagName)) page.appendChild(page.nextSibling);
        }
        while (dom.firstChild) this.element.appendChild(dom.firstChild);
      }
      get styleSheet() {
        let { clientHeight } = document.documentElement;
        return `
        :scope {
          padding-top: 2.2em;
          margin: 0 auto;
          max-width: 600px;
          line-height: 1.6em;
          color: ${config.normalColor};
          > div.page:first-child {
            margin-top: 0;
            > *:first-child {
              padding-top: 0;
              margin-top: 0;
            }
          }
          > div.page:last-child {
            min-height: ${clientHeight - 16}px;
            padding-bottom: 16px; /* avoid margin-bottom collapsed with children */
          }
          img {
            max-width: 100%;
          }
          h1 {
            margin: 1.5em 0 .3em;
            padding: .5em 0 1.2em;
            border-bottom: 1px solid #ddd;
          }
          h2 {
            margin: 1.5em 0 .3em;
            padding: .5em 0 1.2em;
            border-bottom: 1px solid #ddd;
          }
          h3 {
            margin: 2.5em 0 .7em;
            padding: .5em 0 .5em;
            position: relative;
          }
          table {
            border-collapse: collapse;
          }
          tr:nth-child(2n) {
            background-color: #f8f8f8;
          }
          td, th {
            padding: 6px 13px;
            border: 1px solid #ddd;
          }
          a {
            color: ${config.primaryColor};
            font-weight: bold;
            text-decoration: none;
          }
          pre {
            padding: 1em;
            position: relative;
            &::after {
              content: attr(data-language);
              position: absolute;
              top: 0;
              right: 0;
              color: #ccc;
              text-align: right;
              font-size: 0.75em;
              padding: 5px 10px 0;
              line-height: 15px;
              height: 15px;
              font-weight: 600;
            }
          }
          code, pre {
            font-family: 'Roboto Mono', Monaco, courier, monospace;
            font-size: .8em;
            background-color: #f8f8f8;
            -webkit-font-smoothing: initial;
          }
          h1, h2, h3, h4, strong {
            color: ${config.darkColor};
            font-weight: bold;
          }
          code:not(.hljs) {
            color: #e96900;
            padding: 3px 5px;
            margin: 0 2px;
            border-radius: 2px;
            white-space: nowrap;
          }
        }
        @media (max-width: 1280px) {
          :scope {
            margin-left: calc(260px + 1em);
            margin-right: 0;
          }
        }
        @media (max-width: 720px) {
          :scope {
            margin: 0;
          }
        }
      `;
      }
    }

    class Frame extends Jinkela {
      get Header() { return Header; }
      click(event) {
        if (event.isHamburgerClick && this.frameBody) {
          this.frameBody.toggleMenu();
        }
      }
      hashchange(event) {
        if (this.frameBody) this.frameBody.hashchange(event);
      }
      scroll(event) {
        if (this.frameBody) this.frameBody.scroll(event);
      }
      init() {
        addEventListener('scroll', () => this.scroll());
        addEventListener('hashchange', () => this.hashchange());
        if (config.spa) this.initSpa();
        this.update();
      }
      initSpa() {
        addEventListener('popstate', event => {
          frame.update();
        });
        addEventListener('click', event => {
          let { target } = event;
          if (target.tagName !== 'A') return;
          if (target.target !== '') return;
          event.preventDefault();
          history.pushState(null, '', target.href);
          this.hashchange();
          frame.update();
        });
      }
      update() {
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
      loadContent() {
        delete this.md;
        delete this.content;
        Promise.all([ this.menu, this.content ]).then(([ menu, content ]) => {
          this.frameBody = new FrameBody({ menu, content });
        }, error => {
          let { name, stack } = error;
          this.frameBody = new FrameError({ name, message: stack });
        });
      }
      get md() {
        let value = fetch('README.md').then(response => {
          if (response.status < 300) {
            return response.text();
          } else {
            let error = new Error(response.statusText);
            error.name = 'HTTP_' + response.status;
            throw error;
          }
        });
        Object.defineProperty(this, 'md', { configurable: true, value });
        return value;
      }
      get content() {
        let value = Frame.$hljs.then(() => this.md).then(md => {
          return new FrameContent({ dom: Jinkela.html`${marked(md)}`.element });
        }, error => {
          throw error;
        });
        Object.defineProperty(this, 'content', { configurable: true, value });
        return value;
      }
      get menu() {
        return this.content.then(content => {
          let { hxList } = content;
          let index = 0;
          let result = (function callee(level) {
            let result = [];
            for (;;) {
              let hx = hxList[index];
              if (!hx) return result;
              let text = hx.textContent;
              let h = +hx.tagName[1];
              switch (true) {
                case h > level:
                  let children = callee(level + 1);
                  let last = result[result.length - 1];
                  if (last) {
                    last.children = children;
                  } else {
                    return children;
                  }
                  break;
                case h < level:
                  return result;
                default:
                  result.push({ text });
                  index++;
              }
            }
          }(1));
          return result;
        });
      }
      get template() {
        return `
          <div on-click="{click}">
            <jkl-header ref="frameHeader"></jkl-header>
            <meta ref="frameBody" />
          </div>
        `;
      }
      get styleSheet() {
        return `
          body {
            font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma,
                         'Hiragino Sans GB', STHeiti, 'Microsoft YaHei';
            font-size: 15px;
            -webkit-font-smoothing: antialiased;
            margin: 0;
          }
        `;
      }
      static get $hljs() {
        let value = new Promise((resolve, reject) => {
          let tasks = (config.languages || []).map(name => {
            return fetch(`//cdn.jsdelivr.net/npm/highlight.js@9.12.0/lib/languages/${name}.min.js`).then(response => {
              return response.text();
            }).then(code => {
              let module = { exports: {} };
              new Function('module', code)(module);
              hljs.registerLanguage(name, module.exports);
            });
          });
          const renderer = new marked.Renderer();
          renderer.code = (code, language) => {
            const validLang = !!(language && hljs.getLanguage(language));
            const highlighted = validLang ? hljs.highlight(language, code).value : code;
            return `<pre data-language="${language}"><code class="hljs ${language}">${highlighted}</code></pre>`;
          };
          marked.setOptions({ renderer });
          Promise.all(tasks).then(() => hljs).then(resolve, reject);
        });
        Object.defineProperty(this, '$hljs', { configurable: true, value });
        return value;
      }
    }

    config.name = config.name || 'anonymous';
    config.description = config.description || config.name;
    config.darkColor = config.darkColor || '#333';
    config.normalColor = config.normalColor || '#666';
    config.primaryColor = config.primaryColor || '#000';
    config.home = config.home || '/';

    let frame = new Frame().to(document.body);
    document.title = config.name;
  });

}
void (function callee(href, contents) {
  var root = href.replace(/\/[^/]*$/, '');
  if (root === href) return document.write(contents);
  let xhr = new XMLHttpRequest();
  xhr.open('GET', root + '/reciper.json');
  xhr.addEventListener('load', function() {
    if (xhr.status === 200 && /\bjson\b/.test(xhr.getResponseHeader('Content-Type'))) {
      var config = JSON.parse(xhr.responseText);
      config.home = root + '/';
      if (config.logoHref && !/^(\w+:)?\/\/|^\//.test(config.logoHref)) {
        config.logoHref = root + '/' + config.logoHref;
      }
      config.items.forEach(function callee(item) {
        if (item.href && !/^(\w+:)?\/\/|^\//.test(item.href)) item.href = root + '/' + item.href;
        if (item.children) item.children.forEach(callee);
      });
      window.reciper(config);
    } else {
      callee(root, xhr.responseText);
    }
  });
  xhr.addEventListener('error', function(error) { callee(root, error.stack); });
  xhr.send();
}(location.pathname));
