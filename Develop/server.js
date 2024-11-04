const { mainMenu } = require('./lib/prompts');
const { viewAllDepartments, viewAllRoles, viewAllEmployees } = require('./db/queries');

async function init() {
  let shouldContinue = true;

  while (shouldContinue) {
    const { action } = await mainMenu();

    switch (action) {
      case 'View all departments':
        console.table(await viewAllDepartments());
        break;
      case 'View all roles':
        console.table(await viewAllRoles());
        break;
      case 'View all employees':
        console.table(await viewAllEmployees());
        break;
      case 'Exit':
        shouldContinue = false;
        break;
      default:
        console.log('Feature under construction.');
        break;
    }
  }

  process.exit();
}

init();