"use strict";
// DOM
const sideBar = document.getElementById("sidebar");
const submitBtn = document.getElementById("submit-btn"); //button submit
const typeInput = document.getElementById("input-type"); //input type
const breedInput = document.getElementById("input-breed"); //input breed
const tableBody = document.getElementById("tbody"); // table.tbody

// Animation cho Sidebar bằng .active
sideBar.addEventListener("click", function () {
  sideBar.classList.toggle("active");
});

//Mảng lưu danh sách Breeds
let breedArr = [];

//Thông báo chưa nhập liệu
submitBtn.type = "submit";
breedInput.required = true;

// Hàm xóa dữ liệu trên Form
function clearInput() {
  typeInput.value = "Select Type";
  breedInput.value = "";
}

//Hàm hiển thị danh sách thú cưng
function renderTableData(breedArr) {
  // Xóa nội dung hiện có của bảng
  tableBody.innerHTML = "";
  //Thêm thông tin thú cưng vào từng dòng
  for (let i = 0; i < breedArr.length; i++) {
    let row = document.createElement("tr");
    tableBody.appendChild(row);
    // Số thứ tự (#)
    let th = document.createElement("th");
    th.innerHTML = i + 1;
    th.scope = "row";
    row.appendChild(th);
    //breed
    let tdBreed = document.createElement("td");
    tdBreed.innerHTML = breedArr[i].breed;
    row.appendChild(tdBreed);
    //type
    let tdType = document.createElement("td");
    tdType.innerHTML = breedArr[i].type;
    row.appendChild(tdType);
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
        breedArr.splice(i, 1); //xóa dòng
        saveToStorage("breeds", JSON.stringify(breedArr)); //Lưu vào Storage
        renderTableData(breedArr); //Hiển thị bảng mới
      }
    };
  }
}

//Validate dữ liệu
function validateData(data) {
  let validate = true;
  //check type
  if (data.type === "Select Type") {
    alert("Please select Type");
    validate = false;
  }
  return validate; //true / false
}

// Hàm check string khác rỗng
function checkNull(str) {
  return str.replace(" ", "") !== "";
}

//Click Submit Button
submitBtn.addEventListener("click", function (e) {
  e.preventDefault();
  //Không nhận ô input trống
  if (checkNull(breedInput.value)) {
    // Lấy dữ liệu từ Input form
    const data = {
      breed: breedInput.value,
      type: typeInput.value,
    };

    // Kiểm tra Data trước khi lưu dữ liệu
    if (validateData(data)) {
      //Thêm data vào mảng
      breedArr.push(data);
      // Lưu petArr vào Storage
      saveToStorage("breeds", JSON.stringify(breedArr));
      //Xóa input
      clearInput();
      //Thêm vào table
      renderTableData(breedArr);
    }
  }
});

//Hiển thị renderTableData khi đưa chuột vào Home
document.querySelector("body").onload = function () {
  //Mảng lưu danh sách thú cưng perArr
  if (!getFromStorage("breeds")) {
    breedArr = [];
  } else {
    breedArr = JSON.parse(getFromStorage("breeds"));
    console.log(breedArr);
    renderTableData(breedArr);
  }
};
