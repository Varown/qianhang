$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");
  if (url.indexOf("http") !== 0) {
    url1 = "//" + url;
  }

  const $siteList = $(".siteList");

  const $lastList = $siteList.find(".lastList");

  const $li = $(`<li>
          <a href="${url1}">
            <div class="site">
              <div class="log">${url[0]}</div>
              <div class="link">${url}</div>
            </div>
          </a>
        </li>`).insertBefore($lastList);
});
