function generateMealPlan() {
    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    const name = document.getElementById('name').value;
    const goal = document.getElementById('goal').value;
    let mealPlanHTML = `<html><head><title>Your Weekly Meal Plan</title></head><body>`;
    mealPlanHTML += `<h1>Meal Plan for ${name}</h1><p>Goal: ${goal}</p>`;

    // Collect and format meal plan data
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    days.forEach(day => {
        mealPlanHTML += `<h2>${day}</h2>`;
        ['breakfast', 'snack1', 'lunch', 'snack2', 'dinner'].forEach(meal => {
            const mealInput = document.querySelector(`input[name="${day.toLowerCase()}_${meal}"]`);
            const mealValue = mealInput ? mealInput.value : '';
            mealPlanHTML += `<p>${meal.charAt(0).toUpperCase() + meal.slice(1)}: ${mealValue}</p>`;
        });
    });

    mealPlanHTML += `<button onclick="window.print()">Print this page</button>`;
    mealPlanHTML += `<button onclick="downloadMealPlan()">Download this plan</button>`;
    mealPlanHTML += `</body></html>`;

    const newWin = window.open("", "_blank");
    newWin.document.write(mealPlanHTML);
    newWin.document.close();
}

function validateEmail(email) {
    return email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

function downloadMealPlan() {
    const element = document.createElement('a');
    const htmlContent = document.documentElement.innerHTML; // This captures the current document's HTML content
    const file = new Blob([htmlContent], {type: 'text/html'});
    element.href = URL.createObjectURL(file);
    element.download = 'meal_plan.html';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}
