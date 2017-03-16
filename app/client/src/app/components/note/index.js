import angular from 'angular';

import './styles.css';

const COMPONENT_NAME = 'note';

angular.module(COMPONENT_NAME, [])
  .component(COMPONENT_NAME, {
    template: `
      <div class='note'>
        <b>{{$ctrl.note.title}}</b>
        <br>
        {{$ctrl.note.content}}
      </div>
    `,
    controller: [ () => {

    }],
    bindings: {
      note : '='
    }
  })

export default COMPONENT_NAME;