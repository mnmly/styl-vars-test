
build: components
	@node ./bin/builder.js --dev

components: component.json
	@component install --dev

clean:
	rm -fr build components template.js

.PHONY: clean
