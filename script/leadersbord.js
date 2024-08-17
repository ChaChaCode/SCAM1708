var blurryContainer = document.getElementById("blurryContainer");
function closeModal() {
  var modalContent = document.querySelector(".modal-content");
  modalContent.classList.add("close-animation");
  setTimeout(function() {
      modal.style.display = "none";
      blurryContainer.style.display = "none"; // Скрыть контейнер точек
      modalContent.classList.remove("close-animation");
      document.body.style.overflow = ""; // Восстанавливаем скролл основной страницы
  }, 300); // Длительность анимации в мс
}

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
      setupButton("faceBattonContainer", "./invite.html");
      setupButton("groupInfoTextContainer", "./info.html");
      setupButton("TaskBattonContainer", "./task.html");
      setupButton("rukaBattonContainer", "./index.html");
  
  }
