/*
 *
 */

describe('Math', function() {
    
    it('degToRad', function() {
        assert.equal(Math.degToRad(180), Math.PI);
    });

    it('radToDeg', function() {
        assert.equal(Math.radToDeg(Math.PI), 180);
    });

    it('clamp', function() {
        assert.equal(Math.clamp(5, 4, 16), 5);
        assert.equal(Math.clamp(2, 4, 16), 4);
        assert.equal(Math.clamp(20, 4, 16), 16);
    });

    it('inside', function() {
        assert.equal(Math.inside(5, 4, 16), true);
        assert.equal(Math.inside(2, 4, 16), false);
        assert.equal(Math.inside(20, 4, 16), false);
    });

    it('rand', function() {
        var min = -32;
        var max = 32;

        for (var i=0; i<256; ++i) {
            var n = Math.rand(min, max);
            assert(min <= n && n <= max);
        }
    });

    it('randf', function() {
        var min = -32.5;
        var max = 32.5;

        for (var i=0; i<256; ++i) {
            var n = Math.randf(min, max);
            assert(min <= n && n <= max);
        }
    });

});

