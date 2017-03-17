import angular from 'angular';
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
          <text-angular ng-model='$ctrl.note.content'></text-angular>
            <ng-quill-editor ng-model="$ctrl.note.content">
                <ng-quill-toolbar>
                    <div>
                        <span class="ql-formats">
                            <button class="ql-bold" ng-attr-title="{{'Bold'}}"></button>
                            <button class="ql-italic" ng-attr-title="{{'italic'}}"></button>
                            <button class="ql-underline" ng-attr-title="{{'underline'}}"></button>
                            <button class="ql-strike" ng-attr-title="{{'strike'}}"></button>
                        </span>
                    </div>
                </ng-quill-toolbar>
            </ng-quill-editor>
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
        this.onSubmit = function (note) {
          let promise = this.onsubmit(note);
          if (promise) promise.then(() => {
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