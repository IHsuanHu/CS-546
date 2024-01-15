import * as lab1 from './lab1.mjs';

//TODO: Write and call each function in lab1.js 5 times each, passing in different input

// make 5 calls to questionOne passing in different inputs
// console.log(typeof lab1.questionOne(["Hero", "best", "farm", "meet"]))
console.log(lab1.questionOne(["Hero", "best", "farm", "meet"])) 
console.log(lab1.questionOne(["Dog", "nice", "clock", "house"]))
console.log(lab1.questionOne(["Book", "test", "find", "know"]))
console.log(lab1.questionOne(["Face", "god", "was", "day"]))
console.log(lab1.questionOne(["visit", "add", "apple", "cat"]))

// make 5 calls to questionTwo passing in different inputs
console.log(lab1.questionTwo({ a: 3, b: 5, c: 1, d: 8 }, { a: 6, b: 4, d: 4, e: 7 })); 
console.log(lab1.questionTwo({ a: 3, x: 2, y: 1 }, { x: 6, b: 5, a: 4 }));
console.log(lab1.questionTwo({'1': true, a: 9, '2': 'gg'}, {'3': true, b: 5, '40': "hi", '4': "bye", '6': 8}));
console.log(lab1.questionTwo({ a: 13, b: 23, t: 10, d: 7 }, { a: 6, f: 5, t: 2, e: 5 }));
console.log(lab1.questionTwo({ a: 1, b: 2, c: 3, r: 6 }, { a: 6, r: 5, c: 4, h: 8 }));

// make 5 calls to questionThree
console.log(lab1.questionThree([[3,3,5], [3,3,2], [6,5,2]])); 
console.log(lab1.questionThree([[4,4,4], [3,5,4], [5,13,12]]))
console.log(lab1.questionThree([[5,5,5], [5,3,4], [5,8,9]]))
console.log(lab1.questionThree([[2,2,2], [3,6,4], [5,7,3]]))
console.log(lab1.questionThree([[3,3,3], [6,3,5], [5,4,7]]))

// make 5 calls to questionFour
console.log(lab1.questionFour('patrick,park,tree,mine'));  
console.log(lab1.questionFour('even,head,bug,length'));
console.log(lab1.questionFour('number,ill,live,height'));
console.log(lab1.questionFour('odd,show,orange,rent'));
console.log(lab1.questionFour('John,tail,find,stay'));