import { LinkedList } from '/LinkedList/app.js';
/**
 * 有序链表 继承自 LinkedList 类
 * 有序链表是指保持元素有序的链表结构。除了使用排序算法之外，我们还可以将元素插入到正确的位置来保证链表的有序性。
 * 这里假设是一个从头节点到尾节点有序递减的有序链表
 */
 // 比较用的常量对象(保证代码优雅)
 export const Compare = {
  LESS_THAN: -1, // 如果第一个元素小于第二个元素，它就返回-1
  BIGGER_THAN: 1,  // 如果第一个元素大于第二个元素，它就返回1
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

export class SortedLinkedList extends LinkedList {
  constructor() {
    this.compareFn = compareFn;
  }
  /**
   * 向有序链表尾部添加一个新的项
   * @param {*} element 需要添加的项
   */
  push(element) {
    // 如果如果有序链表为空
    if (this.isEmpty()) {
      // 直接调用父类的push方法上传新的项
      super.push(element);
    } else {
      // 如果有序链表不为空
      const index = this.getIndexNextSortedElement(element); //获取插入元素的正确位置
      super.insert(element, index); // 调用 LinkedList的 insert 方法，传入该位置来保证链表有序
    }
  }

  insert(element, index = 0) {
    if (this.isEmpty()) {
      return super.insert(element, index === 0 ? index : 0);
    }
    const pos = this.getIndexNextSortedElement(element);
    return super.insert(element, pos);
  }
  /**
   * 获得插入元素的正确位置
   * @param {*} element 需要查询插入元素位置的项
   */
  getIndexNextSortedElement(element) {
    let current = this.head;  // 用current保存链表头的引用
    // 循环整个有序链表
    let i = 0;
    for (; i < this.size() && current; i++) {
      /**
       * 比较传入的元素
       * @param {*} element 需要查询插入元素位置的项
       * @param {*} current.element 当前循环项的元素内容
       */
      const comp = this.compareFn(element, current.element);
      // 当要插入有序链表的元素小于 current 的元素时，就找到了插入元素的位置
      if (comp === Compare.LESS_THAN) {
        // 返回找到的下标
        return i;
      }
      // 否组继续循环迭代
      current = current.next;
    }
    // 如果还是没有，则返回0
    return i;
  }

}

let list = new SortedLinkedList();
list.push(13);
console.log(list);