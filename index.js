// Total room metrics are kept locked onto a constant maximum baseline boundary count
// No matter how many individual list card nodes are loaded on secondary screens, this displays 20
document.getElementById("dashTotal").textContent = "20";

// Fetch operational counters dynamically from browser storage fields
// If a user clears cookies or opens the dashboard for the very first time, the fallbacks ('||') supply starter values
document.getElementById("dashAvailable").textContent = localStorage.getItem("availableRooms") || "3";
document.getElementById("dashPartial").textContent = localStorage.getItem("partialRooms") || "0";
document.getElementById("dashFull").textContent = localStorage.getItem("fullRooms") || "0";
document.getElementById("dashFilled").textContent = localStorage.getItem("currentlyFilled") || "0";

// Pull computed layout calculation ratios and append them smoothly into the screen view
document.getElementById("dashRate").textContent = localStorage.getItem("occupancyRate") || "0%";