import {
  LinkedList
} from '/LinkedList/app.js';
/**
 * 在集合(Set)中，我们的关注点放在集合(Set)的每个值本身，集合(Set)以[值，值]的形式存储元素，而在字典中，是用[键，值]对的形式存储数据。字典也称作映射，符号表或者关联数组。
散列表(也叫HashTable类 或 HashMap类)，是字典的一种散列表实现方式。JavaScript的对象(Object)，本质上是键值对的集合(Hash结构)，但是传统上只能用字符串当作键，因此ES2015 带来了Map类和Map类的弱化版本WeakMap类。
集合、散列表与字典都是用来存储唯一值(不重复的值)的数据结构。
*/

/**
 * 散列表(Dictionary 类的一种散列表实现方式)的理想状态下是将字符串作为键名，值可以是任何类型（从数、字符串等原始类型，到复杂的对象）
 * 此方法把传入的键名转换为字符串
 * @param {*} item 传入的键名
 * @returns {string}
 */
export function defaultToString(item) {
  if (item === null) { // 如果key是null
    return 'NULL'; // 以NULL字符串返回
  }
  if (item === undefined) { // 如果key是undefined
    return 'UNDEFINED'; // 以UNDEFINED字符串返回
  }
  if (typeof item === 'string' || item instanceof String) { // 如果是一个字符串，那么直接返回它
    return `${item}`;
  }
  return item.toString(); // 否则将其转换为字符串返回
}
/**
 * ValuePair 类
 * 为了保存信息的需要，我们同样要保存原始的 key 和 value
 * @class ValuePair
 */
export class ValuePair {
  constructor(key, value) {
    this.key = key;
    this.value = value;
  }
  /**
   *
   * 将key和value通过字符串的方式返回出来
   * @returns {string}
   * @memberof ValuePair
   */
  toString() {
    return `[#${this.key}: ${this.value}]`;
  }
}

// 基于 ES2015 的 Map 类来实现 Dictionary 类
export class HashTableSeparateChaining {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn; // 也可以传入自定义的函数来指定如何将 key 转化为字符串
    this.table = {}; // 用一个Object的实例存储字典中的元素
  }
  /**
   * 散列函数
   * 将传入的key转换为hash值并返回，如果传入的key已经是hash值，则直接返回
   * @returns {number} 返回hash值
   */
  loseloseHashCode = (key) => {
    if (typeof key === 'number') { // 先检验 key 是否是一个数字
      return key; // 是，我们直接将其返回
    }
    // key不是一个数字
    const tableKey = this.toStrFn(key); // 将 key 转化为字符串
    let hash = 0; //  配置一个 hash 变量来存储hash总和
    for (let i = 0; i < tableKey.length; i++) { // 遍历 key
      hash += tableKey.charCodeAt(i); // 从 ASCII表中查到的每个字符对应的 ASCII 值加到 hash 变量中
    }
    return hash % 37; // 为了得到比较小的数值，我们会使用 hash 值和一个任意数做除法的余数（%）(可以避免操作数超过数值变量最大表示范围的风险)
  }
  /**
   * 转换hash码
   * 将传入的key经过loseloseHashCode方法转换为hash码返回
   * @returns {number} 返回hash值
   */
  hashCode(key) {
    return this.loseloseHashCode(key);
  }

  /**
   * 向散列表增加一个新的项
   * put 方法和 Dictionary 类中的 set 方法逻辑相似。我们也可以将其命名为 set，但是大多数的编程语言会在 HashTable 数据结构中使用 put 方法，因此我们遵循相同的命名方式。
   * @param {string} key 需要添加新项的key
   * @param {*} value 需要添加新项的value
   * @return {boolean} 如果添加成功返回true，否则返回false
   */
  put(key, value) {
    if (key != null && value != null) { // 检验 key 和 value 是否合法
      const position = this.hashCode(key); // 获取key值对应的hash码
      if (this.table[position] === null) { // 验证要加入新元素的位置是否已经被占据
        this.table[position] = new LinkedList(); //如果是第一次向该位置加入元素，我们会在该位置上初始化一个链表的实例
      }
      this.table[position].push(new ValuePair(key, value)); //向链表添加一个ValuePair 实例（键和值）
      return true; // 成功返回true
    }
    // 如果不合法就返回 false
    return false;
  }
  /**
   *返回根据键值检索到的特定的值
   * @param {*} key 需要获取的key值
   * @returns {*} 返回获取到的valuePair或者undefined
   */
  get(key) {
    const position = this.hashCode(key); // 获取key值对应的hash码
    const linkedList = this.table[position]; // 获取key值position对应的链表实例
    // 如果对应的链表实例存在，而且不是空的链表
    if (linkedList !== null && !linkedList.isEmpty()) {
      let current = linkedList.getHead(); // 获取链表表头的引用
      while (current != null) { // 从链表的头部迭代到尾部，直到最末尾，current.next将会是 null，结束迭代
        if (current.element.key === key) { //element 属性保存着 ValuePair 的实例，如果此时的key值跟传入的key值相同
          return current.element.value; // 则找到需要检索的值，返回value的值
        }
        // 如果不相同，就继续迭代链表，访问下一个节点
        current = current.next;
      }
    }
    // 如果没有，则返回一个 undefined 表示在 HashTable 实例中没有找到这个值
    return undefined;
    /**
      * 另一个实现算法的思路如下：除了在 get 方法内部搜索 key，还可以在 put 方法中实例化LinkedList，向 LinkedList 的构造函数传入自定义的 equalsFn，只用它来比较元素的 key属性（即 ValuePair 实例）。我们要记住，默认情况下，LinkedList 会使用===运算符来比较它的元素实例，也就是说会比较 ValuePair 实例的引用。这种情况下，在 get 方法中，我们要使用 indexOf 方法来搜索目标 key，如果返回大于或等于零的位置，则说明元素存在于链表中。有了该位置，我们就可以使用 getElementAt 方法来从链表中获取 ValuePair 实例。
      */
  }
  /**
   *
   *根据键值从散列表中移除值
   * @param {*} key 要删除的key值
   * @returns {boolean} 是否删除成功
   */
  remove(key) {
    const position = this.hashCode(key); // 获取key值对应的hash码
    const linkedList = this.table[position]; // 获取key值position对应的链表实例
    // 如果对应的链表实例存在，而且不是空的链表
    if (linkedList != null && !linkedList.isEmpty()) {
      let current = linkedList.getHead(); // 获取链表表头的引用
      while (current != null) { // 从链表的头部迭代到尾部，直到最末尾，current.next将会是 null，结束迭代
        if (current.element.key === key) { //element 属性保存着 ValuePair 的实例，如果此时的key值跟传入的key值相同
          linkedList.remove(current.element); // 则使用 remove 方法将其从链表中移除
          if (linkedList.isEmpty()) { // 如果链表为空了(链表中不再有任何元素了)
            delete this.table[position]; // 使用 delete 运算符将散列表的该位置删除,这样搜索一个元素的时候，就可以跳过这个位置了
          }
          return true; // 返回 true 表示该元素已经被移除
        }
        current = current.next; // 如果不是我们要找的元素，那么和 get 方法中一样继续迭代下一个元素
      }
    }
    return false; // 返回 false表示该元素在散列表中不存在
  }
  /**
   * 获取整个散列表
   * @returns
   */
  getTable() {
    return this.table;
  }
  /**
   *在 size 等于零的时候返回 true，否则返回 false
   * @returns
   */
  isEmpty() {
    return this.size() === 0;
  }
  /**
   *
   *返回字典所包含值的数量。与数组的 length 属性类似
   * @returns {Number}
   */
  size() {
    return Object.keys(this.table).length;
  }
  /**
   * 删除该字典中的所有值
   */
  clear() {
    this.table = {};
  }
  /**
   * 以字符串的方式输出字典的值
   * @returns {string}
   */
  toString() {
    if (this.isEmpty()) { // 检验字典是否为空
      return ''; // 如果为空，就返回 空字符串
    }
    // 如果字典不为空
    const keys = Object.keys(this.table); // 获取散列表的所有key
    let objString = `{${keys[0]} => ${this.table[keys[0]].toString()}}`; // 用散列表中第一个元素作为字符串的初始值
    for (let i = 1; i < keys.length; i++) { // 遍历字典的所有键值对
      // 给字符串添加下一个元素
      objString = `${objString},{${keys[i]} => ${this.table[keys[i]].toString()}}`;
    }
    // 以字符串的方式输出字典的值
    return objString;
  }
}
