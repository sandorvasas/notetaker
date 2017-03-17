import {Router} from 'express';
import notes from './notes';

let api = new Router();

api.use('/notes', notes);

export default api;

