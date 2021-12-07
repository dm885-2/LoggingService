import rapid from "@ovcina/rapidriver";
import {host} from "./helpers.js";

function format(log){
  str = ""
  
  // Loop though array, split input [ { river: 'auth', event: 'signUp' },  { river: 'auth', event: 'signUp-repo' }] into r:auth-e:signUp/r:auth-e:signUp-repoo
  log.forEach(item => {
    str += `r:${item.river}-e:${item.event}/`
  })
  console.log("has formattet to this")
  console.log(str.slice(0, -1))
  return str.slice(0, -1)
};

export async function savelog(msg){
    console.log("Inside savelog function")
    console.log(msg)
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
          savelog(msg)
        }
      }]);
}