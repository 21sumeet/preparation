//promsies in js
//simple code for understanding callback vs promise
//callback
function add(a, b, callback) {
    console.log(a + b);
    callback();
}
add(10, 20, function() {
    console.log("added");
});
// Output: 30, "added"

//promise code
function addPromise(a, b) {
    return new Promise((resolve, reject) => {
        if (typeof a !== 'number' || typeof b !== 'number') {
            reject(new Error("Both arguments must be numbers"));
        }  
        const sum = a + b;
        console.log(`Sum: ${sum}`);
        resolve(sum);
    });
}
addPromise(10, 20)
    .then((sum) => {
        console.log(`Addition completed: ${sum}`);
    })
    .catch((error) => {
        console.error(`Error: ${error.message}`);
    });

// Output: "Sum: 30", "Addition completed: 30"
//-----------------------------------------------------------------------------------------------

//async code
console.log("start");
function impmsg(username) {
  setTimeout(() => {
    return "hello " + username;
  }, 1000);
}
const msg = impmsg("sam");
console.log(msg); //undefined output , bcoz settimeout function excuted later
console.log("stop");
console.log("----------------------------------------------------------");

//callback function (solution)
console.log("start");
function impmsg(username, callback) {
  setTimeout(() => {
    callback(username);
  }, 1000);
}
const msg2 = impmsg("sam", function (username) {
  console.log("hello " + username);
});
console.log("stop");
console.log("----------------------------------------------------------");

//promises
console.log("start");
function impmsg(username) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("hello " + username);
      //reject ("user not found")
    }, 1000);
  });
}
impmsg("sam")
  .then((msg) => {
    console.log(msg);
  })
  .catch((err) => {
    console.log(err);
  });

//promise.all()
console.log("Starting all promises...");

const promise1 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("First promise completed");
  }, 2000);
});
const promise2 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Second promise completed");
  }, 1000);
});
const promise3 = new Promise((resolve) => {
  setTimeout(() => {
    resolve("Third promise completed");
  }, 1500);
});

Promise.all([promise1, promise2, promise3])
  .then((results) => {
    console.log("All promises completed!");
    console.log("Results:", results);
    // results = ["First promise completed", "Second promise completed", "Third promise completed"]
  })
  .catch((error) => {
    console.log("Error:", error);
  });
console.log("This runs immediately while promises are executing...");

//real use of promise.all()
// Simulating API calls
function getUser(userId, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: userId, name: `User${userId}` });
    }, delay);
  });
}

const userPromises = [
  getUser(1, 1000), // Takes 1 second
  getUser(2, 500), // Takes 0.5 seconds
  getUser(3, 800), // Takes 0.8 seconds
];
console.log("Fetching users...");
Promise.all(userPromises)
  .then((users) => {
    console.log("All users fetched!");
    users.forEach((user) => {
      console.log(`${user.name} (ID: ${user.id})`);
    });
  })
  .catch((error) => {
    console.log("Failed to fetch users:", error);
  });

console.log("----------------------------------------------------------");
//output based question
