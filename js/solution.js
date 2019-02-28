// function solution(
//   arr: number[][],
//   func: (num: number, i: number, j: number, arr: number[][]) => void
// ) {
//   for (let i = 0; i < arr.length; i++) {
//     for (let j = 0; j < arr[i].length; j++) {
//       func(arr[i][j], i, j, arr)
//     }
//   }
// }
function drilDown(sudo) {
    // 原地变异sudo
    let total = [];
    const res = genPossibleCol(sudo);
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const value = res[i][j];
            // 唯一候选数
            if (value.length == 1) {
                sudo[i][j] = value[0];
            }
            // if (value.length > 1) {
            //   total.push([value.length, i, j])
            // }
        }
    }
    // total.sort((a, b) => a[0] - b[0])
    // console.log(total[0])
    // console.log(sudo)
    // const [len, i, j] = total[0]
    // for (let k = 0; k < len; k++) {
    //   const snapshot = JSON.parse(JSON.stringify(sudo))
    //   sudo[i][j] = res[i][j][k]
    // }
    return isSolved(sudo) ? sudo : drilDown(sudo);
}
function setHiddenSingles(arr, sudo) { }
function isSolved(sudo) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (sudo[i][j] == 0) {
                return false;
            }
        }
    }
    return true;
}
function genPossibleCol(sudo) {
    let arr = [];
    for (let i = 0; i < 9; i++) {
        arr.push([]);
        for (let j = 0; j < 9; j++) {
            // 已经有值
            if (sudo[i][j] != 0) {
                arr[i].push([]);
            }
            else {
                const { row, col, grid } = getRelated(i, j, sudo);
                let res = new Coll([1, 2, 3, 4, 5, 6, 7, 8, 9], [...new Set(row.concat(col, grid))])
                    .diff()
                    .filter(i => i !== 0);
                arr[i].push(res);
                // console.log(i, j)
            }
            // console.log('TCL: genPossibleCol -> arr', arr)
        }
    }
    return arr;
}
function getRelated(i, j, sudo) {
    const row = Math.ceil((i + 1) / 3);
    const col = Math.ceil((j + 1) / 3);
    let grid = [];
    let _col = [];
    for (let _i = 0; _i < 9; _i++) {
        for (let _j = 0; _j < 9; _j++) {
            if (_i >= (row - 1) * 3 && _i <= (row - 1) * 3 + 2) {
                if (_j >= (col - 1) * 3 && _j <= (col - 1) * 3 + 2) {
                    grid.push(sudo[_i][_j]);
                }
            }
            if (_j == j) {
                _col.push(sudo[_i][_j]);
            }
        }
    }
    return {
        row: sudo[i],
        col: _col,
        grid,
    };
}
class Coll {
    constructor(a, b) {
        this.a = a;
        this.b = b;
        this.aSet = new Set(a);
        this.bSet = new Set(b);
    }
    /**
     * union 交集
     */
    union() {
        const { a, b } = this;
        return Array.from(new Set(a.concat(b)));
    }
    /**
     * inter 并集
     */
    inter() {
        const { a, bSet } = this;
        return Array.from(new Set(a.filter(i => bSet.has(i))));
    }
    /**
     * diff 差集
     */
    diff() {
        const { a, b, aSet, bSet } = this;
        return Array.from(new Set(a.concat(b).filter(i => !(aSet.has(i) && bSet.has(i)))));
    }
}
// let instance = new Coll([1, 1, 1, 2, 3], [2, 2, 2, 2, 3, 4])
// console.log(instance.diff())
// console.log(instance.inter())
// console.log(instance.union())
