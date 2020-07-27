import express from 'express'
import expressSession from 'express-session'
import dotenv from 'dotenv'
import { generate, verify } from './lib/password'
import bodyParser from 'body-parser'

const app: express.Application = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
dotenv.config({ path: './.env' })

app.use(expressSession({
  secret: process.env.SESSION_SECRET
}))

app.get('/new-password', function (req, res) {
  const { hint, password } = generate()
  req.session.iag = {
    [hint]: password
  }
  req.session.hint = hint
  res.send({ hint });
});

app.post('/verify-password', function (req, res) {
  if (!req.session.iag[req.body.hint]) {
    res.send({
      status: 404
    })
  }
  const { highlight, correct } = verify(req.body.attempt, req.session.iag[req.body.hint])
  res.send({
    attempt: req.body.attempt,
    highlight,
    correct,
    status: 200
  });
});

let server = app.listen(5000, function () {
  console.log('Example app listening on port 5000!');
});

module.exports = server