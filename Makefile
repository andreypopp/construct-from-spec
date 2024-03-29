BIN = ./node_modules/.bin

install link:
	@npm $@

lint:
	@$(BIN)/jshint index.js

test::
	@$(BIN)/mocha -R spec spec.js

release-patch: test lint
	@$(call release,patch)

release-minor: test lint
	@$(call release,minor)

release-major: test lint
	@$(call release,major)

publish:
	git push --tags origin HEAD:master
	npm publish

define release
	npm version $(1)
endef
