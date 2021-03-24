const router = require('express').Router();
const sequelize = require('../../config/connection');
const { Post, User, Vote, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

//get all posts
router.get('/', (req, res) => {
  Post.findAll({
          attributes: ['id','title','content', 'created_at'],
          order: [
              ['created_at', 'DESC']
          ],
          include: [{
                  model: User,
                  attributes: ['username']
              },
              {
                  model: Comment,
                  attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                  include: {
                      model: User,
                      attributes: ['username']
                  }
              }
          ]
      })
      .then(dbPostData => res.json(dbPostData.reverse()))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });

});

module.exports = router;