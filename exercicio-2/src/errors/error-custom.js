class ErrorCustom extends Error {
    constructor({ status, error }) {
      super();
      this.message = JSON.stringify({ status, error });
    }
  }
  
  export { ErrorCustom };