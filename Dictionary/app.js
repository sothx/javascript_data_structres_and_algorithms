/**
 * 在集合(Set)中，我们的关注点放在集合(Set)的每个值本身，集合(Set)以[值，值]的形式存储元素，而在字典中，是用[键，值]对的形式存储数据。字典也称作映射，符号表或者关联数组。
散列表(也叫HashTable类 或 HashMap类)，是字典的一种散列表实现方式。JavaScript的对象(Object)，本质上是键值对的集合(Hash结构)，但是传统上只能用字符串当作键，因此ES2015 带来了Map类和Map类的弱化版本WeakMap类。
集合、散列表与字典都是用来存储唯一值(不重复的值)的数据结构。
*/

/**
 * 字典的理想状态下是将字符串作为键名，值可以是任何类型（从数、字符串等原始类型，到复杂的对象）
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

// 基于 ES2015 的 Map 类的设计思想来实现 Dictionary 类
export class Dictionary {
  constructor(toStrFn = defaultToString) {
    this.toStrFn = toStrFn; // 也可以传入自定义的函数来指定如何将 key 转化为字符串
    this.table = {}; // 用一个Object的实例存储字典中的元素
  }

  /**
   * 向字典中添加新元素。如果 key 已经存在，那么已存在的 value 会被新的值覆盖
   * @param {string} key 需要添加新项的key
   * @param {*} value 需要添加新项的value
   * @return {boolean} 如果添加成功返回true，否则返回false
   */
  set(key, value) {
    if (key != null && value != null) { // 如果 key 和 value 都不是 undefined 或 null
      const tableKey = this.toStrFn(key); // 获取表示 key 的字符串
      this.table[tableKey] = new ValuePair(key, value); // 创建一个新的键值对并将其赋值给 table 对象上的 key属性（tableKey）
      return true; // 添加/覆盖成功返回true
    }
    // 否则返回false
    return false;
  }
  /**
   *通过以键值作为参数查找特定的数值并返回
   * @param {*} key 需要获取的key值
   * @returns {*} 返回获取到的valuePair或者undefined
   */
  get(key) {
    const valuePair = this.table[this.toStrFn(key)]; // 获取指定key值的valuePair
    return valuePair === null ? undefined : valuePair.value; // 如果 valuePair 对象存在，将返回该值，否则将返回一个 undefined 值
  }
  /**
   *
   *如果某个键值存在于该字典中，返回 true，否则返回 false
   * @param {*} key
   * @returns {boolean}
   */
  hasKey(key) {
    return this.table[this.toStrFn(key)] != null;
  }
  /**
   *
   *通过使用键值作为参数来从字典中移除键值对应的数据值
   * @param {*} key 要删除的key值
   * @returns {boolean} 是否删除成功
   */
  remove(key) {
    if (this.hasKey(key)) { // 如果key存在
      delete this.table[this.toStrFn(key)]; // 在table对象删除指定的key
      return true; // 成功返回true
    }
    // key不存在，返回false
    return false;
  }
  /**
   *
   *将字典所包含的所有数值以数组形式返回
   * @returns {array}
   */
  values() {
    return this.keyValues().map(valuePair => valuePair.value);
  }
  /**
   *
   * 将字典所包含的所有键名以数组形式返回
   * @returns {array}
   */
  keys() {
    return this.keyValues().map(valuePair => valuePair.key);
  }
  /**
   *
   *将字典中所有[键，值]对返回
   * @returns {array}
   */
  keyValues() {
    return Object.values(this.table);
  }
  /**
   *迭代字典中所有的键值对。callbackFn 有两个参数：key和value。
   *该方法可以在回调函数返回 false 时被中止（和 Array 类中的 every 方法相似）。
   * @param {*} callbackFn
   */
  forEach(callbackFn) {
    const valuePairs = this.keyValues(); // 获取字典的所有键值对
    for (let i = 0; i < valuePairs.length; i++) { // 遍历字典
      const result = callbackFn(valuePairs[i].key, valuePairs[i].value); //执行以参数形式传入 forEach 方法的 callbackFn 函数
      if (result === false) { // 如果回调函数返回了 false
        break; // 会中断 forEach 方法的执行,打断正在迭代 valuePairs 的 for 循环
      }
    }
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
    const valuePairs = this.keyValues(); // 获取字典的所有键值对
    let objString = `${valuePairs[0].toString()}`; // 用字典中第一个元素作为字符串的初始值
    for (let i = 1; i < valuePairs.length; i++) { // 遍历字典的所有键值对
      // 添加一个逗号（,）以及下一个元素
      objString = `${objString},${valuePairs[i].toString()}`;
    }
    // 以字符串的方式输出字典的值
    return objString;
  }
}

const dictionary = new Dictionary();
dictionary.set('Gandalf', 'gandalf@email.com');
dictionary.set('John', 'johnsnow@email.com');
dictionary.set('Tyrion', 'tyrion@email.com');

console.log(dictionary.hasKey('Gandalf')); // 返回true

console.log(dictionary.size()); // 返回3

console.log(dictionary.keys()); // ["Gandalf", "John", "Tyrion"] 
console.log(dictionary.values()); // ["gandalf@email.com", "johnsnow@email.com", "tyrion@email.com"] 
console.log(dictionary.get('Tyrion')); // tyrion@email.com 

dictionary.remove('John');

console.log(dictionary.keys()); // ["Gandalf", "Tyrion"] 
console.log(dictionary.values()); // ["gandalf@email.com", "tyrion@email.com"] 
console.log(dictionary.keyValues()); // [{key: "Gandalf", value: "gandalf@email.com"}, {key: "Tyrion", value:"tyrion@email.com"}]

dictionary.forEach((k, v) => {
  console.log('forEach: ', `key: ${k}, value: ${v}`);
});
 
// forEach: key: Gandalf, value: gandalf@email.com
// forEach: key: Tyrion, value: tyrion@email.com