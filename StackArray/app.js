/**
 * 栈是一种遵从后进先出（LIFO）原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。
 * 生活中常见的栈:一摞书、餐厅里叠放的盘子
 */

export class Stack {
  constructor() {
    this.items = []; // 保存栈元素的数组
  }

  /**
   * 添加一个（或几个）新元素到栈顶
   * @param {*} element 需要添加的项
   */
  push(element) {
     this.items.push(element);
  }
  /**
   * 移除栈顶的元素，同时返回被移除的元素。
   * @returns {*} 被移除的元素
   */
  pop() {
    return this.items.pop();
  }
  /**
   * 返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）
   * @returns {*} 被移除的元素
   */
  peek() {
    return this.items[this.items.length - 1];
  }
  /**
   * 如果栈里没有任何元素就返回 true，否则返回 false。
   * @returns {Boolean}
   */
  isEmpty() {
    return this.items.length === 0;
  }
  /**
   * 移除栈里的所有元素
   */
  clear() {
    this.items = [];
  }
  /**
   * 返回栈里的元素个数。该方法和数组的 length 属性很类似。
   * @returns {Number} 栈里的元素个数
   */
  size() {
    return this.items.length; 
  }
  /**
   * 以数组的方式输出栈的值
   * @returns {Array}
   */
  toArray() {
    return this.items;
  }
  /**
   * 以字符串的方式输出栈的值
   * @returns {Array}
   */
  toString() {
    return this.items.toString();
  }
}
