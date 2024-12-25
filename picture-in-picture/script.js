const videoElement = document.getElementById('video');
const button = document.getElementById('button');

// Show the selectable media stream, introduce it to video element, then reproduce.
async function selectMediaStream() {
    try {
        /* `const mediaStream = await navigator.mediaDevices.getDisplayMedia()` is a line of code in
        JavaScript that is using the `getDisplayMedia()` method from the `navigator.mediaDevices`
        object to prompt the user to select a media stream (such as a screen or window) to share. */
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        /* `videoElement.srcObject = mediaStream;` is setting the `srcObject` property of the
        `videoElement` to the `mediaStream` that was obtained from the
        `navigator.mediaDevices.getDisplayMedia()` method. This line of code is essentially
        assigning the selected media stream (such as a screen or window) to the video element,
        allowing the video element to display and play the content of the media stream. */
        videoElement.srcObject = mediaStream;
        /* The code `videoElement.onloadedmetadata = () => { videoElement.play() }` is setting an event
        handler for the `onloadedmetadata` event of the `videoElement`. */
        /* The code `videoElement.onloadedmetadata = () => { videoElement.play() }` is setting an event
        handler for the `onloadedmetadata` event of the `videoElement`. This event is triggered when
        the metadata for the video element (such as duration and dimensions) is loaded. When this
        event occurs, the arrow function `() => { videoElement.play() }` is executed, which calls
        the `play()` method on the video element. This effectively starts playing the video content
        once the metadata has been loaded. */
        videoElement.onloadedmetadata = () => {
            /* The `videoElement.play()` method is used to start playing the video content that is
            loaded in the video element. When this method is called on a video element, it initiates
            the playback of the video content that is associated with the element. In the provided
            code snippet, `videoElement.play()` is called within the event handler for the
            `onloadedmetadata` event, which ensures that the video playback begins once the metadata
            for the video element has been loaded. */
            videoElement.play()
        }
    } catch (error) {
        console.log("Woops, error here: ", error)
    }
}

button.addEventListener("click", async () => {
    // Disable button
    button.disabled = true;
    // Start Picture in Picture
    await videoElement.requestPictureInPicture();
    // Reset button
    button.disabled = false;
})

// On Load
selectMediaStream()