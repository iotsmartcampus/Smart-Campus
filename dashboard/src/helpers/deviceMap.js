const deviceMap = (deviceType) => {
  switch (deviceType) {
    case "RelayDevice":
      return "Lampadas";
    case "InfraredDevice":
      return "Air-Condicionados";
  }
};

module.exports = {
  deviceMap,
};
