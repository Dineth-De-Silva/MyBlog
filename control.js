function open_menu() {
  var menu = document.getElementById("menu");
  menu.classList.remove("close");
  menu.classList.add("open");
}
function close_menu() {
  var menu = document.getElementById("menu");
  menu.classList.remove("open");
  menu.classList.add("close");
}
var drop_list_status = false;
function dropper() {
  if (drop_list_status) {
    drop_list_close();
  } else {
    drop_list();
  }
}
function drop_list() {
  drop_list_status = true;
  var menu_drop_list = document.getElementById("menu_drop_list");
  menu_drop_list.classList.remove("drop_close");
  menu_drop_list.classList.add("drop");
}
function drop_list_close() {
  drop_list_status = false;
  var menu_drop_list = document.getElementById("menu_drop_list");
  menu_drop_list.classList.remove("drop");
  menu_drop_list.classList.add("drop_close");
}
