var modal = document.getElementById("myModal");
var btn = document.getElementById("levelbuttonContainer");
var span = document.getElementsByClassName("close")[0];
var iframe = document.querySelector(".modal-content iframe");

window.onclick = function(event) {
  if (event.target == modal) {
    closeModal();
  }
}

window.addEventListener('message', function(event) {
  if (event.data === 'closeModal') {
    closeModal();
  }
});

function closeModal() {
  window.parent.postMessage('closeModal', '*');
}

function closeModal() {
  if (modal) {
    modal.classList.add('fade-out');
    setTimeout(function() {
      if (modal) {
        modal.style.display = "none";
        document.body.classList.remove('modal-open');
        modal.classList.remove('fade-out');
      }
      if (iframe) {
        iframe.src = ''; // Очистка содержимого iframe
        iframe.src = 'levels.html'; // Восстановление исходного содержимого
      }
    }, 300);
  }
}
