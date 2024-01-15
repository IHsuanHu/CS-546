#JSON Routes

For this lab, you will create a simple server that will provide data from an API.

For this lab, you will not need to use a database. You will be using the JSON data that you used in lab 3:

[authors.json](https://gist.githubusercontent.com/graffixnyc/a086a55e04f25e538b5d52a095fe4467/raw/e9f835e9a5439a647a24fa272fcb8f5a2b94dece/authors.json)
[books.json](https://gist.githubusercontent.com/graffixnyc/3381b3ba73c249bfcab1e44d836acb48/raw/e14678cd750a4c4a93614a33a840607dd83fdacc/books.json)

For this lab, you must use the ```async/await``` keywords (not Promises). You will also be using axios (Links to an external site.), which is a HTTP client for Node.js; you can install it with ```npm i axios```. 

You can re-use functions you created in lab 3, specifically getting the list of all authors: ```getAuthors()```, getting the list of all books: ```getBooks()```, getting a book by id: ```getBookById(id)``` and getting an author by id: ```getAuthorById(id)```

# General Notes
Lecture videos and demos tend to show JSON as "pretty", but your browser may not natively do that -- that's fine!

There are extensions for most major browsers that add that functionality, such as:

1. [JSONView for Firefox](https://addons.mozilla.org/en-US/firefox/addon/jsonview/)
2. [JSONView for Chrome](https://chrome.google.com/webstore/detail/jsonview/chklaanhfefbnpoihckbnefhakgolnmc?hl=en)

# Folder Structure
You will use the folder structure in the stub for the data & routes module, and other project files. There is an extra file in the stub called helpers.js. You can add all your helper/validation functions in that file to use in your other modules.


# Your routes
## /books
When making a GET request to ```http://localhost:3000/books```, this route will return all the JSON data that is returned from the axios call to ```books.json```.  It will respond with all 1000 books. In your route, you will use the ```res.json()``` method.  Notice that your server will respond with the JSON data, meaning your browser will display it with quotes around the key names. You do not have to do anything special for this, res.json stringifys the object before it sends it to the browser automatically. 

 

Making a request to http://localhost:3000/books. returns (sample output only shows the first 5 books in the data, you would need to return ALL the books:

```
[ 
 {
    "id": "519c733a-6a5d-451f-927d-0e860b5d1e3d",
    "title": "Prime Suspect 3",
    "genres": [
      "Science Fiction"
    ],
    "publicationDate": "3/22/1959",
    "publisher": "Skilith",
    "summary": "Duis consequat dui nec nisi volutpat eleifend. Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.\n\nMauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis. Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.\n\nNullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    "isbn": "445798791-3",
    "language": "Tetum",
    "pageCount": 960,
    "price": 18.35,
    "format": [
      "Paperback"
    ],
    "authorId": "3f8bf018-4b09-4f9d-8206-e079ad314a46"
  },
  {
    "id": "fe64fc98-95ff-4d47-bac8-93c755b85c95",
    "title": "White Hunter, Black Heart",
    "genres": [
      "Travel",
      "Personal Development"
    ],
    "publicationDate": "4/23/1938",
    "publisher": "Podcat",
    "summary": "Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.",
    "isbn": "068799766-6",
    "language": "New Zealand Sign Language",
    "pageCount": 442,
    "price": 56.84,
    "format": [
      "Hardcover",
      "Paperback",
      "E-Book"
    ],
    "authorId": "f36cd039-12da-4747-9bb8-ec8666fe62f3"
  },
  {
    "id": "40913fde-1113-47d7-a4d1-56ccf09ef08e",
    "title": "Bambou",
    "genres": [
      "Guide / How-to"
    ],
    "publicationDate": "4/16/1981",
    "publisher": "Voomm",
    "summary": "Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.\n\nPellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.",
    "isbn": "339021328-7",
    "language": "Guaraní",
    "pageCount": 127,
    "price": 7.83,
    "format": [
      "E-Book"
    ],
    "authorId": "2ddfc0e1-93ef-4ec2-ae77-7d5525305473"
  },
  {
    "id": "cf4c4706-304a-4a90-a0b5-29f8721b439b",
    "title": "Assassination of a High School President",
    "genres": [
      "Personal Development",
      "Bildungsroman",
      "Art",
      "Romance",
      "Dystopian"
    ],
    "publicationDate": "7/28/1945",
    "publisher": "Zoozzy",
    "summary": "Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.\n\nSed ante. Vivamus tortor. Duis mattis egestas metus.",
    "isbn": "336246300-2",
    "language": "Mongolian",
    "pageCount": 50,
    "price": 12.28,
    "format": [
      "Hardcover",
      "Paperback",
      "E-Book"
    ],
    "authorId": "6ff250c1-ddaa-4abc-aeb2-8884a9f49a71"
  },
  {
    "id": "569813c2-237e-4879-a5dc-bf5441d91fd5",
    "title": "Scissere",
    "genres": [
      "Horror"
    ],
    "publicationDate": "5/10/1951",
    "publisher": "Aivee",
    "summary": "Aenean fermentum. Donec ut mauris eget massa tempor convallis. Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.",
    "isbn": "580391603-X",
    "language": "Albanian",
    "pageCount": 842,
    "price": 42.67,
    "format": [
      "Paperback"
    ],
    "authorId": "4de7f77b-dad4-4c05-af13-24f2b1dd4914"
  }, .....more results
]
```
## /books/:id
When making a GET request to ```http://localhost:3000/books/:id```, this route will respond with the JSON data for a single book and should call your getBookById function you created in lab 3. If the ID cannot be found in the List of books (i.e. there is no book with that ID and your getBookById function throws the book not found error)  you will return a 404 status code along with a "Book Not Found!" error message. 

 

So for example:  Making a request to http://localhost:3000/books/5d7a28c2-e076-47c3-a327-cbd123b423f0 returns:
```
{
    "id": "5d7a28c2-e076-47c3-a327-cbd123b423f0",
    "title": "You're Next",
    "genres": [
      "Fiction"
    ],
    "publicationDate": "9/15/1902",
    "publisher": "Thoughtstorm",
    "summary": "Integer ac leo. Pellentesque ultrices mattis odio. Donec vitae nisi.\n\nNam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus.\n\nCurabitur at ipsum ac tellus semper interdum. Mauris ullamcorper purus sit amet nulla. Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.",
    "isbn": "879694960-0",
    "language": "Aymara",
    "pageCount": 2,
    "price": 6.32,
    "format": [
      "Paperback",
      "E-Book",
      "Hardcover"
    ],
    "authorId": "7114a25a-a4b0-470e-8259-78639a046371"
  }
```
## /authors
When making a GET request to ```http://localhost:3000/authors```, this route will return all the JSON data that is returned from the axios call to authors.json.  It will respond with all 500 authors. In your route, you will use the res.json() method.  Notice that your server will respond with the JSON data, meaning your browser will display it with quotes around the key names. You do not have to do anything special for this, res.json stringifys the object before it sends it to the browser automatically. 

 
Making a request to http://localhost:3000/authors returns (sample output only shows the first 5 authors in the data, you would need to return ALL the authors:

```
  [
  {
    "id": "2155574a-80b0-4389-8bb3-3240da52b770",
    "first_name": "Mayer",
    "last_name": "Staddart",
    "date_of_birth": "6/30/1913",
    "HometownCity": "New York City",
    "HometownState": "NY",
    "books": [
      
    ]
  },
  {
    "id": "69b3f32f-5690-49d1-b9a6-9d2dd7d6e6cd",
    "first_name": "Madelaine",
    "last_name": "Armatage",
    "date_of_birth": "4/13/1972",
    "HometownCity": "Pasadena",
    "HometownState": "CA",
    "books": [
      "60a172b9-33fa-4ced-a210-528c723b27de",
      "ade687ed-1ee8-4ee7-bf14-485810f2af16"
    ]
  },
  {
    "id": "4ac1276b-9471-4c52-a138-182746b8b89d",
    "first_name": "Adorne",
    "last_name": "Briant",
    "date_of_birth": "6/13/1937",
    "HometownCity": "Corpus Christi",
    "HometownState": "TX",
    "books": [
      "d14228c6-ce24-4edd-887e-d661dd0832b3"
    ]
  },
  {
    "id": "d6caf59c-f74c-415a-a5c7-d80ecafd1c0b",
    "first_name": "Huberto",
    "last_name": "Kleinmintz",
    "date_of_birth": "4/27/1984",
    "HometownCity": "Fort Pierce",
    "HometownState": "FL",
    "books": [
      "55bd691d-075f-4691-b4b7-3a77794c6335",
      "dd594b3b-43a0-4a71-8e7e-8fdab17d8ad9",
      "6ab1a72a-b93b-40fd-89df-10fcf8c9e2bd",
      "c8628b06-4fbf-4437-af28-f6eb5ac058a4"
    ]
  },
  {
    "id": "6f4b066f-ca50-4ca9-9dd2-5f8ab9c75550",
    "first_name": "Angelia",
    "last_name": "Basterfield",
    "date_of_birth": "6/8/1903",
    "HometownCity": "Juneau",
    "HometownState": "AK",
    "books": [
      "d4589b40-ef17-4ec1-9f1e-3fcba90deefe",
      "90c63a0b-c366-4d32-b471-6590b645e547",
      "a531ccda-6d77-4170-9a6a-aa3eda65fa78"
    ]
  }, ...more results
]
```
## /authors/:id
When making a GET request to ```http://localhost:3000/authors/:id```, this route will respond with the JSON data for a single author and should call your getAuthorById function you created in lab 3. If the ID cannot be found in the List of authors (i.e. there is no author with that ID and your getAuthorById function throws the author not found error)  you will return a 404 status code along with a "Author Not Found!" error message. 

So for example:  Making a request to http://localhost:3000/authors/a7da4a33-75a6-4059-83a6-493c1117fce2 returns:
```
{
    "id": "a7da4a33-75a6-4059-83a6-493c1117fce2",
    "first_name": "Venita",
    "last_name": "Jorck",
    "date_of_birth": "12/12/1978",
    "HometownCity": "Jacksonville",
    "HometownState": "FL",
    "books": [
      "0afd30e8-b6c9-46be-b5d2-3c0678a989e3",
      "d00c78a7-1de8-4a9c-8342-6a92fe872706"
    ]
  }
```
# Packages you will use:

- You will use the express package as your server.
- You will use the axios package to get data from the API.
- You can read up on [express](http://expressjs.com/) to an external site. on its home page. Specifically, you may find the [API Guide section on requests](http://expressjs.com/en/4x/api.html#req) useful.
- You may use the [lecture 5 code](https://github.com/stevens-cs546-cs554/CS-546/tree/master/lecture_05) as a guide.

You must save all dependencies to your package.json file

# Requirements
- You must not submit your node_modules folder
- You must remember to save your dependencies to your package.json folder
- You must remember to update your package.json file to set app.js as your starting script!
- You must submit a zip archive or you will lose points, named in the following format: LastName_FirstName_CS546_SECTION.zip  You will lose points for not submitting an archive.
