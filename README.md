# LiveGrid Aura Cam

Streams a Raspberry Pi's camera feed in real time onto a LiveGrid Aura LED panel, turning the panel into a live low-resolution mirror of whatever the camera sees.

## How it works

The Raspberry Pi captures video from its attached camera and displays it in a web browser running on the Pi itself. Inside that browser page, each video frame is scaled down to match the resolution of the LED panel and continuously sent to a small Node.js server, also running on the Pi.

The Node server receives these frames and repackages the pixel data into a stream of small network packets. It then sends those packets over Wi-Fi to the LiveGrid Aura panel, which reads the incoming data and lights up its LEDs to recreate the image, frame by frame. The result is a near-live video feed rendered on the physical LED grid, with a very small delay caused by the capture, processing, and transmission steps.

For everything to work together, the Raspberry Pi and the LED panel need to be on the same Wi-Fi network so the packets can reach the panel. The browser page has to stay open on the Pi to keep capturing and sending frames, and the Node server needs to stay running the whole time to keep relaying that data to the panel. If either one stops, the panel will simply stop updating and hold on its last received frame.
