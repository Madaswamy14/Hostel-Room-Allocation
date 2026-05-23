// 🧼 PERSISTENT STORAGE INITIALIZER WIPE OUT
// This prevents older crashes by wiping out browser memory values completely *once* on a fresh visit
if (!localStorage.getItem("hasInitialized")) {
  localStorage.clear();
  localStorage.setItem("hasInitialized", "true");
}

// Global page anchors binding HTML objects to JavaScript memory addresses
const roomName = document.getElementById("roomName");
const roomType = document.getElementById("roomType");
const addbtn = document.getElementById("addbtn");
const roomContainer = document.getElementById("roomContainer");

// 🔢 DYNAMIC COUNT RECALCULATION FUNCTION UTILITY TOOL
// Whenever anything is added, edited, or clicked, this loops through the screen cards to fetch fresh metrics
function recountDashboardStats() {
  const allCards = roomContainer.querySelectorAll("[data-maxroomcapacity]");

  // 🔄 THE SIMPLEST SORT: Rearranges the cards numerically on the fly
  const sortedCards = Array.from(allCards).sort((a, b) => a.querySelector("#roomNumber").textContent - b.querySelector("#roomNumber").textContent);
  roomContainer.innerHTML = "";
  sortedCards.forEach(card => roomContainer.append(card));
  
  let total = 20; // Boundless layout maximum tracking standard ceiling
  let available = 0;
  let partial = 0;
  let full = 0;
  let currentlyFilled = 0;

  // Run over every card element sitting in the list view
  allCards.forEach((card) => {
    const currentStatus = card.querySelector("#status").textContent.trim();
    const occupiedCount = parseInt(card.querySelector("#occupied").textContent || "0");
    const maintBtn = card.querySelector("#maintenancebtn");
    
    // Add current room occupant integer metrics into total student container
    currentlyFilled = currentlyFilled + occupiedCount;

    // Boundary startup catch: Sets Room 104 button text name to match on initialization
    if (currentStatus === "Maintenance" && maintBtn && maintBtn.textContent.trim() === "Mark Maintenance") {
      maintBtn.textContent = "Maintenance Done";
    }

    // Step up status category trackers on matching parameters
    if (currentStatus === "Available") {
      available = available + 1;
    } else if (currentStatus === "Partially Occupied") {
      partial = partial + 1;
    } else if (currentStatus === "Full") {
      full = full + 1;
    }
  });

  // Basic math equation figuring out percentage of occupancy
  let occupancyRate = 0;
  if (currentlyFilled > 0) {
    occupancyRate = Math.round((currentlyFilled / 39) * 100);
  }

  // Dump freshly calculated metrics safely into local browser storage fields
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

  // 🛑 LIMIT GUARD: Directly count physical cards on screen
  const currentRoomCount = roomContainer.querySelectorAll("[data-maxroomcapacity]").length;
  if (currentRoomCount >= 20) {
    alert("System Limit Reached: You cannot create more than 20 rooms!");
    return; 
  }

  // 1. Check if the input field is empty
  if (!roomName.value) return alert("Please enter a room number");

  // 2. 🔢 SIMPLE 3-DIGIT CHECK: Simply check the typed text character length!
  if (roomName.value.length !== 3) {
    alert("Invalid Room Number: Room number must be exactly 3 digits long (e.g., 105)!");
    return;
  }

  // 3. 👥 DUPLICATE CHECK: Look at all existing cards to see if this number is already used
  let isDuplicate = false;
  const existingRoomNumbers = roomContainer.querySelectorAll("#roomNumber");
  
  existingRoomNumbers.forEach((span) => {
    if (span.textContent.trim() === roomName.value.trim()) {
      isDuplicate = true;
    }
  });

  if (isDuplicate) {
    alert("Creation Denied: A room with this number already exists!");
    return; // Hard stops execution so a duplicate card isn't built
  }

  // ... rest of your original code below stays exactly the same ...
  const capacities = { single: 1, double: 2, triple: 3 };
  const maxCapacity = capacities[roomType.value] || 1;

  const roomDetails = document.createElement("div");

  roomDetails.innerHTML = `
    <div data-maxroomcapacity="${maxCapacity}" class="relative flex flex-col gap-2 glass-panel rounded-xl p-5 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 text-slate-300 w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.33%-14px)] min-w-[250px]">
      
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

/* DELEGATED BUBBLE CLICK EVENT BINDING EVENT HANDLER */
// Handles all secondary action buttons sitting on dynamically added individual card layouts
roomContainer.addEventListener("click", (event) => {
  const roomCard = event.target.closest("[data-maxroomcapacity]");
  if (!roomCard) return; // Exit logic safe processing if the element clicked isn't a room card context element

  /* A. ADD STUDENT INNER COMPONENT LOGIC TRIGGER ACTION */
  if (event.target.id === "addStudentbtn") {
    
    // 🛑 TOTAL SYSTEM ALLOCATION GUARD CEILING GATEWAY
    // Sum up currently allocated student totals to block action if maximum ceiling limit (39) is hit
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

    // Block addition if room capacity constraints reject operations
    if (currentOccupant >= maxroomCapacity) return alert("This room is already fully occupied!");

    const name = prompt("Enter student name:");
    if (!name || !name.trim()) return;
    const newName = name.trim();

    // Verify presence to eliminate duplication parameters inside matching list elements
    if (studentNameDiv.textContent.toLowerCase().includes(newName.toLowerCase())) {
      return alert("Student is already allocated to this room!");
    }

    // Initialize list environment structure if room was completely empty
    if (currentOccupant === 0) {
      studentNameDiv.innerHTML = `<ul class="list-disc pl-4 flex flex-col gap-1"></ul>`;
    }

    // Append standard item link node using hover effects
    const studentList = studentNameDiv.querySelector("ul");
    studentList.innerHTML += `
      <li class="studentCurrent cursor-pointer hover:text-rose-400 hover:line-through transition-colors" title="Click to remove">
        ${newName}
      </li>`;

    currentOccupant++; // Raise integer tracking parameters by one
    occupiedSpan.textContent = currentOccupant;

    // Adjust element configuration labels based on updated data calculations
    if (currentOccupant === maxroomCapacity) {
      statusSpan.textContent = "Full";
      statusSpan.className = "text-sm font-semibold text-rose-400";
    } else {
      statusSpan.textContent = "Partially Occupied";
      statusSpan.className = "text-sm font-semibold text-amber-400";
    }

    recountDashboardStats(); // Send refreshed total state configurations down to localStorage
  }

  /* B. MAINTENANCE CONTROL INTERACTION BLOCK TRIGGER ACTION */
  if (event.target.id === "maintenancebtn") {
    const statusSpan = roomCard.querySelector("#status");
    const studentNameDiv = roomCard.querySelector("#studentName");
    const addStudentBtn = roomCard.querySelector("#addStudentbtn");
    const maintBtn = event.target;

    // Use string pattern checking rules to handle visual dimming rules safely
    if (statusSpan.textContent !== "Maintenance") {
      // GOING INTO MAINTENANCE: Darken visual view parameters and lock allocations
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
      // RETURNING TO VACANT ACTIVE POOL: Restore standard layout styling features
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
    
    recountDashboardStats(); // Fire a dynamic recount scan
  }

  /* C. REMOVE WHOLE ROOM LAYOUT ACTION CONTROL BUTTON TRIGGER ACTION */
  if (event.target.id === "removebtn") {
    if (confirm("Are you sure you want to remove this room?")) {
      roomCard.remove(); // Pull structural card object node cleanly off browser rendering engine
      recountDashboardStats(); // Recount data indexes to verify totals update on home screens
    }
  }

  /* D. REMOVE SINGLE INDIVIDUAL STUDENT LINE SELECTION TRIGGER ACTION */
  if (event.target.classList.contains("studentCurrent")) {
    const studentName = event.target.textContent.trim();

    if (confirm(`Remove ${studentName} from this room?`)) {
      const occupiedSpan = roomCard.querySelector("#occupied");
      const statusSpan = roomCard.querySelector("#status");
      const studentNameDiv = roomCard.querySelector("#studentName");

      event.target.remove(); // Drop the isolated list object selector element node cleanly

      let current = parseInt(occupiedSpan.textContent) - 1; // Reduce occupancy values mathematically
      occupiedSpan.textContent = current;

      // Swap status text badges dynamically back down based on current data counts
      if (current === 0) {
        studentNameDiv.textContent = "No students yet";
        statusSpan.textContent = "Available";
        statusSpan.className = "text-sm font-semibold text-emerald-400";
      } else {
        statusSpan.textContent = "Partially Occupied";
        statusSpan.className = "text-sm font-semibold text-amber-400";
      }
      
      recountDashboardStats(); // Sync system dashboard parameters
    }
  }
});

// Run a cleanup baseline numbers scan on system initialization execution routine
recountDashboardStats();

// 🔍 DYNAMIC TEXT SEARCH HANDLER TOOL LOGIC BLOCK
const roomSearch = document.getElementById("roomSearch");

roomSearch.addEventListener("keyup", (event) => {
  const input = event.target.value.toLowerCase().trim(); // Isolate string character case values
  const allCards = roomContainer.querySelectorAll("[data-maxroomcapacity]");

  // Scan over all physical elements present within container borders
  allCards.forEach((card) => {
    const roomNumText = card.querySelector("#roomNumber").textContent.toLowerCase();
    const studentText = card.querySelector("#studentName").textContent.toLowerCase();
    const statusText = card.querySelector("#status").textContent.toLowerCase();

    // Show card structure only if character sets fall in matching index locations
    if (roomNumText.includes(input) || studentText.includes(input) || statusText.includes(input)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});

// 🎛️ DYNAMIC DROPDOWN OPTION STATUS SELECTOR FILTER CONTROL UTILITY
const statusFilter = document.getElementById("statusFilter");

statusFilter.addEventListener("change", (event) => {
  const selectedValue = event.target.value.toLowerCase().trim();
  const allCards = roomContainer.querySelectorAll("[data-maxroomcapacity]");

  allCards.forEach((card) => {
    const currentStatus = card.querySelector("#status").textContent.toLowerCase().trim();

    // Enforce selection logic matching rules
    if (selectedValue === "all" || currentStatus === selectedValue) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
});