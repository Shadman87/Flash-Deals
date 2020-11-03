export default (title, message, subMessage, imageFile, category, date, time) => {
  if(imageFile || title !== '' || message !== '' || subMessage !== '' || category !== '' || date !=='' || time !== '') 
    return true; 
  else {
    if(!imageFile) {
      alert('Image file empty'); 
      return false; 
    } else if(title === '') {
      alert('Title empty');
      return false; 
    }
    else 
      return true; 

  }
  return true;
}