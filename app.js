const inquirer = require('inquirer');

const promptUser = () => {
return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username'
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:'
      }
  ]);
};

const promptProject = portFolioData => {
    console.log(`
  =================
  Add a New Project
  =================
  `);
  // if theres no projects array property create one 
  if (!portFolioData.projects) {
    portFolioData.projects = [];
  }
    return inquirer.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your project?'
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)'
      },
      {
        type: 'checkbox',
        name: 'languages',
        message: 'What did you build this project with? (Check all that apply)',
        choices: ['JavaScript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
      },
      {
        type: 'input',
        name: 'link',
        message: 'Enter the GitHub link to your project. (Required)'
      },
      {
        type: 'confirm',
        name: 'feature',
        message: 'Would you like to feature this project?',
        default: false
      },
      {
        type: 'confirm',
        name: 'confirmAddProject',
        message: 'Would you like to enter another project?',
        default: false
      }
    ])
    .then(projectData => {
        portFolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
          return promptProject(portFolioData);
        } else {
          return portFolioData;
        }
      });
  };


  promptUser()
  .then(promptProject)
  .then(portfolioData => {
    console.log(portfolioData);
  });
// const fs = require('fs');
// const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(user, github);


//   fs.writeFile('./index.html', generatePage(user, github), err => {
//     if (err) throw err;
  
//     console.log('Portfolio complete! Check out index.html to see the output!')
//   });
