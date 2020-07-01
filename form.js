module.exports = {
  sourceButtonOptions: {
    content: "Choose a source",
    mouse: false,
    clickable: false,
    keys: true,
    fg: 'green',
    border: {
      type: 'line',
      fg: 'green'
    },
    style: {
      focus: {
        bg: 'green'
      }
    },
    shrink:true,
  },
  mangaButtonOptions:{
    content: "Choose a manga",
    mouse: false,
    clickable: false,
    keys: true,
    fg: 'green',
    border: {
      type: 'line',
      fg: 'green'
    },
    style: {
      focus: {
        bg: 'green'
      }
    },
    shrink:true,
    top: 5
  },
  textSourceOptions: {
      top: 3,
      content: "",
      tags: true
  },
  textMangaOptions: {
    top: 8,
    content: "w",
    tags: true
}
}