export interface IBook {
  id: string;
  price: number;
  users_permissions_user: IUser;
  library: ILibrary;
  is_available: boolean;
}
export interface ICourse{
  id: string;
  title: string;
  school_year: ISchoolYear;
  libraries: {//ILibrary[];
    data: {
      id: string;
      attributes: ILibrary;
    };
  };
}
export interface ILibrary {
  id: string;
  title: string;
  course: ICourse;
  books: IBook[];
  isdn: string;
  author: string;
}
export interface ISchoolYear {
  id: string;
  title: string;
}
export interface IParent {
  id: string;
  username: string;
  email: string;
}
