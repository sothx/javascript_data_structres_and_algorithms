/**
 * 集合是由一组无序且唯一（即不能重复）的项组成的。该数据结构使用了与有限集合相同的数学概念，但应用在计算机科学的数据结构中。
 * 在数学中，集合是一组不同对象的集。
 * 比如说，一个由大于或等于 0 的整数组成的自然数集合：N = {0, 1, 2, 3, 4, 5, 6, …}。集合中的对象列表用花括号（{}）包围。
 * 还有一个概念叫空集。空集就是不包含任何元素的集合。比如 24 和 29 之间的素数集合，由于 24 和 29 之间没有素数（除了 1 和自身，没有其他正因数的、大于 1 的自然数），这个集合就是空集。空集用{ }表示。
 * 你也可以把集合想象成一个既没有重复元素，也没有顺序概念的数组。
 * 在数学中，集合也有并集、交集、差集等基本运算。
 * 集合是数学中基础的概念，在计算机领域也非常重要。它在计算机科学中的主要应用之一是数据库，而数据库是大多数应用程序的根基。集合被用于查询的设计和处理。当我们创建一条从关系型数据库（Oracle、Microsoft SQL Server、MySQL 等）中获取一个数据集合的查询语句时，使用的就是集合运算，并且数据库也会返回一个数据集合。当我们创建一条 SQL 查询命令时，可以指定是从表中获取全部数据还是获取其中的子集；也可以获取两张表共有的数据、只存在于一张表中的数据（不存在于另一张表中），或是存在于两张表内的数据（通过其他运算）。这些SQL 领域的运算叫作联接，而 SQL 联接的基础就是集合运算。
 */

// 基于 ES2015 的 Set 类来实现我们自己的 Set 类(也会实现一些原生 ES2015没有提供的集合运算，例如并集、交集和差集)
 export class Set {
   constructor() {
    this.items = {}; // 可以使用数组，也可以使用对象等数据结构，对象实现集合大多数情况下的算法复杂度优于数组，且JavaScript的对象不允许一个键指向两个不同的属性，也保证了集合里的元素都是唯一的
  }

  /**
   * 向集合添加一个新元素
   * @param {*} element 需要添加的项
   * @return {boolean} 如果添加成功返回true，否则返回false
   */
  add(element) {
    if (!this.has(element)) { // 不存在存在于集合中
      this.items[element] = element;
      return true;
    }
    return false;
  }
  /**
   * 从集合移除一个元素
   * @param {*} element 需要移除的项
   * @return {boolean} 如果删除成功返回true，否则返回false
   */
  delete(element) {
    if (this.has(element)) { // 存在存在于集合中
      delete this.items[element];
      return true;
    }
    return false;
  }
   /**
   * 如果元素在集合中，返回 true，否则返回 false
   * @param {*} element 需要移除的项
   * @return {boolean} 如果元素在集合中返回true，否则返回false
   */
  has(element) {
    return Object.prototype.hasOwnProperty.call(this.items, element); //Object 原型有 hasOwnProperty 方法。该方法返回一个表明对象是否具有特定属性的布尔值。
  }
  /**
  * 返回集合中的所有值
  */
  values() {
    return Object.values(this.items);
   }
  /**
   * 并集：对于给定的两个集合，返回一个包含两个集合中所有元素的新集合。
   * @param {*} otherSet 另外一个集合
   * @returns {*}  // 返回一个包含两个集合中所有元素的新集合
   */
  union(otherSet) {
    const unionSet = new Set(); // 创建一个新的集合，代表两个集合的并集
    this.values().forEach(value => unionSet.add(value)); // 获取第一个集合（当前的 Set 类实例）所有的值（values）, 迭代并全部添加到代表并集的集合中
    otherSet.values().forEach(value => unionSet.add(value)); // 获取第二个集合（传入函数的 Set 类实例）所有的值（values）, 迭代并全部添加到代表并集的集合中
    return unionSet; // 返回一个包含两个集合中所有元素的新集合(并集)
  }
  /**
   * 交集：对于给定的两个集合，返回一个包含两个集合中共有元素的新集合。
   * @param {*} otherSet 另外一个集合
   * @returns {*} // 返回一个包含两个集合中共有元素的新集合
   */
  intersection(otherSet) {
    const intersectionSet = new Set(); // 创建一个新的集合，代表两个集合的交集
    const values = this.values(); // 获取第一个集合（当前的 Set 类实例）所有的值（values）
    const otherValues = otherSet.values(); // 获取第二个集合（传入函数的 Set 类实例）所有的值（values）
    let biggerSet = values; // 存储两个集合中较大的集合(默认值为第一个集合的所有值)
    let smallerSet = otherValues; // 存储两个集合中较小的集合(默认值为第二个集合的所有值)
    //
    if (otherValues.length - values.length > 0) { // 如果第二个集合的大小大于第一个集合
      // 交换两个集合的存储位置
      biggerSet = otherValues;
      smallerSet = values;
    }
    // 在两个集合中较小的集合进行循环
    smallerSet.forEach(value => {
      if (biggerSet.includes(value)) { // 如果两个集合中较大的集合也包含该较小集合的值
        intersectionSet.add(value); // 把它添加进两个集合的交集
      }
    });
    //返回一个包含两个集合中共有元素的新集合
    return intersectionSet;
  }
  /**
   * 差集：对于给定的两个集合，返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
   * @param {*} otherSet 另外一个集合
   * @returns {*}  // 返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
   */
  difference(otherSet) {
    const differenceSet = new Set(); // 创建一个新的集合，代表两个集合的差集
    this.values().forEach(value => { // 循环第一个集合（当前的 Set 类实例 )
      if (!otherSet.has(value)) {// 如果第二个集合中不存在当前Set实例的值
        differenceSet.add(value); // 把它添加进两个集合的差集
      }
    });
    //返回一个包含所有存在于第一个集合且不存在于第二个集合的元素的新集合
    return differenceSet;
  }
  /**
   * 子集：验证一个给定集合是否是另一集合的子集，其数学概念的一个例子是集合 A 是集合 B 的子集（或集合 B 包含集合 A）
   * @param {*} otherSet 另外一个集合
   * @return {Boolean}  // 验证一个给定集合是否是另一集合的子集,是则返回true，否则返回 false
   */
  isSubsetOf(otherSet) {
    if (this.size() > otherSet.size()) { //如果第一个集合（当前的 Set 类实例）大于 第二个集合（传入函数的 Set 类实例），则子集不成立，直接返回false
      return false;
    }
    let isSubset = true; // 假定当前实例是给定集合的子集
    this.values().every(value => {  // 循环第一个集合（当前的 Set 类实例 )
      if (!otherSet.has(value)) { //如果给定集合有任何元素不存在第一个集合（当前的 Set 类实例 )的值
        // 子集不成立，返回 false
        isSubset = false;
        return false;
      }
      // 如果所有元素都存在于 otherSet 中，自己成立，返回true
      return true;
    });
    
    return isSubset;
  }
  /**
  * 如果集合中不包含任何元素，返回 true，否则返回 false。
  * @returns {Boolean}
  */
  isEmpty() {
    return this.size() === 0;
   }
   /**
   * 返回集合包含的元素个数
   * @return {number}
   */
  size() {
    return Object.keys(this.items).length;
   }
   /**
   * 移除集合中的所有值
   */
  clear() {
    this.items = {};
  }
   /**
   * 以字符串的方式输出集合的值
   * @returns {Array}
   */
  toString() {
    if (this.isEmpty()) { // 检验集合是否为空
      return '';
    }
    // 如果集合不为空
    const values = this.values(); // 获取集合中所有的值
    let objString = `${values[0]}`; // 用集合中第一个元素作为字符串的初始值
    for (let i = 1; i < values.length; i++) { // 循环集合的所有值
      // 添加一个逗号（,）以及下一个元素
      objString = `${objString},${values[i].toString()}`;
    }
    // 以字符串的方式输出集合的值
    return objString;
  }
}

/**
 * 集合数据结构不允许存在重复的元素。但是，在数学中，有一个叫作多重集的概念，它允许我们向集合中插入之前已经添加过的元素。多重集（或袋）在计算集合中元素的出现次数时很有用。它也在数据库系统中得到了广泛运用。
*/
