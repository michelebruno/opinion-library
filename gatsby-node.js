exports.createResolvers = ({createResolvers}) => {

    let regex

    createResolvers({
        SheetsEstratti: {
            splitted: {
                type: "[String]",
                resolve: async (source, args, context, info) => {
                    if (typeof regex === 'undefined') {
                        const {entries} = await context.nodeModel.findAll({
                            type: `SheetsScatter`,
                            query: {limit: 35}
                        })

                        regex = new RegExp('(' + Array.from(entries).map(i =>  `${i.name}` ).join('|') + ')', 'gi')

                    }
                    return source.extracted.split(regex)
                }
            },
        },
    })
}