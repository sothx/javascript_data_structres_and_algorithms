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
 * Fisher-Yates 随机算法
 * 它的含义是迭代数组，从最后一位开始并将当前位置和一个随机位置进行交换。这个随机位置比当前位置小。这样，这个算法可以保证随机过的位置不会再被随机一次
 * @param {array} array 需要随机排序的算法
 */
export function shuffle(array) {
  let currentIndex = array.length; // 开始进行交换的当前位置，默认为数组长度
  while (currentIndex !== 0) { // 如果当前位置不为0
    const randomIndex = Math.floor(Math.random() * currentIndex); // 获取随机检索到的位置，即随机位置
    currentIndex--; // 递减当前位置
    swap(array, currentIndex, randomIndex); // 将当前位置和一个随机位置进行交换
  }
  // 返回随机排序否的数组
  return array;
}
