class ProfilesControllers {
  index(req, res) {
    res.render('profiles');
  }
}

module.exports = new ProfilesControllers();
