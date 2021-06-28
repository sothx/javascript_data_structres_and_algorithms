/**
 * 最少硬币找零问题
 * 参考视频:
 * 动态规划 硬币问题 https://www.bilibili.com/video/BV1G7411B7Et/?spm_id_from=autoNext
 * 最少硬币找零-动态规划 https://www.bilibili.com/video/BV1Ev411q7MC?from=search&seid=7000841127905168997
 * 硬币找零：给出面额为 d1, …, dn的一定数量的硬币和要找零的钱数，找出有多少种找零的方法。
 * @param {array} coins 代表问题中的面额。对美国的硬币系统而言，它是[1, 5, 10, 25]
 * @param {number} amount  代表需要找零的金额
 */
 export function minCoinChange(coins, amount) {
  const cache = []; // 缓存，也叫记忆化

  const makeChange = (value) => {
    if (!value) { // 若 amount 不为正（value < 0），就返回空数组
      return [];
    }
    // 检查 cache 缓存。若结果已缓存
    if (cache[value]) {
      return cache[value]; // 则直接返回结果
    }
    let min = []; // 当前的最小硬币结果
    let newMin; // 新的当前的最小硬币结果
    let newAmount; // 新的最小需找零金额
    for (let i = 0; i < coins.length; i++) { // 遍历货币的每个面额
      const coin = coins[i]; // 当前的货币面额
      newAmount = value - coin; // 对每个面额，我们都计算 newAmount 的值
      // 它的值会一直减小，直到能找零的最小钱数（本算法对所有的 x < amount 都会计算 makeChange 结果）
      if (newAmount >= 0) { // 若 newAmount 是合理的值（正值），我们也会计算它的找零结果
        newMin = makeChange(newAmount); // 则对于这个金额，再递归获取其他找零可能性
      }
      // 最后
      if (
        newAmount >= 0 // 判断 newAmount 是否有效
        && (newMin.length < min.length - 1 || !min.length) // 并且，minValue （最少硬币数）是否是最优解
        && (newMin.length || !newAmount) // 并且， minValue 和 newAmount 是否是合理的值
      ) {
        // 若以上判断都成立，意味着有一个比之前更优的答案（以 5 美分为例，可以给 5 便士或者 1 个 5 美分镍币，1 个 5 美分镍币是最优解）
        min = [coin].concat(newMin);
        // console.log('new Min ' + min + ' for ' + amount);
      }
    }
    // 方法执行结束后，会返回一个数组，包含用来找零的各个面额的硬币数量（最少硬币数）
    console.log(cache,'cache')
    return (cache[value] = min); 
  };
  return makeChange(amount); // 传入需要找零的金额，获取找零的可能结果
}