/* eslint-disable no-console */
import express from 'express';

const app = express();
app.listen(3333, () => console.info('Server running at http://localhost:3333'));
