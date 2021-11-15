export async function fetchData(url: string) {
  return (await fetch(url)).json()
}

export function createTitle(content: string) {
  const h2 = document.createElement('h2')
  h2.innerText = content
  return h2
}

export function createImg(src: string) {
  const img = document.createElement('img')
  img.src = src
  return img
}

export function sleep(time = 1) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('done')
    }, time * 1000)
  })
}
