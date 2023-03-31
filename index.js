require('dotenv').config()
const { request, response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')


app.use(morgan(':method :url :status :res[content-length] - :response-time ms :param'))
app.use(cors())
app.use(express.static('build'))
app.use(express.json())

morgan.token('param', function(req, res, param) {
  return JSON.stringify(req.body);
});


const errorHandler = (error, req, res, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  }

  next(error)
}

const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint'})
}



/*let persons = [
    {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 1
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 2
      },
      {
        "name": "sdf",
        "number": "22",
        "id": 3
      }
]*/

app.get('/info', (req, res) => {
    res.send(`<div>The phonebook has info for people</div>
    <div>Tähän pyyntöaika</div>`)
})

app.get('/api/persons', (req, res) => {
  Person.find({}).then(persons =>{
    res.json(persons)
  })
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
  .then(person => {
    if (person) {
      res.json(person)
    } else {
      res.status(404).end()
    }
  })
  .catch(error => next(error))
})

/app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  
  if (body.name === undefined) {
    return res.status(400).json({
      error: 'nimi puuttuu'
    })
  }

  if (body.number === undefined) {
    return res.status(400).json({
      error: 'numero puuttuu'
    })
  }

  /*if (findSameName(body.name)) {
    return res.status(400).json({
      error: 'nimi on jo luettelossa'
    })
  }*/
  
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  
  person.save().then(savedPerson => {
    res.json(savedPerson)
  })

})

/*const findSameName = (tarkistettava) => {
  if (persons.find(person => person.name === tarkistettava)) {
    return true
  }
  return false
}*/

app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})