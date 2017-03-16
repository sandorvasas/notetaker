import angular from 'angular';

import './styles.css';

const COMPONENT_NAME = 'searchBar';

angular.module(COMPONENT_NAME, [])
  .component(COMPONENT_NAME, {
    require: {
      parent: '^app'
    },
    template: `
      <div class='row form-group'>
        <div class='col-xs-12'>
          <input type='search' placeholder='Search..' ng-change='$ctrl.onChange($ctrl.query)' ng-model='$ctrl.query' />
        </div>
      </div>
    `,
    controller: function () {
      this.$onInit = function () {
        this.query = '';
        this.onChange = function (qq) {
          this.parent.listNotes(qq);
        }
      }
    },
    bindings: {
      search : '='
    }
  })

export default COMPONENT_NAME;