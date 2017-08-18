import { Injectable } from "@angular/core";
import { Subject, Observable } from "rxjs";
import { Message } from "./message.model";
import { Thread } from "../thread/thread.model";
import { User } from "../user/user.model";

const initialMessages: Message[] = [];

@Injectable()
export class MessagesService {
    newMessages: Subject<Message> = new Subject<Message>();
    messages: Observable<Message[]>;
    updates: Subject<any> = new Subject<any>();

    /** 
     *
     */
    constructor() {
        this.messages = this.updates
            .scan((messages: Message[],
                   operation: IMessagesOperation) => {
                       return operation(messages);
                   },
                initialMessages)
            .publishReplay(1)
            .refCount();
    }

    addMessage(message: Message): void {
        this.newMessages.next(message);
    }

    messagesForThreadUser(thread: Thread, user: User): Observable<Message>{
        return this.newMessages
            .filter((message:Message) => {
                return (message.thread.id === thread.id) &&
                       (message.author.id !== user.id);
            })
    }
}

interface IMessagesOperation extends Function{
    (messages: Message[]): Message[];
}