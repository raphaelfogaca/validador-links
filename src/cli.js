#!/usr/bin/env node

import {pegaArquivo} from './index.js'

async function processaTexto(carminho) {
    var r = await pegaArquivo(carminho)
    console.log(r);
}

processaTexto('./arquivos/text.md');


     