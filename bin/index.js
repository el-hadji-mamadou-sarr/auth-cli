import inquirer from "inquirer";

inquirer.prompt([
  {
    type: "input",
    name: 'name',
    message: "What's your name?",
  },

  {
    type: 'number',
    name: 'age',
    message: "How old are you?",
    validate: (input) => {
      if (input < 0 || input > 120) {
        return 'Please enter a valid age';
      }
      return true;
    },
  },
]).then((answers) => {
  console.log(`Hello, ${answers.name}! You are ${answers.age} years old.`);
});