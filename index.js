var blessed = require('blessed'), contrib = require('blessed-contrib'), tester = require('./connection-tester')
, screen = blessed.screen()

const treeOptions = require('./tree').options
const treeData = require('./tree').treeData

const tableOptions = require('./table').options
const tableData = require('./table').tableData

const sourceButtonOptions = require('./form').sourceButtonOptions
const mangaButtonOptions = require('./form').mangaButtonOptions
const textSourceOptions = require('./form').textSourceOptions
const textMangaOptions = require('./form').textMangaOptions

const { ManladagSource } = require('@manladag/source')
const tabmdg = [require('@manladag/lelscanv')]
const manladags = {}
tabmdg.forEach(({ Source }) => {
  manladags[Source.site] = new ManladagSource(Source)
  manladags[Source.site].testConnection = false
})

const grid = new contrib.grid({ rows: 12, cols:12, screen:screen})

const table = grid.set(0,2,6,6, contrib.table, tableOptions)
let tablefocus = false

const log = grid.set(6,0,6,4, contrib.log, { label: 'Logs', fg: 'green'})


const tree = grid.set(0,0,6,2, contrib.tree, treeOptions)
let treefocus = false


const form = grid.set(0,8,12,4, blessed.form, { label: "Download"})

let chosenSource = null
let chosenManga = null

const sourceButton = blessed.button(sourceButtonOptions)
form.append(sourceButton)

const mangaButton = blessed.button(mangaButtonOptions)
form.append(mangaButton)

const textSource = blessed.text(textSourceOptions)
form.append(textSource)

const textManga = blessed.text(textMangaOptions)
form.append(textManga)

function setChosenSource(s) {
  chosenSource = s
  tester(s.url).then((t) => {
    log.log(`${s.site} connection ${t.success?'':'un'}successfull`)
  })
  if(s != null) {
    textSource.setContent('{bold}'+s.site+'{/}')
    screen.render()
  } else {
    textSource.setContent('')
    screen.render()
  }
}

function setChosenManga(m) {
  chosenManga = m
  if(m != null) {
    textManga.setContent('{bold}'+chosenSource.mangas[m].name+'{/}')
    screen.render()
  } else {
    textManga.setContent('')
    screen.render()
  }
}

sourceButton.on('press', () => {
  //sourceButton.setContent('wesh')
  tree.setData({})
  tree.setData(treeData(manladags, chosenSource).sources)
  tree.setLabel('Sources')
  tree.focus() 
  treefocus = true
  screen.render()
})

mangaButton.on('press', () => {
  if(chosenSource != null) {
    tree.setData(treeData(manladags, chosenSource).mangas)
    tree.setLabel(`${chosenSource.site}'s Mangas`)
    tree.focus()
    treefocus = true
    screen.render()
  }
})

table.setData({ headers: ['col1', 'col2', 'col3']
, data:
   [ [1, 2, 3]
   , [4, 5, 6] ]})



tree.on('select',(e) => {
  if(e.type == 's') {
    if(e.parent != null) {
      setChosenSource(manladags[e.name])
      setChosenManga(null)
    } else if(e.name = 'All') {
      table.setData({headers: ["Site", "url", "manga"],data: tableData.source(manladags, e.name)})
      screen.render()
    }
  } else {
    if(e.parent != null) {
      setChosenManga(e.key)
      chosenSource.getLastChapter(chosenSource.mangas[e.key]).then((chap) => {
        log.log(`Last chapter ${e.name} : ${chap}`)
      })
    }
  }

})

sourceButton.focus()

screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0)
})

screen.key('tab', function(ch,key) {
  if(treefocus) {
    table.focus()
    tablefocus = true
    treefocus = false
  } else if(tablefocus) {
    sourceButton.focus()
    tablefocus = false
  } else {
    form.focusNext()
  }
})

screen.key('S-tab', function(ch,key) {
  if(treefocus) {
    sourceButton.focus()
    treefocus = false
  } else if(tablefocus) {
    tree.focus()
    treefocus = true
    tablefocus = false
  }
})




screen.render()