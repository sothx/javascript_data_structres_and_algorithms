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
 * 选择排序
 * 从待排序的数据中寻找最小值，将其与序列最左边的数字进行交换，重复这一操作的算法即选择排序。
 * @param {array} array 要进行排序的数组
 * @param {function} compareFn // 比较用的方法，默认为defaultCompare
 * @returns {array} 返回排序后的数组
 */
 export const selectionSort = (array, compareFn = defaultCompare) => {
   const { length } = array; // 声明一个名为length的变量，用来存储数组的长度
   // 声明一个变量用于存储最小元素的位置
  let indexMin;
  for (let i = 0; i < length - 1; i++) { // 外循环，迭代数组，并控制数组的迭代轮次
    indexMin = i; // 初始本迭代轮次的第一个值为数组最小值
    // console.log('index ' + array[i]);
    for (let j = i; j < length; j++) { // 内循环，从当前 i 的值开始至数组结束
      if (compareFn(array[indexMin], array[j]) === Compare.BIGGER_THAN) { // 我们比较位置 j 的值是否比当前最小值小
        // console.log('new index min ' + array[j]);
        indexMin = j; // 如果是，则改变最小值至新最小值
      }
    }
    if (i !== indexMin) { // 如果该最小值和原最小值不同(此时i存储的是原最小值，indexMin存储的是新最小值)
      // console.log('swap ' + array[i] + ' with ' + array[indexMin]);
      swap(array, i, indexMin); // 则交换其值
    }
  }
  // 返回排序后的数组
  return array;
};