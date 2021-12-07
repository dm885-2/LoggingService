import rapid from "@ovcina/rapidriver";
import {host} from "./helpers.js";

export async function savelog(msg){
    console.log("Inside savelog function")
    console.log(msg)
   
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