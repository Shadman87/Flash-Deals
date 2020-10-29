import React from 'react'; 

class Countdown extends React.Component {
  state = {
    days: undefined, 
    hours: undefined, 
    minutes: undefined, 
    seconds: undefined, 
  }; 
  
  componentDidMount() {
    this.interval = setInterval(() => {
      const date = this.props.date; 
      const time = this.props.time;
      const countDownDate = new Date(date + " " + time).getTime();
      var now = new Date().getTime();

      // Find the distance between now and the count down date
      const distance = countDownDate - now;
      if(distance < 1) {
        clearInterval(this.interval);
      }
    
      // Time calculations for days, hours, minutes and seconds
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
     

      this.setState({ days, hours, minutes, seconds }); 
    }, 1000); 
  }

  componentWillUnmount() {
    if(this.interval) {
      clearInterval(this.interval); 
    }
  }

  render() {
    const { days, hours, minutes, seconds } = this.state; 
    if(minutes > 0 && seconds > 0) {
      return (
        <div>
          <div className="countdown-wrapper">
            <div className="countdown-item">
              { }
              {days} : {hours} : {minutes} : {seconds}
            </div>
            
          </div>
        </div>
      ); 
    }
    else {
      return (
        <div>Time Up</div>
      )
    }
  }
}

export default Countdown; 