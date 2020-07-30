/**
 * @desc 解决浮动运算问题，避免小数点后产生多位数和计算精度损失。
 * 问题示例：2.3 + 2.4 = 4.699999999999999，1.0 - 0.9 = 0.09999999999999998
 */
let _boundaryCheckingState = true
/**
 * 把错误的数据转正
 * strip(0.09999999999999998)=0.1
 */
function strip(num, precision) {
  if (precision === void 0) { precision = 15; }
  return +parseFloat(Number(num).toPrecision(precision));
}
/**
* Return digits length of a number
* @param {*number} num Input number
*/
function digitLength(num) {
  // Get digit length of e
  var eSplit = num.toString().split(/[eE]/);
  var len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0);
  return len > 0 ? len : 0;
}
/**
* 把小数转成整数，支持科学计数法。如果是小数则放大成整数
* @param {*number} num 输入数
*/
function float2Fixed(num) {
  if (num.toString().indexOf('e') === -1) {
      return Number(num.toString().replace('.', ''));
  }
  var dLen = digitLength(num);
  return dLen > 0 ? strip(Number(num) * Math.pow(10, dLen)) : Number(num);
}
/**
* 检测数字是否越界，如果越界给出提示
* @param {*number} num 输入数
*/
function checkBoundary(num) {
  if (_boundaryCheckingState) {
      if (num > Number.MAX_SAFE_INTEGER || num < Number.MIN_SAFE_INTEGER) {
          console.warn(num + " is beyond boundary when transfer to integer, the results may not be accurate");
      }
  }
}
/**
* 迭代操作
*/
function iteratorOperation(arr, operation) {
  var num1 = arr[0], num2 = arr[1], others = arr.slice(2);
  var res = operation(num1, num2);
  others.forEach(function (num) {
      res = operation(res, num);
  });
  return res;
}

function baseTimes() {
  var nums = [];
  for (var _i = 0; _i < arguments.length; _i++) {
      nums[_i] = arguments[_i];
  }
  if (nums.length > 2) {
      return iteratorOperation(nums, times);
  }
  var num1 = nums[0], num2 = nums[1];
  var num1Changed = float2Fixed(num1);
  var num2Changed = float2Fixed(num2);
  var baseNum = digitLength(num1) + digitLength(num2);
  var leftValue = num1Changed * num2Changed;
  // checkBoundary(leftValue);
  return leftValue / Math.pow(10, baseNum);
}












class NP {
  constructor(val){
    this.value = val || 0
  }

  iteratorOperation(arr, operation) {
    var num1 = arr[0], num2 = arr[1], others = arr.slice(2);
    var res = operation(num1, num2);
    others.forEach(function (num) {
        res = operation(res, num);
    });
    return res;
  }
  // 初始化方法
  init (val) {
    this.value = val
    return new NP(strip(this.value))
  }
  //精准加法
  plus() {
    var nums = [];
    // console.log(this.value+"===")
    nums[0] = this.value
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i+1] = arguments[_i];
    }
    if (nums.length > 2) {
        return iteratorOperation(nums, this.anotherPlus)
    }
    var num1 = nums[0], num2 = nums[1];
    var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    this.value = (baseTimes(num1, baseNum) + baseTimes(num2, baseNum)) / baseNum;
    return new NP(strip(this.value))
  }
  // 迭代器用精准加法
  anotherPlus() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
      nums[_i] = arguments[_i];
    }
    var num1 = nums[0], num2 = nums[1];
    var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    const res = (baseTimes(num1, baseNum) + baseTimes(num2, baseNum)) / baseNum;
    return new NP(strip(res))
  }
  // 精准乘法
  times() {
    var nums = [];
    nums[0] = this.value
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i+1] = arguments[_i];
    }
    if (nums.length > 2) {
        return iteratorOperation(nums, this.anotherTimes);
    }
    var num1 = nums[0], num2 = nums[1];
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    var baseNum = digitLength(num1) + digitLength(num2);
    var leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    const res = leftValue / Math.pow(10, baseNum);
    return new NP(strip(res))
  }
  // 迭代器用精准乘法
  anotherTimes() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var num1 = nums[0], num2 = nums[1];
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    var baseNum = digitLength(num1) + digitLength(num2);
    var leftValue = num1Changed * num2Changed;
    checkBoundary(leftValue);
    const res = leftValue / Math.pow(10, baseNum);
    return new NP(strip(res))
  }
  // 精准减法
  minus() {
    var nums = [];
    nums[0] = this.value
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i+1] = arguments[_i];
    }
    if (nums.length > 2) {
        return iteratorOperation(nums, this.anotherMinus);
    }
    var num1 = nums[0], num2 = nums[1];
    var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    const res = (baseTimes(num1, baseNum) - baseTimes(num2, baseNum)) / baseNum;
    return new NP(strip(res))
  }
  // 迭代器用精准减法
  anotherMinus() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var num1 = nums[0], num2 = nums[1];
    var baseNum = Math.pow(10, Math.max(digitLength(num1), digitLength(num2)));
    const res = (baseTimes(num1, baseNum) - baseTimes(num2, baseNum)) / baseNum;
    return new NP(strip(res))
  }
  //精准除法
  divide() {
    var nums = [];
    nums[0] = this.value
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i+1] = arguments[_i];
    }
    if (nums.length > 2) {
        return iteratorOperation(nums, this.anotherDivide);
    }
    var num1 = nums[0], num2 = nums[1];
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    // fix: 类似 10 ** -4 为 0.00009999999999999999，strip 修正
    return new NP(strip(baseTimes(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))))));
  }
  //迭代器用除法
  anotherDivide() {
    var nums = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        nums[_i] = arguments[_i];
    }
    var num1 = nums[0], num2 = nums[1];
    var num1Changed = float2Fixed(num1);
    var num2Changed = float2Fixed(num2);
    checkBoundary(num1Changed);
    checkBoundary(num2Changed);
    return new NP(strip(baseTimes(num1Changed / num2Changed, strip(Math.pow(10, digitLength(num2) - digitLength(num1))))));
  }  
  // 四舍五入
  round(ratio) {
    var base = Math.pow(10, ratio);
    return new NP(this.anotherDivide(Math.round(this.anotherTimes(this.value, base)), base).valueOf());
  }
  // 返回值用方法
  valueOf() {
    return Number(this.value)
  }
}

module.exports = NP
