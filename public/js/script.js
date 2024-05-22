// Search Suggest
const boxSearch = document.querySelector(".box-search");
if (boxSearch) {
  const input = boxSearch.querySelector("input[name='keyword']");
  const boxSuggest = boxSearch.querySelector(".inner-suggest");
  let timeOut;
  input.addEventListener("keyup", async () => {
    const keyword = input.value;
    clearTimeout(timeOut);
    timeOut = setTimeout(() => {
      const keyWord = keyword;
      const link = `/search/suggest?keyword=${keyWord}`;

      fetch(link)
        .then(res => res.json())
        .then(data => {
          const products = data.products;
          if (products.length > 0) {
            boxSuggest.classList.add("show");

            const htmls = products.map(product => {
              return `
              <a class="inner-item" href="/products/detail/${product.slug}">
                <div class="inner-image"><img src="${product.thumbnail}" /></div>
                <div class="inner-info">
                    <div class="inner-title">${product.title}</div>
                    <div class="inner-price"><i class="fa-solid fa-microphone-lines"></i> ${product.newPrice}$</div>
                </div>
              </a>
            `;
            });

            const boxList = boxSuggest.querySelector(".inner-list");
            boxList.innerHTML = htmls.join("");
          } else {
            boxSuggest.classList.remove("show");
          }
        })
    }, 100);
  });
}
// End Search Suggest