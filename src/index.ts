import express from 'express'
import bodyParser, { json, urlencoded } from 'body-parser'
import { createClient } from 'redis'

const client = createClient({
  password: 'redis',
})

client.on('error', (err) => console.log('Redis Client Error', err))

// await client.connect()

// await client.set('key', 'value')
// const value = await client.get('key')

const app = express()
app.use(json())
app.use(urlencoded({ extended: false }))
app.post('/api', async (req, res) => {
  try {
    const body = req.body
    await client.SET('demo', JSON.stringify(body))
    
    const res = await client.save()
    console.log('save: ', res)
  } catch (err) {
    console.log('err: ', err)
    return res.status(200).json({
      message: 'something error',
    })
  }
  res.status(200).json({
    message: 'ok',
    data: req.body,
  })
})

app.get('/api', async (req, res) => {
  // console.log('data: ', client.get('demo'))
  res.status(200).json({
    message: 'ok',
    data: await client.get('demo'),
  })
})

// client.connect().then(() => {
//   app.listen(3005, () => {
//     console.log('server is listening on 3005')
//   })
// })

