class HeaderView {
  constructor() {}
  render() {
    const header = document.createElement("div") as HTMLElement;
    header.className = "header"
    const app = document.querySelector("#app") as HTMLDivElement;
    app.appendChild(header)
  }
}

export default HeaderView
