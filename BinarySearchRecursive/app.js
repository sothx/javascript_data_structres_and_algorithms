import {
  quickSort
} from '/QuickSort/app.js';
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
 *
 *二分搜索(递归版本)
 * @param {*} array 要进行搜索的数组
 * @param {*} value 要进行搜索的值
 * @param {*} low low边界
 * @param {*} high high边界
 * @param {*} [compareFn=defaultCompare] 比较函数，默认为defaultCompare
 * @returns
 */
function binarySearchRecursive(array, value, low, high, compareFn = defaultCompare) {
  if (low <= high) { // 当 low 比 high 小时
    const mid = Math.floor((low + high) / 2); // 我们计算得到中间项索引并取得中间项的值,mid
    const element = array[mid]; //存储当前mid选中的值
    if (compareFn(element, value) === Compare.LESS_THAN) { // 如果选中的值比待搜索的值小，则重新选择数组的中间值并在选中值左边的子数组中寻找（较小）
      return binarySearchRecursive(array, value, mid + 1, high, compareFn);
    }
    if (compareFn(element, value) === Compare.BIGGER_THAN) { // 如果选中的值比待搜索的值大，则重新选择数组的中间值并在选中值右侧的子数组中寻找（较大）
      return binarySearchRecursive(array, value, low, mid - 1, compareFn);
    }
    // 如果不大也不小，表示我们找到了这个值如果找到需要搜索的值，则返回找到值的位置
    return mid;
  }
  // 如果 low比 high 大，则意味着该待搜索值不存在并返回-1
  return DOES_NOT_EXIST;
}
/**
 * 二分搜索（分而治之思想）
 * 二分搜索算法的原理和猜数字游戏类似，就是那个有人说“我正想着一个 1～100 的数”的游戏。我们每回应一个数，那个人就会说这个数是高了、低了还是对了。
 * 这个算法要求被搜索的数据结构已排序。
 * @param {array} array 要进行搜索的数组
 * @param {*} value 要进行搜索的值
 * @param {function} compareFn 比较函数，默认为defaultCompare
 * @return {*} 返回搜索到的结果
 */
export function binarySearch(array, value, compareFn = defaultCompare) {
  const sortedArray = quickSort(array);// 开始前需要先将数组排序，我们可以选择任何一个在 13.1 节中实现的排序算法。这里我们选择了快速排序。
  const low = 0;// 设置 low 边界，默认数组最左侧，即0
  const high = sortedArray.length - 1; // 设置 high 边界，默认数组最右侧，即sortedArray.length - 1
  return binarySearchRecursive(array, value, low, high, compareFn); // 用分而治之思想进行二分搜索
}