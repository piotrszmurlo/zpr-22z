#include <emscripten/emscripten.h>
#include <stdlib.h>

EMSCRIPTEN_KEEPALIVE float testfun() {
    return 32.5;
}

EMSCRIPTEN_KEEPALIVE int add(int a, int b)
{
    // trivial function for testing
    return a + b;
}