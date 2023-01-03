const Course = require('../models/Course')
const { mongooseToObject } = require('../../until/mongooes');
const { response } = require('express');

class CourseControllers {
  // [GET] / news
  show(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(course => {
        res.render('courses/show', { course: mongooseToObject(course) });
      })
      .catch(next)
  }

  // [GET] course/create
  create(req, res, next) {
    res.render('courses/create');
  }

  // [GET] course/:id/edit
  edit(req, res, next) {
    Course.findById(req.params.id)
      .then(course => res.render('courses/edit', {
        course: mongooseToObject(course)
      }))
      .catch(next)
  }

  // [POST] course/store
  store(req, res, next) {
    const course = new Course(req.body);
    course.save()
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next)
  }

  // [PUT] course/_id
  update(req, res, next) {
    Course.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next)
  }

  // [DELETE Soft] course/_id
  destroy(req, res, next) {
    Course.delete({_id: req.params.id})
    .then(() => res.redirect('back'))
    .catch(next)
  }


  forceDestroy(req, res, next) {
    Course.deleteOne({_id: req.params.id}, req.body)
    .then(() => res.redirect('back'))
    .catch(next)
  }

  // [PATH Restore Soft] course/_id
  restore(req, res, next) {
    Course.restore({_id: req.params.id})
    .then(() => res.redirect('back'))
    .catch(next)
  }

  // [POST] courses/handle-form-actions
  handleFormActions(req, res, next) {
    switch(req.body.action) {
      case 'delete':
        Course.delete({_id: { $in: req.body.courseIds}})
          .then(() => res.redirect('back'))
          .catch(next)
      break;

      default: 

      res.json({alert: "ACtion not invalid"});

      
    }
  }
}

module.exports = new CourseControllers();
