document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('inputBox');
    const buttons = document.querySelectorAll('button');
    const historyContainer = document.getElementById('history');
    const themeSwitch = document.getElementById('themeSwitch');
    const menuBtn = document.getElementById('menuBtn');
    const historyContainerWrapper = document.getElementById('historyContainer');
    let string = "";

    function updateHistory(result) {
        const historyItem = document.createElement('div');
        historyItem.textContent = result;
        historyContainer.appendChild(historyItem);
        saveHistory(result);
    }

    function saveHistory(result) {
        let history = JSON.parse(localStorage.getItem('calcHistory')) || [];
        history.push(result);
        localStorage.setItem('calcHistory', JSON.stringify(history));
    }

    function loadHistory() {
        const history = JSON.parse(localStorage.getItem('calcHistory')) || [];
        history.forEach(item => {
            const historyItem = document.createElement('div');
            historyItem.textContent = item;
            historyContainer.appendChild(historyItem);
        });
    }

    function clearHistory() {
        historyContainer.innerHTML = '';
        localStorage.removeItem('calcHistory');
    }


    function handleButtonClick(e) {
        try {
            const value = e.target.innerHTML;
            if (value === '=') {
                if (string) {
                    const result = eval(string);
                    updateHistory(`${string} = ${result}`);
                    string = result.toString();
                    input.value = string;
                }
            } else if (value === 'AC') {
                string = "";
                input.value = string;
                clearHistory();
            } else if (value === 'DEL') {
                string = string.substring(0, string.length - 1);
                input.value = string;
            } else {
                string += value;
                input.value = string;
            }
        } catch (error) {
            input.value = "Error";
            string = "";
        }
    }

    buttons.forEach(button => {
        button.addEventListener('click', handleButtonClick);
    });

    window.addEventListener('keydown', (e) => {
        try {
            if (e.key === 'Enter') {
                if (string) {
                    const result = eval(string);
                    updateHistory(`${string} = ${result}`);
                    string = result.toString();
                    input.value = string;
                }
            } else if (e.key === 'Backspace') {
                string = string.substring(0, string.length - 1);
                input.value = string;
            } else if (e.key === 'Escape') {
                string = "";
                input.value = string;
                clearHistory();
            } else if (!isNaN(e.key) || ['+', '-', '*', '/', '.', '%'].includes(e.key)) {
                string += e.key;
                input.value = string;
            }
        } catch (error) {
            input.value = "Error";
            string = "";
        }
    });

    themeSwitch.addEventListener('change', (e) => {
        document.body.classList.toggle('light-mode', e.target.checked);
    });

    

    
});
