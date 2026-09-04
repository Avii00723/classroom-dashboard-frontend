import { createSimpleRestDataProvider } from "@refinedev/rest/simple-rest";
import { API_URL } from "./constants";
import { BaseRecord, DataProvider, GetListParams, GetListResponse } from "@refinedev/core";
import { subjects } from "./mock-data";
// export const { dataProvider, kyInstance } = createSimpleRestDataProvider({
//   apiURL: API_URL,
// });
export const dataProvider: DataProvider={
  getList:async <TData extends BaseRecord = BaseRecord>({resource}:GetListParams):Promise<GetListResponse<TData>>=>{
    if(resource!='subjects'){
      return {data:[] as TData[], total:0};
    }

    return {data: subjects as unknown as TData[], total: subjects.length};
  },
  getOne:async ()=> {throw new Error('This function is nto present in mock')},
  getMany:async ()=> {throw new Error('This function is nto present in mock')},
  create:async ()=> {throw new Error('This function is nto present in mock')},
  update:async ()=> {throw new Error('This function is nto present in mock')},
  deleteOne:async ()=> {throw new Error('This function is nto present in mock')},
  deleteMany:async ()=> {throw new Error('This function is nto present in mock')},

  getApiUrl:()=>'',
}
