const { request, response } = require('express')
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :param'))
app.use(cors())

morgan.token('param', function(req, res, param) {
  return JSON.stringify(req.body);
});


let persons = [
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
]



app.get('/info', (req, res) => {

    const ytLkm = persons.length
    console.log(persons.length);
    
    const pyyntoAika = new Date()
    console.log(pyyntoAika);
    
    res.send(`<div>The phonebook has info for ${ytLkm} people</div>
    <div> ${pyyntoAika}</div>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)

    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
    res.json(person)
})

/app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)

  res.status(204).end()
})

app.post('/api/persons', (req, res) => {
  const body = req.body
  //console.log(body);

  if (!body.name) {
    return res.status(400).json({
      error: 'nimi puuttuu'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'numero puuttuu'
    })
  }

  if (findSameName(body.name)) {
    return res.status(400).json({
      error: 'nimi on jo luettelossa'
    })
  }
  
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 1000000)
  }
  //console.log(person.id);
  
  persons = persons.concat(person)

  res.json(person)
})

const findSameName = (tarkistettava) => {
  if (persons.find(person => person.name === tarkistettava)) {
    return true
  }
  return false
} 


const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})