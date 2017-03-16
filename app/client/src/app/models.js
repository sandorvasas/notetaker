import angular from 'angular';

const MODULE_NAME = 'models';

angular.module(MODULE_NAME, [])
  .factory('Note', ['$resource', ($resource) => {
    return $resource('http://localhost:3000/api/notes/:id/:q', 
      {  id: '@id', q: '@q' },
      {
        get     : { method: 'GET', params: {}, },
        find    : { method: 'GET', params: {}, isArray: true },
        create  : { method: 'POST', params: {} },
        update  : { method: 'PUT', params: {} },
        delete  : { method: 'DELETE', params: {} }
      }
    );
  }]);

export default MODULE_NAME;