/**
 * 环形地图，gas[i]表示可以在i处加多少油，cost[i]表示从i到下一个地点需要消耗多少油，总数n
 * 问你能否回到原点
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
    let n = gas.length;
    // 检查每个起点
    for (let i = 0; i < n; i++) {
        // i为出发点
        // j为递归查找地点
        let j = i;
        // 起点加油量
        let remain = gas[i];
        // 能到达下一个地点
        while (remain - cost[j] >= 0) {
            // 到达后剩余油量
            remain = remain - cost[j] + gas[(j + 1) % n];
            // 环形取余
            j = (j + 1) % n;
            // 到达的地点是出发点
            if (j === i) {
                return i
            }
        }
    }

    return -1
};