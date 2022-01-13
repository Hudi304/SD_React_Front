import { bindActionCreators } from '@reduxjs/toolkit'
import { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { LoginActions } from '../login/login.actions'
import { Bar, Line } from 'react-chartjs-2'

import './user.scss'
import { UserToolbar } from '../../common-components/components/user-toolbar/user-toolbar-cmp'
import { MenuItem, Select, Typography } from '@material-ui/core'
import { ExpadingMaterialTable } from '../../common-components/components/custom-table/custom-table-component'
import Snackbar from '@mui/material/Snackbar';
import { Stomp } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { Alert } from '@mui/material'
import { ApiUrl } from '../../API/api'
import { computeDatasets, getHoursLabesArray, getLastN_Days, getWeeklyAvarageDataset, normaliseHours, options, splitByDays, splitByHours, userColumns } from './user-page-utils'


function User(props: any): JSX.Element {

  const [oX, setOX] = useState<any>([])
  const [oY, setOY] = useState<any>([])
  const [date, setDate] = useState<any>('')
  const [sensorIds, setSensorIds] = useState<any>([])
  const [state, setState] = useState<any>(null)
  const [openSnackBar, setOpenSnackbar] = useState(false)
  const [snackMessage, setSnackMessage] = useState("")
  const [fullDevices, setFullDevices] = useState<any>([])
  const [sensorDateTable, setSensorDateTable] = useState<any>([])
  const [firstChartData, setFirstChartData] = useState<any>({
    labels: [],
    datasets: []
  })
  const [secondChartData, setSecondChartData] = useState<any>({
    labels: [],
    datasets: []
  })

  const [lastReedings, setLastReedings] = useState<any>({
    labels: [],
    datasets: []
  })

  let socketReedings: any[] = []

  const [firstChartNumberOfDays, setFirstChartNumberOfDays] = useState("7");

  const data = {
    labels: oX,
    datasets: [
      {
        label: 'Total Consumption',
        data: oY,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1
      }
    ]
  }


  function isUsersSensor(sensorId) {
    if (sensorIds.find(sId => sId == sensorId)) {
      return true;
    } else {
      return false;
    }
  }


  function getRPCDataIfNotExists(socketMessage: any) {
    if (props.login.user.rpc?.computeLogs?.length < 2) {
      const userId = props.login.userId
      props.rpc({ method: "computeLogs", params: [userId] })

    } else {
      //TODO add it to the table data

      // console.log("socketMessage : ", socketMessage)
      // if (props.login.userId) {
      //   const userId = props.login.userId

      //   props.rpc({ method: "computeLogs", params: [userId] })
      // }

      isUserSensor(socketMessage)
    }
  }

  function subscribeToNotifications() {
    const websocket = new SockJS(ApiUrl + "/ws-message");
    const stompClient = Stomp.over(websocket);
    stompClient.connect({}, () => {
      stompClient.subscribe('/topic/updateService', function (data) {
        const messageJSON = JSON.parse(data.body)
        // console.log("reading", messageJSON)

        getRPCDataIfNotExists(messageJSON)
        if (isUsersSensor(messageJSON.sensorID)) {
          // console.log("reading", messageJSON)
          if (messageJSON.message == "EXCEEDS") {
            setOpenSnackbar(true)
            setSnackMessage(`Sensor id:${messageJSON.sensorID} exceded max val`)
          }
          if (messageJSON.message == "NORMAL") {
            props.GET_UserPage({ userGuid: props.login?.userId })

          }
        }
      });
    });
    stompClient.debug = (msg) => {
      // console.log(msg);
    };
  }
  //? INITIAL 
  useEffect(() => {
    if (props.login.userId) {
      const userId = props.login.userId
      //? TEMA 1
      props.GET_UserPage({ userGuid: props.login.userId })
      //? TEMA 2
      subscribeToNotifications()
      //? TEMA 3
      props.rpc({ method: "computeLogs", params: [userId] })

      // console.log("🌊 USER PAGE PROPS : ", props)
    }
  }, [])

  //? RPC
  useEffect(() => {
    if (props.login.user.rpc) {
      const rpc = props.login.user.rpc
      if (rpc?.computeLogs) {
        const allLogs = rpc.computeLogs
        const oXarray: any[] = []
        const oYarray: any[] = []
        allLogs.forEach((log) => {
          oXarray.push(log.date.slice(0, 3))
          oYarray.push(log.value)

        });
        setOX(oXarray.slice(0, 7))
        setOY(oYarray.slice(0, 7))

        getConsumptionOvertDays(7)
      }
    }
  }, [props.login.user.rpc])


  useEffect(() => {
    if (props.login.user.full_devices.length > 0) {
      const full_devices = props.login.user.full_devices
      // console.log("FULL DEVICES ", full_devices)
      setFullDevices(full_devices)

      const sensorDataTabelData: any[] = []
      full_devices.map((dev) => {
        const sensor = dev.sensor
        const logs = sensor.logs
        logs.map((log) => {
          const logDate = new Date(log.date)
          const sensorDataTableEntry = {
            deviceDescription: dev.description,
            sensorDescription: sensor.description,
            date: `${logDate.getDate()}/${logDate.getMonth()}/${logDate.getFullYear()}`,
            hour: `${logDate.getHours()}:${logDate.getMinutes()}`,
            value: log.value
          }
          sensorDataTabelData.push(sensorDataTableEntry)
        })
      })
      setSensorDateTable(sensorDataTabelData)
    }
  }, [props.login.user.full_devices])

  // console.log("🌊 USER PAGE props.login.user : ", props.login.user)

  function isUserSensor(jsonMessage: any) {
    console.log("props : ", props)
    const sensorIds = new Set()
    props.login.user?.full_devices?.forEach(device => {
      const sensorId = device?.sensor?.id
      sensorIds.add(sensorId)
    });

    if (sensorIds.has(jsonMessage.sensorID)) {
      socketReedings.push(jsonMessage)
      console.log("socketReedings : ", socketReedings)
    }

    if (socketReedings.length > 10) {
      socketReedings = socketReedings.slice(Math.max(socketReedings.length - 10, 1))
    }

  }


  function getConsumptionOvertDays(days: any) {
    if (props.login.user.rpc) {
      const logs = props.login.user.rpc.computeLogs
      const now = new Date()
      now.setDate(now.getDate() - days)
      const intDaysAgo = now.getTime()

      const lastNDaysLogs = logs.filter((log) => {
        const logDate = new Date(log.date)
        const intDate = logDate.getTime()
        return intDaysAgo < intDate
      })

      const last_n_days = getLastN_Days(lastNDaysLogs, days)
      const split_by_days = splitByDays(last_n_days, days)
      const last_7_days = getLastN_Days(lastNDaysLogs, 7)
      const splitByHoursMatrix = splitByHours(last_7_days)
      const weeklyAvarageDataset = getWeeklyAvarageDataset(splitByHoursMatrix)

      const lineChartData = {
        labels: getHoursLabesArray(),
        datasets: computeDatasets(split_by_days, 1)
      };

      const weeklyAvgChartData = {
        labels: getHoursLabesArray(),
        datasets: [{
          label: 'Avarage Weekly Consumption',
          data: weeklyAvarageDataset,
          backgroundColor: " rgba(14, 75, 130, 0.2)",
          borderColor: "#0e4b8a",
          borderWidth: 1,
          fill: true,
          tension: 0.5
        }]
      };

      setSecondChartData(weeklyAvgChartData)

      console.log("lineChartData : ", lineChartData)
      setFirstChartData(lineChartData)
    }
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };




  return (
    <div className='userPageFullContainer'>
      <Snackbar
        sx={{ width: '100%' }}
        open={openSnackBar}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackMessage}
      >
        <Alert severity="error">{snackMessage}     <button onClick={e => handleClose(e, "dk")}>
          X
        </button></Alert>
      </Snackbar>
      <UserToolbar />
      <div className="userPageCenter">

        <div className="userGrid">
          <div className="leftColumn ">

            <div className="barChartContainer">
              <Typography>Date : {date}</Typography>
              <Bar data={data} options={options} />
            </div>

            <div className="logsTableContainer">
              <ExpadingMaterialTable
                tableTitle="Sensor data"
                tableColumns={userColumns}
                tableData={sensorDateTable || []}
                remove={{
                  message: `Are you sure you want to remove this user?`,
                  action: user => { }
                }}
                loading={props.login?.user?.full_devices == undefined}
                modalDialog={null}
              />
            </div>
          </div>

          <div className='chartsContainer'>
            <div className='lineChartCard'>
              <div className="lineChart1Title">
                <p>Hourly Consumption over the last </p>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={firstChartNumberOfDays}
                  label="Age"
                  onChange={(event) => {
                    const days = event.target.value
                    setFirstChartNumberOfDays(event.target.value + "")
                    getConsumptionOvertDays(days)
                  }}
                >
                  <MenuItem value={1}>1</MenuItem>
                  <MenuItem value={2}>2</MenuItem>
                  <MenuItem value={3}>3</MenuItem>
                  <MenuItem value={4}>4</MenuItem>
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={6}>6</MenuItem>
                  <MenuItem value={7}>7</MenuItem>
                </Select>
                <p> days </p>
              </div>

              <Line data={firstChartData} options={options} />
            </div>

            <div className='lineChartCard'>
              <p>Weekly avarage consumption </p>
              <Line data={secondChartData} options={options} />
            </div>

            <div className='lineChartCard'>
              {/* <Line data={lineChartData} options={options} /> */}
            </div>

            <div className='lineChartCard'>
              {/* <Line data={lineChartData} options={options} /> */}
            </div>

          </div>


        </div>
      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  ...state
})

const mapDispatchToProps = (dispatch: any) => ({ dispatch, ...bindActionCreators({ ...LoginActions }, dispatch) })

export const UserPage = connect(mapStateToProps, mapDispatchToProps)(User)

// conecteaza pagina la store, deci avem access la store




