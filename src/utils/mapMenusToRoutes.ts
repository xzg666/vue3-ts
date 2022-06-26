import { IBreadcrumb } from '@/base-ui/breadcrumb'
import type {RouteRecordRaw} from 'vue-router'

let firstMenu:any = null

export function mapMenusToRoutes(userMenus:any[]):RouteRecordRaw[]{
  const routes: RouteRecordRaw[] = []

  //1.先加载router文件夹下的所有路由数组 allRoutes
  const allRoutes: RouteRecordRaw[] = []
  // require.context是webpack一种工具，能拿到文件内容
  const routeFiles = require.context('../router/main', true, /\.ts/)//递归查找.ts结尾的文件
  // 拿到所有文件的路径，数组保存
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.split('.')[1])
    allRoutes.push(route.default)
  })
  // console.log('allroutes',allRoutes,userMenus)

  //2.根据userMenus筛选出需要添加的routes
  //type === 1 (type为1找children，如果是三级路由children也是type=1，继续找children)
  //type === 2 才去根据url去匹配route
  const _recurseGetRoute = (menus:any[]) => {
      for(const menu of menus){
        if(menu.type === 2){
          const route = allRoutes.find(route=> route.path === menu.url)
          if(route) routes.push(route)

          //第一次设置初始值
          if(!firstMenu){
            firstMenu = menu
          }
        }else{
          _recurseGetRoute(menu.children)
        }
      }
  }

  _recurseGetRoute(userMenus)
  return routes
}

// //根据currentPaths去匹配userMenus中的menu
// export function pathMapToMenu(userMenus:any[],currentPaths:string):any{
//   for(const menu of userMenus){
//     if(menu.type === 1){
//       const findfMenu = pathMapToMenu(menu.children ?? [],currentPaths)
//       if(findfMenu){
//         return findfMenu
//       }
//     }else if(menu.type === 2 && menu.url === currentPaths){
//       return menu
//     }
//   }
// }

// export function pathMapBreadcrumb(userMenus:any[],currentPaths:string){
//   const breadcrumbs:any[] = []
//   for(const menu of userMenus){
//     if(menu.type === 1){
//       const findfMenu = pathMapToMenu(menu.children ?? [],currentPaths)
//       if(findfMenu){
//         //拿到父亲的面包屑信息
//         breadcrumbs.push({name:menu.name,path:menu.url})
//         //拿到当前级的面包屑信息
//         breadcrumbs.push({name:findfMenu.name,path:findfMenu.url})

//         return breadcrumbs
//       }
//     }else if(menu.type === 2 && menu.url === currentPaths){
//       return menu
//     }
//   }
// }

export function pathMapBreadcrumb(userMenus:any[],currentPath:string){
  const breadcrumbs:any[] = []
  pathMapToMenu(userMenus,currentPath,breadcrumbs)
  return breadcrumbs
}

//根据currentPaths去匹配userMenus中的menu
export function pathMapToMenu(userMenus:any[],currentPath:string,breadcrumbs?:IBreadcrumb[]):any{
  for(const menu of userMenus){
    if(menu.type === 1){
      const findfMenu = pathMapToMenu(menu.children ?? [],currentPath)
      if(findfMenu){
        //拿到父亲的面包屑信息
        breadcrumbs?.push({name:menu.name,path:menu.url})
        //拿到当前级的面包屑信息
        breadcrumbs?.push({name:findfMenu.name,path:findfMenu.url})
        return findfMenu
      }
    }else if(menu.type === 2 && menu.url === currentPath){
      return menu
    }
  }
}


export function mapMenusToPermission(userMenus:any[]){
  const permissions:string[] = []

  const _recurseGetPermission = (menus:any[])=>{
    for(const menu of menus){
      if(menu.type === 1 || menu.type === 2 ){
        _recurseGetPermission(menu.children ?? [])
      }else if(menu.type === 3){
          permissions.push(menu.permission)
      }
    }
  }

  _recurseGetPermission(userMenus)

  return permissions
}

export function getMenuLeafKeys(menuList:any[]){
  const leaKeys:number[] = []
  const _recurseGetLeaf = (menuList:any[]) => {
    for(const menu of menuList){
      if(menu.children){
        _recurseGetLeaf(menu.children)
      }else{
        leaKeys.push(menu.id)
      }
    }
  }
  _recurseGetLeaf(menuList)
  return leaKeys
}


export {firstMenu}
