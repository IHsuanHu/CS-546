# Start to play Javascript
The purpose of this lab is to familiarize yourself with Node.js modules and further your understanding of JavaScript syntax.

In addition, you must have error checking for the arguments of all your functions. If an argument fails error checking, you should throw a string describing which argument was wrong, and what went wrong. You can read more about error handling on the [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw).

# Initializing a Node.js Package
For all of the labs going forward, you will be creating Node.js packages, which have a ```package.json```. To create a package, simply create a new folder and within that folder, run the command ```npm init```. When it asks for a package name, name it cs-546-lab-2. You may leave the version as default and add a description if you wish. The entry file will be ```app.js```.

All of the remaining fields are optional except author. For the author field, you must specify your first and last name, along with your CWID. In addition, You must also have a start script for your package, which will be invoked with ```npm start```. You can set a start script within the scripts field of your ```package.json```. Also add the ```"type": "module"``` property to the ```package.json```.

Here's an example of a valid package.json:
```Json
{
   "name": "cs-546-lab-2",
   "version": "1.0.0",
   "description": "My lab 2 module",
   "main": "app.js",
   "type": "module",
   "scripts": {
      "start": "node app.js"
   },
   "author": "John Smith 12345678",
   "license": "ISC"
}
```
General requirement for ALL functions that take in a string/strings as input:  You need to trim input strings using the trim function! (except for mergeCommonElements which states spaces in the string are ok)  A string with just spaces is not usually valid input! You will be expected to trim all string inputs from lab 2 forward unless the specs for that function say spaces or untrimmed strings are ok. 
# arrayUtils.js
This file will export 3 functions, each of which will pertain to arrays.

## mergeCommonElements(...args)
For this function, you will have to take into account a variable number of input parameters. You will take in arrays as input.  You will merge only the elements that are common to every array into one array.  You will sort that array numerically first, and then alphabetically (if there are strings in the array). If you called ```mergeCommonElements([3,0,4,5,1], [1,2,0,8,15,3], [6,3,10,25,1,29,0])```. You would return: ```[0,1,3]```. If you called ```mergeCommonElements[3,0,25, 29,"Lab2",2,"Aiden"], ["CS-546" ,”Lab2”,25, "Computer Science",29, 8,15], [6,3,"Patrick",”Lab2”,25,29])``` You would return:  ```[25, 29, “Lab2”]```.

For the elements that are strings, you will use the ASCII sort order to sort them For example: ["!Patrick","Aiden","CS-546","Computer Science", "Lab2"] would be sorted in ASCII order.

You must also account for nested array cases For example: If you called

```mergeCommonElements(["bar", 0, 8, 1, [[[5, “fizz”, "foo"]]]], [7, “foo”, "buzz", ["fizz", 8]])```

You would return:

```[8, “fizz”, "foo"]```

You must check:

- At least TWO arrays are supplied as input
- Each input is of proper type (meaning, it's an array)
- Each array is not empty and has at least one element
- Each array element is either a string,  number or an array that has either strings or numbers as elements. You will need to flatten the array first (strings with just spaces are allowed as a space can be sorted using the ASCII sort order method).  
If any of those conditions fail, you will throw an error.

While you are required to trim all string inputs for most of the functions, this one does not need to be trimmed as a string with just spaces is valid for this function 
```javascript
mergeCommonElements([3, 4, 1, -2, -4], [3, 45, 1, 24, -4], [112, "-4", 0, 1, 3,]) //returns [1, 3]
mergeCommonElements([35, "hello", 24,  ["abc", 7], 3, -4], [3, ["62", 4], 1, 24, -4, "abc"]) //returns [-4, 3, 24, "abc"]
mergeCommonElements([5, 3, "apple", "banana"], [5, "banana", 2, 4], [1, 5, "apple", "banana", 0]) // returns [5, "banana"]
mergeCommonElements([4, [5, "apple"], 3], [3, 4, [5, "apple"]], [3, "apple", 6, 7]) // returns [3, "apple"]
mergeCommonElements(["apple", "apple"], ["apple", "apple", "banana"], ["apple", "apple", "mango"]) // returns ["apple"]
mergeCommonElements([1, 2, 3], "string", [4, 5, 6]) // throws an error
mergeCommonElements([1, 2, 3], [], [4, 5, 6]) // throws an error
```
## findTriangles(array)
For this function, we are going to expand on the triangle function from lab 1. you will take in an array of arrays (a 2d array). Each array will contain 3 numbers, which represent the 3 sides of a triangle. You will return an object that has the area, perimeter, and the type of triangle for each triangle. You only have to consider equilateral, isosceles, and scalene triangles, you do not need to consider angle types (obtuse, acute, and right triangles). Round the area to the nearest 2 decimal places. In addition, you will need to check to ensure that each array actually contains a valid triangle.

The keys of the object will correspond to the index of each triangle in the original array. The value of each key will be an array containing the area and perimeter, in that order. For example -> [area, perimeter, triangleType] would be the correct order for a valid triangle. 

You must check:

- That the argument is an array of arrays (a 2d array)
- That each subarray contains only numbers
- That each subarray is a valid triangle 
If any of those conditions fail, you will throw an error.
```javascript
findTriangles([[3,3,3], [3,3,4], [5,4,2]])   // returns {'0': [3.9,9, "equilateral"], '1': [4.47,10, "isosceles"], '2': [3.8,11, "scalene"]}
findTriangles([[7,5,5], [2,4,3], [12,12,11]])   // returns {'0': [12.5, 17, "isosceles"], '1': [2.90, 9, "scalene"], '2': [58.66,35, "isosceles"]}
findTriangles([5, 5, 5]) // throws an error
```
## stringMetrics(array)
You will take in an array of 2 or more strings as arguments and compile the following data:

- The number vowels
- The number of consonants
- Longest string
- Shortest string
- Mean/median/mode of the numeric lengths of each string. Round mean to the nearest 2 decimal places.
You will return that data in object structured like the following:
```javascript
{vowels: 30, consonants: 9, longest: “helloworld”, shortest: “yes”, mean: 7, median:  9, mode : 4}
```
If there is more than one string tied for shortest/longest, you will return an array containing all of those strings like the following:
```javascript
{vowels: 30, consonants: 9, longest: “helloworld”, shortest: [“yes”, “may”],  mean: 7, median:  9, mode : 4}
```
If there is more than one mode, return an array sorted in ascending order with each of the modes. If there is no mode, set the mode key value in the object to null.

You must check:

- That the argument is an array
- The array contains only strings 
- That there are at least two strings in the array.
- No strings with just empty spaces are valid
If any of those conditions fail, you will throw an error.
```javascript
stringMetrics(["hello", "patrick", "hill", "trees", "seventeen"]) //returns {vowels: 11, consonants: 19, longest: "seventeen", shortest: "hill", mean: 6, median:  5, mode: 5}
stringMetrics(["john", "rob", "stark", "aegon"]) //returns {vowels: 6, consonants: 11, longest: ["aegon", "stark"], shortest: "rob", mean: 4.25, median:  4.5, mode: 5}
stringMetrics(["apple"]) // throws an error
```
# stringUtils.js
This file will export 3 functions, each are useful functions when dealing with strings in JavaScript.

## emojiCounter(message)
Write a function named emojiCounter that takes a single string message as an argument. This function should return the number of valid emojis present in the string. A valid emoji is represented as text enclosed within colons (e.g., `:fire:` would be a valid emoji representation). Each colon can only serve as a delimiter for a single emoji (no whitespaces could be inside an emoji).

For the sake of this lab, assume that any string between two semicolons has a corresponding emoji (`:stevens:` or `:cs546:` are considered valid emojis). There is no such thing as an empty emoji (::).

You must check:

- message exists and is of proper type (string).
- message is not just an empty string with spaces. 
If any of those conditions fail, you will throw an error.
```javascript
emojiCounter(":fire::fire:"); // Should return 2
emojiCounter(":::fire:fire:"); // Should return 1
emojiCounter(":fire::pregnant_man::fire:"); // Should return 3
emojiCounter("I am so happy :joy::joy: about scoring a :100: on my test! I feel :fire:! But ::100: doesn't count. Neither does :joy::100: in a row."); // Should return 7
emojiCounter("Today was :sunny::sunny:::rainy::sunny:::sunny:rainy::sunny::rainy:::sunny:::rainy:sunny:!"); // Should return 9
emojiCounter("::"); // Should return 0
emojiCounter("             "); // Throws error
```
## sortStockPrices(lastStocks, currStocks)
For this function, you take in two comma-separated value (CSV) string variables as input representing stocks and their prices from last week and this week. Each string will have the same format: a stock ticker(which is just any combination of letters A-Z that is 1-5 characters long) followed by a number representing the stock's price. Each stock ticker/price combination will be separated by a “|” character. Stock tickers are case insensitive (i.e. "amc" is equivalent to "AMC").

The two arguments passed into the function must contain the same stocks. You will merge the two strings into an array of objects where each object contains the stock symbol, current price (from currStocks), and their percent change (%) while only displaying 1 decimal place. You will sort this array by the percentage difference in price between the two strings.

You must check:

- That both arguments passed in exist and are of valid type (string)
- That each string contains the same stocks (case-insensitive)
- The stockTicker only contains letters (a-z) and are 1-5 characters long
- The stockPrice is valid string representation of a number
- That each string is in the proper format (stockTicker,stockPrice|stockTicker,stockPrice,|stockTicker,stockPrice)
If any of those conditions fail, you will throw an error.
```javascript
let lastStocks = `AAPL,175.25|GOOG,135.40|AMZN,140.00`;
let currStocks = `amzn,136.75|GOOG,135.60|AAPL,180.12`;
sortStockPrices(lastStocks, currStocks) // returns [{symbol: "AAPL", price: 180.12, change: 2.8 }, {symbol: "GOOG", price: 135.60, change: 0.1}, {symbol: "AMZN", price: 136.75, change: -2.3}]

let lastStocks = `GME,18.25|AMC, 8.00|PFE, 34.00`;
let currStocks = `amc, 7.75|GME, 18.80|AAL, 13.32`;
sortStockPrices(lastStocks, currStocks) // throws an error
```
## mashUp(string1, string2)
Given ```string1``` and ```string2```  return the concatenation of the two strings, separated by a space  and swapping the first 4 characters of each. 

You must check:

- That both strings exist
- The strings  are of the proper type
- The length of each string is at least 4 characters.
- That both strings are not just strings with empty spaces.
If any of those conditions fail, the function will throw an error.
```javascript
mashUp("Patrick", "Hill"); //Returns "Hillick Patr"
mashUp("helloooo", "world!"); //Returns "worloooo helld!"
mashUp("Patrick", ""); //Throws error
mashUp(); // Throws Error
mashUp("John") // Throws error
mashUp ("h", "Hello") // Throws Error
mashUp ("h","e") // Throws Error
```
# objUtils.js
This file will export 3 functions that are useful when dealing with objects in JavaScript.

## solvePuzzles(puzzles, pieces)
This function will have two arguments. The first is puzzles, which contains an array of objects. The second is an argument pieces, which is an object. 

Each object in the puzzles array contains an incomplete puzzle missing 1 or more pieces. A puzzle is considered “complete” when it has keys a, b, c, d, e. Therefore, each object in puzzles will be missing 1 or more of these keys.

The pieces object will contain the missing pieces. You must take each missing piece and figure out which incomplete puzzle it belongs to, and add that piece to the puzzle object. You may re-use the missing puzzle pieces for completing multiple puzzles. You will return an array that contains all of the completed puzzle objects.

You must check:

- That puzzles exists and is of valid type (array)
- That puzzles is not an empty array
- That puzzles contains only objects, with at least one key/value in each object supplied
- That pieces is an object that has at least one key/value.
- That each puzzle object in the puzzles array and each pieces object contains only the keys a-e
If any of those conditions fail, you will throw an error.

Examples:
```javascript
solvePuzzles([{a: 23, b: 17, d: 2}, {b: 17, d: 3, e: “hello”}], {a: 45, b: 60, c:-3, d: 88, e: 12}) //returns [{a: 23, b: 17, c:-3, d: 2, e:12}, {a:45, b: 17, c:-3, d: 3, e: “hello”} ]

solvePuzzles([{b: “tree”, d: “patrick”}], {a: “house”, b: “apple”, c: 50, d: 100, e:200}) //returns [{a: “house”,b: “tree”, c: 50, d: “patrick”, e:200}]

solvePuzzles([{b: “tree”, d: “patrick”}], {a: “house”, b: “apple”, c: 50, d: 100, f:200}) //returns error
```
## evaluatePokerHand(hand, communityCards)
Write a function that takes two arrays as inputs. The first array represents the player’s hand (2 cards), and the second array represents the “community cards” on the table (3 to 5 cards). Each card is an object with two properties: suit and value. The function should evaluate the best possible Poker hand that can be made using the player’s hand and the community cards and return a string describing that hand.

For this lab, you don’t need to know the full rule book of Poker. You only need to know the following Poker hands ranked from highest to lowest:

- Straight flush
- Three of a Kind
- Pair
- High Card
Each suit is as good as any other (i.e., no suit is ranked higher than another). A better look at different Poker hands hereLinks to an external site.. 

You must check:

- hand exists and has exactly two cards.
- communityCards exists and has three to five cards.
- every card object in both hand and communityCards has only suit and value.
- suit has to be string and could only be one of the following values:  ``` 'hearts','clubs','diamonds','spades' ```
- value has to be string and can ONLY be one of the following values. ``` '2', '3', '4','5','6','7','8','9', '10', 'J', 'Q', 'K', 'A' ```.
- evaluatePokerHand() has to return a string; it could be one of the following: ``` 'High Card', 'Pair', 'Three of a Kind', 'Straight Flush ```
If any of those conditions fail, you will throw an error.
```javascript
let hand = [{suit: 'hearts', value: '2'}, {suit: 'hearts', value: '3'}];
let communityCards = [
  {suit: 'hearts', value: '4'},
  {suit: 'hearts', value: '5'},
  {suit: 'hearts', value: '6'}
];
evaluatePokerHand(hand, communityCards); // Returns "Straight Flush"

let hand = [{suit: 'hearts', value: '5'}, {suit: 'clubs', value: '5'}];
let communityCards = [
  {suit: 'diamonds', value: '4'},
  {suit: 'spades', value: '5'},
  {suit: 'hearts', value: '2'},
  {suit: 'clubs', value: 'J'},
  {suit: 'diamonds', value: 'Q'}
];
evaluatePokerHand(hand, communityCards); // Returns "Three of a Kind"

let hand = [{suit: 'hearts', value: '4'}, {suit: 'clubs', value: '9'}];
let communityCards = [
  {suit: 'diamonds', value: '2'},
  {suit: 'spades', value: '5'},
  {suit: 'hearts', value: '6'},
  {suit: 'clubs', value: '7'},
  {suit: 'diamonds', value: '8'}
];
evaluatePokerHand(hand, communityCards); // Returns "High Card"
```
## combineObjects(array)
Given a variable amount of objects within an array, you will find all of the common keys that appear in all of the objects in the array. Then, you will  return a new object with all these common keys, where the value of each of those keys is an array that contains the values of each key. The values must be ordered in the same order that their respective objects are in from the original array that is passed into combineObjects(). If there are no common keys, you will return an empty object.

You must check:

- That the argument type an array. 
- That the array contains at least two objects
- That each object has at least 1 key/value.  
If these conditions are not met, you will throw an error.
```javascript
combineObjects(
[  { a: 3, b: 7, c: 5 , d:7},
  { d: 4, e: 9, a:"apple" },
  { a: 8, d: 2 } ]
);

/* Returns:
{
  a: [3, "apple", 8]  
  d: [7,4,2]
}
->Notice that the order of the values in a and d are the same as their original object’s order. 
*/

combineObjects(
[  { j: true, ba: 7, c: 5 , d:7},
  { j: 90, e: 9, a:"apple" },
  { j: 15, dd: 2 } ]
);

/* Returns:
{
  j: [true, 90, 15]  
}
*/


combineObjects(
[  { k: true, ba: 7, c: 5 , d:7},
  { j: 90, e: 9, a:"apple" },
  { j: 15, dd: 2 } ]
);

/* Returns:
{}
*/
```

# Testing
In your ```app.js``` file, you must import all the functions the modules you created above export and create one passing and one failing test case for each function in each module. So you will have a total of 18 function calls (there are 9 total functions)

For example: (these are just generic function call examples, you would use the functions that you created, specified above)

```javascript
try {
   // Should Pass
   const meanOne = mean([2, 3, 4]);
   console.log('mean passed successfully');
} catch (e) {
   console.error('mean failed test case');
}
try {
   // Should Fail
   const meanTwo = mean(1234);
   console.error('mean did not error');
} catch (e) {
   console.log('mean failed successfully');
}
```
# Requirements
Write each function in the specified file and export the function so that it may be used in other files.

Ensure to properly error check for different cases such as arguments existing and of the proper type as well as throw if anything is out of bounds such as invalid array index.

Import ALL exported module functions and write 2 test cases for each in ```app.js```.

Submit all files (including ```package.json```) in a zip with your name in the following format: LastName_FirstName.zip.

do NOT have the files in any folders, they should be in the root of the zip file

You are not allowed to use any npm dependencies for this lab.
