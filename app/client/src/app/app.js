import angular from 'angular';

import bootstrap from 'bootstrap';
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
    /**/
    NoteModel = Note;
    this.listNotes();
  }

  listNotes(query) {
    let req = {};
    if (query) {
      req.q = query;
    }
    this.notes = [];
    NoteModel.find(req).$promise.then(((res) => {
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
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [
  ngResource,
  models,
  note,
  searchBar,
  newNote
  ])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;