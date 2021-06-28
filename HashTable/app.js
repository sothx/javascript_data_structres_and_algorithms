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
export class Dictionary {
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
   * 向散列表增加一个新的项（也能更新散列表）
   * put 方法和 Dictionary 类中的 set 方法逻辑相似。我们也可以将其命名为 set，但是大多数的编程语言会在 HashTable 数据结构中使用 put 方法，因此我们遵循相同的命名方式。
   * @param {string} key 需要添加新项的key
   * @param {*} value 需要添加新项的value
   * @return {boolean} 如果添加成功返回true，否则返回false
   */
  put(key, value) {
    if (key != null && value != null) { // 检验 key 和 value 是否合法
      const position = this.hashCode(key); // 获取key值对应的hash码
      this.table[position] = new ValuePair(key, value); // 创建一个新的键值对并将其赋值给 table 对象上的 key属性（position）
      return true; // 添加/覆盖成功返回true
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
    const valuePair = this.table[this.hashCode(key)]; // 根据指定key值获取对应的hashCode，再根据hashCode获取指定key值的valuePair
    return valuePair === null ? undefined : valuePair.value; // 如果 valuePair 对象存在，将返回该值，否则将返回一个 undefined 值
  }
  /**
   *
   *根据键值从散列表中移除值
   * @param {*} key 要删除的key值
   * @returns {boolean} 是否删除成功
   */
  remove(key) {
    // 要从 HashTable 中移除一个值，首先需要知道值所在的位置
    const hash = this.hashCode(key); // 使用 hashCode 函数来获取 hash
    const valuePair = this.table[hash]; // 在 hash 的位置获取到 valuePair
    if (valuePair !== null) { // 如果 valuePair不是 null 或 undefined
      delete this.table[hash]; // 在table对象删除指定的hash
      return true; // 成功返回true
    }
    // 否则返回 false
    return false;
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

const hash = new HashTable();
hash.put('Gandalf', 'gandalf@email.com');
hash.put('John', 'johnsnow@email.com');
hash.put('Tyrion', 'tyrion@email.com');
console.log(hash.hashCode('Gandalf') + ' - Gandalf');
console.log(hash.hashCode('John') + ' - John');
console.log(hash.hashCode('Tyrion') + ' - Tyrion');

/**
19 - Gandalf
29 - John
16 - Tyrion 
 */
console.log(hash.get('Gandalf')); // gandalf@email.com
console.log(hash.get('Loiane')); // undefined 

hash.remove('Gandalf');
console.log(hash.get('Gandalf')); // undefined

/**
 * 有时候，一些键会有相同的散列值。不同的值在散列表中对应相同位置的时候，我们称其为冲突。例如，我们看看下面的代码会得到怎样的输出结果。
 */
const hash1 = new HashTable();
hash.put('Ygritte', 'ygritte@email.com');
hash.put('Jonathan', 'jonathan@email.com');
hash.put('Jamie', 'jamie@email.com');
hash.put('Jack', 'jack@email.com');
hash.put('Jasmine', 'jasmine@email.com');
hash.put('Jake', 'jake@email.com');
hash.put('Nathan', 'nathan@email.com');
hash.put('Athelstan', 'athelstan@email.com');
hash.put('Sue', 'sue@email.com');
hash.put('Aethelwulf', 'aethelwulf@email.com');
hash.put('Sargeras', 'sargeras@email.com');

/**
4 - Ygritte
5 - Jonathan
5 - Jamie
7 - Jack
8 - Jasmine
9 - Jake 
10 - Nathan
7 - Athelstan
5 - Sue
5 - Aethelwulf
10 - Sargeras
 */

// 实际输出

console.log(hashTable.toString())

/**
{4 => [#Ygritte: ygritte@email.com]}
{5 => [#Aethelwulf: aethelwulf@email.com]}
{7 => [#Athelstan: athelstan@email.com]}
{8 => [#Jasmine: jasmine@email.com]}
{9 => [#Jake: jake@email.com]}
{10 => [#Sargeras: sargeras@email.com]}
 */

/**
Jonathan、Jamie、Sue 和 Aethelwulf 有相同的散列值，也就是 5。由于 Aethelwulf是最后一个被添加的，它将是在 HashTable 实例中占据位置 5 的元素。首先 Jonathan 会占据这个位置，然后 Jamie 会覆盖它，Sue 会再次覆盖，最后 Aethelwulf 会再覆盖一次。这对于其他发生冲突的元素来说也是一样的。
使用一个数据结构来保存数据的目的显然不是丢失这些数据，而是通过某种方法将它们全部保存起来。因此，当这种情况发生的时候就要去解决。处理冲突有几种方法：分离链接、线性探查和双散列法。
 */