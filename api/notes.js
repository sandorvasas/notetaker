import {Router} from 'express';
import {Note}   from '../models';

let send400 = (res, msg) => {
  res.status(400).send({
    message: msg
  });
};

let notes = new Router();

notes.post('/', (req, res) => {
  let {title, content} = req.body;

  try {
    if (!title) throw 'Title is required';
    if (!content)  throw 'content is required';
  } catch (e) {
    send400(res, e);
  }

  let note = new Note({ title, content });

  note.save((err, doc) => {
    if (err) throw err;
    res.status(201).send(doc);
  });
});

notes.get('/:q', (req, res) => {
  let { q } = req.params;

  Note.find({ 
    $or : [ 
      {title : { $regex: '.*' + q + '.*' }},
      {content  : { $regex: '.*' + q + '.*' }},
    ]
  }).exec((err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

notes.get('/', (req, res) => {
  Note.find({}).exec((err, docs) => {
    if (err) throw err;
    res.json(docs);
  });
});

notes.put('/:id', (req, res) => {
  Note.updateOne({ _id: req.params.id },
    req.body,
    {}, 
    (err, raw) => {
      if (err) throw err;
      
      Note.findById(req.params.id, (err, updatedDoc) => {
        if (err) throw err;
        res.json(updatedDoc);
      });
    });
});

notes.delete('/:id', (req, res) => {
  Note.remove({ _id: req.params.id}, (err, result) => {
        if (err) throw err;
        res.send();
      });
});

export default notes;