import angular from 'angular';

import './styles.css';

const COMPONENT_NAME = 'note';

angular.module(COMPONENT_NAME, [])
  .component(COMPONENT_NAME, {
    require: {
      parent: '^app'
    },
    template: `
      <div class='note' ng-if='!$ctrl.editing'>
        <b>{{$ctrl.note.title}}</b>
        <span class='btn-edit' ng-click="$ctrl.onToggleEditing()">EDIT</span>
        <span class='btn-del' ng-click="$ctrl.onDelete()">DELETE</span>
        <br>
        {{$ctrl.note.content}}
      </div>
      <div class='note' ng-if='$ctrl.editing'>
        <input type='text' placeholder='Title' class='form-control' ng-model='$ctrl.note.title' />
        <br>
        <input type='text' placeholder='Content' class='form-control' ng-model='$ctrl.note.content' />
        <br>
        <button type='button' class='btn btn-primary' ng-click='$ctrl.onUpdate($ctrl.note)'>Save</button>
        <button type='button' class='btn btn-primary' ng-click='$ctrl.onToggleEditing()'>Cancel</button>
      </div>
    `,
    controller: function () {
      this.$onInit = function () {
        this.editing = false;
        this.onToggleEditing = function () {
          this.editing = !this.editing;
        };
        this.onUpdate = function () {
          this.onToggleEditing();
          this.parent.updateNote(this.note).then(() => {
            this.parent.listNotes();
          });
        };
        this.onDelete = function () {
          this.parent.deleteNote(this.note._id).then(() => {
            this.parent.listNotes();
          });
        };
      }
    },
    bindings: {
      note : '=',
    }
  })

export default COMPONENT_NAME;