import {Router} from 'express';
import note from './note';

let api = new Router();

api.use('/note', note);

export default api;

