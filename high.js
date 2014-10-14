/*
 * high.js 0.0.0
 * http://github.com/phi-jp/high
 * MIT Licensed
 * 
 * Copyright (C) 2010 phi, http://tmlife.net
 */
/*
 * array.js
 */

(function() {
    
    /**
     * @class   global.Array
     * Arrayの拡張
     * 
     *      @example display
     *      [1, 2, 3].first;
     */
    
    /**
     * @property    first
     * 最初の要素
     */
    Array.prototype.accessor("first", {
        "get": function()   { return this[0]; },
        "set": function(v)  { this[0] = v; }
    });
    
    /**
     * @property    last
     * 最後の要素
     */
    Array.prototype.accessor("last", {
        "get": function()   { return this[this.length-1]; },
        "set": function(v)  { this[this.length-1] = v; }
    });

    /**
     * @method  equals
     * 渡された配列と等しいかどうかをチェック
     */
    Array.defineInstanceMethod("equals", function(arr) {
        // 長さチェック
        if (this.length !== arr.length) return false;
        
        for (var i=0,len=this.length; i<len; ++i) {
            if (this[i] !== arr[i]) {
                return false;
            }
        }
        return true;
    });
    
    /**
     * @method  deepEquals
     * ネストされている配列含め渡された配列と等しいかどうかをチェック
     * equalsDeep にするか検討. (Java では deepEquals なのでとりあえず合わせとく)
     */
    Array.defineInstanceMethod("deepEquals", function(arr) {
        // 長さチェック
        if (this.length !== arr.length) return false;
        
        for (var i=0,len=this.length; i<len; ++i) {
            var result = (this[i].deepEquals) ? this[i].deepEquals(arr[i]) : (this[i] === arr[i]);
            if (result === false) {
                return false;
            }
        }
        return true;
    });

    /**
     * @property    contains
     * 要素が含まれいるかをチェック
     */
    Array.defineInstanceMethod("contains", function(item, fromIndex) {
        return this.indexOf(item, fromIndex) != -1;
    });
    
    /**
     * @method  at
     * ループ添字アクセス(Ruby っぽいやつ)
     */
    Array.defineInstanceMethod("at", function(i) {
        i%=this.length;
        i+=this.length;
        i%=this.length;
        return this[i];
    });
    
    
    /**
     * @method  swap
     * a番目 と b番目 を入れ替える
     */
    Array.defineInstanceMethod("swap", function(a, b) {
        var temp = this[a];
        this[a] = this[b];
        this[b] = temp;
        
        return this;
    });
    
    
    /**
     * @method  erase
     * elm と一致する要素を削除
     */
    Array.defineInstanceMethod("erase", function(elm) {
        var index  = this.indexOf(elm);
        if (index >= 0) {
            this.splice(index, 1);
        }
        return this;
    });
    
    /**
     * @method  eraseAll
     * elm と一致する要素を全て削除
     */
    Array.defineInstanceMethod("eraseAll", function(elm) {
        for (var i=0,len=this.length; i<len; ++i) {
            if (this[i] == elm) {
                this.splice(i--, 1);
            }
        }
        return this;
    });
    
    /**
     * @method  eraseIf
     * 条件にマッチした要素を削除
     */
    Array.defineInstanceMethod("eraseIf", function(fn) {
        for (var i=0,len=this.length; i<len; ++i) {
            if ( fn(this[i], i, this) ) {
                this.splice(i, 1);
                break;
            }
            // if ( fn(this[i], i, this) ) { this.splice(i--, 1); }
        }
        return this;
    });
    
    /**
     * @method  eraseIfAll
     * 条件にマッチした要素を削除
     */
    Array.defineInstanceMethod("eraseIfAll", function(fn) {
        for (var i=0,len=this.length; i<len; ++i) {
            if ( fn(this[i], i, this) ) {
                this.splice(i, 1);
            }
        }
        return this;
    });
    
    /**
     * @method  random
     * 要素の中からランダムで取り出す
     */
    Array.defineInstanceMethod("random", function(min, max) {
        min = min || 0;
        max = max || this.length-1;
        return this[ Math.rand(min, max) ];
    });
    
    /**
     * @method  pickup
     * 要素の中からランダムで取り出す
     */
    Array.defineInstanceMethod("pickup", function(min, max) {
        min = min || 0;
        max = max || this.length-1;
        return this[ Math.rand(min, max) ];
    });
    
    /**
     * @method  uniq
     * 重複削除
     */
    Array.defineInstanceMethod("uniq", function(deep) {
        return this.filter(function(value, index, self) {
            return self.indexOf(value) === index;
        });
    });
    

    /**
     * @method  flatten
     * フラット.
     * Ruby のやつ.
     */
    Array.defineInstanceMethod("flatten", function(level) {
        var arr = null;

        if (level) {
            arr = this;
            for (var i=0; i<level; ++i) {
                arr = Array.prototype.concat.apply([], arr);
            }
        }
        else {
            // 完全フラット
            arr = this.reduce(function (previousValue, curentValue) {
                return Array.isArray(curentValue) ?
                    previousValue.concat(curentValue.flatten()) : previousValue.concat(curentValue);
            }, []);
        }

        return arr;
    });
    
    /**
     * @method  clone
     * 配列をクローン
     */
    Array.defineInstanceMethod("clone", function(deep) {
        if (deep == true) {
            var a = Array(this.length);
            for (var i=0,len=this.length; i<len; ++i) {
                a[i] = (this[i].clone) ? this[i].clone(deep) : this[i];
            }
            return a;
        };
        
        return Array.prototype.slice.apply(this);
    });
    
    /**
     * @method  clear
     * クリア
     */
    Array.defineInstanceMethod("clear", function() {
        this.length = 0;
        return this;
    });
    
    /**
     * @method  fill
     * 特定の値で満たす
     */
    Array.defineInstanceMethod("fill", function(value, start, end) {
        start = start || 0;
        end   = end   || (this.length);
        
        for (var i=start; i<end; ++i) {
            this[i] = value;
        }
        
        return this;
    });
    

    /**
     * @method  range
     * python のやつ
     */
    Array.defineInstanceMethod("range", function(start, end, step) {
        if (arguments.length == 1) {
            this.clear();
            for (var i=0; i<start; ++i) this[i] = i;
        }
        else if (start < end){
            step  = step || 1;
            this.clear();
            for (var i=start, index=0; i<end; i+=step, ++index) {
                this[index] = i;
            }
        }
        else {
            step  = step || -1;
            this.clear();
            for (var i=start, index=0; i>end; i+=step, ++index) {
                this[index] = i;
            }
        }
        
        return this;
    });
    
    /**
     * @method  shuffle
     * シャッフル
     */
    Array.defineInstanceMethod("shuffle", function() {
        for (var i=0,len=this.length; i<len; ++i) {
            var j = Math.rand(0, len-1);
            
            if (i != j) {
                this.swap(i, j);
            }
        }
        
        return this;
    });

    /**
     * @method  sum
     * 合計
     */
    Array.defineInstanceMethod("sum", function() {
        var sum = 0;
        for (var i=0,len=this.length; i<len; ++i) {
            sum += this[i];
        }
        return sum;
    });

    /**
     * @method  average
     * 平均
     */
    Array.defineInstanceMethod("average", function() {
        var sum = 0;
        var len = this.length;
        for (var i=0; i<len; ++i) {
            sum += this[i];
        }
        return sum/len;
    });

    /**
     * @method  each
     * 繰り返し
     * チェーンメソッド対応
     */
    Array.defineInstanceMethod("each", function() {
        this.forEach.apply(this, arguments);
        return this;
    });

    
    /**
     * @method  toULElement
     * ULElement に変換
     */
    Array.defineInstanceMethod("toULElement", function(){
        // TODO: 
    });

    /**
     * @method  toOLElement
     * OLElement に変換
     */
    Array.defineInstanceMethod("toOLElement", function(){
        // TODO:
    });

    
    /**
     * @static
     * @method  range
     * range
     */
    Array.defineFunction("range", function(start, end, step) {
        return Array.prototype.range.apply([], arguments);
    });
    
})();


/*
 * date.js
 */

(function() {
    
    /**
     * @class   global.Date
     * Date(日付)の拡張
     */
    
    var MONTH = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
    ];
    
    var WEEK = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    
    /**
     * @method  format
     * 日付フォーマットに合わせた文字列を返す
     */
    Date.defineInstanceMethod("format", function(pattern) {
        /*
        var str = "{y}/{m}/{d}".format({
            y: this.getYear()+1900,
            m: this.getMonth()+1,
            d: this.getDate(),
        });
        
        return str;
        */
        
        var year    = this.getFullYear();
        var month   = this.getMonth();
        var date    = this.getDate();
        var day     = this.getDay();
        var hours   = this.getHours();
        var minutes = this.getMinutes();
        var seconds = this.getSeconds();
        var millseconds = this.getMilliseconds();
        var str = "";
        
        for (var i=0,len=pattern.length; i<len; ++i) {
            var ch = pattern.charAt(i);
            var temp = "";
            switch(ch) {
                // 日
                case "d": temp = date.padding(2, '0'); break;
                case "D": temp = WEEK[day].substr(0, 3); break;
                case "j": temp = date; break;
                case "l": temp = WEEK[day]; break;
                // case "N": temp = ; break;
                // case "S": temp = ; break;
                // case "w": temp = ; break;
                // case "z": temp = ; break;
                
                // 月
                case "F": temp = MONTH[month]; break;
                case "m": temp = (month+1).padding(2, '0'); break;
                case "M": temp = MONTH[month].substr(0, 3); break;
                case "n": temp = (month+1); break;
                // case "t": temp = (month+1); break;
                
                // 年
                // case "L": temp = ; break;
                // case "o": temp = ; break;
                case "Y": temp = year; break;
                case "y": temp = year.toString().substr(2, 2); break;
                
                
                // 時間
                // case "a": temp = ; break;
                // case "A": temp = ; break;
                // case "B": temp = ; break;
                // case "g": temp = ; break;
                case "G": temp = hours; break;
                // case "h": temp = ; break;
                case "H": temp = hours.padding(2, '0'); break;
                case "i": temp = minutes.padding(2, '0'); break;
                case "s": temp = seconds.padding(2, '0'); break;
                case "S": temp = millseconds.padding(3, '0'); break;
                
                default : temp = ch; break;
            }
            str += temp;
        }
        return str;
    });
    
})();


/*
 * function.js
 */

(function() {
    
    /**
     * @class   global.Function
     * Functionの拡張
     */
    if (!Function.prototype.bind) {
        /**
         * @member  global.Function
         * @method  bind
         * バインド
         */
        Function.defineInstanceMethod("bind", function(obj) {
            var self = this;
            
            return function() {
                self.apply(obj, arguments);
            };
        });
    }


    // 関数名（無名関数は空文字列）を取得 (IE用パッチ)
    if (!Function.prototype.$has("name")) {
        Function.prototype.getter("name", function() {
            return (''+this).replace(/^\s*function\s*([^\(]*)[\S\s]+$/im, '$1');
        });
    }
    

    /**
     * @method  toArrayFunction
     * 関数を配列対応関数に変換.
     * forEach の逆アプローチ的な感じ.
     * 配列を継承したクラスなどに使用する.
     * ## Example
     *      var hoge = function(n) { console.log(this*n); return this*n; };
     *      var arr = [5, 10, 15];
     *      arr.hogeArray = hoge.toArrayFunction();
     *      var result = arr.hogeArray(100);
     *      console.log(result);
     */
    Function.defineInstanceMethod("toArrayFunction", function() {
        var self = this;
        return function() {
            var resultList = [];
            for (var i=0,len=this.length; i<len; ++i) {
                resultList.push( self.apply(this[i], arguments) );
            }
            return resultList;
        }
    });
    
    // forEach や map はもう標準化されてきてるので実装しないよん♪
    
})();


/*
 * math.js
 */

(function() {
    
    /**
     * @class global.Math
     * Mathの拡張
     */
    
    /**
     * @method
     * クランプ
     */
    Math.clamp = function(x, a, b) {
//        return ( Math.max( Math.min(x, ), min ) )
        return (x < a) ? a : ( (x > b) ? b : x );
    };
    
    /**
     * @property    DEG_TO_RAD
     * Degree to Radian.
     */
    Math.DEG_TO_RAD = Math.PI/180;
    
    
    /**
     * @property    RAD_TO_DEG
     * Radian to Degree.
     */
    Math.RAD_TO_DEG = 180/Math.PI;
    
    /**
     * @method
     * Degree を Radian に変換
     */
    Math.degToRad = function(deg) {
        return deg * Math.DEG_TO_RAD;
    };
    
    /**
     * @method
     * Radian を Degree に変換
     */
    Math.radToDeg = function(rad) {
        return rad * Math.RAD_TO_DEG;
    };
    
    
    
    /**
     * @method
     * ランダムな値を指定された範囲内で生成
     */
    Math.rand = function(min, max) {
        return window.Math.floor( Math.random()*(max-min+1) ) + min;
    };
    
    /**
     * @method
     * ランダムな値を指定された範囲内で生成
     */
    Math.randf= function(min, max) {
        return window.Math.random()*(max-min)+min;
    };

    /**
     * @method
     * 長さを取得
     */
    Math.magnitude = function() {
        return Math.sqrt(Math.magnitudeSq.apply(null, arguments));
    };
    
    
    /**
     * @method
     * 長さの２乗を取得
     */
    Math.magnitudeSq = function() {
        var n = 0;
        
        for (var i=0,len=arguments.length; i<len; ++i) {
            n += arguments[i]*arguments[i];
        }
        
        return n;
    };


    /**
     * @method
     * a <= x <= b のとき true を返す
     */
    Math.inside = function(x, a, b) {
        return (x >= a) && (x) <= b;
    };
    
})();


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
     * @method  upto
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

    
})();


/*
 * object.js
 */

(function() {
    
    /**
     * @class global.Object
     * Objectの拡張
     */
    
    /**
     * @method defineVariable
     * 変数を追加
     * @param   {String} key name
     * @param   {Object} param
     */
    Object.defineProperty(Object.prototype, "defineVariable", {
        value: function(name, val) {
            Object.defineProperty(this, name, {
                value: val,
                enumerable: true,
                writable: true
            });
        }
    });
    
    /**
     * @method defineFunction
     * 関数を追加
     * @param   {String} key name
     * @param   {Function} function
     */
    Object.defineProperty(Object.prototype, "defineFunction", {
        value: function(name, fn) {
            Object.defineProperty(this, name, {
                value: fn,
                enumerable: false,
                writable: true
            });
        }
    });
    
    /**
     * @method defineInstanceVariable
     * インスタンス変数を定義する
     */
    Object.prototype.defineFunction("defineInstanceVariable", function(name, val){
        Object.defineProperty(this.prototype, name, {
            value: val,
            enumerable: true,
            writable: true
        });
    });
    
    /**
     * @method defineInstanceMethod
     * インスタンスメソッドを定義する
     */
    Object.prototype.defineFunction("defineInstanceMethod", function(name, fn){
        Object.defineProperty(this.prototype, name, {
            value: fn,
            enumerable: false,
            writable: true
        });
    });
    
    /**
     * @method setter
     * セッターを定義する
     */
    Object.defineInstanceMethod("setter", function(name, fn){
        Object.defineProperty(this, name, {
            set: fn,
            enumerable: false,
            configurable: true
        });
    });
    
    /**
     * @method getter
     * ゲッターを定義する
     */
    Object.defineInstanceMethod("getter", function(name, fn){
        Object.defineProperty(this, name, {
            get: fn,
            enumerable: false,
            configurable: true
        });
    });
    
    /**
     * @method accessor
     * アクセッサ(セッター/ゲッター)を定義する
     */
    Object.defineInstanceMethod("accessor", function(name, param) {
        Object.defineProperty(this, name, {
            set: param["set"],
            get: param["get"],
            enumerable: false,
            configurable: true
        });
    });
    
    /**
     * @method $forIn
     * オブジェクト用ループ処理
     */
    Object.defineInstanceMethod("$forIn", function(fn, self) {
        self = self || this;

        Object.keys(this).forEach(function(key, index) {
            var value = this[key];

            fn.call(self, key, value, index);
        }, this);

        return this;
    });

    /**
     * @method  $has
     * そのプロパティを持っているかを判定する
     */
    Object.defineInstanceMethod("$has", function(key) {
        return this.hasOwnProperty(key);
    });

    /**
     * @method  $extend
     * 他のライブラリと競合しちゃうので extend -> $extend としました
     */
    Object.defineInstanceMethod("$extend", function() {
        Array.prototype.forEach.call(arguments, function(source) {
            for (var property in source) {
                this[property] = source[property];
            }
        }, this);
        return this;
    });
    
    /**
     * @method  $safe
     * 安全拡張
     * 上書きしない
     */
    Object.defineInstanceMethod("$safe", function(source) {
        Array.prototype.forEach.call(arguments, function(source) {
            for (var property in source) {
                if (this[property] === undefined) this[property] = source[property];
            }
        }, this);
        return this;
    });
    
    
    /**
     * @method  $strict
     * 厳格拡張
     * すでにあった場合は警告
     */
    Object.defineInstanceMethod("$strict", function(source) {
        Array.prototype.forEach.call(arguments, function(source) {
            for (var property in source) {
                console.assert(!this[property], "tm error: {0} is Already".format(property));
                this[property] = source[property];
            }
        }, this);
        return this;
    });

    /**
     * @method  $pick
     * ピック
     */
    Object.defineInstanceMethod("$pick", function() {
        var temp = {};

        Array.prototype.forEach.call(arguments, function(key) {
            if (key in this) temp[key] = this[key];
        }, this);

        return temp;
    });

    /**
     * @method  $omit
     * オミット
     */
    Object.defineInstanceMethod("$omit", function() {
        var temp = {};

        for (var key in this) {
            if (Array.prototype.indexOf.call(arguments, key) == -1) {
                temp[key] = this[key];
            }
        }

        return temp;
    });
    
})();


/*
 * string.js
 */

(function() {
    
    /**
     * @class global.String
     * Stringの拡張
     * `String` is a global object that may be used to construct String instances.
     */
    
    
    /**
     * @method  format
     * 
     * フォーマット
     * 
     * ## example
     * 
     *      document.write("{0} + {1} = {2}".format(5, 10, 5+10));   // "5 + 10 = 15"
     *      document.write("rgb({r}, {g}, {b})".format({             // "rgb(128, 0, 255)"
     *          r: 128,
     *          g: 0,
     *          b: 255
     *      }));
     */
    String.defineInstanceMethod("format", function(arg) {
        // 置換ファンク
        var rep_fn = undefined;
        
        // オブジェクトの場合
        if (typeof arg == "object") {
            /** @ignore */
            rep_fn = function(m, k) {
                if (arg[k] === undefined) {
                    return '';
                }
                else {
                    return arg[k];
                }
            }
        }
        // 複数引数だった場合
        else {
            var args = arguments;
            /** @ignore */
            rep_fn = function(m, k) { return args[ parseInt(k) ]; }
        }
        
        return this.replace( /\{(\w+)\}/g, rep_fn );
    });
    
    /**
     * @method  trim
     * トリム
     * 
     * <a href="http://jamesroberts.name/blog/2010/02/22/string-functions-for-javascript-trim-to-camel-case-to-dashed-and-to-underscore/">Reference</a>
     * 
     */
    String.defineInstanceMethod("trim", function() {
        return this.replace(/^\s+|\s+$/g, "");
    });
    
    /**
     * @method  capitalize
     * キャピタライズ
     * 
     * ## Reference
     * 
     * - [キャピタライズ(単語の先頭の大文字化)を行う - oct inaodu](http://d.hatena.ne.jp/brazil/20051212/1134369083)
     * - [デザインとプログラムの狭間で: javascriptでキャピタライズ（一文字目を大文字にする）](http://design-program.blogspot.com/2011/02/javascript.html)
     * 
     */
    String.defineInstanceMethod("capitalize", function() {
        return this.replace(/\w+/g, function(word){
            return word.capitalizeFirstLetter();
        });
    });
    
    /**
     * @method  capitalizeFirstLetter
     * 先頭文字のみキャピタライズ
     */
    String.defineInstanceMethod("capitalizeFirstLetter", function() {
        return this.charAt(0).toUpperCase() + this.substr(1).toLowerCase();
    });
    
    /**
     * @method  toDash
     * ダッシュ
     */
    String.defineInstanceMethod("toDash", function() {
        return this.replace(/([A-Z])/g, function(m){ return '-'+m.toLowerCase(); });
    });
    
    
    /**
     * @method toHash
     * ハッシュ値に変換
     */
    String.defineInstanceMethod("toHash", function() {
        return this.toCRC32();
    });
    
    /**
     * @method  padding
     * 左側に指定された文字を詰めて右寄せにする
     */
    String.defineInstanceMethod("padding", function(n, ch) {
        var str = this.toString();
        n  = n-str.length;
        ch = ch || ' ';
        
        while(n-- > 0) { str = ch + str; }
        
        return str;
    });
    
    /**
     * @method  paddingLeft
     * 左側に指定された文字を詰めて右寄せにする
     */
    String.defineInstanceMethod("paddingLeft", function(n, ch) {
        var str = this.toString();
        n  = n-str.length;
        ch = ch || ' ';
        
        while(n-- > 0) { str = ch + str; }
        
        return str;
    });
    
    /**
     * @method  paddingRight
     * 右側に指定された文字を詰めて左寄せにする
     */
    String.defineInstanceMethod("paddingRight", function(n, ch) {
        var str = this.toString();
        n  = n-str.length;
        ch = ch || ' ';
        
        while(n-- > 0) { str = str + ch; }
        
        return str;
    });
    
    /**
     * @method  quotemeta
     * メタ文字をクォート
     */
    String.defineInstanceMethod("quotemeta", function(n) {
        return this.replace(/([^0-9A-Za-z_])/g, '\\$1');
    });
    
    /**
     * @method  repeat
     * リピート
     */
    String.defineInstanceMethod("repeat", function(n) {
        // TODO: 確認する
        var arr = Array(n);
        for (var i=0; i<n; ++i) arr[i] = this;
        return arr.join('');
    });
    
    /**
     * @method  count
     * リピート
     */
    String.defineInstanceMethod("count", function(str) {
        var re = new RegExp(str, 'gm');
        return this.match(re).length;
    });
    
    /**
     * @method  toString
     * 配列に変換
     */
    String.defineInstanceMethod("toArray", function() {
        var arr = [];
        for (var i=0,len=this.length; i<len; ++i) {
            arr.push(this[i]);
        }
        return arr;
    });
    
    
    var table = "00000000 77073096 EE0E612C 990951BA 076DC419 706AF48F E963A535 9E6495A3 0EDB8832 79DCB8A4 E0D5E91E 97D2D988 09B64C2B 7EB17CBD E7B82D07 90BF1D91 1DB71064 6AB020F2 F3B97148 84BE41DE 1ADAD47D 6DDDE4EB F4D4B551 83D385C7 136C9856 646BA8C0 FD62F97A 8A65C9EC 14015C4F 63066CD9 FA0F3D63 8D080DF5 3B6E20C8 4C69105E D56041E4 A2677172 3C03E4D1 4B04D447 D20D85FD A50AB56B 35B5A8FA 42B2986C DBBBC9D6 ACBCF940 32D86CE3 45DF5C75 DCD60DCF ABD13D59 26D930AC 51DE003A C8D75180 BFD06116 21B4F4B5 56B3C423 CFBA9599 B8BDA50F 2802B89E 5F058808 C60CD9B2 B10BE924 2F6F7C87 58684C11 C1611DAB B6662D3D 76DC4190 01DB7106 98D220BC EFD5102A 71B18589 06B6B51F 9FBFE4A5 E8B8D433 7807C9A2 0F00F934 9609A88E E10E9818 7F6A0DBB 086D3D2D 91646C97 E6635C01 6B6B51F4 1C6C6162 856530D8 F262004E 6C0695ED 1B01A57B 8208F4C1 F50FC457 65B0D9C6 12B7E950 8BBEB8EA FCB9887C 62DD1DDF 15DA2D49 8CD37CF3 FBD44C65 4DB26158 3AB551CE A3BC0074 D4BB30E2 4ADFA541 3DD895D7 A4D1C46D D3D6F4FB 4369E96A 346ED9FC AD678846 DA60B8D0 44042D73 33031DE5 AA0A4C5F DD0D7CC9 5005713C 270241AA BE0B1010 C90C2086 5768B525 206F85B3 B966D409 CE61E49F 5EDEF90E 29D9C998 B0D09822 C7D7A8B4 59B33D17 2EB40D81 B7BD5C3B C0BA6CAD EDB88320 9ABFB3B6 03B6E20C 74B1D29A EAD54739 9DD277AF 04DB2615 73DC1683 E3630B12 94643B84 0D6D6A3E 7A6A5AA8 E40ECF0B 9309FF9D 0A00AE27 7D079EB1 F00F9344 8708A3D2 1E01F268 6906C2FE F762575D 806567CB 196C3671 6E6B06E7 FED41B76 89D32BE0 10DA7A5A 67DD4ACC F9B9DF6F 8EBEEFF9 17B7BE43 60B08ED5 D6D6A3E8 A1D1937E 38D8C2C4 4FDFF252 D1BB67F1 A6BC5767 3FB506DD 48B2364B D80D2BDA AF0A1B4C 36034AF6 41047A60 DF60EFC3 A867DF55 316E8EEF 4669BE79 CB61B38C BC66831A 256FD2A0 5268E236 CC0C7795 BB0B4703 220216B9 5505262F C5BA3BBE B2BD0B28 2BB45A92 5CB36A04 C2D7FFA7 B5D0CF31 2CD99E8B 5BDEAE1D 9B64C2B0 EC63F226 756AA39C 026D930A 9C0906A9 EB0E363F 72076785 05005713 95BF4A82 E2B87A14 7BB12BAE 0CB61B38 92D28E9B E5D5BE0D 7CDCEFB7 0BDBDF21 86D3D2D4 F1D4E242 68DDB3F8 1FDA836E 81BE16CD F6B9265B 6FB077E1 18B74777 88085AE6 FF0F6A70 66063BCA 11010B5C 8F659EFF F862AE69 616BFFD3 166CCF45 A00AE278 D70DD2EE 4E048354 3903B3C2 A7672661 D06016F7 4969474D 3E6E77DB AED16A4A D9D65ADC 40DF0B66 37D83BF0 A9BCAE53 DEBB9EC5 47B2CF7F 30B5FFE9 BDBDF21C CABAC28A 53B39330 24B4A3A6 BAD03605 CDD70693 54DE5729 23D967BF B3667A2E C4614AB8 5D681B02 2A6F2B94 B40BBE37 C30C8EA1 5A05DF1B 2D02EF8D".split(' ');
    
    /**
     * @method  toCRC32
     * CRC32 変換
     */
    String.defineInstanceMethod("toCRC32", function() {
        var crc = 0, x=0, y=0;
        
        crc = crc ^ (-1);
        for (var i=0, iTop=this.length; i<iTop; ++i) {
            y = (crc ^ this.charCodeAt(i)) & 0xff;
            x = "0x" + table[y];
            crc = (crc >>> 8) ^ x;
        }
        
        return (crc ^ (-1)) >>> 0;
    });
    
    
})();
