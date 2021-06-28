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