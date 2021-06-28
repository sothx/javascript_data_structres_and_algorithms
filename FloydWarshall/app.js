/**
 * 最短路径算法-弗洛伊德算法
 * @param {*} graph 需要计算最短路径的图实例
 * @returns {*} 图实例(带权图)的最短路径
 */
 export const floydWarshall = graph => {
  const dist = []; //创建距离表，存储从起点到每一个顶点的距离(权值)
   const { length } = graph; //图实例的顶点数量
   // 初始化距离表为图实例每个顶点及其邻接矩阵的距离(权值)
  for (let i = 0; i < length; i++) { // 遍历图实例的所有顶点
    dist[i] = []; // 将图实例对应的顶点初始化为空矩阵
    for (let j = 0; j < length; j++) { // 循环遍历图当前顶点和其他顶点的关系(当前顶点和其他顶点是否有边)
      if (i === j) {
        // 如果是顶点到自身的距离,这距离是0
        dist[i][j] = 0;
      } else if (!isFinite(graph[i][j])) {
        // 如果这两个顶点之间没有边,就将其表示为 Infinity(无穷大)
        dist[i][j] = Infinity;
      } else {
        // 如果这两个顶点之间有边，则在距离表记录他们的距离(权值)
        dist[i][j] = graph[i][j];
      }
    }
  }
   
  //循环更新矩阵的值
  for (let k = 0; k < length; k++) { // 将顶点 0 到 k(图实例的长度) 作为中继顶点
    for (let i = 0; i < length; i++) { // 循环遍历图实例的所有顶点
      for (let j = 0; j < length; j++) { // 循环遍历图当前顶点和其他顶点的关系(当前顶点和其他顶点是否有边)
        // i 到 j 的最短路径经过 k
        if (dist[i][k] + dist[k][j] < dist[i][j]) { // 计算通过顶点 k 的 i 和 j 之间的最短路径
          // const numberToChat = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
          // console.log('k——',numberToChat[k],'i——',numberToChat[i], 'j——', numberToChat[j]);
          // console.log('dist[i][j]——',dist[i][j], 'dist[i][k]——',dist[i][k], 'dist[k][j]——', dist[k][j]);
          // console.log(`${numberToChat[i]}${numberToChat[j]}=${numberToChat[i]}${numberToChat[k]}+${numberToChat[k]}${numberToChat[j]}`);
          dist[i][j] = dist[i][k] + dist[k][j]; // 如果一个最短路径的新的值被找到，我们要使用并存储它
        }
      }
    }
  }
  return dist; // 处理完所有顶点后，返回图中所有顶点到其他顶点最短路径的结果。
};

// const graphdemo = [
//   [0, 5, 2, Infinity, Infinity, Infinity, Infinity],
//   [5, 0, Infinity, 1, 6, Infinity, Infinity],
//   [2, Infinity, 0, 6, Infinity, 8, Infinity],
//   [Infinity, 1, 6, 0, 1, 2, Infinity],
//   [Infinity, 6, Infinity, 1, 0, Infinity, 7],
//   [Infinity, Infinity, 8, 2, Infinity, 0, 3],
//   [Infinity,Infinity,Infinity,Infinity,7,3,0]
// ]

// floydWarshall(graphdemo);
