const urlBase = "http://my-contacts.xyz/";
const extension = "php";

let userId = 0;
let firstName = "";
let lastName = "";

function doLogin() {
  userId = 0;
  firstName = "";
  lastName = "";

  let login = document.getElementById("loginName").value;
  let password = document.getElementById("loginPassword").value;
  var hash = md5(password);

  if (!checkLoginForm(login, passform)) {
    document.getElementById("loginResult").innerHTML =
      "invalid username or password";
    return;
  }
  document.getElementById("loginResult").innerHTML = "";

  // let tmp = { login: login, password: password };
  var tmp = { login: login, password: hash };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/Login." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;

        if (userId < 1) {
          document.getElementById("loginResult").innerHTML =
            "User/Password combination incorrect";
          return;
        }

        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;

        saveCookie();

        window.location.href = "contacts.html";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("loginResult").innerHTML = err.message;
  }
}

function checkLoginForm(userName, password) {
  var userNameErr = true;
  var passwordErr = true;

  if (userName == "") {
    return false;
  } else {
    var regex = /(?=.*[a-zA-Z])[a-zA-Z0-9-_]{3,18}$/;
    // check if the userName is in the string
    if (!regex.test(userName) == false) {
      return false;
    } else {
      userNameErr = false;
    }
  }

  if (password == "") {
    return false;
  } else {
    var regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/;

    // check if the userName is in the string
    if (!regex.test(password) == false) {
      return false;
    } else {
      passwordErr = false;
    }
  }

  if ((userNameErr || passwordErr) == true) {
    return false;
  }

  return true;
}

function checkSignupForm(fName, lName, userName, password) {
  var fNameErr = true;
  var lNameErr = true;
  var userErr = true;
  var passErr = true;

  if (fName == "") {
    return false;
  } else {
    console.log("first name IS VALID");
    fNameErr = false;
  }

  if (lName == "") {
    return false;
  } else {
    console.log("LAST name IS VALID");
    lNameErr = false;
  }

  if (userName == "") {
    console.log("USERNAME IS BLANK");
  } else {
    var regex = /(?=.*[a-zA-Z])([a-zA-Z0-9-_]).{3,18}$/;

    if (regex.test(userName) == false) {
      return false;
    } else {
      console.log("USERNAME IS VALID");
      userErr = false;
    }
  }

  if (password == "") {
    console.log("PASSWORD IS BLANK");
  } else {
    var regex = /(?=.*\d)(?=.*[A-Za-z])(?=.*[!@#$%^&*]).{8,32}/;

    if (regex.test(password) == false) {
      return false;
    } else {
      console.log("PASSWORD IS VALID");
      passErr = false;
    }
  }

  if ((fNameErr || lNameErr || userErr || passErr) == true) {
    return false;
  }

  return true;
}

function doSignUp() {
  firstName = document.getElementById("firstName").value;
  lastName = document.getElementById("lastName").value;

  let username = document.getElementById("username").value;
  let password = document.getElementById("password").value;

  if (!checkValidSignUpForm(firstName, lastName, username, password)) {
    document.getElementById("signupResult").innerHTML = "Unsuccessfully SignUp";
  }

  var hash = md5(password);
  document.getElementById("signupResult").innerHTML = "";
  let tmp = {
    firstName: firstName,
    lastName: lastName,
    login: username,
    password: hash,
  };

  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/SignUp." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");

  try {
    xhr.onreadystatechange = function () {
      if (this.readyState != 4) {
        return;
      }

      if (this.status == 409) {
        document.getElementById("signupResult").innerHTML =
          "User already exists";
        return;
      }

      if (this.status == 200) {
        let jsonObject = JSON.parse(xhr.responseText);
        userId = jsonObject.id;
        document.getElementById("signupResult").innerHTML = "User added";
        firstName = jsonObject.firstName;
        lastName = jsonObject.lastName;
        saveCookie();
      }
    };

    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("signupResult").innerHTML = err.message;
  }
}

function saveCookie() {
  let minutes = 20;
  let date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000);
  document.cookie =
    "firstName=" +
    firstName +
    ",lastName=" +
    lastName +
    ",userId=" +
    userId +
    ";expires=" +
    date.toGMTString();
}

function readCookie() {
  userId = -1;
  let data = document.cookie;
  let splits = data.split(",");
  for (var i = 0; i < splits.length; i++) {
    let thisOne = splits[i].trim();
    let tokens = thisOne.split("=");
    if (tokens[0] == "firstName") {
      firstName = tokens[1];
    } else if (tokens[0] == "lastName") {
      lastName = tokens[1];
    } else if (tokens[0] == "userId") {
      userId = parseInt(tokens[1].trim());
    }
  }

  if (userId < 0) {
    window.location.href = "index.html";
  } else {
    document.getElementById("userName").innerHTML =
      "Logged in as " + firstName + " " + lastName;
  }
}

function doLogout() {
  userId = 0;
  firstName = "";
  lastName = "";
  document.cookie = "firstName= ; expires = Thu, 01 Jan 1970 00:00:00 GMT";
  window.location.href = "index.html";
}

function addColor() {
  let newColor = document.getElementById("colorText").value;
  document.getElementById("colorAddResult").innerHTML = "";

  let tmp = { color: newColor, userId, userId };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/AddColor." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("colorAddResult").innerHTML =
          "Color has been added";
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("colorAddResult").innerHTML = err.message;
  }
}

function searchColor() {
  let srch = document.getElementById("searchText").value;
  document.getElementById("colorSearchResult").innerHTML = "";

  let colorList = "";

  let tmp = { search: srch, userId: userId };
  let jsonPayload = JSON.stringify(tmp);

  let url = urlBase + "/SearchColors." + extension;

  let xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-type", "application/json; charset=UTF-8");
  try {
    xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("colorSearchResult").innerHTML =
          "Color(s) has been retrieved";
        let jsonObject = JSON.parse(xhr.responseText);

        for (let i = 0; i < jsonObject.results.length; i++) {
          colorList += jsonObject.results[i];
          if (i < jsonObject.results.length - 1) {
            colorList += "<br />\r\n";
          }
        }

        document.getElementsByTagName("p")[0].innerHTML = colorList;
      }
    };
    xhr.send(jsonPayload);
  } catch (err) {
    document.getElementById("colorSearchResult").innerHTML = err.message;
  }
}

// -------------  Contact Page -------------- //
function addContact() {
  /*var rollno=document.sample.rollno.value;*/

  var fName = document.sample.fName.value;
  var lName = document.sample.lName.value;
  var phNumber = document.sample.phNumber.value;
  var email = document.sample.email.value;
  var address = document.sample.address.value;

  var tr = document.createElement("tr");

  var td1 = tr.appendChild(document.createElement("td"));
  var td2 = tr.appendChild(document.createElement("td"));
  var td3 = tr.appendChild(document.createElement("td"));
  var td4 = tr.appendChild(document.createElement("td"));
  var td5 = tr.appendChild(document.createElement("td"));
  var td6 = tr.appendChild(document.createElement("td"));
  var td7 = tr.appendChild(document.createElement("td"));

  td1.innerHTML = fName;
  td2.innerHTML = lName;
  td3.innerHTML = phNumber;
  td4.innerHTML = email;
  td5.innerHTML = address;

  td6.innerHTML =
    "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='delCon(this)' <i class='fa-regular fa-trash'></i> </button>";

  // td7.innerHTML =
  //   '<input type="button" name="up" value="Update" onclick="UpCon(this);" class="btn btn-primary">';
  td7.innerHTML =
    "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='UpCon(this)' <i class='fa-regular fa-pen-to-square'></i> </button>";
  document.getElementById("tbl").appendChild(tr);
  document.getElementById("addMe").reset();

  showTable();
}

function UpCon(con) {
  var fName = document.sample.fName.value;
  var lName = document.sample.lName.value;
  var phNumber = document.sample.phNumber.value;
  var email = document.sample.email.value;
  var address = document.sample.address.value;

  var s = con.parentNode.parentNode;
  var tr = document.createElement("tr");

  var td1 = tr.appendChild(document.createElement("td"));
  var td2 = tr.appendChild(document.createElement("td"));
  var td3 = tr.appendChild(document.createElement("td"));
  var td4 = tr.appendChild(document.createElement("td"));
  var td5 = tr.appendChild(document.createElement("td"));
  var td6 = tr.appendChild(document.createElement("td"));
  var td7 = tr.appendChild(document.createElement("td"));

  td1.innerHTML = '<input type="text" name="fName1">';
  td2.innerHTML = '<input type="text" name="lame1">';
  td3.innerHTML = '<input type="text" name="phNumber1">';
  td4.innerHTML = '<input type="text" name="email1">';
  td5.innerHTML = '<input type="text" name="address1">';

  td6.innerHTML =
    "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='delCon(this)' <i class='fa-regular fa-trash'></i> </button>";

  td7.innerHTML =
    "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='UpCon(this)' <i class='fa-regular fa-pen-to-square'></i> </button>";

  document.getElementById("tbl").replaceChild(tr, s);
}

function changeCon(con) {
  var fName = document.sample.fName1.value;
  var lName = document.sample.lName1.value;
  var phNumber = document.sample.phNumber1.value;
  var email = document.sample.email1.value;
  var address = document.sample.address1.value;

  var s = con.parentNode.parentNode;
  var tr = document.createElement("tr");

  var td1 = tr.appendChild(document.createElement("td"));
  var td2 = tr.appendChild(document.createElement("td"));
  var td3 = tr.appendChild(document.createElement("td"));
  var td4 = tr.appendChild(document.createElement("td"));
  var td5 = tr.appendChild(document.createElement("td"));
  var td6 = tr.appendChild(document.createElement("td"));
  var td7 = tr.appendChild(document.createElement("td"));

  td1.innerHTML = fName;
  td2.innerHTML = lName;
  td3.innerHTML = phNumber;
  td4.innerHTML = email;
  td5.innerHTML = address;

  td6.innerHTML =
    "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='delCon(this)' <i class='fa-regular fa-trash'></i> </button>";

  td7.innerHTML =
    "<button type='button' id='edit_button class='w3-button w3-circle w3-lime' onclick='UpCon(this)' <i class='fa-regular fa-pen-to-square'></i> </button>";

  document.getElementById("tbl").replaceChild(tr, s);
}

function delCon(Con) {
  var s = Con.parentNode.parentNode;
  s.parentNode.removeChild(s);
}

function searchContacts() {
  const content = document.getElementById("searchText").value;
  const selections = content.toUpperCase();

  const table = document.getElementById("tbl");
  const tr = table.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    const fN = tr[i].getElementsByTagName("td")[0];
    const lN = tr[i].getElementsByTagName("td")[1];
    const pN = tr[i].getElementsByTagName("td")[2];
    const email = tr[i].getElementsByTagName("td")[3];
    const address = tr[i].getElementsByTagName("td")[4];

    if (fN && lN && pN && email && address) {
      const txtValue_fn = fN.textContent || fN.innerText;
      const txtValue_ln = lN.textContent || lN.innerText;
      const txtValue_pn = pN.textContent || pN.innerText;
      const txtValue_email = email.textContent || email.innerHTML;
      const txtValue_address = address.textContent || address.innerHTML;
      tr[i].style.display = "none";

      for (let j = 0; j < selections.length; j++) {
        if (txtValue_fn.toUpperCase().indexOf(selections[j]) > -1) {
          tr[i].style.display = "";
        }
        if (txtValue_ln.toUpperCase().indexOf(selections[j]) > -1) {
          tr[i].style.display = "";
        }
        if (txtValue_pn.toUpperCase().indexOf(selections[j]) > -1) {
          tr[i].style.display = "";
        }

        if (txtValue_email.toUpperCase().indexOf(selections[j]) > -1) {
          tr[i].style.display = "";
        }
        if (txtValue_address.toUpperCase().indexOf(selections[j]) > -1) {
          tr[i].style.display = "";
        }
      }
    }
  }
}
function showTable() {
  var x = document.getElementById("addMe");
  var contacts = document.getElementById("tab");

  if (x.style.display === "none") {
    x.style.display = "block";
    contacts.style.display = "none";
  } else {
    x.style.display = "none";
    contacts.style.display = "flex";
  }
}
// ----------------------------- //

let fNameField = document.getElementById("firstName");
let lNameField = document.getElementById("lastName");
let userform = document.getElementById("userName");
let totalform = document.getElementById("wholeForm");
let numInput = document.getElementById("userNum");
let lettInput = document.getElementById("userLett");
let lenInput = document.getElementById("userLen");
let hypInput = document.getElementById("userHyp");
let undInput = document.getElementById("userUnd");

fNameField.onclick = function () {
  totalform.style.minHeight = "360.001px";
};

lNameField.onclick = function () {
  totalform.style.minHeight = "360.001px";
};

//password message displays
userform.onfocus = function () {
  document.getElementById("explanationUser").style.display = "block";
  totalform.style.minHeight = "675px";
};

//password message goes away
userform.onblur = function () {
  document.getElementById("explanationUser").style.display = "none";
  totalform.style.minHeight = "360px";
};

userform.onkeyup = function () {
  var nums = /[0-9]/g;
  var lett = /[a-zA-Z]/g;
  var hyp = /[-]/g;
  var und = /[_]/g;

  if (userform.value.length >= 3 && userform.value.length <= 18) {
    lenInput.classList.remove("invalid");
    lenInput.classList.add("valid");
  } else {
    lenInput.classList.remove("valid");
    lenInput.classList.add("invalid");
  }

  //check letters
  if (userform.value.match(lett)) {
    lettInput.classList.remove("invalid");
    lettInput.classList.add("valid");
  } else {
    lettInput.classList.remove("valid");
    lettInput.classList.add("invalid");
  }

  //check numbers
  if (userform.value.match(nums)) {
    numInput.classList.remove("opt");
    numInput.classList.add("valid");
  } else {
    numInput.classList.remove("valid");
    numInput.classList.add("opt");
  }

  //check hyphens
  if (userform.value.match(hyp)) {
    hypInput.classList.remove("opt");
    hypInput.classList.add("valid");
  } else {
    hypInput.classList.remove("valid");
    hypInput.classList.add("opt");
  }

  // check underscores
  if (userform.value.match(und)) {
    undInput.classList.remove("opt");
    undInput.classList.add("valid");
  } else {
    undInput.classList.remove("valid");
    undInput.classList.add("opt");
  }
};
let passform = document.getElementById("password");
let pNumInput = document.getElementById("passNum");
let pLettInput = document.getElementById("passLett");
let pSpecInput = document.getElementById("passSpec");
let pLenInput = document.getElementById("passLen");

//password message displays
passform.onfocus = function () {
  document.getElementById("explanation").style.display = "block";
  totalform.style.minHeight = "570px";
};

//password message goes away
passform.onblur = function () {
  document.getElementById("explanation").style.display = "none";
  totalform.style.minHeight = "360px";
};

//password validation
passform.onkeyup = function () {
  var nums = /[0-9]/g;
  var lett = /[a-zA-Z]/g;
  var spec = /[!@#$%^&*]/g;

  //check length
  if (passform.value.length >= 8 && passform.value.length <= 32) {
    pLenInput.classList.remove("invalid");
    pLenInput.classList.add("valid");
  } else {
    pLenInput.classList.remove("valid");
    pLenInput.classList.add("invalid");
  }

  //check numbers
  if (passform.value.match(nums)) {
    pNumInput.classList.remove("invalid");
    pNumInput.classList.add("valid");
  } else {
    pNumInput.classList.remove("valid");
    pNumInput.classList.add("invalid");
  }

  //check letters
  if (passform.value.match(lett)) {
    pLettInput.classList.remove("invalid");
    pLettInput.classList.add("valid");
  } else {
    pLettInput.classList.remove("valid");
    pLettInput.classList.add("invalid");
  }

  //check special characters
  if (passform.value.match(spec)) {
    pSpecInput.classList.remove("invalid");
    pSpecInput.classList.add("valid");
  } else {
    pSpecInput.classList.remove("valid");
    pSpecInput.classList.add("invalid");
  }
};
