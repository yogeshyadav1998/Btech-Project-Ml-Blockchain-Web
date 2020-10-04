const MINE_RATE = 1000;

const INITIAL_DIFFICULTY = 3;

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: '-----',
    hash: 'genesis-hash',
    data: [],
    difficulty: INITIAL_DIFFICULTY
}

const STARTING_BALANCE = 1000;

const REWARD_INPUT = {address:'*authorised-reward*'};

const MINING_REWARD = 50;

module.exports = {GENESIS_DATA, MINE_RATE, STARTING_BALANCE, INITIAL_DIFFICULTY, REWARD_INPUT, MINING_REWARD}