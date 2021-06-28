import { LinkedList, Node } from '/LinkedList/app.js';
/**
 * 循环链表 可继承自 LinkedList 类 或 DoublyLinkedList 类
 * 循环链表可以像链表一样只有单向引用，也可以像双向链表一样有双向引用。循环链表和链
 *表之间唯一的区别在于，最后一个元素指向下一个元素的指针（tail.next）不是引用
 *undefined，而是指向第一个元素（head）。
 */
export class CircularLinkedList extends LinkedList {
  constructor() {
  }
  /**
   * 向链表尾部添加一个新的项
   * @param {*} element 需要添加的项
   */
  push(element) {
    const node = new Node(element); //把需要添加的项(element)作为值传入，创建Node项
    let current;
    // 如果head为null,则添加的是链表的第一个节点(为空的列表添加一个元素)
    if (this.head == null) {
      this.head = node; //把要添加的项指向head
    } else {
      // 如果head不为null，则列表不为空(向一个不为空的列表尾部添加元素)
       /**
       * 第一步:找到链表最后一个元素
       */
      current = this.getElementAt(this.size() - 1);
      //把链表的第一个元素指向current的下一个项的指针
      current.next = node;
    }
    // 设置node的下一个项为链表头，完成循环链表的循环(新增)
    node.next = this.head;
    this.length++; // 更新链表的长度
  }
  /**
   * 向链表的特定位置插入一个新的项
   * @param {*} element 需要插入列表的项
   * @param {Number} index  需要插入列表的位置
   */
  insert(element, index) {
    // 检查越界值(检查需要插入元素的位置是否有效，参考数组)
    if (index >= 0 && index <= this.length) {
      const node = new Node(element); // 针对要插入的项，创建node项
      let current = this.head;  //对链表当前元素的引用，默认为链表第一个元素
      // 在链表的起始位置添加一个元素
      if (index === 0) { //在第一个位置添加
        if (this.head === null) {
          // 如果没有任何链表项在这个链表
          this.head = node; // 链表头设置为node
          node.next = this.head; // node的下一个元素的指针指向链表头(新增)
        } else {
          // 如果链表不是空的
          node.next = current; // 将node.next 指向现在的 head 引用的节点（current 变量）
          current = this.getElementAt(this.size()); // 取得最后一个链表项的引用
          this.head = node; // 更新头部元素为新插入的元素node
          current.next = this.head; // 将最后一个节点（current）的next指向新的头部节点，完成循环链表的循环(新增)
        }
      } else {
        /**
         * 从链表中间或尾部添加一个元素
         * 第一步:将循环索引的下标不断递增，寻找到最后一项，current此时保存着对链表想要插入新元素的位置之后一个元素的引用，previous保存着对链表想要插入新元素的位置之前一个元素的引用
         */
        const previous = this.getElementAt(index - 1);// 对链表想要插入新元素的位置之前一个元素的引用
        /**
         * 第二步:
         * 要在previous和current之间添加新项，把新项node和当前项current链接起来，然后改变previous.next的指向为node
         * 如果是在最后一个位置添加一个新元素，previous是链表最后一项的引用，current则是null，此时将node.next指向current,previous.next指向node，就有了一个新的项
         * 如果在链表中间添加一个新元素，此时需要将node插入previous和current元素之间，把node.next指向current，把previous.next设为node，此时列表中就有了一个新的项。
         */
        node.next = previous.next; 
        previous.next = node;
      }
      this.length++;  // 更新链表的长度
      return true;
    }
    return false;
  }
  /**
   * 从链表的特定位置移除一项
   * @param {Number} index 需要移除链表项的位置
   */
  removeAt(index) {
    // 检查越界值(检查输入的移除元素位置是否有效，参考数组)
    if (index >= 0 && index < this.length) {
      let current = this.head; // 对链表当前元素的引用，默认为链表第一个元素
      /**
       * 从链表中移除第一个元素
       */
      if (index === 0) { //如果移除的链表元素是第一个
        // 如果链表长度为1
        if (this.size() === 1) {
          this.head = undefined; // 直接清空链表头(和 LinkedList 类中的实现一样)
        } else {
          // 从链表中移除某一项或者最后一项(新增)
          const removed = this.head; // 首先保存现在的 head 元素的引用
          current = this.getElementAt(this.size() - 1); // 要获得循环链表最后一个元素的引用
          this.head = this.head.next; // 更新 head element，将其指向第二个元素（head.next)
          current.next = this.head; // 将最后一个 element（current.next）指向新的 head
          current = removed; // 更新current变量的引用为removed(用于return currentl.element)
        }
      } else {
        /**
        * 从链表中移除某一项或者最后一项
       */
        // no need to update last element for circular list
        const previous = this.getElementAt(index - 1); // 对链表当前元素的前一个元素的引用
        /**
         * 如果是移除最后一项，此时current.next的指向值是null，把previous.next设置为null，则等于将最后一项移除
         * 如果是中间元素的引用，此时current.next的指向值是下一个链表元素的引用，把previous.next设置为current.next，则等于移除了当前元素
         */
        // 将previous与current的下一项链接起来：跳过current，从而移除它
        current = previous.next;
        previous.next = current.next;
      }
      // 减少链表的长度
      this.length--; // 更新链表的长度
      return current.element;  // 移除成功，返回被移除的元素
    }
    // 不是有效的位置，返回undefined(即没有从链表中移除元素)
    return undefined;
  }

}

let list = new CircularLinkedList();
list.push(13);
console.log(list);