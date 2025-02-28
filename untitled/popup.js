document.addEventListener('DOMContentLoaded', () => {
    const compareButton = document.getElementById('compare-button');
    const clearButton = document.getElementById('clear-button');
    const copyResultButton = document.getElementById('copy-result-button');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const text1 = document.getElementById('text1');
    const text2 = document.getElementById('text2');
    const resultDiv = document.getElementById('result');
    const characterCount = document.getElementById('character-count');

    // Load saved text and dark mode preference
    chrome.storage.sync.get(['text1', 'text2', 'darkMode'], (data) => {
        if (data.text1) text1.value = data.text1;
        if (data.text2) text2.value = data.text2;
        if (data.darkMode) {
            document.body.classList.add('dark-mode');
            darkModeToggle.checked = true;
        } 
    });

    // Save text when it changes
    text1.addEventListener('input', () => {
        chrome.storage.sync.set({ text1: text1.value });
    });

    text2.addEventListener('input', () => {
        chrome.storage.sync.set({ text2: text2.value });
    });

    // Compare texts
    compareButton.addEventListener('click', () => {
        const missing = findMissing(text1.value, text2.value);
        displayMissing(missing, resultDiv);
        updateCharacterCount(missing);
    });

    // Clear inputs and results
    clearButton.addEventListener('click', () => {
        text1.value = '';
        text2.value = '';
        resultDiv.innerHTML = '';
        characterCount.textContent = '';
        chrome.storage.sync.remove(['text1', 'text2']);
    });

    // Copy result to clipboard
    copyResultButton.addEventListener('click', () => {
        const resultText = resultDiv.textContent;
        navigator.clipboard.writeText(resultText).then(() => {
            alert('Result copied to clipboard!');
        });
    });

    // Toggle dark mode
    darkModeToggle.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        chrome.storage.sync.set({ darkMode: darkModeToggle.checked });
    });

    // Display missing characters
    function displayMissing(missing, container) {
        container.innerHTML = '';
        if (missing.length === 0) {
            container.textContent = 'No missing characters or substrings!';
        } else {
            missing.forEach(part => {
                const span = document.createElement('span');
                span.textContent = part.value;
                span.className = part.type; // 'missing'
                container.appendChild(span);
            });
        }
    }

    // Update character count
    function updateCharacterCount(missing) {
        characterCount.textContent = `Missing Characters: ${missing.length}`;
    }
});
