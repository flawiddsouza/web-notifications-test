const publicVapidKey = 'BDI9IkI1bHYUHfLWrIeVMW_98ej0aeM8XMgBoOC-1xR7_WNbknKLqqhLtAnyXxXlmx4i6vMaRXdyC14gD8DIZFs'

if('serviceWorker' in navigator) {
    registerServiceWorker().catch(console.log)
}

async function registerServiceWorker() {
    const register = await navigator.serviceWorker.register('./worker.js', {
        scope: '/'
    })

    await navigator.serviceWorker.ready

    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: publicVapidKey
    })

    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'Content-Type': 'application/json'
        }
    })
}
