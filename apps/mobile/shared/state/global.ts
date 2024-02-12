import { observable } from "@legendapp/state"
import { persistObservable } from "@legendapp/state/persist"
import { Global } from "../types"


export const globalState=observable<Global>({
    applicationId:undefined,
    firstLaunch:true,
    alias:undefined
})


persistObservable(globalState,{
    local:"__global"
})