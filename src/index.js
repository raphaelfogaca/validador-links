import fs from 'fs';
import fetch from 'node-fetch'


async function pegaArquivo(caminhoDoArquivo) {
  const texto = await fs.promises.readFile(caminhoDoArquivo, 'utf-8')
  var links = extrairLinks(texto);
  if(links == null){
    return 'Nenhum link encontrado';
  }  
  return validarLinks(links);
}

function extrairLinks(texto) {
  const regex = /\(http?s:\/\/[^$#@\s].[^\s]*\)/gm;
  var links = texto.match(regex);
  if (links == null) {
    return null;
  }
  else {
    var qtdLinks = 0;
    links.forEach(element => {
      links[qtdLinks] = links[qtdLinks].replace('(', '');
      links[qtdLinks] = links[qtdLinks].replace(')', '');
      qtdLinks++;
    });
    return links;
  }
}

async function validarLinks(arrayURLs) {
  var statusLinks = []
  await Promise
    .all(arrayURLs
      .map(async url => {
        const res = await fetch(url)
        statusLinks.push({ [url]: res.status });
      }))
  return statusLinks;
}

function add(a, b) {
  return a + b;
}

export { pegaArquivo, add };