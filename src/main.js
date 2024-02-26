// Import the necessary Camera Kit modules.
import {
    bootstrapCameraKit,
    createMediaStreamSource,
    Transform2D,
  } from '@snap/camera-kit';
  
  // Create an async function to initialize Camera Kit and start the video stream.
  (async function() {
    // Bootstrap Camera Kit using your API token.
    const cameraKit = await bootstrapCameraKit({
      apiToken: 'eyJhbGciOiJIUzI1NiIsImtpZCI6IkNhbnZhc1MyU0hNQUNQcm9kIiwidHlwIjoiSldUIn0.eyJhdWQiOiJjYW52YXMtY2FudmFzYXBpIiwiaXNzIjoiY2FudmFzLXMyc3Rva2VuIiwibmJmIjoxNzA3MzMzMTAzLCJzdWIiOiJhZjhiMzcyNS0xZmQwLTQxMTUtYWY5Zi0wNTc0MGI2ZTAwY2N-U1RBR0lOR35jNTMxMzA5OC01NTdjLTQ1N2UtYjQ0Mi0zMmYxOGY1ZjM0YmEifQ.GhvD7ay5uIwOGg0yDltIw8_YNe-mA4O9Xh2GTrzbzc4'
    });
  
    // Create a new CameraKit session.
    const session = await cameraKit.createSession();
  
    // Replace the `canvas` element with the live output from the CameraKit session.
    document.getElementById('canvas').replaceWith(session.output.live);
  
    // Load the specified lens group.
    const { lenses } = await cameraKit.lensRepository.loadLensGroups(['c05c984c-5703-47ad-972f-ac97075f6996'])
  
    // Apply the first lens in the lens group to the CameraKit session.
    session.applyLens(lenses[0]);
  
    // Get the user's media stream.
    let mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
  
    // Create a CameraKit media stream source from the user's media stream.
    const source = createMediaStreamSource(mediaStream, {
        transform: Transform2D.MirrorX,
        cameraType: 'front'
    });
  
    // Set the source of the CameraKit session.
    await session.setSource(source);
  
    // Set the render size of the CameraKit session to the size of the browser window.
    session.source.setRenderSize( window.innerWidth,  window.innerHeight);
  
    // Start the CameraKit session.
    session.play();
  })();
  