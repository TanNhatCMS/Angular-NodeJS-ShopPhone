const router = require('express').Router();
const path = require('path');
const { capitalize } = require('../utils/util');
const express = require("express");

const availableResources = [
  'products',
  'carts',
  'users',
  'posts',
  'comments',
  'image',
  'todos',
  'quotes',
  'recipes',
  'auth',
  'http',
];


// router.use(express.static(path.join(__dirname, '/public')));

router.get('/docs', (req, res) => {
  res.render('docs', {
    page: '',
    description: `DummyJSON provides a fake REST API of JSON data for development, testing, and prototyping. Quickly get realistic data for your front-end projects.`,
  });
});

router.get('/image', (req, res) => {
  res.status(301).redirect('/docs/image');
});

router.get('/docs/:resource', (req, res, next) => {
  const resource = (req.params.resource || '').toLowerCase();

  if (!availableResources.includes(resource)) {
    next();
    return;
  }

  const capitalizedResource = capitalize(resource);

  res.render(`docs-${resource}`, {
    page: capitalizedResource,
    description: `REST Endpoints filled with ${capitalizedResource} JSON data, DummyJSON provides a fake REST API of JSON data for development, testing, and prototyping. Quickly get realistic data for your front-end projects.`,
  });
});

router.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, '../../', 'public', 'robots.txt'));
});

router.get('/sitemap.xml', (req, res) => {
  res.sendFile(path.join(__dirname, '../../', 'public', 'sitemap.xml'));
});

module.exports = router;
