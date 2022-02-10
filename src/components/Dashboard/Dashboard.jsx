/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import plus from "assets/add.svg";
import minus from "assets/minus.svg";
import update from "assets/update.svg";
import settings from "assets/settings.svg";
import bell from "assets/bell.svg";
import UsageData from "./components/UsageData";
import Checkbox from "@mui/material/Checkbox";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import dew from "assets/dew.jpg";
import "./css/index.css";
import { Link } from "react-router-dom";
import AlertLog from "./components/AlertLog";
import Footer from "components/Footer/Footer";
import ReactApexChart from "react-apexcharts";
import { getAlert } from "components/AxiosAPI/boardAPI";

const chartOption = {
  chart: {
    width: 380,
    type: "pie"
  },
  labels: [
    "전기",
    "도시가스",
    "자동차",
    "데이터",
    "일회용품",
    "음식물",
    "수도"
  ],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 500
        },
        legend: {
          position: "bottom"
        }
      }
    }
  ]
};

const Dashboard = ({
  yourCarbon,
  averageCarbon,
  serialList,
  carbonDataList,
  usageList,
  pushSerial,
  deleteSerial,
  editSerial,
  handleSerialSubmit,
  isLoaded,
  serials
}) => {
  const history = useHistory();
  const [currentMenu, setCurrentMenu] = useState(0);
  const [isSerialDialogOpen, setIsSerialDialogOpen] = useState(false);
  const repeatTree = num => {
    let trees = "";
    for (let i = 0; i < num; ++i) {
      trees += "🌲";
    }
    return trees;
  };
  const openDialog = () => setIsSerialDialogOpen(true);
  const closeDialog = () => setIsSerialDialogOpen(false);

  return (
    <div className="dashboard">
      <div className="app-bar">
        <div className="app-bar-title">App Dashboard</div>
        <div className="buttons">
          <button onClick={() => setCurrentMenu(0)}>사용량 보기</button>
          <button onClick={openDialog}>IoT 시리얼 추가</button>
          <button
            onClick={() => {
              window.sessionStorage.removeItem("tokenId");
              history.push("/");
            }}
          >
            로그아웃
          </button>
        </div>
      </div>
      <Dialog
        open={isSerialDialogOpen}
        onClose={closeDialog}
        scroll="paper"
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>IoT 시리얼 추가</DialogTitle>
        <DialogContent>
          {serialList.map((item, idx) => (
            <div className="input-component" key={idx}>
              <TextField
                id="outlined-name"
                label="IoT 시리얼"
                value={serialList[idx]}
                onChange={e => editSerial(idx, e.target.value)}
              />
              <div className="serial-buttons">
                <div className="plus button" onClick={() => pushSerial()}>
                  <img src={plus} alt="plus icon" />
                </div>
                {serialList.length !== 1 && (
                  <div
                    className="minus button"
                    onClick={e => deleteSerial(idx)}
                  >
                    <img src={minus} alt="minus icon" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSerialSubmit}>제출</Button>
        </DialogActions>
      </Dialog>
      <div
        style={{
          width: "100vw",
          height: 500
        }}
      >
        <img
          src={dew}
          alt="background-image"
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div className="inner">
        {yourCarbon[0] !== "" ? (
          <>
            {currentMenu === 0 && (
              <div className="section">
                <div className="boxes with-border">
                  <div className="main box half-less">
                    {console.log(usageList)}
                    {[...new Array(7)].map((_, idx) => (
                      <UsageData
                        key={idx}
                        kindOfUsage={idx + 1}
                        usedAmount={usageList[idx + 1]}
                        carbonEmit={carbonDataList[idx + 1]}
                      />
                    ))}
                  </div>
                  <div className="boxes column">
                    <div className="chart-box">
                      <ReactApexChart
                        type="pie"
                        options={chartOption}
                        series={[
                          ...carbonDataList.slice(1, carbonDataList.length)
                        ]}
                        width={500}
                      />
                    </div>
                  </div>
                </div>
                <div className="bottom-areas">
                  {" "}
                  <button className="more" onClick={getAlert}>
                    이메일로 더 많은 정보 받기
                  </button>
                </div>
                <Footer />
              </div>
            )}
          </>
        ) : (
          <div className="setting-please box">
            <div className="container">
              <Link to="/settings">
                <div className="cog-icon-container">
                  <img src={settings} alt="settings icon" />
                </div>
              </Link>
              <span className="setting-title">
                현재 등록된 IoT 기기가 없습니다. 등록해 주세요!
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
