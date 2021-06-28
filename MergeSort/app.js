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
 * 归并函数，负责合并和排序小数组来产生大数组，直到回到原始数组并已排序完成
 * @param left 需要合并排序的左侧小数组
 * @param right 需要合并排序的右侧小数组
 * @param compareFn // 传入比较用的方法，默认为defaultCompare
 * @returns {array} 返回两个小数组合并排序后的大数组
 */
function merge(left, right, compareFn) {
  let i = 0; // 用于迭代左侧小数组left的变量
  let j = 0; // 用于迭代右侧小数组right的变量
  const result = []; // 归并结果数组
  while (i < left.length && j < right.length) { // 迭代两个数组
    // 比较来自 left 数组的项是否比来自 right 数组的项小
    // 如果是将该项从 left 数组添加至归并结果数组，并递增用于迭代数组的控制变量
    // 否则，将该项从 right 数组添加项至归并结果数组并递增用于迭代数组的控制变量
    result.push(compareFn(left[i], right[j]) === Compare.LESS_THAN ? left[i++] : right[j++]);
  }
  // 执行完上面的迭代操作，则会有左侧小数组或者右侧小数组已经全部添加到归并结果数组中(可以理解为有一个小数组已经为空)
  // 此时，如果是左侧小数组不为空(i<left.length)，则将 left所有剩余的项添加到归并结果数组中，否则将剩余右侧小数组(right)添加到归并结果数组中
  // 最后，将归并结果数组作为结果返回
  return result.concat(i < left.length ? left.slice(i) : right.slice(j));
}
/**
 * 归并排序
 * 归并排序的基本思想是：将原始数组切分成较小的数组，直到每个小数组只有一个位置，接着将小数组归并成较大的数组，直到最后只有一个排序完毕的大数组。
 * @param {array} array 要进行排序的数组
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {array} 返回排序后的数组
 */
export function mergeSort(array, compareFn = defaultCompare) {
  if (array.length > 1) { // 递归停止条件，当数组的长度为 1时，直接返回，因为它已经排好序了。
    // 如果数组长度比 1 大，那么得将其分成小数组
    const { length } = array; // 声明一个名为length的变量，用来存储数组的长度
    const middle = Math.floor(length / 2); // 首先得找到数组的中间位,找到后我们将数组分成两个小数组,left和right
    /** mergeSort为递归调用自身，直到 left 数组和 right 数组的大小小于等于 1 */
    const left = mergeSort(array.slice(0, middle), compareFn); // left 数组由索引 0 至中间索引的元素组成
    const right = mergeSort(array.slice(middle, length), compareFn); // right 数组由中间索引至原始数组最后一个位置的元素组成
    array = merge(left, right, compareFn); // 获得归并后的数组
  }
  // 返回排序后的数组
  return array;
}
