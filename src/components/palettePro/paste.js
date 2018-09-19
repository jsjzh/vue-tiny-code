export default function (color) {
  const body = document.querySelector("body");
  const input = document.createElement("input");
  input.value = color;
  input.style.opacity = 0;
  input.style.position = "fixed";
  input.style.top = "0";
  input.style.left = "0";
  body.appendChild(input);
  input.select();
  document.execCommand("copy");
  // body.removeChild(input);
}