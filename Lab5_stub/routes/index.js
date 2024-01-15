//An index file that returns a function that attaches all your routes to your app
//Lecture Code Refernece -> https://github.com/stevens-cs546-cs554/CS-546/blob/master/lecture_05/routes/index.js

import books from './books.js'
import authors from './authors.js'

const constructorMethod = (app) => {
    app.use('/books', books);
    app.use('/authors', authors);

    app.use('*', (req, res) => {
        res.status(404).json({error: 'Not found'});
    })
};

export default constructorMethod;