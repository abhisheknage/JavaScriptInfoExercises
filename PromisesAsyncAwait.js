// Delay with a promise
function delay(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("completed");
    }, ms);
    // reject(new Error("Error"));
  });
}

delay(3000)
  .then(() => console.log("run after 3 seconds"))
  .catch(console.log);

//   Rewrite using async/await
// // Rewrite this example code from the chapter Promises chaining using async/await instead of .then/catch:

async function loadJson(url) {
  const response = await fetch(url);
  if (response.status == 200) {
    return await response.json();
  } else {
    throw new Error(response.status);
  }
}

// Rewrite "rethrow" with async/await
// Below you can find the “rethrow” example. Rewrite it using async/await instead of .then/catch.
// And get rid of the recursion in favour of a loop in demoGithubUser: with async/await that becomes easy to do.

class HttpError extends Error {
  constructor(response) {
    super(`${response.status} for ${response.url}`);
    this.name = "HttpError";
    this.response = response;
  }
}

async function loadJson(url) {
  const response = await fetch(url);
  if (response.status == 200) {
    return await response.json();
  } else {
    throw new HttpError(response);
  }
}

// Ask for a user name until github returns a valid user
async function demoGithubUser() {
  let name = prompt("Enter a name?", "iliakan");
  try {
    const user = await loadJson(`https://api.github.com/users/${name}`);
  } catch (error) {
    if (err instanceof HttpError && err.response.status == 404) {
      alert("No such user, please reenter.");
      return demoGithubUser();
    } else {
      throw err;
    }
  }
  alert(`Full name: ${user.name}.`);
  return user;
}

demoGithubUser();

// Call async from non-async
// We have a “regular” function called f. How can you call the async function wait() and use its result inside of f?

async function wait() {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return 10;
}

function f() {
  // ...what should you write here?
  // we need to call async wait() and wait to get 10
  // remember, we can't use "await"
  let result;
  wait().then((data) => {
    result = data;
  });
  return result;
}
