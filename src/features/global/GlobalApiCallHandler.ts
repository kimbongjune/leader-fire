// import axios from "../../components/common/api/axios"

// let pollingInterval: NodeJS.Timeout | null = null;

// export const setPollingInterval = (interval: NodeJS.Timeout): void => {
//   pollingInterval = interval;
// };

// export const clearPollingInterval = (): void => {
//   if (pollingInterval) {
//     clearInterval(pollingInterval);
//     pollingInterval = null;
//   }
// };

// export const isPollingActive = (): boolean => {
//   return pollingInterval !== null;
// };

// export const fetchDisasterDetail = async (id: string): Promise<> => {
//     //console.log(`api call!!!!!!!!! disaster ID: ${id}`);
//     const data = await axios.get('/api/disaster_info/seq',{
//       params: {
//         dsrSeq : id
//       }
//     });

//     console.log(data)

//     return data.data;

//   };