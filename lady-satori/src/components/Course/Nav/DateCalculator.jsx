const date = (date) => {
  const isoDateNow = new Date().toISOString();
  const dateNow = new Date(isoDateNow).getTime();

  //handle up to 59 seconds
  if ((dateNow - new Date(date).getTime()) / 1000 < 60) {
    return Math.floor((dateNow - new Date(date).getTime()) / 1000) + ' segundos atrás';
  }
  //handle 1 minute
  else if (Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60)) === 1) {
    return '1 minuto atrás';
  }
  //handle up to 59 minutes
  else if ((dateNow - new Date(date).getTime()) / (1000 * 60 * 60) < 1) {
    return Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60)) + ' minutos atrás';
  } //handle 1 hour
  else if (Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60 * 60)) === 1) {
    return '1 hora atrás';
  }
  //handle up to 23 hours
  else if ((dateNow - new Date(date).getTime()) / (1000 * 60 * 60) < 24) {
    return Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60 * 60)) + ' horas atrás';
  }
  //handle 1 day
  else if (Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60 * 60 * 24)) === 1) {
    return '1 dia atrás';
  }
  //handle up to 30 days
  else if (Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60 * 60 * 24)) < 30) {
    return Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60 * 60 * 24)) + ' dias atrás';
  }
  //handle 1 month
  else if (Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 30)) === 1) {
    return '1 mês atrás';
  }
  //handle up to 12 months
  else if (Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 365)) < 1) {
    return Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 30)) + ' meses atrás';
  }
  //handle 1 year
  else if (Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 365)) === 1) {
    return '1 ano atrás';
  }
  //handle more than 1 year
  else {
    return Math.floor((dateNow - new Date(date).getTime()) / (1000 * 60 * 60 * 24 * 365)) + ' anos atrás';
  }
};

export default date;
