import rapid from "@ovcina/rapidriver";
import {host, query} from "./helpers.js";

function format(log){
  let str = "";
  // Loop though array, split input into right format
  log.forEach(item => {
    str += `r:${item.river}-e:${item.event}/`
  })

  return str.slice(0, -1);
};

export async function savelog(msg){
  
    const newUserStmt = await query("INSERT INTO logs (`sessionId`, `requestId`, `logPath`) VALUES (?, ?, ?)", [
      msg.sessionId,
      msg.requestId,
      format(msg.logPath)
  ]);
 
   
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
}