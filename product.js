// 🧼 Clean out any broken values stuck in your browser's memory
if (!localStorage.getItem("hasInitialized")) {
  localStorage.clear();
  localStorage.setItem("hasInitialized", "true");
}

const roomName = document.getElementById("roomName");
const roomType = document.getElementById("roomType");
const addbtn = document.getElementById("addbtn");
const roomContainer = document.getElementById("roomContainer");

// 🔢 THE RECOUNT TOOL: Counts statuses and students directly from the HTML cards
function recountDashboardStats() {
  const allCards = roomContainer.querySelectorAll("[data-maxroomcapacity]");
  
  let total = 20; // Fixed total rooms displayed on dashboard
  let available = 0;
  let partial = 0;
  let full = 0;
  let currentlyFilled = 0;

  allCards.forEach((card) => {
    const currentStatus = card.querySelector("#status").textContent.trim();
    const occupiedCount = parseInt(card.querySelector("#occupied").textContent || "0");
    const maintBtn = card.querySelector("#maintenancebtn");
    
    currentlyFilled = currentlyFilled + occupiedCount;

    // Fixes the initial state mismatch for hardcoded maintenance rooms like Room 104
    if (currentStatus === "Maintenance" && maintBtn && maintBtn.textContent.trim() === "Mark Maintenance") {
      maintBtn.textContent = "Maintenance Done";
    }

    if (currentStatus === "Available") {
      available = available + 1;
    } else if (currentStatus === "Partially Occupied") {
      partial = partial + 1;
    } else if (currentStatus === "Full") {
      full = full + 1;
    }
  });

  let occupancyRate = 0;
  if (currentlyFilled > 0) {
    occupancyRate = Math.round((currentlyFilled / 39) * 100);
  }

  localStorage.setItem("totalRooms", total);
  localStorage.setItem("availableRooms", available);
  localStorage.setItem("partialRooms", partial);
  localStorage.setItem("fullRooms", full);
  localStorage.setItem("currentlyFilled", currentlyFilled);
  localStorage.setItem("occupancyRate", occupancyRate + "%");
}

/* To add new room */
addbtn.addEventListener("click", (event) => {
  event.preventDefault();

  // 🛑 FOOLPROOF LIMIT GUARD: Directly count the physical cards on screen!
  const currentRoomCount = roomContainer.querySelectorAll("[data-maxroomcapacity]").length;
  if (currentRoomCount >= 20) {
    alert("System Limit Reached: You cannot create more than 20 rooms!");
    return; 
  }

  if (!roomName.value) return alert("Please enter a room number");

  const capacities = { single: 1, double: 2, triple: 3 };
  const maxCapacity = capacities[roomType.value] || 1;

  const roomDetails = document.createElement("div");

  roomDetails.innerHTML = `
    <div data-maxroomcapacity="${maxCapacity}" class="relative flex flex-col gap-2 glass-panel rounded-xl p-5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-slate-300 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)] min-w-[250px]">
      <input type="checkbox" class="absolute top-4 right-4 w-4 h-4 text-indigo-600 bg-slate-800 border-slate-600 rounded focus:ring-indigo-500 focus:ring-2 cursor-pointer">
      <h2 class="font-bold text-lg text-white drop-shadow">Room <span id="roomNumber">${roomName.value}</span></h2>
      <p class="text-sm text-slate-400">${roomType.value} &middot; <span id="occupied">0</span>/${maxCapacity} occupied</p>
      <span id="status" class="text-sm font-semibold text-emerald-400">Available</span>
      <div id="studentName" class="text-sm text-slate-500 italic">No students yet</div>
      <button id="addStudentbtn" class="bg-indigo-600 hover:bg-indigo-500 text-white rounded px-3 py-1 mt-2 transition-colors">Add Student</button>
      <button id="maintenancebtn" class="bg-amber-600 hover:bg-amber-500 text-white rounded px-3 py-1 mt-2 transition-colors">Mark Maintenance</button>
      <button id="removebtn" class="bg-rose-600 hover:bg-rose-500 text-white rounded px-3 py-1 transition-colors">Remove Room</button>
    </div>`;

  roomContainer.append(roomDetails.firstElementChild);
  roomName.value = "";
  
  recountDashboardStats();
  alert("Room created successfully");
});

/* Allocate Student & Card Management */
roomContainer.addEventListener("click", (event) => {
  const roomCard = event.target.closest("[data-maxroomcapacity]");
  if (!roomCard) return;

  /* Add Student Button Clicked */
  if (event.target.id === "addStudentbtn") {
    let totalAllocatedStudents = 0;
    const allOccupiedSpans = roomContainer.querySelectorAll("#occupied");
    allOccupiedSpans.forEach(span => {
      totalAllocatedStudents = totalAllocatedStudents + parseInt(span.textContent || "0");
    });

    if (totalAllocatedStudents >= 39) {
      return alert("System Limit Reached: Total capacity cannot exceed 39 students!");
    }

    const studentNameDiv = roomCard.querySelector("#studentName");
    const occupiedSpan = roomCard.querySelector("#occupied");
    const statusSpan = roomCard.querySelector("#status");

    let currentOccupant = parseInt(occupiedSpan.textContent);
    const maxroomCapacity = parseInt(roomCard.dataset.maxroomcapacity);

    if (currentOccupant >= maxroomCapacity) return alert("This room is already fully occupied!");

    const name = prompt("Enter student name:");
    if (!name || !name.trim()) return;
    const newName = name.trim();

    if (studentNameDiv.textContent.toLowerCase().includes(newName.toLowerCase())) {
      return alert("Student is already allocated to this room!");
    }

    if (currentOccupant === 0) {
      studentNameDiv.innerHTML = `<ul class="list-disc pl-4 flex flex-col gap-1"></ul>`;
    }

    const studentList = studentNameDiv.querySelector("ul");
    studentList.innerHTML += `
      <li class="studentCurrent cursor-pointer hover:text-rose-400 hover:line-through transition-colors" title="Click to remove">
        ${newName}
      </li>`;

    currentOccupant++;
    occupiedSpan.textContent = currentOccupant;

    if (currentOccupant === maxroomCapacity) {
      statusSpan.textContent = "Full";
      statusSpan.className = "text-sm font-semibold text-rose-400";
    } else {
      statusSpan.textContent = "Partially Occupied";
      statusSpan.className = "text-sm font-semibold text-amber-400";
    }

    recountDashboardStats();
  }

  /* Maint Button Clicked */
  if (event.target.id === "maintenancebtn") {
    const statusSpan = roomCard.querySelector("#status");
    const studentNameDiv = roomCard.querySelector("#studentName");
    const addStudentBtn = roomCard.querySelector("#addStudentbtn");
    const maintBtn = event.target;

    if (statusSpan.textContent !== "Maintenance") {
      statusSpan.textContent = "Maintenance";
      statusSpan.className = "text-sm font-semibold text-rose-400";
      studentNameDiv.textContent = "Out of Order";
      studentNameDiv.className = "text-sm text-rose-500 italic";
      maintBtn.textContent = "Maintenance Done";

      roomCard.classList.add("opacity-75", "border", "border-rose-500/50");
      if (addStudentBtn) {
        addStudentBtn.disabled = true;
        addStudentBtn.classList.add("opacity-50", "cursor-not-allowed");
      }
    } else {
      statusSpan.textContent = "Available";
      statusSpan.className = "text-sm font-semibold text-emerald-400";
      studentNameDiv.textContent = "No students yet";
      studentNameDiv.className = "text-sm text-slate-500 italic";
      maintBtn.textContent = "Mark Maintenance";

      roomCard.classList.remove("opacity-75", "border", "border-rose-500/50");
      if (addStudentBtn) {
        addStudentBtn.disabled = false;
        addStudentBtn.classList.remove("opacity-50", "cursor-not-allowed");
      }
    }
    
    recountDashboardStats();
  }

  /* Remove Room Button Clicked */
  if (event.target.id === "removebtn") {
    if (confirm("Are you sure you want to remove this room?")) {
      roomCard.remove();
      recountDashboardStats();
    }
  }

  /* Remove Individual Student Clicked */
  if (event.target.classList.contains("studentCurrent")) {
    const studentName = event.target.textContent.trim();

    if (confirm(`Remove ${studentName} from this room?`)) {
      const occupiedSpan = roomCard.querySelector("#occupied");
      const statusSpan = roomCard.querySelector("#status");
      const studentNameDiv = roomCard.querySelector("#studentName");

      event.target.remove();

      let current = parseInt(occupiedSpan.textContent) - 1;
      occupiedSpan.textContent = current;

      if (current === 0) {
        studentNameDiv.textContent = "No students yet";
        statusSpan.textContent = "Available";
        statusSpan.className = "text-sm font-semibold text-emerald-400";
      } else {
        statusSpan.textContent = "Partially Occupied";
        statusSpan.className = "text-sm font-semibold text-amber-400";
      }
      
      recountDashboardStats();
    }
  }
});

// Run an initial scan when the page opens
recountDashboardStats();