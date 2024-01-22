const express = require('express');
const router = express.Router();
const {
    getGoals,
    getGoal,
    addGoal,
    updateGoal,
    deleteGoal
} = require('../controllers/goalController');

const app = express();

const { protected } = require('../middlewares/authHandler');

router.route('/').get(getGoals).post(protected, addGoal);
router.route('/:goalId').get(getGoal).delete(protected, deleteGoal).put(protected, updateGoal);

module.exports = router;
