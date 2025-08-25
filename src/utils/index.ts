export const formatError = (message: string, status:number = 400) =>{
    return {
      statusCode: status,
      error: 'Bad Request',
      message,
    };
  }