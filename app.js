/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, diceLast, cap;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

  if (gamePlaying) {
    //Random Number
    var dice = Math.floor(Math.random() * 6) + 1;

    //Display Number
    var diceDOM = document.querySelector('.dice');
    document.querySelector('.dice').style.display = 'block';
    diceDOM.style.display = 'block';
    diceDOM.src  = 'dice-' + dice + '.png'

    if (diceLast === 6 && dice === 6) {
      scores[activePlayer] = 0;
      roundScore = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      document.getElementById('current-' + activePlayer);
      nextPlayer();
    } else {
      diceLast = dice;
    }

    //Change Score
    if (dice !== 1) {
      //Add score
      roundScore += dice;
      document.querySelector('#current-' + activePlayer).textContent = roundScore;
    } else {
      //Next Player
      nextPlayer();
    };
  };
});

document.querySelector('.btn-hold').addEventListener('click', function() {

  if (gamePlaying) {
    //Add current score to globle scores
    scores[activePlayer] += roundScore;
    //update UI
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    //Check for win

    if (scores[activePlayer] >= cap) {
      gamePlaying = false;
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice').style.disply = 'none';
      document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
      document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    } else {
      //Next Player
      nextPlayer();
    };
  };
});

function nextPlayer() {
  //Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  diceLast = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';

  document.getElementById('score-0').textContent = '0';
  document.getElementById('score-1').textContent = '0';
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';
  document.getElementById('name-0').textContent = 'PLAYER 1';
  document.getElementById('name-1').textContent = 'PLAYER 2';
  document.querySelector('.player-0-panel').classList.remove('winner');
  document.querySelector('.player-1-panel').classList.remove('winner');
  document.querySelector('.player-0-panel').classList.remove('active');
  document.querySelector('.player-1-panel').classList.remove('active');
  document.querySelector('.player-0-panel').classList.add('active');
};
