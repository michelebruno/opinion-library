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
                            query: {
                                filter: {
                                    scelta: {
                                        eq: 'X'
                                    }
                                }
                            }
                        })

                        let l = Array.from(entries).map(i => i.name).join('|')

                        let wBrew = /\b/
                        regex = new RegExp(wBrew.source + "(" + l + ")" + wBrew.source, 'gi')


                    }
                    return source.extracted.split(regex)
                }
            },
        },
    })
}

exports.createSchemaCustomization = ({actions}) => {
    const {createTypes} = actions
    const typeDefs = `
    type SheetsEstratti implements Node {
      commentId: Int
    }
  `
    createTypes(typeDefs)
}