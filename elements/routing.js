'use strict';

window.addEventListener('WebComponentsReady', function () {

  // More info: https://visionmedia.github.io/page.js/

  // Removes end / from app.baseUrl which page.base requires for production
  if (window.location.port === '') {
    // if production
    page.base(app.baseUrl.replace(/\/$/, ''));
  }

  // Middleware
  function scrollToTop(ctx, next) {
    //app.scrollPageToTop();
    next();
  }

  function closeDrawer(ctx, next) {
    //app.closeDrawer();
    next();
  }

  // Routes
  page('*', scrollToTop, closeDrawer, function (ctx, next) {
    next();
  });

  page(app.baseUrl, function () {
    app.route = 'home';
    document.querySelector('simulated-annealing').start();
  });

  page.exit(app.baseUrl, function (context, next) {
    document.querySelector('simulated-annealing').stop();
    next();
  });

  page('/projects', function (data) {
    app.route = 'projects';
  });

  page('/projects/:id', function (data) {
    if (data.params && data.params.id) {
      var projectId = data.params.id;
      var projectListHasId = app.projectList.some(function (project) {
        return project.id === projectId;
      });

      if (projectListHasId) {
        app.route = 'projects/:id';
        app.params = data.params;
      } else {
        //if cant find project: page.redirect('/projects'); and do toast
        app.route = 'projects';
      }
    } else {
      //if cant find project: page.redirect('/projects'); and do toast
      app.route = 'projects';
    }
  });

  page.exit('/projects/:id', function (context, next) {
    app.params = '';
    next();
  });

  page('/about', function () {
    app.route = 'about';
  });

  // 404
  page('*', function () {
    app.$.toast.text = 'Can\'t find: ' + window.location.href + '. Redirected you to Home Page';
    app.$.toast.show();
    page.redirect(app.baseUrl);
  });

  // add #! before urls
  page({
    hashbang: true
  });
});