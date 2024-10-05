import moment from 'moment-timezone';

export const calculateTimeDifference = (date: string, time: string) =>{
      // Get the current date and time
      const currentTime = moment.tz('Europe/Helsinki');
     console.log('currentTime:', currentTime.format('YYYY-MM-DD HH:mm:ss'));
     const parsedDate = moment(date, 'YYYY-MM-DD'); // Parse date as 'YYYY-MM-DD' format

     if (!parsedDate.isValid()) {
         console.error('Invalid date format:', date);
         return false;
     }
      // Get the start time of the booking
      const bookingDateTime = moment.tz(
        `${parsedDate.toISOString().split('T')[0]} ${time}`,
        'YYYY-MM-DD HH:mm',
        'Europe/Helsinki'
      );
      console.log('bookingDateTime:', bookingDateTime.format('YYYY-MM-DD HH:mm:ss'));
      // Calculate the time difference in milliseconds
      const timeDifference = bookingDateTime.diff(currentTime);
      console.log('timeDifference:', timeDifference);
      // Convert milliseconds to hours
      const timeDifferenceInHours = timeDifference / (1000 * 60 * 60);
      console.log('timeDifferenceInHours ', timeDifferenceInHours);
      console.log('---------------------------------------------');
      if(timeDifferenceInHours < 12){
        return true
      }else{
        return false
      }
}