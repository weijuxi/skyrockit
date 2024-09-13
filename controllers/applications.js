const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        res.render('applications/index.ejs', {applications: currentUser.applications});
    } catch (error)
    {
        res.redirect('/');
    }
});

router.post('/', async (req, res) => {
    try{
        //look up the user
        const currentUser = await User.findById(req.session.user._id);
        //create a new application
        currentUser.applications.push(req.body);
        //save the user
        await currentUser.save();
        console.log(currentUser, "<-----------------currentUser")
        res.redirect(`/users/${currentUser._id}/applications`);

    } catch (error) {
        console.log(error, "<-----------------error");
        res.render('applications/new.ejs',{errorMessage: 'Please try again.'});
    }
});


router.get('/new', async (req, res) => {
    res.render('applications/new.ejs');
});


//show route(/users/:userId/applications/:applicationId)
router.get('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render('applications/show.ejs', {application: application});
    } catch (error) {
        console.log(error, "<-----------------error");
        res.redirect('/');
    }
});

//edit route(/users/:userId/applications/:applicationId/edit)
router.get('/:applicationId/edit', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        res.render('applications/edit.ejs', {application: application});
    } catch (error) {
        console.log(error, "<-----------------error");
        res.redirect('/');
    }
});


//update route(/users/:userId/applications/:applicationId)
router.put('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        const application = currentUser.applications.id(req.params.applicationId);
        application.set(req.body);
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications/${application._id}`);
    } catch (error) {
        console.log(error, "<-----------------error");
        res.redirect('/');
    }
});


router.delete('/:applicationId', async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id);
        currentUser.applications.id(req.params.applicationId).deleteone();
        await currentUser.save();
        res.redirect(`/users/${currentUser._id}/applications`);
    } catch (error) {
        console.log(error, "<-----------------error");
        res.redirect('/');
    }
});

module.exports = router;