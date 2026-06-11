const outcomes = [
  {
    label: "摸鱼",
    className: "is-fish",
    hint: "签都这么说了，今天先把水温调舒服。",
  },
  {
    label: "干活",
    className: "is-work",
    hint: "天命如此，先干一个最小的任务。",
  },
  {
    label: "炒股",
    className: "is-stock",
    hint: "先看一眼盘，记得别上头。",
  },
  {
    label: "群里聊天",
    className: "is-chat",
    hint: "今日 KPI：把群气氛带起来。",
  },
  {
    label: "学习",
    className: "is-study",
    hint: "翻两页也算进步，先开始。",
  },
  {
    label: "接受狗哥教育",
    className: "is-lesson",
    hint: "虚心点，今天主打一个被点醒。",
  },
  {
    label: "接受K哥教育",
    className: "is-lesson",
    hint: "坐稳听课，重点可能马上就来。",
  },
  {
    label: "找静静报课",
    className: "is-course",
    hint: "今日适合主动咨询，别只收藏不行动。",
  },
  {
    label: "找菜菜要照片",
    className: "is-photo",
    hint: "语气礼貌一点，成功率会高一点。",
  },
];

const panel = document.querySelector(".panel");
const jar = document.querySelector(".jar");
const result = document.querySelector("#result");
const hint = document.querySelector("#hint");
const button = document.querySelector("#drawButton");

let lastShakeAt = 0;
let lastOutcomeIndex = -1;

function pickOutcome() {
  let nextIndex = Math.floor(Math.random() * outcomes.length);

  if (nextIndex === lastOutcomeIndex) {
    nextIndex = (nextIndex + 1) % outcomes.length;
  }

  lastOutcomeIndex = nextIndex;
  return outcomes[nextIndex];
}

function draw() {
  const outcome = pickOutcome();

  jar.classList.remove("is-shaking");
  void jar.offsetWidth;
  jar.classList.add("is-shaking");

  button.disabled = true;
  result.textContent = "抽签中";
  hint.textContent = "正在问今天的运气。";
  panel.classList.remove(
    "is-fish",
    "is-work",
    "is-stock",
    "is-chat",
    "is-study",
    "is-lesson",
    "is-course",
    "is-photo",
  );

  window.setTimeout(() => {
    result.textContent = outcome.label;
    hint.textContent = outcome.hint;
    panel.classList.add(outcome.className);
    button.disabled = false;
  }, 560);
}

function handleMotion(event) {
  const acceleration = event.accelerationIncludingGravity;

  if (!acceleration) {
    return;
  }

  const force =
    Math.abs(acceleration.x || 0) +
    Math.abs(acceleration.y || 0) +
    Math.abs(acceleration.z || 0);
  const now = Date.now();

  if (force > 34 && now - lastShakeAt > 1200) {
    lastShakeAt = now;
    draw();
  }
}

button.addEventListener("click", async () => {
  if (
    typeof DeviceMotionEvent !== "undefined" &&
    typeof DeviceMotionEvent.requestPermission === "function"
  ) {
    await DeviceMotionEvent.requestPermission().catch(() => "denied");
  }

  draw();
});

window.addEventListener("devicemotion", handleMotion);
