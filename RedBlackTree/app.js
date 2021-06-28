import {
  Compare,
  defaultCompare,
  Node,
  BinarySearchTree
} from '/BinarySearchTree/app.js';
/**
 * 和 AVL 树一样，红黑树也是一个自平衡二叉搜索树。我们学习了对 AVL 书插入和移除节点可能会造成旋转，所以我们需要一个包含多次插入和删除的自平衡树，红黑树是比较好的。如果插入和删除频率较低（我们更需要多次进行搜索操作），那么 AVL 树比红黑树更好。
 */

// 红黑树的颜色常量对象
const Colors = {
  RED: 0,
  BLACK: 1
}

/**
 * 红黑树的辅助类 RedBlackNode 继承自 Node
 * @param {number} key 需要插入的新键
 */
class RedBlackNode extends Node {
  constructor(key) {
    super(key);
    this.key = key; // 节点值
    this.color = Colors.RED; // 节点的颜色
    this.parent = null; // 指向父节点的引用
  }
  /**
   * 返回红黑树中红的常量
   */
  isRed() {
    return this.color === Colors.RED;
  }
}


export default class RedBlackTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) { // 用来比较节点值
    super(compareFn);
    this.root = null;
  }
  /**
   * 向树中插入一个新的键
   * @param {number} key 需要插入的新键
   */
  insert(key) {
    // 如果是插入根键
    if (this.root == null) {
      this.root = new RedBlackNode(key); // 那么我们需要创建一个红黑树节点
      this.root.color = Colors.BLACK; // 将这个根节点的颜色设为黑色(树的根节点是黑的)
    } else { // 如果树不是空的
      const newNode = this.insertNode(this.root, key); // 像二叉搜索树一样在正确的位置插入节点,newNode获取到插入后返回的插入节点
      this.fixTreeProperties(newNode); // 根据插入后返回的插入节点，我们可以验证在插入后，红黑树的规则是否得到了满足
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
        node.left = new RedBlackNode(key); // 直接在树的左侧子节点插入新红黑树键
        node.left.parent = node; // 保存指向被插入节点父节点的引用
        return node.left; // 返回节点的引用(辅助insert)
      } else {
        return this.insertNode(node.left, key);
      }
    } else if (node.right == null) { // 如果节点的键比当前节点的键大，同时当前节点没有右侧子节点
      node.right = new RedBlackNode(key); // 直接在树的右侧子节点插入新红黑树键
      node.right.parent = node; // 保存指向被插入节点父节点的引用
      return node.right; // 返回节点的引用(辅助insert)
    } else { // 如果树有右侧节点
      return this.insertNode(node.right, key); // 递归调用insertNode方法，继续找到树的下一层
    }
  }
  /**
   * 修复树属性的辅助方法
   * @param {*} node 传入树的根节点
   */
  fixTreeProperties(node) {
    while (node && node.parent && node.parent.color === Colors.RED && node.color !== Colors.BLACK) { // 从插入的节点开始，我们要验证它的父节点是否是红色），以及这个节点是否不是黑色
      let parent = node.parent; // 为了保证代码的可读性，保存父节点的引用
      const grandParent = parent.parent; // 为了保证代码的可读性，保存祖父节点的引用

      // 如果父节点是左侧子节点(情景A)
      if (grandParent && grandParent.left === parent) {

        const uncle = grandParent.right; // 保存舅父节点的引用(祖父节点右侧子子节点的引用)

        // 情形 1A: 如果舅父节点(祖父节点右侧子子节点的引用)的颜色是红色
        if (uncle && uncle.isRed()) {
          grandParent.color = Colors.RED; // 改变祖父节点的颜色为红
          parent.color = Colors.BLACK; // 改变父节点的颜色为黑
          uncle.color = Colors.BLACK; // 改变舅父节点(祖父节点右侧子子节点的引用)的颜色为黑
          node = grandParent; // 将当前节点的引用指向祖父节点
        } else {
          // 情形 2A：节点是右侧子节点——左旋转
          if (node === parent.right) {
            this.rotationRR(parent); // 进行一次向左的单旋转(RR)
            node = parent; // 更新当前节点的引用改为父节点
            parent = node.parent; // 更新父节点的引用改为当前节点的引用的父节点
          }

          // 情形 3A：节点是左侧子节点——右旋转
          this.rotationLL(grandParent); // 进行一次向右的单旋转(LL)
          // 交换颜色
          parent.color = Colors.BLACK; // 改变父节点的颜色为黑
          grandParent.color = Colors.RED; // 改变祖父节点的颜色为红
          node = parent; // 将当前节点的引用指向父节点
        }

      } else { // 如果父节点是右侧子节点(情景B)

        const uncle = grandParent.left; // 保存舅父节点的引用(祖父节点左侧子子节点的引用)

        // case 1: 如果舅父节点(祖父节点左侧子子节点的引用)的颜色是红色
        if (uncle && uncle.isRed()) {
          grandParent.color = Colors.RED; // 改变祖父节点的颜色为红
          parent.color = Colors.BLACK; // 改变父节点的颜色为黑
          uncle.color = Colors.BLACK; // 改变舅父节点(祖父节点右侧子子节点的引用)的颜色为黑
          node = grandParent; // 更新当前节点的引用,将当前节点的引用指向祖父节点
        } else {
          // 情形 2B：节点是左侧子节点——右旋转
          if (node === parent.left) {
            this.rotationLL(parent); // 以父节点为基准,进行一次向右的单旋转(LL)
            node = parent; // 更新当前节点的引用改为父节点
            parent = node.parent; // 更新父节点的引用改为当前节点的引用的父节点
          }

          // 情形 3B：节点是右侧子节点——左旋转
          this.rotationRR(grandParent); // 以祖父节点为基准,进行一次向左的单旋转(RR)
          // 交换颜色
          parent.color = Colors.BLACK; // 改变父节点的颜色为黑
          grandParent.color = Colors.RED; // 改变祖父节点的颜色为红
          node = parent; // 更新当前节点的引用,将当前节点的引用指向父节点
        }
      }
    }
    this.root.color = Colors.BLACK; // 为了保证根节点的颜色始终是黑色，在代码最后设置根节点的颜色
  }
  /**
   * 左-左（LL）：向右的单旋转
   * 这种情况出现于节点的左侧子节点的高度大于右侧子节点的高度时，并且左侧子节点也是平衡或左侧较重的
   * Left left case: rotate right
   *
   *       b                           a
   *      / \                         / \
   *     a   e -> rotationLL(b) ->   c   b
   *    / \                             / \
   *   c   d                           d   e
   *
   * @param node Node<T> 传入需要向右的单旋转的节点
   */
  rotationLL(node) {
    const tmp = node.left; // 将a节点置于b所在的位置
    node.left = tmp.right; // 将b节点的左子节点置为a节点的右子节点
    if (tmp.right && tmp.right.key) { // 如果右节点存在(新增)
      tmp.right.parent = node; // 将引用更新为旋转后的新父节点(新增)
    }
    tmp.parent = node.parent; // 将引用更新为旋转后的新父节点(新增)
    if (!node.parent) { // 如果传入节点的父节点不存在，则此时旋转的节点是根节点(新增)
      this.root = tmp; // 直接设置根节点为旋转后的节点(新增)
    } else { // 如果传入的节点不是根节点
      if (node === node.parent.left) { // 传入的节点与它的父节点的左树相同(新增)
        node.parent.left = tmp; // 将引用更新为旋转后的新父节点(新增)
      } else { // 传入的节点与它的父节点的右树相同(新增)
        node.parent.right = tmp; // 将引用更新为旋转后的新父节点(新增)
      }
    }
    tmp.right = node; // 将a节点的右子节点设置为b节点
    node.parent = tmp; // 将引用更新为旋转后的新父节点(新增)
  }
  /**
   * 右-右（RR）：向左的单旋转
   * 右-右的情况和左-左的情况相反。它出现于右侧子节点的高度大于左侧子节点的高度，并且右侧子节点也是平衡或右侧较重的
   * Right right case: rotate left
   *
   *     a                              b
   *    / \                            / \
   *   c   b   -> rotationRR(a) ->    a   e
   *      / \                        / \
   *     d   e                      c   d
   *
   * @param node Node<T> 传入需要向左的单旋转的节点
   */
  rotationRR(node) {
    const tmp = node.right; // 将b节点置于a所在的位置
    node.right = tmp.left; // 将a节点的右子节点置为b节点的左子节点
    if (tmp.left && tmp.left.key) { // 如果左节点存在(新增)
      tmp.left.parent = node; // 将引用更新为旋转后的新父节点(新增)
    }
    tmp.parent = node.parent; // 将引用更新为旋转后的新父节点(新增)
    if (!node.parent) { // 如果传入节点的父节点不存在，则此时旋转的节点是根节点(新增)
      this.root = tmp; // 直接设置根节点为旋转后的节点(新增)
    } else { // 传入的节点与它的父节点的左树相同(新增)
      if (node === node.parent.left) {
        node.parent.left = tmp;  // 将引用更新为旋转后的新父节点(新增)
      } else { // 传入的节点与它的父节点的右树相同(新增)
        node.parent.right = tmp;  // 将引用更新为旋转后的新父节点(新增)
      }
    }
    tmp.left = node; // 将b节点的左子节点设置为a节点
    node.parent = tmp; // 将引用更新为旋转后的新父节点(新增)
  }
  /**
   * 获取树的根节点
   */
  getRoot() {
    return this.root;
  }
}