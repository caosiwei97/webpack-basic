async function fetchData(url: string) {
  return (await fetch(url)).json()
}

export default fetchData
