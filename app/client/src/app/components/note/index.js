import $ from "jquery"
window.jQuery = window.$ = $;
import angular from 'angular';

import 'quill/dist/quill.snow.css';
import 'quill/dist/quill';
import 'ng-quill';
import './styles.css';

const COMPONENT_NAME = 'note';

NoteController.$inject = ['$scope', '$compile', '$timeout'];

function NoteController($scope, $compile, $timeout) {

  this.$onInit = function () {
    let $this = this;
    this.noteContent = $compile("<pre>"+this.note.content+"</pre>")($scope.$new());
    $timeout(function () {
      $('.note-content-'+$this.note._id).html($this.noteContent);
    });

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
};
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
        <div class='note-content-{{$ctrl.note._id}}'></div>
      </div>
      <div class='note' ng-if='$ctrl.editing'>
        <input type='text' placeholder='Title' class='form-control' ng-model='$ctrl.note.title' />
        <br>
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
        <br>
        <button type='button' class='btn btn-primary' ng-click='$ctrl.onUpdate($ctrl.note)'>Save</button>
        <button type='button' class='btn btn-primary' ng-click='$ctrl.onToggleEditing()'>Cancel</button>
      </div>
    `,
    controller: NoteController,
    bindings: {
      note : '=',
    }
  })

export default COMPONENT_NAME;