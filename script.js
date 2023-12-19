let callbackList = [];
let optionTracker = { spoken: 0, presentation: 0, close: 0 };
let doorsLeft = 150;

function submitCallback() {
  const address = document.querySelector('input[name="address"]').value;
  const selectedOption = document.querySelector(
    'input[name="callbackOption"]:checked'
  );
  const note = document.querySelector('input[name="note"]').value;

  if (address && selectedOption) {
    const optionValue = selectedOption.value;
    const entry = { address, optionValue, note };

    const existingEntryIndex = callbackList.findIndex(
      (item) => item.address === address
    );

    if (existingEntryIndex !== -1) {
      // If the address already exists, reset the counts for the old option
      const prevOptionValue = callbackList[existingEntryIndex].optionValue;
      optionTracker[prevOptionValue]--;

      // Update the option and note
      callbackList[existingEntryIndex].optionValue = optionValue;
      callbackList[existingEntryIndex].note = note;
    } else {
      // Otherwise, add a new entry
      callbackList.push(entry);
    }

    // Update the counts based on the chosen option
    if (optionValue === "spoken") {
      optionTracker["spoken"]++;
    } else if (optionValue === "presentation") {
      optionTracker["presentation"]++;
      optionTracker["spoken"]++;
    } else if (optionValue === "close") {
      optionTracker["close"]++;
      optionTracker["presentation"]++;
      optionTracker["spoken"]++;
    }

    // Decrease doorsLeft by one
    doorsLeft--;

    updateTracker();

    // Display a message if doorsLeft reaches 0
    if (doorsLeft === 0) {
      alert("You just reached 150 doors. You can start your relap.");
    }

    document.getElementById("callbackForm").reset();
  } else {
    alert(
      "Please enter address, select an option, and add a note before submitting. 😉"
    );
  }
}

function updateTracker() {
  const callbackListElement = document.getElementById("callbackList");
  callbackListElement.innerHTML = "";

  callbackList.forEach((entry, index) => {
    const listItem = document.createElement("li");

    // Display the address, option, and note
    listItem.innerHTML += `${entry.address} - ${entry.optionValue} (Note: ${
      entry.note || "None"
    })`;
    callbackListElement.appendChild(listItem);
  });

  // Display counts and doorsLeft
  document.getElementById("spokenCount").innerText = optionTracker["spoken"];
  document.getElementById("presentationCount").innerText =
    optionTracker["presentation"];
  document.getElementById("closeCount").innerText = optionTracker["close"];
  document.getElementById("doorsLeft").innerText = doorsLeft;
}

function editEntry(event) {
  const target = event.target;
  if (target.tagName === "LI") {
    const address = target.innerText.split("-")[0].trim();
    const entry = callbackList.find((item) => item.address === address);

    if (entry) {
      // Reset counts for the specific entry before updating based on the new values
      optionTracker[entry.optionValue]--;

      const newAddress = prompt(
        `Edit address for ${entry.address}:`,
        entry.address
      );
      const newOption = prompt(
        `Edit option spoken, presentation, or close:`,
        entry.optionValue
      );
      const newNote = prompt(
        `Edit note (current: ${entry.note || "None"}):`,
        entry.note
      );

      if (
        newAddress !== null &&
        newOption !== null &&
        ["spoken", "presentation", "close"].includes(newOption.toLowerCase())
      ) {
        // Handle count adjustments based on the new option
        if (newOption === "spoken") {
          // Editing from spoken to spoken (no change in counts)
        } else if (newOption === "presentation") {
          // Editing from spoken to presentation
          optionTracker["spoken"]++;
          optionTracker["presentation"]++;
        } else if (newOption === "close") {
          // Editing from spoken to close
          optionTracker["presentation"]++;
          optionTracker["close"]++;
        }

        // Update the address, option, and note
        entry.address = newAddress;
        entry.optionValue = newOption.toLowerCase();
        entry.note = newNote;

        updateTracker();
      } else {
        alert("Please enter a valid address and option.");
      }
    }
  }
}
