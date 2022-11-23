"use strict";
// DOM
const sideBar = document.getElementById("sidebar");
const submitBtn = document.getElementById("submit-btn"); //button submit
const healthyBtn = document.getElementById("healthy-btn"); //button healthy pet
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

//Thông báo chưa nhập liệu
submitBtn.type = "submit";
idInput.required = true;
nameInput.required = true;
ageInput.required = true;
weightInput.required = true;
lengthInput.required = true;

//Mảng lưu danh sách thú cưng perArr
let petArr;

//Validate dữ liệu
function validateData(data) {
  let validate = true;
  // check id
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      validate = false;
      alert("ID must unique");
    }
  }
  //Check Age
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15");
    validate = false;
  }
  //Check Weight
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15");
    validate = false;
  }
  //check length
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100");
    validate = false;
  }
  //check type
  if (data.type === "Select Type") {
    alert("Please select Type");
    validate = false;
  }
  // check breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed");
    validate = false;
  }
  return validate; //true / false
}

// Hàm xóa dữ liệu trên Form
function clearInput() {
  idInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
  typeInput.value = "Select Type";
  weightInput.value = "";
  lengthInput.value = "";
  colorInput.value = "#000000";
  breedInput.value = "Select Breed";
  vaccinatedInput.checked = false;
  dewormedInput.checked = false;
  sterilizedInput.checked = false;
}

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
    // action
    let tdAction = document.createElement("td");
    row.appendChild(tdAction);
    let btnAction = document.createElement("button");
    tdAction.appendChild(btnAction);
    btnAction.innerHTML = "Delete";
    btnAction.type = "button"; //type
    btnAction.classList.add("btn", "btn-danger"); //class
    btnAction.onclick = function () {
      if (confirm("Are you sure?")) {
        petArr.splice(i, 1); //xóa dòng
        saveToStorage("pets", JSON.stringify(petArr)); //Lưu vào Storage
        renderTableData(petArr); //Hiển thị bảng mới
      }
    };
  });
}

// Hàm check string khác rỗng
function checkNull(str) {
  return str.replace(" ", "") !== "";
}

//Click Submit Button
submitBtn.addEventListener("click", function (e) {
  e.preventDefault;
  //Không nhận ô input trống
  if (
    checkNull(idInput.value) &&
    checkNull(nameInput.value) &&
    checkNull(ageInput.value) &&
    checkNull(weightInput.value) &&
    checkNull(lengthInput.value)
  ) {
    // Lấy dữ liệu từ Input form
    const data = {
      id: idInput.value.replace(" ", "").toUpperCase(),
      name: nameInput.value,
      age: parseInt(ageInput.value),
      type: typeInput.value,
      weight: parseFloat(weightInput.value),
      length: parseFloat(lengthInput.value),
      color: colorInput.value,
      breed: breedInput.value,
      vaccinated: vaccinatedInput.checked,
      dewormed: dewormedInput.checked,
      sterilized: sterilizedInput.checked,
      date: new Date(),
    };

    // Kiểm tra Data trước khi lưu dữ liệu
    if (validateData(data)) {
      //Thêm data vào mảng;
      petArr.push(data);
      // Lưu petArr vào Storage
      saveToStorage("pets", JSON.stringify(petArr));
      //Xóa input
      clearInput();
      //Thêm vào table
      renderTableData(petArr);
    }
  }
});

// Hàm hiển thị Breed renderBreed
function renderBreed(breedArrFil) {
  // Xóa Option Breed input đang hiển thị
  breedInput.innerHTML = "<option>Select Breed</option>";
  // Thêm Các lựa chọn breed tương ứng Type input
  breedArrFil.forEach((breedObject) => {
    const optionBreed = document.createElement("option");
    optionBreed.innerHTML = breedObject.breed;
    breedInput.appendChild(optionBreed);
  });
}
// Hiển thị Breed trong màn hình QL thú cưng khi Type input thay đổi
typeInput.onchange = function () {
  let breedArr = JSON.parse(getFromStorage("breeds"));
  const breedArrFil = breedArr.filter(
    (breed) => breed.type === typeInput.value
  );
  renderBreed(breedArrFil); // gọi hàm renderBreed
};

//Hiển thị renderTableData khi load

document.querySelector("body").onload = function () {
  //Mảng lưu danh sách thú cưng perArr
  if (!getFromStorage("pets")) {
    petArr = [];
  } else {
    petArr = JSON.parse(getFromStorage("pets"));
    renderTableData(petArr);
  }
};
