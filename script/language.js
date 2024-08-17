document.addEventListener("DOMContentLoaded", function() {
  const button = document.querySelector('.grouplanguage1');
  let isTranslated = false;
  const originalTextMap = new Map();
  const translatedTextMap = new Map();

  // Словарь перевода
  const translationDictionary = {
    "EN": "RU",
    "INVITE": "ИНВАЙТ",
    "TAP": "ТАП",
    "TOP": "ТОПЫ",
    "TASKS": "ЗАДАНИЯ",
    "BEGINNER": "Начинающий",
    "NEXT:": "далее:",
    "CODER": "Кодер",
    "Tap on the screen to start writing code": "Нажмите на экран, чтобы начать писать код",
    "BOOST": "БОНУСЫ",
    "New Rank": "Новый ранк",
    "FREE DAILY BOOSTERS": "БЕСПЛАТНЫЕ БОНУСЫ",
    "SOON": "СКОРО",
    "UPGRADE": "ПРОКАЧКА",
    "MULTI-TAP": "MULTI-ТАП",
    "ENERGY": "ЭНЕРГИЯ",
    "TAP-BOT": "ТАП-БОТ",
    "Invite your friends!": "Пригласите своих друзей!",
    "You and your friend will get bonuses": "Вы и ваш друг получите бонусы",
    "Invited friends": "Пригласи друга.",
    "for you and your friend.": "для тебя и твоего друга.",
    "Invite a friend with Telegram": "Пригласите друга с помощью Telegram",
    "TABLE LEADERS": "ТАБЛИЦА ЛИДЕРОВ",
    "Your place at the top:": "Ваше место на самом верху:",
    "ELITE TASKS": "ЭЛИТНЫЕ ЗАДАНИЯ",
    "TASK LIST": "СПИСОК ЗАДАЧ",
    "Use": "ИСПОЛЬЗОВАТЬ",
    "Link your wallet from Telegram": "Привяжите свой кошелек к Telegram",
    "Join to Telegram Channel SCAM$ RU": "Присоединяйтесь к Telegram-каналу SCAM$ RU",
    "Join to Telegram Channel SCAM$ EN": "Присоединяйтесь к Telegram-каналу SCAM$ EN"
  };

  const excludeText = ["SCAM", "FAQ", "scam", "SCAM$"];

  // Нормализация текста
  function normalizeText(text) {
    return text.trim().replace(/\s+/g, ' ').toUpperCase();
  }

  // Перевод текстового узла
  function translateTextNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = normalizeText(node.textContent);
      if (text && !excludeText.includes(text)) {
        if (!originalTextMap.has(node)) {
          originalTextMap.set(node, text); // Сохраняем оригинальный текст
          const translatedText = translationDictionary[text];
          if (translatedText) {
            translatedTextMap.set(node, translatedText); // Сохраняем переведенный текст
          }
        }
        if (isTranslated) {
          node.textContent = translatedTextMap.get(node) || node.textContent;
        } else {
          node.textContent = originalTextMap.get(node) || node.textContent;
        }
      }
    }
  }

  // Рекурсивный обход и перевод
  function traverseAndTranslate(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
      node.childNodes.forEach(childNode => {
        traverseAndTranslate(childNode);
      });
      // Проверяем текстовые узлы после обхода всех дочерних узлов
      node.childNodes.forEach(childNode => {
        if (childNode.nodeType === Node.TEXT_NODE) {
          translateTextNode(childNode);
        }
      });
    }
  }

  // Переключение перевода
  function toggleTranslation() {
    isTranslated = !isTranslated;
    document.querySelectorAll('*').forEach(element => {
      traverseAndTranslate(element);
    });
  }

  // Инициализация
  function initialize() {
    if (button) {
      button.addEventListener('click', toggleTranslation);
    }
    
    // Наблюдение за динамически добавляемыми элементами
    const observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach(node => {
            if (node.nodeType === Node.ELEMENT_NODE) {
              traverseAndTranslate(node);
            }
          });
        }
      });
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Начальная обработка всех текстовых узлов
    traverseAndTranslate(document.body);
  }

  // Инициализация после короткой задержки
  setTimeout(initialize, 1000);
});
