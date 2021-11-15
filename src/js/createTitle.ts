export default (content: string): HTMLHeadElement => {
  const h2 = document.createElement('h2')
  h2.innerText = content
  return h2
}
