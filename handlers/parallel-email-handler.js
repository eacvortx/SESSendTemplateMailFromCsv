const { chunk } = require("lodash");
const BaseHandler = require("./base-handler");
const config = require("../config");

class ParallelEmailHandler extends BaseHandler {
    constructor() {
        super();
    }

    async execute(dataSource) {
        const chunckedSource = chunk(dataSource, config.chunkSize);
        const tasks = [];

        console.log('ℹ Caregando modo de processamento multi thread')        
        console.log(`ℹ Total Grupos Processo: ${chunckedSource.length}`)
        console.log(`ℹ Total de Registros: ${dataSource.length}`)    
    
        for (const chunkedItem of chunckedSource) {
            tasks.push(this.sendEmailForList(chunkedItem));
        }
    
        await Promise.all(tasks);
    }
}

module.exports = ParallelEmailHandler;