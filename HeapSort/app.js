// 比较用的常量对象(保证代码优雅)
export const Compare = {
  LESS_THAN: -1, // 如果第一个元素小于第二个元素，它就返回-1
  BIGGER_THAN: 1, // 如果第一个元素大于第二个元素，它就返回1
  EQUALS: 0, // 如果元素有相同的引用，它就返回 0
};

// 反转后的比较方法(用于最大堆)
export function reverseCompare(compareFn) {
  return (a, b) => compareFn(b, a);
}

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
 *  堆调整---同下移操作（堆化）
 * 下移操作表示将元素和最小子节点（最小堆）和最大子节点（最大堆）进行交换
 * @param {number} array 传入需要下移操作的数组
 * @param {number} index 需要调整的元素位置(index)
 * @param {number} heapSize 传入堆的大小
 * @param {number} compareFn 需要使用的比较函数
 */
function heapify(array, index, heapSize, compareFn) {
  let largest = index; // 声明一个变量(largest)保存index
  const left = 2 * index + 1; // 获取index的左测子节点(left)
  const right = 2 * index + 2; // 获取index的右侧子节点(right)
  if (
    left < heapSize &&
    this.compareFn(array[left], array[largest]) === Compare.BIGGER_THAN
  ) { // 如果array[largest] > array[left]，则更新largest的值为left（left < heapSize 用于校验index是否合法）
    largest = left; // 交换元素和它的左侧子节点
  }
  if (
    right < heapSize &&
    this.compareFn(array[right], array[largest]) === Compare.BIGGER_THAN
  ) { // 如果array[largest] > array[right]，则更新element的值为right（left < heapSize 用于校验index是否合法）
    largest = right; // 交换元素和它的右侧子节点
  }
  // 交换完后判断当前保存的element和index的值是否相同，如果不相同，则未找到最小堆的位置
  if (index !== largest) {
    // 如果不相同，则还未找到最小子节点的位置
    swap(array, index, largest); // 我们将这个元素和左/右侧子节点交换(交换index和largest位置的元素)
    heapify(array, largest, heapSize, compareFn); // 重复这个过程(继续执行heapify函数)
  }
}

/**
 * 将无序数组调整为堆
 * @param {array} array 待转换为堆的数组
 * @param {function} compareFn 比较用的函数，默认比较函数是 defaultCompare
 * @returns {array} 返回生成后的堆
 */
export function buildHeap(array, compareFn) {
  // 把无序数组构建成二叉堆，需要进行n/2次循环,每次循环调用一次 heapify 方法，所以第一步的计算规模是  n/2 * logn，时间复杂度 O（nlogn）。
  // 使用 n-2次循环，便于快速寻找最后一个非叶子节点(最后一个父节点)
  // 随后对每一个非叶子节点都执行一次heapify 操作
  // 这样到最后，就满足所有结点以下的子堆都已经符合最小堆或最大堆
  for (let i = Math.floor(array.length / 2); i >= 0; i -= 1) {
    heapify(array, i, array.length, compareFn);
  }
  return array;
}

/**
 * 堆排序
 * @param {string} sort 排序类型，sort值可以是asc或desc，asc则为升序(使用最大堆),desc则为降序(使用最小堆),默认asc升序排序
 * @param {array} array 需要排序的数组
 * @param {function} compareFn 比较用的函数，默认比较函数是 defaultCompare
 * @returns {array} 返回排序后的数组
 */
export default function heapSort(
  sort = "asc",
  array,
  compareFn = defaultCompare
) {
  // 校验排序类型的合法性
  if (sort !== "asc" || sort !== "desc") {
    return undefined;
  }
  // 如果排序方式为降序，需要反转比较函数
  if (sort === "desc") {
    compareFn = reverseCompare(compareFn);
  }
  // 将待排序的数组长度保存到临时变量heapSize
  let heapSize = array.length;
  // 将待排序数组转换为最大堆或最小堆(视排序方式而异)
  buildHeap(array, compareFn);
  // 排序

  // 执行while循环，循环条件是heap大小大于1
  while (heapSize > 1) {
    swap(array, 0, --heapSize); // 将堆的尾节点与堆的根节点交换，并且减少堆的长度(减少长度之后的堆节点已排序好)
    heapify(array, 0, heapSize, compareFn); // 从根节点开始调整堆，当前堆的尾节点已经是最大值(减去的堆长度)，所以这里调整堆的长度是已经减少之后的长度
  }
  // 返回排序后的堆
  return array;
}
