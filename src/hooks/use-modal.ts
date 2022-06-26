import PageModal from "@/components/page-modal"
import { ref } from "vue"

type CallbackFn = (item?:any) => void

export function useModal(newBack?:CallbackFn,editBack?:CallbackFn){
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultValue = ref({})

  const newBtnClick = () =>{
    if(pageModalRef.value){
      pageModalRef.value.dialogVisible = true
      defaultValue.value = {}
    }
    newBack && newBack()
  }
  const editBtnClick = (item:any) =>{
    if(pageModalRef.value){
      pageModalRef.value.dialogVisible = true
      defaultValue.value = {...item}
    }
    editBack && editBack(item)
  }
  return [pageModalRef,defaultValue,newBtnClick,editBtnClick]
}
