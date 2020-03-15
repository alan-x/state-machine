class Task {
    constructor({state, task, next}) {
        this.state = state
        this.task = task
        this.next = next
    }

    run(payload) {
        if (typeof this.task === "function") {
            return this.task(payload)
        } else {
            return this.task
        }
    }
}

class StateMachine {
    stateMap = {}
    name = Date.now()

    constructor(stateMap, name) {
        this.name = name
        this.stateMap = {...this.stateMap, ...stateMap}
        Object.keys(this.stateMap).forEach(state => {
            this.stateMap[state] = new Task({
                state,
                ...this.stateMap[state]
            })
        })
    }

    /**
     *
     * @param {string} state
     * @param {*} [payload]
     */
    run(state, payload) {
        if (!state) {
            return;
        }
        if (!this.stateMap.hasOwnProperty(state)) {
            throw new Error(`not found this state: ${state}`)
        }
        const task = this.stateMap[state]
        const nextPayload = task.run(payload)
        if (!nextPayload) {
            return
        }
        if (nextPayload.hasOwnProperty('then')) {
            nextPayload.then(payload => this.next(task, payload))
                .catch(e => {
                    throw e
                })
        } else {
            this.next(task, nextPayload)
        }
    }

    next(task, nextPayload) {
        if ((typeof task.next) === "string") {
            this.run(task.next, nextPayload)
            return
        }
        if ((typeof task.next) === "function") {
            const nextTaskAction = task.next(nextPayload)
            this.run(nextTaskAction.state, nextTaskAction.payload)
            return
        }
        if ((typeof task.next) === "object") {
            const nextTaskState = task.next[nextPayload]
            this.run(nextTaskState, nextPayload)
        }
    }
}

export default StateMachine;
