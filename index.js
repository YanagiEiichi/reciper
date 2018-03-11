/**/ {

const dependencies = new class {
  constructor() {
    this.list = [
      window.Promise || '//cdn.jsdelivr.net/npm/es6-promise@4.2.4/dist/es6-promise.auto.min.js#script',
      window.fetch || '//cdn.jsdelivr.net/npm/whatwg-fetch@v2.0.3/fetch.min.js#script',
      '//cdn.jsdelivr.net/npm/jinkela@1.3.2/umd.min.js',
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
    if (this._loaded == this._count) {
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
          } catch(error) {
            reject(error);
          }
          resolve(module.exports);
        });
        xhr.addEventListener('error', reject);
        xhr.send();
    }
  }
};

window.reciper = config => dependencies.then(([ _0, _1, Jinkela, marked, hljs, _2, SmoothScroll ]) => {
  const smoothScroll = new SmoothScroll();

  class LandingHeader extends Jinkela {
    get tagName() { return 'header'; }
    init() {
      new Nav().to(this);
    }
    get styleSheet() {
      return `
        :scope {
          text-align: center;
          height: 40px;
          line-height: 40px;
        }
      `;
    }
  }

  class LandingCaption extends Jinkela {
    init() {
      this.element.textContent = config.name;
    }
    get styleSheet() {
      return `
        :scope {
          font-size: 48px;
          margin-top: 1em;
          font-weight: bold;
          color: ${config.primaryColor};
        }
      `;
    }
  }

  class LandingDescription extends Jinkela {
    init() {
      this.element.textContent = config.description;
    }
    get styleSheet() {
      return `
        :scope {
          opacity: .5;
          margin-top: 1em;
          color: ${config.primaryColor};
        }
      `;
    }
  }

  class Landing extends Jinkela {
    init () {
      new LandingHeader().to(this);
      let logo = new Logo({ size: 240, href: config.logoHref }).to(this);
      logo.element.style.marginTop = '50px';
      new LandingCaption().to(this);
      new LandingDescription().to(this);
    }
    get styleSheet() {
      return `
        html, body {
          height: 100%;
        }
        body {
          margin: 0;
          font-family: 'Helvetica Neue', 'Luxi Sans', 'DejaVu Sans', Tahoma, 'Hiragino Sans GB', STHeiti, 'Microsoft YaHei';
        }
        :scope {
          position: relative;
          top: 50%;
          transform: translateY(-50%);
          text-align: center;
        }
      `;
    }
  }

  class Logo extends Jinkela {
    init() {
      let size = this.size + 'px';
      if (config.logoUrl) {
        new Jinkela({ template: `<img src="${config.logoUrl}" />` }).to(this);
      } else {
        let text = config.name[0].toUpperCase();
        if (text.charCodeAt(0) < 256) text += config.name[1];
        new Jinkela({ template: `<span>${text}</span>` }).to(this);
        this.element.style.lineHeight = size;
        this.element.style.fontSize = this.size / 2 + 'px';
      }
      this.element.style.width = size;
      this.element.style.height = size;
      this.element.addEventListener('click', event => location.href = this.href || config.home);
    }
    get template() {
      return `<div class="logo"></div>`;
    }
    get styleSheet() {
      return `
        :scope {
          margin: auto;
          cursor: pointer;
          > * {
            display: block;
            width: 100%;
            height: 100%;
          }
          > span {
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
    init() {
      let a = this.element.firstElementChild;
      if (this.href) {
        if (this.href === location.pathname) {
          a.classList.add('active');
        }
        if (this.target) a.setAttribute('target', this.target);
      } else {
        this.href = 'javascript:';
      }
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
    get tagName() { return 'nav'; }
    static get navMap() {
      let value = {};
      config.items.forEach(item => value[item.href] = item);
      Object.defineProperty(this, 'navMap', { configurable: true, value });
      return value;
    }
    static get current() {
      let value = this.navMap[location.pathname];
      Object.defineProperty(this, 'current', { configurable: true, value });
      return value;
    }
    init() {
      NavItem.from(config.items).to(this);
    }
  }


  class FrameHeaderName extends Jinkela {
    get template() { return `<a href="${config.home}">${config.name}</a>`; }
    get styleSheet() {
      return `
        :scope {
          text-decoration: none;
          font-size: 1.5em;
          font-weight: bold;
          margin-left: .5em;
          color: ${config.primaryColor};
          opacity: .7;
        }
        @media (max-width: 720px) {
          :scope {
            display: none;
          }
        }
      `;
    }
  }

  class FrameHeaderNav extends Nav {
    get styleSheet() {
      return `
        :scope {
          flex: 1;
          text-align: right;
        }
        @media (max-width: 720px) {
          :scope {
            display: none;
          }
        }
      `;
    }
  }

  class FrameHeaderHamburger extends Jinkela {
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
          :scope {
            display: block;
          }
        }
      `;
    }
  }

  class FrameHeader extends Jinkela {
    get tagName() { return 'header'; }
    init() {
      new FrameHeaderHamburger().to(this);
      let logo = new Logo({ size: 40 }).to(this);
      new FrameHeaderName().to(this);
      new FrameHeaderNav().to(this);
    }
    get styleSheet() {
      return `
        :scope {
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
          :scope {
            padding: .5em 1em .7em 1em;
            position: fixed;
            display: block;
          }
        }
        @media (max-width: 720px) {
          :scope > div {
            text-align: center;
          }
        }
      `;
    }
  }

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
      return `<li><a href="{href}">{text}</a></li>`;
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
    get tagName() { return `ul`; }
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
    get template() { return `<h2><a href="#">{text}</a></h2>`; }
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
      let frameMenuNav = new FrameMenuNav().to(this);
      if (this.caption) this.caption.element.parentNode.removeChild(this.caption.element);
      let text = Nav.current && Nav.current.text || '未知';
      if (text) this.caption = new FrameMenuCaption({ text }).to(this);
    }
    updateMenu() { this.menuList.update(); }
    update() {
      if (document.documentElement.scrollTop > 90) {
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

  class FrameMain extends Jinkela {
    init() {
      let { content } = this;
      content.to(this);
    }
  }

  class FrameError extends Jinkela {
    get template() {
      return `<div><h1>{message}</h1></div>`;
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
      let { hxList } = this;
      let text = decodeURIComponent(location.hash.slice(1));
      hxList.forEach(i => {
        if (i.textContent === text) {
          this.animating = true;
          let callback = () => this.animating = false;
          let offset = this.fixedOffset;
          let options = { speed: 200, callback, offset };
          return smoothScroll.animateScroll(i, null, options);
        }
      });
    }
    scroll() {
      this.frameMenu.update();
      if (!this.animating) {
        let { scrollTop } = document.documentElement;
        let { offsetTop } = this.element;
        let { hxList } = this;
        let [ left, right ] = [ 0, hxList.length - 1 ];
        scrollTop += this.fixedOffset;
        const getOffset = index => {
          let { marginTop } = getComputedStyle(hxList[index]);
          return hxList[index].offsetTop + offsetTop - parseInt(marginTop || 0);
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
        this.hashing = setTimeout(() => this.hashing = null, 100);
        location.replace('#' + hash);
      }
    }
    init() {
      let { menu, content } = this;
      this.frameMenu = new FrameMenu({ menu }).to(this);
      this.frameMain = new FrameMain({ content }).to(this);
      this.animating = false;
      this.hashing = null;
      addEventListener('scroll', () => this.scroll());
      addEventListener('hashchange', () => this.hashchange());
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
    get styleSheet() {
      return `
        :scope {
          padding: 2.2em 0;
          margin: 0 auto;
          max-width: 600px;
          line-height: 1.6em;
          color: ${config.normalColor};
          > *:first-child {
            margin-top: 0;
          }
          img {
            max-width: 100%;
          }
          h1 {
            margin: 0 0 1em;
          }
          h2 {
            margin: 2em 0 .8em;
            padding-bottom: 0.7em;
            border-bottom: 1px solid #ddd;
          }
          h3 {
            margin: 3em 0 1.2em;
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
    click(event) {
      if (event.isHamburgerClick && this.frameBody) {
        this.frameBody.toggleMenu();
      }
    }
    init() {
      this.element.addEventListener('click', event => this.click(event));
      new FrameHeader().to(this);
      Promise.all([ this.menu, this.content, this.hxList ]).then(([ menu, content, hxList ]) => {
        this.frameBody = new FrameBody({ menu, content, hxList }).to(this);
      }, error => {
        let { name, stack } = error;
        this.frameBody = new FrameError({ name, message: stack }).to(this);
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
        let content = new FrameContent({ template: `<div>${marked(md)}</div>` });
        let aList = content.element.querySelectorAll('a');
        [].forEach.call(aList, a => {
          if (!/^#/.test(a.getAttribute('href'))) a.target = '_blank';
        });
        let imgList = content.element.querySelectorAll('img');
        let width = Math.min(this.element.offsetWidth - 28, 600);
        [].forEach.call(imgList, img => {
          if (img.width > width) {
            let scale = width / img.width;
            img.width *= scale;
            img.height *= scale;
          }
        });
        return content;
      }, error => {
        throw error;
      });
      Object.defineProperty(this, 'content', { configurable: true, value });
      return value;
    }
    get hxList() {
      let value = this.content.then(content => {
        let list = content.element.querySelectorAll('h1,h2,h3,h4,h5,h6');
        list = [].slice.call(list);
        list.forEach(i => i.removeAttribute('id'));
        return list;
      }, error => {
        throw error;
      });
      Object.defineProperty(this, 'hxList', { configurable: true, value });
      return value;
    }
    get menu() {
      return this.hxList.then(hxList => {
        let index = 0;
        let result = function callee(level) {
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
        }(1);
        return result;
      });
    }
    get styleSheet() {
      return `
        body {
          font-family: 'Source Sans Pro', 'Helvetica Neue', Arial, sans-serif;
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

  let Component = location.pathname === config.home ? Landing : Frame;
  new Component().to(document.body);
  document.title = config.name;
});

/**/ }
