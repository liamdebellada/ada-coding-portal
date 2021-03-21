const prompt = require('prompt'); // Used for user input
const lb = require("./lb.js");

options();

function options() { // List options for user
  console.log("-----Available Options-----\n" +
    "(1) Create New Container \n" +
    "(2) Manipulate Containers\n" +
    "(3) Exit")

  const properties = [  // Checks if option is a single digit
    {
      name: 'choice',
      validator: /(?<!\S)\d(?!\S)/,
      warning: 'Choice must be a single digit number!'
    }
  ];

  prompt.start();

  prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }

    if (result.choice == "1") { lb.createContainer(); }
    else if (result.choice == "2") { manipulateContainers(); }

    else if (result.choice == "3") { exit(); }
    else { console.log("Incorrect option! Try again."); options() }

  });

}

async function manipulateContainers() {

  console.log("Options: list | remove | stop")

  prompt.start();

  const properties = [
    {
      name: 'choice',
      validator: /^(list|remove|stop)$/,
      warning: 'Choice must be in the options list!'
    }
  ];

  prompt.get(properties, function (err, result) {
    if (err) { return onErr(err); }

    const properties = [
      {
        name: 'choice',
        validator: /^(Y|N|y|n)$/,
        warning: 'Choice must be Y or N!'
      }
    ];

    if (result.choice == "list") { lb.listContainers(); }
    else {
      console.log(`Would you like to ${result.choice} all containers? (Y/N)`);

      prompt.start();
      prompt.get(properties, function (error, all_result) {
        if (error) { return onErr(error); }

        if (all_result.choice.toLowerCase() === "y") {
          lb.stopAllContainers();

          if (all_result.choice === "remove") {
            lb.removeAllContainers();
          }
        }
        else {
          obtainID(result.choice);
        }

      });
    }

  });
}

async function obtainID(choice) {

  await lb.listContainers();

  prompt.start();
  prompt.get(['id'], function (err, result) {
    if (err) { return onErr(err); }

    if (choice == "stop") {
      lb.stopContainer(result.id);
    } else {
      lb.stopContainer(result.id);
      lb.removeContainer(result.id);
    }
  });

}

