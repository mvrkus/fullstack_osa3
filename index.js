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
    const date = new Date()
    
    Person.countDocuments({})
    .then(count => {
      res.send(`<div>The phonebook has info for ${count} people</div>
        <div>${date}</div>`)
    })
    .catch(error => next(error))
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

/app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => {
      res.status(204).end()
    })
    .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body
  
  if (body.name === "") {
    return res.status(400).json({
      error: 'nimi puuttuu'
    })
  }

  if (body.number === "") {
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
  if (tarkistettava === 't') {
    return true
  }
  return false
}*/

app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body
  console.log(body)

  const person = {
    name: body.name,
    number: body.number
  }
  
  if (body.number === "") {
    return res.status(400).json({
      error: 'numero puuttuu'
    })
  }

  Person.findByIdAndUpdate(request.params.id, person, {new: true})
    .then(updatedContact => {
      response.json(updatedContact)
    })
    .catch(error => next(error))
})


app.use(unknownEndpoint)
app.use(errorHandler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})