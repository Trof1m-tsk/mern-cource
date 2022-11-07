const { Router } = require('express');
const Link = require('../models/Link');
const config = require('config');
const shortId = require('shortid');
const auth = require('../middleware/auth.middleware');

const router = Router();

router.post('/generate', auth, async ( req, res ) => {
  try {
    const { from } = req.body;
    const baseUrl = config.get('baseUrl');
    const code = shortId.generate();
    console.log('code', code);
    const to = baseUrl + '/to/' + code;
    const existing = await Link.findOne({ from });

    console.log('existing', existing);

    if (existing) {
      return res.json({ link: existing });
    }


    const link = new Link({ code, to, from, owner: req.user.userId });
    console.log('new link', link);
    await link.save();

    res.status(201).json({ link });
  } catch (e) {
    console.log('e', e);
    res.status(500).json({ message: 'Something went wrong. Please, try again!' });
  }
});

router.get('/', auth, async ( req, res ) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please, try again!' });
  }
});

router.get('/:id', auth, async ( req, res ) => {
  try {
    const link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong. Please, try again!' });
  }
});

module.exports = router;

