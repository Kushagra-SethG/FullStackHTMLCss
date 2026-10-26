const timerElement = document.getElementById("timer");
const startButton = document.getElementById("start");
const resetButton = document.getElementById("reset");

let seconds = 0;
let intervalId;
let timeoutId;

function showTime() {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  timerElement.textContent = `Timer: ${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
}

startButton.addEventListener("click", () => {
  if (intervalId) return;

  intervalId = setInterval(() => {
    seconds++;
    showTime();
  }, 1000);

  timeoutId = setTimeout(() => {
    clearInterval(intervalId);
    intervalId = null;
    seconds = 15 * 60;
    showTime();
  }, 15 * 60 * 1000);
});

resetButton.addEventListener("click", () => {
  clearInterval(intervalId);
  clearTimeout(timeoutId);
  intervalId = null;
  seconds = 0;
  showTime();
});

showTime();
