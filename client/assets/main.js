const time = new Date();
const p = document.createElement("p");
p.innerText = time.toLocaleDateString();
document.querySelector("body").appendChild(p);
