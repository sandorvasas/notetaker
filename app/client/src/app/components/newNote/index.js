import angular from 'angular';
import 'bootstrap';
import './styles.css';

const COMPONENT_NAME = 'newNote';

angular.module(COMPONENT_NAME, [])
  .component(COMPONENT_NAME, {
    require: {
      parent: '^app'
    },
    template: `
      <form class='new-note'>
        <h3>New Note</h3>
        <div class='row form-group'>
          <div class='col-xs-12 col-sm-6'>
          <input type='text' placeholder='Title' class='form-control' ng-model='$ctrl.note.title' />
          </div>
        </div>
        <div class='row form-group'>
          <div class='col-xs-12 col-sm-6'>
          <input type='text' placeholder='Content' class='form-control' ng-model='$ctrl.note.content' />
          </div>
        </div>
        <div class='row form-group'>
          <div class='col-xs-12'>
            <button type='button' class='btn btn-primary' ng-click='$ctrl.onSubmit($ctrl.note)'>Upload</button>
          </div>
        </div>
      </form>
    `,
    controller: function () {
      this.$onInit = function () {
        this.note = {
          title: '',
          content: '',
        };
        this.onSubmit =function (note) {
          this.onsubmit(note).then(() => {
            this.parent.listNotes();  
          });
        }
      };
    },
    bindings: {
      onsubmit : '='
    }
  });

export default COMPONENT_NAME;