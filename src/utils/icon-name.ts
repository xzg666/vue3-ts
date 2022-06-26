export function iconNameUtils(iconString:string){
  return iconString.split('-').splice(2).join('-')
}
