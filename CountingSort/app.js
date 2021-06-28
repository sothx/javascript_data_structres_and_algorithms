/**
 * 找到数组中最大的一项
 * @param {array} array 需要操作最大值的数组
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {number}} 返回数组中找到的最大值
 */
export function findMaxValue(array, compareFn = defaultCompare) {
  // 要找到数组中的最大值，我们只需要迭代并找到值最大的一项即可
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
 * 计数排序
 * 小灰的文章:https://mp.weixin.qq.com/s/WGqndkwLlzyVOHOdGK7X4Q
 * @param {array} array 要进行排序的数组
 * @returns {array} 返回排序后的数组
 */
export function countingSort(array) {
  if (array.length < 2) { // 如果待排序的数组为空或只有一个元素，则不需要运行排序算法。
    return array;
  }
  const maxValue = findMaxValue(array); // 找到数组中的最大值
  let sortedIndex = 0;
  const counts = new Array(maxValue + 1); // 创建计数数组，从索引 0 开始直到最大值索引 value + 1
  array.forEach(element => {
    // 迭代数组中的每个位置并在 counts 数组中增加元素计数值
    if (!counts[element]) { // 为了保证递增成功，如果 counts 数组中用来计数某个元素的位置一开始没有用 0 初始化的话
      counts[element] = 0; // 我们将其赋值为 0
    }
    counts[element]++;
  });
  // console.log('Frequencies: ' + counts.join());
   // 所有元素都计数后，我们要迭代 counts 数组并构建排序后的结果数组
  counts.forEach((element, i) => {
    while (element > 0) {
      array[sortedIndex++] = i; // 由于可能有多个元素有相同的值，我们要将元素按照在原始数组中的出现次数进行相加
      element--; // 减少计数值,直到它为0
    }
  });
  return array;
}