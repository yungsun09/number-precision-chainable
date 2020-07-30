# number-precision-chainable

Perform addition, subtraction, multiplication and division operations precisely using javascript with chain (有一说一我不觉得这玩意链式会好用，如果有人想用这种的话给原项目提issus吧。。。我水平到这了，strip我没写，不知道放哪里合适，就酱！)

### Why

```js
0.1 + 0.2 = 0.30000000000000004
1.0 - 0.9 = 0.09999999999999998
0.105.toFixed(2) = 0.1 // not 0.11
```

```js
// number-precision  --> https://github.com/nefe/number-precision
NP.strip(num)         // strip a number to nearest right number
NP.plus(num1, num2, num3, ...)   // addition, num + num2 + num3, two numbers is required at least.
NP.minus(num1, num2, num3, ...)  // subtraction, num1 - num2 - num3
NP.times(num1, num2, num3, ...)  // multiplication, num1 * num2 * num3
NP.divide(num1, num2, num3, ...) // division, num1 / num2 / num3
NP.round(num, ratio)  // round a number based on ratio
```

### Methods

```js
.init(num)         // init a number for begin
.plus(num1, num2, num3, ...)   // addition, num + num2 + num3, two numbers is required at least.
.minus(num1, num2, num3, ...)  // subtraction, num1 - num2 - num3
.times(num1, num2, num3, ...)  // multiplication, num1 * num2 * num3
.divide(num1, num2, num3, ...) // division, num1 / num2 / num3
.round(ratio)  // round a number based on ratio
.valueOf() // return result
```

```js
np.init(0).plus(0.1, 0.2).valueOf();             // = 0.3, not 0.30000000000000004
np.init(0).plus(2.3, 2.4).valueOf();             // = 4.7, not 4.699999999999999
np.init(0).minus(1.0, 0.9).valueOf();            // = 0.1, not 0.09999999999999998
np.init(1).times(3, 0.3).valueOf();              // = 0.9, not 0.8999999999999999
np.init(1).times(0.362, 100).valueOf();          // = 36.2, not 36.199999999999996
np.init(1.21).divide(1.1).valueOf();             // = 1.1, not 1.0999999999999999
np.init(0.105).round(2).valueOf();               // = 0.11, not 0.1
```

### Usage

```js
const NP = require('./testClass')

const np = new NP()
// you can write like this
np.init(12).plus(22,33,44).times(10,10,10).plus(1,10,100).divide(100,10).round(1).plus(0.5).round(0).divide(1000000).valueOf() // = 0.000112
// also
np.init(np.init(12).plus(22,33,44)).plus(np.init(11).plus(22,33,44).divide(10)).valueOf(); // = 122 (话说真的有人看得懂这种吗。。。。。)
```

