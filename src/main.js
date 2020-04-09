const $siteList = $(".siteList");

const $lastList = $siteList.find(".lastList");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const hashMap = xObject || [
  { logo: "A", logoType: "text", url: "https://www.baidu.com/" },
  {
    logo: "img/bilibili.png",
    logoType: "text",
    url: "https://www.bilibili.com/",
  },
];

const render = () => {
  hashMap.forEach((node) => {
    const $li = $(`<li>
  <a href="${node.url}">
    <div class="site">
      <div class="log">${node.logo[0]}</div>
      <div class="link">${node.url}</div>
    </div>
  </a>
</li>`).insertBefore($lastList);
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("请输入要添加的网址");
  if (url.indexOf("http") !== 0) {
    url = "http://" + url;
  }

  hashMap.push({ logo: url[7], logoType: "text", url: url });

  $siteList.find("li:not(.lastList)").remove();
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  window.localStorage.setItem("x", string);
};
