#!/usr/bin/env node

const argollector = require('argollector');
const fs = require('fs');
const mkdirp = require('mkdirp');

switch (argollector[0]) {
  case 'init':
    fs.writeFileSync('index.html', `
<!DOCTYPE html>
<script src="//yanagieiichi.github.io/reciper/index.js"></script>
<script>
reciper({
  items: [
    { "text": "intro", "href": "/intro/" }
  ]
});
</script>
    `.trim());
    mkdirp.sync('intro');
    try {
      fs.accessSync('intro/index.html');
      fs.unlinkSync('intro/index.html');
    } catch (error) {}
    fs.symlinkSync('../index.html', 'intro/index.html');
    fs.writeFileSync('intro/README.md', '## Hello');
}
