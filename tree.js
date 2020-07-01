module.exports.options = { 
    fg: 'green',
    keyable:true,
    /*style:{
      focus:{
        border: {
          fg:'green'
        }
      }
    }*/
  }

module.exports.treeData = (manladags, chosenSource) => {
    return {
        sources: {
          type: 's',
          name: 'All',
          children: () => {
            let tmp = {}
            Object.values(manladags).forEach((e) => {
              tmp[e.site] = { name: e.site, type: 's' }
            })
            return tmp
          }
        },
        mangas: {
          type: 'm',
          name: 'All',
          children: () => {
            let tmp = {}
            for(m in chosenSource.mangas) {
              tmp[m] = { name: chosenSource.mangas[m].name, key: m, type: 'm'}
            }
            return tmp
          }
      
        }
        
      }
}