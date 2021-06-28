/**
 * 队列是遵循先进先出（FIFO，也称为先来先服务）原则的一组有序的项。队列在尾部添加新元素，并从顶部移除元素。最新添加的元素必须排在队列的末尾。
 * 生活中常见的队列:排队、打印机的打印队列
 */

export class Queue {
  constructor() {
    this.count = 0; // 由于使用了对象，使用count属性控制队列的大小。
    this.lowestCount = 0; // 由于需要从队列前端移除元素，因此需要lowestCount来帮助追踪第一个元素
    this.items = {}; // 可以使用数组，也可以使用对象等数据结构，对象实现队列大多数情况下的算法复杂度优于数组
  }
  /**
   * 向队列尾部添加一个（或多个）新的项。
   * @param {*} element 需要添加的项
   */
  enqueue(element) {
    this.items[this.count] = element;
    this.count++;
  }
  /**
   * 移除队列的第一项（即排在队列最前面的项）并返回被移除的元素。
   * @returns {*} 被移除的元素
   */
   dequeue() {
    if (this.isEmpty()) { // 检验队列是否为空
      return undefined; // 如果为空，就返回 undefined
    }
     // 如果队列不为空
    const result = this.items[this.lowestCount]; // 暂存队列头部的值,用于返回
    delete this.items[this.lowestCount]; // 删除队列头部的元素
    this.lowestCount++; // 由于队列头部元素被移除后已不存在，记录队列头部元素指针的属性递增
    return result; // 返回被移除的元素
  }
  /**
   * 返回队列中第一个元素——最先被添加，也将是最先被移除的元素。队列不做任何变动（不移除元素，只返回元素信息——与 Stack 类的 peek 方法非常类似）。该方法在其他语言中也可以叫作 front 方法。
   * @returns {*} 被移除的元素
   */
  peek() {
    if (this.isEmpty()) { // 检验队列是否为空
      return undefined; // 如果为空，就返回 undefined
    }
     // 如果队列不为空
    return this.items[this.lowestCount]; // 返回队列中第一个元素
  }
  /**
   * 如果队列中不包含任何元素，返回 true，否则返回 false。
   * @returns {Boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }
  /**
   * 清空队列
   */
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  /**
   * 返回队列包含的元素个数，与数组的 length 属性类似。
   * @returns {Number} 队列里的元素个数
   */
  size() {
    return this.count - this.lowestCount;
  }
  /**
   * 以字符串的方式输出队列的值
   * @returns {String}
   */
  toString() {
    if (this.isEmpty()) { // 检验队列是否为空
      return ''; // 如果为空，就返回 空字符串
    }
    // 如果队列不为空
    let objString = `${this.items[this.lowestCount]}`; // 用队列中第一个元素作为字符串的初始值
    //由于 Queue 类中的第一个索引值不一定是 0，我们需要从索引值为 lowestCount 的位置开始迭代队列
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      // 添加一个逗号（,）以及下一个元素
      objString = `${objString},${this.items[i]}`;
    }
    // 以字符串的方式输出队列的值
    return objString;
  }
}