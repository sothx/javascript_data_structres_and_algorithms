// INF常量保存Number类型的无穷大
const INF = Number.MAX_SAFE_INTEGER;
/**
 * 计算图实例所有顶点中的最小路径顶点的内部函数
 * @param {*} dist 图实例的距离表
 * @param {*} visited 图实例的访问记录表
 * @returns {*} 返回当前图实例中最短路径的顶点下标
 *  */
const minDistance = (dist, visited) => {
  // // 找到当前最短路径顶点作为中转跳点
  let min = INF; // 存储当前最短路径的距离(默认为无穷大)
  let minIndex = -1; // 存储当前最短路径顶点的下标
  for (let v = 0; v < dist.length; v++) { // 遍历图实例的顶点列表
    if (visited[v] === false && dist[v] <= min) { // 如果该顶点没有访问过，且该顶点的最短距离小于等于目前的最短距离
      min = dist[v]; // 更新最短路径的距离
      minIndex = v; // 更新最短路径顶点的下标
    }
  }
  // 找到图实例中所有顶点中最短路径的顶点下标，将其返回
  return minIndex; // 返回图实例中所有顶点中最短路径的顶点(下标)
};
/**
 * 最短路径算法-迪杰斯特拉算法
 * @param {*} graph 需要计算最短路径的图实例
 * @param {*} src 给定的起始顶点
 * @returns {*} 图实例的最短路径
 */
export const dijkstra = (graph, src) => {
  const dist = [];  //创建距离表，存储从起点到每一个顶点的临时距离
  const visited = []; //创建顶点的访问记录表，记录遍历过的顶点
  const { length } = graph;  //图实例的顶点数量
  
  //初始化最短路径表，到达每个顶点的路径代价默认为无穷大，每个顶点的访问记录均为未访问(false)
  for (let i = 0; i < length; i++) {
    dist[i] = INF;
    visited[i] = false;
  }
  dist[src] = 0; // 获取起点，刷新距离表，图实例传入的起始顶点距离为0
  //主循环，重复 遍历最短距离顶点和刷新距离表 的操作
  for (let i = 0; i < length - 1; i++) {  
    const u = minDistance(dist, visited); // 图实例每个顶点都去遍历最短距离顶点，传入图实例的距离表(dist)和访问记录表(visited)
    visited[u] = true; // 当前节点项已经访问完毕，更新当前节点项访问状态为true
    for (let v = 0; v < length; v++) { // 遍历顶点(也就是遍历当前顶点的邻接矩阵)，刷新距离表
      if (!visited[v] && graph[u][v] !== 0 && dist[u] !== INF && dist[u] + graph[u][v] < dist[v]) { // 如果找到更短的路径，则更新最短路径的值
        dist[v] = dist[u] + graph[u][v];
      }
    }
  }
  return dist; // 处理完所有顶点后，返回从源顶点（src）到图中其他顶点最短路径的结果。
};