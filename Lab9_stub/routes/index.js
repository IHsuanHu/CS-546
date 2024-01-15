//Here you will require route files and export them as used in previous labs.
import routes from './palindromeCheck.js'


const constructorMethod = (app) => {
    app.use('/', routes);
    app.use('*', (req, res) => {
      res.redirect('/');
    });
  };
  
export default constructorMethod;