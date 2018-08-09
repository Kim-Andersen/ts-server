"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const types_1 = require("./types");
class SendEmailSigninMail {
    constructor(data) {
        this.data = data;
        this.type = types_1.QueueJobType.SendEmailSigninMail;
    }
}
const queueJob = {
    sendEmailSigninMail: SendEmailSigninMail
};
exports.default = queueJob;
//# sourceMappingURL=jobs.js.map