JSNES
=====

Port of [JSNES](https://github.com/bfirsh/jsnes)

A JavaScript NES emulator.

Build
-----

To build a distribution, you will [Grunt](http://gruntjs.com):

    $ sudo npm install -g grunt-cli

Then run:

    $ npm install
    $ grunt

This will create ``jsnes.js`` and ``jsnes-min.js`` in ``build/``.

Benchmark
---------

The benchmark in ``test/benchmark.js`` is intended for testing JavaScript
engines. It does not depend on a DOM or Canvas element etc.


## Mario memory positions

075A Life counter  (max 9)
075E Coin counter (units), if counter reaches 64 (100) it will reset and increment a life
0748 Coin counter (increments continuously, up to FF=255)
07ED Coin counter (decens) (value 0 to 9)
07EE Coin counter (units) (value 0 to 9)
030D Score counter (units)

## Debug tips

Add `C2` to the memory next to `0590` to generate an invisible coin in the screen.
