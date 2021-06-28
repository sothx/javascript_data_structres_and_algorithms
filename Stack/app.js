/**
 * 栈是一种遵从后进先出（LIFO）原则的有序集合。新添加或待删除的元素都保存在栈的同一端，称作栈顶，另一端就叫栈底。在栈里，新元素都靠近栈顶，旧元素都接近栈底。
 * 生活中常见的栈:一摞书、餐厅里叠放的盘子
 */

 export class Stack {
   constructor() {
    this.count = 0;  // 记录栈的大小和便于从栈中添加和删除元素
    this.items = []; // 保存栈元素的数组
  }

  /**
   * 添加一个新元素到栈顶
   * @param {*} element 需要添加的项
   */
  push(element) {
    this.items[this.count] = element;
    this.count++;
  }
  /**
   * 移除栈顶的元素，同时返回被移除的元素。
   * @returns {*} 被移除的元素
   */
  pop() {
    if (this.isEmpty()) { // 检验栈是否为空
      return undefined; // 如果为空，就返回 undefined
    }
    // 如果栈不为空
    this.count--; // 栈的元素个数减1
    const result = this.items[this.count]; // 保存栈顶的值(用于返回)
    delete this.items[this.count]; // 删除栈顶的元素
    return result; // 返回被移除的元素
  }
  /**
   * 返回栈顶的元素，不对栈做任何修改（该方法不会移除栈顶的元素，仅仅返回它）
   * @returns {*} 被移除的元素
   */
  peek() {
    if (this.isEmpty()) { // 检验栈是否为空
      return undefined; // 如果为空，就返回 undefined
    }
    // 如果栈不为空
    return this.items[this.count - 1];  // 返回栈顶的元素
  }
  /**
   * 如果栈里没有任何元素就返回 true，否则返回 false。
   * @returns {Boolean}
   */
  isEmpty() {
    return this.count === 0;
  }
  /**
   * 移除栈里的所有元素
   */
  clear() {
    this.items = {};
    this.count = 0;
  }
  /**
   * 返回栈里的元素个数。该方法和数组的 length 属性很类似。
   * @returns {Number} 栈里的元素个数
   */
  size() {
    return this.count; 
  }
  /**
   * 以字符串的方式输出栈的值
   * @returns {Array}
   */
  toString() {
    if (this.isEmpty()) { // 检验栈是否为空
      return ''; // 如果为空，就返回 空字符串
    }
    // 如果栈不为空
    let objString = `${this.items[0]}`; // 用它底部的第一个元素作为字符串的初始值
    //迭代整个栈的键，一直到栈顶
    for (let i = 1; i < this.count; i++) {
      // 添加一个逗号（,）以及下一个元素
      objString = `${objString},${this.items[i]}`;
    }
    // 以字符串的方式输出栈的值
    return objString;
  }
}
