const express = require('express')
const webpush = require('web-push')
const path = require('path')
const { readFileSync, writeFileSync } = require('fs')

const app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

const publicVapidKey = 'BDI9IkI1bHYUHfLWrIeVMW_98ej0aeM8XMgBoOC-1xR7_WNbknKLqqhLtAnyXxXlmx4i6vMaRXdyC14gD8DIZFs'
const privateVapidKey = 'NMV8n3hLJaBvnJgniTu-R3VA4WMJICRqar0t4NeY0z4'

webpush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

function fetchSubscriptions() {
    try {
        return JSON.parse(readFileSync('subscriptions.json', 'utf-8'))
    } catch {
        return []
    }
}

function saveSubscriptions(subscriptions) {
    writeFileSync('subscriptions.json', JSON.stringify(subscriptions, null, 4));
}

const subscriptions = fetchSubscriptions()

function addSubscription(newSubscription) {
    for(const subscription of subscriptions) {
        if(subscription.endpoint === newSubscription.endpoint) {
            return
        }
    }
    console.log({ newSubscription })
    subscriptions.push(newSubscription)
    saveSubscriptions(subscriptions)
}

app.post('/subscribe', (req, res) => {
    const subscription = req.body
    addSubscription(subscription)
    res.status(201).json({})
})

app.get('/create-notification', (req, res) => {
    if(!req.query.title || !req.query.body) {
        return res.status(400).send('title & body are required query parameters')
    }
    const payload = JSON.stringify({
        title: req.query.title,
        body: req.query.body
    })
    subscriptions.forEach(subscription => {
        webpush.sendNotification(subscription, payload).catch(console.log)
    })

    res.send('Success')
})

const PORT = 5001

app.listen(PORT, () => {
    console.log('Listening at http://localhost:' + PORT)
})
