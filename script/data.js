"use strict";

//DOM
const sideBar = document.getElementById("sidebar");
const importBtn = document.getElementById("import-btn");
const exportBtn = document.getElementById("export-btn");
const fileInput = document.getElementById("input-file");

// Animation cho Sidebar bằng .active
sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

// click Export Data
exportBtn.addEventListener("click", function () {
  const petArr = getFromStorage("pets");
  const blob = new Blob([petArr], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "petData.txt");
});

// click Import Data
importBtn.addEventListener("click", function () {
  const [file] = fileInput.files;
  const reader = new FileReader();
  reader.addEventListener("load", () => {
    // Ghép petArr
    console.log(reader.result);
    const petArray = JSON.parse(reader.result);
    petArray.forEach((pet) => {
      pet.id = pet.id.toUpperCase(); // Viết hoa id
    });
    const idArray = petArray.map((pet) => pet.id);
    const petArr = JSON.parse(getFromStorage("pets"));
    function checkPetArrId(pet) {
      return !idArray.includes(pet.id); // Hàm điều kiện cho filter
    }
    const petArrFil = petArr.filter(checkPetArrId);
    const newPetArr = petArrFil.concat(petArray);
    saveToStorage("pets", JSON.stringify(newPetArr));
  });

  if (file) {
    reader.readAsText(file);
  }

  alert("Import thành công. Quay về trang chủ");
  window.location.href = "/index.html";
});
