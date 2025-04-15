export class VoiceRecognitionService {
    constructor() {
        this.recognition = null;
        this.isListening = false;
        this.onResult = null;
        this.onError = null;
        this.setupRecognition();
    }

    setupRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const result = event.results[0][0].transcript.toLowerCase().trim();
                if (this.onResult) {
                    this.onResult(result);
                }
            };

            this.recognition.onerror = (event) => {
                if (this.onError) {
                    this.onError(event.error);
                }
            };

            this.recognition.onend = () => {
                this.isListening = false;
            };
        } else {
            console.error('Speech recognition not supported in this browser');
        }
    }

    initialize(onResult, onError) {
        this.onResult = onResult;
        this.onError = onError;
    }

    startListening() {
        if (!this.recognition) {
            console.error('Speech recognition not available');
            return;
        }

        if (!this.isListening) {
            this.isListening = true;
            this.recognition.start();
        }
    }

    stopListening() {
        if (this.recognition && this.isListening) {
            this.recognition.stop();
            this.isListening = false;
        }
    }
} 