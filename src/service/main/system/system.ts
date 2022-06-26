import hyRequest from "@/service";
import { IDateType } from "@/service/login/type";

export function getPageListData(url:string,queryInfo:any){
  return hyRequest.post<IDateType>({
    url,
    data:queryInfo
  })
}

// url: /users/id
export function deletePageData(url:string){
  return hyRequest.delete<IDateType>({
    url
  })
}

//新建请求 url：/pageName
export function createPageData(url:string,newData:any){
  return hyRequest.post<IDateType>({
    url,
    data:newData
  })
}

//编辑请求 URL：/pageName/id
export function editPageData(url: string, editData: any) {
  return hyRequest.patch<IDateType>({
    url: url,
    data: editData
  })
}
