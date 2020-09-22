function knexTimeStamp() {
    const d = new Date();
  
    return (
      d.getFullYear().toString() +
      (d.getMonth() + 1).toString().padStart(2, '0') +
      d.getDate().toString().padStart(2, '0') +
      d.getHours().toString().padStart(2, '0') +
      d.getMinutes().toString().padStart(2, '0') +
      d.getSeconds().toString().padStart(2, '0')
    );
  }
  
  module.exports = knexTimeStamp;