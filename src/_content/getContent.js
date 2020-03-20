import { docIds, documents } from './Docs';

const getContent = window.getContent = (content_id)=> new Promise((resolve, reject)=>{

    if(!content_id){
        console.error('getContent', {content_id, docIds, err:"missing content_id"});
        return reject('');
    }

    const url = documents[content_id];

    if(!url){
        console.error('getContent', {content_id, docIds, err:"unknown content_id"});
        return reject('');
    }

    fetch(url,{method:'GET'})
    .then(res=>res.text())
    .then(html=>{
        var copy = document.getElementById('copy');
        if(copy) document.removeChild(copy);
        html = html.replace(/<style[\s\S]+\/style>/gi,'');
        html = html.replace(/<script[\s\S]+\/script>/gi,'');
        html = html.replace(/<head[\s\S]+\/head>/gi,'');
        html = html.replace(/<link[\s\S]+\/>/gi,'');
        html = html.replace(/<\!DOCTYPE[\s\S]+<h1/gi,'<h1');
        html = html.replace(/<div id="footer"[\s\S]+/gi,'');
        html = html.replace(/https\:\/\/www\.google\.com\/url\?q\=/gi,'');
        html = html.replace(/\&(amp;)?sa=[^\&]*\&(amp;)?ust[^\"]+/gi,'');
        //console.log('getContent', {content_id, html});

        resolve(html);
    })
    .catch(err=>{
        console.error('getContent', {content_id, docIds, err});
        reject('');
    });

})

export { getContent }