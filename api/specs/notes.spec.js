require('dotenv').config();

import mongoose from 'mongoose';
import Note     from '../../models/Note';

import server   from '../../app';
import chai     from 'chai';
import chaiHttp from 'chai-http';
let should = chai.should();

chai.use(chaiHttp);

describe('Note', () => {
  let seed = [
    { title: 'Title 1', content: 'content 1'},
    { title: 'Title 2', content: 'content 2'},
    { title: 'Title 3', content: 'content 3'},
    { title: 'Title 4', content: 'content 4 aba'},
    { title: 'Title 5', content: 'content 5 abb'},
    { title: 'Title 6', content: 'content 6 abc'},
  ];
  let notes = null;

  before((done) => {
    if (mongoose.connection.readyState == 0) {
      mongoose.connect(process.env.DB_ADDR);
    }

    Note.insertMany(seed, (err, docs) => {
      if (err) throw err;
      notes = docs;
      done();
    });
  });

  after(async () => {
    
    for (let n of notes)
      await Note.remove({ _id: n._id });
    
    mongoose.disconnect();
   
  });

  describe('POST /api/notes', () => {

    let newId = null;

    it('should create a new note', (done) => {
      chai.request(server)
          .post('/api/notes')
          .send({
            title: 'this is some very random title',
            content : 'this is some very random content'
          }).end((err, res) => {
            if (err) throw err;
            res.should.have.status(201);
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            newId = res.body._id;
            done();
          });
    });

    after((done) => {
      Note.remove({ _id : newId }).exec(done);
    });

  });


  describe('DELETE /api/notes', () => {

    let doc = null;

    before((done) => {
      Note.create({ title: 'to be deleted', content: 'this to be deleted' }, (err, _doc) => {
        if (err) throw err;
        doc = _doc;
        done();
      });
    });

    it('should delete a note', (done) => {
      chai.request(server)
          .delete('/api/notes/' + doc._id)
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            done();
          });
    });

    after((done) => {
      if (doc)
        Note.remove({ _id : doc._id }).exec(done);
    });

  });


  describe('PUT /api/notes', () => {

    it('should update a note', (done) => {
       chai.request(server)
          .put('/api/notes/' + notes[0]._id)
          .send({
            title: 'Updated title',
            content : 'Updated content'
          }).end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.have.property('title').eql('Updated title');
            res.body.should.have.property('content').eql('Updated content');
            done();
          });
    });

  });


  describe('GET /api/notes', () => {

    it('should return all notes', (done) => {
      chai.request(server)
          .get('/api/notes')
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(seed.length);
            done();
          });
    });

    it('should return one note containing abc', (done) => {
      chai.request(server)
          .get('/api/notes/ab')
          .end((err, res) => {
            if (err) throw err;
            res.should.have.status(200);
            res.body.should.be.a('array');
            res.body.length.should.be.eql(3);
            done();
          });
    });

  });

})