javascript: (function () {
  const url = window.location.href;
  console.log(url);
  fetch(`http://localhost:3000/api/add?url=${encodeURIComponent(url)}`);
})();
