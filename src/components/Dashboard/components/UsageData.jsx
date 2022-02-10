import React from "react";
import arrowForward from "assets/arrow-forward.svg";
import car from "assets/car.svg";
import data from "assets/data.svg";
import hotTub from "assets/hot-tub.svg";
import powerPlug from "assets/power-plug.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFaucet,
  faTrash,
  faDumpster
} from "@fortawesome/free-solid-svg-icons";

// eslint-disable-next-line react/prop-types
const UsageData = ({ kindOfUsage, usedAmount, carbonEmit }) => {
  const iconSetter = () => {
    switch (kindOfUsage) {
      case 1:
        return (
          <div className="main-icon">
            <img src={powerPlug} alt="icon" />
          </div>
        );
      case 2:
        return (
          <div className="main-icon">
            <img src={hotTub} alt="icon" />
          </div>
        );
      case 3:
        return (
          <div className="main-icon">
            <img src={car} alt="icon" />
          </div>
        );
      case 4:
        return (
          <div className="main-icon">
            <img src={data} alt="icon" />
          </div>
        );
      case 5:
        return (
          <div className="main-icon">
            <FontAwesomeIcon icon={faDumpster} size="2x" />
          </div>
        );
      case 6:
        return (
          <div className="main-icon">
            <FontAwesomeIcon icon={faTrash} size="2x" />
          </div>
        );
      case 7:
        return (
          <div className="main-icon">
            <FontAwesomeIcon icon={faFaucet} size="2x" />
          </div>
        );
      default:
        break;
    }
  };
  const titleSetter = () => {
    switch (kindOfUsage) {
      case 1:
        return "전력 사용량";
      case 2:
        return "도시가스 사용량";
      case 3:
        return "자가용 사용량";
      case 4:
        return "데이터 사용량";
      case 5:
        return "일회용품 사용량";
      case 6:
        return "음식물 배출량";
      case 7:
        return "수도 사용량";
      default:
        break;
    }
  };
  const usageFormatter = () => {
    switch (kindOfUsage) {
      case 1:
        return usedAmount + " kw";
      case 2:
        return `${
          usedAmount > 60 ? Math.floor(usedAmount / 60) + "시간 " : ""
        }${usedAmount % 60}분`;
      case 3:
        return usedAmount + " km";
      case 4:
        return `${
          usedAmount > 1024 ? Math.floor(usedAmount / 1024) + "GB " : ""
        }${usedAmount % 60}MB`;
      case 5:
        return usedAmount + " g";
      case 6:
        return usedAmount + " kg";
      case 7:
        return usedAmount + " L";
      default:
        break;
    }
  };
  return (
    <div className="usage">
      {iconSetter()}
      <span className="usage-title">{titleSetter()}</span>
      <div className="usage-detail">{usageFormatter()}</div>
      <div className="arrow-container">
        <img src={arrowForward} alt="forward arrow" />
      </div>
      <div className="usage-detail">{carbonEmit / 1000 + " kg"}</div>
    </div>
  );
};

export default UsageData;
