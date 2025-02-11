// diff.js
function findMissing(text1, text2) {
    const missing = [];
    let i = 0, j = 0;

    while (i < text1.length || j < text2.length) {
        if (i < text1.length && j < text2.length && text1[i] === text2[j]) {
            // Characters are the same, move to the next character
            i++;
            j++;
        } else {
            // Character is missing in text2
            if (i < text1.length) {
                missing.push({ value: text1[i], type: 'missing' });
                i++;
            }
            // Skip characters in text2 that are not in text1
            if (j < text2.length) {
                j++;
            }
        }
    }

    return missing;
}

// Export the function for use in popup.js
window.findMissing = findMissing;