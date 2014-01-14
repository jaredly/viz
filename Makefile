
JSXS = $(patsubst %.jsx, %.js, $(wildcard client/*.jsx))
LESS = $(wildcard less/*.less)

build: components client/index.js viz.css $(JSXS) web
	@component build --dev -n build -s main -o web

viz.css: $(LESS)
	@lessc less/index.less > viz.css

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

web: web/jquery-2.0.3.js web/react-0.8.0.js web/bootstrap web/font-awesome

web/jquery-2.0.3.js:
	@cd web && wget http://code.jquery.com/jquery-2.0.3.js

web/react-0.8.0.js:
	@cd web && wget http://fb.me/react-0.8.0.js

web/bootstrap:
	@cd web && wget https://github.com/twbs/bootstrap/releases/download/v3.0.3/bootstrap-3.0.3-dist.zip && unzip bootstrap-3.0.3-dist.zip && mv dist bootstrap && rm bootstap-3.0.3.zip

web/font-awesome:
	@cd web && wget http://fontawesome.io/assets/font-awesome-4.0.3.zip && unzip font-awesome-4.0.3.zip && mv font-awesome-4.0.3 font-awesome && rm font-awesome-4.0.3.zip

clean:
	rm -fr build components template.js

test: lint test-only

.PHONY: clean web
