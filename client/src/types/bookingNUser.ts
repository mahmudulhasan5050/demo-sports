export interface UserCTXType {
    name: string;
    email: string;
    role: string;
  }
  export interface BookingObjCTXType {
    email: string
    date: string;
    facilityName: string;
    time: string;
    duration: number;
    facilityId: string;
    paymentAmount: number;
    isPaid: boolean;
  };