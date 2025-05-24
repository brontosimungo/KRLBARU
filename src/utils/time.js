export function getTrainPosition(stations) {
  const now = new Date();
  const nowSeconds = now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds();

  for (let i = 0; i < stations.length - 1; i++) {
    const dep = toSec(stations[i].departure || stations[i].arrival);
    const arr = toSec(stations[i + 1].arrival || stations[i + 1].departure);

    if (nowSeconds >= dep && nowSeconds <= arr) {
      const ratio = (nowSeconds - dep) / (arr - dep);
      const lat = stations[i].lat + (stations[i + 1].lat - stations[i].lat) * ratio;
      const lng = stations[i].lng + (stations[i + 1].lng - stations[i].lng) * ratio;
      return { lat, lng };
    }
  }
  return null;
}

function toSec(timeStr) {
  if (!timeStr) return 0;
  const [h, m, s] = timeStr.split(':').map(Number);
  return h * 3600 + m * 60 + s;
}
