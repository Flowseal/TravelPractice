import "./style.css";

var currentActiveApiBadge = document.getElementById("apiGetAll");
var previousActiveApiBadge = document.getElementById("apiGetAll");

const badgeApiGetAll = document.getElementById("apiGetAll");
const badgeApiGetById = document.getElementById("apiGetById");
const badgeApiCreateUser = document.getElementById("apiCreateUser");
const badgeApiUpdateUser = document.getElementById("apiUpdateUser");
const badgeApiDeleteUser = document.getElementById("apiDeleteUser");

const inputUserId = document.getElementById("inputUserId");
const inputJson = document.getElementById("inputJson");
const formInputUserId = document.getElementById("formInputUserId");
const formInputJson = document.getElementById("formInputJson");
const inputButton = document.getElementById("inputButton");

const responseOutput = document.getElementById("responseOutput");

badgeApiGetAll.addEventListener("click", async event => {
  event.preventDefault();

  if (currentActiveApiBadge == badgeApiGetAll) return;

  previousActiveApiBadge = currentActiveApiBadge;
  currentActiveApiBadge = badgeApiGetAll;
  badgeApiGetAll.classList.add("selected");
  previousActiveApiBadge.classList.remove("selected");

  formInputUserId.classList.add("hide");
  formInputJson.classList.add("hide");
});

badgeApiGetById.addEventListener("click", async event => {
  event.preventDefault();

  if (currentActiveApiBadge == badgeApiGetById) return;

  previousActiveApiBadge = currentActiveApiBadge;
  currentActiveApiBadge = badgeApiGetById;
  badgeApiGetById.classList.add("selected");
  previousActiveApiBadge.classList.remove("selected");
  
  inputUserId.value = "";
  formInputUserId.classList.remove("hide");
  formInputJson.classList.add("hide");
});

badgeApiCreateUser.addEventListener("click", async event => {
  event.preventDefault();

  if (currentActiveApiBadge == badgeApiCreateUser) return;

  previousActiveApiBadge = currentActiveApiBadge;
  currentActiveApiBadge = badgeApiCreateUser;
  badgeApiCreateUser.classList.add("selected");
  previousActiveApiBadge.classList.remove("selected");

  formInputUserId.classList.add("hide");
  formInputJson.classList.remove("hide");

  inputJson.value = `{
  "title": "Mr",
  "firstName": "Ivan",
  "lastName": "Ivanov",
  "role": "User",
  "email": "mail@yandex.ru",
  "password": "123456",
  "confirmPassword": "123456"
}`;

  inputJson.style.height = "230px";
});

badgeApiUpdateUser.addEventListener("click", async event => {
  event.preventDefault();

  if (currentActiveApiBadge == badgeApiUpdateUser) return;

  previousActiveApiBadge = currentActiveApiBadge;
  currentActiveApiBadge = badgeApiUpdateUser;
  badgeApiUpdateUser.classList.add("selected");
  previousActiveApiBadge.classList.remove("selected");

  inputUserId.value = "";
  formInputUserId.classList.remove("hide");
  formInputJson.classList.remove("hide");

  inputJson.value = `{
    "firstName": "Ivan"
}`;

  inputJson.style.height = "90px";
});

badgeApiDeleteUser.addEventListener("click", async event => {
  event.preventDefault();

  if (currentActiveApiBadge == badgeApiDeleteUser) return;

  previousActiveApiBadge = currentActiveApiBadge;
  currentActiveApiBadge = badgeApiDeleteUser;
  badgeApiDeleteUser.classList.add("selected");
  previousActiveApiBadge.classList.remove("selected");

  inputUserId.value = "";
  formInputUserId.classList.remove("hide");
  formInputJson.classList.add("hide");
});

inputButton.addEventListener("click", async event => {
  event.preventDefault();

  const data = inputJson.value;
  const type = currentActiveApiBadge.getElementsByClassName("badge__type")[0].innerHTML;
  var path = currentActiveApiBadge.getElementsByClassName("badge__path")[0].innerHTML;
  path = path.replace("{userId}", inputUserId.value);

  var response = null;

  if (formInputJson.classList.contains("hide"))
  {
    response = await fetch(path, {
      method: type,
    });
  }
  else
  {
    response = await fetch(path, {
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: type,
    });
  }

  responseOutput.classList.remove("error");
  responseOutput.classList.remove("success");
  responseOutput.classList.remove("hide");

  const output = JSON.stringify(await response.json(), null, 2);
  responseOutput.textContent = output;

  if (response.ok)
  {
    responseOutput.classList.add("success");
  }
  else
  {
    responseOutput.classList.add("error");
  }
});

responseOutput.addEventListener("click", async event => {
  event.preventDefault();
  responseOutput.classList.add("hide");
});