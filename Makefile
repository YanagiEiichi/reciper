build: auto.es5.js index.es5.js

auto.js: index.js auto-attachment.js
	cat $+ > auto.js

index.es5.js: index.js
	babel $< -o $@

auto.es5.js: auto.js
	babel $< -o $@
