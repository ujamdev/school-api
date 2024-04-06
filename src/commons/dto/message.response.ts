export class MessageResponse {
  message: string;

  static of(message: string): MessageResponse {
    const response = new MessageResponse();
    response.message = message;

    return response;
  }
}
