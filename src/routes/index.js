const newsRouter = require('./news');
const profilesRouter = require('./profiles');
const siteRouter = require('./site');
const courseRouter = require('./courses');
const meRouter = require('./me');


function route(app) {
  app.use('/', siteRouter);

  app.use('/courses', courseRouter);

  app.use('/me', meRouter);
  app.use('/news', newsRouter);

  app.use('/profiles', profilesRouter);
}

module.exports = route;
