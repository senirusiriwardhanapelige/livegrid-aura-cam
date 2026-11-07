# LiveGrid Aura Cam

Streams a Raspberry Pi's camera feed in real time onto a LiveGrid Aura LED panel, turning the panel into a live low-resolution mirror of whatever the camera sees.

![Node.js](https://img.shields.io/badge/Node.js-Server-green?logo=node.js)
![Raspberry Pi](https://img.shields.io/badge/Hardware-Raspberry%20Pi-red)
![WiFi](https://img.shields.io/badge/Transport-Wi--Fi-blue)

## How it works

The Raspberry Pi captures video from its attached camera and displays it in a web browser running on the Pi itself. Inside that browser page, each video frame is scaled down to match the resolution of the LED panel and continuously sent to a small Node.js server, also running on the Pi.

The Node server receives these frames and repackages the pixel data into a stream of small network packets. It then sends those packets over Wi-Fi to the LiveGrid Aura panel, which reads the incoming data and lights up its LEDs to recreate the image, frame by frame. The result is a near-live video feed rendered on the physical LED grid, with a very small delay caused by the capture, processing, and transmission steps.

For everything to work together, the Raspberry Pi and the LED panel need to be on the same Wi-Fi network so the packets can reach the panel. The browser page has to stay open on the Pi to keep capturing and sending frames, and the Node server needs to stay running the whole time to keep relaying that data to the panel. If either one stops, the panel will simply stop updating and hold on its last received frame.

## Files

- `server.js` — Node.js server that relays pixel data to the panel
- `package.json` — Project dependencies
- `public/` — Browser page that captures and downscales camera frames

## Setup

1. Install Node.js on the Raspberry Pi.
2. Run `npm install` in this folder.
3. Start the server: `node server.js`
4. Open the browser page on the Pi and allow camera access.
5. Make sure the Pi and the LiveGrid Aura panel are on the same Wi-Fi network.

## Links

- [View server code](server.js)
- [View public folder](public/)

> Want to add a demo video or panel photo? Upload an image to this repo, copy its address, and paste it here as `![alt text](image-url)`.
