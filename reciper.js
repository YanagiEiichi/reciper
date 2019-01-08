#!/usr/bin/env node

const argollector = require('argollector');
const fs = require('fs');
const mkdirp = require('mkdirp');



const init = () => {

  fs.writeFileSync('index.html', [
    '<!DOCTYPE html>',
    '<meta charset="utf-8" />',
    '<meta http-equiv="X-UA-Compatible" content="chrome=1" />',
    '<meta name="renderer" content="webkit" />',
    '<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1.0, minimum-scale=1.0" />',
    '<script src="//yanagieiichi.github.io/reciper/index.js"></script>',
    '<script src="//yanagieiichi.github.io/reciper/auto-attachment.js"></script>'
  ].join('\n') + '\n');

  fs.writeFileSync('reciper.json', JSON.stringify({
    name: 'Reciper Demo',
    description: 'this is a demo project',
    logoUrl: '//yanagieiichi.github.io/reciper/book.png',
    logoHref: '/hello/',
    darkColor: '#333',
    normalColor: '#666',
    primaryColor: '#000',
    languages: [ 'xml', 'javascript' ],
    items: [
      { text: 'hello', href: '/hello/' }
    ]
  }, null, 2));

  mkdirp.sync('hello');
  try {
    fs.accessSync('hello/index.html');
    fs.unlinkSync('hello/index.html');
  } catch (error) {}
  fs.symlinkSync('../index.html', 'hello/index.html');

  fs.writeFileSync('hello/README.md', [
    '## Hello Reciper',
    '',
    'this is a demo project',
    '',
    '### JavaScript Code',
    '',
    '```javascript',
    'void null;',
    'console.log("Reciper Demo");',
    '```',
    '',
    '### HTML Code',
    '',
    '```xml',
    '<html>',
    '  <body style="font-size: 12px;">',
    '    Hello Reciper',
    '  </body>',
    '</html>',
    '```',
  ].join('\n') + '\n');

};

switch (argollector[0]) {
  case 'init': return init();
  default:
    console.log('Usage: reciper [actions]');
    console.log('');
    console.log('Actions:');
    console.log('  init         initialize current directory as a root');
}
