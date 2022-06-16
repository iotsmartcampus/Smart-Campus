import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import { Line, Bar } from "react-chartjs-2";

// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
  Button,
  UncontrolledDropdown,
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.js";

function Dashboard() {

  const [deviceName, setDeviceName] = useState("Desconectado");
  const [samples, setSamples] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [power, setPower] = useState([0,0,0,0,0,0,0,0,0,0]);
  const [lastModification, setLastModification] = useState(new Date().toLocaleString("pt-BR"));
  var powerkW = 0;

  useEffect(() => {
    const socket = socketIOClient('http://localhost:4000/');
    socket.on("Device", data => {
      setSamples(oldArray => [oldArray[14], oldArray[15], oldArray[16], oldArray[17], oldArray[18], oldArray[19], oldArray[20], oldArray[21], oldArray[22], oldArray[23], oldArray[24], oldArray[25], oldArray[26], oldArray[27], oldArray[28], oldArray[29], oldArray[30], oldArray[31], oldArray[32], oldArray[33], oldArray[34], oldArray[35], oldArray[36], oldArray[37], oldArray[38], oldArray[39], oldArray[40], oldArray[41], oldArray[42], oldArray[43], oldArray[44]].concat(data.samples));
      powerkW = ((Math.max.apply(null, data.samples.map(Math.abs)))*220)/1000;
      setPower(oldArray => [oldArray[1], oldArray[2], oldArray[3], oldArray[4], oldArray[5], oldArray[6], oldArray[7], oldArray[8], oldArray[9], powerkW]);
      setDeviceName(data.name);
      setLastModification(new Date(data.lastTime).toLocaleString("pt-BR"));
    });
  }, [samples]);

  const dashboardPanelChartCurrent = {
    data: (canvas) => {
      const ctx = canvas.getContext("2d");
      var chartColor = "#FFFFFF";
      var gradientStroke = ctx.createLinearGradient(500, 0, 100, 0);
      gradientStroke.addColorStop(0, "#80b6f4");
      gradientStroke.addColorStop(1, chartColor);
      var gradientFill = ctx.createLinearGradient(0, 200, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, "rgba(255, 255, 255, 0.14)");
  
      return {
        labels: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        datasets: [
          {
            label: "mA",
            borderColor: chartColor,
            pointBorderColor: chartColor,
            pointBackgroundColor: "#2c2c2c",
            pointHoverBackgroundColor: "#2c2c2c",
            pointHoverBorderColor: chartColor,
            pointBorderWidth: 1,
            pointHoverRadius: 7,
            pointHoverBorderWidth: 2,
            pointRadius: 3,
            fill: true,
            backgroundColor: gradientFill,
            borderWidth: 2,
            tension: 0.4,
            data: samples,
          },
        ],
      };
    },
    options: {
      layout: {
        padding: {
          left: 20,
          right: 20,
          top: 0,
          bottom: 0,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltips: {
          backgroundColor: "#fff",
          titleFontColor: "#333",
          bodyFontColor: "#666",
          bodySpacing: 4,
          xPadding: 12,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
        },
      },
      maintainAspectRatio: false,
      scales: {
        y: {
          ticks: {
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
            beginAtZero: true,
            maxTicksLimit: 5,
            padding: 10,
          },
          grid: {
            drawTicks: true,
            drawBorder: false,
            display: true,
            color: "rgba(255,255,255,0.1)",
            zeroLineColor: "transparent",
          },
        },
        x: {
          grid: {
            display: false,
            color: "rgba(255,255,255,0.1)",
          },
          ticks: {
            padding: 10,
            fontColor: "rgba(255,255,255,0.4)",
            fontStyle: "bold",
          },
        },
      },
    },
  };  

  const chartpower = {
    data: (canvas) => {
      var ctx = canvas.getContext("2d");
      var gradientFill = ctx.createLinearGradient(0, 170, 0, 50);
      gradientFill.addColorStop(0, "rgba(128, 182, 244, 0)");
      gradientFill.addColorStop(1, "rgba(16, 66, 72, 0.8)");
      return {
        labels: [
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
          "",
        ],
        datasets: [
          {
            label: "Potência (kW)",
            backgroundColor: gradientFill,
            borderColor: "#104248",
            pointBorderColor: "#FFF",
            pointBackgroundColor: "#104248",
            pointBorderWidth: 2,
            pointHoverRadius: 4,
            pointHoverBorderWidth: 1,
            pointRadius: 4,
            fill: true,
            borderWidth: 1,
            data: power,
          },
        ],
      };
    },
    options: {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
        tooltips: {
          bodySpacing: 4,
          mode: "nearest",
          intersect: 0,
          position: "nearest",
          xPadding: 10,
          yPadding: 10,
          caretPadding: 10,
        },
      },
      responsive: 1,
      scales: {
        y: {
          ticks: {
            maxTicksLimit: 7,
          },
          grid: {
            zeroLineColor: "transparent",
            drawBorder: false,
          },
        },
        x: {
          display: 0,
          ticks: {
            display: false,
          },
          grid: {
            zeroLineColor: "transparent",
            drawTicks: false,
            display: false,
            drawBorder: false,
          },
        },
      },
      layout: {
        padding: { left: 0, right: 0, top: 15, bottom: 15 },
      },
    },
  };  

  const fullRefresh = () => {
    window.location.href = window.location.href;
  }

  return (
    <>
      <div className="space">
        <Row>
          <Col xs={12} md={12}>
            <Card className="card-chart">
              <CardHeader>
                <CardTitle tag="h5">Dados do dispositivo</CardTitle>
                <hr />
                <UncontrolledDropdown>
                  <Button
                    onClick={() => fullRefresh()}
                    className="btn-round btn-outline-default btn-icon"
                    color="default"
                  >
                    <i className="now-ui-icons loader_refresh" />
                  </Button>
                </UncontrolledDropdown>
              </CardHeader>
              <CardBody className="cardBody">
                <Row>
                  <Col md={2} className="d-flex flex-column justify-content-center align-items-center">
                    <img className="iconDevice" src={require("assets/imgDevices/"+deviceName+".png").default} />
                  </Col>
                  <Col md={5} className="d-flex flex-column justify-content-center align-items-center">
                    <ul className="listData">
                      <li className="xLarge"><strong>Nome:</strong> {deviceName}</li>
                      <li><strong>Última Atualização:</strong> {lastModification}</li>
                      <br />
                      <li className="small"><strong>ID do sensor:</strong> 001001007</li>
                      <li className="small"><strong>Localização:</strong> Sala 1 Bloco 4</li>
                    </ul>
                  </Col>
                  <Col md={5}>
                      <Bar
                        className="chartPower"
                        data={chartpower.data}
                        options={chartpower.options}
                      />
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <div className="stats">
                  <i className="now-ui-icons loader_refresh spin" /> 
                  Recebendo dados
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
      <PanelHeader
        size="lg"
        content={
          <Line
            data={dashboardPanelChartCurrent.data}
            options={dashboardPanelChartCurrent.options}
          />
        }
      />
    </>
  );
}

export default Dashboard;
