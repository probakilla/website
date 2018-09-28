const INTERVAL_AI = 1000;
const DELAY = 1000;
const CHEAT_DELAY = 5000;

function Player(pannel, scorePannel, acesPannel) {
  this.score = 0;
  this.aces = 0;
  this.pannel = pannel;
  this.scorePannel = scorePannel;
  this.acesPannel = acesPannel;
};

function randomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let deck = (function () {
  let deck = [
    '10Clubs', '10Diamonds', '10Hearts', '10Spades', '01Clubs', '01Diamonds',
    '01Hearts', '01Spades', '11Clubs', '11Diamonds', '11Hearts', '11Spades',
    '02Clubs', '02Diamonds', '02Hearts', '02Spades', '03Clubs', '03Diamonds',
    '03Hearts', '03Spades', '04Clubs', '04Diamonds', '04Hearts', '04Spades',
    '05Clubs', '05Diamonds', '05Hearts', '05Spades', '06Clubs', '06Diamonds',
    '06Hearts', '06Spades', '07Clubs', '07Diamonds', '07Hearts', '07Spades',
    '08Clubs', '08Diamonds', '08Hearts', '08Spades', '09Clubs', '09Diamonds',
    '09Hearts', '09Spades', '12Clubs', '12Diamonds', '12Hearts', '12Spades',
    '13Clubs', '13Diamonds', '13Hearts', '13Spades'
  ];

  return {
    draw: () => {
      let index = randomInt(deck.length);
      let card = deck[index];
      deck.splice(index, 1);
      return card;
    }
  }
}());

function scoreTest(player) {
  if ((player.score + (player.aces * 10)) > 21)
    if (player.score > 21) return false;
  return true;
}

function restart() {
  location.reload();
}

function playerDraw(player) {
  let card = deck.draw();
  // Ajout de l'image
  let score = parseInt(card.substring(0, 2));
  if (score === 1) {
    player.aces++;
    $(player.acesPannel).removeClass("hidden");
  }
  let path = "img/" + card + ".gif";
  let img = $('<img />').attr({ 'src': path }).appendTo(player.pannel);

  player.score += score;
  $(player.scorePannel).html(player.score);
  $(player.acesPannel).html("Ou : " + (player.score + (player.aces * 10)));
}

function AI() {
  let latency = setInterval(() => {
    playerDraw(bank);
    if (bank.score >= 17) clearInterval(latency);
  }, INTERVAL_AI);
}

function end(msg) {
  let latency = setInterval(() => {
    $("#btn-draw").off("click");
    $("#btn-stand").off("click");
    $("#game").addClass("hidden");
    $("#title").html(msg);
    $("#reset").removeClass("hidden");
    clearInterval(latency);
  }, DELAY);
}

function stand() {
  if (!scoreTest(user.score)) {
    end("GIT GUD");
    return;
  }
  AI();
  let latency = setInterval(() => {
    if (bank.score > 21 || bank.score < user.score) {
      console.log("zboui");
      end("GG EZ");
      return;
    }
    else if (bank.score === user.score) {
      end("OMG DRAW");
      return;
    }
    end("GIT GUD");
  }, CHEAT_DELAY);
}

// ===== MAIN =====
let user = new Player("#player-cards", "#p-score", "#ace-pannel");
let bank = new Player("#bank-cards", "#b-score", "#ace-pannel");

playerDraw(user);
playerDraw(user);
if (user.score > 21)
  restart();

$("#btn-draw").on("click", () => {
  playerDraw(user);
  if (user.score > 21)
    end("GIT GUD");
});

$("#btn-stand").on("click", stand);

$("#reset").on("click", restart);