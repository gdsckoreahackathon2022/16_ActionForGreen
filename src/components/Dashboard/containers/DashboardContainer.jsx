/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Dashboard from "../Dashboard";
import { addSerial, getStat, showInfo } from "components/AxiosAPI/boardAPI";

const DashboardContainer = () => {
  const history = useHistory();
  const [serialList, setSerialList] = useState([""]);
  let serials;
  const [total, setTotal] = useState(0);
  let [usageList, setUsageList] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  let [carbonDataList, setCarbonDataList] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  const editSerial = (idx, serial) =>
    setSerialList(prev => [
      ...prev.slice(0, idx),
      serial,
      ...prev.slice(idx + 1, prev.length)
    ]);
  const pushSerial = () => {
    console.log("pushSerial", serialList);
    // if (serialList.includes(serial)) return;
    setSerialList(prev => [...prev, ""]);
  };
  const deleteSerial = idx => {
    setSerialList(prev => [
      ...prev.slice(0, idx),
      ...prev.slice(idx + 1, prev.length)
    ]);
  };
  const handleSerialSubmit = () => {
    addSerial(serialList);
  };
  const fetchData = async () => {
    serials = await showInfo();
    console.log("serials", serials);
    serials.map(async item => {
      const { type, statData, statCarbon } = await getStat(item);
      console.log("fetchData", type, statData, statCarbon);
      usageList[type] = statData;
      carbonDataList[type] = statCarbon;
      setUsageList(prev => [
        ...prev.slice(0, type),
        statData,
        ...prev.slice(type, prev.length - 1)
      ]);
      setCarbonDataList(prev => [
        ...prev.slice(0, type),
        statCarbon,
        ...prev.slice(type, prev.length - 1)
      ]);
    });
    carbonDataList.map(data => {
      setTotal(prev => (prev += data));
    });
  };
  useEffect(() => {
    if (!window.sessionStorage.getItem("idToken")) {
      history.push("/");
    }
    fetchData();
  }, []);
  return (
    <Dashboard
      yourCarbon={total / 1000}
      serialList={serialList}
      editSerial={editSerial}
      pushSerial={pushSerial}
      deleteSerial={deleteSerial}
      handleSerialSubmit={handleSerialSubmit}
      usageList={usageList}
      carbonDataList={carbonDataList}
    />
  );
};

export default DashboardContainer;
