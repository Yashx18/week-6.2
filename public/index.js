// SIGN UP SECTION
async function signup() {
  const username = document.getElementById("signup-username").value;
  const password = document.getElementById("signup-password").value;
  await axios.post("http://localhost:4000/signup", {
    username: username,
    password: password,
  });
  alert("You are Signed Up.");
}

// SIGN IN SECTION
async function signin() {
  const username = document.getElementById("signin-username").value;
  const password = document.getElementById("signin-password").value;
  const response = await axios.post("http://localhost:4000/signin", {
    username: username,
    password: password,
  });

  if (response.data.Token) {
    console.log(response.data.Token);
    localStorage.setItem("Token", response.data.Token);
    alert("You are Signed In.");
  } else {
    alert(response.data.message); // Show error message like "Invalid Credentials"
  }
}

async function displayInfo() {
  const token = localStorage.getItem("Token");
  const info = document.getElementById("information");
  const response = await axios.post(
    "http://localhost:4000/me",
    {},
    {
      headers: {
        token: token,
      },
    }
  );
  if (response) {
    info.innerHTML = `Username: ${response.data.username}, Password: ${response.data.password}`;
    console.log(response.data);
  } else {
    alert(response.data.message);
  }

  displayInfo();
}

function logout() {
  localStorage.removeItem("Token");
  const info = document.getElementById("information");
  info.innerHTML = "";
  alert("Logged out successfully");
}
