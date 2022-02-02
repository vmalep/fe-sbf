export interface IBook {
  id: string;
  price: number;
  parent: {
    data: {
      id: string;
      attributes: IParent;
    };
  };
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
export interface ISchoolYear {
  id: string;
  title: string;
}
export interface IParent {
  id: string;
  title: string;
  username: string;
  email: string;
}
export interface IUser {
  id: string;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  phone: string;
}