const formatDate = (dateString) => {
  const d = new Date(dateString);
  var h = d.getHours();
  var m = d.getMinutes();
  var s = d.getSeconds();
  const time =  h + ":" + m + ":" + s;
  const date = new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000).toISOString().split('T')[0];

  return `${date} ${time}`;
}

module.exports = {
  formatDate,
};