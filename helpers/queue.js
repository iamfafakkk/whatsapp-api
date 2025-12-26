class Queue {
    constructor() {
        this.queue = [];
        this.working = false;
    }

    enqueue(item) {
        this.queue.push(item);
        if (!this.working) {
            this.process();
        }
    }

    async process() {
        if (this.queue.length === 0) {
            this.working = false;
            return;
        }

        this.working = true;
        const item = this.queue.shift();

        try {
            await item();
        } catch (error) {
            console.error("Error processing queue item:", error);
        }

        this.process();
    }
}

module.exports = Queue;
