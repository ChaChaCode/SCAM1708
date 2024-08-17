// Функция для создания нового пользователя
function createUser(username) {
    const user = {
        username: username,
        coins: 0
    };
    localStorage.setItem('user', JSON.stringify(user));
    return user;
}

// Функция для получения данных пользователя из localStorage
function getUser() {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
}

// Функция для обновления данных пользователя в localStorage
function updateUser(user) {
    localStorage.setItem('user', JSON.stringify(user));
}

// Функция для отображения данных пользователя на странице
function displayUserInfo(user) {
    document.querySelector('.mycoin').textContent = user.coins.toFixed(6);
    document.querySelector('.username').textContent = user.username;
}

// Инициализация пользователя
function initUser() {
    let user = getUser();
    if (!user) {
        const username = prompt('Введите ваше имя пользователя:');
        user = createUser(username);
    }
    displayUserInfo(user);

    return user;
}

// Обработка нажатия на кнопку для увеличения количества коинов
document.getElementById('tapText').addEventListener('click', function() {
    let user = getUser();
    if (user) {
        user.coins += 0.009100; // Значение коинов за один тап
        updateUser(user);
        displayUserInfo(user);
    }
});

// Инициализация пользователя при загрузке страницы
document.addEventListener('DOMContentLoaded', function() {
    initUser();
});
