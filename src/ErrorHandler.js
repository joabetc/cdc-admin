import PubSub from 'pubsub-js';

export default class ErrorHandler {
  publishErrors(errors) {
    for (var i = 0; i < errors.errors.length; i++) {
      var error = errors.errors[i];
      PubSub.publish("validation-error", error);
    }
  }
}