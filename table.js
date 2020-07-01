module.exports.options = { 
    keys: true,
    fg: 'green',
    label: 'Informations',
    columnWidth: [7, 22, 5]
}

module.exports.tableData = {
    source:(manladags, arg) => {
        switch(arg) {
            case 'All':
                return Object.values(manladags).map((e) => {
                    return [e.site, e.url, Object.values(e.mangas).length]
                })
        }
    }
}