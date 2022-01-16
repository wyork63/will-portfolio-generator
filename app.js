const inquirer = require('inquirer');

const promptUser = () => {
return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name? (Required)',
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log('Please enter your name!');
          return false;
        }
      }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub Username (Required)',
        validate: githubInput => {
            if (githubInput) {
              return true;
            } else {
              console.log('Please enter your GitHub username!');
              return false;
            }
          }
      },
      {
        type: 'confirm',
        name: 'confirmAbout',
        message: 'Would you like to enter some information about yourself for an "About" section?',
        default: true
      },
      {
        type: 'input',
        name: 'about',
        message: 'Provide some information about yourself:',
        when: ({ confirmAbout }) => confirmAbout
      },
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
        message: 'What is the name of your project? (Required)',
        validate: nameInput => {
            if (nameInput) {
              return true;
            } else {
              console.log('You need to enter a project name!');
              return false;
            }
          }
      },
      {
        type: 'input',
        name: 'description',
        message: 'Provide a description of the project (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
              return true;
            } else {
              console.log('You need to enter a project description!');
              return false;
            }
          }
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
        message: 'Enter the GitHub link to your project. (Required)',
        validate: linkInput => {
            if (linkInput) {
              return true;
            } else {
              console.log('You need to enter a project GitHub link!');
              return false;
            }
          }
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
  .then(portFolioData => {
    const pageHTML = generatePage(portFolioData);

    // fs.writeFile('./index.html', pageHTML, err => {
    //   if (err) throw new Error(err);

    //   console.log('Page created! Check out index.html in this directory to see it!');
    // });
  });


const fs = require('fs');
const generatePage = require('./src/page-template.js');

// const pageHTML = generatePage(user, github);


//   fs.writeFile('./index.html', generatePage(user, github), err => {
//     if (err) throw err;
  
//     console.log('Portfolio complete! Check out index.html to see the output!')
//   });
