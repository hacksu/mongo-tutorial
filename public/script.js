function toggleAddTask() {
    let div = document.getElementById('new-task');
    if (div.style.display !== 'flex') {
        div.style.display = 'flex';
    }

    let button = document.getElementById('cancel-button');
    if (button.style.display !== 'block') {
        button.style.display = 'block';
    }
}

function hideAddTask() {
    let div = document.getElementById('new-task');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }

    let button = document.getElementById('cancel-button');
    if (button.style.display !== 'none') {
        button.style.display = 'none';
    }
}
