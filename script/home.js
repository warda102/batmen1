
let formulaire = document.querySelector('form');
formulaire.addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('modal').style.display = 'flex';
});
let body = document.querySelector('body');
body.onclick = function() {
    document.getElementById('modal').style.display = 'none';
}