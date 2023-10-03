// Button Status
// xử lý khi url và lấy data tùy theo ?status trên url
const buttonsStatus = document.querySelectorAll("[button-status]");
if(buttonsStatus.length > 0) {

  // lấy url hiện tại bằng hàm URL
  let url = new URL(window.location.href);

  buttonsStatus.forEach(button => {
    button.addEventListener("click", () => {
          
      const status = button.getAttribute("button-status");

      if(status != "") {
        // tạo status cho url, ví dụ ".../products?status=active"
        url.searchParams.set("status", status);
      //nếu status == "" thì xóa status để url đỡ phải ?status=""
      } else {
        url.searchParams.delete("status");
      }
      // cập nhật lại url khi ấn nút
      window.location.href = url.href;
    });
  });
}
// End Button Status

// Form search 
const formSearch = document.querySelector("#form-search");
if(formSearch){
  let url = new URL(window.location.href);
  formSearch.addEventListener("submit", (e) => {
    e.preventDefault();
    const value = e.target.elements.keyword.value;
    if(value){
      url.searchParams.set("keyword", value);
    } else{
      url.searchParams.delete("keyword");
    }
    
    window.location.href = url.href;
  });
}
// End form search

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination.length > 0) {
  let url = new URL(window.location.href);

  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
// End Pagination

// Change Status
const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
if(buttonsChangeStatus.length > 0) {
  const formChangeStatus = document.querySelector("#form-change-status");
  const path = formChangeStatus.getAttribute("data-path");

  buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      const statusChange = statusCurrent == "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;

      formChangeStatus.action = action;
      // formChangeStatus.setAttribute("action", action);

      formChangeStatus.submit();
    });
  })
}
// End Change Status