var images = [
  "https://proyectoviajero.com/wp-content/uploads/2022/03/tortura-edad-media.webp",
  "https://storage.googleapis.com/wp-tg-medialess-b0f053fb-3872-4dfd-820f-c991becafc82/2022/01/fca50d3a-kubernetes-e1643232472324.png",
  "https://images.ctfassets.net/o7xu9whrs0u9/7Erq6IEoCaJkBtHMhblLzS/9310518537dffc123d3d9059edace8ed/Grafana-logo-2.png",
  "https://elcomercio.pe/resizer/N6_LfzluOsWPU9hSt-qfoy5Hwfw=/980x528/smart/filters:format(jpeg):quality(75)/cloudfront-us-east-1.images.arcpublishing.com/elcomercio/HQ5PUDJOQJG27P3ZNWXZYC335Q.jpg",
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
