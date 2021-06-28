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
 * 顺序搜索
 * 顺序搜索迭代整个数组，并将每个数组元素和搜索项做比较。如果搜索到了，算法将用返回值来标示搜索成功。
 * @param {array} array 要进行搜索的数组
 * @param {*} value 要进行搜索的值
 * @param {function} equalsFn 校验两个值是否相等的函数，默认为defaultEquals
 * @return {*} 返回搜索到的结果
 */
 export function sequentialSearch(array, value, equalsFn = defaultEquals) {
  for (let i = 0; i < array.length; i++) { // 迭代整个数组
    if (equalsFn(value, array[i])) { // 并将每个数组元素和搜索项做比较
      return i; // 如果搜索到了，算法将用返回值来标示搜索成功。
    }
  }
  return DOES_NOT_EXIST; // 如果搜索不到，则返回-1，表示该索引不存在
 } 