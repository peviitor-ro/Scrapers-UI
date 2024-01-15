// for local development
// const validator_url = "http://localhost:8000/validator/get/";
// const edit_url = "http://localhost:8000/validator/edit/";
// const delete_url = "http://localhost:8000/validator/delete/";
// const publish_url = "http://localhost:8000/validator/publish/";
// const url = "http://localhost:8000/homepage/";

// TODO: change this to the real url
// for production
const validator_url = "https://api.laurentiumarian.ro/validator/get/";
const editUrl = "https://api.laurentiumarian.ro/validator/edit/";
const deleteUrl = "https://api.laurentiumarian.ro/validator/delete/";
const publishUrl = "https://api.laurentiumarian.ro/validator/publish/";
const peviitorUrl = "https://dev.laurentiumarian.ro";
const url = "https://api.laurentiumarian.ro/homepage/";

// Getting Contributors and Issues from GitHub
const repoOwner = "peviitor-ro";
const repoName = apiObj.url.split("/")[4];
const contributorsUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/contributors`;
const issuesUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/issues`;

const is_authenticated = sessionStorage.getItem("Token") != null;

const headers = {
  "Content-Type": "application/json",
  Authorization: "Token " + sessionStorage.getItem("Token"),
};
