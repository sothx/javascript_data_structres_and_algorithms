import {
  LinkedList
} from '/LinkedList/app.js';
/**
 * 集合是由一组无序且唯一（即不能重复）的项组成的。该数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。
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
export class HashTableLinearProbing {
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
   * 散列函数 djb2HashCode
   */
  djb2HashCode(key) {
    const tableKey = this.toStrFn(key); // 将键转化为字符串
    let hash = 5381; // 初始的hash变量，数值为质数(大多数实现都使用 5381)
    for (let i = 0; i < tableKey.length; i++) { // 然后迭代参数 key
    hash = (hash * 33) + tableKey.charCodeAt(i); // 将 hash 与 33 相乘（用作一个幻数-[幻数在编程中指直接使用的常数]),并和当前迭代到的字符的 ASCII 码值相加
    }
    return hash % 1013; // 最后，将使用相加的和与另一个随机质数相除的余数进行返回
    // 这并不是最好的散列函数，但这是最受社区推崇的散列函数之一。
    // 也有一些为数字键值准备的散列函数，可以在 http://t.cn/Eqg1yb0 找到一系列的实现。
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
        this.table[position] = new ValuePair(key, value); //如果没有元素存在，那么直接在这个位置添加新元素
      } else {
        // 如果该位置已经被占据了，需要找到下一个没有被占据的位置（position 的值是 undefined或 null）
        let index = position + 1; // 当前位置的下一个位置
        while (this.table[index] !== null) { // 验证该位置是否被占据
          index++; // 如果被占据了，继续将 index 递增,直到找到一个没有被占据的位置
        }
        // 找到没有被占据的位置后，将值分配到该位置
        this.table[index] = new ValuePair(key, value);
      }
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
    if (this.table[position] != null) { // 如果这个键存在
      if (this.table[position].key === key) { // 当前位置的key和传入的key相等
        return this.table[position].value; // 则直接返回这个位置的散列表项
      }
      let index = position + 1; //如果不是，就在散列表的下一个位置继续查找
      while (this.table[index] != null && this.table[index].key !== key) { // 会按位置递增的顺序查找散列表上的元素直到找到我们要找的元素或者一个空位置
        index++; // 不符合继续递增
      }
      // 当从 while 循环跳出的时候，验证元素的键是否是我们要找的键
      if (this.table[index] != null && this.table[index].key === key) {
        return this.table[position].value; // 如果是，就返回它的值
      }
    }
    // 如果这个键不存在，说明要查找的值不在散列表中，因此可以返回 undefined
    return undefined;
  }
  /**
   *
   *根据键值从散列表中移除值
   * @param {*} key 要删除的key值
   * @returns {boolean} 是否删除成功
   */
  remove(key) {
    const position = this.hashCode(key); // 获取key值对应的hash码
    if (this.table[position] != null) { // 如果这个键存在
      if (this.table[position].key === key) { // 当前位置的key和传入的key相等
        delete this.table[position]; // 则直接删除这个位置的散列表项
        this.verifyRemoveSideEffect(key, position);
        return true; // 返回删除成功
      }
      let index = position + 1; //如果不是，就在散列表的下一个位置继续查找
      while (this.table[index] != null && this.table[index].key !== key) { // 会按位置递增的顺序查找散列表上的元素直到找到我们要找的元素或者一个空位置
        index++; // 不符合继续递增
      }
      // 当从 while 循环跳出的时候，验证元素的键是否是我们要找的键
      if (this.table[index] != null && this.table[index].key === key) {
        delete this.table[index]; // 如果是，就删除它的值
        this.verifyRemoveSideEffect(key, index);
        return true; // 返回删除成功
      }
    }
    return false; // 返回删除失败
  }
  /**
   *
   *
   * @param {*} key 被删除的 key
   * @param {*} removedPosition 该 key 被删除的位置
   */
  verifyRemoveSideEffect(key, removedPosition) {
    const hash = this.hashCode(key); //获取被删除的 key 的 hash 值
    let index = removedPosition + 1; //从下一个位置开始迭代散列表
    while (this.table[index] != null) { //直到找到一个空位置,结束循环(此时所有符合条件的元素都已经被处理到合适的位置上，不需要进行移动)
      const posHash = this.hashCode(this.table[index].key); // 计算当前位置上元素的 hash 值
      if (posHash <= hash || posHash <= removedPosition) { // 如果当前元素的 hash 值小于或等于原始的 hash 值或者当前元素的 hash 值小于或等于 removedPosition（也就是上一个被移除 key 的 hash 值）
        this.table[removedPosition] = this.table[index]; // 表示我们需要将当前元素移动至 removedPosition 的位置
        delete this.table[index]; // 移动完成后，我们可以删除当前的元素素（因为它已经被复制到 removedPosition 的位置了）
        removedPosition = index; // 还需要将 removedPosition 更新为当前的 index
      }
      index++; 
    }
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
