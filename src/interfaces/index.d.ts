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
  comment: string;
  state: "asNew" | "fine" | "veryGood" | "good" | "fair" | "poor" | "bindingCopy";
  img_url: string;
  //school_year_id: string; //To be deleted
  course: {
    data: {
      id: string;
      attributes: ICourse;
    };
  };
  school_year: {
    data: {
      id: string;
      attributes: ISchoolYear;
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
  school_year_id: string;
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
  //school_year_id: string;
}
export interface ISchoolYear {
  id: string;
  title: string;
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
  book: {
    data: {
      id: string;
      attributes: IBook;
    };
  };
  users_permissions_user: {
    data: {
      id: string;
      attributes: IUser;
    };
  };
  status: "proposed" | "confirmed" | "rejected";
  comment: string;
}
export interface IBookFilterVariables {
  q: string;
  is_available: boolean;
  minprice: number;
  maxprice: number;
  //createdAt: [Dayjs, Dayjs];
}