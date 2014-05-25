test('Class - Inheriting (deeply nested)', function(assert) {

    // _____________________________________________________________________ //

    var first = $.Class({
        a: 0,
        __construct: function() {
            this.a = 1;
        }
    });
    var second = $.Class({ 'extends' : first }, {
        b: 0,
        __construct: function() {
            this['super']('__construct');
            this.b = this.a + 1;
        }
    });
    var third = $.Class({ 'extends' : second }, {
        c: 0,
        __construct: function() {
            this['super']('__construct');
            this.c = this.b + 1;
        }
    });
    var fourth = $.Class({ 'extends' : third }, {
        d: 0,
        __construct: function() {
            this['super']('__construct');
            this.d = this.c + 1;
        }
    });
    var fifth = $.Class({ 'extends' : fourth }, {
        e: 0,
        __construct: function() {
            this['super']('__construct');
            this.e = this.d + 1;
        }
    });

    var f = new fifth();
    assert.equal(f.a, 1, '5-level deep property set correctly.');
    assert.equal(f.b, 2, '4-level deep property set correctly.');
    assert.equal(f.c, 3, '3-level deep property set correctly.');
    assert.equal(f.d, 4, '2-level deep property set correctly.');
    assert.equal(f.e, 5, 'property on current level set correctly.');

    // _____________________________________________________________________ //

    var first = $.Class({
        a: 0,
        __construct: function() {
            this.a = 1;
            this.b = 2;
            this.c = 3;
        }
    });
    var second = $.Class({ 'extends' : first }, {
        b: 0
    });
    var third = $.Class({ 'extends' : second }, {
        c: 0
    });
    var fourth = $.Class({ 'extends' : third }, {
        d: 0,
        __construct: function() {
            this['super']('__construct');
            this.d = this.c + 1;
            this.e = 5;
        }
    });
    var fifth = $.Class({ 'extends' : fourth }, {
        e: 0
    });

    var f = new fifth();

    assert.equal(f.a, 1, '5-level deep property with gaped constructors set correctly.');
    assert.equal(f.b, 2, '5-level deep property with gaped constructors set correctly.');
    assert.equal(f.c, 3, '5-level deep property with gaped constructors set correctly.');
    assert.equal(f.d, 4, '2-level deep property with gaped constructors set correctly.');
    assert.equal(f.e, 5, '2-level deep property with gaped constructors set correctly.');

    assert.ok(f.instanceOf(first), 'Assert instance of first.');
    assert.ok(f.instanceOf(second), 'Assert instance of second.');
    assert.ok(f.instanceOf(third), 'Assert instance of third.');
    assert.ok(f.instanceOf(fourth), 'Assert instance of fourth.');
    assert.ok(f.instanceOf(fifth), 'Assert instance of fifth.');
});
