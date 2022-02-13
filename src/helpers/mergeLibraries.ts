const MergeLibraries = (data: any) => {
  const isObject = (data:{}) =>
    Object.prototype.toString.call(data) === '[object Object]'
  const isArray = (data:[]) =>
    Object.prototype.toString.call(data) === '[object Array]'

  const mergeLib: any = [];

  const getLibraries = (data:any) => {
    if (data.libraries.length > 0) {
      data.libraries.map((item:[]) => mergeLib.push(item));
    }
    return data.libraries;
  }

  if (isObject(data)) {
    if (isArray(data.courses)) {
      data.courses.map((item:[]) => {
        return getLibraries(item);
      })
    } else {
      return data;
    }
    return mergeLib;
  }
  return data
}

export default MergeLibraries;