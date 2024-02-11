import inquirer from "inquirer";
function textToUrl(text) {
    return text
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^a-zA-Z0-9-]/g, "");
}
const questions = [
    {
        type: "input",
        name: "raw",
        message: "Enter your post title:",
    },
];
inquirer.prompt(questions).then((answers) => {
    console.log(textToUrl(answers.raw));
});
