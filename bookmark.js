javascript: (function () {
  const url = window.location.href;
  console.log(url);
  fetch(`http://HOSTNAME:PORT/api/add?url=${encodeURIComponent(url)}`);
})();
