export type MailPayload = {
  to: string;
  subject: string;
  text: string;
};

export interface MailProvider {
  send(payload: MailPayload): Promise<void>;
}

class ConsoleMailProvider implements MailProvider {
  async send(payload: MailPayload) {
    console.log("[MAIL_STUB]", payload);
  }
}

export const mailProvider: MailProvider = new ConsoleMailProvider();
