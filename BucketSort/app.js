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
 * 插入排序
 * 插入排序每次排一个数组项，以此方式构建最后的排序数组。
 * @param {array} array 要进行排序的数组
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {array} 返回排序后的数组
 */
 export const insertionSort = (array, compareFn = defaultCompare) => {
  const { length } = array;  // 声明一个名为length的变量，用来存储数组的长度
  let temp;
  // 主循环 迭代数组来给第 i 项找到正确的位置(假设下标0的元素已经排序好)
  for (let i = 1; i < length; i++) { 
    let j = i; // 用 i 的值来初始化一个辅助变量
    temp = array[i]; // 将其值存储在一个临时变量中(便于之后将其插入到正确的位置上)
    // console.log('to be inserted ' + temp);
    //次循环 找到正确的位置来插入项
    while (j > 0 && compareFn(array[j - 1], temp) === Compare.BIGGER_THAN) { // 只要变量j大于0(因为0下标已被假设排好序)，并且数组前面的值比待比较的值大(也就是如果array[j - 1]比temp大)
      // console.log('shift ' + array[j - 1]);
      array[j] = array[j - 1]; // 我们就把这个值移到当前位置上
      j--; // 并减小 j
    }
    // console.log('insert ' + temp);
    array[j] = temp; // 最终，将该值插入到正确的位置上
  }
  // 返回排序后的数组
  return array;
};
/**
 * 创建桶并将元素分布到不同的桶中
 * @param {array} array 要进行排序的数组
 * @param {number} bucketSize 需要创建的桶数量
 * @returns {array} 返回创建后的桶
 */
function createBuckets(array, bucketSize) {
  let minValue = array[0]; // 存储数组的最小值
  let maxValue = array[0]; // 存储数组的最大值
  for (let i = 1; i < array.length; i++) {  //迭代原数组并找到最大值和最小值
    if (array[i] < minValue) {
      minValue = array[i];
    } else if (array[i] > maxValue) {
      maxValue = array[i];
    }
  }
  const bucketCount = Math.floor((maxValue - minValue) / bucketSize) + 1; // 计算桶的区间跨度，公式为: 数组最大值与最小值的差值与桶大小进行除法运算，并+1
  const buckets = [];
  for (let i = 0; i < bucketCount; i++) { // 在计算了 bucketCount(桶的区间跨度) 后，我们需要初始化每个桶。buckets 数据结构是一个矩阵（多维数组）。buckets 中的每个位置包含了另一个数组。
    buckets[i] = [];
  }
  // 将元素根据不同的区间跨度，分布到桶中
  for (let i = 0; i < array.length; i++) { // 我们需要迭代数组中的每个元素
    buckets[Math.floor((array[i] - minValue) / bucketSize)].push(array[i]); // 计算要将元素放到哪个桶中，并将元素插入正确的桶中。
  }
  return buckets;
}
/**
 * 对每个桶执行插入排序算法和将所有桶合并为排序后的结果数组
 * @param {number} buckets 所有桶
 * @returns {array} 返回创建后的桶
 */
function sortBuckets(buckets) {
  const sortedArray = []; // 创建一个用作结果数组的新数组
  for (let i = 0; i < buckets.length; i++) { 
    if (buckets[i] != null) {
      insertionSort(buckets[i]); // 迭代每个可迭代的桶并应用插入排序,）——根据场景，我们还可以应用其他的排序算法，例如快速排序。
      sortedArray.push(...buckets[i]); // 最后，我们将排好序的桶中的所有元素加入结果数组中(等同于迭代 buckets[i]中的每个元素（buckets[i][j]）并将每个元素加入排序后的数组。)
    }
  }
  return sortedArray;
}
/**
 * 桶排序
 * 桶排序（也被称为箱排序）也是分布式排序算法，它将元素分为不同的桶（较小的数组），再使用一个简单的排序算法，例如插入排序（用来排序小数组的不错的算法），来对每个桶进行排序。然后，它将所有的桶合并为结果数组。
 * 小灰的文章:https://mp.weixin.qq.com/s/qrboxA5SwN7AbAcpZ_dpNQ
 * @param {array} array 要进行排序的数组
 * @param {number} bucketSize 声明桶的大小，默认会使用 5 个桶，桶排序在所有元素平分到各个桶中时的表现最好。如果元素非常稀疏，则使用更多的桶会更好。如果元素非常密集，则使用较少的桶会更好。
 * @returns {array} 返回排序后的数组
 */
export function bucketSort(array, bucketSize = 5) {
  if (array.length < 2) { // 如果数组只有一项，不需要排序，直接返回
    return array;
  }
  const buckets = createBuckets(array, bucketSize); // 创建桶并将元素分布到不同的桶中
  return sortBuckets(buckets); // 对每个桶执行插入排序算法和将所有桶合并为排序后的结果数组
}