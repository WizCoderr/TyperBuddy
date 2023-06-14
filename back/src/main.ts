import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'

dotenv.config()

const port = process.env.EXPRESS_PORT || 3001
const host = process.env.ATLAS_URI;

const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// app.use((req, res, next) => {
//     if (!isMongoConnected) {
//         res.status(400).send("Database connection error")
//     } else {
//         next()
//     }
// })





// app.post('/admin/*', async (req, res, next) => {
//     if (!isMongoConnected) {
//         res.status(400).send("Database connection error")
//     } else {
//         try {
//             let adminId = req.body.adminId
//             if (await isAdmin(adminId)) {
//                 next()
//             } else {
//                 res.status(403).send("You don't have access")
//             }

//         } catch (error) {
//             res.status(400).send(error)
//         }
//     }
// })

// app.put('/admin/*', async (req, res, next) => {
//     if (!isMongoConnected) {
//         res.status(400).send("Database connection error")
//     } else {
//         try {
//             let adminId = req.body.adminId
//             if (await isAdmin(adminId)) {
//                 next()
//             } else {
//                 res.status(403).send("You don't have access")
//             }

//         } catch (error) {
//             res.status(400).send(error)
//         }
//     }
// })



app.get('/', function (req, res) {
    res.send('Hello welcome back')
})






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})