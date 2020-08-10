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

const render = require("./lib/htmlRenderer"); // render function

function newEmployeeSurvey (){
    inquirer
        .prompt([
        {   //questions for each title
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
//Functions to create different positions
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
            // console.log(newEngineer);
            allEmployees.push(newEngineer);
            // console.log(allEmployees);
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
        // console.log(newManager);
        allEmployees.push(newManager);
        // console.log(allEmployees);
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
        // console.log(newIntern);
        allEmployees.push(newIntern);
        //console.log(allEmployees);
        newEmployeeSurvey();
    })
}

//=============================
// create function asking if directory exists then render the team members to that path
function makeDirectory(){
    // console.log("all employees" + JSON.stringify(allEmployees))
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
    // console.log("We are in the createFile Function" + allEmployees)

    fs.writeFile(outputPath, allEmployees, function(err){
        if (err) throw err; 
    })
}

newEmployeeSurvey(); // run through survey