(function() {
  const sceneTop = document.getElementById("sceneTop");
  const sceneGame = document.getElementById("sceneGame");
  const sceneResult = document.getElementById("sceneResult");
  const textQuestion = document.getElementById("textQuestion");
  const listAnswer = document.getElementById("listAnswer");
  const numResult = document.getElementById("numResult");
  const btnStart = document.getElementById("btnStart");
  const btnReset = document.getElementById("btnReset");
  const question = [
    {
      text: "Which animal is not a deuterostome?",
      choice: ["Human", "Star Fish", "Frog", "Squid"],
      ansewer: "Squid"
    },
    {
      text: "Which of these books was published by Darwin?",
      choice: ["The origin of species", "On the origin of species", "The origing of evolution", "The onigiri of spicy"],
      ansewer: "On the origin of species"
    },
    {
      text: "Who did experiment using pea plants?",
      choice: [
        "Gregor Johann Mendel",
        "Albert Einstein",
        "Isaac Newton",
        "Robert Songer"
      ],
      ansewer: "Gregor Johann Mendel"
    },
    {
      text: "Which is the central nervous system?",
      choice: ["Arteries and veins", "Atrium and ventricle", "peripheral nerves", "Brain and spinalcode"],
      ansewer: "Brain and spinalcode"
    }
  ];

  let state = {
    answer: "",
    gameCount: 0,
    success: 0
  };

  function init() {
    state.gameCount = 0;
    state.success = 0;
    changeScene(sceneResult, sceneTop);

    btnStart.addEventListener("click", gameStart, false);
  }

  function changeScene(hiddenScene, visibleScene) {
    hiddenScene.classList.add("is-hidden");
    hiddenScene.classList.remove("is-visible");
    visibleScene.classList.add("is-visible");
  }

  function showQuestion() {
    var str = "";
    question[state.gameCount].choice.forEach(function(value) {
      str += '<li class="questionChoice">' + value + "</li>";
    });
    textQuestion.innerHTML = question[state.gameCount].text;
    listAnswer.innerHTML = str;
  }

  function choiceQuestion() {
    let questionChoice = document.querySelectorAll(".questionChoice");
    questionChoice.forEach(function(choice) {
      choice.addEventListener(
        "click",
        function() {
          state.answer = this.textContent;
          checkAnswer(question[state.gameCount].ansewer);
        },
        false
      );
    });
  }

  function checkAnswer(answer) {
    if (answer === state.answer) {
      correctAnswer();
    } else {
      incorrectAnswer();
    }
    state.gameCount++;
    if (state.gameCount < question.length) {
      showQuestion();
      choiceQuestion();
    } else {
      gameEnd();
    }
  }

  function correctAnswer() {
    state.success++;
    console.log("正解");
  }

  function incorrectAnswer() {
    console.log("不正解");
  }

  function gameStart() {
    changeScene(sceneTop, sceneGame);
    showQuestion();
    choiceQuestion();
  }

  function gameEnd() {
    changeScene(sceneGame, sceneResult);
    numResult.innerHTML = state.success;
    
    if (numResult == 1){
      console.log("hello");
    }
    btnReset.addEventListener("click", init, false);
  } 

  init();
})(); 
