import { LinkedList, Node } from '/LinkedList/app.js';
// DoublyNode 辅助类 继承自 Node 辅助类
export class DoublyNode extends Node {
  constructor(element, next, prev) {
    super(element, next);
    this.prev = prev; // 当前节点的前一个节点(新增)
  }
}

/**
 * 双向链表 继承自 LinkedList 类
 * 双向链表和普通链表的区别在于，在链表中，一个节点只有链向下一个节点的链接；而在双向链表中，链接是双向的：一个链向下一个元素，另一个链向前一个元素。
 * 在单向链表中，如果迭代时错过了要找的元素，就需要回到起点，重新开始迭代,而双向链表，可以从头到尾，或者从尾到头。我们也可以访问一个特定节点的下一个或前一个元素。
 */
export class DoublyLinkedList extends LinkedList {
  constructor() {
    this.tail = undefined; // 对链表最后一个元素的引用(新增)
  }
  /**
   * 向链表尾部添加一个新的项
   * @param {*} element 需要添加的项
   */
   push(element) {
    const node = new DoublyNode(element); //把需要添加的项(element)作为值传入，创建DoublyNode项
    let current;
    // 如果head为null,则添加的是链表的第一个节点(为空的列表添加一个元素)
    if (this.head === null) {
      this.head = node; //把要添加的项指向head
      this.tail = node; //把链表尾项指向node
    } else {
      // 如果head不为null，则列表不为空(向一个不为空的列表尾部添加元素)，只需要附加到尾节点

      //把链表尾节点的后一项引用设为node
      this.tail.next = node;

      // node的前一项的引用改为链表尾节点(this.tail)
      node.prev = this.tail;;

      // 最后将node赋值给链表尾节点，完成插入
      this.tail = node;
    }

    // 递增链表的长度

    this.length++; // 更新链表的长度
  }
  /**
   * 向链表的特定位置插入一个新的项(重写insert方法)
   * @param {*} element 需要插入列表的项
   * @param {Number} index  需要插入列表的位置
   **/
   insert(index, element) {
    // 检查越界值(检查需要插入元素的位置是否有效，参考数组)
    if (index >= 0 && index <= this.length) {
      const node = new DoublyNode(element);// 针对要插入的项，创建DoublyNode项
      let current = this.head; //存储双向链表第一个元素的引用
      // 在链表的起始位置插入一个元素
      if (index === 0) { //在第一个位置添加
        /**
         * 如果双向链表为空,则只需要把head(链表的第一个节点)和tail(链表的最后一个节点)都指向node
         */
        if (this.head === null) {
          this.head = node; //链表第一个节点的引用指向node
          this.tail = node; // 链表最后一个节点的引用指向弄得
        } else {
          /**
           * 如果双向链表不为空,node.next(node下一个节点的指针)设置为当前链表第一个元素的引用-current(即this.head)
           * 再将当前链表首节点的引用(current)的前一个节点的指针指向node
           * 最后将当前的头节点(this.head)设置为node(由于插入的index位置为0，node的prev指针本身便是undefined，所以不需要对它进行操作)
           */
          node.next = this.head; // node的下一个节点的指针指向当前链表的首节点
          current.prev = node; // 将当前链表第一个元素的引用的前一个节点指向node
          this.head = node; // 最后将当前的头节点(this.head)设置为node
        }
      } else if (index === this.length) { // 在链表最后一项插入一个元素(新增)
        /**
         * 在链表的尾节点添加一个元素
         * 1.current保存链表尾节点的引用
         * 2.current的下一个元素指针指向node
         * 3.node的前一个节点的引用设置为current(链表尾节点的引用)
         * 4.更新tail，将链表尾节点的引用设为node
         */
        current = this.tail; // current保存链表尾节点的引用
        current.next = node; // current的下一个元素指针指向node
        node.prev = current; // node的前一个节点的引用设置为current(链表尾节点的引用)
        this.tail = node; // 更新tail，将链表尾节点的引用设为node
      } else {
        /**
         * 从链表中间(除首节点和尾节点)插入一个元素
         * 第一步:将循环索引的下标不断递增，寻找到最后一项，current此时保存着对链表想要插入新元素的位置之后一个元素的引用，previous保存着对链表想要插入新元素的位置之前一个元素的引用
         */
        const previous = this.getElementAt(index - 1);// 对链表想要插入新元素的位置之前一个元素的引用
        const current = previous.next; // 对链表想要插入新元素的位置之后一个元素的引用
        // console.log(previous, current,position);
        /**
         * 第二步:
         * 要在previous和current之间添加新项，把node的下一个节点的引用(next)改为current(current存着对链表想要插入新元素的位置之后一个元素的引用)
         * previous(对链表想要插入新元素的位置之前一个元素的引用)的next(previous的后一个节点的引用)设为node
         * current(current存着对链表想要插入新元素的位置之后一个元素的引用)的prev(current的前一个节点的引用)设为node
         * node前一个节点的引用(prev)设置为previous(对链表想要插入新元素的位置之前一个元素的引用)
         */
        node.next = current; 
        previous.next = node;
        current.prev = node;
        node.prev = previous;
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
       * 实现方法:1.将head指向链表的第二个元素
       */
      if (index === 0) {
        this.head = current.next;
        // 2.如果只有一项，此时current.next返回的值为undefined，还需要更新tail为undefined(新增)
        if (this.length === 1) {
          this.tail = undefined; // 将链表尾节点置空。
        } else {
          // 2.如果不止一项，则将头节点的前一个节点的引用置空(新增)
          this.head.prev = undefined;
        }
      } else if (index === this.length - 1) {
        /**
         * 从链表移除最后一项(新增)
         * 实现方法:
         * 1.将链表尾节点赋值给current
         * 2.把tail的引用更新为双向链表中倒数第二个元素
         * 3.把 tail的next 指针更新为undefined(尾节点的下一个节点清空)
         */
        current = this.tail; //将链表尾节点赋值给current
        this.tail = current.prev; // 把尾节点的引用改为尾节点的前一个节点
        this.tail.next = undefined; // 把尾节点的下一个节点引用清空
      } else {
      /**
       * 从链表中移除某一项(除首节点和尾节点)
       * 第一步:将循环索引的下标不断递增，寻找到最后一项，current此时保存着要移除的元素，previous保存着当前元素前一个元素的引用
       */
        current = this.getElementAt(index);// 链表中要移除的元素
        const previous = current.prev; // 链表中要移除元素前一个元素的引用
        // console.log(previous, current,index);
        /**
         * 移除中间元素的引用，此时current.next的指向值是下一个链表元素的引用，把previous.next设置为current.next，则等于移除了当前元素，再将current.next的前一个元素的引用(prev)指向为previous
         */
        // 将previous与current的下一项链接起来：跳过current，从而移除它
        previous.next = current.next;
        // 修改current.next的前一个元素指向为previous
        current.next.prev = previous;
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
   * 返回链表包含的Head
   */
   getTail() {
    super.clear(); // 执行父类的clear方法
    this.tail = undefined; // 链表尾节点设置为undefined
  }
  /**
   * 以字符串的方式输出反向链表的值
   * @returns {String}
   */
   inverseToString() {
    // 如果head为空，则链表是一个空链表，直接返回一个空字符串
    if (!this.tail) {
      return '';
    }
    let objString = `${this.tail.element}`; // 链表尾元素的element
    let previous = this.tail.prev; // 对链表尾元素前一个元素的引用
     while (previous !== null) {
        objString = `${objString},${previous.element}`;
        previous = previous.prev;
     }
    // 把最终生成的链表元素通过字符串方式返回
    return objString;
  }

}

/**性能优化相关:
 * 1.在结果为否的情况下，可以把元素插入双向链表的尾部。
 * 2.如果position 大于 length/2，就最好从尾部开始迭代，而不是从头开始（这样就能迭代双向链表中更少的元素）。
 */

let list = new DoublyLinkedList();
list.push(13);
console.log(list);