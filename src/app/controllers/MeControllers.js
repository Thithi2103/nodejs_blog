const Course = require('../models/Course')
const { mongooseToObject, mutipleMongooseToObject } = require('../../until/mongooes')

class MeControllers {
  // [GET] / stored courses
  
  storedCourses(req, res, next) {

    let courseQuery = Course.find({})

    if(req.query.hasOwnProperty('_sort')) {
      courseQuery = courseQuery.sort({
        [req.query.column]: req.query.type,
      })
    }


    Promise.all([courseQuery, Course.countDocumentsDeleted()])
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
