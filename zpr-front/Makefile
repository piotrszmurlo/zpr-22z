public/engine.wasm: src/engine.mjs
src/engine.mjs: src/engine.cpp
	emcc --no-entry src/engine.cpp -o src/engine.mjs  \
	  --pre-js src/locateFile.js  \
	  -s ENVIRONMENT='web'  \
	  -s EXPORT_NAME='createModule'  \
	  -s USE_ES6_IMPORT_META=0  \
	  -s EXPORTED_FUNCTIONS='["_calculateBall", "_malloc", "_free"]'  \
	  -s EXPORTED_RUNTIME_METHODS='["ccall", "cwrap"]'  \
	  -O3
	mv src/engine.wasm public/engine.wasm

.PHONY: clean
clean:
	rm public/engine.wasm src/engine.mjs