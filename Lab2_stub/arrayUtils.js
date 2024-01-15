/* Todo: Implment the functions below and then export them
      using the ES6 exports syntax. 
      DO NOT CHANGE THE FUNCTION NAMES
*/

export let mergeCommonElements = (...args) => {
  //this function takes in a variable number of arrays that's what the ...args signifies

  let numarr = args.length;
  if (numarr < 2 ) {
    throw new Error;
  }
  const dict = new Map();
  for (const i of args) {
    if (!Array.isArray(i) || i.length == 0) {
      throw new Error;
    }
    let clear = new Set()
    for (const k of i.flat(Infinity)) {
      clear.add(k)
    }
    for (const j of clear) {
      dict.set(j, (dict.get(j) || 0) +1)
    }}
  let str = []
  let strnum = []
  let int = []
  for (const k of dict) {
      if (k[1] % numarr === 0){
        if (Number.isInteger(k[0])) {
          int.push(k[0])
        } else{
          if(Number(k[0])){
            strnum.push(k[0])
          } else{
          str.push(k[0])}
        }}}
  int.sort(function (a, b) {  return a - b;  });
  strnum.sort(function (a, b) {  return a - b;  });
  str.sort();
  let res = int.concat(strnum).concat(str)
  if (res.length === 0) { throw 'empty result'}
  return res
};

export let findTriangles = (arr) => {
  let res = Object()
  if (!Array.isArray(arr) || arr.length == 0){
    throw new Error;
  }
  for (let i = 0; i < arr.length; i++) {
    if (!Array.isArray(arr[i]) || arr[i].length != 3) {
      throw new Error;
      }
    for (let k of arr[i]){
      if ( k === (Infinity || -Infinity)) { throw new Error}
      if (typeof k === 'string') { throw new Error}
      if (typeof k === 'object') { throw new Error}
    }
    let [a, b, c] = arr[i];
    if (typeof a !== 'number') { throw 'not a number'}
    if (typeof b !== 'number') { throw 'not a number'}
    if (typeof c !== 'number') { throw 'not a number'}
    if ((a || b || c ) <= 0) {throw 'number less 0'}
    if ((a + b < c) || (a + c < b) || (b + c <a)) {throw 'not a triangle'}
    let set = new Set([a, b, c]);
    let type;
    if (set.size === 1) {
      type = "equilateral"
    } else if ( set.size === 2){
      type = "isosceles"
    } else {
      type = "scalene"
    }
    let perimeter = a + b + c;
    let s = perimeter/2;
    let area = Math.sqrt(s * (s-a) * (s-b) * (s-c));
    res[i] = [Number(area.toFixed(2)), perimeter, type]
      
    }
  return res
};

export let stringMetrics = (arr) => {
  if (!Array.isArray(arr) || arr.length < 2) {
    throw new Error;
  }
  let vowels = 0
  let consonants = 0
  let non = 0
  let long = []
  let short = []
  let check = ['a', 'e', 'i', 'o', 'u']
  let allleng = []
  let mode = []
  let count = Object();
  for (let i of arr) {
    if(i.trim().length == 0){throw new Error}
    if (typeof i === 'string'){
      allleng.push(i.trim().length);
      for (let j of i.trim()) {
        if (check.includes(j.toLocaleLowerCase())){
          vowels += 1
        } else if (j.toLocaleLowerCase().match(/[b-df-hj-np-tv-z]/g)){
          consonants += 1}
          else{ non += 1}
        }
      count[i.trim().length] = (count[i.trim().length] || 0) +1
    }else {
      throw new Error}
    }
    let maxi = 0
    for (let j in count) {
      maxi = Math.max(maxi, count[j])
    }
    for (let a in count) {
      if(count[a] == maxi){
        mode.push(Number(a))
      }
    }
  allleng.sort();
  let max = allleng[allleng.length-1]
  let min = allleng[0]
  let mean = Number(((vowels+consonants+non)/ arr.length).toFixed(2))
  let median
  let mid = Math.floor(allleng.length/2)
  if (allleng.length % 2 === 1){
    median = allleng[mid]
  } else {
    median = Number(((allleng[mid]+allleng[mid-1])/2).toFixed(2))
  }
  for (let i of arr){
    if (i.trim().length === max){long.push(i.trim())}
    if (i.trim().length === min){short.push(i.trim())}
  } 
  if (long.length === 1) { long = long.join('')};
  if (short.length === 1) { short = short.join('')};
  if(mode.length == 1){
    mode = mode[0]
  } else if(mode.length > 1) {
    mode = mode
  }
  else{
    mode = 'null'
  }
  return {vowels:vowels, consonants:consonants, longest:long, shortest:short, mean:mean, median:median, mode: mode}

};
