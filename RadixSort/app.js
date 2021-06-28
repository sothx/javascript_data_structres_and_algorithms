/**
 * 找出数组的最大值
 * @param {array} array 要进行搜索的数组
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {number} 返回找到的数组最大值
 */
export function findMaxValue(array, compareFn = defaultCompare) {
  if (array && array.length > 0) {
    let max = array[0];
    for (let i = 1; i < array.length; i++) {
      if (compareFn(max, array[i]) === Compare.LESS_THAN) {
        max = array[i];
      }
    }
    return max;
  }
  return undefined;
}
/**
 * 找出数组的最小值
 * @param {array} array 要进行搜索的数组
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {number} 返回找到的数组最小值
 */
export function findMinValue(array, compareFn = defaultCompare) {
  if (array && array.length > 0) {
    let min = array[0];
    for (let i = 1; i < array.length; i++) {
      if (compareFn(min, array[i]) === Compare.BIGGER_THAN) {
        min = array[i];
      }
    }
    return min;
  }
  return undefined;
}
/**
 * 计算桶索引
 * @param {number} value 要获取位置的值
 * @param {number} minValue 数组中的最小值
 * @param {number} significantDigit 有效位
 * @param {number } radixBase 基数，10进制排序，默认基数为10
 * @return {number} 值对应桶区间的索引
 */
const getBucketIndex = (value, minValue, significantDigit, radixBase) =>
  // 将元素根据不同的区间跨度，分布到桶中
  Math.floor(((value - minValue) / significantDigit) % radixBase);

/**
 * 基于有效位（基数）排序（使用桶排序）
 * @param {array} array 要进行排序的数组
 * @param {number} radixBase 基数，10进制排序，默认基数为10
 * @param {number} significantDigit 有效位
 * @param {number} minValue 数组的最小值
 * @returns {array} 返回排序后的数组
 */
const countingSortForRadix = (array, radixBase, significantDigit, minValue) => {
  let bucketsIndex;
  const buckets = []; // 存储桶的变量
  const aux = [];
  // 通过radixBase来初始化桶，默认初始化为0
  for (let i = 0; i < radixBase; i++) { // 首先，我们基于基数初始化桶，由于我们排序的是十进制数，那么需要10个桶。
    buckets[i] = 0;
  }
  // 遍历array，基于有效位计算桶索引执行计数排序（计数排序的稳定排序)
  // 计数排序文章:https://mp.weixin.qq.com/s/WGqndkwLlzyVOHOdGK7X4Q
  for (let i = 0; i < array.length; i++) { // 然后，我们会基于数组中
    bucketsIndex = getBucketIndex(array[i], minValue, significantDigit, radixBase); // 计算桶索引
    buckets[bucketsIndex]++; // 根据桶索引，执行计数操作
  }
  for (let i = 1; i < radixBase; i++) { // 计算累积结果来得到正确的计数值，从1开始遍历到radixBase位置。
    buckets[i] += buckets[i - 1]; // 从第二个元素开始，每一个元素都加上前面所有元素之和。
  }
  // 计数完成，遍历array将值移回原始数组中，用aux辅助数组来存储
  for (let i = array.length - 1; i >= 0; i--) {   // 对原始数组中的每个值
    bucketsIndex = getBucketIndex(array[i], minValue, significantDigit, radixBase); // 计算当前元素的桶索引
    aux[--buckets[bucketsIndex]] = array[i]; // 对当前桶索引内的元素执行自减操作，得到其在数组中的正确位置index
  }
  //计算出索引后，在aux中的对应位置存储当前遍历到的元素
  for (let i = 0; i < array.length; i++) {
    array[i] = aux[i];
  }
  return array;
};
/**
 * 基数排序
 * 参考文章:https://juejin.cn/post/6860501233308794887#heading-31
 * @param {array} array 要进行排序的数组
 * @param {number} radixBase // 基数，10进制排序，默认基数为10
 * @returns {array} 返回排序后的数组
 */
export function radixSort(array, radixBase = 10) {
  // 如果array的长度小于2，则array不需要排序，直接返回
  if (array.length < 2) {
    return array;
  }
  /**
   * 这个算法也可以被修改成支持排序字母字符。我们首先只会基于最后一位有效位对数字进行排序，在下次迭代时，我们会基于第二个有效位进行排序（十位数字），然后是第三个有效位（百位数字），以此类推。我们继续这个过程直到没有待排序的有效位，这也是为什么我们需要知道数组中的最小值和最大值。
   */
  const minValue = findMinValue(array); // 获取array的最小值
  const maxValue = findMaxValue(array); // 获取array的最大值
  // 当前有效数字,默认会从最后一位（最低位）有效数字开始排序
  let significantDigit = 1;
  /**
  * 计算有效位
  * 最大值和最小值的差与有效位数字进行除法运算，其值大于等于1就代表还有待排序的有效位
  */
  while ((maxValue - minValue) / significantDigit >= 1) { // 计算有效位，如果(数组最大数 - 数组最小数) / 当前有效位的数字 >= 1
    // console.log('radix sort for digit ' + significantDigit);
    // 以当前有效位作为参数调用countingSortForRadix函数对数组进行排序
    array = countingSortForRadix(array, radixBase, significantDigit, minValue);
    // console.log(array.join());
    // 当前有效数字乘以基数，继续执行while循环进行基数排序
    significantDigit *= radixBase;
  }
  return array;
}