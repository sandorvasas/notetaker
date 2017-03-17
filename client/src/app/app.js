import $ from "jquery"
import angular from 'angular';

import 'quill/dist/quill.snow.css';
import 'quill/dist/quill';
import 'ng-quill';

import ngResource from 'angular-resource';
import models from './models';
import note from './components/note';
import searchBar from './components/searchBar';
import newNote from './components/newNote';

import '../style/app.css';


let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};
let NoteModel = null;

class AppCtrl {
  constructor(Note) {
    NoteModel = Note;
    this.searchTerm = {};
    this.listNotes();
  }

  listNotes(query) {
    if (typeof query === 'string') {
      if (!query.length) {
        this.searchTerm = {};
      } else
        this.searchTerm = { q: query };
    } 
    this.notes = [];
    NoteModel.find(this.searchTerm).$promise.then(((res) => {
      this.notes.push.apply(this.notes, res);
      console.log("app.notes", this.notes);
    }).bind(this), (err) => {
      console.error(err);
    });
  }

  submitNote(note) {
    let { title, content } = note;
    if (!title || !content || !title.length || !content.length) {
      alert("Please fill out title and content fields");
      return;
    }
    return NoteModel.create(note).$promise;
  }

  deleteNote(id) {
    return NoteModel.delete({ id: id }).$promise;
  }

  updateNote(note) {
    return NoteModel.update(Object.assign({ id: note._id }, note)).$promise;
  }
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
  'ngQuill',
  ngResource,
  models,
  note,
  searchBar,
  newNote
  ])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;