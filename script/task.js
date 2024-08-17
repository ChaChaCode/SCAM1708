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
            navigator.vibrate(10);
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
    setupButton("TopStarsBattonContainer", "./leadersbord.html");
    setupButton("rukaBattonContainer", "./index.html");

}

document.addEventListener('DOMContentLoaded', () => {
    const tasks = document.querySelectorAll('.elittaskszadanie');
    const indicator = document.querySelector('.task-indicator');
    const scrollingBlock = document.getElementById('scrollingBlock');
    let currentIndex = 0;
    let startX = 0;
    let isSwiping = false;
    let autoSwipeInterval;
    let autoSwipeTimeout;
    const autoSwipeDelay = 3000; // 3 секунды
    const manualSwipeDelay = 10000; // 10 секунд

    // Создаем точки-индикаторы
    tasks.forEach((task, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        indicator.appendChild(dot);
    });

    const updateDots = () => {
        indicator.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const scrollToTask = (index) => {
        const targetPosition = tasks[index].offsetLeft - 
                               (scrollingBlock.clientWidth / 2 - tasks[index].clientWidth / 2);
        scrollingBlock.scroll({
            left: targetPosition,
            behavior: 'smooth'
        });
        
        // Запуск вибрации при перелистывании
        Telegram.WebApp.HapticFeedback.impactOccurred('medium');
        
        // Добавление вибрации
        navigator.vibrate(10);
    };
    

    const shakeAnimation = () => {
        scrollingBlock.classList.add('shake');
        setTimeout(() => {
            scrollingBlock.classList.remove('shake');
        }, 300); // Длительность анимации в мс
    };

    const startAutoSwipe = () => {
        autoSwipeInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % tasks.length;
            updateDots();
            scrollToTask(currentIndex);
        }, autoSwipeDelay);
    };

    const stopAutoSwipe = () => {
        clearInterval(autoSwipeInterval);
    };

    scrollingBlock.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isSwiping = true;
        stopAutoSwipe();
    });

    scrollingBlock.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        let endX = e.changedTouches[0].clientX;
        isSwiping = false;
    
        let swipeDistance = startX - endX;
        const minSwipeDistance = 50; // Минимальное расстояние для регистрации свайпа
    
        if (Math.abs(swipeDistance) >= minSwipeDistance) {
            if (swipeDistance > 0 && currentIndex < tasks.length - 1) {
                currentIndex++;
            } else if (swipeDistance < 0 && currentIndex > 0) {
                currentIndex--;
            } else {
                // Если попытка пролистать за границу доступных элементов
                shakeAnimation();
                // Двойная сильная вибрация для iPhone и стандартная двойная вибрация
                Telegram.WebApp.HapticFeedback.impactOccurred('heavy'); // Сильная вибрация 1
                setTimeout(() => {
                    Telegram.WebApp.HapticFeedback.impactOccurred('heavy'); // Сильная вибрация 2
                }, 100); // Временной интервал между вибрациями 100 мс
                
                // Стандартная двойная вибрация
                navigator.vibrate([50, 100, 50]);
            }
        }
    
        updateDots();
        scrollToTask(currentIndex);
    
        // Перезапуск автоматического свайпа с задержкой
        clearTimeout(autoSwipeTimeout);
        autoSwipeTimeout = setTimeout(() => {
            startAutoSwipe();
        }, manualSwipeDelay);
    });
    
    

    // Обработка кликов по точкам-индикаторам
    indicator.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateDots();
            scrollToTask(currentIndex);
            stopAutoSwipe();
            clearTimeout(autoSwipeTimeout);
            autoSwipeTimeout = setTimeout(() => {
                startAutoSwipe();
            }, manualSwipeDelay);
        });
    });

    // Запускаем автоматический свайп
    startAutoSwipe();
});
