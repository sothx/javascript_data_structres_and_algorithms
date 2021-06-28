/**
 * Node 辅助类，表示想要添加的项
 * @param {*} element 需要加入链表元素的值
 */
export class Node{
  constructor(element) {
  	this.element = element; //要添加到列表的项
    this.next = null; //指向列表中下一个节点项的指针
  }
}
// 链表
export class LinkedList{
  constructor() {
  	this.head = null; //链表的第一个节点
    this.length = 0; //链表的长度
  }
  /**
   * 向链表尾部添加一个新的项
   * @param {*} element 需要添加的项
   */
  push(element) {
    const node = new Node(element); //把需要添加的项(element)作为值传入，创建Node项
    let current;
    // 如果head为null,则添加的是链表的第一个节点(为空的列表添加一个元素)
    if (this.head === null) {
      this.head = node; //把要添加的项指向head
    } else {
      // 如果head不为null，则列表不为空(向一个不为空的列表尾部添加元素)
      /**
       * 第一步:需要找到链表最后一个元素
       * 由于我们只有第一个元素的引用，我们需要一个current指向，还需要把第一个元素的引用赋值给current，然后循环访问列表，直到找到最后一项。
       */

      //把链表的第一个元素指向current
      current = this.head;

      // 循环列表，直到current.next元素为null，此时已经到达链表的尾部，也就是找到最后一项
      while (current.next) {
        current = current.next;
      }

      // 第二步:找到最后一项，将它的next赋为node(当前想要添加到列表的节点)，建立链接
      current.next = node;
    }

    // 递增链表的长度

    this.length++; // 更新链表的长度
  }
  /**
   * 从链表的特定位置移除一项
   * @param {Number} index 需要移除链表项的位置
   */
  removeAt(index) {
    // 检查越界值(检查输入的移除元素位置是否有效，参考数组)
    if (index >= 0 && index < this.length) {
      let current = this.head; // 对链表当前元素的引用，默认为链表第一个元素
      let index = 0; //用于循环索引链表项的变量，默认为第一个元素的位置

      /**
       * 从链表中移除第一个元素
       * 实现方法:将head指向链表的第二个元素
       */
      if (index === 0) {
        this.head = current.next;
      } else {
      /**
       * 从链表中移除某一项或者最后一项
       * 第一步:将循环索引的下标不断递增，寻找到最后一项，current此时保存着最后一项的引用，previous保存着当前元素前一个元素的引用
       */
        const previous = this.getElementAt(index - 1);// 对链表当前元素的前一个元素的引用
        current = previous.next;
        // console.log(previous, current,index);
        /**
         * 如果是移除最后一项，此时current.next的指向值是null，把previous.next设置为null，则等于将最后一项移除
         * 如果是中间元素的引用，此时current.next的指向值是下一个链表元素的引用，把previous.next设置为current.next，则等于移除了当前元素
         */
        // 将previous与current的下一项链接起来：跳过current，从而移除它
        previous.next = current.next;
      }
      // 减少链表的长度
      this.length--; // 更新链表的长度

      return current.element; // 移除成功，返回被移除的元素
    } else {
      // 不是有效的位置，返回undefined(即没有从链表中移除元素)
      return undefined;
    }
  }
  /**
   * 返回链表中特定位置的元素。如果链表中不存在这样的元素，则返回 undefined。
   * @param {*} index 链表中元素的位置
   */
  getElementAt(index) {
    // 检查越界值(检查需要插入元素的位置是否有效，参考数组)
    if (index >= 0 && index <= this.length) {
      let current = this.head; // 对链表当前元素的引用，默认为链表第一个元素
      // 迭代整个链表直到找到目标index
      for (let i = 0; i < index && current; i++) {
        // 找到时，把current设置为index位置元素的引用
        current = current.next;
      }
      // 返回该元素
      return current;
    }
    // 不是有效的位置，返回undefined(即这个位置在链表中并不存在)
    return undefined;
  }
  /**
   * 向链表的特定位置插入一个新的项
   * @param {*} element 需要插入列表的项
   * @param {Number} index  需要插入列表的位置
   */
  insert(index, element) {
    // 检查越界值(检查需要插入元素的位置是否有效，参考数组)
    if (index >= 0 && index <= this.length) {
      const node = new Node(element);// 针对要插入的项，创建node项
      // 在链表的起始位置添加一个元素
      if (index === 0) { //在第一个位置添加
        const current = this.head; // 对链表想要插入新元素的位置之后一个元素的引用，默认为链表第一个元素
        //将node.next设置为列表的第一个元素：current
        node.next = current;
        // 将头部的引用指向插入项(node)
        this.head = node;
      } else {
        /**
         * 从链表中间或尾部添加一个元素
         * 第一步:将循环索引的下标不断递增，寻找到最后一项，current此时保存着对链表想要插入新元素的位置之后一个元素的引用，previous保存着对链表想要插入新元素的位置之前一个元素的引用
         */
        const previous = this.getElementAt(index - 1);// 对链表想要插入新元素的位置之前一个元素的引用
        const current = previous.next; // 对链表想要插入新元素的位置之后一个元素的引用
        // console.log(previous, current,position);
        /**
         * 第二步:
         * 要在previous和current之间添加新项，把新项node和当前项current链接起来，然后改变previous.next的指向为node
         * 如果是在最后一个位置添加一个新元素，previous是链表最后一项的引用，current则是null，此时将node.next指向current,previous.next指向node，就有了一个新的项
         * 如果在链表中间添加一个新元素，此时需要将node插入previous和current元素之间，把node.next指向current，把previous.next设为node，此时列表中就有了一个新的项。
         */
        node.next = current;
        previous.next = node;
      }
      // 递增链表的长度
      this.length++; // 更新链表的长度

      return true;

    } else {
      // 不是有效的位置，返回false(即没有从链表中插入新元素)
      return false;
    }
  }
  /**
   * 以字符串的方式输出链表的值
   * @returns {String}
   */
  toString() {
    // 如果head为空，则链表是一个空链表，直接返回一个空字符串
    if (!this.head) {
      return '';
    }
    let objString = `${this.head.element}`;
    let current = this.head.next; // 对链表当前元素的引用，默认为链表第二个元素
    for (let i = 1; i < this.size() && current; i++) {
      objString = `${objString},${current.element}`
      // console.log(objString);
      current = current.next;
    }
    // 把最终生成的链表元素通过字符串方式返回
    return objString;
  }
  /**
   * 以数组的方式输出链表的值
   * @returns {Array}
   */
  toArray() {
    let current = this.head;// 对链表当前元素的引用，默认为链表第一个元素
    let array = []; //接收元素值变量
    // 检查current是否存在
    while (current) {
      // 存在则添加到数组中
      array.push(current.element);
      // 把current引用改为下一个链表元素
      current = current.next;
    }
    // 把最终生成的链表元素通过数组方式返回
    return array;
  }
  /**
   * 返回元素在链表中的索引。如果链表中没有该元素则返回-1。
   * @param {*} element 需要在链表中查询的元素
   * @returns {Number}
   */
  indexOf(element) {
    let current = this.head;// 对链表当前元素的引用，默认为链表第一个元素
    // 迭代并在迭代时检查current是否存在
    for (let i = 0; i < this.length && current; i++) {
      // 检查输入的元素值与current.element的元素值是否相等，如果相等，则当前元素是我们要找到
      if (element === current.element) {
        //找到了，则返回他的位置
        return i;
      }
      // 把current引用改为下一个链表元素
      current = current.next;
    }
    //如果仍然还是找不到，则该元素在链表中不存在，则返回-1
    return -1;
  }
  /**
   * 丛链表中移除一项
   * @param {*} element 需要从链表中移除的项
   */
  remove(element) {
    // 通过indexOf方法找到元素的位置
    let index = this.indexOf(element);
    // 然后调用removeAt方法传入找到的位置进行删除
    return this.removeAt(index);
  }
  /**
   * 返回链表包含的元素个数。
   * @returns {Number}
   */
  size() {
    return this.length;
  }
    /**
   * 如果链表中不包含任何元素，则返回true，如果链表长度大于0，则返回false
   * @returns {Boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }
  /**
   * 返回链表包含的头节点(Head)
   */
  getHead() {
    return this.head;
  }
  /**
   * 清空链表
   */
  clear() {
    this.head = undefined; // 链表头节点设置为空
    this.length = 0; // 链表长度重置为0
  }
  
}
let list = new LinkedList();
list.push(15);
// list.push(10);
// list.push(17);
// console.log(list);
// list.insert(3, 5);
// list.removeAt(2);
// console.log(list);
list.toString();
// console.log(list.toString());