export function titleCase (name:string | null):string|null {
  if(typeof name !== 'string') return null;
  return name[0].toUpperCase() + name.slice(1);
}

