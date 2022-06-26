import pageContent from "@/components/page-content"
import { ref } from "vue"

export function usePageSeach(){
  const pageContentRef = ref<InstanceType<typeof pageContent>>()
  const handleResetBtnClick = () => {
    pageContentRef.value?.getPageData()
  }
  const handleQueryBtnClick = (queryInfo:any) => {
  pageContentRef.value?.getPageData(queryInfo)
  }
  return [pageContentRef,handleResetBtnClick,handleQueryBtnClick]
}
