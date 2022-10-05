
import json from './content.json' assert { type: 'json' };
import turndown from 'turndown'
import { writeFileSync, unlinkSync } from 'fs'
const turndownService = new turndown()
var markdown = (content) => turndownService.turndown(content)




const getImage = async(url, imageName) => {
    const imageUrl = url.split('?')[0]
    const image = await fetch(imageUrl)
    const blob = await image.arrayBuffer()
    console.log(blob)
    writeFileSync(`./images/${imageName}`, Buffer.from(blob))
}

const writeToLocal = async (article, post) => {
    // write content to file.md
    const title = `./posts/${post.slug}.md`
    console.log(post.jetpack_featured_media_url)
    await getImage(post.jetpack_featured_media_url, post.slug + '.jpeg')
    await writeFileSync(title, article)
    
}


for (let post of json) {
    const article = await markdown(post.content.rendered)
    const head = `---
author: Andra Cozma
date: ${post.date}
slug: ${post.slug}
status: ${post.status}
title: ${post.title.rendered}
excerpt: "${markdown(post.excerpt.rendered)}"
---
${article}
    `
     await writeToLocal(head, post)
     
 }
 
 