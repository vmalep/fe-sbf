export interface IBook { // Todo: add picture, status ("as new", "used", etc.)
  id: string;
  price: number;
  users_permissions_user: {
    data: {
      id: string;
      attributes: IUser;
    };
  };
  library: {
    data: {
      id: string;
      attributes: ILibrary;
    };
  };
  is_available: boolean;
}
export interface ILibrary {
  id: string;
  title: string;
  course: {
    data: {
      id: string;
      attributes: ICourse;
    };
  };
  books: {
    data: {
      id: string;
      attributes: IBook;
    };
  };
  isdn: string;
  author: string;
}
export interface ICourse{
  id: string;
  title: string;
  school_year: {
    data: {
      id: string;
      attributes: ISchoolYear;
    };
  };
  libraries: {
    data: {
      id: string;
      attributes: ILibrary;
    };
  };
}
export interface ISchoolYear {
  id: string;
  title: string;
}
export interface IParent { // To be removed
  id: string;
  title: string;
  username: string;
  email: string;
}
export interface IUser { // Todo: add geo location
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
  provider: string;
  role: {
    data: {
      attributes: {
        type: string;
      };
    };
  };
}
export interface IBookFilterVariables {
  q: string;
  school_year_id: string;
  is_available: boolean;
  minprice: number;
  maxprice: number;
  //createdAt: [Dayjs, Dayjs];
}