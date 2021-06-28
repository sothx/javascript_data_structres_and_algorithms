// 比较用的常量对象(保证代码优雅)
export const Compare = {
  LESS_THAN: -1, // 如果第一个元素小于第二个元素，它就返回-1
  BIGGER_THAN: 1, // 如果第一个元素大于第二个元素，它就返回1
  EQUALS: 0 // 如果元素有相同的引用，它就返回 0
};

// 不存在值的常量(保证代码优雅)
export const DOES_NOT_EXIST = -1;

// 比较用的方法
export function defaultCompare(a, b) {
  // 如果元素有相同的引用，它就返回 0
  if (a === b) {
    return Compare.EQUALS;
  }
  // 如果第一个元素小于第二个元素，它就返回-1,否之返回1
  return a < b ? Compare.LESS_THAN : Compare.BIGGER_THAN;
}

/**
 * 校验a值是否大于b值
 * @param {number} a 要比较的第一个数
 * @param {number} b 要比较的第二个数
 * @return {number} 如果a>b,则返回1，否则返回0
 */
export function biggerEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  // 如果a>b,则返回1，否则返回0
  return comp === Compare.BIGGER_THAN || comp === Compare.EQUALS;
}

/**
 * 校验a值是否小于b值
 * @param {number} a 要比较的第一个数
 * @param {number} b 要比较的第二个数
 * @return {number} 如果a<b，则返回-1，否则返回0
 */
export function lesserEquals(a, b, compareFn) {
  const comp = compareFn(a, b);
  // 如果a<b,则返回-1，否则返回0
  return comp === Compare.LESS_THAN || comp === Compare.EQUALS;
}

/**
 * 校验两个值是否相等的函数
 * @param {number} a 要比较的第一个数
 * @param {number} b 要比较的第二个数
 * @return {boolean} 两个值相等则返回true，否则返回false
 */
export function defaultEquals(a, b) {
  return a === b;
}

/**
 * 计算两个数的差值的函数
 * @param {number} a 要比较的第一个数
 * @param {number} b 要比较的第二个数
 * @return {number} 两个数的差值
 */
export function defaultDiff(a, b) {
  return Number(a) - Number(b);
}



/**
 * 内插搜索(二分搜索的变种，搜索的数据需要呈线性增长，所以这个算法要求被搜索的数据结构已排序)
 * 内插搜索是改良版的二分搜索。二分搜索总是检查mid位置上的值，而内插搜索可能会根据要搜索的值按比例检查数组中的不同地方。
 * @param {array} array 要进行搜索的数组(数组项需要呈线性增长，也就是必须是已经排好序的)
 * @param {*} value 要进行搜索的值
 * @param {function} compareFn 比较用的方法，默认为defaultCompare
 * @param {function} equalsFn 校验两个值是否相等的函数，默认为defaultEquals
 * @param {function} diffFn 计算两个数的差值的函数，默认为defaultDiff
 * @return {*} 返回搜索到的结果
 */
export function interpolationSearch(
  array,
  value,
  compareFn = defaultCompare,
  equalsFn = defaultEquals,
  diffFn = defaultDiff
) {
  // 存储数组的长度
  const { length } = array;
  // 存储low边界，默认值是数组最左，即0 ---同二分查找
  let low = 0;
  // 存储high边界，默认值是数组最右，即length - 1 --- 同二分查找
  let high = length - 1;
  // 要比较值的位置,默认为-1
  let position = -1;
  // 要搜索值在数组中的比例
  let delta = -1;
  while (
    low <= high // low边界值小于等于high边界值
    && biggerEquals(value, array[low], compareFn) // 如果value > array[low]，则为true，否则为false
    && lesserEquals(value, array[high], compareFn) //如果value < array[high],则为true，否则为false
  ) { 
    // 获取要搜索的值在数组中的比例
    // (value - array[low]) / (array[hight]- array[low])
    delta = diffFn(value, array[low]) / diffFn(array[high], array[low]);
    // 根据搜索值在数组中的比例，获取要比较值的位置(----同二分搜索中的mid)
    // low + (hight - low) * detlta
    position = low + Math.floor((high - low) * delta);
    // 如果postion(要比较值的位置)和要搜索的值相等，则找到要搜索的值，直接返回位置 ---同二分查找
    // array[position] === value
    if (equalsFn(array[position], value)) {
      return position;
    }
    // 如果postion(要比较值的位置)小于要搜索的值，则重新选择数组的中间值并在选中值左边的子数组中寻找（较小）---同二分查找
    if (compareFn(array[position], value) === Compare.LESS_THAN) {
      low = position + 1;
    } else {
    // 如果postion(要比较值的位置)大于要搜索的值，则重新选择数组的中间值并在选中值右侧的子数组中寻找（较大）---同二分查找
      high = position - 1;
    }
  }
  // 如果数组全部检索完均没有找到，则返回-1
  return DOES_NOT_EXIST;
}