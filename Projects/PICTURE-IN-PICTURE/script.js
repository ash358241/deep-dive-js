const videoElement = document.getElementById('video');
const btn = document.getElementById('button');

//prompt to select media stream, pass to video element, then play
async function selectMediaStream(){
    try{
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        }
    }
    catch(err){
        console.log(err);
    } 
}

btn.addEventListener('click', async () => {
    btn.disabled = true;
    await videoElement.requestPictureInPicture();
    btn.disabled = false;
})


//on load
selectMediaStream();