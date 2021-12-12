import rapid from "@ovcina/rapidriver";
import {host, query, subscriber} from "./helpers.js";

export function format(log){
  let str = "";
  // format should thoughn an eroror if the log is not an array or empty
  if(!Array.isArray(log) || log.length === 0){
    throw 500;
  }
  
  // Loop though array, split input into right format
  log.forEach(item => {
    // ensure that the item contains a river and a event, otherwise throw error
    if(!item.river || !item.event){
      throw 500;
    }
    
    str += `r:${item.river}-e:${item.event}/`
  })

  return str.slice(0, -1);
};

export async function savelog(msg){
  
  const log = await query("INSERT INTO `logs` (`userId`, `sessionId`, `requestId`, `logPath`) VALUES (?, ?, ?, ?)", [msg.userId, msg.sessionId, msg.requestId, format(msg.logPath)]);
  
}
 
   
export async function getLogs(msg, publish){
  console.log("getLogs");
  const data = await query("SELECT * FROM `logs`");
  console.log(data);
  
  publish("getLogs-response", {
    data: data || [],
});
console.log(data);
}

if(process.env.RAPID)
{
    rapid.subscribe(host, [{
        river: "logging", event: "logIt", work: res => {
          console.log(`Received: ${JSON.stringify(res)}`);
          const msg = res;
          savelog(msg);
        }
      }]);

     // Create a rapidriver instance that listen for logRequests and return all logs
     subscriber(host, [{river: "logging", event: "getLogs", work: getLogs}]);

      
}