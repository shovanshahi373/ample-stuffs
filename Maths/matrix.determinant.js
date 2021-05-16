function determinant(m = []) {
  if (!m.every((row) => row.length === m.length))
    return "supply only n*n matrix!";
  if (m.length === 1) return m[0][0];
  if (m.length === 2) {
    //do the determinant and return
    return m[0][0] * m[1][1] - m[0][1] * m[1][0];
  }
  const row = m[0];
  const determinants = [];
  row.forEach((el, i) => {
    let sign;
    i % 2 === 0 ? (sign = 1) : (sign = -1);
    const minor = new Array(row.length - 1).fill().map((_) => []);
    for (let ii = 0; ii < row.length; ii++) {
      if (ii === 0) continue;
      for (let jj = 0; jj < row.length; jj++) {
        if (jj != i) {
          minor[ii - 1].push(m[ii][jj]);
        }
      }
    }
    determinants.push(sign * el * determinant(minor));
  });
  return determinants.reduce((ttl, d) => (ttl += d), 0);
}

//test
const m1 = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
]; //0
const m2 = [
  [1, 3],
  [7, 0],
]; //-21
const m3 = [
  [16, -1, 5, 6],
  [-4, 0, 5, -7],
  [-11, -3, 8, 5],
  [2, 10, -5, 5],
]; //18772

console.log(determinant(m3));

//NOTES
/**
 * when i created array of arrays like this:
 * const a = Array(3).fill([]);
 * i created an array consisting of 3 CHILD arrayS,  WHRERE EACH OF THESE
 * CHILD ARRAY HAVE THE SAME REFERENCE AS THEY ARE COPIED FROM THE ONE
 * MENTIONED IN THE FILL([] <-- THIS ONE!) METHOD!
 */
