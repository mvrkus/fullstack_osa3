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
      }
]



app.get('/api/persons', (req, res) => {
  res.json(persons)
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})