const router = require('express').Router();
const { sequelize, DataTypes } = require('../db');
const Game = require('../models/game')(sequelize, DataTypes);

router.get('/all', async (req, res) => {
  try {
    const games = await Game.findAll({ where: { owner_id: req.body.user.id } });
    res.status(200).json({
      games: games,
      message: 'Data fetched.',
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Data not found',
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const game = await Game.findOne({
      where: { id: req.params.id, owner_id: req.body.user.id },
    });
    if (game) {
      res.status(200).json({
        game: game,
      });
    } else {
      throw new Error('Data not found');
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || 'Data not found.',
    });
  }
});

router.post('/create', async (req, res) => {
  try {
    const game = await Game.create({
      title: req.body.game.title,
      owner_id: req.body.user.id,
      studio: req.body.game.studio,
      esrb_rating: req.body.game.esrb_rating,
      user_rating: req.body.game.user_rating,
      have_played: req.body.game.have_played,
    });
    res.status(200).json({
      game: game,
      message: 'Game created.',
    });
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.put('/update/:id', async (req, res) => {
  try {
    const gameUpdated = await Game.update(
      {
        title: req.body.game.title,
        studio: req.body.game.studio,
        esrb_rating: req.body.game.esrb_rating,
        user_rating: req.body.game.user_rating,
        have_played: req.body.game.have_played,
      },
      {
        where: {
          id: req.params.id,
          owner_id: req.body.user.id,
        },
      }
    );
    if (gameUpdated[0] === 0) {
      throw new Error('Game not updated.');
    } else {
      res.status(200).json({
        game: gameUpdated,
        message: 'Successfully updated.',
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

router.delete('/remove/:id', async (req, res) => {
  try {
    const game = await Game.destroy({
      where: {
        id: req.params.id,
        owner_id: req.body.user.id,
      },
    });
    if (game === 0) {
      throw new Error('Game not deleted');
    } else {
      res.status(200).json({
        game: game,
        message: 'Successfully deleted',
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
