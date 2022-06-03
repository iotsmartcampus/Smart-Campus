const extractDevicesAllowedToShow = (devices) => {
  const disallowedDevices = ["TemperatureSensor", "CurrentSensor", "Camera"];
  disallowedDevices.forEach((item) => {
    devices = devices.filter((device) => device.type !== item);
  });
  return devices;
};

export { extractDevicesAllowedToShow };
