import { containsObject } from "../utils/objects.js";


export class Subject {
    constructor(event, type, message) {
        this.event = event
        this.type = type
        this.message = message
    }
}

export class EventManager {
    static instance = undefined
    constructor() {
        this.subjects = new Map();
        this.register = (subject, callback) => {
            const reg = this.subjects.get(subject.type) || new Array();
            const new_register = {
                callback: callback,
                message: subject.message,
                event: subject.event,
                type: subject.type
            }
            if (!containsObject(new_register, reg)) {
                reg.push({
                    callback: callback,
                    message: subject.message,
                    event: subject.event,
                    type: subject.type
                })
            }
            
            this.subjects.set(subject.type, reg)
        }
        this.push = async (subjectType) => {
            const subs = this.subjects.get(subjectType)
            for (const reg of subs) {
                setTimeout(async () => {
                    await reg.callback(reg.event, reg.type, reg.message)
                }, 500)
            }
        }
    };
    static getInstance = () => {
        if (!EventManager.instance) {
            EventManager.instance = new EventManager()
        }
        return EventManager.instance
    }
}


