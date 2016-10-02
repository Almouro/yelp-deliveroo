var xhr = new XMLHttpRequest();
xhr.open("GET", "https://localhost:3001/extension/index.js", true);
xhr.onreadystatechange = function() {
  if (xhr.readyState == 4) {
    var resp = eval(xhr.responseText);
  }
}
xhr.send();
