import "./style.css";

let currentActiveApiBadge = document.getElementById("apiGetAll");
let previousActiveApiBadge = document.getElementById("apiGetAll");

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
const responseOutputBlock = document.getElementById("responseOutputBlock");

badgeApiGetAll.addEventListener("click", event => {
  event.preventDefault();

  if (currentActiveApiBadge === badgeApiGetAll) return;

  previousActiveApiBadge = currentActiveApiBadge;
  currentActiveApiBadge = badgeApiGetAll;
  badgeApiGetAll.classList.add("selected");
  previousActiveApiBadge.classList.remove("selected");

  formInputUserId.classList.add("hide");
  formInputJson.classList.add("hide");
});

badgeApiGetById.addEventListener("click", event => {
  event.preventDefault();

  if (currentActiveApiBadge === badgeApiGetById) return;

  previousActiveApiBadge = currentActiveApiBadge;
  currentActiveApiBadge = badgeApiGetById;
  badgeApiGetById.classList.add("selected");
  previousActiveApiBadge.classList.remove("selected");
  
  inputUserId.value = "";
  formInputUserId.classList.remove("hide");
  formInputJson.classList.add("hide");
});

badgeApiCreateUser.addEventListener("click", event => {
  event.preventDefault();

  if (currentActiveApiBadge === badgeApiCreateUser) return;

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

badgeApiUpdateUser.addEventListener("click", event => {
  event.preventDefault();

  if (currentActiveApiBadge === badgeApiUpdateUser) return;

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

badgeApiDeleteUser.addEventListener("click", event => {
  event.preventDefault();

  if (currentActiveApiBadge === badgeApiDeleteUser) return;

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
  let path = currentActiveApiBadge.getElementsByClassName("badge__path")[0].innerHTML;
  path = path.replace("{userId}", inputUserId.value);

  let response = null;

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

  responseOutputBlock.classList.remove("error");
  responseOutputBlock.classList.remove("success");
  responseOutputBlock.classList.remove("hide");

  const output = JSON.stringify(await response.json(), null, 2);
  responseOutput.textContent = output;

  if (response.ok)
  {
    responseOutputBlock.classList.add("success");
  }
  else
  {
    responseOutputBlock.classList.add("error");
  }
});

responseOutputBlock.addEventListener("click", event => {
  event.preventDefault();
  responseOutputBlock.classList.add("hide");
});