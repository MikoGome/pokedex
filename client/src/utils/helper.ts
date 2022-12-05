export function titleCase (name:string):string {
  if(typeof name !== 'string') return '';
  return name[0].toUpperCase() + name.slice(1);
}

