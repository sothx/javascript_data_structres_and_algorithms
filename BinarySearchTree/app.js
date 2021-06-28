/**
 * 二叉树中的节点最多只能有两个子节点：一个是左侧子节点，另一个是右侧子节点。这个定义有助于我们写出更高效地在树中插入、查找和删除节点的算法。二叉树在计算机科学中的应用非常广泛。
 * 二叉搜索树（BST）是二叉树的一种，但是只允许你在左侧节点存储（比父节点）小的值，在右侧节点存储（比父节点）大的值。
 */

// 比较用的常量对象(保证代码优雅)
export const Compare = {
  LESS_THAN: -1, // 如果第一个元素小于第二个元素，它就返回-1
  BIGGER_THAN: 1, // 如果第一个元素大于第二个元素，它就返回1
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


/**
 * Node 辅助类，用来表示二叉搜索树中的每个节点
 * @param {*} key  // 节点值
 * @param {*} left  // 左侧子节点引用
 * @param {*} right  // 右侧子节点引用
 */
export class Node {
  constructor(key) {
    this.key = key; // 节点值
    this.left = undefined; // 左侧子节点引用
    this.right = undefined; // 右侧子节点引用
  }
  /**
   *
   * 将节点值通过字符串的方式返回出来
   * @returns {string}
   * @memberof ValuePair
   */
  toString() {
    return `${this.key}`;
  }
}

export default class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn; // 用来比较节点值
    this.root = undefined; // Node 类型的根节点
  }
  /**
   * 向树中插入一个新的键
   * @param {number} key 需要插入的新键
   */
  insert(key) {
    // 检查Node类型的根节点是否为空，为空表示插入新键在第一个节点
    if (this.root == null) {
      this.root = new Node(key); // 创建Node类实例并赋值key，再将Node类型的根节点root指向这个实例
    } else {
      // 将节点添加到根节点以外的其他位置
      this.insertNode(this.root, key);
    }
  }
  /**
   * insert的辅助方法
   * @param {*} node 传入树的根节点
   * @param {*} key 传入需要插入的新键
   * insertNode 方法会帮助我们找到新节点应该插入的正确位置
   */
  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // 如果新节点的键小于当前节点的键,新键根据二叉搜索树的规则，需要插入到左侧
      if (node.left == null) { // 如果树的左侧节点为空
        node.left = new Node(key); // 直接在树的左侧子节点插入新键
      } else { // 如果树有左侧节点
        this.insertNode(node.left, key); // 递归调用insertNode方法，继续找到树的下一层
      }
    } else if (node.right == null) { // 如果节点的键比当前节点的键大，同时当前节点没有右侧子节点
      node.right = new Node(key); // 直接在树的右侧子节点插入新键
    } else { // 如果树有右侧节点
      this.insertNode(node.right, key); // 递归调用insertNode方法，继续找到树的下一层
    }
  }
  /**
   * 通过中序遍历方式遍历所有节点
   * @param {(event: key)} callback 接收一个回调函数，包含一个返回值key，回调函数用来定义我们对遍历到的每个节点进行的操作(访问者模式)
   * 中序遍历是一种以上行顺序访问 BST 所有节点的遍历方式，也就是以从最小到最大的顺序访问所有节点。中序遍历的一种应用就是对树进行排序操作。
   */
  inOrderTraverse(callback) {
    this.inOrderTraverseNode(this.root, callback);
  }
  /**
   * 中序遍历的辅助方法
   * @param {*} node 传入树的节点
   * @param {(event: key)} callback 接收结果回调函数，包含一个返回值key
   */
  inOrderTraverseNode(node, callback) {
    if (node != null) { // 检查以参数形式传入的节点是否为 null(递归的基线条件，为空则停止递归)
      this.inOrderTraverseNode(node.left, callback); // 递归调用相同的函数来访问左侧子节点
      callback(node.key); // 对根节点触发回调，返回树的键
      this.inOrderTraverseNode(node.right, callback); // 递归调用相同的函数来访问右侧子节点
    }
  }
  /**
   * 通过先序遍历方式遍历所有节点
   * @param {(event: key)} callback 接收一个回调函数，包含一个返回值key，回调函数用来定义我们对遍历到的每个节点进行的操作(访问者模式)
   * 先序遍历是以优先于后代节点的顺序访问每个节点的。先序遍历的一种应用是打印一个结构化的文档。
   */
  preOrderTraverse(callback) {
    this.preOrderTraverseNode(this.root, callback);
  }
  /**
   * 先序遍历的辅助方法
   * @param {*} node 传入树的节点
   * @param {(event: key)} callback 接收结果回调函数，包含一个返回值key
   */
  preOrderTraverseNode(node, callback) {
    if (node != null) {
      callback(node.key);
      this.preOrderTraverseNode(node.left, callback);
      this.preOrderTraverseNode(node.right, callback);
    }
  }
  /**
   * 通过后序遍历方式遍历所有节点
   * @param {(event: key)} callback 接收一个回调函数，包含一个返回值key，回调函数用来定义我们对遍历到的每个节点进行的操作(访问者模式)
   * 后序遍历则是先访问节点的后代节点，再访问节点本身。后序遍历的一种应用是计算一个目录及其子目录中所有文件所占空间的大小。
   */
  postOrderTraverse(callback) {
    this.postOrderTraverseNode(this.root, callback);
  }
  /**
   * 后序遍历的辅助方法
   * @param {*} node 传入树的节点
   * @param {(event: key)} callback 接收结果回调函数，包含一个返回值key
   */
  postOrderTraverseNode(node, callback) {
    if (node != null) {
      this.postOrderTraverseNode(node.left, callback);
      this.postOrderTraverseNode(node.right, callback);
      callback(node.key);
    }
  }
  /**
   * 返回树中最小的值/键(树最后一层最左侧的节点)
   */
  min() {
    return this.minNode(this.root);
  }
  /**
   * min的辅助方法
   * @param {*} node 传入树的根节点
   * minNode 方法允许我们从树中任意一个节点开始寻找最小的键。我们可以使用它来找到一棵树或其子树中最小的键。因此，我们在调用 minNode 方法的时候传入树的根节点，因为我们想要找到整棵树的最小键。
   */
  minNode(node) {
    let current = node; // 保存传入的根节点
    while (current != null && current.left != null) { // 遍历树的左侧，直到找到树的最下层
      current = current.left; // 遍历树的左侧
    }
    return current; // 把找到的树最左侧的节点返回
  }
  /**
   * 返回树中最大的值/键(树最后一层最右侧的节点)
   */
  max() {
    return this.maxNode(this.root);
  }
  /**
   * max的辅助方法
   * @param {*} node 传入树的根节点
   * maxNode 方法允许我们从树中任意一个节点开始寻找最大的键。我们可以使用它来找到一棵树或其子树中最大的键。因此，我们在调用 maxNode 方法的时候传入树的根节点，因为我们想要找到整棵树的最大键。
   */
  maxNode(node) {
    let current = node; // 保存传入的根节点
    while (current != null && current.right != null) { // 遍历树的右侧，直到找到树的最下层
      current = current.right; // 遍历树的右侧
    }
    return current; // 把找到的树最右侧的节点返回
  }
  /**
   * 返回树中搜索到的一个特定的值
   * @param {*} key 传入需要搜索的key值
   */
  search(key) {
    return this.searchNode(this.root, key);
  }
  /**
   * search的辅助方法
   * @param {*} node 传入树的根节点
   * @param {*} key 传入需要查找的key值
   * searchNode 方法可以用来寻找一棵树或其任意子树中的一个特定的值。
   */
  searchNode(node, key) {
    if (node == null) { // 验证作为参数传入的 node 是否合法（不是 null 或 undefined）
      return false; // 如果是的话，说明要找的键没有找到，返回 false
    }
    // 如果传入的节点不是 null，需要继续验证
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) { // 如果要找的键比当前的节点小
      return this.searchNode(node.left, key); // 那么继续在左侧的子树上搜索
    } else if (
      this.compareFn(key, node.key) === Compare.BIGGER_THAN
    ) { // 如果要找的键比当前的节点大
      return this.searchNode(node.right, key); // 那么就从右侧子节点开始继续搜索
    } else {
      return true; // 否则就说明要找的键和当前节点的键相等，返回 true 来表示找到了这个键
    }
  }
  /**
   * 从树中移除某个键
   * @param {*} key 传入需要删除的key值
   */
  remove(key) {
    this.root = this.removeNode(this.root, key);
  }
  /**
   * remove的辅助方法
   * @param {*} node 传入树的根节点
   * @param {*} key 传入需要删除的key值
   * removeNode 方法可以用来删除一棵树或其任意子树中的一个特定的值。
   */
  removeNode(node, key) {
    if (node == null) { // 如果正在检测的节点为 null，那么说明键不存在于树中，所以返回 null
      return undefined;
    }
    // 如果不为 null，我们需要在树中找到要移除的键
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) { //如果要找的键比当前节点的值小
      node.left = this.removeNode(node.left, key); // 就沿着树的左边找到下一个节点
      return node;
    }
    if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) { // 如果要找的键比当前节点的值大
      node.right = this.removeNode(node.right, key); // 那么就沿着树的右边找到下一个节点
      return node;
    }
    // 如果我们找到了要找的键（键和 node.key 相等），就需要处理三种不同的情况
    // 1 - 移除一个叶节点
    // 2 - 移除有一个左侧或右侧子节点的节点
    // 3 - 移除有两个子节点的节点

    // 1-移除一个叶节点
    if (node.left == null && node.right == null) {// 第一种情况是该节点是一个没有左侧或右侧子节点的叶节点
      node = undefined; // 将当前的页节点设置为undefined，移除它
      return node; // 返回undefined，让父节点对它指针指向undefined(另一种可行的办法是将父节点和节点本身都作为参数传入方法内部)
    }
    // 2-移除有一个左侧子节点或右侧子节点的节点,这种情况下，需要跳过这个节点，直接将父节点指向它的指针指向子节点。
    if (node.left == null) { // 如果这个节点没有左侧子节点,也就是说它有一个右侧子节点
      node = node.right; // 因此我们把对它的引用改为对它右侧子节点的引用
      return node; // 并返回更新后的节点
    }
    if (node.right == null) { // 如果这个节点没有右侧子节点,也就是说它有一个左侧子节点
      node = node.left; // 因此我们把对它的引用改为对它左侧子节点的引用
      return node; // 并返回更新后的节点
    }
    // 3-移除有两个子节点的节点，(要移除的节点有两个子节点——左侧子节点和右侧子节点)
    const aux = this.minNode(node.right); // 当找到了要移除的节点后，需要找到它右边子树中最小的节点(它的继承者)
    node.key = aux.key; // 然后，用它右侧子树中最小节点的键去更新这个节点的值
    node.right = this.removeNode(node.right, aux.key); // 此时它右侧子树中最小节点的键已经移动到被移除的节点的位置了，最后继续把移除后副作用剩下的右侧子树中的最小节点移除
    return node; // 向它的父节点返回更新后节点的引用
  }
  /**
   * 获取树的根节点
   */
  getRoot() {
    return this.root;
  }

}