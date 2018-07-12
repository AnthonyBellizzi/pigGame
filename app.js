/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying, diceLast, diceLast2;

init();

document.querySelector('.btn-roll').addEventListener('click', function() {

  if (gamePlaying) {
    //Random Number
    var dice = Math.floor(Math.random() * 6) + 1;
    var dice2 = Math.floor(Math.random() * 6) + 1;

    //Display Number
    var diceDOM = document.querySelector('.dice');
    document.querySelector('.dice').style.display = 'block';
    diceDOM.style.display = 'block';
    diceDOM.src  = 'dice-' + dice + '.png'

    var dice2DOM = document.getElementById('dice2');
    document.getElementById('dice2').style.display = 'block';
    dice2DOM.style.display = 'block';
    dice2DOM.src  = 'dice-' + dice2 + '.png'


    if (diceLast === 6 && dice === 6 || diceLast2 === 6 && dice2 === 6) {
      scores[activePlayer] = 0;
      roundScore = 0;
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
      document.querySelector('#current-' + activePlayer);
      nextPlayer();
    } else {
      diceLast = dice;
      diceLast2 = dice2;
    }

    //Change Score
    if (dice !== 1 && dice2 !== 1) {
      //Add score
      roundScore += dice + dice2;
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

    var input = document.querySelector('.finalScore').value;

    if (input) {
      var winningScore = input;
    } else {
      winningScore = 100;
    }

    //Check for win

    if (scores[activePlayer] >= winningScore) {
      gamePlaying = false;
      document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
      document.querySelector('.dice').style.display = 'none';
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
  document.getElementById('dice2').style.display = 'none';
};

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  document.querySelector('.dice').style.display = 'none';
  document.getElementById('dice2').style.display = 'none';

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
