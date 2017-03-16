import angular from 'angular';

import './styles.css';

const COMPONENT_NAME = 'note';

angular.module(COMPONENT_NAME, [])
  .component(COMPONENT_NAME, {
    require: {
      parent: '^app'
    },
    template: `
      <div class='note'>
        <b>{{$ctrl.note.title}}</b><span class='btn-del' ng-click="$ctrl.onDelete()">DELETE</span>
        <br>
        {{$ctrl.note.content}}
      </div>
    `,
    controller: function () {
      this.$onInit = function () {
        this.onDelete = function () {
          this.parent.deleteNote(this.note._id).then(() => {
            this.parent.listNotes();
          });
        }
      }
    },
    bindings: {
      note : '=',
    }
  })

export default COMPONENT_NAME;