var images = [
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fproyectoviajero.com%2Fmetodos-de-tortura-mas-crueles%2F&psig=AOvVaw221MLWJzEwmXHBnIqq9pFZ&ust=1691251703538000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCMiKxtuxw4ADFQAAAAAdAAAAABAD",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.ovhcloud.com%2Fes%2Fpublic-cloud%2Fkubernetes%2Fkubernetes-load-balancer%2F&psig=AOvVaw0DK3xhXl4l8Fg17wQF0LQT&ust=1691251743620000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCKCJ9u2xw4ADFQAAAAAdAAAAABAD",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.influxdata.com%2Fintegration%2Fgrafana%2F&psig=AOvVaw2RwcuOX4gWLz6RZL1TLnGl&ust=1691251819582000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCIDsr5Kyw4ADFQAAAAAdAAAAABAD",
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Felcomercio.pe%2Fmundial%2Ffrancia%2Fgol-de-mbappe-de-penal-para-el-3-3-de-francia-vs-argentina-por-la-final-del-mundial-2022-ver-goles-de-mbappe-hoy-video-rmmd-dtbn-noticia%2F&psig=AOvVaw3Qft-87NNV4IWdLOxFDu7q&ust=1691251850020000&source=images&cd=vfe&opi=89978449&ved=0CBEQjRxqFwoTCICE7KWyw4ADFQAAAAAdAAAAABAD",
];

function getRandomImage() {
  var index = Math.floor(Math.random() * images.length);
  var image = images[index];
  var displayElement = document.getElementById("display");
  displayElement.src = image;
  displayElement.style.display = "block";
}

var memeButton = document.getElementById("memeButton");
memeButton.addEventListener("click", getRandomImage);

async function fetchVisitorCount() {
  try {
    const response = await fetch("/api");
    if (!response.ok) {
      throw new Error("Request failed");
    }
    const data = await response.json();
    console.log(data);

    document.getElementById(
      "visitorCount"
    ).textContent = `Visits: ${data.count}`;
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchVisitorCount();
