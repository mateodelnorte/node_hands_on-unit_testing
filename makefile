PROJECT = "our_little_api"

clean: 
	-rm api.pid;

install: install-base install-api
	@echo "*install complete*";

install-base: 
	npm install; 

install-api: 
	cd our_little_api; \
	npm install; \
	cd ..;

integration:
	-export NODE_ENV=development; \
	./node_modules/mocha/bin/mocha -R spec ./test_integration/*.js;

start: 
	@echo "starting API"; \
	node ./our_little_api/app.js & echo "$$!" > api.pid; \

stop: 
	-kill -9 `cat api.pid`; 

test: ;@echo "testing ${PROJECT}"; \
	-export NODE_ENV=development; \
	./node_modules/mocha/bin/mocha -R spec;

test_integration: start integration stop clean

test_all: test test_integration
	
uninstall: uninstall-base uninstall-api
	@echo *squeek*;

uninstall-base:
	-rm -r ./node_modules; 
	
uninstall-api:
	-rm -r ./our_little_api/node_modules;

.PHONY: test