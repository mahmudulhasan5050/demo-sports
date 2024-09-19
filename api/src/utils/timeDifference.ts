import moment from 'moment-timezone';

export const calculateTimeDifference = (date: Date, time: string) =>{
      // Get the current date and time
      const currentTime = moment.tz('Europe/Helsinki');
      console.log('currentTime:', currentTime.format('YYYY-MM-DD HH:mm:ss'));
  
      // Get the start time of the booking
      const bookingDateTime = moment.tz(
        `${date.toISOString().split('T')[0]} ${time}`,
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
      return timeDifferenceInHours
}