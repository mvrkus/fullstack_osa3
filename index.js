const { request, response } = require('express')
const express = require('express')
const app = express()

app.use(express.json())

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
        "name": "sdffff",
        "number": "22",
        "id": 3
      },
      {
        "name": "wwwww",
        "number": "asdd",
        "id": 4
      },
      {
        "name": "Enselmi esimerkki",
        "number": "020202",
        "id": 5
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})