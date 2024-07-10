const itemsArray = JSON.parse(localStorage.getItem('items')) || []; // Retrieve items from localStorage or initialize an empty array if none exists

document.querySelector("#enter").addEventListener("click", () => { // Add event listener for click on #enter button
    const item = document.querySelector("#item");
    createItem(item); // Call createItem function with the entered item
});

document.querySelector("#item").addEventListener("keypress", (e) => { // Add event listener for keypress in #item input
    if(e.key === "Enter") {
        const item = document.querySelector("#item");
        createItem(item); // Call createItem function if Enter key is pressed
    }
});

function displayDate() {
    const date = new Date().toString().split(" ").slice(1, 4).join(" "); // Format current date
    document.querySelector("#date").innerHTML = date; // Display formatted date
}

function displayItems() {
    let items = "";
    itemsArray.forEach((item) => { // Loop through itemsArray to create HTML for each item
        items += `<div class="item">
                      <div class="input-controller">
                          <textarea disabled>${item}</textarea>
                          <div class="edit-controller">
                              <i class="fa-solid fa-check deleteBtn"></i>
                              <i class="fa-solid fa-pen-to-square editBtn"></i>
                          </div>
                      </div>
                      <div class="update-controller">
                          <button class="saveBtn">Save</button>
                          <button class="cancelBtn">Cancel</button>
                      </div>
                  </div>`;
    });
    document.querySelector(".task-list").innerHTML = items; // Display items in .task-list container
    activateDeleteListeners(); // Activate delete button listeners
    activateEditListeners(); // Activate edit button listeners
    activateSaveListeners(); // Activate save button listeners
    activateCancelListeners(); // Activate cancel button listeners
}

function activateDeleteListeners() {
    const deleteBtn = document.querySelectorAll(".deleteBtn");
    deleteBtn.forEach((dB, i) => {
        dB.addEventListener("click", () => { deleteItem(i); }); // Add click event listener to each delete button
    });
}

function activateEditListeners() {
    const editBtn = document.querySelectorAll(".editBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    editBtn.forEach((eB, i) => {
        eB.addEventListener("click", () => { 
            updateController[i].style.display = "block"; // Display update controls
            inputs[i].disabled = false; // Enable textarea for editing
        });
    });
}

function activateSaveListeners() {
    const saveBtn = document.querySelectorAll(".saveBtn");
    const inputs = document.querySelectorAll(".input-controller textarea");
    saveBtn.forEach((sB, i) => {
        sB.addEventListener("click", () => {
            updateItem(inputs[i].value, i); // Call updateItem with new value on save button click
        });
    });
}

function activateCancelListeners() {
    const cancelBtn = document.querySelectorAll(".cancelBtn");
    const updateController = document.querySelectorAll(".update-controller");
    const inputs = document.querySelectorAll(".input-controller textarea");
    cancelBtn.forEach((cB, i) => {
        cB.addEventListener("click", () => {
            updateController[i].style.display = "none"; // Hide update controls
            inputs[i].disabled = true; // Disable textarea
            inputs[i].style.border = "none"; // Remove border
        });
    });
}

function createItem(item) {
    if (item.value.trim() === "") {  // Check if the input is empty or contains only whitespace
        return;  // Exit the function if the input is empty
    }
    itemsArray.push(item.value); // Add new item to itemsArray
    localStorage.setItem('items', JSON.stringify(itemsArray)); // Update localStorage with updated itemsArray
    location.reload(); // Reload the page to display updated list
}

function deleteItem(i) {
    itemsArray.splice(i, 1); // Remove item at index i from itemsArray
    localStorage.setItem('items', JSON.stringify(itemsArray)); // Update localStorage with updated itemsArray
    location.reload(); // Reload the page to display updated list
}

function updateItem(text, i) {
    itemsArray[i] = text; // Update item at index i in itemsArray
    localStorage.setItem('items', JSON.stringify(itemsArray)); // Update localStorage with updated itemsArray
    location.reload(); // Reload the page to display updated list
}

window.onload = function() {
    displayDate(); // Display current date
    displayItems(); // Display items stored in localStorage on page load
};
