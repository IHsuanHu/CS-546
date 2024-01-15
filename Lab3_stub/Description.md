# Asynchronous programming
The purpose of this lab is to familiarize yourself with asynchronous programming in JavaScript, as well as using modules from the Node.js Package Manager (npm).

For this lab, you must use the ```async/await``` keywords (not Promise .then syntax or callbacks). You will also be using [axios](https://github.com/axios/axios), which is a HTTP client for Node.js; you can install it with ```npm i axios```.  For this lab and all labs going forward, you can use any package you like from npm! 

Hint:  Some of these functions can be done very easily using built-in array functions, find, filter, map, forEach etc..!

In addition, you must have error checking for the arguments of all your functions. If an argument fails error checking, you should throw a string describing which argument was wrong, and what went wrong.

You will be creating three ```.js``` files: ```authors.js, books.js and app.js```.

Note:  Remember that the order of the keys in the objects does not matter so ```{firstName: "Patrick", lastName: "Hill"}``` is the same as: ```{lastName: "Hill", firstName: "Patrick"}```


# Network JSON Data
You will be downloading JSON files from the following GitHub Gists:

- [authors.json](https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json)
- [books.json](https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json)
For every function you write, you will download the necessary JSONs with ```axios```. DO NOT just save the data into a local file, you MUST use Axios to get the data. Here is an example of how to do so:
```javascript
async function getAuthors(){
  const { data } = await axios.get('https://..gist_url../authors.json')
  return data // this will be the array of author objects
}
```
Instead of making the request in every single function, remember that code reuse is key. So if you see that you are making the same axios request in all of your functions, it's best to put it in a function like noted above and then call that function in all of the functions that need to get the data from whichever json file you're working with.  Always do this when you see you are doing the same thing over and over again in multiple different places.  It's much easier to maintain.  Say if the URL of the file ever changes, then you only need to change it in one place, not 10 different places. 

# authors.js
This file will export the following five functions:

## getAuthorById(id)
This will return the author for the specified id within the ```authors.json``` array.  Note: The ```id``` is case sensitive. Notice you are returning one single object, not an array with an object as an element! Full points will be deducted if you return this as an array! You MUST trim your inputs for this function!

You must check:

- That the ```id```  parameter exists and is of proper type (string).  If not, throw an error.
- If the id exists and is in the proper type but  the ```id``` is not found in the array of authors, throw an 'author not found' error.
- If the ```id``` parameter is just empty spaces, throw an error. 
```javascript
await getAuthorById("1871e6d7-551f-41cb-9a07-08240b86c95c"); 
// Returns:
{
id: '1871e6d7-551f-41cb-9a07-08240b86c95c',
first_name: 'Derward',
last_name: 'Ticic',
date_of_birth: '6/3/1932',
HometownCity: 'Garden Grove',
HometownState: 'CA',
books: ['4efdb199-5a0f-4410-bded-ce07990c6aa4']
}

await getAuthorById(-1); // Throws Error 
await getAuthorById(1001); // Throws Error 
await getAuthorById(); // Throws Error
await getAuthorById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Author not found Error
```
## searchAuthorByName(searchTerm)
For this function, you will return an array of author names whose first or last name contains the ```searchTerm``` provided from ```authors.json```. searchTerm is case in-sensitive so passing in ```"TOM"``` should produce the same results as passing in ```"tom"``` or any mixed case variation. You will return even partial matches.  For example, if you passed in ```"Tom"``` it would return all authors whose first or last name contains ```"Tom"``` like: ```"Tomasutti"``` or ```"Tommy"```.  

You will return an array where each element is the concatenation of the author's first and last name, "Patrick Hill" for example.  You should sort the array by the author's last name.  If there is a tie for last name, you will return whichever appears in the array of data from authors.json first. You MUST trim your inputs for this function!

You must check:

- That the ```searchTerm```  parameter exists and is of proper type (string). If not, throw an error.
- If there are no authors found for the provided ```searchTerm``` , you will throw an error.
- If ```searchTerm``` is just empty spaces, throw an error. 
- The ```searchTerm``` parameter must be case insensitive 
 
```javascript
await searchAuthorByName("Tom"); 
// Returns:
["Tommi Banasevich","Tommy Klemenz", "Loree Tomasutti", "Rianon Tomkins"]
 
await searchAuthorByName("foobar"); // Throws Error since there are no results
await searchAuthorByName(" "); // Throws Error
await searchAuthorByName(123); // Throws Error
await searchAuthorByName(); // Throws Error
```
## getBookNames(firstName, lastName )
For this function, You will return an array of book titles for the author whose first and last name matches the ```firstName``` and ```lastName``` parameters provided.   You will need to read the book ID's from the array of book id's in the author's ```books``` property and then look up the title in ```books.json```.  You will sort the array by book title alphabetically. You MUST trim your inputs for this function!

You must check:

- That the ```firstName``` and ```lastName``` parameters exist and are of proper type (strings). If not, throw an error.
- If there are no authors found for the provided ```firstName``` and ```lastName``` parameters , you will throw an error.
- If either ```firstName``` and ```lastName``` are just empty spaces, throw an error. 
- That the ```firstName``` and ```lastName``` parameters must be case insensitive.
- If the author can be found, but they have not written any books (their books array is empty), you will throw an error.  
```javascript
await getBookNames("Prisca", "Vakhonin");
// Returns 
["Good Thief, The", "Point, The"]

await getBookNames(123,123); // Throws Error 
await getBookNames(" ", " "); // Throws Error
await getBookNames("Patrick", "Hill"); // Throws Error because there is no author Patrick Hill in authors.json
await getBookNames("Perrine", "Greenough"); // Throws Error because while the author can be found, they have written no books
await getBookNames(); // Throws Error
```
## youngestOldest()
This function will return an ```object``` with the youngest and oldest authors by ```date_of_birth``` from ```authors.json```. in the object, you will have the following keys: ```"youngest"``` and ```"oldest"``` and the author's first and last name concatenated as a string as the values for those keys as shown below

```Json
{ youngest: "author_first_name author_last_name", oldest: "author_first_name author_last_name"} 
```

You must not only take the year into account but the month and day!  For example, someone born on September 25th 1975 is older than someone born on December 1st 1975. If there happens to be a tie for either oldest or youngest, you will return an array with the names sorted by last name.  So say for example Patrick Hill and Eduardo Bonelli were tied for being the oldest, both born on the same day in the same year and Jackey Yang was the youngest.  The function would return:

```Json
{ youngest: "Jackey Yang", oldest: ["Eduardo Bonelli", "Patrick Hill"]} 
```
you run the function by running

```javascript
await youngestOldest()
```

Unfortunately, we will not provide the correct answer for this. You will need to figure it out and ensure your results are accurate. :)

## sameBirthday(month, day)
This function will take in the month and day of a birthday: ```sameBirthday(9, 25)```and it will return an array of strings with all of the authors who were born in that month, on that day. You will show each author's first and last name as one string for each author as shown in the output below. You will sort the array by the author's last name. 

You must check:

- That the ```month``` and ```day``` parameters exists and are of proper type (numbers). If not, throw an error. 
- That the ```month``` parameter is 1-12 , if not, throw an error  
- That the ```day``` parameter is valid for that month. i.e. if ```month``` = 9 then ```day``` cannot be >= 31 since there are only 30 days in September.  If ```month``` = 2 then ```day``` cannot be >= 29 since there are only 28 days in February.  (You do not have to take leap year into account).
- If there are no two authors with that same birthday, then throw an error

```javascript
await sameBirthday(10, 12); // Returns: ["Pancho Barradell", "Lauree Henriquet"]
await sameBirthday(9, 31); // Throws Error: There are not 31 days in Sept
await sameBirthday(13, 25); // Throws Error: Month > 12
await sameBirthday(2, 30); // Throws Error: There are not 30 days in Feb
await sameBirthday("09", "31"); // Throws Error: There are not 31 days in Sept and the inputs are strings, not numbers
await sameBirthday(); // Throws Error:
```
# books.js
This file will export five functions:

## getBookById(id)
This will return the Book object for the specified id within the ```books.json``` array.  Note: The ```id``` is case sensitive. Notice you are returning one single object, not an array with an object as an element! Full points will be deducted if you return this as an array!  You MUST trim your inputs for this function!

You must check:

- That the ```id``` parameter exists and is of proper type (string).  If not, throw an error.
- If the id exists and is in the proper type but the ```id``` is not found in the array of books, throw a 'book not found' error.
- if the ```id``` parameter is just empty spaces, throw an error.

```Javascript
await getBookById("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"); 
// Returns: 
{   
  id: '99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e',   
  title: 'No habrá paz para los malvados',   
  genres: ['Art', 'Travel'],   
  publicationDate: '5/7/2018',   
  publisher: 'Avamm',   
  summary:   'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem. Quisque ut erat.\n\nCurabitur gravida nisi at nibh. In hac habitasse platea dictumst. Aliquam augue quam, sollicitudin vitae, consectetuer eget, rutrum at, lorem.\n\nInteger tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.',   
  isbn: '520476104-7',   
  language: 'Finnish',   
  pageCount: 693,   
  price: 25.66,   
  format: ['E-Book', 'Hardcover', 'Paperback'],   
  authorId: 'f645d28a-670a-457a-b55f-a32876b8511d' 
}

await getBookById(-1); // Throws Error 
await getBookById(1001); // Throws Error 
await getBookById();// Throws Error
await getBookById('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws book not found Error
```
## getAuthorName(bookId)
This will return a string of the name of the author for the bookId provided.  You will first have to get the author id from the ```books.json``` array from the book with the ```bookId``` provided. Then, find that author in ```authors.json``` and return the author's first and last name as a concatenated string.  Note: The ```bookId``` is case sensitive. You MUST trim your inputs for this function!

You must check:

- That the ```bookId``` parameter exists and is of proper type (string).  If not, throw an error.
- If the ```bookId``` exists and is in the proper type but the ```bookId``` is not found in the array of books, throw a 'book not found' error.
- If the ```bookId```  parameter is just empty spaces, throw an error. 

```Javascript
await getAuthorName("99875ad8-a1d3-42ea-8d7b-5ac4cd4edb9e"); 
// Returns: 
"Brooke Adcock"

await getAuthorName(-1); // Throws Error 
await getAuthorName(1001); // Throws Error 
await getAuthorName(); // Throws Error
await getAuthorName('7989fa5e-5617-43f7-a931-46036f9dbcff');// Throws Book not found Error
```

## sameGenre(genre)
For this function, you will return an array of books that have the provided genre as one of their genres. The sort order of the array will be the same order they appear in the original books array json data. You MUST trim your inputs for this function!

You must check:

- That ```genre``` parameter exists and is of the proper type (string). If not, throw an error.
- You must check to make sure that the ```genre``` parameter is not just empty spaces:  If it is, throw an error.
- If there are no books that have the provided ```genre``` in ```books.json``` for the supplied ```genre``` parameter, then throw an error.
- The ```genre``` parameter must be case insensitive 
The output sample below only shows the first 5 results. You must return ALL the book objects from the array of books in books.json that match the ```genre``` supplied to the function. 

```Javascript
await sameGenre("Memoir");
// Returns Note the first 5 results are shown below and is not the complete results. you MUST return ALL books with a genre that matches the supplied genre.
[   
  {     
    id: '4c96d4d1-07bb-4b9f-a0c8-7dcd6db08919',     
    title: 'Evil Dead, The',     
    genres: ['Fiction', 'Dystopian', 'Memoir'],     
    publicationDate: '11/6/1905',     
    publisher: 'Nlounge',     
    summary:   'In congue. Etiam justo. Etiam pretium iaculis justo.\n\nIn hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.\n\nNulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',     
    isbn: '655529672-0',     
    language: 'Fijian',     
    pageCount: 608,     
    price: 15.47,     
    format: ['Hardcover', 'Paperback'],     
    authorId: 'ff58ae27-6e52-4231-8ae5-daa957eebac3'   
  },   
  {     
    id: 'd29f81b9-0959-4294-af5a-2182dc2cc1c5',     
    title: 'How to Succeed in Business Without Really Trying',     
    genres: ['Memoir', 'Families & Relationships'],     
    publicationDate: '4/20/1969',     
    publisher: 'Livetube',     
    summary:   'Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.',     
    isbn: '305091194-8',     
    language: 'Moldovan',     
    pageCount: 22,     
    price: 15.79,     
    format: ['Paperback'],     
    authorId: '170e2509-cc12-461b-997e-cae0e1e1fc79'   
  },   
  {     
    id: '8807d3d1-c148-4989-8298-fcffd9be14a6',     
    title: 'Fire-Eater (Tulennielijä)',     
    genres: ['Memoir', 'Gothic', 'Romance'],     
    publicationDate: '1/9/1943',     
    publisher: 'Riffpath',     
    summary:   'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.\n\nNullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris.\n\nMorbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.',     
    isbn: '827138859-2',     
    language: 'Catalan',     
    pageCount: 203,     
    price: 27.38,     
    format: ['Paperback', 'E-Book'],     
    authorId: '8db08c4b-7983-4518-9a33-bef0994d925d'   
  },   
  {     
    id: '0767b967-15d6-4c00-9e7d-c69a236e62b0',     
    title: 'Fun on a Weekend',     
    genres: ['Fiction', 'Health', 'Memoir', 'Cookbook', 'Dystopian'],     
    publicationDate: '12/8/1959',    
    publisher: 'Rhycero',     
    summary:   'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.\n\nMaecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.\n\nMaecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',     
    isbn: '130952361-4',     
    language: 'Yiddish',     
    pageCount: 410,     
    price: 0.01,     
    format: ['Hardcover'],     
    authorId: 'f645d28a-670a-457a-b55f-a32876b8511d'   
  },   
  {     
    id: '98d3872c-67f2-4192-ab8e-e7686c58ced6',     
    title: 'Cat Returns, The (Neko no ongaeshi)',     
    genres: ['Self-help', 'Health', 'Memoir', 'Mystery', 'Travel'],     
    publicationDate: '11/3/1926',     
    publisher: 'Mynte',     
    summary:   'Vestibulum quam sapien, varius ut, blandit non, interdum in, ante. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Duis faucibus accumsan odio. Curabitur convallis.\n\nDuis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.',     
    isbn: '995366437-4',     
    language: 'Dari',     
    pageCount: 761,     
    price: 78.73,     
    format: ['Paperback', 'E-Book'],     
    authorId: '68485131-aadd-4e22-a2b7-bd39977e2949'   
  } 
]; 
await sameGenre(-1); // Throws Error 
await sameGenre(1001); // Throws Error 
await sameGenre();// Throws Error
await sameGenre(false)// throws error 
await sameGenre('foo bar');// Throws Error
```

## priceRange(min, max)
For this function, you will return an array of books that have a price within the ```min``` and ```max``` ranges (inclusive of the ```min``` and ```max``` values). The sort order of the array will be the same order they appear in the original books array json data.

You must check:

- That the ```min``` and ```max``` parameters exist and are of the proper type (numbers). If not, throw an error.
- You must check to make sure that the ```min``` parameter is less than the ```max``` parameter:  If it is not, throw an error.
- ```min``` can be any positive number including 0
- ```max``` can be any positive number (but still must be greater than the value for ```min```)
- If there are no books within the price range given for ```min``` and ```max```, then throw an error.
The output sample below only shows the first 5 results. You must return ALL the book objects from the array of books in books.json with a price in the range supplied for ```min```/```max``` to the function. 

```Javascript
await priceRange(5.99, 30);
// Returns Note the first 5 results are shown below and is not the complete results. you MUST return ALL books with a price in the range supplied for min/max.
[   
  {     
    id: '519c733a-6a5d-451f-927d-0e860b5d1e3d',     
    title: 'Prime Suspect 3',     
    genres: ['Science Fiction'],     
    publicationDate: '3/22/1959',     
    publisher: 'Skilith',     
    summary:   'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',     
    isbn: '445798791-3',     
    language: 'Tetum',     
    pageCount: 960,     
    price: 18.35,     
    format: ['Paperback'],     
    authorId: '3f8bf018-4b09-4f9d-8206-e079ad314a46'   
  },   
  {     
    id: '40913fde-1113-47d7-a4d1-56ccf09ef08e',     
    title: 'Bambou',     
    genres: ['Guide / How-to'],     
    publicationDate: '4/16/1981',     
    publisher: 'Voomm',     
    summary:   'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',     
    isbn: '339021328-7',     
    language: 'Guaraní',     
    pageCount: 127,     
    price: 7.83,     
    format: ['E-Book'],     
    authorId: '2ddfc0e1-93ef-4ec2-ae77-7d5525305473'   
  },   
  {     
    id: 'cf4c4706-304a-4a90-a0b5-29f8721b439b',     
    title: 'Assassination of a High School President',     
    genres: ['Personal Development', 'Bildungsroman', 'Art', 'Romance', 'Dystopian'],     
    publicationDate: '7/28/1945',     
    publisher: 'Zoozzy',     
    summary:   'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',     
    isbn: '336246300-2',     
    language: 'Mongolian',     
    pageCount: 50,     
    price: 12.28,     
    format: ['Hardcover', 'Paperback', 'E-Book'],     
    authorId: '6ff250c1-ddaa-4abc-aeb2-8884a9f49a71'   
  },   
  {     
    id: 'f3eabffa-0ea9-48e2-b25d-2711c91a035e',     
    title: 'Next Karate Kid, The',     
    genres: ['Bildungsroman'],     
    publicationDate: '6/20/1929',     
    publisher: 'Centizu',     
    summary:   'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.\n\nAliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',     
    isbn: '104100623-3',     
    language: 'Tajik',     
    pageCount: 618,     
    price: 13.63,     
    format: ['Hardcover', 'E-Book'],     
    authorId: 'd8d43bcb-285b-492b-a3eb-d599563b6e8e'   
  },   
  {     
    id: '04e55bc9-0c7a-47a6-a403-52eabf25c6ef',     
    title: 'Shattered Image',     
    genres: ['Mystery'],     
    publicationDate: '5/30/2004',     
    publisher: 'Tekfly',     
    summary:   'Quisque id justo sit amet sapien dignissim vestibulum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Nulla dapibus dolor vel est. Donec odio justo, sollicitudin ut, suscipit a, feugiat et, eros.\n\nVestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.\n\nIn congue. Etiam justo. Etiam pretium iaculis justo.',     
    isbn: '214788141-4',     
    language: 'Ndebele',     
    pageCount: 439,     
    price: 15.91,     
    format: ['Paperback', 'Hardcover'],     
    authorId: 'cd66289a-dd71-4130-b2bc-19723cf0fa08'   
  }, 
]; 

await priceRange("foo", 12); // Throws Error
await priceRange(5, 3); // Throws Error:
await priceRange(-5, 3); // Throws Error: 
await priceRange(); // Throws Error:
```

## getAllBooksWithAuthorName()
For this function, you will return an array of ALL 1000 books from ```books.json```.  However, with a catch!  In the books array in ```books.json```, only the author ID is contained in the book data. Instead of displaying the author ID in the books data, you will display the author's name from ```authors.json```.  You will NOT return the author id at all in the data, just the author's name using the key ```author```!

for example this is a single book object in books.json: (note the example below shows it how it appears in the actual JSON file with quotes around the key names. When axios gets the data, it returns it parsed from a JSON object, to a native JS Object without the quotes around the keys)

```Javascript
{
    "id: "519c733a-6a5d-451f-927d-0e860b5d1e3d",
    "title": "Prime Suspect 3",
    "genres": ["Science Fiction"],
    "publicationDate": "3/22/1959",
    "publisher": "Skilith",
    "summary": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    "isbn": "445798791-3",
    "language": "Tetum",
    "pageCount": 960,
    "price": 18.35,
    "format": ["Paperback"],
    "authorId": "3f8bf018-4b09-4f9d-8206-e079ad314a46"
}
```

But you would return it in the array of all 1000 books as:

```Javascript
{
    id: "519c733a-6a5d-451f-927d-0e860b5d1e3d",
    title: "Prime Suspect 3",
    genres: ["Science Fiction"],
    publicationDate: "3/22/1959",
    publisher: "Skilith",
    summary: "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    isbn: "445798791-3",
    language: "Tetum",
    pageCount: 960,
    price: 18.35,
    format: ["Paperback"],
    author: "Pris Osmond"
}
```

Notice that the authorId property has been deleted and there is now an author property that contains a string with the concatenation of the author's first and last name. 

```Javascript
await getAllBooksWithAuthorName();
// Returns Note the first 5 results are shown below and is not the complete results. you MUST return ALL 1000 books!
[
  {     
    id: '519c733a-6a5d-451f-927d-0e860b5d1e3d',     
    title: 'Prime Suspect 3',     
    genres: ['Science Fiction'],     
    publicationDate: '3/22/1959',     
    publisher: 'Skilith',     
    summary:   'Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',     
    isbn: '445798791-3',     
    language: 'Tetum',     
    pageCount: 960,     
    price: 18.35,     
    format: ['Paperback'],     
    author: 'Pris Osmond'   
  },   
  {     
    id: 'fe64fc98-95ff-4d47-bac8-93c755b85c95',     
    title: 'White Hunter, Black Heart',     
    genres: ['Travel', 'Personal Development'],     
    publicationDate: '4/23/1938',     
    publisher: 'Podcat',     
    summary:   'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.',     
    isbn: '068799766-6',     
    language: 'New Zealand Sign Language',     
    pageCount: 442,     
    price: 56.84,     
    format: ['Hardcover', 'Paperback', 'E-Book'],     
    author: 'Marve Grinham'   
  },   
  {     
    id: '40913fde-1113-47d7-a4d1-56ccf09ef08e',     
    title: 'Bambou',     
    genres: ['Guide / How-to'],     
    publicationDate: '4/16/1981',     
    publisher: 'Voomm',     
    summary:   'Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.',     
    isbn: '339021328-7',     
    language: 'Guaraní',     
    pageCount: 127,     
    price: 7.83,     
    format: ['E-Book'],     
    author: 'Malia Look'   
  },   
  {     
    id: 'cf4c4706-304a-4a90-a0b5-29f8721b439b',     
    title: 'Assassination of a High School President',     
    genres: ['Personal Development', 'Bildungsroman', 'Art', 'Romance', 'Dystopian'],     
    publicationDate: '7/28/1945',     
    publisher: 'Zoozzy',     
    summary:   'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.',     
    isbn: '336246300-2',     
    language: 'Mongolian',     
    pageCount: 50,     
    price: 12.28,     
    format: ['Hardcover', 'Paperback', 'E-Book'],     
    author: 'Kellie Breznovic'   
  },   
  {     
    id: '569813c2-237e-4879-a5dc-bf5441d91fd5',     
    title: 'Scissere',     
    genres: ['Horror'],     
    publicationDate: '5/10/1951',     
    publisher: 'Aivee',     
    summary:   'Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.',     
    isbn: '580391603-X',     
    language: 'Albanian',     
    pageCount: 842,     
    price: 42.67,     
    format: ['Paperback'],     
    author: 'Axe Preble'   
  },
]
```

# app.js
This file is where you will import your functions from the two other files and run test cases on your functions by calling them with various inputs.  We will not use this file for grading and is only for your testing purposes to make sure:

1. Your functions in your 2 files are exporting correctly.

2. They are returning the correct output based on the input supplied (throwing errors when you're supposed to, returning the right results etc..).

Note: We can use top level await in our app.js!

```Javascript
import * as authors  from "./authors.js";


    try{
        const authorData = await authors.getAuthors();
        console.log (authorData);
    }catch(e){
        console.log (e);
    }
```

# Requirements
1. Write each function in the specified file and export the function so that it may be used in other files.
2. Ensure to properly error check for different cases such as arguments existing and of the proper type as well as throw if anything is out of bounds such as invalid array index or negative numbers for different operations.
3. Submit all files (including package.json) in a zip with your name in the following format: LastName_FirstName.zip.
4. Make sure to save any npm packages you use to your package.json.
5. DO NOT submit a zip containing your node_modules folder.
