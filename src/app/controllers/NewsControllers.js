class NewsControllers {
  // [GET] / news
  index(req, res) {
    res.render('news');
  }

  show(req, res) {
    res.send('New Detall !!!');
  }
}

module.exports = new NewsControllers();
