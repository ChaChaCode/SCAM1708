window.addEventListener('load', function() {
    var blurElements = document.querySelectorAll('.blur');
    blurElements.forEach(function(el) {
      el.style.filter = 'none'; // Убираем размытие после загрузки
    });
  });

    // Проверка и установка поддержки вибрации
    if (Telegram.WebApp.HapticFeedback) {
      function handleButtonClick(url) {
          return function (e) {
              e.preventDefault();
              // Запуск вибрации
              Telegram.WebApp.HapticFeedback.impactOccurred('medium');
              // Переход по ссылке
              window.location.href = url;
          };
      }
  
      function setupButton(id, url) {
          var button = document.getElementById(id);
          if (button) {
              button.addEventListener("click", handleButtonClick(url));
          }
      }
  
      setupButton("monitorBattonContainer", "./upgrade.html");
      setupButton("groupInfoTextContainer", "./info.html");
      setupButton("TaskBattonContainer", "./task.html");
      setupButton("TopStarsBattonContainer", "./leadersbord.html");
      setupButton("rukaBattonContainer", "./index.html");
  
  }
