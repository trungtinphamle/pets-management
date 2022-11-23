"use strict";
// Lưu vào LocalStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//Lấy dữ liệu từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//Xóa dữ liệu trong Storage
function removeInStorage(key) {
  localStorage.removeItem(key);
}
