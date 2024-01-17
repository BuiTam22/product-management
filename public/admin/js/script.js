// Button Status
// xử lý khi url và lấy data tùy theo ?status trên url

// Button Status
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
      
      url.searchParams.set("page", 1);

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

    url.searchParams.set("page", 1);

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



// Checkbox Multi
const checkboxMulti = document.querySelector("[checkbox-multi]");
if (checkboxMulti) {
  const inputCheckAll = checkboxMulti.querySelector("input[name='checkall']");
  const inputsId = checkboxMulti.querySelectorAll("input[name='id']");

  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkboxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;

      if(countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });
}
// End Checkbox Multi



// form-change-multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    // ngăn chặn việc tải lại trang khi chưa thực hiện những công việc bên dưới
    e.preventDefault();

    const typeChange = e.target.elements.type.value;
    if(typeChange === "delete-all"){
      const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này không?")
      if(!isConfirm){
        //return thì những câu lệnh dưới sẽ không được thực thi
        return;
      }
    }

    const checkboxMulti = document.querySelector("[checkbox-multi]");
    
    const inputsChecked = checkboxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    if(inputsChecked.length > 0) {
      let ids = [];

      inputsChecked.forEach(input => {
        
        const id = input.value;

        if(typeChange == "change-position") {
          //hàm closest là hàm tìm đến node cha gần nhất có trong ("tên node cha")
          const position = input.closest("tr").querySelector("input[name='position']").value;

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputIds.value = ids.join(", ");

      // vè có lệnh e.preventDefault(); ở trên nên bị chặn submit, vì vậy phải có câu lệnh này sau 
      // khi xử lý logic để gửi data cho ông backend
      formChangeMulti.submit();
    } else {
      alert("Vui lòng chọn ít nhất một bản ghi!");
    }
  });
}
// End change multi



// Delete item
const buttonsDelete = document.querySelectorAll("[button-delete]");
if(buttonsDelete.length > 0) {
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  buttonsDelete.forEach(button => {
    button.addEventListener("click", () => {

      const confirmDelete = confirm("Bạn có chắc muốn xóa hay không?");

      if(confirmDelete === true){
        const id = button.getAttribute("data-id");

        const action = path + `/${id}?_method=PATCH`;
  
        formDeleteItem.action = action;
        // formChangeStatus.setAttribute("action", action);
  
        formDeleteItem.submit();
      }
      
    });
  })
}
// End Delete item



// Show alert
const showAlert = document.querySelector("[show-alert");
if(showAlert){
  const time = parseInt(showAlert.getAttribute("data-time")) || 5000;

  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () =>{
    showAlert.classList.add("alert-hidden");
  })
}
// End Show alert



// Upload Image
const uploadImage = document.querySelector("[upload-image]");
if(uploadImage) {
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  const uploadImagePreview = uploadImage.querySelector("[upload-image-preview]");

  uploadImageInput.addEventListener("change", (e) => {
    if (e.target.files.length) {
      // tạo ra đường dẫn ảnh lưu vào biến image
      const image = URL.createObjectURL(e.target.files[0]);

      // cho thuộc tính src của phần tử upload-image-preview thành đường dẫn image
      uploadImagePreview.src = image;
    }
  });
}
// End Upload Image



// Sort
const sort = document.querySelector("[sort]");
if(sort) {
  let url = new URL(window.location.href);

  const sortSelect = sort.querySelector("[sort-select]");
  const sortClear = sort.querySelector("[sort-clear]");

  // Sắp xếp
  sortSelect.addEventListener("change", (e) => {
    const value = e.target.value;
    const [sortKey, sortValue] = value.split("-");

    url.searchParams.set("sortKey", sortKey);
    url.searchParams.set("sortValue", sortValue);

    window.location.href = url.href;
  });

  // Xóa sắp xếp
  sortClear.addEventListener("click", () => {
    url.searchParams.delete("sortKey");
    url.searchParams.delete("sortValue");

    window.location.href = url.href;
  });

  // Hiển thị mặc định lựa chọn
  const sortKey = url.searchParams.get("sortKey");
  const sortValue = url.searchParams.get("sortValue");

  if(sortKey && sortValue) {
    const stringSort = `${sortKey}-${sortValue}`;
    const optionSelected = sortSelect.querySelector(`option[value='${stringSort}']`);
    optionSelected.selected = true;
    // optionSelected.setAttribute("selected", true);
  }
}
// End Sort 



// Delete products-category
const buttonsDeleteProductsCategory = document.querySelectorAll("[button-delete-products-category]")
if(buttonsDeleteProductsCategory.length>0){
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path")
  buttonsDeleteProductsCategory.forEach(button =>{
    button.addEventListener("click", () =>{
      const confirmDelete = confirm("Bạn có chắc muốn xóa hay không?");
      if(confirmDelete === true){
        const id = button.getAttribute("data-id");
        const action = path + `/${id}?_method=PATCH`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }
    })
  })

}



// Delete role
const buttonsDeleteRole = document.querySelectorAll("[button-delete-role");
if(buttonsDeleteRole){
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path")

  buttonsDeleteRole.forEach(button=>{
    button.addEventListener("click", () =>{
      const confirmDelete = confirm("Bạn có chắc muốn xóa hay không?");
      if(confirmDelete === true){
        const id = button.getAttribute("data-id");
        const action = path + `/${id}?_method=PATCH`;
        formDeleteItem.action = action;
        formDeleteItem.submit();
      }   
    })
  })
}




