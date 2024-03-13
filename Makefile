install:
		npm ci

lint:
		npx eslint .

test:
		npx jest --detectOpenHandles $(ARGS)

test-coverage:
		$(MAKE) test ARGS="--coverage"

test-debug:
		$(MAKE) test DEBUG=axios,nock.*,page-loader*

publish:
		npm publish --dry-run

gendiff:
		node bin/page-loader.js