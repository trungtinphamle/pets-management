"use strict";
//DOM
const formContainer = document.getElementById("container-form");
const sideBar = document.getElementById("sidebar");
const submitBtn = document.getElementById("submit-btn"); //button submit
const findBtn = document.getElementById("find-btn"); //button find
const idInput = document.getElementById("input-id"); //input id
const nameInput = document.getElementById("input-name"); //input name
const ageInput = document.getElementById("input-age"); //input age
const typeInput = document.getElementById("input-type"); //input type
const weightInput = document.getElementById("input-weight"); //input weight
const lengthInput = document.getElementById("input-length"); //input length
const colorInput = document.getElementById("input-color-1"); //input color
const breedInput = document.getElementById("input-breed"); //input breed
const vaccinatedInput = document.getElementById("input-vaccinated"); // checkbox vaccinated
const dewormedInput = document.getElementById("input-dewormed"); //checkbox dewormed
const sterilizedInput = document.getElementById("input-sterilized"); //checkbox sterilized
const tableBody = document.getElementById("tbody"); // table.tbody

// Animation cho Sidebar bằng .active
sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

//Mảng lưu danh sách thú cưng perArr
let petArr;

//Hàm hiển thị danh sách thú cưng
function renderTableData(petArr) {
  // Xóa nội dung hiện có của bảng
  tableBody.innerHTML = "";
  //Thêm thông tin thú cưng vào từng dòng
  petArr.forEach((pet, i, petArr) => {
    let row = document.createElement("tr");
    tableBody.appendChild(row);
    // id
    let th = document.createElement("th");
    th.innerHTML = pet.id;
    th.scope = "row";
    row.appendChild(th);
    // name
    let tdName = document.createElement("td");
    tdName.innerHTML = pet.name;
    row.appendChild(tdName);
    //age
    let tdAge = document.createElement("td");
    tdAge.innerHTML = pet.age;
    row.appendChild(tdAge);
    //type
    let tdType = document.createElement("td");
    tdType.innerHTML = pet.type;
    row.appendChild(tdType);
    //weight
    let tdWeight = document.createElement("td");
    tdWeight.innerHTML = `${pet.weight} kg`;
    row.appendChild(tdWeight);
    //length
    let tdLength = document.createElement("td");
    tdLength.innerHTML = `${pet.length} cm`;
    row.appendChild(tdLength);
    //breed
    let tdBreed = document.createElement("td");
    tdBreed.innerHTML = pet.breed;
    row.appendChild(tdBreed);
    // color
    let tdColor = document.createElement("td");
    row.appendChild(tdColor);
    let iColor = document.createElement("i");
    tdColor.appendChild(iColor);
    iColor.style.color = pet.color;
    iColor.classList.add("bi-square-fill", "bi");
    // vaccinated
    let tdVaccinated = document.createElement("td");
    row.appendChild(tdVaccinated);
    let iVaccinated = document.createElement("i");
    tdVaccinated.appendChild(iVaccinated);
    iVaccinated.classList.add(
      "bi",
      `bi-${pet.vaccinated ? "check" : "x"}-circle-fill`
    );
    // dewormed
    let tdDewormed = document.createElement("td");
    row.appendChild(tdDewormed);
    let iDewormed = document.createElement("i");
    tdDewormed.appendChild(iDewormed);
    iDewormed.classList.add(
      "bi",
      `bi-${pet.dewormed ? "check" : "x"}-circle-fill`
    );
    // sterilized
    let tdSterilized = document.createElement("td");
    row.appendChild(tdSterilized);
    let iSterilized = document.createElement("i");
    tdSterilized.appendChild(iSterilized);
    iSterilized.classList.add(
      "bi",
      `bi-${pet.sterilized ? "check" : "x"}-circle-fill`
    );
    // date
    let tdDate = document.createElement("td");
    const day = new Date();
    tdDate.innerHTML = `${day.getDate()}/${
      day.getMonth() + 1
    }/${day.getFullYear()}`;
    row.appendChild(tdDate);
  });
}

// Khi hover chuột vào edit sẽ gọi hàm renderTableData và Thêm các option Breed
document.querySelector("body").onload = function () {
  //Mảng lưu danh sách thú cưng perArr
  if (!getFromStorage("pets")) {
    petArr = [];
  } else {
    petArr = JSON.parse(getFromStorage("pets"));
    renderTableData(petArr);
  }
  // thêm các option breed
  let breedArr = JSON.parse(getFromStorage("breeds"));
  breedInput.innerHTML = "<option>Select Breed</option>";
  breedArr.forEach((breedObject) => {
    const optionBreed = document.createElement("option");
    optionBreed.innerHTML = breedObject.breed;
    breedInput.appendChild(optionBreed);
  });
};

//Hàm lọc ID
function checkId(pet) {
  return pet.id.includes(idInput.value.replace(" ", "").toUpperCase());
}
//Hàm lọc Name
function checkName(pet) {
  return pet.name.toLowerCase().includes(nameInput.value.toLowerCase());
}
//Hàm lọc Type
function checkType(pet) {
  if (typeInput.value !== "Select Type") {
    return pet.type === typeInput.value;
  } else {
    return pet.type !== typeInput.value;
  }
}
//Hàm lọc Breed
function checkBreed(pet) {
  if (breedInput.value !== "Select Breed") {
    return pet.breed === breedInput.value;
  } else {
    return pet.breed !== breedInput.value;
  }
}

//Hàm lọc vaccinated
function checkVaccinated(pet) {
  if (vaccinatedInput.checked === true) {
    return pet.vaccinated === true;
  } else {
    return pet.vaccinated === true || pet.vaccinated === false;
  }
}

//Hàm lọc dewormed
function checkDewormed(pet) {
  if (dewormedInput.checked === true) {
    return pet.dewormed === true;
  } else {
    return pet.dewormed === true || pet.dewormed === false;
  }
}

//Hàm lọc sterilized
function checkSterilized(pet) {
  if (sterilizedInput.checked === true) {
    return pet.sterilized === true;
  } else {
    return pet.sterilized === true || pet.sterilized === false;
  }
}

//Hàm lọc tổng
function check(pet) {
  return (
    checkId(pet) &&
    checkName(pet) &&
    checkType(pet) &&
    checkBreed(pet) &&
    checkVaccinated(pet) &&
    checkDewormed(pet) &&
    checkSterilized(pet)
  );
}
// Lọc petArr và hiển thị khi click Find
findBtn.onclick = function () {
  const petArrFil = petArr.filter(check);
  renderTableData(petArrFil);
};
