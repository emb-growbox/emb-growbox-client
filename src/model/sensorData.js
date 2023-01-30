class SensorData {
  constructor(data) {
    this.date = new Date(data.date * 1000);
    this.date.setHours(this.date.getHours()-1);
    this.temperature = data.temperature;
    this.humidity = data.humidity;
    this.soilMoisture = data.soilMoisture ? data.soilMoisture : 0;
    this.lightPower = data.lightPower;
    this.irrigation = data.irrigation === 1 ? true : false;
    this.waterTank = data.waterTank;
  }
}

export default SensorData;
