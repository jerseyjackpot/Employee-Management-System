const Employee = require("./lib/Employee");
const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const allEmployees = [];

const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")//Creates a folder called output
const outputPath = path.join(OUTPUT_DIR, "team.html"); // creates a file called Team.html inside of output

const render = require("./lib/htmlRenderer");

function newEmployeeSurvey (){
    inquirer
        .prompt([
        {   
            type: "list",
            message: "What is their title?",
            choices: ["Engineer", "Intern", "Manager", "Exit"], 
            name: "role"
        }
        ])
            .then (function(response){
                console.log(response);
            switch(response.role){
                case "Engineer":
                    makeEngineer(response.role);
                break;

                case "Manager" : 
                    makeManager(response.role);
                break;

                case "Intern": 
                    makeIntern(response.role);
                break;
            
            case "Exit":
                console.log("done!")
                 makeDirectory(allEmployees);  
                    return "done!";
                };
            });
        };    
        
    


//=============================
//Functions
//=============================

function makeEngineer(){
    inquirer
        .prompt([
            {   
                type: "input",
                message: "What is the Employee's Name?",
                name: "Name"
            },
            {   
                type: "input",
                message: "What is thier Employee ID?",
                name: "Id"
            },
            {   
                type: "input",
                message: "What is their email?",
                name: "Email"
            }, 
            {
                type: "input",
                message: "What is their GitHub Username?",
                name: "gitHubUsername" 
            },
        ])
        .then (function(engineerResponse){
            let newEngineer = new Engineer(engineerResponse.Name, engineerResponse.Id, engineerResponse.Email, engineerResponse.gitHubUsername);
            console.log(newEngineer);
            allEmployees.push(newEngineer);
            console.log(allEmployees);
            newEmployeeSurvey();
        })
}

function makeManager(){
    inquirer
    .prompt([ 
        {   
            type: "input",
            message: "What is the Employee's Name?",
            name: "Name"
        },
        {   
            type: "input",
            message: "What is thier Employee ID?",
            name: "Id"
        },
        {   
            type: "input",
            message: "What is their email?",
            name: "Email"
        },
        {
            type: "input",
            message: "What is their office number?",
            name: "officeNumber" 
        }
    ]) 
    .then (function(managerResponse){
        let newManager = new Manager (managerResponse.Name, managerResponse.Id, managerResponse.Email, managerResponse.officeNumber);
        console.log(newManager);
        allEmployees.push(newManager);
        console.log(allEmployees);
        newEmployeeSurvey();
    })
}

function makeIntern(){
    inquirer
    .prompt([ 
        {   
            type: "input",
            message: "What is the Employee's Name?",
            name: "Name"
        },
        {   
            type: "input",
            message: "What is thier Employee ID?",
            name: "Id"
        },
        {   
            type: "input",
            message: "What is their email?",
            name: "Email"
        },
        {
            type: "input",
            message: "What School Do you attend?",
            name: "school" 
        }
    ]) 
    .then (function(internResponse){
        let newIntern = new Intern (internResponse.Name, internResponse.Id, internResponse.Email, internResponse.school);
        console.log(newIntern);
        allEmployees.push(newIntern);
        //console.log(allEmployees);
        newEmployeeSurvey();
    })
}

//=============================
// fs the output directory, write the Team file to the the directory (create function asking if this directory exists) then render the team members to that path
function makeDirectory(){
    console.log("all employees" + JSON.stringify(allEmployees))
    let allEmployeesArray= JSON.stringify(allEmployees)
        if(!fs.existsSync(OUTPUT_DIR)){
            //creat Directory
           const fileHTML = render( allEmployees); 
           createFile(fileHTML);    
            console.log("the directory exists")
        } else {
        
            const fileHTML = render( allEmployees); 
            createFile(fileHTML); 
        
        };
};


function createFile(allEmployees){
    console.log("We are in the createFile Function" + allEmployees)

    fs.writeFile(outputPath, allEmployees, function(err){
        if (err) throw err; 
    })
}

newEmployeeSurvey(); // run through survey
// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
