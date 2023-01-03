const Course = require('../models/Course')
const { mongooseToObject, mutipleMongooseToObject } = require('../../until/mongooes')

class MeControllers {
  // [GET] / stored courses

  storedCourses(req, res, next) {

    Promise.all([Course.find({}), Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) =>
        res.render('me/stored-courses', {
          deletedCount,
          courses: mutipleMongooseToObject(courses)
        })
      )
      .catch(next);
  }

  // [GET] / trash courses
  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then(courses => res.render('me/trash-courses', {
        courses: mutipleMongooseToObject(courses)
      }))
      .catch(next)
  }
}

module.exports = new MeControllers();
