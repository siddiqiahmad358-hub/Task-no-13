// JavaScript Practice Programs
// All 5 programs in one file

// Global console output storage
let consoleOutput = [];

// Custom console.log function
function log(message) {
    consoleOutput.push(message);
    console.log(message);
}

// Clear console output
function clearConsole() {
    consoleOutput = [];
    document.getElementById('console-output').textContent = '';
}

// Display output in HTML
function displayOutput(html) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = html;
    outputDiv.classList.add('show');
    
    // Also display in console section
    document.getElementById('console-output').textContent = consoleOutput.join('\n');
}

// Main function to run selected program
function runProgram(programNum) {
    clearConsole();
    
    log(`=== Running Program ${programNum} ===`);
    
    switch(programNum) {
        case 1:
            groceryBillCalculator();
            break;
        case 2:
            studentResultSystem();
            break;
        case 3:
            atmWithdrawalSystem();
            break;
        case 4:
            restaurantOrderSystem();
            break;
        case 5:
            employeeSalaryCalculator();
            break;
        default:
            log("Invalid program number");
    }
}

// ============================================
// PROGRAM 1: Grocery Bill Calculator
// ============================================
function groceryBillCalculator() {
    log("\n--- GROCERY BILL CALCULATOR ---");
    
    // Ask user for number of items
    const numItems = parseInt(prompt("Enter the number of items:"));
    
    // Validate input
    if (isNaN(numItems) || numItems <= 0) {
        displayOutput("<div class='result-box error'>Please enter a valid number of items.</div>");
        return;
    }
    
    // Use a loop to ask for price of each item
    let total = 0;
    
    for (let i = 1; i <= numItems; i++) {
        let price = parseFloat(prompt("Enter price of item " + i + ":"));
        
        // Validate price
        if (isNaN(price) || price < 0) {
            price = 0;
            log("Invalid price entered. Using 0 for item " + i);
        }
        
        total += price;
        log("Item " + i + " Price: Rs. " + price);
    }
    
    log("Total before discount: Rs. " + total);
    
    // Function to calculate bill
    function calculateBill(billTotal) {
        let finalBill = billTotal;
        let discount = 0;
        
        // If total bill > 5000, apply 10% discount
        if (billTotal > 5000) {
            discount = billTotal * 0.10;
            finalBill = billTotal - discount;
            log("Discount (10%): Rs. " + discount);
        }
        
        return {
            original: billTotal,
            discount: discount,
            final: finalBill
        };
    }
    
    // Calculate the bill
    const billResult = calculateBill(total);
    
    log("Final Bill: Rs. " + billResult.final);
    
    // Display results in HTML
    let html = "<div class='result-box info'>";
    html += "<h3>🧾 Grocery Bill Summary</h3>";
    html += "<p>Number of Items: " + numItems + "</p>";
    html += "<p>Total Bill: Rs. " + billResult.original.toFixed(2) + "</p>";
    
    if (billResult.discount > 0) {
        html += "<p style='color: green;'>🎉 Discount Applied (10%): Rs. " + billResult.discount.toFixed(2) + "</p>";
    }
    
    html += "<p><strong>Final Bill: Rs. " + billResult.final.toFixed(2) + "</strong></p>";
    html += "</div>";
    
    displayOutput(html);
}

// ============================================
// PROGRAM 2: Student Result System
// ============================================
function studentResultSystem() {
    log("\n--- STUDENT RESULT SYSTEM ---");
    
    // Ask user for student name
    const studentName = prompt("Enter student name:");
    
    if (!studentName || studentName.trim() === "") {
        displayOutput("<div class='result-box error'>Please enter a valid student name.</div>");
        return;
    }
    
    log("Student Name: " + studentName);
    
    // Ask for 5 subject marks using a loop
    let marks = [];
    const subjects = ["English", "Math", "Science", "History", "Computer"];
    
    for (let i = 0; i < 5; i++) {
        let mark = parseFloat(prompt("Enter marks for " + subjects[i] + ":"));
        
        // Validate marks
        if (isNaN(mark) || mark < 0 || mark > 100) {
            log("Invalid marks for " + subjects[i] + ". Please enter 0-100.");
            mark = parseFloat(prompt("Enter marks for " + subjects[i] + ":"));
        }
        
        marks.push(mark);
        log(subjects[i] + ": " + mark);
    }
    
    // Use operators to calculate total and average
    let total = 0;
    for (let i = 0; i < marks.length; i++) {
        total += marks[i];
    }
    
    let average = total / marks.length;
    log("Total Marks: " + total + "/500");
    log("Average: " + average);
    
    // Function to calculate grade
    function calculateGrade(avg) {
        if (avg >= 80) {
            return "A";
        } else if (avg >= 60) {
            return "B";
        } else if (avg >= 40) {
            return "C";
        } else {
            return "Fail";
        }
    }
    
    // Get the grade
    const grade = calculateGrade(average);
    log("Grade: " + grade);
    
    // Determine grade description
    let gradeDesc = "";
    if (grade === "A") gradeDesc = "Excellent!";
    else if (grade === "B") gradeDesc = "Good job!";
    else if (grade === "C") gradeDesc = "Average.";
    else gradeDesc = "Need improvement.";
    
    // Display results
    let html = "<div class='result-box info'>";
    html += "<h3>🎓 Student Result Card</h3>";
    html += "<p><strong>Student Name:</strong> " + studentName + "</p>";
    html += "<p><strong>Marks in 5 Subjects:</strong> " + marks.join(", ") + "</p>";
    html += "<p><strong>Total Marks:</strong> " + total + "/500</p>";
    html += "<p><strong>Average:</strong> " + average.toFixed(2) + "</p>";
    
    let gradeColor = grade === "A" ? "#2e7d32" : grade === "B" ? "#1565c0" : grade === "C" ? "#f57c00" : "#c62828";
    html += "<p><strong>Grade:</strong> <span style='color: " + gradeColor + "; font-weight: bold;'>" + grade + "</span> - " + gradeDesc + "</p>";
    html += "</div>";
    
    displayOutput(html);
}

// ============================================
// PROGRAM 3: ATM Withdrawal System
// ============================================
function atmWithdrawalSystem() {
    log("\n--- ATM WITHDRAWAL SYSTEM ---");
    
    // Create a variable balance
    let balance = 10000;
    log("Initial Balance: Rs. " + balance);
    
    // Function to withdraw money
    function withdrawMoney(amount) {
        // Condition: If withdrawal amount > balance → show "Insufficient balance"
        if (amount > balance) {
            log("ERROR: Insufficient balance!");
            return {
                success: false,
                message: "Insufficient balance!",
                remainingBalance: balance
            };
        } else {
            // Otherwise subtract using operators
            balance = balance - amount;
            log("Withdrawal successful!");
            log("Amount withdrawn: Rs. " + amount);
            return {
                success: true,
                message: "Withdrawal successful!",
                remainingBalance: balance
            };
        }
    }
    
    // Allow 3 attempts using a loop
    let attempts = 0;
    let maxAttempts = 3;
    let transactions = [];
    
    while (attempts < maxAttempts) {
        // Ask the user how much money they want to withdraw
        let withdrawAmount = parseFloat(prompt("Attempt " + (attempts + 1) + "/" + maxAttempts + "\nEnter amount to withdraw:"));
        
        // Validate input
        if (isNaN(withdrawAmount) || withdrawAmount <= 0) {
            log("Invalid amount entered!");
            continue;
        }
        
        log("Attempt " + (attempts + 1) + ": Requested Rs. " + withdrawAmount);
        
        // Call the withdrawMoney function
        let result = withdrawMoney(withdrawAmount);
        
        transactions.push({
            attempt: attempts + 1,
            amount: withdrawAmount,
            success: result.success,
            message: result.message,
            remaining: result.remainingBalance
        });
        
        attempts++;
        
        // Ask if user wants to continue
        if (attempts < maxAttempts) {
            let continueChoice = confirm("Do you want to make another withdrawal?");
            if (!continueChoice) {
                break;
            }
        }
    }
    
    log("Remaining Balance: Rs. " + balance);
    
    // Display results
    let html = "<div class='result-box info'>";
    html += "<h3>🏧 ATM Transaction Summary</h3>";
    html += "<p><strong>Initial Balance:</strong> Rs. 10,000</p>";
    html += "<hr>";
    
    for (let t of transactions) {
        html += "<p>Attempt " + t.attempt + ": ";
        if (t.success) {
            html += "<span style='color: green;'>✅ Withdrawn Rs. " + t.amount + "</span>";
        } else {
            html += "<span style='color: red;'>❌ " + t.message + "</span>";
        }
        html += "</p>";
    }
    
    html += "<hr>";
    html += "<p><strong>Final Balance: Rs. " + balance + "</strong></p>";
    
    if (attempts >= maxAttempts) {
        html += "<p>⚠️ Maximum attempts (3) reached.</p>";
    }
    
    if (balance === 0) {
        html += "<p>💳 Your account balance is now Rs. 0.</p>";
    }
    
    html += "</div>";
    
    displayOutput(html);
}

// ============================================
// PROGRAM 4: Restaurant Order System
// ============================================
function restaurantOrderSystem() {
    log("\n--- RESTAURANT ORDER SYSTEM ---");
    
    // Menu prices stored in variables
    const burgerPrice = 500;
    const pizzaPrice = 1200;
    const drinkPrice = 200;
    
    log("Menu: Burger = Rs.500, Pizza = Rs.1200, Drink = Rs.200");
    
    // Ask user what item they want
    let item = prompt("What would you like to order?\n1. Burger (Rs.500)\n2. Pizza (Rs.1200)\n3. Drink (Rs.200)\n\nEnter the item name or number:");
    
    // Validate item selection
    if (!item) {
        displayOutput("<div class='result-box error'>Please select an item from the menu.</div>");
        return;
    }
    
    // Normalize input
    item = item.toLowerCase();
    
    // Determine price based on selection
    let price = 0;
    let itemName = "";
    
    if (item === "1" || item === "burger") {
        price = burgerPrice;
        itemName = "Burger";
    } else if (item === "2" || item === "pizza") {
        price = pizzaPrice;
        itemName = "Pizza";
    } else if (item === "3" || item === "drink") {
        price = drinkPrice;
        itemName = "Drink";
    } else {
        displayOutput("<div class='result-box error'>Invalid item selection. Please refresh and try again.</div>");
        return;
    }
    
    log("Selected Item: " + itemName + " (Rs. " + price + ")");
    
    // Ask for quantity
    let quantity = parseInt(prompt("How many " + itemName + "(s) would you like to order?"));
    
    // Validate quantity
    if (isNaN(quantity) || quantity <= 0) {
        quantity = 1;
        log("Invalid quantity. Using 1 as default.");
    }
    
    log("Quantity: " + quantity);
    
    // Function to calculate order
    function calculateOrder(itemPrice, qty) {
        let totalPrice = itemPrice * qty;
        let discount = 0;
        let finalPrice = totalPrice;
        
        // Condition: If bill > 2000 → give 15% discount
        if (totalPrice > 2000) {
            discount = totalPrice * 0.15;
            finalPrice = totalPrice - discount;
            log("Discount (15%): Rs. " + discount);
        }
        
        log("Total before discount: Rs. " + totalPrice);
        log("Final Bill: Rs. " + finalPrice);
        
        return {
            unitPrice: itemPrice,
            quantity: qty,
            total: totalPrice,
            discount: discount,
            final: finalPrice
        };
    }
    
    // Calculate the order
    const orderResult = calculateOrder(price, quantity);
    
    // Display results
    let html = "<div class='result-box info'>";
    html += "<h3>🧾 Order Summary</h3>";
    html += "<p><strong>Item:</strong> " + itemName + "</p>";
    html += "<p><strong>Unit Price:</strong> Rs. " + orderResult.unitPrice + "</p>";
    html += "<p><strong>Quantity:</strong> " + orderResult.quantity + "</p>";
    html += "<p><strong>Total Bill:</strong> Rs. " + orderResult.total + "</p>";
    
    if (orderResult.discount > 0) {
        html += "<p style='color: green;'>🎉 Discount Applied (15%): Rs. " + orderResult.discount.toFixed(2) + "</p>";
    }
    
    html += "<p><strong>Final Bill: Rs. " + orderResult.final.toFixed(2) + "</strong></p>";
    html += "</div>";
    
    displayOutput(html);
}

// ============================================
// PROGRAM 5: Employee Salary Calculator
// ============================================
function employeeSalaryCalculator() {
    log("\n--- EMPLOYEE SALARY CALCULATOR ---");
    
    // Hourly rate
    const hourlyRate = 500;
    log("Hourly Rate: Rs. " + hourlyRate);
    log("Overtime Rate: Rs. " + (hourlyRate * 1.5) + " (1.5x)");
    
    // Function to calculate salary
    function calculateSalary(name, hours) {
        let salary = 0;
        let regularHours = hours;
        let overtimeHours = 0;
        let overtimePay = 0;
        
        // Condition: If hours > 40 → give overtime bonus (1.5× rate)
        if (hours > 40) {
            regularHours = 40;
            overtimeHours = hours - 40;
            overtimePay = overtimeHours * (hourlyRate * 1.5);
            salary = (regularHours * hourlyRate) + overtimePay;
            log(name + " - Regular (40hrs): Rs. " + (regularHours * hourlyRate));
            log(name + " - Overtime (" + overtimeHours + "hrs): Rs. " + overtimePay);
        } else {
            salary = hours * hourlyRate;
            log(name + " - Regular (" + hours + "hrs): Rs. " + salary);
        }
        
        return {
            name: name,
            hours: hours,
            regularHours: regularHours,
            overtimeHours: overtimeHours,
            overtimePay: overtimePay,
            finalSalary: salary
        };
    }
    
    // Use a loop to calculate salary for 3 employees
    let employees = [];
    
    for (let i = 1; i <= 3; i++) {
        // Ask user for employee name
        let name = prompt("Enter name of employee " + i + ":");
        
        if (!name || name.trim() === "") {
            name = "Employee " + i;
        }
        
        // Ask for hours worked
        let hours = parseFloat(prompt("Enter hours worked by " + name + ":"));
        
        // Validate hours
        if (isNaN(hours) || hours < 0) {
            hours = 0;
            log("Invalid hours for " + name + ". Using 0.");
        }
        
        // Calculate salary
        let salaryData = calculateSalary(name, hours);
        employees.push(salaryData);
    }
    
    // Display results
    let html = "<div class='result-box info'>";
    html += "<h3>👨‍💼 Employee Salary Details</h3>";
    html += "<p><strong>Hourly Rate:</strong> Rs. 500 | <strong>Overtime:</strong> 1.5x (Rs. 750/hr)</p>";
    html += "<hr>";
    
    for (let i = 0; i < employees.length; i++) {
        let emp = employees[i];
        
        html += "<div style='background-color: #f3e5f5; padding: 10px; margin: 10px 0; border-radius: 5px; border-left: 4px solid #6a1b9a;'>";
        html += "<h4>Employee: " + emp.name + "</h4>";
        html += "<p><strong>Hours Worked:</strong> " + emp.hours + "</p>";
        
        if (emp.overtimeHours > 0) {
            html += "<p>Regular Hours (40): " + emp.regularHours + " | Overtime: " + emp.overtimeHours + " hrs</p>";
            html += "<p style='color: green;'>Overtime Pay: Rs. " + emp.overtimePay.toFixed(2) + "</p>";
        }
        
        html += "<p><strong>Final Salary: Rs. " + emp.finalSalary.toFixed(2) + "</strong></p>";
        html += "</div>";
    }
    
    html += "</div>";
    
    displayOutput(html);
}

// Initialize with welcome message
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('console-output').textContent = 'Click on any program button to run it...\nOutput will appear here.';
});
