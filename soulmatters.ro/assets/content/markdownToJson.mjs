
import {readdirSync, readFileSync, writeFileSync} from 'fs'
import fm from 'front-matter'

const path = './src/assets/content'
const sortByDate = (a, b) => {
    const dateA = new Date(a.date)
    const dateB = new Date(b.date)
    return dateB - dateA
}

const postObject = (file) => {
const content = fm(file)
  return {
    ...content.attributes,
    article: content.body
  }
}
const convertPages = async () => {
  const posts = await readdirSync(path +'/pages')
  for ( let post of posts) {
    const file = await readFileSync(`${path}/pages/${post}`, 'utf8')
    const json = await postObject(file)
    await writeFileSync(`${path}/data/pages/${post.replace('.md', '')}.json`, JSON.stringify(json))
  }
}

const makeWholeList = async () => {
  const posts = await readdirSync(path +'/posts')
  const postList = []
  for(let post of posts) {
    const file = await readFileSync(`${path}/posts/${post}`, 'utf8')
    postList.push(postObject(file))
  }
  await convertPages();
  // add previuos and next article to each article
  const sortedPosts = postList.sort(sortByDate)
  for(let i = 0; i < sortedPosts.length; i++) {
    if(i !== sortedPosts.length - 1) { 
      sortedPosts[i].previous = {
        slug: sortedPosts[i + 1].slug,
        title: sortedPosts[i + 1].title
      }
    }

    if(i === 0) continue;

    sortedPosts[i].next = {
      slug: sortedPosts[i - 1].slug,
      title: sortedPosts[i - 1].title
    }

  }
  for(let post of sortedPosts) {
    await writeFileSync(`${path}/data/article/${post.slug}.json`, JSON.stringify({...post}))
  }
  writeFileSync('./posts.json', JSON.stringify([...sortedPosts]))
  writeFileSync('./config.json', JSON.stringify({
    numberOfArticles: sortedPosts.length,
    numberOfPages: Math.ceil(sortedPosts.length / 9),

  }))
  return sortedPosts
}

const makeJsonList = async () => {
  let paginatedArticles = []
  let numberOfPages = 1;
  const allArticles = await makeWholeList()
  for(let file of allArticles) {
    if(file.status !== 'publish') continue;
    if(paginatedArticles.length === 9) {
      await writeFileSync(`${path}/data/page-${numberOfPages}.json`, JSON.stringify([...paginatedArticles]))
      paginatedArticles = []
      numberOfPages++
    } else {
      paginatedArticles.push(file)
    }
  }
}

makeJsonList()