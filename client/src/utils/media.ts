export const checkSpeaker = (stream: MediaStream) => {
    if (stream.getAudioTracks().length > 0) {
        console.log(stream.getAudioTracks())
        return true
    }
    return false
}