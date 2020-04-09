const $siteList = $(".siteList");

const $lastList = $siteList.find(".lastList");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", url: "https://www.baidu.com/" },
  { logo: "B", url: "https://www.bilibili.com/" },
];

const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, ""); // 删除 / 开头的内容
};
const render = () => {
  $siteList.find("li:not(.lastList)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`<li>
  
    <div class="site">
      <div class="log">${node.logo}</div>
      <div class="link">${simplifyUrl(node.url)}</div>
      <div class="close">
        <svg class="icon">
          <use xlink:href="#icon-close"></use>
        </svg>
      </div>
    </div>
  
</li>`).insertBefore($lastList);
    $li.on("click", () => {
      window.open(node.url);
    });

    $li.on("click", ".close", (e) => {
      e.stopPropagation();
      hashMap.splice(index, 1);

      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");
  if (url.indexOf("http") !== 0) {
    url = "http://" + url;
  }

  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    url: url,
  });

  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  window.localStorage.setItem("x", string);
};
