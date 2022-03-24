export interface IBook { // Todo: add picture, status ("as new", "used", etc.)
  id: string;
  price: number;
  users_permissions_user: IUser;
  library: ILibrary;
  reservations: IReservations[];
  is_available: boolean;
  comment: string;
  state: "asNew" | "fine" | "veryGood" | "good" | "fair" | "poor" | "bindingCopy";
  img_url: string;
}
export interface ILibrary {
  id: string;
  title: string;
  library: ILibrary;
  course: ICourse;
  books: IBooks[];
  isdn: string;
  author: string;
  school_year_id: string;
}
export interface ICourse{
  id: string;
  title: string;
  school_year: ISchoolYear;
  libraries: ILibraries[];
}
export interface ISchoolYear {
  id: string;
  title: string;
  courses: ICourses[];
}
export interface ISchoolYearContext {
  schoolYearContext: ISchoolYear;
  changeSchoolYearContext: (name: ISchoolYear) => void;
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
  books: {
    data: {
      id: string;
      attributes: IBook;
    };
  };
  school_years: {
    data: {
      id: string;
      attributes: ISchoolYear;
    };
  };
  latitude: string;
  longitude: string;
  reservations: {
    data: {
      id: string;
      attributes: IReservation;
    };
  };
}
export interface IReservation {
  id: string;
  book: IBook;
  users_permissions_user: IUser;
  status: "interested" | "proposed" | "confirmed" | "rejected";
  comment: string;
}
export interface IReservationNormalized {
  id: string;
  book: IBook;
  users_permissions_user: IUser;
  status: "interested" | "proposed" | "confirmed" | "rejected";
  comment: string;
}
export interface IBookFilterVariables {
  my_books_only: boolean;
  is_available: boolean;
  minprice: number;
  maxprice: number;
}
export interface ILibraryFilterVariables {
  course: ICourse;
  school_year: ISchoolYear;
}
export interface IId {
  id: string;
}