#!/usr/local/bin/node
const inquirer = require('inquirer');
const exec = require("child_process").exec;

exec('git branch --all', function(error, stdout, stderr){
  let branchArr = stdout.split(/\n/).filter(function(item){
    return !!item;
  });

  inquirer
    .prompt([
      {
        type: 'list',
        name: 'branch',
        message: 'Enter来切换分支',
        choices: branchArr,
        filter: function(val) {
          return val.toLowerCase();
        }
      }
    ])
    .then(answers => {
      let branch = answers.branch;
      if (branch.indexOf('*')) {
        branch = branch.replace('* ', '');
      }

      exec(`git checkout ${branch}`);
    });
})
