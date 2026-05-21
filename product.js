const roomName = document.getElementById("roomName");
const roomType = document.getElementById("roomType");
const addbtn = document.getElementById("addbtn");
const roomContainer = document.getElementById("roomContainer");
const allocateStudent = document.getElementById("addStudentbtn")
const studentName = document.getElementById("studentName")


/*To add new room*/
addbtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (!roomName.value) return alert("Please enter a room number");

  const capacities = { single: 1, double: 2, triple: 3 };
  const maxCapacity = capacities[roomType.value] || 1;

  const roomDetails = document.createElement("div");

  roomDetails.innerHTML = `<div data-maxroomCapacity="${maxCapacity}" class="flex flex-col gap-2 border border-gray-300 rounded-lg p-4 bg-white">
        <h2 class="font-bold text-lg">Room <span id="roomNumber">${roomName.value}</span></h2>
        <p class="text-sm text-gray-600">${roomType.value} · <span id="occupied">0</span>/${maxCapacity} occupied</p>
        <span id="status" class="text-sm font-semibold text-green-600">Available</span>
        <div id="studentName" class="text-sm text-gray-500 italic">No students yet</div>
        <button id="addStudentbtn" class="bg-blue-600 hover:bg-blue-700 text-white rounded px-3 py-1 mt-2">+ Add Student</button>
        <button id="removebtn" class="bg-red-600 hover:bg-red-700 text-white rounded px-3 py-1">- Remove Room</button>
      </div>`;
  /* Appends just the inner div cleanly*/
  roomContainer.append(roomDetails.firstElementChild);
  roomName.value = "";
  alert("Room created successfully");

});


/*Allocate Student*/
roomContainer.addEventListener("click", (event) => {

  const roomCard = event.target.closet("[data-maxroomCapacity]");
  if (!roomCard) return;

  /* Add Student Button Clicked*/
  if (event.target.id === "addStudentbtn") {
    /*We use querySelector here instead of getElementById because of a golden rule in web development: document.getElementById always searches the entire webpage from the very top, and it will only ever return the first match it finds. */
    const studentNameDiv = roomCard.querySelector("#studentName");
    const occupiedSpan = roomCard.querySelector("#occupied");
    const statusSpan = roomCard.querySelector("#status");

    let currentOccupant = parseInt(occupiedSpan.textContent);
    const maxroomCapacity = parseInt(roomCard.dataset.maxroomCapacity);

    if (currentOccupant >= maxroomCapacity) return alert("This room is already fully occupied!");

    const name = prompt("Enter student name:");
    if (!name || !name.trim()) return;
    const newName = name.trim();

    if (studentNameDiv.textContent.toLowerCase().includes(newName.toLocaleLowerCase())) {
      return alert("Student is already allocated to this room!");
    }
    if (current === 0) {
      // Clear out "No students yet" and create a clean list structure
      // By default, Tailwind CSS strips away all standard browser styling from elements to give you a blank slate. If you don't add list-disc, your <li> items won't have bullet points and will just look like plain text stacked on top of each other.
      studentNameDiv.innerHTML = `<ul class="list-disc pl-4 flex flex-col gap-1"></ul>`;
    }

    // Grab the list and append the student as an <li> tag
    const studentList = studentNameDiv.querySelector("ul");
    studentList.innerHTML += `<li class="student-tag cursor-pointer hover:text-red-600 hover:line-through transition-colors" title="Click to remove">
    ${cleanedName}</li>`;


    currentOccupant++;
    occupiedSpan.textContent = currentOccupant;

    if (currentOccupant === maxroomCapacity) {
      statusSpan.textContent = "Full";
      statusSpan.className = "text-sm font-semibold text-red-600";
    } else {
      statusSpan.textContent = "Partially Occupied";
      statusSpan.className = "text-sm font-semibold text-yellow-600";
    }
  }



  /* Remove Room Button Clicked*/

  if (event.target.id === "removebtn") {
    if (confirm("Are you sure you want to remove this room?")) roomCard.remove();
  }
});

