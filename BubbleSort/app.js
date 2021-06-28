// 比较用的常量对象(保证代码优雅)
export const Compare = {
  LESS_THAN: -1, // 如果第一个元素小于第二个元素，它就返回-1
  BIGGER_THAN: 1, // 如果第一个元素大于第二个元素，它就返回1
  EQUALS: 0 // 如果元素有相同的引用，它就返回 0
};
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
 * 交换函数
 * @param {*} array 传入需要交换的数组(这里传入堆)
 * @param {*} a 传入要交换的节点A
 * @param {*} b 传入要交换的节点B
 */
export function swap(array, a, b) {
  // ES5写法(性能较好)
  /* const temp = array[a]; // 要交换数组中的两个值，我们需要一个辅助变量来复制要交换的第一个元素
  array[a] = array[b]; // 然后，将第二个元素赋值到第一个元素的位置
  array[b] = temp; */ // 最后，将复制的第一个元素的值覆盖到第二个元素的位置
  // ES6写法(性能较差) https://bugzilla.mozilla.org/show_bug.cgi?id=1177319
  [array[a], array[b]] = [array[b], array[a]];
}
/**
 * 冒泡排序
 * 冒泡排序的基本思想是：每次比较两个相邻的元素，如果它们的顺序错误就把它们交换过来。
 * @param {array} array 要进行排序的数组
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {array} 返回排序后的数组
 */
export function bubbleSort(array, compareFn = defaultCompare) {
  const { length } = array; // 声明一个名为length的变量，用来存储数组的长度
  for (let i = 0; i < length; i++) { // 外循环，冒泡排序每一趟只能确定将一个数归位，所以数组中的每一项都需要经过一轮排序，轮数和数组长度一致
    // console.log('--- ');
    for (let j = 0; j < length - 1; j++) { // 内循环，用当前项与下一项做比较，对n个数进行排序，只用进行n-1趟
      // console.log('compare ' + array[j] + ' with ' + array[j + 1]);
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) { // 如果这两项顺序不对（当前项比下一项大）
        // console.log('swap ' + array[j] + ' with ' + array[j + 1]);
        swap(array, j, j + 1); // 则交换它们(位置为j+1的值将会被换置到位置j处)
      }
    }
  }
  // 返回排序后的数组
  return array;
}
/**
 * 改进后的冒泡排序
 * 冒泡排序的基本思想是：每次比较两个相邻的元素，如果它们的顺序错误就把它们交换过来。
 * @param {array} array 要进行排序的数组
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {array} 返回排序后的数组
 */
export function modifiedBubbleSort(array, compareFn = defaultCompare) {
  const { length } = array; // 声明一个名为length的变量，用来存储数组的长度
  for (let i = 0; i < length; i++) { // 外循环，冒泡排序每一趟只能确定将一个数归位，所以数组中的每一项都需要经过一轮排序，轮数和数组长度一致
    // console.log('--- ');
    for (let j = 0; j < length - 1 - i; j++) { // 内循环，用当前项与下一项做比较，对n个数进行排序，只用进行n-1趟,再从内循环减去外循环中已跑过的轮数i(已跑过轮数的数已归位，无须再进行比较)
      // console.log('compare ' + array[j] + ' with ' + array[j + 1]);
      if (compareFn(array[j], array[j + 1]) === Compare.BIGGER_THAN) { // 如果这两项顺序不对（当前项比下一项大）
        // console.log('swap ' + array[j] + ' with ' + array[j + 1]);
        swap(array, j, j + 1); // 则交换它们(位置为j+1的值将会被换置到位置j处)
      }
    }
  }
  // 返回排序后的数组
  return array;
}