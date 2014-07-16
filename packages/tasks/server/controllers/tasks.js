'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Task = mongoose.model('Task'),
    _ = require('lodash');


/**
 * Find Task by id
 */
exports.task = function(req, res, next, id) {
    Task.load(id, function(err, task) {
        if (err) return next(err);
        if (!task) return next(new Error('Failed to load task ' + id));
        req.task = task;
        next();
    });
};

/**
 * Create an task
 */
exports.create = function(req, res) {
    var task = new Article(req.body);
    task.user = req.user;

    task.save(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot save the task'
            });
        }
        res.jsonp(task);

    });
};

/**
 * Update an task
 */
exports.update = function(req, res) {
    var task = req.task;

    task = _.extend(task, req.body);

    task.save(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot update the task'
            });
        }
        res.jsonp(task);

    });
};

/**
 * Delete an task
 */
exports.destroy = function(req, res) {
    var task = req.task;

    task.remove(function(err) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot delete the task'
            });
        }
        res.jsonp(task);

    });
};

/**
 * Show an task
 */
exports.show = function(req, res) {
    res.jsonp(req.task);
};

/**
 * List of Articles
 */
exports.all = function(req, res) {
    Article.find().sort('-created').populate('user', 'name username').exec(function(err, tasks) {
        if (err) {
            return res.jsonp(500, {
                error: 'Cannot list the tasks'
            });
        }
        res.jsonp(tasks);

    });
};
