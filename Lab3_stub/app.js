/*
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: 
1. You will need that calls your functions like the example below. 
2. Do not create any other files beside the 'package.json' - meaning your zip should only have the files and folder in this stub and a 'package.json' file.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. DO NOT submit a zip containing your node_modules folder.

import * as authors from "./authors.js");

    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
*/
import * as authors from "./authors.js"
import * as books from "./books.js"


try{
    console.log(await authors.getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c   "))
} catch(e) {
    console.log(e)
}

try {
    console.log(await authors.getAuthorById('bbb3f25b-597e-42cf-adcd-4b6f04c9373@'))
} catch(e){
    console.log(e)
}
try {
    console.log(await authors.getAuthorById(1001))
} catch(e){
    console.log(e)
}


try{
    console.log(await authors.searchAuthorByName("Tom"))
} catch(e) {
    console.log(e)
}
try{
    console.log(await authors.searchAuthorByName('  '))
} catch(e) {
    console.log(e)
}

try{
    console.log(await authors.getBookNames("Prisca", "Vakhonin"))
} catch(e) {
    console.log(e)
}

try{
    console.log(await authors.getBookNames(" ", " "))
} catch(e) {
    console.log(e)
}

try{
    console.log(await authors.getBookNames("Perrine", "Greenough"))
} catch(e) {
    console.log(e)
}

try{
    console.log(await authors.getBookNames())
} catch(e) {
    console.log(e)
}

try{
    console.log(await authors.sameBirthday(9))
} catch(e) {
    console.log(e)
}

try{
    console.log(await authors.sameBirthday(10, 12))
} catch(e) {
    console.log(e)
}

try{
    console.log(await authors.sameBirthday(10, 31))
} catch(e) {
    console.log(e) // only one
}

try{
    console.log(await authors.sameBirthday(9, 15))
} catch(e) {
    console.log(e) // 4 people
}

try {console.log(await authors.youngestOldest())} 
catch(e) {console.log(e)}

try{ console.log(await books.getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"))

} catch(e){
    console.log(e)
}

try{console.log(await books.getBookById(-1))

} catch(e){
    console.log(e)
}

try{console.log(await books.getAuthorName("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"))
} catch(e) {
    console.log(e)
}

try{console.log(await books.getAuthorName())
} catch(e) {
    console.log(e)
}

try{console.log(await books.sameGenre("Memoir"))
} catch(e) {
    console.log(e)
}

try{console.log(await books.sameGenre(123))
} catch(e) {
    console.log(e)
}

try{console.log(await books.sameGenre("aaa"))
} catch(e) {
    console.log(e)
}

try{
    console.log(await books.priceRange(5.99, 30))
} catch(e){
    console.log(e)
}

try{
    console.log(await books.priceRange(-5, 3))
} catch(e){
    console.log(e)
}

try{
    console.log(await books.priceRange(3,3))
} catch(e){
    console.log(e)
}

console.log(await books.getAllBooksWithAuthorName())