AFRAME.registerComponent("click", {
  schema: {
    src: { type: "number" },
  },
  init: function () {
    console.log(this.el); // Reference to the scene element.
  },

  update: function () {
    this.el.addEventListener("click", (e) => {
      const data = fetch("./data/PeriodicTableJSON.json")
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(`${data.elements[this.el.id].name}`);
        });
    });
  },
});

AFRAME.registerComponent("add-boxes", {
  schema: {
    totalBoxes: { type: "number" },
  },
  init: function () {
    //   this.tick = AFRAME.utils.throttleTick(this.tick, 2000, this);
    this.planeEntity = document.querySelector("a-plane");
    this.count = 0;
  },

  tick: function () {
    this.planeEntity = document.querySelector("a-plane");

    if (this.count < this.data.totalBoxes) {
      var xPos =
        Math.floor(
          Math.random() * Number(this.planeEntity.getAttribute("width") / 2.1)
        ) + 1;
      xPos *= Math.round(Math.random()) ? 1 : -1;
      var yPos =
        Math.floor(
          Math.random() * Number(this.planeEntity.getAttribute("height") / 2.1)
        ) + 1;

      yPos *= Math.round(Math.random()) ? 1 : -1;
      var tag = document.createElement("a-box");

      tag.setAttribute("id", `${this.count}`);
      tag.setAttribute("color", "#2c3e50");
      tag.setAttribute("rotation", { x: 90, y: 0, z: 0 });
      tag.setAttribute("metalness", 1);
      tag.object3D.position.set(xPos, yPos, 1);

      this.planeEntity.appendChild(tag);

      tag.setAttribute("click", `src:${tag.getAttribute("id")}`);

      this.count++;
    }
  },
});
// for (const d in data.elements) {
//     console.log(
//       `${data.elements[d].name}: ${data.elements[d].atomic_mass}`
