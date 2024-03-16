// Currency Converter
function convertCurrency(event) {
    event.preventDefault();

    // Get the values from the form
    var amount = parseFloat(document.getElementById("amount").value);
    var fromCurrency = document.getElementById("fromCurrency").value;
    var toCurrency = document.getElementById("toCurrency").value;

    // Perform the conversion (you can replace this with your own conversion logic)
    var conversionRate = getConversionRate(fromCurrency, toCurrency);
    var result = amount * conversionRate;

    // Display the result
    document.getElementById("result").innerHTML = `${amount} ${fromCurrency} is equal to ${result.toFixed(2)} ${toCurrency}`;
}

// Replace this function with your own conversion logic or API call
function getConversionRate(fromCurrency, toCurrency) {
    // Example conversion rates (replace with your own)
    var conversionRates = {
        "NPR": { "NPR": 1, "INR": 0.625, "KRW": 12.45, "USD": 0.009, "EUR": 0.007 },
        "INR": { "NPR": 1.6, "INR": 1, "KRW": 20.16, "USD": 0.012, "EUR": 0.009 },
        "KRW": { "NPR": 0.08, "INR": 0.05, "KRW": 1, "USD": 0.0008, "EUR": 0.0006 },
        "USD": { "NPR": 110.55, "INR": 73.94, "KRW": 1226.25, "USD": 1, "EUR": 0.82 },
        "EUR": { "NPR": 140.72, "INR": 89.65, "KRW": 1663.16, "USD": 1.22, "EUR": 1 }
    };

    return conversionRates[fromCurrency][toCurrency];
}

document.addEventListener("DOMContentLoaded", function () {
    // Check the user's preference for dark mode and update the UI accordingly
    const darkModeToggle = document.getElementById("darkModeToggle");
    darkModeToggle.checked = localStorage.getItem("darkMode") === "enabled";
    updateDarkMode();

    // Add event listener for the dark mode toggle button
    darkModeToggle.addEventListener("change", function () {
        toggleDarkMode();
    });
});

function toggleDarkMode() {
    const darkModeToggle = document.getElementById("darkModeToggle");
    const isDarkModeEnabled = darkModeToggle.checked;

    if (isDarkModeEnabled) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

function enableDarkMode() {
    document.body.classList.add("dark-mode");
    localStorage.setItem("darkMode", "enabled");
}

function disableDarkMode() {
    document.body.classList.remove("dark-mode");
    localStorage.setItem("darkMode", "disabled");
}

function updateDarkMode() {
    const isDarkModeEnabled = localStorage.getItem("darkMode") === "enabled";
    if (isDarkModeEnabled) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
}

// GPA Calculator
function generateSubjectFields() {
    var numSubjects = parseInt(document.getElementById('numSubjects').value);

    if (isNaN(numSubjects) || numSubjects <= 0) {
        displayError("Please enter a valid number of subjects.");
        return;
    }

    var subjectsContainer = document.getElementById('subjectsContainer');
    subjectsContainer.innerHTML = '';

    for (var i = 1; i <= numSubjects; i++) {
        var subjectRow = document.createElement('div');
        subjectRow.classList.add('subject-row');

        var label = document.createElement('label');
        label.textContent = 'Subject ' + i;

        var creditInput = document.createElement('input');
        creditInput.type = 'number';
        creditInput.placeholder = 'Credit Hours';
        creditInput.id = `credit${i}`;
        creditInput.required = true;

        var gradeInput = document.createElement('input');
        gradeInput.type = 'text';
        gradeInput.placeholder = 'Grade (Letter)';
        gradeInput.id = `grade${i}`;
        gradeInput.required = true;

        subjectRow.appendChild(label);
        subjectRow.appendChild(creditInput);
        subjectRow.appendChild(gradeInput);

        subjectsContainer.appendChild(subjectRow);
    }

    document.getElementById('calculateButton').style.display = 'block';
    document.getElementById('resetButton').style.display = 'none';
}

function calculateGPA() {
    var numSubjects = parseInt(document.getElementById('numSubjects').value);

    if (isNaN(numSubjects) || numSubjects <= 0) {
        displayError("Please enter a valid number of subjects.");
        return;
    }

    var totalCredits = 0;
    var totalGradePoints = 0;

    for (var i = 1; i <= numSubjects; i++) {
        var creditInput = document.getElementById(`credit${i}`);
        var gradeInput = document.getElementById(`grade${i}`);

        var credit = parseFloat(creditInput.value);
        var grade = gradeInput.value.toUpperCase();

        if (isNaN(credit) || credit <= 0 || !isValidGrade(grade)) {
            displayError("Please enter valid numeric values for credit hours and valid letter grades.");
            return;
        }

        totalCredits += credit;
        totalGradePoints += (credit * convertGradeToNumeric(grade));
    }

    if (totalCredits === 0) {
        displayError("Total credit hours cannot be zero.");
        return;
    }

    var gpa = totalGradePoints / totalCredits;
    displayResult(gpa.toFixed(2));

    document.getElementById('calculateButton').style.display = 'none';
    document.getElementById('resetButton').style.display = 'block';
}

function displayResult(gpa) {
    var modalContainer = document.createElement('div');
    modalContainer.id = 'modalContainer';
    modalContainer.innerHTML = `
        <div id="modalContent">
            <p>Your GPA is: <strong>${gpa}</strong></p>
            <button onclick="closeModal()">Close</button>
        </div>
    `;
    
    document.body.appendChild(modalContainer);
}

function closeModal() {
    var modalContainer = document.getElementById('modalContainer');
    modalContainer.parentNode.removeChild(modalContainer);
}

function displayError(message) {
    var errorContainer = document.getElementById('errorContainer');

    // Check if the error container already exists
    if (errorContainer) {
        closeError(); // Close any existing error popups
    }

    // Create and display the new error container
    errorContainer = document.createElement('div');
    errorContainer.id = 'errorContainer';
    errorContainer.innerHTML = `
        <div id="errorContent">
            <p>Error: ${message}</p>
            <button onclick="closeError()">Close</button>
        </div>
    `;

    document.body.appendChild(errorContainer);
}

function closeError() {
    var errorContainer = document.getElementById('errorContainer');

    // Check if the error container exists before attempting to remove it
    if (errorContainer) {
        errorContainer.parentNode.removeChild(errorContainer);
    }
}

function isValidGrade(grade) {
    var validGrades = ['A+', 'A', 'B+', 'B', 'C+', 'C', 'D+', 'D'];
    
    if (!validGrades.includes(grade)) {
        displayError("Please enter a valid letter grade.");
        return false;
    }

    return true;
}

function convertGradeToNumeric(grade) {
    switch (grade) {
        case 'A+':
            return 4.0;
        case 'A':
            return 3.6;
        case 'B+':
            return 3.2;
        case 'B':
            return 2.8;
        case 'C+':
            return 2.4;
        case 'C':
            return 2.0;
        case 'D+':
            return 1.6;
        case 'D':
            return 1.2;
        default:
            return 0.0;
    }
}

function resetFields() {
    document.getElementById('numSubjects').value = '';
    document.getElementById('subjectsContainer').innerHTML = '';
    document.getElementById('result').innerText = '';
    document.getElementById('calculateButton').style.display = 'block';
    document.getElementById('resetButton').style.display = 'none';
}

// Dark Mode Toggle
function toggleDarkMode() {
    var body = document.body;
    var calculator = document.getElementById('calculator');
    var modeSwitch = document.getElementById('modeSwitch');
    var modeLabel = document.getElementById('modeLabel');

    if (modeSwitch.checked) {
        body.classList.add('dark-mode');
        calculator.classList.add('dark-mode');
        modeLabel.innerText = 'Light Mode';
    } else {
        body.classList.remove('dark-mode');
        calculator.classList.remove('dark-mode');
        modeLabel.innerText = 'Dark Mode';
    }

    // Toggle light mode class
    body.classList.toggle('light-mode', !modeSwitch.checked);
    calculator.classList.toggle('light-mode', !modeSwitch.checked);
}

// About Popup
function showAboutPopup() {
    var aboutPopup = document.getElementById('aboutPopup');
    aboutPopup.style.display = 'block';
}

function closeAboutPopup() {
    var aboutPopup = document.getElementById('aboutPopup');
    aboutPopup.style.display = 'none';
}

// Date Converter
function toggleDarkMode() {
    var body = document.body;
    body.classList.toggle("dark-mode");
}

function changeConversionType() {
    var conversionType = document.getElementById("conversionType").value;
    var placeholders = ["AD Year", "AD Month", "AD Day"];

    if (conversionType === "bsToAd") {
        placeholders = ["BS Year", "BS Month", "BS Day"];
    }

    var inputFields = document.querySelectorAll(".input-fields input");
    inputFields.forEach((input, index) => {
        input.placeholder = placeholders[index];
    });
}

function convertDate() {
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
    var conversionType = document.getElementById("conversionType").value;

    if (!year || !month || !day) {
        showErrorPopup("Please fill all the fields.");
        return;
    }

    // Perform the date conversion using the provided library
    var result;
    if (conversionType === "adToBs") {
        var adDate = DateConverter(year, month, day);
        result = adDate.convertToBS().toBSString();
    } else {
        var bsDate = DateConverter(year, month, day);
        result = bsDate.convertToAD().toADString();
    }

    // Display the result in the result popup
    var resultText = document.getElementById("resultText");
    resultText.textContent = result;
    showResultPopup();
}

function showResultPopup() {
    var resultPopup = document.getElementById("resultPopup");
    resultPopup.style.display = "block";
}

function closeResultPopup() {
    var resultPopup = document.getElementById("resultPopup");
    resultPopup.style.display = "none";
}

function showErrorPopup(errorMessage) {
    var errorText = document.getElementById("errorText");
    errorText.textContent = errorMessage;

    var errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "block";
}

function closeErrorPopup() {
    var errorPopup = document.getElementById("errorPopup");
    errorPopup.style.display = "none";
}

// Tic Tac Toe
document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const status = document.getElementById('status');
    const restartButtonBottom = document.getElementById('restartButtonBottom');

    function initializeGame() {
        let currentPlayer = 'X';
        let gameActive = true;
        const cells = [];

        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.setAttribute('id', i);
            cell.addEventListener('click', () => handleCellClick(i));
            board.appendChild(cell);
            cells.push('');
        }

        status.textContent = `${currentPlayer}'s turn`;

        function handleCellClick(index) {
            if (!gameActive || cells[index] !== '') return;

            cells[index] = currentPlayer;
            document.getElementById(index).textContent = currentPlayer;

            if (checkWinner()) {
                status.textContent = `${currentPlayer} wins!`;
                gameActive = false;
                restartButtonBottom.style.display = 'block';
                return;
            }

            if (checkDraw()) {
                status.textContent = `It's a draw!`;
                gameActive = false;
                restartButtonBottom.style.display = 'block';
                return;
            }

            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            status.textContent = `${currentPlayer}'s turn`;
        }

        function checkWinner() {
            const winningConditions = [
                [0, 1, 2],
                [3, 4, 5],
                [6, 7, 8],
                [0, 3, 6],
                [1, 4, 7],
                [2, 5, 8],
                [0, 4, 8],
                [2, 4, 6]
            ];

            return winningConditions.some((condition) => {
                const [a, b, c] = condition;
                return cells[a] && cells[a] === cells[b] && cells[a] === cells[c];
            });
        }

        function checkDraw() {
            return cells.every(cell => cell !== '');
        }

        function restartGame() {
            currentPlayer = 'X';
            gameActive = true;
            cells.forEach((cell, index) => {
                cells[index] = '';
                document.getElementById(index).textContent = '';
            });
            status.textContent = `${currentPlayer}'s turn`;
            restartButtonBottom.style.display = 'none';
        }

        restartButtonBottom.addEventListener('click', restartGame);
    }

    initializeGame();

