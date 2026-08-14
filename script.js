// ===========================
// QUIZ CHALLENGE
// PART 1
// ===========================
let today = new Date().toDateString();
let currentQuestion = 0;
let score = 0;
let lives = Number(localStorage.getItem("lives")) || 5;
let timeLeft = 15;
let timer = null;
let coins = Number(localStorage.getItem("coins")) || 0;
let hints = Number(localStorage.getItem("hints")) || 1;
// Home
const home = document.getElementById("home");
const playBtn = document.getElementById("playBtn");

// Quiz
const quiz = document.getElementById("quiz");
const questionText = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer");
const dailyRewards = [
    { type: "coins", amount: 10 },
    { type: "coins", amount: 20 },
    { type: "coins", amount: 50 }
];
const scoreText = document.getElementById("score");
const coinsText = document.getElementById("coins");
const livesText = document.getElementById("lives");
const timerText = document.getElementById("timer");
const progressText = document.getElementById("progress");
const dailyRewardBtn = document.getElementById("dailyRewardBtn");
const dailyReward = document.getElementById("dailyReward");
const closeDailyReward = document.getElementById("closeDailyReward");
const achievement = document.getElementById("achievement");
const achievementTitle = document.getElementById("achievementTitle");
const achievementReward = document.getElementById("achievementReward");
const closeAchievement = document.getElementById("closeAchievement");

// Result
const result = document.getElementById("result");
const finalScore = document.getElementById("finalScore");
const stars = document.getElementById("stars");
const message = document.getElementById("message");
const playAgain = document.getElementById("playAgain");
const goHome = document.getElementById("goHome");
const resultTitle = document.getElementById("resultTitle");

// Leaderboard
const leaderboard = document.getElementById("leaderboard");
const leaderboardBtn = document.getElementById("leaderboardBtn");
const bestScore = document.getElementById("bestScore");
const closeLeaderboard = document.getElementById("closeLeaderboard");

// Settings
const settings = document.getElementById("settings");
const settingsBtn = document.getElementById("settingsBtn");
const soundBtn = document.getElementById("soundBtn");
const musicBtn = document.getElementById("musicBtn");
const timerBtn = document.getElementById("timerBtn");let soundOn = localStorage.getItem("sound") !== "off";

if (soundOn) {
    soundBtn.textContent = "🔊 Sound: ON";
} else {
    soundBtn.textContent = "🔇 Sound: OFF";
}let musicOn = localStorage.getItem("music") === "on";

if (musicOn) {
    musicBtn.textContent = "🎵 Music: ON";
} else {
    musicBtn.textContent = "🔕 Music: OFF";
}let quizTime = Number(localStorage.getItem("quizTime")) || 15;

timerBtn.textContent = "⏱ Timer: " + quizTime + "s";
const shopBtn = document.getElementById("shopBtn");
const shop = document.getElementById("shop");
const shopCoins = document.getElementById("shopCoins");
const buyHeartsBtn = document.getElementById("buyHeartsBtn");
const buyHintBtn = document.getElementById("buyHintBtn");
const closeShop = document.getElementById("closeShop");
const backSettings = document.getElementById("backSettings");

// Out Of Hearts
const outOfHearts = document.getElementById("outOfHearts");
const watchAdBtn = document.getElementById("watchAdBtn");
const restartBtn = document.getElementById("restartBtn");
const homeBtn = document.getElementById("homeBtn");
const hintBtn = document.getElementById("hintBtn");
const statsBtn = document.getElementById("statsBtn");
const statistics = document.getElementById("statistics");
const closeStats = document.getElementById("closeStats");

const statBestScore = document.getElementById("statBestScore");
const statGamesPlayed = document.getElementById("statGamesPlayed");
const statStreak = document.getElementById("statStreak");
const statCoins = document.getElementById("statCoins");
const statHints = document.getElementById("statHints");
const statHearts = document.getElementById("statHearts");
const backQuizBtn = document.getElementById("backQuizBtn");
// Start Game
playBtn.addEventListener("click", startGame);

function startGame() {
bgMusic.play().catch(() => {});
    currentQuestion = 0;
    score = 0;
    

    scoreText.textContent = score;
    livesText.textContent = lives;
coinsText.textContent = coins;
    home.style.display = "none";
    result.style.display = "none";
    leaderboard.style.display = "none";
    settings.style.display = "none";
    outOfHearts.style.display = "none";

    quiz.style.display = "block";

    loadQuestion();
}// ===========================
// PART 2
// ===========================

function loadQuestion() {

    clearInterval(timer);

    if (currentQuestion >= questions.length) {
        showResult();
        return;
    }

    timeLeft = 15;
    timerText.textContent = timeLeft;

    const q = questions[currentQuestion];

    progressText.textContent =
        "Question " + (currentQuestion + 1) + " / " + questions.length;

    questionText.textContent = q.question;

    answerButtons.forEach(function(btn, index) {

        btn.style.display = "block";
        btn.style.background = "#FFD700";
        btn.disabled = false;

        btn.textContent = q.answers[index];

        btn.onclick = function () {
            checkAnswer(index);
        };

    });

    startTimer();

}

function startTimer() {

    clearInterval(timer);

    timer = setInterval(function () {

        timeLeft--;
        timerText.textContent = timeLeft;

        if (timeLeft <= 0) {

            clearInterval(timer);

            lives--;
            livesText.textContent = lives;

            if (lives <= 0) {
                showOutOfHearts();
                return;
            }

            currentQuestion++;
            loadQuestion();

        }

    }, 1000);

}

function checkAnswer(index) {

    clearInterval(timer);

    const correct = questions[currentQuestion].correct;

    answerButtons.forEach(function(btn) {
        btn.disabled = true;
    });

    if (index === correct) {

        score++;
coins += 10;

scoreText.textContent = score;
coinsText.textContent = coins;

localStorage.setItem("coins", coins);

        answerButtons[index].style.background = "green";

    } else {

        lives--;
        localStorage.setItem("lives", lives);
        livesText.textContent = lives;
answerButtons[index].style.background = "red";
        answerButtons[correct].style.background = "green";

        if (lives <= 0) {

            setTimeout(function () {
                showOutOfHearts();
            }, 800);

            return;
        }

    }

    setTimeout(function () {

    currentQuestion++;
    loadQuestion();

}, 800);

} // End of checkAnswer()


function showResult() {

    clearInterval(timer);

    quiz.style.display = "none";
    result.style.display = "block";

    // Games Played
    let gamesPlayed = Number(localStorage.getItem("gamesPlayed")) || 0;
    gamesPlayed++;
    localStorage.setItem("gamesPlayed", gamesPlayed);

    // Final Score
    finalScore.textContent =
        "Score: " + score + " / " + questions.length;

    // Best Score
    let best = Number(localStorage.getItem("bestScore")) || 0;

    if (score > best) {
        best = score;
        localStorage.setItem("bestScore", best);
    }

    // Result Message
    let percent = (score / questions.length) * 100;

    if (percent >= 90) {
startConfetti();
const clapSound = new Audio("assets/sounds/clap.mp3");

if (navigator.vibrate) {
    navigator.vibrate(500);
}
if(score === questions.length){

    coins += 100;

    showAchievement(
        "🥇 Perfect Score",
        "🎁 +100 Coins"
    );

}
    playSound(clapSound);

    resultTitle.textContent = "👑 Quiz Master";
    stars.textContent = "⭐⭐⭐⭐⭐";
    message.textContent = "Outstanding Performance!";

} else if (percent >= 70) {

    playSound(successSound);

    resultTitle.textContent = "🏆 Great Job";
    stars.textContent = "⭐⭐⭐⭐";
    message.textContent = "Excellent Work!";

} else if (percent >= 50) {

    playSound(successSound);

    resultTitle.textContent = "👍 Nice Try";
    stars.textContent = "⭐⭐⭐";
    message.textContent = "Keep Improving!";

} else {

    playSound(laughSound);

    resultTitle.textContent = "💪 Don't Give Up";
    stars.textContent = "⭐⭐";
    message.textContent = "Practice Makes Perfect!";

}

}

playAgain.addEventListener("click", function ()
{
    playSound(clickSound);
    startGame();
});

goHome.addEventListener("click", function () {

    clearInterval(timer);

    result.style.display = "none";
    quiz.style.display = "none";
    leaderboard.style.display = "none";
    settings.style.display = "none";
    outOfHearts.style.display = "none";

    home.style.display = "block";
playSound(clickSound);bgMusic.pause();
bgMusic.currentTime = 0;
});

leaderboardBtn.addEventListener("click", function () {

    home.style.display = "none";
    leaderboard.style.display = "block";

    const best = Number(localStorage.getItem("bestScore")) || 0;

    bestScore.textContent =
        "Best Score: " + best + " / " + questions.length;

});

closeLeaderboard.addEventListener("click", function () {

    leaderboard.style.display = "none";
    home.style.display = "block";
playSound(clickSound);
}); 

settingsBtn.addEventListener("click", function () {

    home.style.display = "none";
    leaderboard.style.display = "none";
    quiz.style.display = "none";
    result.style.display = "none";
    outOfHearts.style.display = "none";

    settings.style.display = "block";
playSound(clickSound);
});

backSettings.addEventListener("click", function () {

    settings.style.display = "none";
    home.style.display = "block";

});

function showOutOfHearts() {

    clearInterval(timer);

    quiz.style.display = "none";
    result.style.display = "none";
    leaderboard.style.display = "none";
    settings.style.display = "none";
    home.style.display = "none";

    outOfHearts.style.display = "block";
playSound(clickSound);
}

restartBtn.addEventListener("click", function () {

    outOfHearts.style.display = "none";
    
    startGame();
playSound(clickSound);
});

homeBtn.addEventListener("click", function () {
bgMusic.pause();
bgMusic.currentTime = 0;
    outOfHearts.style.display = "none";
    home.style.display = "block";
playSound(clickSound);
});

watchAdBtn.addEventListener("click", function () {

    // Rewarded Ad will be added here
alert("Rewarded Ad Coming Soon!");

    lives = 5;
    localStorage.setItem("lives", lives);
    livesText.textContent = lives;

    outOfHearts.style.display = "none";
    quiz.style.display = "block";

    startTimer();




});window.onload = function () {

    const splash = document.getElementById("splashScreen");

home.style.display = "none";

setTimeout(function () {
    splash.style.display = "none";
    home.style.display = "block";
}, 3000);

quiz.style.display = "none";
result.style.display = "none";
leaderboard.style.display = "none";
settings.style.display = "none";
outOfHearts.style.display = "none";
playSound(clickSound);

};hintBtn.addEventListener("click", function () {

    if (coins < 50) {
        alert("You need 50 coins to use a hint.");
        return;
    }

    coins -= 50;

    coinsText.textContent = coins;
    localStorage.setItem("coins", coins);

    const correct = questions[currentQuestion].correct;

    let wrongAnswers = [];

    for (let i = 0; i < 4; i++) {
        if (i !== correct) {
            wrongAnswers.push(i);
        }
    }

    // Hide two wrong answers
    answerButtons[wrongAnswers[0]].style.display = "none";
    answerButtons[wrongAnswers[1]].style.display = "none";
playSound(clickSound);
    hintBtn.disabled = true;

});shopBtn.addEventListener("click", function () {

    home.style.display = "none";
    shop.style.display = "block";

    shopCoins.textContent = coins;
playSound(clickSound);
});

closeShop.addEventListener("click", function () {

    shop.style.display = "none";
    home.style.display = "block";

});buyHeartsBtn.addEventListener("click", function () {
playSound(clickSound);
    if (coins < 100) {
        alert("Not enough coins!");
        return;
    }

    coins -= 100;
    lives += 5;
localStorage.setItem("lives", lives);
    coinsText.textContent = coins;
    livesText.textContent = lives;
    shopCoins.textContent = coins;

    localStorage.setItem("coins", coins);
playSound(clickSound);
    alert("❤️ You bought 5 Hearts!");

});buyHintBtn.addEventListener("click", function () {

    if (coins < 50) {
        alert("Not enough coins!");
        return;
    }

    coins -= 50;
    hints++;

    coinsText.textContent = coins;
    shopCoins.textContent = coins;

    localStorage.setItem("coins", coins);
    localStorage.setItem("hints", hints);
playSound(clickSound);
    alert("💡 You bought 1 Hint!");

});dailyRewardBtn.addEventListener("click", function () {

    home.style.display = "none";
    dailyReward.style.display = "block";
shuffleRewards();
playSound(clickSound);
dailyMessage.textContent = "";
});

closeDailyReward.addEventListener("click", function () {

    dailyReward.style.display = "none";
    home.style.display = "block";

});function shuffleRewards() {

    let rewards = [...dailyRewards];

    rewards.sort(() => Math.random() - 0.5);

    giftGreen.dataset.reward = JSON.stringify(rewards[0]);
    giftBlue.dataset.reward = JSON.stringify(rewards[1]);
    giftRed.dataset.reward = JSON.stringify(rewards[2]);

}function claimGift(button) {

    let lastClaim = localStorage.getItem("dailyRewardDate");
let streak = Number(localStorage.getItem("dailyStreak")) || 0;

streak++;
localStorage.setItem("dailyStreak", streak);
localStorage.setItem("dailyRewardDate", today);
    if (lastClaim === today) {
        dailyMessage.textContent =
            "✅ Daily reward already claimed. Come back tomorrow!";
        return;
    }

    let reward = JSON.parse(button.dataset.reward);

    if (reward.type === "coins") {

        coins += reward.amount;

        coinsText.textContent = coins;

        localStorage.setItem("coins", coins);

        dailyMessage.textContent =
            "🎉 You won " + reward.amount + " Coins!";

    }

    localStorage.setItem("dailyRewardDate", today);

    giftGreen.disabled = true;
    giftBlue.disabled = true;
    giftRed.disabled = true;
playSound(clickSound);
}

giftGreen.addEventListener("click"
, 
function ()
{
  playSound(clickSound);
    claimGift(giftGreen);
});

giftBlue.addEventListener("click", function ()

{ playSound(clickSound);
    claimGift(giftBlue);
});

giftGreen.addEventListener("click", function () {
    claimGift(giftGreen);
});

giftBlue.addEventListener("click", function () { playSound(clickSound);
    claimGift(giftBlue);
});

giftRed.addEventListener("click", function () {
    claimGift(giftRed);
});

statsBtn.addEventListener("click", function () {
    playSound(clickSound);
playSound(clickSound);
    home.style.display = "none";
    statistics.style.display = "block";

    statBestScore.textContent =
        localStorage.getItem("bestScore") || 0;

    statGamesPlayed.textContent =
        localStorage.getItem("gamesPlayed") || 0;

    statCoins.textContent = coins;

    statHints.textContent = hints;
playSound(clickSound);
    statHearts.textContent = lives;

    statStreak.textContent =
        localStorage.getItem("dailyStreak") || 0;
playSound(clickSound);


});

closeStats.addEventListener("click", function () {

    statistics.style.display = "none";
    home.style.display = "block";

}); soundBtn.addEventListener("click", function () {

    soundOn = !soundOn;

    if (soundOn) {
        soundBtn.textContent = "🔊 Sound: ON";
        localStorage.setItem("sound", "on");
        playSound(clickSound);
    } else {
        soundBtn.textContent = "🔇 Sound: OFF";
        localStorage.setItem("sound", "off");

        clapSound.pause();
        clapSound.currentTime = 0;
    }

});
    

});musicBtn.addEventListener("click", function () {

    musicOn = !musicOn;

    if (musicOn) {
    musicBtn.textContent = "🎵 Music: ON";
    localStorage.setItem("music", "on");
    playSound(clickSound);
    if (musicOn) {
    bgMusic.play().catch(() => {});
}
} else {
    musicBtn.textContent = "🔕 Music: OFF";
    localStorage.setItem("music", "off");
    bgMusic.currentTime = 0;
bgMusic.pause();
}

});timerBtn.addEventListener("click", function () {

    if (quizTime === 10) {
        quizTime = 15;
    } else if (quizTime === 15) {
        quizTime = 20;
    } else {
        playSound(clickSound);
        quizTime = 10;
    }
playSound(clickSound);
    timerBtn.textContent = "⏱ Timer: " + quizTime + "s";

    localStorage.setItem("quizTime", quizTime);

});



noExitBtn.addEventListener("click", function () {
playSound(clickSound);
    exitPopup.style.display = "flex";

});noExitBtn.addEventListener("click", function () {

    exitPopup.style.display = "none";

});

yesExitBtn.addEventListener("click", function () {
    bgMusic.pause();
bgMusic.currentTime = 0;
playSound(clickSound);
    exitPopup.style.display = "none";

    clearInterval(timer);

    quiz.style.display = "none";

    home.style.display = "block";
});

backQuizBtn.addEventListener("click", function () {

    exitPopup.style.display = "flex";

});
const bgMusic = new Audio("assets/sounds/music.mp3");
bgMusic.loop = true;
bgMusic.volume = 0.3;

const correctSound = new Audio("assets/sounds/correct.mp3");
const wrongSound = new Audio("assets/sounds/wrong.mp3");
const gameOverSound = new Audio("assets/sounds/gameover.mp3");
const winSound = new Audio("assets/sounds/win.mp3");
function playSound(sound) {
    if (soundOn) {
        sound.currentTime = 0;
        sound.play().catch(() => {});
    }
    function playSound(sound) {
    if (!soundOn) return;

    sound.currentTime = 0;
    sound.play().catch(() => {});
}
}const clickSound = new Audio("assets/sounds/click.mp3");
const clapSound = new Audio("assets/sounds/clap.mp3");
const successSound = new Audio("assets/sounds/success.mp3");
const laughSound = new Audio("assets/sounds/laugh.mp3");
document.addEventListener("visibilitychange", function () {

    if (document.hidden) {

        bgMusic.pause();

    } else {

        if (musicOn) {
            bgMusic.play().catch(() => {});
        }

    }

});const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let confetti = [];

function startConfetti(){

    confetti = [];

    for(let i=0;i<150;i++){

        confetti.push({
            x:Math.random()*canvas.width,
            y:Math.random()*canvas.height-canvas.height,
            r:Math.random()*6+4,
            d:Math.random()*5+2,
            c:`hsl(${Math.random()*360},100%,50%)`
        });

    }

    animateConfetti();

}

function animateConfetti(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    confetti.forEach(p=>{

        ctx.fillStyle=p.c;

        ctx.beginPath();
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();

        p.y+=p.d;

    });

    confetti=confetti.filter(p=>p.y<canvas.height+20);

    if(confetti.length>0){

        requestAnimationFrame(animateConfetti);

    }

}function showAchievement(title,reward){

    achievementTitle.textContent = title;
    achievementReward.textContent = reward;

    achievement.style.display = "block";

    setTimeout(function(){

        achievement.style.display = "none";

    },3000);

}
