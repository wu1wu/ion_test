var app = angular.module('myApp.services', [])

app.factory('TaskFactory', function() {

  var tasks = [
    { id: 0, 
      name: 'Write some tests',
      description: 'We\'ll start by writting some test. Test driven development is good and tasy.'
    },
    { id: 1, 
      name: 'Write some code',  
      description: 'Get into the zone and move those fingers little coder monkey.'
    },
    { id: 2, 
      name: 'Deploy to staging',
      description: 'Commit your work to git and depoly to staging' 
    },
    { id: 3, 
      name: 'Run integrations tests',
      description: 'Run all top-level integration test and make sure we\'re playing nicely with 3rd party services. You should probably mock those out as well.'
    },
    { id: 4, 
      name: 'Deploy to production' ,
      description: 'Now that we\'re all happy we need to deploy to production so that all our friends can play as well.'
    }
  ];

  return {
    all: function() {
      return tasks;
    },
    get: function(taskId) {
      return tasks[taskId];
    }
  }
});
