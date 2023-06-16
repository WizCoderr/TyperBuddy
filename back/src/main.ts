import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import { sendMail } from './EmailManger.js'
import { AccountData, MailData, PendingAccountData } from './DataType.js'
import MongoAPI from './Mongo.js'
import { generateId, generateOTP, getEmailVerifyHtml } from './Utils.js'

dotenv.config()

const port = process.env.EXPRESS_PORT || 3001
const atlas = process.env.ATLAS_URI || '';
const mailerEmail = process.env.NODE_MAILER_EMAIL || ''


const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const mongoApi = new MongoAPI()
let isMongoConnected = await mongoApi.connectMongoose(atlas)


// --------------------- middleware ---------------------------

app.use((req, res, next) => {
    if (!isMongoConnected) {
        res.status(503).send("Database connection error")
    } else {
        next()
    }
})

// serve static content
app.use('/public', express.static('public'));





// ---------------------- account handling------------------------
app.post('/sign-in', async (req, res) => {
    let email = req.body.email as string
    let password = req.body.password as string

    let account = await mongoApi.getAccount(email)
    if (account != null) {
        if (account.email != email) {
            res.status(400).send('No account exist with this email!')
        } else if (account.email == email && account.password != password) {
            res.status(400).send('Wrong password!')
        } else {
            res.status(200).send({ token: account._id })
        }
    } else {
        res.status(400).send('Something went wrong!')
    }
})



// only work with sign in with email

let pendingReg = Array<PendingAccountData>()

app.post('/sign-up', async (req, res) => {
    let firstName = req.body.first as string
    let lastName = req.body.last as string
    let email = req.body.email as string
    let password = req.body.password as string

    const newAccount: PendingAccountData = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        otp: generateOTP()
    }

    // check if pending reg already have email in list then remove the previous and add new
    for (let index = 0; index < pendingReg.length; index++) {
        if (email == pendingReg[index].email) {

            pendingReg = pendingReg.splice(index, 1)  // remove
            pendingReg.push(newAccount)
            break
        }
    }

    // sending mail
    let status = await sendMail({
        from: mailerEmail,
        to: email,
        subject: 'Verify your account',
        html: getEmailVerifyHtml(newAccount.otp)
    })


    // check mail status
    if(status == 'accepted' || status == 'pending'){
        res.status(200).json({ email: email })
    }else{
        res.status(400).send('Unable to create your account at this moment, please try again later')
    }

})


app.post('/verify-signup', (req, res) => {
    const email = req.body.email as string
    const otp = req.body.otp as string

    for (let index = 0; index < pendingReg.length; index++) {

        let reg = pendingReg[index]
        if (reg.email == email && reg.otp == otp) {
            
        }

    }
})

app.post('/forgot', async (req, res) => {


})

app.post('/forgot-otp', async (req, res) => {


})





// ------------------------- statistics -----------------------

app.post('/statistics', async (req, res) => {


})



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

app.get('/', async function (req, res) {

    res.send('Hello welcome back')
})

app.get('/mail', async function (req, res) {
    let mailData: MailData = {
        from: 'niteshdev547@gmail.com',
        to: 'mangoisbest0002@gmail.com',
        subject: 'This is test mail',
        html: '<h1>Welcome</h1><p>That was easy!</p>'
    }
    let resp = await sendMail(mailData)
    res.send(resp)
})






app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})