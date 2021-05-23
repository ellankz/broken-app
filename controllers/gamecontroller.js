const router = require('express').Router();
const { DATA_NOT_FOUND, DATA_FETCHED } = require('../constants/constants');
const Game = require('../models/game')(require('../db'));

router.get('/all', async (req, res) => {
  try {
    const games = await Game.findAll({ where: { owner_id: req.body.user.id } });
    res.status(200).json({
      games: games,
      message: DATA_FETCHED,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || DATA_NOT_FOUND,
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
      throw new Error(DATA_NOT_FOUND);
    }
  } catch (err) {
    res.status(500).json({
      message: err.message || DATA_NOT_FOUND,
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
      message: GAME_CREATED,
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
      throw new Error(GAME_NOT_UPDATED);
    } else {
      res.status(200).json({
        game: gameUpdated,
        message: SUCCESFULLY_UPDATED,
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
      throw new Error(GAME_NOT_DELETED);
    } else {
      res.status(200).json({
        game: game,
        message: SUCCESFULLY_DELETED,
      });
    }
  } catch (err) {
    res.status(500).json({
      error: err.message,
    });
  }
});

module.exports = router;
