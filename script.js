const submit = document.querySelector("button[type=button]");
const address = document.querySelector(".input__address");
const note = document.querySelector(".input__note");
const buttons = document.querySelectorAll(".container__label");
const overlay = document.getElementById("overlay");
const doorsLeft = document.querySelector("#doorsLeft");

const countSpoken = document.querySelector("#spokenCount");
const countPresentation = document.querySelector("#presentationCount");
const countClosed = document.querySelector("#closeCount");

const cross = document.querySelector(".svg-remove");

let data = "";
let doors = 0;
let spokeCount = 0;
let presentCount = 0;
let closedCount = 0;

// Buttons Event listener
buttons.forEach(button => {
  button.addEventListener("click", e => {
    // remove clicked from buttons
    buttons.forEach(btn => btn.classList.remove("clicked"));
    // add class to selected button
    e.target.classList.add("clicked");
    const da = e.target.getAttribute("data-id");
    data = da;
  });
});

submit.addEventListener("click", e => {
  const isSelected = Array.from(buttons).some(button =>
    button.classList.contains("clicked")
  );

  if (!address.value || !isSelected)
    alert("Provide address and select the option");
  else {
    doors++;
    if (doors >= 150) on();

    doorsLeft.innerHTML = doors;

    if (data === "spoken") {
      spokeCount++;
      countSpoken.innerHTML = spokeCount;
    }

    if (data === "presentation") {
      spokeCount++;
      presentCount++;
      countSpoken.innerHTML = spokeCount;
      countPresentation.innerHTML = presentCount;
    }

    if (data === "closed") {
      spokeCount++;
      presentCount++;
      closedCount++;
      countSpoken.innerHTML = spokeCount;
      countPresentation.innerHTML = presentCount;
      countClosed.innerHTML = closedCount;
    }

    // APPEND TO DOM
    const newElement = document.createElement("li");
    newElement.innerHTML = `
   <li>
    <p class="append-paragraph">${address.value}</p>
    <span class="append-note">${note.value}</span> <span class="spanData append-option" data-id="${data}">${data}</span> <svg class="svg-remove svg">
     <use xlink:href="images/sprite.svg#icon-cancel-circle" class="svg-away"></use>
    </svg>
   </li> 
   `;

    const parentEl = document.querySelector(".callbackList");
    parentEl.appendChild(newElement);

    // REMOVE ELEMENT
    newElement.addEventListener("click", function (e) {
      const removeButton = e.target.closest(".svg-remove");

      const addressEdit = e.target.closest(".append-paragraph");
      const noteEdit = e.target.closest(".append-note");
      const optionEdit = e.target.closest(".append-option");

      const spanData = newElement.querySelector(".spanData");
      const dataId = spanData.getAttribute("data-id");

      if (removeButton) {
        doors--;
        newElement.remove();
        doorsLeft.innerHTML = doors;

        if (dataId === "spoken") {
          spokeCount--;
          countSpoken.innerHTML = spokeCount;
        }
        if (dataId === "presentation") {
          spokeCount--;
          presentCount--;
          countSpoken.innerHTML = spokeCount;
          countPresentation.innerHTML = presentCount;
        }
        if (dataId === "closed") {
          spokeCount--;
          presentCount--;
          closedCount--;
          countSpoken.innerHTML = spokeCount;
          countPresentation.innerHTML = presentCount;
          countClosed.innerHTML = closedCount;
        }
      }
      if (addressEdit) {
        console.log("paragraph");
        editElement(addressEdit);
      }

      if (noteEdit) {
        console.log("note");
        editElement(noteEdit);
      }

      if (optionEdit) {
        optionEdit.contentEditable = "true";
        optionEdit.focus();

        let editingCompleted = false;

        optionEdit.addEventListener("blur", function () {
          if (!editingCompleted) {
            editingCompleted = true;
            optionEdit.contentEditable = "false"; // Disable editing when the element loses focus
            console.log("Editing completed:", optionEdit.textContent);
          }
        });
      }
    });

    // Clear
    address.value = "";
    note.value = "";
    buttons.forEach(btn => btn.classList.remove("clicked"));
  }
});

// OVERLAY
function on() {
  overlay.style.display = "block";
}

function off() {
  overlay.style.display = "none";
}

overlay.addEventListener("click", function () {
  off();
});

function editElement(el) {
  el.contentEditable = "true";
  el.focus();

  let editingCompleted = false;

  el.addEventListener("blur", function () {
    if (!editingCompleted) {
      editingCompleted = true;
      el.contentEditable = "false"; // Disable editing when the element loses focus
      console.log("Editing completed:", el.textContent);
    }
  });
}
