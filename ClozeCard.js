function ClozeCard (text, cloze) {
    this.fullText = text;
    this.cloze = cloze;
    // Partial should encompase the fullText minus cloze
    this.partial = (this.fullText).replace((this.cloze), "...");

    if (this.fullText.indexOf(this.cloze) == -1) {
        // Must throw an error if does not exist, this is what -1 does
        console.log("Does not exist.")
    }
}

// Allows us to export
module.exports = ClozeCard;