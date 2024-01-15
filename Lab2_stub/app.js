/* TODO: Import the functions from your three modules here and write two test cases for each function.. You should have a total of 18 test cases. 
do not forget that you need to create the package.json and add the start command to run app.js as the starting script*/


import * as arrayUtils from "./arrayUtils.js";
import * as objUtils from "./objUtils.js";
import * as stringUtils from "./stringUtils.js";


//1
try{
console.log(arrayUtils.mergeCommonElements([1, 2, 3,"  ",'', 5], [1, 8, [2, [[[2],'']]]], [4, 5, 2,3,'']))
}catch(e){ console.log(e)};
try{
console.log(arrayUtils.mergeCommonElements([35, "hello", "24","-3","9",  ["abc", "hello "]], [["62", 4,"24"], 1, 24, -4, "abc"], []))
}catch(e){ console.log(e)};

//2
try{
console.log(arrayUtils.findTriangles([[4,4,4], [3,3,4], [5,4,3]]))
}catch(e){ console.log(e)}
try{
console.log(arrayUtils.findTriangles([[Infinity,5,5],[3,3,3],[4,4,4]]))
}catch(e){ console.log(e)}

//3
try{
console.log(arrayUtils.stringMetrics(["hello", "patrick", "hill", "trees", "seventeen"]))
}catch(e){ console.log(e)}
try{
console.log(arrayUtils.stringMetrics(["red"]))
}catch(e){ console.log(e)}


//4
try {
console.log(stringUtils.emojiCounter("::fish:fire:fire:"))
} catch (e) {console.log(e)}
try {
console.log(stringUtils.emojiCounter("     "))
} catch (e) {console.log(e)}


//5
let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,130.00`;
let currStocks = `GOOG,109.60|AAPL,189.12|amzn,123.75`;
try {
console.log(stringUtils.sortStockPrices(lastStocks, currStocks))
} catch (e) { console.log(e)}
let lastStocks2 = `GME,18.25|AMC, 8.00|GOOG, 34.00`;
let currStocks2 = `GOOG, 7.75|GME, 18.80|AAL, 13.32`;
try {
console.log(stringUtils.sortStockPrices(lastStocks2, currStocks2))
} catch (e) { console.log(e)}


//6
try{
console.log(stringUtils.mashUp("hellaaa", "happy!"))
}catch(e){ console.log(e)}
try{
console.log(stringUtils.mashUp("     ", "      "))
}catch(e){ console.log(e)}

//7
try{
console.log(objUtils.solvePuzzles([{b: 'apple'}], {a: 'house ', b: 'ant', c: 10, d: 50, e:100}))
}catch(e){ console.log(e)}

try{
console.log(objUtils.solvePuzzles([], {a: 'house', b: 'apple', c: 50, d: 100}))
}catch(e){ console.error(e)}

//8
let hand = [{ suit: 'clubs', value: 'K' }, { suit: 'hearts', value: '6' }];
let communityCards = [ { suit: 'clubs', value: 'A' }, { suit: 'clubs', value: 'J' }, { suit: 'clubs', value: '10' }, { suit: 'clubs', value: 'Q' }];
try {
console.log(objUtils.evaluatePokerHand(hand, communityCards))
} catch (e) { console.error(e)}

let hand2 = [{ suit: 'hearts', value: 'A' }];
let communityCards2 = [ { suit: 'diamonds', value: '2' }, { suit: 'spades', value: '5' }, { suit: 'hearts', value: '8' }, { suit: 'clubs', value: '7' }, { suit: 'diamonds', value: '3' },];
try {
console.log(objUtils.evaluatePokerHand(hand2, communityCards2))
} catch (e) { console.error(e)}

//9
try {
console.log(objUtils.combineObjects( [{ a: 4, b: 7, c: 5, d: 4 }, { d: 9, e: 9, a: "apple" }, { a: 12, d: 5 }]))
} catch (e) { console.error(e)}

try {
console.log(objUtils.combineObjects( [{ k: true, ba: 7, c: 5 , d:7, 1:22}, { j: 90, e: 9, a:"apple" ,1:23}, {} ]))
} catch (e) {console.error(e)}
