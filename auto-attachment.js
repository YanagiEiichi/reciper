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
