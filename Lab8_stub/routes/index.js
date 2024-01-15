//Here you will import route files and export them as used in previous labs
import routes from './characters.js'
import path from 'path'

const constructorMethod = (app) => {
    app.use('/', routes);
 
    // app.get('/about', (req, res) => {
    //   res.sendFile(path.resolve('static/about.html'));
    // });
    // app.use('*', (req, res) => {
    //   res.redirect('/');
    // });
    app.use('*', (req, res) => {
      const title = 'Error'
      const e = 'wrong page'
      return res.status(404).render('error', {title: title, error:e, errorcode:'404 not found'})
    })
  };
  
export default constructorMethod;