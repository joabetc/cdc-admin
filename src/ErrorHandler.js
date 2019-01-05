export default class ErrorHandler {
  publishErrors(errors) {
    for (var i = 0; i < errors.errors.length; i++) {
      var erro = errors.errors[i];
      console.log(erro);
    }
  }
}