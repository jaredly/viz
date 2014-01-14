
JSXS = $(patsubst %.jsx, %.js, $(wildcard client/*.jsx))

build: components client/index.js main.css $(JSXS)
	@component build --dev -n build -s main -o web

client/%.js: client/%.jsx
	@jsx $< > $@

lint:
	jshint *.js client test lib


gh-pages: build
	cp -r web w
	git co gh-pages
	rm -rf bootstrap font-awesome
	mv w/* ./
	rmdir w


components: component.json
	@component install --dev

web/jquery-2.0.3.js:
	@cd web && wget http://code.jquery.com/jquery-2.0.3.js

web/react-0.8.0.js:
	@cd web && wget http://fb.me/react-0.8.0.js


clean:
	rm -fr build components template.js

test: lint test-only
.PHONY: clean
