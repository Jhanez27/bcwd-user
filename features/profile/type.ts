import { Consumer } from "../authentication/types";

export interface ConsumerWithContact extends Consumer {
    phone_number: string;
    type: string;
}