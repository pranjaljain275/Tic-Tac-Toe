function playerEdit(event) {
    playerConfigOverlayElement.style.display = 'block';
    backdropElement.style.display = 'block';
    editedPlayer = +event.target.dataset.playerid;    // +'1' = 1
}

function closePlayerConfig(event) {
    playerConfigOverlayElement.style.display = 'none';
    backdropElement.style.display = 'none';
    formElement.firstElementChild.classList.remove('error');
    errorParagraphForm.textContent = '';
    formElement.firstElementChild.lastElementChild.value = '';
}

function savePlayerConfig(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const enteredPlayername = formData.get('playername').trim();

    if (!enteredPlayername) {    // enteredPlayername === ''
        formElement.firstElementChild.classList.add('error');
        errorParagraphForm.textContent = 'Please enter a valid name';
        return;
    }
    const updatedPlayerDataElement = document.getElementById('player-' + editedPlayer + '-data');
    updatedPlayerDataElement.children[1].textContent = enteredPlayername;

    // if (editedPlayer === 1) {
    //     players[0].name = enteredPlayername;
    // } else {
    //     players[1].name = enteredPlayername;
    // }
    players[editedPlayer - 1].name = enteredPlayername;

    closePlayerConfig();
}