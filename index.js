// Total rooms and Total capacity stay constantly fixed at system maximum boundary counts
document.getElementById("dashTotal").textContent = "20";

// Live structural metrics updated by your product page actions
document.getElementById("dashAvailable").textContent = localStorage.getItem("availableRooms") || "3";
document.getElementById("dashPartial").textContent = localStorage.getItem("partialRooms") || "0";
document.getElementById("dashFull").textContent = localStorage.getItem("fullRooms") || "0";
document.getElementById("dashFilled").textContent = localStorage.getItem("currentlyFilled") || "0";
document.getElementById("dashRate").textContent = localStorage.getItem("occupancyRate") || "0%";