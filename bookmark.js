javascript: (function () {
  const url = window.location.href;
  console.log("Current URL:", url);

  // API URL を定義
  const API_URL = "http://localhost:3001/api/add";

  // POST リクエストでデータを送信
  fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: url, // 現在のページの URL を送信
      title: document.title, // ページのタイトルも送信
    }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      console.log("Response from server:", data);
      alert("データが正常に送信されました！");
    })
    .catch((error) => {
      console.error("Error occurred:", error);
      alert("データの送信中にエラーが発生しました。");
    });
})();
