/*
 * number.js
 */

(function() {
    
    /**
     * @class global.Number
     * Numberの拡張
     */
    
    /**
     * @method  round
     * 四捨五入
     * 桁数指定版
     */
    Number.defineInstanceMethod("round", function(figure) {
        figure = figure || 0;
        var base = Math.pow(10, figure);
        var temp = this * base;
        temp = Math.round(temp);
        return temp/base;
    });
    
    /**
     * @method  ceil
     * 切り上げ.
     * 桁数指定版
     */
    Number.defineInstanceMethod("ceil",  function(figure) {
        figure = figure || 0;
        var base = Math.pow(10, figure);
        var temp = this * base;
        temp = Math.ceil(temp);
        return temp/base;
    });
    /**
     * @method  floor
     * 切り捨て
     * 桁数指定版
     */
    Number.defineInstanceMethod("floor",  function(figure) {
        figure = figure || 0;
        var base = Math.pow(10, figure);
        var temp = this * base;
        temp = Math.floor(temp);
        
        // ~~this
        // this|0
        
        return temp/base;
    });
    
    /**
     * @method  toInt
     * integer 型に変換する
     */
    Number.defineInstanceMethod("toInt",  function() {
        return (this | 0);
    });
    
    /**
     * @method  toHex
     * 16進数化
     */
    Number.defineInstanceMethod("toHex",  function() {
        return this.toString(16);
    });
    
    /**
     * @method  toBin
     * 2進数化
     */
    Number.defineInstanceMethod("toBin",  function() {
        return this.toString(2);
    });
    
    
    /**
     * @method  toUnsigned
     * unsigned 型に変換する
     */
    Number.defineInstanceMethod("toUnsigned",  function() {
        return this >>> 0;
    });
    
    /**
     * @method  padding
     * 文字埋め
     */
    Number.defineInstanceMethod("padding",  function(n, ch) {
        var str = this+'';
        n  = n-str.length;
        ch = ch || '0';
        
        while(n-- > 0) { str = ch + str; }
        
        return str;
    });
    
    /**
     * @method  times
     * 数値分繰り返す
     */
    Number.defineInstanceMethod("times",  function(fn, self) {
        self = self || this;
        for (var i=0; i<this; ++i) {
            fn.call(self, i);
        }
        return this;
    });
    
    /**
     * @method  upto
     * インクリメント繰り返し
     */
    Number.defineInstanceMethod("upto",  function(t, fn, self) {
        self = self || this;
        for (var i=+this; i<=t; ++i) {
            fn.call(self, i);
        }
        return this;
    });
    
    /**
     * @method  downto
     * デクリメント繰り返し
     */
    Number.defineInstanceMethod("downto",  function(t, fn, self) {
        self = self || this;
        for (var i=+this; i>=t; --i) {
            fn.call(self, i);
        }
        return this;
    });

    /**
     * @method step
     * ステップ繰り返し(float対応)
     */
    Number.defineInstanceMethod("step",  function(limit, step, fn, self) {
        self = self || this;
        for (var i=+this; i<=limit; i+=step) {
            fn.call(self, i);
        }
        return this;
    });

    /**
     * @method abs
     * 絶対値
     */
    Number.defineInstanceMethod("abs", function() { return Math.abs(this) });

    /**
     * @method acos
     * アークコサイン
     */
    Number.defineInstanceMethod("acos", function() { return Math.acos(this) });

    /**
     * @method asin
     * アークサイン
     */
    Number.defineInstanceMethod("asin", function() { return Math.asin(this) });

    /**
     * @method atan
     * アークタンジェント
     */
    Number.defineInstanceMethod("atan", function() { return Math.atan(this) });

    /**
     * @method cos
     * コサイン
     */
    Number.defineInstanceMethod("cos", function() { return Math.cos(this) });

    /**
     * @method exp
     * E^num
     */
    Number.defineInstanceMethod("exp", function() { return Math.exp(this) });

    /**
     * @method log
     * 自然対数
     */
    Number.defineInstanceMethod("log", function() { return Math.log(this) });

    /**
     * @method max
     * max
     */
    Number.defineInstanceMethod("max", function(value) { return Math.max(this, value) });

    /**
     * @method min
     * min
     */
    Number.defineInstanceMethod("min", function(value) { return Math.min(this, value) });

    /**
     * @method pow
     * 乗数
     */
    Number.defineInstanceMethod("pow", function(exponent) { return Math.pow(this, exponent) });

    /**
     * @method sin
     * サイン
     */
    Number.defineInstanceMethod("sin", function() { return Math.sin(this) });

    /**
     * @method sqrt
     * 平方根
     */
    Number.defineInstanceMethod("sqrt", function() { return Math.sqrt(this) });

    /**
     * @method tan
     * タンジェント
     */
    Number.defineInstanceMethod("tan", function() { return Math.tan(this) });


})();

