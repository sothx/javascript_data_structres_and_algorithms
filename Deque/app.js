/**
 * 双端队列（deque，或称 double-ended queue）是一种允许我们同时从前端和后端添加和移除元素的特殊队列。
 * 生活中常见的双端队列:
* 双端队列在现实生活中的例子有电影院、餐厅中排队的队伍等。举个例子，一个刚买了票的人如果只是还需要再问一些简单的信息，就可以直接回到队伍的头部。另外，在队伍末尾的人如果赶时间，他可以直接离开队伍。
* 在计算机科学中，双端队列的一个常见应用是存储一系列的撤销操作。每当用户在软件中进行了一个操作，该操作会被存在一个双端队列中（就像在一个栈里）。当用户点击撤销按钮时，该操作会被从双端队列中弹出，表示它被从后面移除了。在进行了预先定义的一定数量的操作后，
* 最先进行的操作会被从双端队列的前端移除。由于双端队列同时遵守了先进先出和后进先出原则，可以说它是把队列和栈相结合的一种数据结构。
 */

 export class Deque {
   constructor() {
    this.count = 0; // 由于使用了对象，使用count属性控制双端队列的大小。
    this.lowestCount = 0; // 由于需要从双端队列前端移除元素，因此需要lowestCount来帮助追踪第一个元素
    this.items = {}; // 可以使用数组，也可以使用对象等数据结构，对象实现双端大多数情况下的算法复杂度优于数组
  }

  /**
   * 在双端队列前端添加新的元素
   * @param {*} element 需要添加的项
   */
   addFront(element) {
    if (this.isEmpty()) { // 如果双端队列是空的
      this.addBack(element); // 添加到双端队列的后端
    } else if (this.lowestCount > 0) { // 如果一个元素已经被从双端队列的前端移除
      this.lowestCount--; // lowestCount 属性会大于等于 1,因此递减lowestCount
      this.items[this.lowestCount] = element; // 并将新元素的值放在这个键的位置上即可
    } else {
      // 我们可以设置一个负值的键，同时更新用于计算双端队列长度的逻辑，使其也能包含负键值。这种情况下，添加一个新元素的操作仍然能保持最低的计算成本。
      // 这里仍然把它作为数组来操作
      // 要在第一位添加一个新元素，我们需要将所有元素后移一位来空出第一个位置
      for (let i = this.count; i > 0; i--) {
        this.items[i] = this.items[i - 1];
      }
      this.count++; // 递增双端队列的大小
      this.items[0] = element; // 在所有的元素都完成移动后，第一位将是空闲状态，设置双端队列的第一个元素为新添加的元素
    }
   }
  /**
  * 在双端队列后端添加新的元素（实现方法和 Queue 类中的enqueue方法相同）
  * @param {*} element 需要添加的项
  */
  addBack(element) {
    this.items[this.count] = element;
    this.count++;
  }
  /**
  * 从双端队列前端移除第一个元素（实现方法和 Queue 类中的dequeue方法相同）
  * @returns {*} 被移除的元素
  */
  removeFront() {
    if (this.isEmpty()) { // 检验双端队列是否为空
      return undefined; // 如果为空，就返回 undefined
    }
    // 如果双端队列不为空
    const result = this.items[this.lowestCount]; // 暂存双端队列头部的值,用于返回
    delete this.items[this.lowestCount]; // 删除双端队列头部的元素
    this.lowestCount++; // 由于双端队列头部元素被移除后已不存在，记录双端队列头部元素指针的属性递增
    return result; // 返回被移除的元素
  }
  /**
  * 从双端队列后端移除第一个元素（实现方法和 Stack 类中的pop方法一样）
  * @returns {*} 被移除的元素
  */
  removeBack() {
    if (this.isEmpty()) { // 检验双端队列是否为空
      return undefined; // 如果为空，就返回 undefined
    }
    // 如果双端队列不为空
    this.count--; // 双端队列的元素个数减1
    const result = this.items[this.count]; // 保存双端队列尾部的值(用于返回)
    delete this.items[this.count]; // 删除双端队列尾部的元素
    return result; // 返回被移除的元素
  }
  /**
  * 返回双端队列前端的第一个元素（实现方法和Queue类中的 peek方法一样）
  * @returns {*} 双端队列前端的第一个元素
  */
  peekFront() {
    if (this.isEmpty()) { // 检验双端队列是否为空
      return undefined; // 如果为空，就返回 undefined
    }
    // 如果双端队列不为空
    return this.items[this.lowestCount]; // 返回双端队列中前端的第一个元素
   }
  /**
  * 返回双端队列后端的第一个元素（实现方法和 Stack 类中的 peek方法一样）
  * @returns {*} 双端队列后端的第一个元素
  */
  peekBack() {
    if (this.isEmpty()) { // 检验双端队列是否为空
      return undefined; // 如果为空，就返回 undefined
    }
    // 如果双端队列不为空
    return this.items[this.count - 1]; // 返回双端队列中后端的第一个元素
   }
   /**
   * 如果双端队列中不包含任何元素，返回 true，否则返回 false。
   * @returns {Boolean}
   */
  isEmpty() {
    return this.size() === 0;
  }
  /**
  * 清空双端队列
  */
  clear() {
    this.items = {};
    this.count = 0;
    this.lowestCount = 0;
  }
  /**
  * 返回双端队列包含的元素个数，与数组的 length 属性类似。
  * @returns {Number} 双端队列里的元素个数
  */
  size() {
    return this.count - this.lowestCount;
  }
   /**
   * 以字符串的方式输出双端队列的值
   * @returns {Array}
   */
  toString() {
    if (this.isEmpty()) { // 检验双端队列是否为空
      return ''; // 如果为空，就返回 空字符串
    }
    // 如果双端队列不为空
    let objString = `${this.items[this.lowestCount]}`; // 用双端队列中第一个元素作为字符串的初始值
    //由于 Deque 类中的第一个索引值不一定是 0，我们需要从索引值为 lowestCount 的位置开始迭代队列
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      // 添加一个逗号（,）以及下一个元素
      objString = `${objString},${this.items[i]}`;
    }
    // 以字符串的方式输出双端队列的值
    return objString;
  }
}
