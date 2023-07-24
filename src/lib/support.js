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

export function krystelValuer(value){
  if(value < 100000){
    return value.toLocaleString() + " gem6"
  }
  else{
    return (value/1000000).toFixed(6).toLocaleString() + " KTL"
  }
}


export function energyValuer(value){
  if(value < 1000){
    return value.toLocaleString() + " kWh"
  }
  else{
    return (value/1000).toFixed(0).toLocaleString() + " mWh"
  }
}
