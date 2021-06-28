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
 * 快速排序进行划分过程(选择基准元素)的内部方法
 * 选择基准元素有好几种方法，比较常见的一种方法是选择数组中间的值
 * @param {array} array 要进行排序的数组
 * @param {array} left 左侧低指针
 * @param {array} right 右侧高指针
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {array} 返回排序后的数组
 */
function partition(array, left, right, compareFn) {
  const pivot = array[Math.floor((right + left) / 2)]; // 我们选择中间值作为基准元素
  let i = left; // left指针，初始化为数组第一个元素；
  let j = right;

  while (i <= j) { // 只要 left 和 right 指针没有相互交错，就执行划分操作。
    while (compareFn(array[i], pivot) === Compare.LESS_THAN) { // 首先，移动 left 指针直到找到一个比基准元素大的元素
      i++;
    }
    while (compareFn(array[j], pivot) === Compare.BIGGER_THAN) { // 对 right 指针，我们做同样的事情，移动 right指针直到我们找到一个比基准元素小的元素
      j--;
    }
    if (i <= j) { // 当左指针指向的元素比基准元素大且右指针指向的元素比基准元素小,并且此时左指针索引没有右指针索引大时(i <= j),此时左项比右项大（值比较）
      swap(array, i, j); // 我们交换它们
      // 然后移动两个指针，并重复此过程
      i++;
      j--;
    }
  }
  return i; // 在划分操作结束后，返回左指针的索引
}
/**
 * 快速排序的内部方法
 * @param {array} array 要进行排序的数组
 * @param {array} left 左侧低指针
 * @param {array} right 右侧高指针
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {array} 返回排序后的数组
 */
function quick(array, left, right, compareFn) {
  let index; // index变量能帮助我们将子数组分离为较小值数组和较大值数组。
  if (array.length > 1) { // 如果数组的长度比 1 大（因为只有一个元素的数组必然是已排序了的）
    index = partition(array, left, right, compareFn); // 我们将对给定子数组执行 划分(partition) 操作（第一次调用是针对整个数组）以得到 index
    if (left < index - 1) { // 如果子数组存在较小值的元素
      quick(array, left, index - 1, compareFn); // 则对该数组重复这个过程
    }
    // 同理，对存在较大值的子数组也是如此
    if (index < right) {  // 如果有子数组存在较大值
      quick(array, index, right, compareFn); // 我们也将重复快速排序过程
    }
  }
  return array;
}
/**
 * 快速排序
 * @param {array} array 要进行排序的数组
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {array} 返回排序后的数组
 */
export function quickSort(array, compareFn = defaultCompare) {
  return quick(array, 0, array.length - 1, compareFn);
}