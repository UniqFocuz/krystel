export function copyToClipboard(text, toast, prompt) {
    navigator.clipboard.writeText(text)
      .then(() => {
            toast({
                title: `${prompt} copied to Clipboard!`,
                variant: 'subtle',
                status: 'info',
            })
      })
}

export function getTimeDifferenceFromNow(timestamp) {
    const currentTime = new Date();
    const givenTime = new Date(timestamp);
  
    const timeDifferenceInMilliseconds = currentTime - givenTime;
    const timeDifferenceInMinutes = Math.floor(timeDifferenceInMilliseconds / (1000 * 60));
  
    if (timeDifferenceInMinutes >= (60*24*28)) {
        const timeDifferenceInMonths = Math.floor(timeDifferenceInMinutes / (60*24*28));
        return `${timeDifferenceInMonths} months ago`;
    } else if (timeDifferenceInMinutes >= (60*24)) {
        const timeDifferenceInDays = Math.floor(timeDifferenceInMinutes / (60*24));
        return `${timeDifferenceInDays} days ago`;
    } else if (timeDifferenceInMinutes >= 60) {
        const timeDifferenceInHours = Math.floor(timeDifferenceInMinutes / 60);
        return `${timeDifferenceInHours} hrs ago`;
    } else if (timeDifferenceInMinutes < 2) {
      return `Few secs ago`;
    } else{
      return `${timeDifferenceInMinutes} mins ago`;
    }
  }