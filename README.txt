Setup
---
npm i


Run
---
node app.js

Go to http://localhost:5001 in your browser and allow notifications

To create / trigger a notification, go to:
http://localhost:5001/create-notification?title=my notification title&body=my notification body

You should now receive a notification.

You'll receive a notification every time you hit that endpoint.

You can also do:
curl http://localhost:5001/create-notification?title=my%20notification%20title&body=my%20notification%20body
to trigger the notification

The only caveat with web notifications is that your browser has to be running in the foreground or background, to be able to receive the notifications.

But whatever notifications you send when the browser is not running, will be delivered, when the browser is opened again.
