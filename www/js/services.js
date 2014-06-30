angular.module('myApp.services', [])

/**
 * A simple example service that returns some data.
 */
.factory('TaskFactory', function() {

  var tasks = [
    { id: 0, name: 'Scruff McGruff' },
    { id: 1, name: 'G.I. Joe' },
    { id: 2, name: 'Miss Frizzle' },
    { id: 3, name: 'Ash Ketchum' }
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
