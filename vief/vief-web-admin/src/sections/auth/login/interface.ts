export type IAuth =  {
    email:string;
    password:string;
}

export type ILoginCallback = {
    onSuccess: VoidFunction;
    onError: VoidFunction;
  };